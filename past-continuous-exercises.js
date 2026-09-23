document.addEventListener('DOMContentLoaded', () => {
    const loggedInUser = JSON.parse(localStorage.getItem('loggedInUser'));

    if (!loggedInUser || loggedInUser.type !== 'student') {
        alert('Acesso não autorizado. Por favor, faça login como aluno.');
        window.location.href = 'index.html';
        return;
    }

    const TOPIC_NAME = 'Past Continuous';

    const exerciseArea = document.getElementById('exercise-area');
    const prevButton = document.getElementById('prev-exercise');
    const nextButton = document.getElementById('next-exercise');

    let currentExerciseIndex = 0;
    let exercises = [];

    // --- EXERCÍCIOS AFIRMATIVOS (50 exemplos) ---
    exercises = [
        { id: 1, type: 'mc', question: "I ___ (watch) TV when the phone rang.", options: ["watched", "was watching", "were watching"], correctAnswer: "was watching", hint: "Use 'was' + verbo com '-ing' com 'I'." },
        { id: 2, type: 'mc', question: "She ___ (read) a book while he was cooking.", options: ["read", "was reading", "were reading"], correctAnswer: "was reading", hint: "'She' usa 'was' + verbo com '-ing'." },
        { id: 3, type: 'mc', question: "They ___ (play) football when it started to rain.", options: ["played", "was playing", "were playing"], correctAnswer: "were playing", hint: "'They' usa 'were' + verbo com '-ing'." },
        { id: 4, type: 'mc', question: "We ___ (study) at 8 PM last night.", options: ["studied", "were studying", "was studying"], correctAnswer: "were studying", hint: "'We' usa 'were' + verbo com '-ing'." },
        { id: 5, type: 'mc', question: "He ___ (run) in the park when he saw his friend.", options: ["ran", "was running", "was runing"], correctAnswer: "was running", hint: "Verbos terminados em consoante+vogal+consoante dobram a última letra antes do '-ing'." },
        { id: 6, type: 'mc', question: "I ___ (swim) in the pool while my brother was sunbathing.", options: ["was swimming", "was swiming", "swam"], correctAnswer: "was swimming", hint: "'Swim' dobra o 'm' antes de adicionar '-ing'." },
        { id: 7, type: 'mc', question: "You ___ (make) dinner when I arrived.", options: ["were making", "made", "were make"], correctAnswer: "were making", hint: "Verbos terminados em 'e' perdem o 'e' antes do '-ing'." },
        { id: 8, type: 'mc', question: "She ___ (sit) on the sofa while he was working.", options: ["was sitting", "was siting", "sat"], correctAnswer: "was sitting", hint: "'Sit' dobra o 't' antes de adicionar '-ing'." },
        { id: 9, type: 'mc', question: "They ___ (come) to visit us last week at this time.", options: ["were coming", "were comeing", "came"], correctAnswer: "were coming", hint: "Verbos terminados em 'e' perdem o 'e' antes do '-ing'." },
        { id: 10, type: 'mc', question: "He ___ (lie) on the beach when it began to rain.", options: ["was lying", "was lieing", "lay"], correctAnswer: "was lying", hint: "Verbos terminados em 'ie' mudam para 'y' antes do '-ing'." },
        { id: 11, type: 'mc', question: "We ___ (shop) at the mall when we met Sarah.", options: ["were shopping", "were shoping", "shopped"], correctAnswer: "were shopping", hint: "'Shop' dobra o 'p' antes de adicionar '-ing'." },
        { id: 12, type: 'mc', question: "I ___ (begin) my homework when the power went out.", options: ["was beginning", "was begining", "began"], correctAnswer: "was beginning", hint: "'Begin' dobra o 'n' antes de adicionar '-ing'." },
        { id: 13, type: 'mc', question: "She ___ (study) English while her sister was sleeping.", options: ["was studying", "studied", "was studing"], correctAnswer: "was studying", hint: "'Study' apenas adiciona '-ing', sem tirar letras." },
        { id: 14, type: 'mc', question: "It ___ (rain) heavily when we left home.", options: ["was raining", "rained", "were raining"], correctAnswer: "was raining", hint: "'It' usa 'was' + verbo com '-ing'." },
        { id: 15, type: 'mc', question: "The children ___ (play) in the garden when it got dark.", options: ["were playing", "was playing", "played"], correctAnswer: "were playing", hint: "'The children' é plural, use 'were'." },
        { id: 16, type: 'mc', question: "My brother ___ (work) on his project at midnight.", options: ["was working", "worked", "was work"], correctAnswer: "was working", hint: "Não esqueça o 'to be' (was) antes do verbo com '-ing'." },
        { id: 17, type: 'mc', question: "We ___ (eat) dinner when the doorbell rang.", options: ["were eating", "ate", "was eating"], correctAnswer: "were eating", hint: "'We' usa 'were' + verbo com '-ing'." },
        { id: 18, type: 'mc', question: "You ___ (drive) too fast when the police stopped you.", options: ["were driving", "drove", "were driveing"], correctAnswer: "were driving", hint: "Verbos terminados em 'e' perdem o 'e' antes do '-ing'." },
        { id: 19, type: 'mc', question: "He ___ (write) an email when his computer crashed.", options: ["was writing", "wrote", "was writeing"], correctAnswer: "was writing", hint: "Verbos terminados em 'e' perdem o 'e' antes do '-ing'." },
        { id: 20, type: 'mc', question: "They ___ (build) a house last year at this time.", options: ["were building", "built", "was building"], correctAnswer: "were building", hint: "'They' usa 'were' + verbo com '-ing'." },
        { id: 21, type: 'mc', question: "I ___ (learn) to drive while I was living in London.", options: ["was learning", "learned", "were learning"], correctAnswer: "was learning", hint: "Com 'I', use 'was' + verbo com '-ing'." },
        { id: 22, type: 'mc', question: "She ___ (wear) a red dress when I saw her.", options: ["was wearing", "wore", "was weareing"], correctAnswer: "was wearing", hint: "Não esqueça o 'to be' (was) antes do verbo com '-ing'." },
        { id: 23, type: 'mc', question: "We ___ (watch) a movie when the lights went out.", options: ["were watching", "watched", "was watching"], correctAnswer: "were watching", hint: "'We' usa 'were' + verbo com '-ing'." },
        { id: 24, type: 'mc', question: "While he was cooking, I ___ (clean) the house.", options: ["was cleaning", "cleaned", "were cleaning"], correctAnswer: "was cleaning", hint: "Duas ações simultâneas no passado usam Past Continuous nas duas partes." },
        { id: 25, type: 'mc', question: "While they were sleeping, someone ___ (break) into the house.", options: ["was breaking", "broke", "were breaking"], correctAnswer: "was breaking", hint: "Uma ação pontual que interrompe outra usa Simple Past, mas aqui a pergunta pede o contínuo do sujeito. 'Someone' é singular, use 'was'." },
        { id: 26, type: 'rewrite', question: "Rewrite using Past Continuous and Simple Past: I (watch) TV when the phone (ring).", correctAnswer: "I was watching TV when the phone rang.", hint: "Ação longa em Past Continuous ('was watching'); ação curta que interrompe em Simple Past ('rang')." },
        { id: 27, type: 'rewrite', question: "Rewrite using Past Continuous and Simple Past: She (cook) dinner when the fire alarm (go off).", correctAnswer: "She was cooking dinner when the fire alarm went off.", hint: "'Was cooking' (ação longa) + 'went off' (ação curta que interrompe)." },
        { id: 28, type: 'rewrite', question: "Rewrite using Past Continuous and Simple Past: They (walk) to school when it (start) to rain.", correctAnswer: "They were walking to school when it started to rain.", hint: "'Were walking' (ação longa) + 'started' (ação curta que interrompe)." },
        { id: 29, type: 'rewrite', question: "Rewrite using Past Continuous and Simple Past: He (write) a letter when the lights (go) out.", correctAnswer: "He was writing a letter when the lights went out.", hint: "'Was writing' (ação longa) + 'went out' (ação curta)." },
        { id: 30, type: 'rewrite', question: "Rewrite using Past Continuous and Simple Past: We (study) for the exam when the teacher (arrive).", correctAnswer: "We were studying for the exam when the teacher arrived.", hint: "'Were studying' (ação longa) + 'arrived' (ação curta)." },
        { id: 31, type: 'rewrite', question: "Rewrite using Past Continuous and Simple Past: I (sit) in the classroom when the fire alarm (ring).", correctAnswer: "I was sitting in the classroom when the fire alarm rang.", hint: "'Sit' dobra o 't' antes do '-ing'." },
        { id: 32, type: 'rewrite', question: "Rewrite using Past Continuous and Simple Past: You (make) a mistake when I (see) you.", correctAnswer: "You were making a mistake when I saw you.", hint: "'Make' perde o 'e' antes do '-ing'." },
        { id: 33, type: 'rewrite', question: "Rewrite using Past Continuous and Simple Past: The dog (run) in the yard when it (see) a cat.", correctAnswer: "The dog was running in the yard when it saw a cat.", hint: "'Run' dobra o 'n' antes do '-ing'." },
        { id: 34, type: 'rewrite', question: "Rewrite using Past Continuous and Simple Past: She (swim) in the lake when it (begin) to storm.", correctAnswer: "She was swimming in the lake when it began to storm.", hint: "'Swim' dobra o 'm' antes do '-ing'." },
        { id: 35, type: 'rewrite', question: "Rewrite using Past Continuous and Simple Past: They (come) to visit us when the accident (happen).", correctAnswer: "They were coming to visit us when the accident happened.", hint: "'Come' perde o 'e' antes do '-ing'." },
        { id: 36, type: 'rewrite', question: "Rewrite using Past Continuous and Simple Past: He (lie) on the grass when it (start) to rain.", correctAnswer: "He was lying on the grass when it started to rain.", hint: "'Lie' muda para 'lying' antes do '-ing'." },
        { id: 37, type: 'rewrite', question: "Rewrite using Past Continuous and Simple Past: We (shop) for groceries when we (meet) an old friend.", correctAnswer: "We were shopping for groceries when we met an old friend.", hint: "'Shop' dobra o 'p' antes do '-ing'." },
        { id: 38, type: 'rewrite', question: "Rewrite using Past Continuous and Simple Past: I (begin) my presentation when the projector (stop) working.", correctAnswer: "I was beginning my presentation when the projector stopped working.", hint: "'Begin' dobra o 'n' antes do '-ing'." },
        { id: 39, type: 'rewrite', question: "Rewrite using Past Continuous and Simple Past: She (study) for her test when her phone (ring).", correctAnswer: "She was studying for her test when her phone rang.", hint: "'Study' apenas adiciona '-ing'." },
        { id: 40, type: 'rewrite', question: "Rewrite using Past Continuous and Simple Past: It (rain) outside when we (leave) the house.", correctAnswer: "It was raining outside when we left the house.", hint: "'It' usa 'was' + verbo com '-ing'." },
        { id: 41, type: 'rewrite', question: "Rewrite using Past Continuous and Simple Past: The children (play) in the park when it (get) dark.", correctAnswer: "The children were playing in the park when it got dark.", hint: "'The children' é plural, use 'were'." },
        { id: 42, type: 'rewrite', question: "Rewrite using Past Continuous and Simple Past: My sister (work) on a project when the computer (crash).", correctAnswer: "My sister was working on a project when the computer crashed.", hint: "Não esqueça o 'to be' (was)." },
        { id: 43, type: 'rewrite', question: "Rewrite using Past Continuous and Simple Past: We (eat) breakfast when the mail carrier (arrive).", correctAnswer: "We were eating breakfast when the mail carrier arrived.", hint: "'We' usa 'were' + verbo com '-ing'." },
        { id: 44, type: 'rewrite', question: "Rewrite using Past Continuous and Simple Past: You (drive) very fast when the police (stop) you.", correctAnswer: "You were driving very fast when the police stopped you.", hint: "'Drive' perde o 'e' antes do '-ing'." },
        { id: 45, type: 'rewrite', question: "Rewrite using Past Continuous and Simple Past: He (write) a report when his boss (call).", correctAnswer: "He was writing a report when his boss called.", hint: "'Write' perde o 'e' antes do '-ing'." },
        { id: 46, type: 'rewrite', question: "Rewrite using Past Continuous and Simple Past: They (build) a new bridge when the funding (run) out.", correctAnswer: "They were building a new bridge when the funding ran out.", hint: "'They' usa 'were' + verbo com '-ing'." },
        { id: 47, type: 'rewrite', question: "Rewrite using Past Continuous (both actions happening at the same time): While I (read) a book, my brother (watch) TV.", correctAnswer: "While I was reading a book, my brother was watching TV.", hint: "Duas ações longas acontecendo ao mesmo tempo usam Past Continuous nas duas partes." },
        { id: 48, type: 'rewrite', question: "Rewrite using Past Continuous (both actions happening at the same time): While she (cook) dinner, he (set) the table.", correctAnswer: "While she was cooking dinner, he was setting the table.", hint: "'Set' dobra o 't' antes do '-ing'." },
        { id: 49, type: 'rewrite', question: "Rewrite using Past Continuous and Simple Past: While they (study), it (start) to rain.", correctAnswer: "While they were studying, it started to rain.", hint: "'While' + ação longa (Past Continuous), seguida de ação curta (Simple Past)." },
        { id: 50, type: 'rewrite', question: "Rewrite using Past Continuous and Simple Past: While we (walk) home, we (see) an accident.", correctAnswer: "While we were walking home, we saw an accident.", hint: "'While' + ação longa (Past Continuous), seguida de ação curta (Simple Past)." }
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
