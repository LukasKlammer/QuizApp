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