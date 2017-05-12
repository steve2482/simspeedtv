const express = require('express');
const app = express();
const cors = require('cors');
const fetch = require('isomorphic-fetch');

if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}

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

// get current live feeds
app.get('/live', (req, res) => {
  let apiKey = process.env.YOUTUBE_API_KEY;  
  let channelId = 'UC76vyQZnIIF7iA5ta24ukVw';
  fetch(`https://www.googleapis.com/youtube/v3/search?part=snippet&channelId=${channelId}&eventType=live&type=video&key=${apiKey}`)
  .then(response => {
    if (!response.ok) {
      const error = new Error(response.statusText);
      error.response = response;
      throw error;
    }
    return response.json();
  })
  .then(response => res.json(response))
  .catch(err => {
    console.log('Error:', err);
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
