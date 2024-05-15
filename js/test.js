const textToSpeechGenerator = require('./textToSpeech');
const chatbot = require('./assistant');
const fs = require('fs');
const path = require('path');
function delay(time) {
    return new Promise(resolve => setTimeout(resolve, time));
}

jest.setTimeout(20000);

//Test that creates a test.wav file using the textToSpeechGenerator
//The file existence is verified by attempting to move the file into the correct directory
//The file is deleted afterwards
test("Speech file generator test", async () => { 
    
    textToSpeechGenerator("Testing generator", "test.wav");
    await delay(5000);

    // set source and destination of audio files
    const source = path.join(__dirname, "../", "test.wav");
    const dest = path.join(__dirname, "../audio", "test.wav");

    // check appropriate generation
    fs.rename(source, dest, (err) => {
        if (err) {
        response = "File not generated properly";
        } else {
        response = "File generated!";
        }
    });

    await delay(1000);

    // deletes the file if generated improperly
    fs.unlink("./audio/test.wav",
    (err => {
        if (err) console.log(err);
        else {
            console.log("\nDeleted file: test.wav");
        }
    }));
    await delay(500);
    expect(response).toEqual("File generated!"); 
});

// Test invalid question
test("Watson Assistant Invalid question", async () => {
    response = chatbot("abcdefg12345").then(response => {
        expect(response).toEqual("I'm afraid I don't understand. Please rephrase your question.");
    });
    await delay(1000);
});

// Test hobbies question
test("Watson Assistant Hobbies", async () => {
    response = chatbot("Tell me about your hobbies").then(response => {
        expect(response).toEqual("Which hobby would you like to know more about?");
    });
    await delay(1000);
});

// Test work question
test("Watson Assistant Work", async () => {
    response = chatbot("Tell me about your work history").then(response => {
        expect(response).toEqual("What time period would you like to know about?");
    });
    await delay(1000);
});

// Test education question
test("Watson Assistant Education", async () => {
    response = chatbot("Tell me about your education history").then(response => {
        expect(response).toEqual("Which would you like to learn more about?");
    });
    await delay(1000);
});

// Test gaming question (related to hobbies)
test("Watson Assistant Gaming", async () => {
    response = chatbot("Tell me about gaming").then(response => {
        expect(response).toEqual("gaming.wav");
    });
    await delay(1000);
});
