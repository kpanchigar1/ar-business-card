// TODO: add documentation

let playingAudio = false;
window.onload = function(){
    // check if the browser supports navigator.mediaDevices.getUserMedia
    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
        // Request the camera
        navigator.mediaDevices.getUserMedia({ video: true }).catch(function(err) {
            alert('Camera is not supported or permission not granted.');
        });
    }

    var popupContainer = document.getElementById('popup-container');
    var popupBox = document.createElement('div');
    var closeButton = document.createElement('span');
    var startButton = document.createElement('button');

    popupBox.className = 'popup-box';
    closeButton.className = 'close-btn';
    startButton.id = 'startButton';
    startButton.innerText = 'Start';

    popupBox.innerHTML = "<div class=popup-content><h2>Hi there!</h2><p>My name is John McNamara and I am a software engineer at IBM. I am passionate about technology and I am always looking for new challenges. If you want to know more about me, feel free to ask me anything!</p></div>";
    closeButton.innerHTML = "&times;";

    closeButton.addEventListener('click', function() {
        popupContainer.removeChild(popupBox);
    });

    startButton.addEventListener('click', function() {
        popupContainer.removeChild(popupBox);
    });

    popupBox.appendChild(closeButton);
    popupBox.appendChild(startButton);
    popupContainer.appendChild(popupBox);
};

// Function to show the hidden content after a delay
function showContent() {
    console.log("Show content triggered.")

    // Get the content element
    var contentElement1 = document.getElementById('box1');
    var contentElement2 = document.getElementById('box2');
    var contentElement3 = document.getElementById('box3');
    var contentElement4 =
        document.getElementById('speechBubbleA');
    var contentElement5 =
        document.getElementById('speechBubbleB');
    var contentElement6 =
        document.getElementById('speechBubbleC');

    // Show the content
    contentElement1.setAttribute('visible', 'true');
    contentElement2.setAttribute('visible', 'true');
    contentElement3.setAttribute('visible', 'true');
    contentElement4.setAttribute('visible', 'true');
    contentElement5.setAttribute('visible', 'true');
    contentElement6.setAttribute('visible', 'true');

    // Create a dictionary that maps speech bubble text to audio files
    var speechBubbleToAudioMap = {
        'Work?': '/audio/workHistory.wav',
        'Education?': '/audio/education.wav',
        'Hobbies?': '/audio/hobbies.wav'
        // Add more mappings as needed
    };

    // Register click event listener for each speech bubble
    document.getElementById('box1').addEventListener('click', function() {
        var speechBubble = document.getElementById('speechBubbleA');
        var speechBubbleText = speechBubble.getAttribute('text').value;
        var audio = new Audio('https://startling-hummingbird-a198e7.netlify.app'+ speechBubbleToAudioMap[speechBubbleText]);
        if(!playingAudio){
            audio.play();
            playingAudio = true;
        }
        audio.addEventListener('ended', function(){
            playingAudio = false;
        });
    });

    document.getElementById('box2').addEventListener('click', function() {
        var speechBubble = document.getElementById('speechBubbleB');
        var speechBubbleText = speechBubble.getAttribute('text').value;
        var audio = new Audio('https://startling-hummingbird-a198e7.netlify.app'+ speechBubbleToAudioMap[speechBubbleText]);
        if(!playingAudio){
            audio.play();
            playingAudio = true;
        }
        audio.addEventListener('ended', function(){
            playingAudio = false;
        });
    });

    document.getElementById('box3').addEventListener('click', function() {
        var speechBubble = document.getElementById('speechBubbleC');
        var speechBubbleText = speechBubble.getAttribute('text').value;
        var audio = new Audio('https://startling-hummingbird-a198e7.netlify.app'+ speechBubbleToAudioMap[speechBubbleText]);
        if(!playingAudio){
            audio.play();
            playingAudio = true;
        }
        audio.addEventListener('ended', function(){
            playingAudio = false;
        });
    });

    // show question form popup
    // showPopup();
}

// TODO: add a message to the user that the camera is not supported


let overviewPlayed = false;

// Disabling the raycaster component when the page loads to avoid accidental clicks
document.querySelector('a-cursor').setAttribute('raycaster', 'enabled', false);

document.querySelector('a-marker').addEventListener('markerFound', function() {
    // Enable the raycaster component when the marker is found
    document.querySelector('a-cursor').setAttribute('raycaster', 'enabled', true);

    // Call the showContent function after 10000 milliseconds (10 seconds)
    setTimeout(showContent, 10000);

    if (!overviewPlayed && !playingAudio) {
        let audio = new Audio('https://startling-hummingbird-a198e7.netlify.app/audio/overview.wav');
        audio.play();
        overviewPlayed = true;
        console.log("Overview audio played.")
        playingAudio = true;
        audio.addEventListener('ended', function(){
            playingAudio = false;
        });
    }

    document.getElementById('email').setAttribute('visible', 'true');
    document.getElementById('email').setAttribute('href', 'mailto:j0nnymac@uk.ibm.com');
    // console.log('set email visible and add href');

    document.getElementById('linkedin').setAttribute('visible', 'true');
    document.getElementById('linkedin').setAttribute('href', 'https://uk.linkedin.com/in/jonmcnamara');
    // console.log('set linkedin visible and add href');
});

// Function to show the question popup
function showPopup() {
    document.getElementById("popup-form").addAttribute('hidden');
}

// Function to hide the question popup
function hidePopup() {
    document.getElementById("popup-form").removeAttribute('hidden')
}

// Function to handle question form submission
function handleSubmit(event) {
    event.preventDefault(); // Prevent the form from submitting normally
    var userInput = document.getElementById("textInput").value;
    alert("Question asked: " + userInput);
    hidePopup(); // Hide question form after submission
}

// Event listener for form submission
document.getElementById("popupForm").addEventListener("submit", handleSubmit);

