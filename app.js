'use strict';

require('dotenv').config()
const uuidv4 = require('uuid/v4');
const utility = require('./utility')

const APIAI_TOKEN = process.env.APIAI_TOKEN;
const apiai = require('apiai')(APIAI_TOKEN);

var sessionID 

const express = require('express');
const app = express();

app.use(express.static(__dirname + '/views')); // html
app.use(express.static(__dirname + '/public')); // js, css, images

const server = app.listen(process.env.PORT || 5000, () => {
  console.log('Express server listening on port %d in %s mode', server.address().port, app.settings.env);
});

const io = require('socket.io')(server);
io.on('connection', function(socket){
  console.log('a user connected');
  sessionID = uuidv4()
});

// Web UI
app.get('/', (req, res) => {
  res.sendFile('index.html');
});

io.on('connection', function(socket) {
  socket.on('chat message', (text) => {
    console.log('Message: ' + text);

    // Get a reply from API.ai
    let apiaiReq = apiai.textRequest(text, {
      sessionId: sessionID
    });

    apiaiReq.on('response', async response => {
      let aiText = response.result.fulfillment.speech;
      console.log("Intent name: ", response.result.metadata.intentName)
      if (response.result.metadata.intentName == "Draw image") {
        let imageObject = response.result.parameters.imageObject
        let imageUrl = await utility.runImageSearch(imageObject)
        socket.emit('image', imageUrl)
      }
      console.log('Bot reply: ' + aiText);
      socket.emit('bot reply', aiText);
    });

    apiaiReq.on('error', (error) => {
      console.log(error);
    });

    apiaiReq.end();

  });
});
