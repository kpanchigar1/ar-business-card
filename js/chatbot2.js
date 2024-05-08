"use strict";

var AssistantV2 = require('ibm-watson/assistant/v2');
var _require = require('ibm-watson/auth'),
  BearerTokenAuthenticator = _require.BearerTokenAuthenticator;
var assistantPromise = fetch('/.netlify/functions/get-token').then(function (response) {
  return response.json();
}).then(function (data) {
  var accessToken = data.access_token;
  console.log("Access Token fetched");

  // Use the access_token to authenticate requests
  var assistant = new AssistantV2({
    version: '2021-06-14',
    serviceUrl: "https://api.eu-gb.assistant.watson.cloud.ibm.com/instances/cd153831-2882-424a-921f-cd367fc10c99",
    // use environment variable
    authenticator: new BearerTokenAuthenticator({
      bearerToken: accessToken
    })
  });
  //assistant.setServiceUrl(process.env.SERVICE_URL);
  console.log("Assistant created");
  console.log("https://api.eu-gb.assistant.watson.cloud.ibm.com/instances/cd153831-2882-424a-921f-cd367fc10c99");
  return assistant;
})["catch"](function (error) {
  return console.error('Error:', error);
});
function chatbot(question) {
  console.log("chatbot function called");
  return assistantPromise.then(function (assistant) {
    console.log("assistant:" + assistant);
    return assistant.messageStateless({
      assistantId: 'dd0e8243-5e9b-474f-9e67-b07a0eec17df',
      // use environment variable
      serviceUrl: "https://api.eu-gb.assistant.watson.cloud.ibm.com/instances/cd153831-2882-424a-921f-cd367fc10c99",
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
