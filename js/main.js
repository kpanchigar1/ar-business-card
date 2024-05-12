// TODO: add documentation
console.log("loaded main.js")

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
    var germanButton = document.createElement('button');
    var englishButton = document.createElement('button');
    console.log("language");
    console.log(language);

    popupBox.className = 'popup-box';
    germanButton.innerText = 'Deutsch';
    englishButton.innerText = 'English';

    popupBox.innerHTML = "<div class=popup-content><h2>Hi there!</h2><p>My name is John McNamara and I am a software engineer at IBM. I am passionate about technology and I am always looking for new challenges. If you want to know more about me, feel free to ask me anything! Please choose a language: </p></div>";

    germanButton.addEventListener('click', function() {
        language = "german";
        updateTextContent();
        popupContainer.removeChild(popupBox);
    });

    englishButton.addEventListener('click', function() {
        language = "english";
        updateTextContent();
        popupContainer.removeChild(popupBox);
    });

    popupBox.appendChild(germanButton);
    popupBox.appendChild(englishButton);
    popupContainer.appendChild(popupBox);
    console.log("load things working")

    function updateTextContent() {
        var workText, educationText, hobbiesText;
        if (language === "german") {
            workText = "Klicken Sie hier, \n um mehr über meine \n Arbeit zu erfahren";
            educationText = "Klicken Sie hier, \n  um mehr über meine \n Ausbildung zu erfahren";
            hobbiesText = "Klicken Sie hier, \n um mehr über meine \n Hobbys zu erfahren";
        } else {
            workText = "Click here to learn \n about my work";
            educationText = "Click here to learn \n about my education";
            hobbiesText = "Click here to learn \n about my hobbies";
        }

        // Update speech bubble text
        document.getElementById("speechBubbleA").setAttribute("text", "value", workText);
        document.getElementById("speechBubbleB").setAttribute("text", "value", educationText);
        document.getElementById("speechBubbleC").setAttribute("text", "value", hobbiesText);
    }
    // Update speech bubble text values
    //document.getElementById("speechBubbleA").setAttribute("text", "value", workText);
