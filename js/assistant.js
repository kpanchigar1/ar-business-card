const AssistantV2 = require('ibm-watson/assistant/v2');
const { IamAuthenticator } = require('ibm-watson/auth');


const assistant = new AssistantV2({
  version: '2021-06-14',
  authenticator: new IamAuthenticator({
    apikey: 'UVyG7eL6sBcZmZgtCFi2-p__r1EMv1c2c-2I1R716hJz', // insert watson resource api key
  }),
  // insert watson resource url
  serviceUrl: 'https://api.eu-gb.assistant.watson.cloud.ibm.com/instances/cd153831-2882-424a-921f-cd367fc10c99',
});



function chatbot(question){
    return assistant.messageStateless({  // calls the chatbot assistant with whatever question is passed in
        assistantId: 'dd0e8243-5e9b-474f-9e67-b07a0eec17df',
        input: {
            'message_type': 'text',
            'text': question
            }
    })
    .then(res => {
        let responseText = res.result.output.generic[0].text; // saves the chatbot's response in responseText
        return responseText;
    })
  .catch(err => {
    console.log(err);
  });
};

chatbot("Work History") // calls the chatbot function with a "Work History" question, this needs to be removed and
                        //implemented elsewhere when needed
    .then(response => {
        console.log(response);
    })
    .catch(err => {
        console.error("Error:", err);
    });

module.exports = chatbot;

