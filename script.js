let questions = [
    {
        "question": "Wer hat HTML erfunden?",
        "answer_1": "Beispiel-Antwort 1",
        "answer_2": "Beispiel-Antwort 2",
        "answer_3": "Beispiel-Antwort 3",
        "answer_4": "Beispiel-Antwort 4",
        "right answer": 3,
    },
    {
        "question": "Wie heißt der beste Lehrer?",
        "answer_1": "Max Maier",
        "answer_2": "Müller Franz",
        "answer_3": "Thomas Musterknabe",
        "answer_4": "Lukas Klammer",
        "right answer": 4,
    },
    {
        "question": "DNA ist die Abkürzung für?",
        "answer_1": "DesoxyriboNucleicAcid",
        "answer_2": "Da nenn alles.",
        "answer_3": "Du naschst Ananas.",
        "answer_4": "Des nimm alles.",
        "right answer": 1,
    }
];

let currentQuestion = 0;

function init() {
    document.getElementById('all-questions').innerHTML = questions.length; // rendert die Gesamtzahl der Fragen; das ist nur am Beginn nötig, Gesamtzahl der Fragen ändert sich während Beantwortung nicht
    showQuestion(); // rendert die einzelne Frage
}


function showQuestion() {
    let question = questions[currentQuestion];

    document.getElementById('current-question').innerHTML = currentQuestion + 1; // rendert die Nummer der aktuellen Frage; +1 braucht es, weil array mit 0 beginnt
    document.getElementById('question-text').innerHTML = question['question']; // rendert die Frage

    for (let i = 1; i < 5; i++) {
        resetAnswerButtons(i);
        renderSingleAnswer(question, i);
    }
}


function answer(selectedAnswer) {
    // let selectedAnswerNumber = selectedAnswer.slice(-1);  // Alternative: damit lesen wir das letzte Zeichen aus dem übergebenen String raus
    let question = questions[currentQuestion] // holt die aktuelle Frage in aus dem JSON und schreibt sie in die Variable question
    let rightAnswer = question["right answer"]; // aus der aktuellen Frage die richtige Antwort auslesen und in die Variable rightAnswer geben (Antwort ist eine Zahl)
    let rightAnswerAsText = `answer_${rightAnswer}`;

    if (selectedAnswer == rightAnswerAsText) { // wenn die beiden strings übereinstimmen (z. B. answer_1 == answer_1) --> mache was
        document.getElementById(selectedAnswer).parentNode.classList.add('bg-success');
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


function renderSingleAnswer(question, i) {
    document.getElementById('answer_' + i).innerHTML = question['answer_' + i]; // rendert die einzelne Antwort aus dem Array, durch die for-Schleife hintereinander
}


function enableNextQuestion() {
    document.getElementById('next-button').disabled = false; // button aktivieren, damit wir weiter zur nächsten Frage kommen
}


function disableNextQuestion() {
    document.getElementById('next-button').disabled = true; // button deaktivieren
}