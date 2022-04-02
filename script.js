/**Gibt die Nummer der aktuellen Frage an. Startet bei 0, weil arrays immer bei 0 starten */
let currentQuestion = 0;

/**Gibt die erreichte Punktzahl an. */
let score = 0;

/**Gibt an, welches Quiz gewählt wurde und geladen werden soll */
let selectedQuiz = genetics;

let AUDIO_SUCCESS = new Audio('audio/success.mp3');
let AUDIO_FAIL = new Audio('audio/fail.mp3');


/**wählt das gewünschte Quiz aus und initialisiert es */
function chooseQuiz(choice) {
    selectQuiz(choice);
    removeWhiteBarOfLinks();
    setWhiteBarOfLink(choice);
    restart();
}


/** entferne alle weißen Balken bei den Links */
function removeWhiteBarOfLinks() {
    document.getElementById('genetics').classList.remove('active');
    document.getElementById('proportionality').classList.remove('active');
    document.getElementById('percentCalculation').classList.remove('active');
    document.getElementById('circle').classList.remove('active');
}


/** entferne alle weißen Balken bei den Links */
function setWhiteBarOfLink(choice) {
    document.getElementById(choice).classList.add('active');
}


/**wähle das richtige Quiz aus und schreibe es ins Array selectedQuiz */
function selectQuiz(choice) {
    if (choice == 'genetics') {
        selectedQuiz = genetics;
    } else if (choice == 'proportionality') {
        selectedQuiz = proportionality;
    } else if (choice == 'percentCalculation') {
        selectedQuiz = percentCalculation;
    } else if (choice == 'circle') {
        selectedQuiz = circle;
    }
}


/**Wird aufgerufen, wenn die App neu geladen oder der replay-Button gedrückt wird. */
function init() {
    document.getElementById('all-questions').innerHTML = selectedQuiz.length; // rendert den string Gesamtzahl der Fragen; das ist nur am Beginn nötig, Gesamtzahl der Fragen ändert sich während Beantwortung nicht
    showQuestion(); // rendert die einzelne Frage
}


/**Öffnet das Quiz */
function openQuiz() {
    showQuestionScreen();
}


/**rendert die Fragen, sofern nicht bereits die letzte Frage aufgerufen wurde */
function showQuestion() {
    let question = selectedQuiz[currentQuestion]; // aktuelle Frage aus dem JSON holen und in ein array speichern

    if (currentQuestion >= selectedQuiz.length) {
        showEndScreen(); // am Ende des Quizzes End-Bildschirm zeigen
    }
    else { // wenn noch nicht am Ende angelangt kommt nächste Frage
        renderQuestionAndNumber(question); // rendert nächste Frage
        renderProgressBar(question);
        for (let i = 1; i < 5; i++) {
            resetAnswerButtons(i); // setzt die Farben der Antwortmöglichkeiten zurück
            renderSingleAnswer(question, i);  // rendert die Antwortmöglichkeiten
        }
    }
}


function answer(selectedAnswer) {
    // let selectedAnswerNumber = selectedAnswer.slice(-1);  // Alternative: damit lesen wir das letzte Zeichen aus dem übergebenen String raus
    let question = selectedQuiz[currentQuestion] // holt die aktuelle Frage in aus dem JSON und schreibt sie in die Variable question
    let rightAnswer = question["right answer"]; // aus der aktuellen Frage die richtige Antwort auslesen und in die Variable rightAnswer geben (Antwort ist eine Zahl)
    let rightAnswerAsText = `answer_${rightAnswer}`;

    if (selectedAnswer == rightAnswerAsText) { // wenn die beiden strings übereinstimmen (z. B. answer_1 == answer_1) --> mache was
        document.getElementById(selectedAnswer).parentNode.classList.add('bg-success');
        AUDIO_SUCCESS.play(); // success Ton abspielen
        score++; // wenn richtige Antwort, erhöhe die Punktzahl um 1
    }
    else if (selectedAnswer != rightAnswerAsText) {
        document.getElementById(selectedAnswer).parentNode.classList.add('bg-danger');
        document.getElementById(rightAnswerAsText).parentNode.classList.add('bg-success');
        AUDIO_FAIL.play(); // fail Ton abspielen
    }
    enableNextQuestion();
}


