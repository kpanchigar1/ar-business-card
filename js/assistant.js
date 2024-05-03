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
        console.log("Assistant created");
        return assistant;
    })
    .catch(error => console.error('Error:', error));

function chatbot (question){
    return assistantPromise.then(assistant => {
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
    });
};

module.exports = chatbot;