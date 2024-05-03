const AssistantV2 = require('ibm-watson/assistant/v2');
const { BearerTokenAuthenticator } = require('ibm-watson/auth');

// Fetch the access_token from the server-side function
fetch('/.netlify/functions/get-token')
    .then(response => response.json())
    .then(data => {
        const accessToken = data.access_token;

        // Use the access_token to authenticate requests
        const assistant = new AssistantV2({
            version: '2021-06-14',
            authenticator: new BearerTokenAuthenticator({
                bearerToken: accessToken,
            }),
            serviceUrl: process.env.SERVICE_URL, // use environment variable
        });

        function chatbot (question){
            return assistant.messageStateless({
                assistantId: process.env.ASSISTANT_ID, // use environment variable
                input: {
                    'message_type': 'text',
                    'text': question
                }
            })
                .then(res => {
                    let responseText = res.result.output.generic[0].text;
                    return responseText;
                })
                .catch(err => {
                    console.log(err);
                });
        };

        module.exports = chatbot;
    })
    .catch(error => console.error('Error:', error));