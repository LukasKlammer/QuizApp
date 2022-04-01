/**Gibt die Nummer der aktuellen Frage an. Startet bei 0, weil arrays immer bei 0 starten */
let currentQuestion = 0;

/**Gibt die erreichte Punktzahl an. */
let score = 0;


/**Wird aufgerufen, wenn die App neu geladen oder der replay-Button gedrückt wird. */
function init() {
    document.getElementById('all-questions').innerHTML = questions.length; // rendert den string Gesamtzahl der Fragen; das ist nur am Beginn nötig, Gesamtzahl der Fragen ändert sich während Beantwortung nicht
    showQuestion(); // rendert die einzelne Frage
}


function showQuestion() {
    let question = questions[currentQuestion]; // aktuelle Frage aus dem JSON holen und in ein array speichern

    if (currentQuestion >= questions.length) {
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
    let question = questions[currentQuestion] // holt die aktuelle Frage in aus dem JSON und schreibt sie in die Variable question
    let rightAnswer = question["right answer"]; // aus der aktuellen Frage die richtige Antwort auslesen und in die Variable rightAnswer geben (Antwort ist eine Zahl)
    let rightAnswerAsText = `answer_${rightAnswer}`;

    if (selectedAnswer == rightAnswerAsText) { // wenn die beiden strings übereinstimmen (z. B. answer_1 == answer_1) --> mache was
        document.getElementById(selectedAnswer).parentNode.classList.add('bg-success');
        score++; // wenn richtige Antwort, erhöhe die Punktzahl um 1
    }
    else if (selectedAnswer != rightAnswerAsText) {
        document.getElementById(selectedAnswer).parentNode.classList.add('bg-danger');
        document.getElementById(rightAnswerAsText).parentNode.classList.add('bg-success');
    }
    enableNextQuestion();
}


function nextQuestion() {
    disableNextQuestion();
    currentQuestion++; // Variable um 1 erhöhen, gibt die Nummer der aktuellen Frage an
    showQuestion();
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
    document.getElementById('end-score').innerHTML = score + '/' + questions.length; // zeigt an, wie viele von insgesamt wie vielen Fragen man richtig beantwortet hat
}


/**zeigt den Screen mit den Fragen und Antworten */
function showQuestionScreen() {
    document.getElementById('question-body').classList.remove('d-none'); // Fragen-Container ausblenden
    document.getElementById('end-screen').classList.add('d-none'); // Klasse d-none entfernen --> Element wird angezeigt
    document.getElementById('header-image').src = 'img/pencil.jpg';
}


/**replay: damit kann das Quiz neu gestartet werden */
function replay() {
    currentQuestion = 0;
    score = 0;
    showQuestionScreen();
    init();
}


/**rendert den Verlauf der Progress-Bar */
function renderProgressBar(question) {
    let percentage = ((currentQuestion + 1) * 100) / questions.length; // Prozentsatz berechnen
    percentage = Math.round(percentage); // Ergebnis runden mit JavaScript Funktion

    document.getElementById('progress-bar').style = `width: ${percentage}%`; // Breite der progressbar einsetzen
    document.getElementById('progress-bar').innerHTML = percentage + ' %'; // Prozentsatz in der progressbar einsetzen
}