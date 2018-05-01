'use strict';

const socket = io();

const outputYou = document.querySelector('.output-you');
const outputBot = document.querySelector('.output-bot');
const imageEl = document.querySelector('.image')

const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
const recognition = new SpeechRecognition();

recognition.lang = 'en-US';
recognition.interimResults = false;
recognition.maxAlternatives = 1;
recognition.continuous = true

document.querySelector('button').addEventListener('click', () => {
  recognition.start();
});

recognition.addEventListener('audiostart', () => {
  console.log("audiostart")
});

recognition.addEventListener('audioend', () => {
  console.log("audioend")
});

recognition.addEventListener('soundstart', () => {
  console.log("soundstart")
});

recognition.addEventListener('soundend', () => {
  console.log("soundend")
})

recognition.addEventListener('speechstart', () => {
  console.log('Speech has been detected. serviceURI=' + recognition.serviceURI +". grammar=" + recognition.grammars);
});

recognition.addEventListener('result', (e) => {
  console.log('Result has been detected.');

  let last = e.results.length - 1;
  let text = e.results[last][0].transcript;

  outputYou.textContent = text;
  console.log('Confidence: ' + e.results[0][0].confidence);

  socket.emit('chat message', text);
});

recognition.addEventListener('speechend', (event) => {
  console.log("speechend. stopping SpeechRecognition")
  //recognition.stop();
});

recognition.addEventListener('nomatch', () => {
  console.log("nomatch")
})

recognition.addEventListener('resume', () => {
  console.log("resume")
})

recognition.addEventListener('error', (e) => {
  console.log("Error: " + e.error)
  outputBot.textContent = 'Error: ' + e.error;
});

function synthVoice(text) {
  const synth = window.speechSynthesis;
  const utterance = new SpeechSynthesisUtterance();
  utterance.text = text;
  synth.speak(utterance);
}

socket.on('bot reply', function(replyText) {
  synthVoice(replyText);

  if(replyText == '') replyText = '(No answer...)';
  outputBot.textContent = replyText;
})

socket.on('image', imageUrl => {
  imageEl.src = imageUrl
})
