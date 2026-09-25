document.addEventListener('DOMContentLoaded', () => {
    const loggedInUser = JSON.parse(localStorage.getItem('loggedInUser'));

    if (!loggedInUser || loggedInUser.type !== 'student') {
        alert('Acesso não autorizado. Por favor, faça login como aluno.');
        window.location.href = 'index.html';
        return;
    }

    const TOPIC_NAME = 'Present Perfect Continuous';

    const exerciseArea = document.getElementById('exercise-area');
    const prevButton = document.getElementById('prev-exercise');
    const nextButton = document.getElementById('next-exercise');

    let currentExerciseIndex = 0;
    let exercises = [];

    // --- EXERCÍCIOS AFIRMATIVOS (60 exemplos) ---
    exercises = [
        // --- ESTRUTURA BÁSICA (HAVE/HAS + BEEN + VERBO-ING) (20 mc) ---
        { id: 1, type: 'mc', question: "I ___ (study) English for three hours.", options: ["have studied", "have been studying", "has been studying"], correctAnswer: "have been studying", hint: "'I' usa 'have been' + verbo com '-ing'." },
        { id: 2, type: 'mc', question: "She ___ (work) here since 2020.", options: ["has worked", "has been working", "have been working"], correctAnswer: "has been working", hint: "'She' usa 'has been' + verbo com '-ing'." },
        { id: 3, type: 'mc', question: "They ___ (play) soccer all afternoon.", options: ["have played", "have been playing", "has been playing"], correctAnswer: "have been playing", hint: "'They' usa 'have been' + verbo com '-ing'." },
        { id: 4, type: 'mc', question: "We ___ (wait) for you for an hour.", options: ["have waited", "have been waiting", "has been waiting"], correctAnswer: "have been waiting", hint: "'We' usa 'have been' + verbo com '-ing'." },
        { id: 5, type: 'mc', question: "He ___ (read) that book all morning.", options: ["has read", "has been reading", "have been reading"], correctAnswer: "has been reading", hint: "'He' usa 'has been' + verbo com '-ing'." },
        { id: 6, type: 'mc', question: "You ___ (talk) on the phone for a long time.", options: ["have talked", "have been talking", "has been talking"], correctAnswer: "have been talking", hint: "'You' usa 'have been' + verbo com '-ing'." },
        { id: 7, type: 'mc', question: "It ___ (rain) since morning.", options: ["has rained", "has been raining", "have been raining"], correctAnswer: "has been raining", hint: "'It' usa 'has been' + verbo com '-ing'." },
        { id: 8, type: 'mc', question: "The children ___ (sleep) for ten hours.", options: ["have slept", "have been sleeping", "has been sleeping"], correctAnswer: "have been sleeping", hint: "'The children' (plural) usa 'have been' + verbo com '-ing'." },
        { id: 9, type: 'mc', question: "My brother ___ (travel) for six months.", options: ["has traveled", "has been traveling", "have been traveling"], correctAnswer: "has been traveling", hint: "'My brother' usa 'has been' + verbo com '-ing'." },
        { id: 10, type: 'mc', question: "I ___ (live) in this city since my birth.", options: ["have lived", "have been living", "has been living"], correctAnswer: "have been living", hint: "'I' usa 'have been' + verbo com '-ing'." },
        { id: 11, type: 'mc', question: "She ___ (cook) dinner for two hours.", options: ["has cooked", "has been cooking", "have been cooking"], correctAnswer: "has been cooking", hint: "'She' usa 'has been' + verbo com '-ing'." },
        { id: 12, type: 'mc', question: "They ___ (build) a new house for a year.", options: ["have built", "have been building", "has been building"], correctAnswer: "have been building", hint: "'They' usa 'have been' + verbo com '-ing'." },
        { id: 13, type: 'mc', question: "We ___ (learn) French for a year now.", options: ["have learned", "have been learning", "has been learning"], correctAnswer: "have been learning", hint: "'We' usa 'have been' + verbo com '-ing'." },
        { id: 14, type: 'mc', question: "He ___ (drive) since 5 AM.", options: ["has driven", "has been driving", "have been driving"], correctAnswer: "has been driving", hint: "'He' usa 'has been' + verbo com '-ing'." },
        { id: 15, type: 'mc', question: "You ___ (write) that report all day.", options: ["have written", "have been writing", "has been writing"], correctAnswer: "have been writing", hint: "'You' usa 'have been' + verbo com '-ing'." },
        { id: 16, type: 'mc', question: "The dog ___ (bark) for twenty minutes.", options: ["has barked", "has been barking", "have been barking"], correctAnswer: "has been barking", hint: "'The dog' (singular) usa 'has been' + verbo com '-ing'." },
        { id: 17, type: 'mc', question: "My parents ___ (garden) since early morning.", options: ["have gardened", "have been gardening", "has been gardening"], correctAnswer: "have been gardening", hint: "'My parents' (plural) usa 'have been' + verbo com '-ing'." },
        { id: 18, type: 'mc', question: "I ___ (try) to call you all day.", options: ["have tried", "have been trying", "has been trying"], correctAnswer: "have been trying", hint: "'I' usa 'have been' + verbo com '-ing'." },
        { id: 19, type: 'mc', question: "She ___ (teach) English for ten years.", options: ["has taught", "has been teaching", "have been teaching"], correctAnswer: "has been teaching", hint: "'She' usa 'has been' + verbo com '-ing'." },
        { id: 20, type: 'mc', question: "They ___ (argue) about it for an hour.", options: ["have argued", "have been arguing", "has been arguing"], correctAnswer: "have been arguing", hint: "'They' usa 'have been' + verbo com '-ing'." },

        // --- PALAVRAS-CHAVE (FOR/SINCE/HOW LONG) (20 mc) ---
        { id: 21, type: 'mc', question: "I have been studying English ___ three hours.", options: ["for", "since", "ago"], correctAnswer: "for", hint: "'For' indica duração." },
        { id: 22, type: 'mc', question: "She has been working here ___ 2020.", options: ["for", "since", "ago"], correctAnswer: "since", hint: "'Since' indica o ponto de início." },
        { id: 23, type: 'mc', question: "___ have you been waiting?", options: ["How long", "When", "What time"], correctAnswer: "How long", hint: "'How long' pergunta sobre duração." },
        { id: 24, type: 'mc', question: "We have been living here ___ a long time.", options: ["for", "since", "ago"], correctAnswer: "for", hint: "'For' indica duração." },
        { id: 25, type: 'mc', question: "He has been reading that book ___ morning.", options: ["for", "since", "ago"], correctAnswer: "since", hint: "'Since' indica o ponto de início." },
        { id: 26, type: 'mc', question: "They have been playing soccer ___ 2 PM.", options: ["for", "since", "ago"], correctAnswer: "since", hint: "'Since' indica o ponto de início." },
        { id: 27, type: 'mc', question: "It has been raining ___ all day.", options: ["for", "since", "ago"], correctAnswer: "for", hint: "'For' indica duração (todo o dia)." },
        { id: 28, type: 'mc', question: "The children have been sleeping ___ ten hours.", options: ["for", "since", "ago"], correctAnswer: "for", hint: "'For' indica duração." },
        { id: 29, type: 'mc', question: "My brother has been traveling ___ last summer.", options: ["for", "since", "ago"], correctAnswer: "since", hint: "'Since' indica o ponto de início." },
        { id: 30, type: 'mc', question: "She has been cooking dinner ___ two hours.", options: ["for", "since", "ago"], correctAnswer: "for", hint: "'For' indica duração." },
        { id: 31, type: 'mc', question: "They have been building a new house ___ January.", options: ["for", "since", "ago"], correctAnswer: "since", hint: "'Since' indica o ponto de início." },
        { id: 32, type: 'mc', question: "We have been learning French ___ a year.", options: ["for", "since", "ago"], correctAnswer: "for", hint: "'For' indica duração." },
        { id: 33, type: 'mc', question: "He has been driving ___ 5 AM.", options: ["for", "since", "ago"], correctAnswer: "since", hint: "'Since' indica o ponto de início." },
        { id: 34, type: 'mc', question: "You have been writing that report ___ all day.", options: ["for", "since", "ago"], correctAnswer: "for", hint: "'For' indica duração." },
        { id: 35, type: 'mc', question: "The dog has been barking ___ twenty minutes.", options: ["for", "since", "ago"], correctAnswer: "for", hint: "'For' indica duração." },
        { id: 36, type: 'mc', question: "My parents have been gardening ___ early morning.", options: ["for", "since", "ago"], correctAnswer: "since", hint: "'Since' indica o ponto de início." },
        { id: 37, type: 'mc', question: "I have been trying to call you ___ hours.", options: ["for", "since", "ago"], correctAnswer: "for", hint: "'For' indica duração." },
        { id: 38, type: 'mc', question: "She has been teaching English ___ 2016.", options: ["for", "since", "ago"], correctAnswer: "since", hint: "'Since' indica o ponto de início." },
        { id: 39, type: 'mc', question: "They have been arguing ___ an hour.", options: ["for", "since", "ago"], correctAnswer: "for", hint: "'For' indica duração." },
        { id: 40, type: 'mc', question: "___ have you been studying?", options: ["How long", "When", "What"], correctAnswer: "How long", hint: "'How long' pergunta sobre duração." },

        // --- CONTRASTE COM PRESENT PERFECT SIMPLES (20 mc) ---
        { id: 41, type: 'mc', question: "I ___ (read) three books this month.", options: ["have read", "have been reading", "has read"], correctAnswer: "have read", hint: "Ênfase no resultado (três livros lidos), use Present Perfect Simples." },
        { id: 42, type: 'mc', question: "I ___ (read) for three hours.", options: ["have read", "have been reading", "has been reading"], correctAnswer: "have been reading", hint: "Ênfase na duração da atividade, use Present Perfect Continuous." },
        { id: 43, type: 'mc', question: "She ___ (write) five emails today.", options: ["has written", "has been writing", "have written"], correctAnswer: "has written", hint: "Ênfase no resultado (cinco emails escritos), use Present Perfect Simples." },
        { id: 44, type: 'mc', question: "She ___ (write) emails all morning.", options: ["has written", "has been writing", "have been writing"], correctAnswer: "has been writing", hint: "Ênfase na duração da atividade, use Present Perfect Continuous." },
        { id: 45, type: 'mc', question: "They ___ (clean) the house, and it looks great now.", options: ["have cleaned", "have been cleaning", "has cleaned"], correctAnswer: "have cleaned", hint: "Ênfase no resultado (casa limpa), use Present Perfect Simples." },
        { id: 46, type: 'mc', question: "They ___ (clean) the house for two hours.", options: ["have cleaned", "have been cleaning", "has been cleaning"], correctAnswer: "have been cleaning", hint: "Ênfase na duração da atividade, use Present Perfect Continuous." },
        { id: 47, type: 'mc', question: "He ___ (fix) his car, so he can drive it now.", options: ["has fixed", "has been fixing", "have fixed"], correctAnswer: "has fixed", hint: "Ênfase no resultado (carro consertado), use Present Perfect Simples." },
        { id: 48, type: 'mc', question: "He ___ (fix) his car since morning.", options: ["has fixed", "has been fixing", "have been fixing"], correctAnswer: "has been fixing", hint: "Ênfase na duração da atividade, use Present Perfect Continuous." },
        { id: 49, type: 'mc', question: "We ___ (live) here for ten years.", options: ["have lived", "have been living", "has lived"], correctAnswer: "have been living", hint: "Ação que começou no passado e continua, com ênfase na duração, use Present Perfect Continuous." },
        { id: 50, type: 'mc', question: "I ___ (finish) my report.", options: ["have finished", "have been finishing", "has finished"], correctAnswer: "have finished", hint: "Ênfase no resultado (relatório finalizado), use Present Perfect Simples." },
        { id: 51, type: 'mc', question: "I ___ (work) on my report all day.", options: ["have worked", "have been working", "has been working"], correctAnswer: "have been working", hint: "Ênfase na duração da atividade, use Present Perfect Continuous." },
        { id: 52, type: 'mc', question: "She ___ (learn) to play the guitar.", options: ["has learned", "has been learning", "have learned"], correctAnswer: "has learned", hint: "Ênfase no resultado (ela aprendeu), use Present Perfect Simples." },
        { id: 53, type: 'mc', question: "She ___ (learn) to play the guitar for six months.", options: ["has learned", "has been learning", "have been learning"], correctAnswer: "has been learning", hint: "Ênfase na duração da atividade, use Present Perfect Continuous." },
        { id: 54, type: 'mc', question: "They ___ (travel) to many countries.", options: ["have traveled", "have been traveling", "has traveled"], correctAnswer: "have traveled", hint: "Ênfase na experiência (quantos países), use Present Perfect Simples." },
        { id: 55, type: 'mc', question: "They ___ (travel) around the world for a year.", options: ["have traveled", "have been traveling", "has been traveling"], correctAnswer: "have been traveling", hint: "Ênfase na duração da atividade, use Present Perfect Continuous." },
        { id: 56, type: 'mc', question: "The ground is wet because it ___ (rain).", options: ["has rained", "has been raining", "have rained"], correctAnswer: "has been raining", hint: "Ação que começou no passado e tem evidência no presente, com ênfase na atividade, use Present Perfect Continuous." },
        { id: 57, type: 'mc', question: "It ___ (rain) a lot this week.", options: ["has rained", "has been raining", "have rained"], correctAnswer: "has rained", hint: "Ênfase na quantidade (muita chuva), use Present Perfect Simples." },
        { id: 58, type: 'mc', question: "I'm tired because I ___ (run).", options: ["have run", "have been running", "has run"], correctAnswer: "have been running", hint: "Ação que causou o estado atual (cansaço), com ênfase na atividade, use Present Perfect Continuous." },
        { id: 59, type: 'mc', question: "I ___ (run) five kilometers.", options: ["have run", "have been running", "has run"], correctAnswer: "have run", hint: "Ênfase no resultado (distância percorrida), use Present Perfect Simples." },
        { id: 60, type: 'mc', question: "She ___ (wait) for the bus for twenty minutes.", options: ["has waited", "has been waiting", "have waited"], correctAnswer: "has been waiting", hint: "Ação que começou no passado e continua, com ênfase na duração, use Present Perfect Continuous." }
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
