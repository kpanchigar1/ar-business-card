// TODO: add documentation
// TODO: fix T-Pose issue with model
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
    var speechBubbleToAudioMap= {
        'Click here to learn \n about my work': ['/audio/workHistory.wav', "I have worked at IBM for 24 years, starting as a Technical Integration Consultant in 1999, and I currently work as a UK University Programs Lead. I have a background that includes consultancy, performance, service & product delivery, all of which is underpinned by a passion for innovation. I am also the Chair of the Board for the South Coast Institute of Technology."],
        'Click here to learn \n about my education': ['/audio/education.wav', "I attended the University of Hull from 1991-1994 and achieved a 2 1 in Information Systems. During my degree, I worked in a management position for UCI cinemas."],
        'Click here to learn \n about my hobbies': ['/audio/hobbies.wav', "I enjoy gaming, inventing, hacking, writing, making presentations, Brazilian Jiu-Jitsu, medical service robots and space exploration."],
        'Try asking about \n my work between \n 1999-2004...': ['/audio/1999-2004.wav', "I was a technical Integration Consultant for IBM. This was a role which involved me engaging with clients, ranging from banks to pharmaceutical companies, in the optimal method of approaching and executing the integration of their business systems."],
        'Try asking about \n my work between \n 2004-2012...': ['/audio/2004-2012.wav', "I was a BPM consultant for IBM. This was a role which involved me consulting with clients worldwide, to engage in leading the application of gold standard business process methodologies to new and existing ventures as well as enhancing the effectiveness of these processes with the use of BPM software."],
        'Try asking about \n my work between \n 2012-2016...': ['/audio/2012-2016.wav', "I was an Information Strategist and Architect for IBM. This was a role which involved the design of information and information delivery to support IBM products such as WebSphere MQ and WebSphere Message Broker."],
        'Try asking about \n my work between \n 2016-2019...': ['/audio/2016-2019.wav', "I was a Senior Inventor and IBM Hursley Innovation Labs Technologist Lead. I was responsible for a team of technologists in the IBM Hursley Innovation Labs; a vital part of the IBM Hursley Development Labs in Winchester."],
        'Try asking about \n my work between \n 2019-Present...': ['/audio/2019-Present.wav', "I was a UK universities lead and senior inventor from June 2019 to January 2020. I currently work as an IBM master inventor and IBM UK university programs lead."],
        'Try asking about \n my work \n experience...': ['/audio/workExperience.wav', "In my role I was responsible for site operations, people management and customer relations. This was a rich and fulfilling role, which gave me my first real taste of management, dealing with customers and working alongside the staff members to create a rewarding customer experience."],
        'Try asking about \n my university...': ['/audio/university.wav', "The University of Hull was formed in 1927, making them the 14th oldest university in England. It has a proud history of academic excellence and creating and inspiring life-changing research."],
        'Try asking about \n my degree...': ['/audio/degree.wav', "My information systems degree gave me a range of specialist skills in areas such as: hardware, software development and programming, systems analysis, database systems and design."],
        'Try asking about \n brazilian jiu-jitsu...': ['/audio/BJJ.wav', "Brazilian jiu-jitsu is a self-defence martial art and combat sport based on grappling, ground fighting, and submission holds. BJJ focuses on taking ones opponent down to the ground, gaining a dominant position, and using a number of techniques to force them into submission via joint locks or chokeholds."],
        'Try asking about \n gaming...': ['/audio/gaming.wav', "I have played project Gotham,  Counter-strike, Battlefield, Dirt, Gran Turismo, Halo, and countless others."],
        'Try asking about \n writing...': ['/audio/writing.wav', "I have a wordpress site where I share my thoughts and current work. You can find it at j0nnymac.wordpress.com."],
        'Klicken Sie hier, \n um mehr über meine \n Arbeit zu erfahren': ['/audio/de-workHistory.wav', "Ich arbeite seit 24 Jahren bei IBM, begann 1999 als Berater für technische Integration und arbeite derzeit als Programmleiter für Universitäten in Großbritannien. Ich verfüge über einen Hintergrund, der Beratung, Leistung, Service und Produktlieferung umfasst, und all dies wird durch eine Leidenschaft für Innovation untermauert. Ich bin außerdem Vorstandsvorsitzender des South Coast Institute of Technology."],
        "Klicken Sie hier, \n  um mehr über meine \n Ausbildung zu erfahren": ['/audio/de-education.wav', "Ich besuchte die University of Hull von 1991 bis 1994 und erlangte einen 2 1 in Informationssystemen. Während meines Studiums war ich in einer Führungsposition für UCI-Kinos tätig."],
        'Klicken Sie hier, \n um mehr über meine \n Hobbys zu erfahren': ['/audio/de-hobbies.wav', "Ich genieße das Spielen, Erfinden, Hacken, Schreiben, Präsentieren, brasilianisches Jiu-Jitsu, medizinische Serviceroboter und Weltraumforschung."],
        'Versuchen Sie, nachzufragen \n meine Arbeit zwischen \n 1999-2004...': ['/audio/de-1999-2004.wav', "Ich war technischer Integrationsberater für IBM. In dieser Rolle musste ich mich mit Kunden, von Banken bis hin zu Pharmaunternehmen, an der optimalen Herangehensweise und Umsetzung der Integration ihrer Geschäftssysteme beteiligen."],
        'Versuchen Sie, nachzufragen \n meine Arbeit zwischen \n 2004-2012...': ['/audio/de-2004-2012.wav', "Ich war BPM-Berater für IBM. In dieser Rolle beriet ich Kunden auf der ganzen Welt, um die Anwendung von Goldstandard-Geschäftsprozessmethoden auf neue und bestehende Unternehmen zu leiten und die Effektivität dieser Prozesse durch den Einsatz von BPM-Software zu steigern."],
        'Versuchen Sie, nachzufragen \n meine Arbeit zwischen \n 2012-2016...': ['/audio/de-2012-2016.wav', "Ich war Informationsstratege und Architekt für IBM. Dabei handelte es sich um eine Rolle, die das Design von Informationen und die Informationsbereitstellung zur Unterstützung von IBM-Produkten wie WebSphere MQ und WebSphere Message Broker umfasste."],
        'Versuchen Sie, nachzufragen \n meine Arbeit zwischen \n 2016-2019...': ['/audio/de-2016-2019.wav', "Ich war leitender Erfinder und technischer Leiter der IBM Hursley Innovation Labs. Ich war für ein Team von Technologen in den IBM Hursley Innovation Labs verantwortlich; ein wichtiger Teil der IBM Hursley Development Labs in Winchester."],
        'Versuchen Sie \n meine Arbeit zwischen \n 2019-Gegenwärtig...': ['/audio/de-2019-Present.wav', "Von Juni 2019 bis Januar 2020 war ich Leiter einer britischen Universität und leitender Erfinder. Derzeit arbeite ich als IBM-Master-Erfinder und Leiter der IBM UK-Universitätsprogramme."],
        'Versuchen Sie \n meine Arbeit \n Erfahrung...': ['/audio/de-workExperience.wav', "In meiner Rolle war ich für den Standortbetrieb, das Personalmanagement und die Kundenbeziehungen verantwortlich. Dies war eine reichhaltige und erfüllende Rolle, die mir einen ersten echten Eindruck vom Management, dem Umgang mit Kunden und der Zusammenarbeit mit den Mitarbeitern vermittelte, um ein lohnendes Kundenerlebnis zu schaffen."],
        'Versuchen Sie \n meine univer...': ['/audio/de-university.wav', "Die University of Hull wurde 1927 gegründet und ist damit die 14. älteste Universität Englands. Es kann auf eine stolze Geschichte akademischer Exzellenz und der Schaffung und Inspiration lebensverändernder Forschung zurückblicken."],
        'Versuchen Sie \n mein Abschluss...': ['/audio/de-degree.wav', "Mein Informatikstudium vermittelte mir eine Reihe von Fachkenntnissen in Bereichen wie Hardware, Softwareentwicklung und -programmierung, Systemanalyse, Datenbanksysteme und Design."],
        'Versuchen Sie \n brasilianisches Jiu-Jitsu...': ['/audio/de-BJJ.wav', "Brasilianisches Jiu-Jitsu ist eine Kampfkunst und Kampfsportart zur Selbstverteidigung, die auf Grappling, Bodenkämpfen und Unterwerfungsgriffen basiert. Beim BJJ geht es darum, den Gegner zu Boden zu bringen, eine dominante Position einzunehmen und eine Reihe von Techniken anzuwenden, um ihn durch Gelenkverriegelungen oder Würgegriffe zur Unterwerfung zu zwingen."],
        'Versuchen Sie \n gaming...': ['/audio/de-gaming.wav', "Ich habe Projekt Gotham, Counter-Strike, Battlefield, Dirt, Gran Turismo, Halo und unzählige andere gespielt."],
        'Versuchen Sie \n Schreiben...': ['/audio/de-writing.wav', "Ich habe eine Wordpress-Seite, auf der ich meine Gedanken und meine aktuelle Arbeit teile. Sie finden sie unter j0nnymac.wordpress.com."]
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

        // Randomly selects the options to display since there are 5 options and only 3 can be displayed at a time
        // Shuffles the options and selects the first 3
        let options;
        let englishOptions = [
            "Try asking about \n my work between \n 1999-2004...",
            "Try asking about \n my work between \n 2004-2012...",
            "Try asking about \n my work between \n 2012-2016...",
            "Try asking about \n my work between \n 2016-2019...",
            "Try asking about \n my work between \n 2019-Present..."];

        let germanOptions = [
            "Versuchen Sie, nachzufragen \\n meine Arbeit zwischen \\n 1999-2004...",
            "Versuchen Sie, nachzufragen \\n meine Arbeit zwischen \\n 2004-2012...",
            "Versuchen Sie, nachzufragen \\n meine Arbeit zwischen \\n 2012-2016...",
            "Versuchen Sie, nachzufragen \\n meine Arbeit zwischen \\n 2016-2019...",
            "Versuchen Sie \\n meine Arbeit zwischen \\n 2019-Gegenwärtig..."];

        if (language === "german") {
            options = germanOptions;
        } else {
            options = englishOptions;
        }

        function shuffle(array) {
            for (let i = array.length - 1; i > 0; i--) {
                let j = Math.floor(Math.random() * (i + 1));
                [array[i], array[j]] = [array[j], array[i]];
            }
        }
        shuffle(options);
        let selectedOptions = options.slice(0, 3);

        changeText(selectedOptions[0], selectedOptions[1], selectedOptions[2], "default");
        displayBackButton();
    });

    document.getElementById('box2').addEventListener('click', function() {
        var speechBubble = document.getElementById('speechBubbleB');
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
            document.getElementById('john-model').setAttribute('animation-mixer', 'clip: Talk; loop: repeat');
            playingAudio = true;
            displayCaption(caption);
        }
        audio.addEventListener('ended', function(){
            playingAudio = false;
            document.getElementById('john-model').setAttribute('animation-mixer', 'clip: Idle; loop: repeat');
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
    contentElement4.setAttribute('position', "-1.2 7.5 0.2");
    contentElement5.setAttribute('position', "3.2 9.3 0.2");
    contentElement6.setAttribute('position', "7 7.5 0.2");

    // Set all content to visible
    contentElement1.setAttribute('visible', 'true');
    contentElement2.setAttribute('visible', 'true');
    contentElement3.setAttribute('visible', 'true');
    contentElement4.setAttribute('visible', 'true');
    contentElement5.setAttribute('visible', 'true');
    contentElement6.setAttribute('visible', 'true');
}

let overviewPlayed = false;

// Disabling the raycaster component when the page loads to avoid accidental clicks
document.querySelector('a-cursor').setAttribute('raycaster', 'enabled: false');

document.querySelector('a-marker').addEventListener('markerFound', function() {
    document.getElementById('john-model').setAttribute('animation-mixer', 'clip: Stand; loop: once');
    // Enable the raycaster component when the marker is found
    document.querySelector('a-cursor').setAttribute('raycaster', 'enabled: true');

    // Call the showContent function after 10000 milliseconds (10 seconds)
    setTimeout(showContent, 10000);
    
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
        document.getElementById('john-model').setAttribute('animation-mixer', 'clip: Talk; loop: repeat');
        console.log("Overview audio played.")
        overviewPlayed = true;
        playingAudio = true;
        displayCaption(caption);
        audio.addEventListener('ended', function(){
            document.getElementById('john-model').setAttribute('animation-mixer', 'clip: Idle; loop: repeat');
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
        // TODO: add german text
        if(language === "german"){
            changeText("Klicken Sie hier, \n um mehr über meine \n Arbeit zu erfahren", "Klicken Sie hier, \n  um mehr über meine \n Ausbildung zu erfahren",
                "Klicken Sie hier, \n um mehr über meine \n Hobbys zu erfahren", "default");
        }
        else {
            changeText("Click here to learn \n about my work", "Click here to learn \n about my education",
                "Click here to learn \n about my hobbies", "default");
        }
        document.getElementById('back').setAttribute('visible', 'false');
    });

}

