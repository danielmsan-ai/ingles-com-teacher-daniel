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

    // --- EXERCÍCIOS MANY E MUCH (90 exemplos - Bloco 1, 2 e 3) ---
    exercises = [
        // --- Bloco 1: FOCO EM MANY/MUCH EM NEGATIVAS E INTERROGATIVAS (30 mc) ---
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
        { id: 30, type: 'mc', question: "Did you bring ___ bags?", options: ["many", "much", "a lot of"], correctAnswer: "many", hint: "'Bags' é contável. Use 'many' em perguntas." },

        // --- Bloco 2: MAIS EXERCÍCIOS E REESCRITA (30 exercícios) ---
        // --- Múltipla Escolha (15 mc) ---
        { id: 31, type: 'mc', question: "There are ___ beautiful flowers in the garden.", options: ["many", "much", "a lot of"], correctAnswer: "a lot of", hint: "Em afirmativas, 'a lot of' é comum para contáveis." },
        { id: 32, type: 'mc', question: "She doesn't have ___ patience with noisy children.", options: ["many", "much", "a lot of"], correctAnswer: "much", hint: "'Patience' é incontável. Use 'much' em negativas." },
        { id: 33, type: 'mc', question: "How ___ experience do you have in this field?", options: ["many", "much", "a lot of"], correctAnswer: "much", hint: "'Experience' (geral) é incontável. Use 'much' com 'how'." },
        { id: 34, type: 'mc', question: "I bought ___ new clothes for my trip.", options: ["many", "much", "a lot of"], correctAnswer: "a lot of", hint: "Em afirmativas, 'a lot of' é comum para contáveis." },
        { id: 35, type: 'mc', question: "He didn't give me ___ advice.", options: ["many", "much", "a lot of"], correctAnswer: "much", hint: "'Advice' é incontável. Use 'much' em negativas." },
        { id: 36, type: 'mc', question: "Are there ___ good restaurants in this area?", options: ["many", "much", "a lot of"], correctAnswer: "many", hint: "'Restaurants' é contável. Use 'many' em perguntas." },
        { id: 37, type: 'mc', question: "We don't have ___ furniture in our new apartment.", options: ["many", "much", "a lot of"], correctAnswer: "much", hint: "'Furniture' é incontável. Use 'much' em negativas." },
        { id: 38, type: 'mc', question: "How ___ hours do you work per week?", options: ["many", "much", "a lot of"], correctAnswer: "many", hint: "'Hours' é contável. Use 'many' com 'how'." },
        { id: 39, type: 'mc', question: "She spends ___ time on social media.", options: ["many", "much", "a lot of"], correctAnswer: "a lot of", hint: "Em afirmativas, 'a lot of' é comum para incontáveis." },
        { id: 40, type: 'mc', question: "Did you find ___ useful information online?", options: ["many", "much", "a lot of"], correctAnswer: "much", hint: "'Information' é incontável. Use 'much' em perguntas." },
        { id: 41, type: 'mc', question: "There were ___ people at the concert.", options: ["many", "much", "a lot of"], correctAnswer: "a lot of", hint: "Em afirmativas, 'a lot of' é comum para contáveis." },
        { id: 42, type: 'mc', question: "I don't have ___ patience for this kind of game.", options: ["many", "much", "a lot of"], correctAnswer: "much", hint: "'Patience' é incontável. Use 'much' em negativas." },
        { id: 43, type: 'mc', question: "How ___ apples did you buy?", options: ["many", "much", "a lot of"], correctAnswer: "many", hint: "'Apples' é contável. Use 'many' com 'how'." },
        { id: 44, type: 'mc', question: "He has ___ friends in different countries.", options: ["many", "much", "a lot of"], correctAnswer: "a lot of", hint: "Em afirmativas, 'a lot of' é comum para contáveis." },
        { id: 45, type: 'mc', question: "Is there ___ milk left?", options: ["many", "much", "a lot of"], correctAnswer: "much", hint: "'Milk' é incontável. Use 'much' em perguntas." },

        // --- Reescrita (15 rewrite) ---
        { id: 46, type: 'rewrite', question: "Rewrite using 'many' or 'much': I don't have (a lot of) books.", correctAnswer: "I don't have many books.", hint: "'Books' é contável. Use 'many' em negativas." },
        { id: 47, type: 'rewrite', question: "Rewrite using 'many' or 'much': She didn't bring (a lot of) luggage.", correctAnswer: "She didn't bring much luggage.", hint: "'Luggage' é incontável. Use 'much' em negativas." },
        { id: 48, type: 'rewrite', question: "Rewrite using 'many' or 'much': Did you see (a lot of) birds in the park?", correctAnswer: "Did you see many birds in the park?", hint: "'Birds' é contável. Use 'many' em perguntas." },
        { id: 49, type: 'rewrite', question: "Rewrite using 'many' or 'much': There isn't (a lot of) noise in this library.", correctAnswer: "There isn't much noise in this library.", hint: "'Noise' é incontável. Use 'much' em negativas." },
        { id: 50, type: 'rewrite', question: "Rewrite using 'many' or 'much': How (a lot of) students are in your class?", correctAnswer: "How many students are in your class?", hint: "'Students' é contável. Use 'many' com 'how'." },
        { id: 51, type: 'rewrite', question: "Rewrite using 'many' or 'much': How (a lot of) patience do you have?", correctAnswer: "How much patience do you have?", hint: "'Patience' é incontável. Use 'much' com 'how'." },
        { id: 52, type: 'rewrite', question: "Rewrite using 'many' or 'much': I don't have (a lot of) problems with my car.", correctAnswer: "I don't have many problems with my car.", hint: "'Problems' é contável. Use 'many' em negativas." },
        { id: 53, type: 'rewrite', question: "Rewrite using 'many' or 'much': Did you get (a lot of) sleep last night?", correctAnswer: "Did you get much sleep last night?", hint: "'Sleep' é incontável. Use 'much' em perguntas." },
        { id: 54, type: 'rewrite', question: "Rewrite using 'many' or 'much': There weren't (a lot of) options available.", correctAnswer: "There weren't many options available.", hint: "'Options' é contável. Use 'many' em negativas." },
        { id: 55, type: 'rewrite', question: "Rewrite using 'many' or 'much': She doesn't need (a lot of) help with her project.", correctAnswer: "She doesn't need much help with her project.", hint: "'Help' é incontável. Use 'much' em negativas." },
        { id: 56, type: 'rewrite', question: "Rewrite using 'many' or 'much': How (a lot of) pieces of advice did he give you?", correctAnswer: "How many pieces of advice did he give you?", hint: "'Pieces of advice' é contável. Use 'many' com 'how'." },
        { id: 57, type: 'rewrite', question: "Rewrite using 'many' or 'much': How (a lot of) fun did you have?", correctAnswer: "How much fun did you have?", hint: "'Fun' é incontável. Use 'much' com 'how'." },
        { id: 58, type: 'rewrite', question: "Rewrite using 'many' or 'much': I don't have (a lot of) time to waste.", correctAnswer: "I don't have much time to waste.", hint: "'Time' (duração) é incontável. Use 'much' em negativas." },
        { id: 59, type: 'rewrite', question: "Rewrite using 'many' or 'much': Did you buy (a lot of) food for the party?", correctAnswer: "Did you buy much food for the party?", hint: "'Food' é incontável. Use 'much' em perguntas." },
        { id: 60, type: 'rewrite', question: "Rewrite using 'many' or 'much': There isn't (a lot of) space in this room.", correctAnswer: "There isn't much space in this room.", hint: "'Space' é incontável. Use 'much' em negativas." },

        // --- Bloco 3: CONTRASTE MANY/MUCH/A LOT OF (30 exercícios) ---
        // --- Múltipla Escolha (15 mc) ---
        { id: 61, type: 'mc', question: "We have ___ apples in the fridge.", options: ["many", "much", "a lot of"], correctAnswer: "a lot of", hint: "Em afirmativas, 'a lot of' é comum para contáveis." },
        { id: 62, type: 'mc', question: "I don't have ___ patience for this.", options: ["many", "much", "a lot of"], correctAnswer: "much", hint: "'Patience' é incontável. Use 'much' em negativas." },
        { id: 63, type: 'mc', question: "How ___ money do you need?", options: ["many", "much", "a lot of"], correctAnswer: "much", hint: "'Money' é incontável. Use 'much' com 'how'." },
        { id: 64, type: 'mc', question: "There are ___ students in the library.", options: ["many", "much", "a lot of"], correctAnswer: "a lot of", hint: "Em afirmativas, 'a lot of' é comum para contáveis." },
        { id: 65, type: 'mc', question: "Did you get ___ sleep last night?", options: ["many", "much", "a lot of"], correctAnswer: "much", hint: "'Sleep' é incontável. Use 'much' em perguntas." },
        { id: 66, type: 'mc', question: "She has ___ friends.", options: ["many", "much", "a lot of"], correctAnswer: "a lot of", hint: "Em afirmativas, 'a lot of' é comum para contáveis." },
        { id: 67, type: 'mc', question: "I didn't drink ___ water today.", options: ["many", "much", "a lot of"], correctAnswer: "much", hint: "'Water' é incontável. Use 'much' em negativas." },
        { id: 68, type: 'mc', question: "How ___ times have you visited Paris?", options: ["many", "much", "a lot of"], correctAnswer: "many", hint: "'Times' (ocorrências) é contável. Use 'many' com 'how'." },
        { id: 69, type: 'mc', question: "He has ___ experience in marketing.", options: ["many", "much", "a lot of"], correctAnswer: "a lot of", hint: "Em afirmativas, 'a lot of' é comum para incontáveis." },
        { id: 70, type: 'mc', question: "Are there ___ good ideas for the project?", options: ["many", "much", "a lot of"], correctAnswer: "many", hint: "'Ideas' é contável. Use 'many' em perguntas." },
        { id: 71, type: 'mc', question: "We don't have ___ time before the meeting.", options: ["many", "much", "a lot of"], correctAnswer: "much", hint: "'Time' (duração) é incontável. Use 'much' em negativas." },
        { id: 72, type: 'mc', question: "She eats ___ vegetables every day.", options: ["many", "much", "a lot of"], correctAnswer: "a lot of", hint: "Em afirmativas, 'a lot of' é comum para contáveis." },
        { id: 73, type: 'mc', question: "Did you buy ___ new clothes?", options: ["many", "much", "a lot of"], correctAnswer: "many", hint: "'Clothes' é contável. Use 'many' em perguntas." },
        { id: 74, type: 'mc', question: "There isn't ___ traffic on Sundays.", options: ["many", "much", "a lot of"], correctAnswer: "much", hint: "'Traffic' é incontável. Use 'much' em negativas." },
        { id: 75, type: 'mc', question: "How ___ sugar do you put in your coffee?", options: ["many", "much", "a lot of"], correctAnswer: "much", hint: "'Sugar' é incontável. Use 'much' com 'how'." },

        // --- Reescrita (15 rewrite) ---
        { id: 76, type: 'rewrite', question: "Rewrite using 'many', 'much' or 'a lot of': I have (a large quantity of) books.", correctAnswer: "I have a lot of books.", hint: "Em afirmativas, 'a lot of' é mais natural." },
        { id: 77, type: 'rewrite', question: "Rewrite using 'many', 'much' or 'a lot of': She doesn't have (a large quantity of) patience.", correctAnswer: "She doesn't have much patience.", hint: "'Patience' é incontável. Use 'much' em negativas." },
        { id: 78, type: 'rewrite', question: "Rewrite using 'many', 'much' or 'a lot of': Do you have (a large quantity of) friends?", correctAnswer: "Do you have many friends?", hint: "'Friends' é contável. Use 'many' em perguntas." },
        { id: 79, type: 'rewrite', question: "Rewrite using 'many', 'much' or 'a lot of': There is (a large quantity of) noise in the city.", correctAnswer: "There is a lot of noise in the city.", hint: "Em afirmativas, 'a lot of' é mais natural." },
        { id: 80, type: 'rewrite', question: "Rewrite using 'many', 'much' or 'a lot of': How (a large quantity of) students are there?", correctAnswer: "How many students are there?", hint: "'Students' é contável. Use 'many' com 'how'." },
        { id: 81, type: 'rewrite', question: "Rewrite using 'many', 'much' or 'a lot of': How (a large quantity of) water do you drink?", correctAnswer: "How much water do you drink?", hint: "'Water' é incontável. Use 'much' com 'how'." },
        { id: 82, type: 'rewrite', question: "Rewrite using 'many', 'much' or 'a lot of': I don't have (a large quantity of) problems.", correctAnswer: "I don't have many problems.", hint: "'Problems' é contável. Use 'many' em negativas." },
        { id: 83, type: 'rewrite', question: "Rewrite using 'many', 'much' or 'a lot of': Did you get (a large quantity of) useful information?", correctAnswer: "Did you get much useful information?", hint: "'Information' é incontável. Use 'much' em perguntas." },
        { id: 84, type: 'rewrite', question: "Rewrite using 'many', 'much' or 'a lot of': There weren't (a large quantity of) people at the event.", correctAnswer: "There weren't many people at the event.", hint: "'People' é contável. Use 'many' em negativas." },
        { id: 85, type: 'rewrite', question: "Rewrite using 'many', 'much' or 'a lot of': She needs (a large quantity of) help with her studies.", correctAnswer: "She needs a lot of help with her studies.", hint: "Em afirmativas, 'a lot of' é mais natural." },
        { id: 86, type: 'rewrite', question: "Rewrite using 'many', 'much' or 'a lot of': How (a large quantity of) cars are on the road?", correctAnswer: "How many cars are on the road?", hint: "'Cars' é contável. Use 'many' com 'how'." },
        { id: 87, type: 'rewrite', question: "Rewrite using 'many', 'much' or 'a lot of': How (a large quantity of) time do you have?", correctAnswer: "How much time do you have?", hint: "'Time' (duração) é incontável. Use 'much' com 'how'." },
        { id: 88, type: 'rewrite', question: "Rewrite using 'many', 'much' or 'a lot of': I have (a large quantity of) homework to do.", correctAnswer: "I have a lot of homework to do.", hint: "Em afirmativas, 'a lot of' é mais natural." },
        { id: 89, type: 'rewrite', question: "Rewrite using 'many', 'much' or 'a lot of': Did you buy (a large quantity of) vegetables?", correctAnswer: "Did you buy many vegetables?", hint: "'Vegetables' é contável. Use 'many' em perguntas." },
        { id: 90, type: 'rewrite', question: "Rewrite using 'many', 'much' or 'a lot of': There isn't (a large quantity of) space for everyone.", correctAnswer: "There isn't much space for everyone.", hint: "'Space' é incontável. Use 'much' em negativas." }
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
