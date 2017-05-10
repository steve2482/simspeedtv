const express = require('express');
const app = express();

app.use(express.static('public'));

const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
const {PORT, DATABASE_URL} = require('./config');
const {Channel} = require('./models/channel');

// get channel names
app.get('/channel-names', (req, res) => {
  Channel.find()
  .then(data =>
    res.status(200).json(data)
    );
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
        console.log(err);
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

// export for testing
module.exports = {app, runServer, closeServer};
