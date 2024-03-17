const fs = require('fs');
const TextToSpeechV1 = require('ibm-watson/text-to-speech/v1');
const { IamAuthenticator } = require('ibm-watson/auth');

const textToSpeech = new TextToSpeechV1({
  authenticator: new IamAuthenticator({
    apikey: 'i8VO7YIS1IIhqI1z8NrRVqTasM3szv8JktkAFLPf2wBu',
  }),
  serviceUrl: 'https://api.eu-gb.text-to-speech.watson.cloud.ibm.com/instances/9e02922a-0f48-4aeb-b925-f9f3fb8ce716',
});

function textToSpeechGenerator(text, fileName){
    const synthesizeParams = {
      text: text,
      accept: 'audio/wav',
      voice: 'en-GB_JamesV3Voice',
    };

    textToSpeech.synthesize(synthesizeParams)
      .then(response => {
        // The following line is necessary only for
        // wav formats; otherwise, `response.result`2
        // can be directly piped to a file.
        return textToSpeech.repairWavHeaderStream(response.result);
      })
      .then(buffer => {
        fs.writeFileSync(fileName, buffer);
      })
      .catch(err => {
        console.log('error:', err);
      });
};

module.exports = textToSpeechGenerator;
