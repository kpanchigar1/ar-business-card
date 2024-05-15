'use strict';

// Import necessary modules from ibm-watson package
const AssistantV2 = require('ibm-watson/assistant/v2');
const { BearerTokenAuthenticator } = require('ibm-watson/auth');

// Get references to HTML elements
const btn = document.getElementById('submit_button'); // Reference to submit button
const input = document.getElementById('input_text'); // Reference to input text field

// Function to fetch access token from server
function getToken() {
    return fetch('/api/token').then(resp => resp.json());
}

// Function to interact with the chatbot
function chatbot(credentials) {
    // Create an instance of AssistantV2 with BearerTokenAuthenticator for authentication
    const assistant = new AssistantV2({
        authenticator: new BearerTokenAuthenticator({
            bearerToken: credentials.accessToken, // Provide the access token for authentication
        }),
        url: credentials.url,
        version: '2021-06-14',
    });

    // Send a stateless message to the assistant with the user's input text
    assistant.messageStateless({
        assistantId: 'dd0e8243-5e9b-474f-9e67-b07a0eec17df', // Specify the ID of your Watson Assistant instance
        input: {
            'message_type': 'text',
            'text': input.value
        }
    })
        .then(res => {
            // Log the response from Watson Assistant to the console
            console.log(res.result.output.generic[0].text);
        })
        .catch(err => {
            // Log any errors to the console
            console.log(err);
        });
}

// Event listener for button click
// Call getToken function to fetch access token, then call chatbot function
btn.onclick = function () {
    getToken().then(chatbot);
};
