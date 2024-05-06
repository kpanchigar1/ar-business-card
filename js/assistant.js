let AssistantV2 = require('ibm-watson/assistant/v2');
let { BearerTokenAuthenticator } = require('ibm-watson/auth');


let assistantPromise = fetch('/.netlify/functions/get-token')
    .then(response => response.json())
    .then(data => {
        const accessToken = data.access_token;
        console.log("Access Token fetched");

        // Use the access_token to authenticate requests
        let assistant = new AssistantV2({
            version: '2021-06-14',
            authenticator: new BearerTokenAuthenticator({
                bearerToken: accessToken,
            }),
            serviceUrl: process.env.SERVICE_URL, // use environment variable
        });
        assistant.setServiceUrl(process.env.SERVICE_URL);
        console.log("Assistant created");
        console.log(process.env.SERVICE_URL);
        console.log(assistant.serviceUrl)
        return assistant;
    })
    .catch(error => console.error('Error:', error));


function chatbot(question){
    console.log("chatbot function called")
    return assistantPromise.then(assistant => {
        console.log("assistant:" + assistant)
        return assistant.messageStateless({
            assistantId: 'dd0e8243-5e9b-474f-9e67-b07a0eec17df', // use environment variable
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
    });
};
module.exports = chatbot;
