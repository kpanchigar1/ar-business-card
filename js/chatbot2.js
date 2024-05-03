"use strict";

var AssistantV2 = require('ibm-watson/assistant/v2');
var _require = require('ibm-watson/auth'),
  BearerTokenAuthenticator = _require.BearerTokenAuthenticator;
var assistant = null;

// Fetch the access_token from the server-side function
fetch('/.netlify/functions/get-token').then(function (response) {
  return response.json();
}).then(function (data) {
  var accessToken = data.access_token;

  // Use the access_token to authenticate requests
  assistant = new AssistantV2({
    version: '2021-06-14',
    authenticator: new BearerTokenAuthenticator({
      bearerToken: accessToken
    }),
    serviceUrl: process.env.SERVICE_URL // use environment variable
  });
  console.log("Assistant created");
})["catch"](function (error) {
  return console.error('Error:', error);
});
function chatbot(question) {
  return assistant.messageStateless({
    assistantId: process.env.ASSISTANT_ID,
    // use environment variable
    input: {
      'message_type': 'text',
      'text': question
    }
  }).then(function (res) {
    var responseText = res.result.output.generic[0].text;
    return responseText;
  })["catch"](function (err) {
    console.log(err);
  });
}
;
module.exports = chatbot;
