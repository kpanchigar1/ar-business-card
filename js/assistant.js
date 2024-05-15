// Import necessary modules from ibm-watson package
let AssistantV2 = require('ibm-watson/assistant/v2');
let { BearerTokenAuthenticator } = require('ibm-watson/auth');

// Fetch an access token from a Netlify serverless function
let assistantPromise = fetch('/.netlify/functions/get-token')
    .then(response => response.json())
    .then(data => {
        // Extract the access token from the response
        const accessToken = data.access_token;
        console.log("Access Token fetched");

        // Create an instance of AssistantV2 with BearerTokenAuthenticator for authentication
        let assistant = new AssistantV2({
            version: '2021-06-14', // Specify the version of Watson Assistant API
            url: "https://api.eu-gb.assistant.watson.cloud.ibm.com/instances/cd153831-2882-424a-921f-cd367fc10c99", // Specify the URL of your Watson Assistant instance
            authenticator: new BearerTokenAuthenticator({
                bearerToken: accessToken, // Provide the access token for authentication
            }),
        });
        console.log("Assistant created");
        return assistant; // Returns the assistant instance
    })
    .catch(error => console.error('Error:', error));

// Function to interact with the chatbot
function chatbot(question){
    console.log("chatbot function called");
    return assistantPromise.then(assistant => {
        console.log("assistant:" + assistant);
        // Send a stateless message to the assistant with the user's question
        return assistant.messageStateless({
            assistantId: 'dd0e8243-5e9b-474f-9e67-b07a0eec17df', // Specifies
            // the ID of the Watson Assistant instance
            input: {
                'message_type': 'text',
                'text': question
            }
        })
            .then(res => {
                // Extract and return the response text from the Watson Assistant response
                let responseText = res.result.output.generic[0].text;
                return responseText;
            })
            .catch(err => {
                console.log(err);
            });
    });
};

// Export the chatbot function for use in other modules
module.exports = chatbot;