//    document.getElementById("speechBubbleB").setAttribute("text", "value", educationText);
//    document.getElementById("speechBubbleC").setAttribute("text", "value", hobbiesText);
}

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

    // Create a dictionary that maps speech bubble text to audio files and captions
    var speechBubbleToAudioMap = {
        'Click here to learn \n about my work': ['/audio/workHistory.wav', "I have worked at IBM for 24 years, starting as a Technical Integration Consultant in 1999, and I currently work as a UK University Programs Lead. I have a background that includes consultancy, performance, service & product delivery, all of which is underpinned by a passion for innovation. I am also the Chair of the Board for the South Coast Institute of Technology."],
        'Click here to learn \n about my education': ['/audio/education.wav', "I attended the University of Hull from 1991-1994 and achieved a 2 1 in Information Systems. During my degree, I worked in a management position for UCI cinemas."],
        'Click here to learn \n about my hobbies': ['/audio/hobbies.wav', "I enjoy gaming, inventing, hacking, writing, making presentations, Brazilian Jiu-Jitsu, medical service robots and space exploration."],
        'Klicken Sie hier, \n um mehr über meine \n Arbeit zu erfahren': ['/audio/de-workHistory.wav', "Ich arbeite seit 24 Jahren bei IBM, begann 1999 als Berater für technische Integration und arbeite derzeit als Programmleiter für Universitäten in Großbritannien. Ich verfüge über einen Hintergrund, der Beratung, Leistung, Service und Produktlieferung umfasst, und all dies wird durch eine Leidenschaft für Innovation untermauert. Ich bin außerdem Vorstandsvorsitzender des South Coast Institute of Technology."],
        'Klicken Sie hier, \n um mehr über meine \n Ausbildung zu erfahren': ['/audio/de-education.wav', "Ich besuchte die University of Hull von 1991 bis 1994 und erlangte einen 2 1 in Informationssystemen. Während meines Studiums war ich in einer Führungsposition für UCI-Kinos tätig."],
        'Klicken Sie hier, \n um mehr über meine \n Hobbys zu erfahren': ['/audio/de-hobbies.wav', "Ich genieße das Spielen, Erfinden, Hacken, Schreiben, Präsentieren, brasilianisches Jiu-Jitsu, medizinische Serviceroboter und Weltraumforschung."]
    };

    // Register click event listener for each speech bubble
    document.getElementById('box1').addEventListener('click', function() {
        var speechBubble = document.getElementById('speechBubbleA');
        var speechBubbleText = speechBubble.getAttribute('text').value;
        var audio = new Audio('https://startling-hummingbird-a198e7.netlify.app'+ speechBubbleToAudioMap[speechBubbleText][0]);
        var caption = speechBubbleToAudioMap[speechBubbleText][1];
        if(!playingAudio){
            audio.play();
            document.getElementById('john-model').setAttribute('animation-mixer', 'clip: Talk; loop: repeat');
            playingAudio = true;
            displayCaption(caption);
        }
        audio.addEventListener('ended', function(){
            document.getElementById('john-model').setAttribute('animation-mixer', 'clip: Idle; loop: repeat');
            playingAudio = false;

            hideCaption();
        });
        if (language === "german"){
            changeText("Versuchen Sie, nachzufragen \n meine Arbeit zwischen \n 1999-2004...", "Versuchen Sie \n meine Arbeit zwischen \n 2012-2016...",
                         "Versuchen Sie \n meine Arbeit zwischen \n 2019-Gegenwärtig...", "#0000FF");
        }
        else{
            changeText("Try asking about \n my work between \n 1999-2004...", "Try asking about \n my work between \n 2012-2016...",
                        "Try asking about \n my work between \n 2019-Present...", "#0000FF");
        }
        displayBackButton();
    });

    document.getElementById('box2').addEventListener('click', function() {
        var speechBubble = document.getElementById('speechBubbleB');
        var speechBubbleText = speechBubble.getAttribute('text').value;
        var audio = new Audio('https://startling-hummingbird-a198e7.netlify.app'+ speechBubbleToAudioMap[speechBubbleText][0]);
        var caption = speechBubbleToAudioMap[speechBubbleText][1];
        if(!playingAudio){
            audio.play();
            playingAudio = true;
            displayCaption(caption);
        }
        audio.addEventListener('ended', function(){
            playingAudio = false;
            hideCaption();
        });
        if (language === "german"){
            changeText("Versuchen Sie \n meine Arbeit \n Erfahrung...", "Versuchen Sie \n meine univer...",
                                               "Versuchen Sie \n mein Abschluss...", "#FF0000");
        }
        else{
            changeText("Try asking about \n my work \n experience...", "Try asking about \n my university...",
                        "Try asking about \n my degree...", "#FF0000");
        }
        displayBackButton();
    });

    document.getElementById('box3').addEventListener('click', function() {
        var speechBubble = document.getElementById('speechBubbleC');
        var speechBubbleText = speechBubble.getAttribute('text').value;
        var audio = new Audio('https://startling-hummingbird-a198e7.netlify.app'+ speechBubbleToAudioMap[speechBubbleText][0]);
        var caption = speechBubbleToAudioMap[speechBubbleText][1];
        if(!playingAudio){
            audio.play();
            playingAudio = true;
            displayCaption(caption);
        }
        audio.addEventListener('ended', function(){
            playingAudio = false;
            hideCaption();
        });
        if (language === "german"){
            changeText("Versuchen Sie \n brasilianisches Jiu-Jitsu...", "Versuchen Sie \n gaming...", "Versuchen Sie \n Schreiben...",
                                    "#00FF00");
        }
        else{
            changeText("Try asking about \n brazilian jiu-jitsu...", "Try asking about \n gaming...", "Try asking about \n writing...",
                        "#00FF00");
        }
        displayBackButton();
    });

    // show question form popup
    // showPopup();
}

