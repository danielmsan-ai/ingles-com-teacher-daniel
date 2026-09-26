document.addEventListener('DOMContentLoaded', () => {
    const loggedInUser = JSON.parse(localStorage.getItem('loggedInUser'));

    if (!loggedInUser || loggedInUser.type !== 'student') {
        alert('Acesso não autorizado. Por favor, faça login como aluno.');
        window.location.href = 'index.html';
        return;
    }

    const TOPIC_NAME = 'Many and Much';

    const exerciseArea = document.getElementById('exercise-area');
    const prevButton = document.getElementById('prev-exercise');
    const nextButton = document.getElementById('next-exercise');

    let currentExerciseIndex = 0;
    let exercises = [];

    // --- EXERCÍCIOS MANY E MUCH (30 exemplos - Bloco 1) ---
    exercises = [
        // --- FOCO EM MANY/MUCH EM NEGATIVAS E INTERROGATIVAS (30 mc) ---
        { id: 1, type: 'mc', question: "Do you have ___ friends?", options: ["many", "much", "a lot of"], correctAnswer: "many", hint: "'Friends' é contável. Use 'many' em perguntas." },
        { id: 2, type: 'mc', question: "I don't have ___ money.", options: ["many", "much", "a lot of"], correctAnswer: "much", hint: "'Money' é incontável. Use 'much' em negativas." },
        { id: 3, type: 'mc', question: "There isn't ___ water in the bottle.", options: ["many", "much", "a lot of"], correctAnswer: "much", hint: "'Water' é incontável. Use 'much' em negativas." },
        { id: 4, type: 'mc', question: "She doesn't eat ___ sweets.", options: ["many", "much", "a lot of"], correctAnswer: "many", hint: "'Sweets' é contável. Use 'many' em negativas." },
        { id: 5, type: 'mc', question: "Did you buy ___ souvenirs?", options: ["many", "much", "a lot of"], correctAnswer: "many", hint: "'Souvenirs' é contável. Use 'many' em perguntas." },
        { id: 6, type: 'mc', question: "He doesn't drink ___ coffee.", options: ["many", "much", "a lot of"], correctAnswer: "much", hint: "'Coffee' é incontável. Use 'much' em negativas." },
        { id: 7, type: 'mc', question: "Are there ___ cars in the parking lot?", options: ["many", "much", "a lot of"], correctAnswer: "many", hint: "'Cars' é contável. Use 'many' em perguntas." },
        { id: 8, type: 'mc', question: "We didn't see ___ people at the concert.", options: ["many", "much", "a lot of"], correctAnswer: "many", hint: "'People' é contável. Use 'many' em negativas." },
        { id: 9, type: 'mc', question: "Is there ___ sugar in your tea?", options: ["many", "much", "a lot of"], correctAnswer: "much", hint: "'Sugar' é incontável. Use 'much' em perguntas." },
        { id: 10, type: 'mc', question: "They don't have ___ time.", options: ["many", "much", "a lot of"], correctAnswer: "much", hint: "'Time' (no sentido de duração) é incontável. Use 'much' em negativas." },
        { id: 11, type: 'mc', question: "How ___ books do you have?", options: ["many", "much", "a lot of"], correctAnswer: "many", hint: "'Books' é contável. Use 'many' com 'how'." },
        { id: 12, type: 'mc', question: "How ___ information do you need?", options: ["many", "much", "a lot of"], correctAnswer: "much", hint: "'Information' é incontável. Use 'much' com 'how'." },
        { id: 13, type: 'mc', question: "I didn't get ___ sleep last night.", options: ["many", "much", "a lot of"], correctAnswer: "much", hint: "'Sleep' é incontável. Use 'much' em negativas." },
        { id: 14, type: 'mc', question: "Do you have ___ experience?", options: ["many", "much", "a lot of"], correctAnswer: "much", hint: "'Experience' (no sentido geral) é incontável. Use 'much' em perguntas." },
        { id: 15, type: 'mc', question: "I don't have ___ patience.", options: ["many", "much", "a lot of"], correctAnswer: "much", hint: "'Patience' é incontável. Use 'much' em negativas." },
        { id: 16, type: 'mc', question: "Were there ___ chairs available?", options: ["many", "much", "a lot of"], correctAnswer: "many", hint: "'Chairs' é contável. Use 'many' em perguntas." },
        { id: 17, type: 'mc', question: "He didn't make ___ progress.", options: ["many", "much", "a lot of"], correctAnswer: "much", hint: "'Progress' é incontável. Use 'much' em negativas." },
        { id: 18, type: 'mc', question: "Did you spend ___ money on your vacation?", options: ["many", "much", "a lot of"], correctAnswer: "much", hint: "'Money' é incontável. Use 'much' em perguntas." },
        { id: 19, type: 'mc', question: "There aren't ___ good movies out right now.", options: ["many", "much", "a lot of"], correctAnswer: "many", hint: "'Movies' é contável. Use 'many' em negativas." },
        { id: 20, type: 'mc', question: "She doesn't show ___ interest in her studies.", options: ["many", "much", "a lot of"], correctAnswer: "much", hint: "'Interest' é incontável. Use 'much' em negativas." },
        { id: 21, type: 'mc', question: "How ___ times have you been there?", options: ["many", "much", "a lot of"], correctAnswer: "many", hint: "'Times' (no sentido de ocorrências) é contável. Use 'many' com 'how'." },
        { id: 22, type: 'mc', question: "How ___ work do you have to do?", options: ["many", "much", "a lot of"], correctAnswer: "much", hint: "'Work' (no sentido de tarefa) é incontável. Use 'much' com 'how'." },
        { id: 23, type: 'mc', question: "I don't have ___ energy today.", options: ["many", "much", "a lot of"], correctAnswer: "much", hint: "'Energy' é incontável. Use 'much' em negativas." },
        { id: 24, type: 'mc', question: "Did you receive ___ emails?", options: ["many", "much", "a lot of"], correctAnswer: "many", hint: "'Emails' é contável. Use 'many' em perguntas." },
        { id: 25, type: 'mc', question: "There wasn't ___ traffic this morning.", options: ["many", "much", "a lot of"], correctAnswer: "much", hint: "'Traffic' é incontável. Use 'much' em negativas." },
        { id: 26, type: 'mc', question: "Do you need ___ help?", options: ["many", "much", "a lot of"], correctAnswer: "much", hint: "'Help' é incontável. Use 'much' em perguntas." },
        { id: 27, type: 'mc', question: "We didn't get ___ rain last month.", options: ["many", "much", "a lot of"], correctAnswer: "much", hint: "'Rain' é incontável. Use 'much' em negativas." },
        { id: 28, type: 'mc', question: "How ___ people were at the party?", options: ["many", "much", "a lot of"], correctAnswer: "many", hint: "'People' é contável. Use 'many' com 'how'." },
        { id: 29, type: 'mc', question: "I don't have ___ free time.", options: ["many", "much", "a lot of"], correctAnswer: "much", hint: "'Free time' é incontável. Use 'much' em negativas." },
        { id: 30, type: 'mc', question: "Did you bring ___ bags?", options: ["many", "much", "a lot of"], correctAnswer: "many", hint: "'Bags' é contável. Use 'many' em perguntas." }
    ];

    // --- FUNÇÃO DE REGISTRO DE DESEMPENHO ---
    function updateStudentProgress(isCorrect) {
        let users = JSON.parse(localStorage.getItem('users')) || [];
        const userIndex = users.findIndex(u => u.id === loggedInUser.id);

        if (userIndex !== -1) {
            if (!users[userIndex].progress) {
                users[userIndex].progress = {};
            }
            if (!users[userIndex].progress[TOPIC_NAME]) {
                users[userIndex].progress[TOPIC_NAME] = { correct: 0, incorrect: 0 };
            }

            if (isCorrect) {
                users[userIndex].progress[TOPIC_NAME].correct++;
            } else {
                users[userIndex].progress[TOPIC_NAME].incorrect++;
            }

            localStorage.setItem('users', JSON.stringify(users));
        }
    }

    // --- FUNÇÕES DE EXIBIÇÃO E LÓGICA ---

    function renderExercise() {
        const exercise = exercises[currentExerciseIndex];
        exerciseArea.innerHTML = '';

        const questionElement = document.createElement('p');
        questionElement.classList.add('exercise-question');
        questionElement.textContent = exercise.question;
        exerciseArea.appendChild(questionElement);

        if (exercise.type === 'mc') {
            const optionsContainer = document.createElement('div');
            optionsContainer.classList.add('options-container');

            const shuffledOptions = [...exercise.options].sort(() => Math.random() - 0.5);

            shuffledOptions.forEach(option => {
                const button = document.createElement('button');
                button.classList.add('option-button');
                button.textContent = option;
                button.addEventListener('click', () => checkAnswer(option, exercise.correctAnswer, button));
                optionsContainer.appendChild(button);
            });
            exerciseArea.appendChild(optionsContainer);
        } else if (exercise.type === 'rewrite') {
            const input = document.createElement('input');
            input.type = 'text';
            input.classList.add('rewrite-input');
            input.placeholder = 'Digite sua resposta aqui...';
            exerciseArea.appendChild(input);

            const checkBtn = document.createElement('button');
            checkBtn.classList.add('check-button');
            checkBtn.textContent = 'Verificar';
            checkBtn.addEventListener('click', () => checkAnswer(input.value, exercise.correctAnswer, input));
            exerciseArea.appendChild(checkBtn);
        }

        updateNavigationButtons();
    }

    function checkAnswer(userAnswer, correctAnswer, element) {
        const feedbackMessage = document.createElement('p');
        feedbackMessage.classList.add('feedback-message');

        const normalizedUserAnswer = userAnswer.trim().toLowerCase();
        const normalizedCorrectAnswer = correctAnswer.trim().toLowerCase();
        const isCorrect = normalizedUserAnswer === normalizedCorrectAnswer;

        if (isCorrect) {
            feedbackMessage.textContent = 'Correto! 🎉';
            feedbackMessage.classList.add('correct');
            if (element.classList.contains('option-button')) {
                element.classList.add('correct');
            }
        } else {
            feedbackMessage.textContent = `Incorreto. A resposta correta é: "${correctAnswer}".`;
            feedbackMessage.classList.add('incorrect');
            if (element.classList.contains('option-button')) {
                element.classList.add('incorrect');
                const options = exerciseArea.querySelectorAll('.option-button');
                options.forEach(opt => {
                    if (opt.textContent.trim().toLowerCase() === normalizedCorrectAnswer) {
                        opt.classList.add('correct');
                    }
                });
            }
        }
        exerciseArea.appendChild(feedbackMessage);

        updateStudentProgress(isCorrect);

        const currentExercise = exercises[currentExerciseIndex];
        if (currentExercise.type === 'mc') {
            exerciseArea.querySelectorAll('.option-button').forEach(btn => btn.disabled = true);
        } else if (currentExercise.type === 'rewrite') {
            exerciseArea.querySelector('.rewrite-input').disabled = true;
            exerciseArea.querySelector('.check-button').disabled = true;
        }
    }

    function updateNavigationButtons() {
        prevButton.style.display = currentExerciseIndex > 0 ? 'inline-block' : 'none';
        nextButton.style.display = currentExerciseIndex < exercises.length - 1 ? 'inline-block' : 'none';
    }

    prevButton.addEventListener('click', () => {
        if (currentExerciseIndex > 0) {
            currentExerciseIndex--;
            renderExercise();
        }
    });

    nextButton.addEventListener('click', () => {
        if (currentExerciseIndex < exercises.length - 1) {
            currentExerciseIndex++;
            renderExercise();
        }
    });

    renderExercise();
});
