'use strict';

const AssistantV2 = require('ibm-watson/assistant/v2');
const { BearerTokenAuthenticator } = require('ibm-watson/auth');

const btn = document.getElementById('submit_button');
const input = document.getElementById('input_text');

function getToken() {
    return fetch('/api/token').then(resp => resp.json());
}

function chatbot(credentials) {
    const assistant = new AssistantV2({
        authenticator: new BearerTokenAuthenticator({
            bearerToken: credentials.accessToken,
        }),
        url: credentials.url,
        version: '2021-06-14',
    });

    assistant.messageStateless({
        assistantId: 'dd0e8243-5e9b-474f-9e67-b07a0eec17df',
        input: {
            'message_type': 'text',
            'text': input.value
        }
    })
        .then(res => {
            console.log(res.result.output.generic[0].text);
        })
        .catch(err => {
            console.log(err);
        });
}

btn.onclick = function () {
    getToken().then(chatbot);
};