function changeText(text1, text2, text3, colour) {
    console.log("Speech bubble content changes")
    console.log(text1)

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

    // Change the content in the speech bubbles
    contentElement4.setAttribute('text', "value: " + text1);
    contentElement5.setAttribute('text', "value: " + text2);
    contentElement6.setAttribute('text', "value: " + text3);

    // Changing the colour of the boxes
    if(colour === "default") {
        contentElement1.setAttribute('color', "#0000FF");
        contentElement2.setAttribute('color', "#FF0000");
        contentElement3.setAttribute('color', "#00FF00");
    }
    else {
        contentElement1.setAttribute('color', colour);
        contentElement2.setAttribute('color', colour);
        contentElement3.setAttribute('color', colour);
    }

    // Changing the position of the text
    contentElement4.setAttribute('position', "-0.8 8 0.2");
    contentElement5.setAttribute('position', "3.2 12 0.2");
    contentElement6.setAttribute('position', "7.2 8 0.2");

    // Set all content to visible
    contentElement1.setAttribute('visible', 'true');
    contentElement2.setAttribute('visible', 'true');
    contentElement3.setAttribute('visible', 'true');
    contentElement4.setAttribute('visible', 'true');
    contentElement5.setAttribute('visible', 'true');
    contentElement6.setAttribute('visible', 'true');
}

// TODO: add a message to the user that the camera is not supported


let overviewPlayed = false;

// Disabling the raycaster component when the page loads to avoid accidental clicks
document.querySelector('a-cursor').setAttribute('raycaster', 'enabled: false');

document.querySelector('a-marker').addEventListener('markerFound', function() {
    // Enable the raycaster component when the marker is found
    document.querySelector('a-cursor').setAttribute('raycaster', 'enabled: true');

    // Call the showContent function after 10000 milliseconds (10 seconds)
    setTimeout(showContent, 10000);
    setTimeout(showPopup, 10000);
    
    if (!overviewPlayed && !playingAudio) {
        if (language === "german"){
            var audio = new Audio('https://startling-hummingbird-a198e7.netlify.app/audio/de-overview.wav');
            var caption = "Ich bin John McNamara, IBM Master Inventor, Honorarprofessor, wissenschaftlicher Mitarbeiter, Schlagmann und Leiter derzeit IBM UK University Programs.";
        }
        else{
            var audio = new Audio('https://startling-hummingbird-a198e7.netlify.app/audio/overview.wav');
            var caption = "I’m John McNamara, an IBM Master Inventor, Honorary Professor, Research Fellow, Impact Fellow and I currently lead IBM UK University Programs.";
        }
        audio.play();
        document.getElementById('john-model').setAttribute('animation-mixer', 'clip: Stand; loop: once');
        console.log("Overview audio played.")
        overviewPlayed = true;
        playingAudio = true;
        displayCaption(caption);
        audio.addEventListener('ended', function(){
            playingAudio = false;
            hideCaption();
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
function hidePopup() {
    document.getElementById("popup").setAttribute('hidden', 'true');
}

// Function to hide the question popup
function showPopup() {
    document.getElementById("popup").removeAttribute('hidden');
}

// function to display captions
function displayCaption(captionText) {
    document.getElementById('caption').setAttribute('style', 'display: block');
    document.getElementById('caption').textContent = captionText;
}

// function to hide captions
function hideCaption() {
    document.getElementById('caption').textContent = "";
    document.getElementById('caption').setAttribute('style', 'display: none');
}

// function to display the back button
function displayBackButton() {
    let backButton = document.getElementById('back');
    backButton.setAttribute('visible', 'true');
    backButton.addEventListener('click', function(){
    changeText("\"Click here to learn \\n about my work\"", "Click here to learn \n about my education",
            "Click here to learn \n about my hobbies", "default");
        document.getElementById('back').setAttribute('visible', 'false');
    });

}

