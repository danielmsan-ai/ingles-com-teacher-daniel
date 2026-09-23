document.addEventListener('DOMContentLoaded', () => {
    const loggedInUser = JSON.parse(localStorage.getItem('loggedInUser'));

    if (!loggedInUser || loggedInUser.type !== 'student') {
        alert('Acesso não autorizado. Por favor, faça login como aluno.');
        window.location.href = 'index.html';
        return;
    }

    const TOPIC_NAME = 'Present Continuous';

    const exerciseArea = document.getElementById('exercise-area');
    const prevButton = document.getElementById('prev-exercise');
    const nextButton = document.getElementById('next-exercise');

    let currentExerciseIndex = 0;
    let exercises = [];

    // --- EXERCÍCIOS AFIRMATIVOS (50 exemplos) ---
    exercises = [
        { id: 1, type: 'mc', question: "I ___ (write) a letter right now.", options: ["write", "am writing", "is writing"], correctAnswer: "am writing", hint: "Use o verbo 'to be' (am) + verbo com '-ing'." },
        { id: 2, type: 'mc', question: "She ___ (read) a book at the moment.", options: ["reads", "is reading", "are reading"], correctAnswer: "is reading", hint: "'She' usa 'is' + verbo com '-ing'." },
        { id: 3, type: 'mc', question: "They ___ (play) football now.", options: ["play", "is playing", "are playing"], correctAnswer: "are playing", hint: "'They' usa 'are' + verbo com '-ing'." },
        { id: 4, type: 'mc', question: "We ___ (study) for the test this week.", options: ["study", "are studying", "is studying"], correctAnswer: "are studying", hint: "'We' usa 'are' + verbo com '-ing'." },
        { id: 5, type: 'mc', question: "He ___ (run) in the park right now.", options: ["runs", "is running", "is runing"], correctAnswer: "is running", hint: "Verbos terminados em consoante+vogal+consoante dobram a última letra antes do '-ing'." },
        { id: 6, type: 'mc', question: "I ___ (swim) in the pool at the moment.", options: ["am swimming", "am swiming", "swim"], correctAnswer: "am swimming", hint: "'Swim' dobra o 'm' antes de adicionar '-ing'." },
        { id: 7, type: 'mc', question: "You ___ (make) dinner right now.", options: ["are making", "are make", "make"], correctAnswer: "are making", hint: "Verbos terminados em 'e' perdem o 'e' antes do '-ing'." },
        { id: 8, type: 'mc', question: "She ___ (sit) on the sofa now.", options: ["is sitting", "is siting", "sits"], correctAnswer: "is sitting", hint: "'Sit' dobra o 't' antes de adicionar '-ing'." },
        { id: 9, type: 'mc', question: "They ___ (come) to the party tonight.", options: ["are coming", "are comeing", "come"], correctAnswer: "are coming", hint: "Verbos terminados em 'e' perdem o 'e' antes do '-ing'." },
        { id: 10, type: 'mc', question: "He ___ (lie) on the beach today.", options: ["is lying", "is lieing", "lies"], correctAnswer: "is lying", hint: "Verbos terminados em 'ie' mudam para 'y' antes do '-ing'." },
        { id: 11, type: 'mc', question: "We ___ (shop) at the mall right now.", options: ["are shopping", "are shoping", "shop"], correctAnswer: "are shopping", hint: "'Shop' dobra o 'p' antes de adicionar '-ing'." },
        { id: 12, type: 'mc', question: "I ___ (begin) a new project this week.", options: ["am beginning", "am begining", "begin"], correctAnswer: "am beginning", hint: "'Begin' dobra o 'n' antes de adicionar '-ing'." },
        { id: 13, type: 'mc', question: "She ___ (study) English this semester.", options: ["is studying", "studies", "is studing"], correctAnswer: "is studying", hint: "'Study' apenas adiciona '-ing', sem tirar letras." },
        { id: 14, type: 'mc', question: "It ___ (rain) right now.", options: ["is raining", "rains", "are raining"], correctAnswer: "is raining", hint: "'It' usa 'is' + verbo com '-ing'." },
        { id: 15, type: 'mc', question: "The children ___ (play) in the garden now.", options: ["are playing", "is playing", "play"], correctAnswer: "are playing", hint: "'The children' é plural, use 'are'." },
        { id: 16, type: 'mc', question: "My brother ___ (work) on a project this week.", options: ["is working", "works", "is work"], correctAnswer: "is working", hint: "Não esqueça o 'to be' (is) antes do verbo com '-ing'." },
        { id: 17, type: 'mc', question: "We ___ (eat) dinner at the moment.", options: ["are eating", "eat", "is eating"], correctAnswer: "are eating", hint: "'We' usa 'are' + verbo com '-ing'." },
        { id: 18, type: 'mc', question: "You ___ (drive) too fast right now!", options: ["are driving", "drive", "are driveing"], correctAnswer: "are driving", hint: "Verbos terminados em 'e' perdem o 'e' antes do '-ing'." },
        { id: 19, type: 'mc', question: "He ___ (write) an email now.", options: ["is writing", "writes", "is writeing"], correctAnswer: "is writing", hint: "Verbos terminados em 'e' perdem o 'e' antes do '-ing'." },
        { id: 20, type: 'mc', question: "They ___ (build) a new house this year.", options: ["are building", "build", "is building"], correctAnswer: "are building", hint: "'They' usa 'are' + verbo com '-ing'." },
        { id: 21, type: 'mc', question: "I ___ (learn) Spanish this semester.", options: ["am learning", "learn", "is learning"], correctAnswer: "am learning", hint: "Com 'I', use 'am' + verbo com '-ing'." },
        { id: 22, type: 'mc', question: "She ___ (wear) a red dress today.", options: ["is wearing", "wears", "is weareing"], correctAnswer: "is wearing", hint: "Não esqueça o 'to be' (is) antes do verbo com '-ing'." },
        { id: 23, type: 'mc', question: "We ___ (watch) a movie right now.", options: ["are watching", "watch", "is watching"], correctAnswer: "are watching", hint: "'We' usa 'are' + verbo com '-ing'." },
        { id: 24, type: 'mc', question: "He usually plays soccer, but today he ___ (play) basketball.", options: ["is playing", "plays", "play"], correctAnswer: "is playing", hint: "'Today' indica uma ação temporária, use Present Continuous." },
        { id: 25, type: 'mc', question: "I usually walk to work, but this week I ___ (drive) to work.", options: ["am driving", "drive", "drives"], correctAnswer: "am driving", hint: "'This week' indica uma situação temporária, use Present Continuous." },
        { id: 26, type: 'rewrite', question: "Rewrite the sentence using the Present Continuous: I (read) a book now.", correctAnswer: "I am reading a book now.", hint: "Use 'am' + verbo com '-ing'." },
        { id: 27, type: 'rewrite', question: "Rewrite the sentence using the Present Continuous: She (cook) dinner at the moment.", correctAnswer: "She is cooking dinner at the moment.", hint: "Use 'is' + verbo com '-ing'." },
        { id: 28, type: 'rewrite', question: "Rewrite the sentence using the Present Continuous: They (walk) to school right now.", correctAnswer: "They are walking to school right now.", hint: "Use 'are' + verbo com '-ing'." },
        { id: 29, type: 'rewrite', question: "Rewrite the sentence using the Present Continuous: He (write) a letter today.", correctAnswer: "He is writing a letter today.", hint: "Verbos terminados em 'e' perdem o 'e' antes do '-ing'." },
        { id: 30, type: 'rewrite', question: "Rewrite the sentence using the Present Continuous: We (study) for the exam this week.", correctAnswer: "We are studying for the exam this week.", hint: "Use 'are' + verbo com '-ing'." },
        { id: 31, type: 'rewrite', question: "Rewrite the sentence using the Present Continuous: I (sit) in the classroom now.", correctAnswer: "I am sitting in the classroom now.", hint: "'Sit' dobra o 't' antes de adicionar '-ing'." },
        { id: 32, type: 'rewrite', question: "Rewrite the sentence using the Present Continuous: You (make) a mistake right now.", correctAnswer: "You are making a mistake right now.", hint: "Verbos terminados em 'e' perdem o 'e' antes do '-ing'." },
        { id: 33, type: 'rewrite', question: "Rewrite the sentence using the Present Continuous: The dog (run) in the yard at the moment.", correctAnswer: "The dog is running in the yard at the moment.", hint: "'Run' dobra o 'n' antes de adicionar '-ing'." },
        { id: 34, type: 'rewrite', question: "Rewrite the sentence using the Present Continuous: She (swim) in the lake today.", correctAnswer: "She is swimming in the lake today.", hint: "'Swim' dobra o 'm' antes de adicionar '-ing'." },
        { id: 35, type: 'rewrite', question: "Rewrite the sentence using the Present Continuous: They (come) to visit us this week.", correctAnswer: "They are coming to visit us this week.", hint: "Verbos terminados em 'e' perdem o 'e' antes do '-ing'." },
        { id: 36, type: 'rewrite', question: "Rewrite the sentence using the Present Continuous: He (lie) on the grass right now.", correctAnswer: "He is lying on the grass right now.", hint: "Verbos terminados em 'ie' mudam para 'y' antes do '-ing'." },
        { id: 37, type: 'rewrite', question: "Rewrite the sentence using the Present Continuous: We (shop) for groceries at the moment.", correctAnswer: "We are shopping for groceries at the moment.", hint: "'Shop' dobra o 'p' antes de adicionar '-ing'." },
        { id: 38, type: 'rewrite', question: "Rewrite the sentence using the Present Continuous: I (begin) a new job this month.", correctAnswer: "I am beginning a new job this month.", hint: "'Begin' dobra o 'n' antes de adicionar '-ing'." },
        { id: 39, type: 'rewrite', question: "Rewrite the sentence using the Present Continuous: She (study) for her test tonight.", correctAnswer: "She is studying for her test tonight.", hint: "'Study' apenas adiciona '-ing'." },
        { id: 40, type: 'rewrite', question: "Rewrite the sentence using the Present Continuous: It (rain) outside right now.", correctAnswer: "It is raining outside right now.", hint: "'It' usa 'is' + verbo com '-ing'." },
        { id: 41, type: 'rewrite', question: "Rewrite the sentence using the Present Continuous: The children (play) in the park now.", correctAnswer: "The children are playing in the park now.", hint: "'The children' é plural, use 'are'." },
        { id: 42, type: 'rewrite', question: "Rewrite the sentence using the Present Continuous: My sister (work) on a project this week.", correctAnswer: "My sister is working on a project this week.", hint: "Não esqueça o 'to be' (is)." },
        { id: 43, type: 'rewrite', question: "Rewrite the sentence using the Present Continuous: We (eat) breakfast at the moment.", correctAnswer: "We are eating breakfast at the moment.", hint: "Use 'are' + verbo com '-ing'." },
        { id: 44, type: 'rewrite', question: "Rewrite the sentence using the Present Continuous: You (drive) very fast right now.", correctAnswer: "You are driving very fast right now.", hint: "Verbos terminados em 'e' perdem o 'e' antes do '-ing'." },
        { id: 45, type: 'rewrite', question: "Rewrite the sentence using the Present Continuous: He (write) a report today.", correctAnswer: "He is writing a report today.", hint: "Verbos terminados em 'e' perdem o 'e' antes do '-ing'." },
        { id: 46, type: 'rewrite', question: "Rewrite the sentence using the Present Continuous: They (build) a new bridge this year.", correctAnswer: "They are building a new bridge this year.", hint: "Use 'are' + verbo com '-ing'." },
        { id: 47, type: 'rewrite', question: "Rewrite the sentence using the Present Continuous: I (learn) French this semester.", correctAnswer: "I am learning French this semester.", hint: "Com 'I', use 'am' + verbo com '-ing'." },
        { id: 48, type: 'rewrite', question: "Rewrite the sentence using the Present Continuous: She (wear) a blue jacket today.", correctAnswer: "She is wearing a blue jacket today.", hint: "Não esqueça o 'to be' (is)." },
        { id: 49, type: 'rewrite', question: "Rewrite using Present Continuous: He usually studies in the morning, but today he (study) in the afternoon.", correctAnswer: "He usually studies in the morning, but today he is studying in the afternoon.", hint: "'Today' indica uma exceção temporária à rotina, use Present Continuous." },
        { id: 50, type: 'rewrite', question: "Rewrite using Present Continuous: I usually drink coffee, but right now I (drink) tea.", correctAnswer: "I usually drink coffee, but right now I am drinking tea.", hint: "'Right now' indica uma ação acontecendo neste momento, use Present Continuous." }
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
