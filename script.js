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


/**rendert die Fragen, sofern nicht bereits die letzte Frage aufgerufen wurde */
function showQuestion() {
    let question = selectedQuiz[currentQuestion]; // aktuelle Frage aus dem JSON holen und in ein array speichern

    if (currentQuestion >= selectedQuiz.length) {
        showEndScreen(); // am Ende des Quizzes End-Bildschirm zeigen
    }
    else { // wenn noch nicht am Ende angelangt kommt nächste Frage
        renderEntireQuestion(question); // rendert nächste Frage
    }
}


/**
 * this function colors the answers, reaction depends if answer is right or not
 * 
 * @param {string} selectedAnswer this parameter gives you the name of the answer that user selected
 */
function answer(selectedAnswer) {
    let question = selectedQuiz[currentQuestion] // holt die aktuelle Frage in aus dem JSON und schreibt sie in die Variable question
    let rightAnswerAsText = `answer_${question["right answer"]}`;

    if (selectedAnswer == rightAnswerAsText) { // wenn die beiden strings übereinstimmen (z. B. answer_1 == answer_1)
        reactionRightAnswer(selectedAnswer);
    }
    else if (selectedAnswer != rightAnswerAsText) {
        reactionWrongAnswer(selectedAnswer, rightAnswerAsText);
    }

    lockAnswers(); // sperrt die weiteren Antwortmöglichkeiten
    enableNextQuestion();
}


/**
 * this function signs the right question, if user found that
 * 
 * @param {string} selectedAnswer this parameter gives you the name of the answer that user selected
 */
function reactionRightAnswer(selectedAnswer) {
    document.getElementById(selectedAnswer).parentNode.classList.add('bg-success');
    AUDIO_SUCCESS.play();
    score++;
}


/**
 * this function dissolves the question answers if user wasn't able to
 * 
 * @param {string} selectedAnswer selected answer from user
 * @param {string} rightAnswerAsText right answer for the question
 */
function reactionWrongAnswer(selectedAnswer, rightAnswerAsText) {
    document.getElementById(selectedAnswer).parentNode.classList.add('bg-danger'); // shows the wrong answer
    document.getElementById(rightAnswerAsText).parentNode.classList.add('bg-success'); // shows the right answer
    AUDIO_FAIL.play();
}


function showNextQuestion() {
    disableNextQuestion();
    currentQuestion++; // Variable um 1 erhöhen, gibt die Nummer der aktuellen Frage an
    showQuestion(selectedQuiz);
    unLockAnswers();
}


function resetAnswerButtons(i) {
    document.getElementById('answer_' + i).parentNode.classList.remove('bg-success', 'bg-danger'); // setzt Farben zurück, sofern sie gegeben wurden
}


function renderEntireQuestion(question) {
    document.getElementById('current-question').innerHTML = currentQuestion + 1; // rendert die Nummer der aktuellen Frage; +1 braucht es, weil array mit 0 beginnt
    document.getElementById('question-text').innerHTML = question['question']; // rendert die Frage
    renderProgressBar(question); // Fortschrittsbalken
    for (let i = 1; i < 5; i++) {
        resetAnswerButtons(i); // setzt die Farben der Antwortmöglichkeiten zurück
        renderSingleAnswer(question, i);  // rendert die Antwortmöglichkeiten
    }
}


function renderSingleAnswer(question, i) {
    document.getElementById('answer_' + i).innerHTML = question['answer_' + i]; // rendert die einzelne Antwort aus dem Array, durch die for-Schleife hintereinander
}


function enableNextQuestion() {
    document.getElementById('next-button').disabled = false; // button aktivieren, damit wir weiter zur nächsten Frage kommen
}


function disableNextQuestion() {
    document.getElementById('next-button').disabled = true; // button deaktivieren
}

/**disable pointer event answer card*/
function lockAnswers() {
    for (i = 1; i < 5; i++) {
        document.getElementById('answer_' + i).style.pointerEvents = 'none';
    }
}


/**enebla pointer event answer card */
function unLockAnswers() {
    for (i = 1; i < 5; i++) {
        document.getElementById('answer_' + i).style.pointerEvents = 'auto';
    }
}


function showEndScreen() {
    document.getElementById('end-screen').classList.remove('d-none');
    document.getElementById('question-body').classList.add('d-none');
    document.getElementById('header-image').src = 'img/brain_result.png';
    document.getElementById('header-image').classList.add('width-50');
    document.getElementById('end-score').innerHTML = score + '/' + selectedQuiz.length;
}


function showQuestionScreen() {
    document.getElementById('start-screen').classList.add('d-none');
    document.getElementById('question-body').classList.remove('d-none');
    document.getElementById('end-screen').classList.add('d-none');
    document.getElementById('header-image').classList.remove('width-50'); // wieder normale Größe des Bilds
    document.getElementById('header-image').src = 'img/pencil.jpg';
}


function showWelcomeScreen() {
    document.getElementById('end-screen').classList.add('d-none');
    document.getElementById('question-body').classList.add('d-none');
    document.getElementById('start-screen').classList.remove('d-none');
    document.getElementById('header-image').classList.remove('width-50'); // wieder normale Größe des Bilds
    document.getElementById('header-image').src = 'img/team.jpg';
}


function replay() {
    resetGlobalVariables();
    showQuestionScreen(); // wieder zurück zum Container mit den Fragen
    init(); // Quiz neu starten
}


function restart() {
    resetGlobalVariables();
    showWelcomeScreen();
    init();
}


function resetGlobalVariables() {
    currentQuestion = 0;
    score = 0;
}


function renderProgressBar(question) {
    let percentage = ((currentQuestion + 1) * 100) / selectedQuiz.length; // Prozentsatz berechnen
    percentage = Math.round(percentage); // Ergebnis runden
    document.getElementById('progress-bar').style = `width: ${percentage}%`; // Breite der progressbar einsetzen
    document.getElementById('progress-bar').innerHTML = percentage + ' %'; // Prozentsatz in der progressbar einsetzen
}


function share() {
    alert('Diese Funktion ist noch nicht implementiert.');
}