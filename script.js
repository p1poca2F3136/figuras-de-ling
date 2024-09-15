const quizContainer = document.getElementById("quiz-container");
const nextBtn = document.getElementById("next-btn");

let questions = [];
let currentQuestion = 0;
let answered = false;

// Função para carregar perguntas do arquivo JSON
async function loadQuestions() {
    const response = await fetch('questions.json');
    const data = await response.json();
    questions = data.questions;
    showQuestion();  // Mostra a primeira pergunta após o carregamento
}

function showQuestion() {
    const questionData = questions[currentQuestion];
    
    // Gera as opções dinamicamente
    let optionsHTML = "";
    questionData.options.forEach(option => {
        optionsHTML += `<option value="${option}">${option}</option>`;
    });

    quizContainer.innerHTML = `
        <div class="question">${questionData.question}</div>
        <select id="answer-select">
            <option value="" disabled selected>Escolha a figura de linguagem</option>
            ${optionsHTML}
        </select>
        <div id="feedback"></div>
    `;
    
    nextBtn.disabled = true;
    answered = false;

    // Escuta mudanças no select
    document.getElementById("answer-select").addEventListener("change", () => {
        checkAnswer();
        nextBtn.disabled = false;
    });
}

function checkAnswer() {
    const selectedAnswer = document.getElementById("answer-select").value;
    const feedback = document.getElementById("feedback");

    if (selectedAnswer === questions[currentQuestion].answer) {
        feedback.textContent = "Correto!";
        feedback.style.color = "green";
        answered = true;
    } else {
        feedback.textContent = "Incorreto. A resposta correta é: " + questions[currentQuestion].answer;
        feedback.style.color = "red";
        answered = true;
    }
}

nextBtn.addEventListener("click", () => {
    if (answered) {
        currentQuestion++;
        if (currentQuestion < questions.length) {
            showQuestion();
        } else {
            quizContainer.innerHTML = "<h2>Você completou o quiz!</h2>";
            nextBtn.style.display = "none";
        }
    }
});

// Carrega as perguntas ao iniciar o site
loadQuestions();
