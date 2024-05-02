const AssistantV2 = require('ibm-watson/assistant/v2');
const { IamAuthenticator } = require('ibm-watson/auth');

const assistant = new AssistantV2({
    version: '2021-06-14',
    authenticator: new IamAuthenticator({
        apikey: process.env.API_KEY, // Use environment variable
    }),
    serviceUrl: process.env.SERVICE_URL, // Use environment variable
});

exports.handler = async (event, context) => {
    try {
        const session = await assistant.createSession({
            assistantId: process.env.ASSISTANT_ID, // Use environment variable
        });

        return {
            statusCode: 200,
            body: JSON.stringify({ access_token: session.result.session_id }),
        };
    } catch (err) {
        console.log(err);
        return {
            statusCode: 500,
            body: 'Error retrieving access token',
        };
    }
};