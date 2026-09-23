document.addEventListener('DOMContentLoaded', () => {
    const loggedInUser = JSON.parse(localStorage.getItem('loggedInUser'));

    if (!loggedInUser || loggedInUser.type !== 'student') {
        alert('Acesso não autorizado. Por favor, faça login como aluno.');
        window.location.href = 'index.html';
        return;
    }

    const TOPIC_NAME = 'Simple Past';

    const exerciseArea = document.getElementById('exercise-area');
    const prevButton = document.getElementById('prev-exercise');
    const nextButton = document.getElementById('next-exercise');

    let currentExerciseIndex = 0;
    let exercises = [];

    // --- EXERCÍCIOS AFIRMATIVOS (60 exemplos: 20 to be, 20 regulares, 20 irregulares) ---
    exercises = [
        // --- TO BE (10 mc) ---
        { id: 1, type: 'mc', question: "I ___ (be) tired yesterday.", options: ["am", "was", "were"], correctAnswer: "was", hint: "'I' usa 'was' no passado do verbo 'to be'." },
        { id: 2, type: 'mc', question: "She ___ (be) at home last night.", options: ["was", "were", "is"], correctAnswer: "was", hint: "'She' usa 'was' no passado." },
        { id: 3, type: 'mc', question: "They ___ (be) at the party last Saturday.", options: ["was", "were", "are"], correctAnswer: "were", hint: "'They' usa 'were' no passado." },
        { id: 4, type: 'mc', question: "We ___ (be) students in 2015.", options: ["was", "were", "are"], correctAnswer: "were", hint: "'We' usa 'were' no passado." },
        { id: 5, type: 'mc', question: "He ___ (be) sick last week.", options: ["was", "were", "is"], correctAnswer: "was", hint: "'He' usa 'was' no passado." },
        { id: 6, type: 'mc', question: "You ___ (be) late for the meeting.", options: ["was", "were", "are"], correctAnswer: "were", hint: "'You' usa 'were' no passado." },
        { id: 7, type: 'mc', question: "It ___ (be) cold yesterday.", options: ["was", "were", "is"], correctAnswer: "was", hint: "'It' usa 'was' no passado." },
        { id: 8, type: 'mc', question: "The children ___ (be) happy at the park.", options: ["was", "were", "are"], correctAnswer: "were", hint: "'The children' é plural, use 'were'." },
        { id: 9, type: 'mc', question: "My parents ___ (be) on vacation last month.", options: ["was", "were", "are"], correctAnswer: "were", hint: "'My parents' é plural, use 'were'." },
        { id: 10, type: 'mc', question: "I ___ (be) in London two years ago.", options: ["am", "was", "were"], correctAnswer: "was", hint: "'I' usa 'was' no passado." },

        // --- VERBOS REGULARES (10 mc) ---
        { id: 11, type: 'mc', question: "I ___ (walk) to school yesterday.", options: ["walk", "walked", "walking"], correctAnswer: "walked", hint: "Verbos regulares recebem '-ed' no passado." },
        { id: 12, type: 'mc', question: "She ___ (study) for the test last night.", options: ["studyed", "studied", "studies"], correctAnswer: "studied", hint: "Verbos terminados em 'y' precedido de consoante mudam para 'ied'." },
        { id: 13, type: 'mc', question: "They ___ (stop) the car suddenly.", options: ["stoped", "stopped", "stopping"], correctAnswer: "stopped", hint: "Verbos terminados em consoante+vogal+consoante dobram a última letra antes do '-ed'." },
        { id: 14, type: 'mc', question: "We ___ (play) soccer last weekend.", options: ["played", "plaied", "playing"], correctAnswer: "played", hint: "'Play' termina em vogal+y, apenas adicione '-ed'." },
        { id: 15, type: 'mc', question: "He ___ (want) to travel last year.", options: ["wanted", "wantted", "wanting"], correctAnswer: "wanted", hint: "Verbos regulares recebem '-ed' no passado." },
        { id: 16, type: 'mc', question: "You ___ (watch) a movie last night.", options: ["watched", "watchs", "watching"], correctAnswer: "watched", hint: "Verbos regulares recebem '-ed' no passado." },
        { id: 17, type: 'mc', question: "I ___ (live) in Brazil for five years.", options: ["lived", "liveed", "living"], correctAnswer: "lived", hint: "Verbos terminados em 'e' recebem apenas 'd'." },
        { id: 18, type: 'mc', question: "She ___ (dance) at the party.", options: ["danced", "danceed", "dancing"], correctAnswer: "danced", hint: "Verbos terminados em 'e' recebem apenas 'd'." },
        { id: 19, type: 'mc', question: "They ___ (arrive) late yesterday.", options: ["arrived", "arriveed", "arriving"], correctAnswer: "arrived", hint: "Verbos terminados em 'e' recebem apenas 'd'." },
        { id: 20, type: 'mc', question: "We ___ (clean) the house last Saturday.", options: ["cleaned", "cleanned", "cleaning"], correctAnswer: "cleaned", hint: "Verbos regulares recebem '-ed' no passado." },

        // --- VERBOS IRREGULARES (10 mc) ---
        { id: 21, type: 'mc', question: "I ___ (go) to the beach last weekend.", options: ["goed", "went", "going"], correctAnswer: "went", hint: "'Go' é um verbo irregular; sua forma no passado é 'went'." },
        { id: 22, type: 'mc', question: "She ___ (see) a movie last night.", options: ["seed", "saw", "seeing"], correctAnswer: "saw", hint: "'See' é irregular; sua forma no passado é 'saw'." },
        { id: 23, type: 'mc', question: "They ___ (have) a party last month.", options: ["haved", "had", "having"], correctAnswer: "had", hint: "'Have' é irregular; sua forma no passado é 'had'." },
        { id: 24, type: 'mc', question: "We ___ (do) our homework yesterday.", options: ["doed", "did", "doing"], correctAnswer: "did", hint: "'Do' é irregular; sua forma no passado é 'did'." },
        { id: 25, type: 'mc', question: "He ___ (make) a cake for the party.", options: ["maked", "made", "making"], correctAnswer: "made", hint: "'Make' é irregular; sua forma no passado é 'made'." },
        { id: 26, type: 'mc', question: "I ___ (eat) pizza last night.", options: ["eated", "ate", "eating"], correctAnswer: "ate", hint: "'Eat' é irregular; sua forma no passado é 'ate'." },
        { id: 27, type: 'mc', question: "She ___ (write) a letter yesterday.", options: ["writed", "wrote", "writing"], correctAnswer: "wrote", hint: "'Write' é irregular; sua forma no passado é 'wrote'." },
        { id: 28, type: 'mc', question: "They ___ (come) to the party late.", options: ["comed", "came", "coming"], correctAnswer: "came", hint: "'Come' é irregular; sua forma no passado é 'came'." },
        { id: 29, type: 'mc', question: "We ___ (take) the bus yesterday.", options: ["taked", "took", "taking"], correctAnswer: "took", hint: "'Take' é irregular; sua forma no passado é 'took'." },
        { id: 30, type: 'mc', question: "He ___ (give) me a gift last year.", options: ["gived", "gave", "giving"], correctAnswer: "gave", hint: "'Give' é irregular; sua forma no passado é 'gave'." },

        // --- TO BE (10 rewrite) ---
        { id: 31, type: 'rewrite', question: "Rewrite using the Simple Past: I (be) tired yesterday.", correctAnswer: "I was tired yesterday.", hint: "'I' usa 'was'." },
        { id: 32, type: 'rewrite', question: "Rewrite using the Simple Past: She (be) at home last night.", correctAnswer: "She was at home last night.", hint: "'She' usa 'was'." },
        { id: 33, type: 'rewrite', question: "Rewrite using the Simple Past: They (be) at the party last Saturday.", correctAnswer: "They were at the party last Saturday.", hint: "'They' usa 'were'." },
        { id: 34, type: 'rewrite', question: "Rewrite using the Simple Past: We (be) students in 2015.", correctAnswer: "We were students in 2015.", hint: "'We' usa 'were'." },
        { id: 35, type: 'rewrite', question: "Rewrite using the Simple Past: He (be) sick last week.", correctAnswer: "He was sick last week.", hint: "'He' usa 'was'." },
        { id: 36, type: 'rewrite', question: "Rewrite using the Simple Past: You (be) late for the meeting.", correctAnswer: "You were late for the meeting.", hint: "'You' usa 'were'." },
        { id: 37, type: 'rewrite', question: "Rewrite using the Simple Past: It (be) cold yesterday.", correctAnswer: "It was cold yesterday.", hint: "'It' usa 'was'." },
        { id: 38, type: 'rewrite', question: "Rewrite using the Simple Past: The children (be) happy at the park.", correctAnswer: "The children were happy at the park.", hint: "'The children' é plural, use 'were'." },
        { id: 39, type: 'rewrite', question: "Rewrite using the Simple Past: My parents (be) on vacation last month.", correctAnswer: "My parents were on vacation last month.", hint: "'My parents' é plural, use 'were'." },
        { id: 40, type: 'rewrite', question: "Rewrite using the Simple Past: I (be) in London two years ago.", correctAnswer: "I was in London two years ago.", hint: "'I' usa 'was'." },

        // --- VERBOS REGULARES (10 rewrite) ---
        { id: 41, type: 'rewrite', question: "Rewrite using the Simple Past: I (walk) to school yesterday.", correctAnswer: "I walked to school yesterday.", hint: "Adicione '-ed'." },
        { id: 42, type: 'rewrite', question: "Rewrite using the Simple Past: She (study) for the test last night.", correctAnswer: "She studied for the test last night.", hint: "'Y' precedido de consoante muda para 'ied'." },
        { id: 43, type: 'rewrite', question: "Rewrite using the Simple Past: They (stop) the car suddenly.", correctAnswer: "They stopped the car suddenly.", hint: "Dobre a consoante final antes do '-ed'." },
        { id: 44, type: 'rewrite', question: "Rewrite using the Simple Past: We (play) soccer last weekend.", correctAnswer: "We played soccer last weekend.", hint: "Adicione '-ed'." },
        { id: 45, type: 'rewrite', question: "Rewrite using the Simple Past: He (want) to travel last year.", correctAnswer: "He wanted to travel last year.", hint: "Adicione '-ed'." },
        { id: 46, type: 'rewrite', question: "Rewrite using the Simple Past: You (watch) a movie last night.", correctAnswer: "You watched a movie last night.", hint: "Adicione '-ed'." },
        { id: 47, type: 'rewrite', question: "Rewrite using the Simple Past: I (live) in Brazil for five years.", correctAnswer: "I lived in Brazil for five years.", hint: "Verbos terminados em 'e' recebem apenas 'd'." },
        { id: 48, type: 'rewrite', question: "Rewrite using the Simple Past: She (dance) at the party.", correctAnswer: "She danced at the party.", hint: "Verbos terminados em 'e' recebem apenas 'd'." },
        { id: 49, type: 'rewrite', question: "Rewrite using the Simple Past: They (arrive) late yesterday.", correctAnswer: "They arrived late yesterday.", hint: "Verbos terminados em 'e' recebem apenas 'd'." },
        { id: 50, type: 'rewrite', question: "Rewrite using the Simple Past: We (clean) the house last Saturday.", correctAnswer: "We cleaned the house last Saturday.", hint: "Adicione '-ed'." },

        // --- VERBOS IRREGULARES (10 rewrite) ---
        { id: 51, type: 'rewrite', question: "Rewrite using the Simple Past: I (go) to the beach last weekend.", correctAnswer: "I went to the beach last weekend.", hint: "'Go' vira 'went'." },
        { id: 52, type: 'rewrite', question: "Rewrite using the Simple Past: She (see) a movie last night.", correctAnswer: "She saw a movie last night.", hint: "'See' vira 'saw'." },
        { id: 53, type: 'rewrite', question: "Rewrite using the Simple Past: They (have) a party last month.", correctAnswer: "They had a party last month.", hint: "'Have' vira 'had'." },
        { id: 54, type: 'rewrite', question: "Rewrite using the Simple Past: We (do) our homework yesterday.", correctAnswer: "We did our homework yesterday.", hint: "'Do' vira 'did'." },
        { id: 55, type: 'rewrite', question: "Rewrite using the Simple Past: He (make) a cake for the party.", correctAnswer: "He made a cake for the party.", hint: "'Make' vira 'made'." },
        { id: 56, type: 'rewrite', question: "Rewrite using the Simple Past: I (eat) pizza last night.", correctAnswer: "I ate pizza last night.", hint: "'Eat' vira 'ate'." },
        { id: 57, type: 'rewrite', question: "Rewrite using the Simple Past: She (write) a letter yesterday.", correctAnswer: "She wrote a letter yesterday.", hint: "'Write' vira 'wrote'." },
        { id: 58, type: 'rewrite', question: "Rewrite using the Simple Past: They (come) to the party late.", correctAnswer: "They came to the party late.", hint: "'Come' vira 'came'." },
        { id: 59, type: 'rewrite', question: "Rewrite using the Simple Past: We (take) the bus yesterday.", correctAnswer: "We took the bus yesterday.", hint: "'Take' vira 'took'." },
        { id: 60, type: 'rewrite', question: "Rewrite using the Simple Past: He (give) me a gift last year.", correctAnswer: "He gave me a gift last year.", hint: "'Give' vira 'gave'." }
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