function nextQuestion() {
    disableNextQuestion();
    currentQuestion++; // Variable um 1 erhöhen, gibt die Nummer der aktuellen Frage an
    showQuestion(selectedQuiz);
}


function resetAnswerButtons(i) {
    document.getElementById('answer_' + i).parentNode.classList.remove('bg-success', 'bg-danger'); // setzt Farben zurück, sofern sie gegeben wurden
}


function renderQuestionAndNumber(question) {
    document.getElementById('current-question').innerHTML = currentQuestion + 1; // rendert die Nummer der aktuellen Frage; +1 braucht es, weil array mit 0 beginnt
    document.getElementById('question-text').innerHTML = question['question']; // rendert die Frage
}


function renderSingleAnswer(question, i) {
    document.getElementById('answer_' + i).innerHTML = question['answer_' + i]; // rendert die einzelne Antwort aus dem Array, durch die for-Schleife hintereinander
}


/**aktiviert den button, der zur nächsten Frage führt */
function enableNextQuestion() {
    document.getElementById('next-button').disabled = false; // button aktivieren, damit wir weiter zur nächsten Frage kommen
}


/**deaktiviert den button, der zur nächsten Frage führt */
function disableNextQuestion() {
    document.getElementById('next-button').disabled = true; // button deaktivieren
}


/**zeigt den End-Screen mit den Ergebnissen und der Möglichkeit zum Neustart */
function showEndScreen() {
    document.getElementById('end-screen').classList.remove('d-none'); // Klasse d-none entfernen --> Element wird angezeigt
    document.getElementById('question-body').classList.add('d-none'); // Fragen-Container ausblenden
    document.getElementById('header-image').src = 'img/brain_result.png'; // ändert das Bild
    document.getElementById('header-image').classList.add('width-50'); // verkleinert das Bild, damit es besser aussieht
    document.getElementById('end-score').innerHTML = score + '/' + selectedQuiz.length; // zeigt an, wie viele von insgesamt wie vielen Fragen man richtig beantwortet hat
}


/**zeigt den Screen mit den Fragen und Antworten */
function showQuestionScreen() {
    document.getElementById('start-screen').classList.add('d-none');
    document.getElementById('question-body').classList.remove('d-none'); // Fragen-Container einblenden
    document.getElementById('end-screen').classList.add('d-none'); // Klasse d-none hinzufügen --> Element wird ausgeblendet
    document.getElementById('header-image').classList.remove('width-50'); // wieder normale Größe des Bilds
    document.getElementById('header-image').src = 'img/pencil.jpg'; // Bild wieder zurücksetzen
}

/**zeigt die Startseite */
function showWelcomeScreen() {
    document.getElementById('end-screen').classList.add('d-none');
    document.getElementById('question-body').classList.add('d-none');
    document.getElementById('start-screen').classList.remove('d-none');
    document.getElementById('header-image').classList.remove('width-50'); // wieder normale Größe des Bilds
    document.getElementById('header-image').src = 'img/team.jpg';
}


/**replay: damit kann das gleiche Quiz nochmal gespielt werden */
function replay() {
    currentQuestion = 0; // Variablen zurücksetzen
    score = 0;
    showQuestionScreen(); // wieder zurück zum Container mit den Fragen
    init(); // Quiz neu starten
}


/**restart: damit kann die App neu gestartet werden */
function restart() {
    currentQuestion = 0; // Variablen zurücksetzen
    score = 0;
    showWelcomeScreen();
    init();
}


/**rendert den Verlauf der Progress-Bar */
function renderProgressBar(question) {
    let percentage = ((currentQuestion + 1) * 100) / selectedQuiz.length; // Prozentsatz berechnen
    percentage = Math.round(percentage); // Ergebnis runden mit JavaScript Funktion
    document.getElementById('progress-bar').style = `width: ${percentage}%`; // Breite der progressbar einsetzen
    document.getElementById('progress-bar').innerHTML = percentage + ' %'; // Prozentsatz in der progressbar einsetzen
}