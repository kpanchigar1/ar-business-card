const AssistantV2 = require('ibm-watson/assistant/v2');
const {
  IamAuthenticator
} = require('ibm-watson/auth');
const assistant = new AssistantV2({
  version: '2021-06-14',
  authenticator: new IamAuthenticator({
    apikey: process.env.API_KEY // use environment variable
  }),
  serviceUrl: process.env.SERVICE_URL // use environment variable
});
function chatbot(question) {
  return assistant.messageStateless({
    assistantId: process.env.ASSISTANT_ID,
    // use environment variable
    input: {
      'message_type': 'text',
      'text': question
    }
  }).then(res => {
    let responseText = res.result.output.generic[0].text;
    return responseText;
  }).catch(err => {
    console.log(err);
  });
}
;
module.exports = chatbot;
