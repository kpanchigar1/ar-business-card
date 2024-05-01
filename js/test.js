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

    const source = path.join(__dirname, "../", "test.wav");
    const dest = path.join(__dirname, "../audio", "test.wav");

    fs.rename(source, dest, (err) => {
        if (err) {
        response = "File not generated properly";
        } else {
        response = "File generated!";
        }
    });

    await delay(1000);
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


//Tests for the Watson Assistant responses, checking replies to certain questions
test("Watson Assistant Invalid question", async () => {
    response = chatbot("abcdefg12345").then(response => {
        expect(response).toEqual(undefined);
    });
    await delay(1000);
});

test("Watson Assistant Hobbies", async () => {
    response = chatbot("Tell me about your hobbies").then(response => {
        expect(response).toEqual("hobbiesOptions.wav");
    });
    await delay(1000);
});

test("Watson Assistant Work", async () => {
    response = chatbot("Tell me about your work history").then(response => {
        expect(response).toEqual("workHistoryOptions.wav");
    });
    await delay(1000);
});

test("Watson Assistant Education", async () => {
    response = chatbot("Tell me about your education history").then(response => {
        expect(response).toEqual("educationOptions.wav");
    });
    await delay(1000);
});

test("Watson Assistant BJJ", async () => {
    response = chatbot("Tell me about Brazilian jiu jitsu").then(response => {
        console.log(response);
        expect(response).toEqual("BJJ.wav");
    });
    await delay(1000);
});

test("Watson Assistant University", async () => {
    response = chatbot("Tell me about the University of Hull").then(response => {
        expect(response).toEqual("university.wav");
    });
    await delay(1000);
});

test("Watson Assistant 1999-2004", async () => {
    response = chatbot("Work history from 1999-2004").then(response => {
        expect(response).toEqual("1999-2004.wav");
    });
    await delay(1000);
});
