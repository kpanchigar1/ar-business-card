const fs = require('fs');
const TextToSpeechV1 = require('ibm-watson/text-to-speech/v1');
const { IamAuthenticator } = require('ibm-watson/auth');

const textToSpeech = new TextToSpeechV1({
  authenticator: new IamAuthenticator({
    apikey: 'i8VO7YIS1IIhqI1z8NrRVqTasM3szv8JktkAFLPf2wBu', // insert watson resource api key
  }),
  // insert watson resource url
  serviceUrl: 'https://api.eu-gb.text-to-speech.watson.cloud.ibm.com/instances/9e02922a-0f48-4aeb-b925-f9f3fb8ce716',
});

function textToSpeechGenerator(text, fileName){
    // set parameter
    const synthesizeParams = {
      text: text,
      accept: 'audio/wav',
      voice: 'en-GB_JamesV3Voice',
    };

    // generates wav file
    textToSpeech.synthesize(synthesizeParams)
      .then(response => {
        return textToSpeech.repairWavHeaderStream(response.result); // wav format
      })
      .then(buffer => {
        fs.writeFileSync(fileName, buffer);
      })
      .catch(err => {
        console.log('error:', err);
      });
};

// which other files can refer to this file
module.exports = textToSpeechGenerator;
