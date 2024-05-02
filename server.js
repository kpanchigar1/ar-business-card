const express = require('express');
const bodyParser = require('body-parser');
const AssistantV2 = require('ibm-watson/assistant/v2');
const { IamAuthenticator } = require('ibm-watson/auth');

const app = express();
const port = process.env.PORT || 3000; // Use the PORT environment variable or default to 3000

const assistant = new AssistantV2({
  version: '2021-06-14',
  authenticator: new IamAuthenticator({
    apikey: 'UVyG7eL6sBcZmZgtCFi2-p__r1EMv1c2c-2I1R716hJz', // Replace with your IBM Watson API key
  }),
  serviceUrl: 'https://api.eu-gb.assistant.watson.cloud.ibm.com/instances/cd153831-2882-424a-921f-cd367fc10c99', // Replace with your IBM Watson service URL
});

app.use(bodyParser.json());

app.post('/api/chatbot', async (req, res) => {
  try {
    const userInput = req.body.userInput;
    const response = await assistant.messageStateless({
      assistantId: 'dd0e8243-5e9b-474f-9e67-b07a0eec17df',
      input: {
        'message_type': 'text',
        'text': userInput
      }
    });
    const responseText = response.result.output.generic[0].text;
    res.json({ responseText });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = app; // Export the Express app instance
