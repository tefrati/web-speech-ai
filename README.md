# Demo: A Simple Voice AI Bot with Web Speech API and Node.js, using Dialogflow V1 agent

This demo uses the experimental Web Speech API, which is currently only [supported](http://caniuse.com/#search=speech) by Blink-based browsers including Chrome 25+, Opera 27+, Samsung Internet, QQ Browser, and Baidu Browser.

The demo is heavily based on [Tomomi Imura's github project](https://github.com/girliemac/web-speech-ai)

### Please feel free to suggest improvements


This is how this web app works:

1. Using the Web Speech API’s `SpeechRecognition` interface to listen your voice from a microphone
2. Send your message to [Dialogflow](https://dialogflow) (the natural language processing platform) as a text string
3. Once the response from dialogflow returns the reply text back, use the `SpeechSynthesis` interface to give it a synthetic voice.
4. The demo is using Dialogflow V1. To see an example of Dialogflow V2 go [here](https://github.com/tefrati/Realtime-NLU-Browser-to-Node)
5. Launch the app, click the microphone button and activate NLP agent's intent by saying "Draw me an image of <object>"

### Try It on Your Own Server

Rename the `example.env` to `.env` and fill the env vars:

```
APIAI_TOKEN = Dialogflwo V1 agent's Client Access Token
MS_COGNITIVE_SUBSCRIPTION_KEY = [Bing search API key](https://docs.microsoft.com/en-us/rest/api/cognitiveservices/bing-images-api-v7-reference)

```

The first one is a Dialogflow API key (Please get one by sign up with [Dialogflow](https://dialogflow.com), and the second one is a Microsoft's image search service key, which is used to find an image that was requested by the user.

Or use this Heroku button to deploy to Heroku server. You just need to fill out the env vars with the API key and a subscripition key.

[![Deploy](https://www.herokucdn.com/deploy/button.svg)](https://heroku.com/deploy?template=https://github.com/tefrati/web-speech-ai.git)

Create a [new Dialogflow agent](https://console.dialogflow.com/api-client/#/newAgent) and import 'Web-Speech-AI.zip'



