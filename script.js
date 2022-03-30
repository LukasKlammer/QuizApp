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
        "question": "",
        "answer_1": "",
        "answer_2": "",
        "answer_3": "",
        "answer_4": "",
        "right answer": 3,
    }
];

let currentQuestion = 0;

function init() {
    document.getElementById('all-questions').innerHTML = questions.length;

    showQuestion();
}


function showQuestion() {
    let question = questions[currentQuestion];

    document.getElementById('question-text').innerHTML = question['question']; // rendert die Frage

    for (let i = 1; i < 5; i++) {
        document.getElementById('answer_' + i).innerHTML = question['answer_' + i]; // rendert die Antworten
    }


}

function answer(selectedAnswer) {
    let question = questions[currentQuestion] // holt die aktuelle Frage in aus dem JSON und schreibt sie in die Variable question
    let rightAnswer = question["right answer"]; // aus der aktuellen Frage die richtige Antwort auslesen und in die Variable rightAnswer geben (Antwort ist eine Zahl)
    // let selectedAnswerNumber = selectedAnswer.slice(-1);  // Alternative: damit lesen wir das letzte Zeichen aus dem übergebenen String raus

    let rightAnswerAsText = `answer_${rightAnswer}`;

    if (selectedAnswer == rightAnswerAsText) { // wenn die beiden strings übereinstimmen (z. B. answer_1 == answer_1) --> mache was
        document.getElementById(selectedAnswer).parentNode.classList.add('bg-success');
    }
    else if (selectedAnswer != rightAnswerAsText) {
        document.getElementById(selectedAnswer).parentNode.classList.add('bg-danger');
        document.getElementById(rightAnswerAsText).parentNode.classList.add('bg-success');
    }
}