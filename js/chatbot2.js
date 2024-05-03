"use strict";

var assistantPromise = fetch('/.netlify/functions/get-token').then(function (response) {
  return response.json();
}).then(function (data) {
  var accessToken = data.access_token;
  console.log("Access Token fetched");

  // Use the access_token to authenticate requests
  var assistant = new AssistantV2({
    version: '2021-06-14',
    authenticator: new BearerTokenAuthenticator({
      bearerToken: accessToken
    }),
    serviceUrl: process.env.SERVICE_URL // use environment variable
  });
  console.log("Assistant created");
  return assistant;
})["catch"](function (error) {
  return console.error('Error:', error);
});
function chatbot(question) {
  return assistantPromise.then(function (assistant) {
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
  });
}
;
module.exports = chatbot;
