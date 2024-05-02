const chatbot = require('./chatbot')
// Function to handle question form submission
function handleSubmit() {
// Importing the chatbot function from assistant.js using require.js
    console.log("handle submit was called")
    console.log("about to load chatbot")
        console.log("handleSubmit is active")
        userInput = document.getElementById("textInput").value;
        console.log("User input: " + userInput);
        let watsonResponse = chatbot("BJJ");
            if (watsonResponse = "BJJ.wav") {
                var captionNum = 0
            }
            else if (watsonResponse = "gaming.wav") {
                var captionNum = 1
            }
            else if (watsonResponse = "writing.wav") {
                var captionNum = 2
            }
            else if (watsonResponse = "workExperience.wav") {
                var captionNum = 3
            }
            else if (watsonResponse = "university.wav") {
                var captionNum = 4
            }
            else if (watsonResponse = "degree.wav") {
                var captionNum = 5
            }
            else if (watsonResponse = "1999-2004.wav") {
                var captionNum = 6
            }
            else if (watsonResponse = "2004-2012.wav") {
                var captionNum = 7
            }
            else if (watsonResponse = "2012-2016.wav") {
                var captionNum = 8
            }
            else if (watsonResponse = "2015-2019.wav") {
                var captionNum = 9
            }
            else if (watsonResponse = "2019-present.wav") {
                var captionNum = 10
            }
            else {
                var captionNum = 11
                // TODO we need to add a .wav file for when the avatar doesn't know how to respond, can we make the chatbot return this .wav file when it is unsure?
            }
            var audio = new Audio('https://startling-hummingbird-a198e7.netlify.app/audio/' + watsonResponse);
            var caption = captions[captionNum]
            audio.play();
            console.log("Response audio played.")
            playingAudio = true;
            displayCaption(caption);
            audio.addEventListener('ended', function(){
                playingAudio = false;
                hideCaption();
            });
            hidePopup(); // Hide question form after submission
};

document.getElementById("submit_button").addEventListener("click", handleSubmit("BJJ"));
