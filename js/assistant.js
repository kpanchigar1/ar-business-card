const AssistantV2 = require('ibm-watson/assistant/v2');
const { IamAuthenticator } = require('ibm-watson/auth');

const assistant = new AssistantV2({
  version: '2021-06-14',
  authenticator: new IamAuthenticator({
    apikey: 'UVyG7eL6sBcZmZgtCFi2-p__r1EMv1c2c-2I1R716hJz',
  }),
  serviceUrl: 'https://api.eu-gb.assistant.watson.cloud.ibm.com/instances/cd153831-2882-424a-921f-cd367fc10c99',
});

assistant.messageStateless({
  assistantId: 'dd0e8243-5e9b-474f-9e67-b07a0eec17df',
  input: {
    'message_type': 'text',
    'text': 'Work history'
    }
  })
  .then(res => {
    console.log(JSON.stringify(res.result, null, 2));
  })
  .catch(err => {
    console.log(err);
  });