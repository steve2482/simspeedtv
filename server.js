const express = require('express');
const app = express();
const cors = require('cors');

app.use(express.static('public'));
app.use(cors());

const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
const {PORT, DATABASE_URL} = require('./config');
const {Channel} = require('./models/channel');

// get channel names
app.get('/channel-names', (req, res) => {
  Channel.find().sort({'abreviatedName': 1})
  .then(data => {
    const channelNames = [];
    for (let i = 0; i < data.length; i++) {
      channelNames.push(data[i].abreviatedName);
    }
    res.status(200).json(channelNames);
  });
});

// Start Server
let server;

function runServer(databaseUrl=DATABASE_URL, port=PORT) {
  return new Promise((resolve, reject) => {
    mongoose.connect(databaseUrl, err => {
      if (err) {
        return reject(err);
      }

      server = app.listen(port, () => {
        console.log(`App is connected to server on port ${port}`);
        resolve();
      })
      .on('error', err => {
        mongoose.disconnect();
        reject(err);
      });
    });
  });
}

// Close Server
function closeServer() {
  return mongoose.disconnect().then(() => {
    return new Promise((resolve, reject) => {
      console.log('Closing Server');
      server.close(err => {
        if (err) {
          return reject(err);
        }
        resolve();
      });
    });
  });
}

if (require.main === module) {
  runServer().catch(err => console.error(err));
};

// export for testing
module.exports = {app, runServer, closeServer};
