document.addEventListener('DOMContentLoaded', () => {
    const loggedInUser = JSON.parse(localStorage.getItem('loggedInUser'));

    if (!loggedInUser || loggedInUser.type !== 'student') {
        alert('Acesso não autorizado. Por favor, faça login como aluno.');
        window.location.href = 'index.html';
        return;
    }

    const TOPIC_NAME = 'Prepositions + Verb-ing';
    const exerciseArea = document.getElementById('exercise-area');
    const prevButton = document.getElementById('prev-exercise');
    const nextButton = document.getElementById('next-exercise');

    let currentExerciseIndex = 0;

    const exercises = [
        { id: 1, question: "She is interested in ___ English.", options: ["learn", "learning", "to learn"], correctAnswer: "learning", hint: "Depois da preposição 'in', use o verbo com -ing." },
        { id: 2, question: "Thank you for ___ me.", options: ["help", "helping", "to help"], correctAnswer: "helping", hint: "Depois de 'for', use o verbo com -ing." },
        { id: 3, question: "He left without ___ goodbye.", options: ["say", "saying", "to say"], correctAnswer: "saying", hint: "Depois da preposição 'without', use o verbo com -ing." },
        { id: 4, question: "They talked about ___ a new business.", options: ["start", "starting", "to start"], correctAnswer: "starting", hint: "Depois de 'about', use o verbo com -ing." },
        { id: 5, question: "She is good at ___ difficult problems.", options: ["solve", "solving", "to solve"], correctAnswer: "solving", hint: "Depois da preposição 'at', use o verbo com -ing." },
        { id: 6, question: "I am tired of ___ the same thing every day.", options: ["do", "doing", "to do"], correctAnswer: "doing", hint: "Depois de 'of', use o verbo com -ing." },
        { id: 7, question: "He apologized for ___ late.", options: ["arrive", "arriving", "to arrive"], correctAnswer: "arriving", hint: "Depois de 'for', use o verbo com -ing." },
        { id: 8, question: "We are looking forward to ___ you.", options: ["see", "seeing", "to see"], correctAnswer: "seeing", hint: "Na expressão 'look forward to', 'to' é uma preposição; use o verbo com -ing." },
        { id: 9, question: "She left the room before ___ the answer.", options: ["hear", "hearing", "to hear"], correctAnswer: "hearing", hint: "Depois da preposição 'before', use o verbo com -ing." },
        { id: 10, question: "He succeeded in ___ the exam.", options: ["pass", "passing", "to pass"], correctAnswer: "passing", hint: "Depois de 'in', use o verbo com -ing." },
        { id: 11, question: "They went home after ___ dinner.", options: ["eat", "eating", "to eat"], correctAnswer: "eating", hint: "Depois da preposição 'after', use o verbo com -ing." },
        { id: 12, question: "She is afraid of ___ alone at night.", options: ["walk", "walking", "to walk"], correctAnswer: "walking", hint: "Depois da preposição 'of', use o verbo com -ing." },
        { id: 13, question: "He is interested in ___ old cars.", options: ["collect", "collecting", "to collect"], correctAnswer: "collecting", hint: "Depois de 'in', use o verbo com -ing." },
        { id: 14, question: "I thanked her for ___ me with my homework.", options: ["help", "helping", "to help"], correctAnswer: "helping", hint: "Depois de 'for', use o verbo com -ing." },
        { id: 15, question: "They left without ___ their friends.", options: ["tell", "telling", "to tell"], correctAnswer: "telling", hint: "Depois de 'without', use o verbo com -ing." },
        { id: 16, question: "He is thinking about ___ a new job.", options: ["find", "finding", "to find"], correctAnswer: "finding", hint: "Depois de 'about', use o verbo com -ing." },
        { id: 17, question: "She is excellent at ___ stories.", options: ["write", "writing", "to write"], correctAnswer: "writing", hint: "Depois da preposição 'at', use o verbo com -ing." },
        { id: 18, question: "I am looking forward to ___ my cousins.", options: ["visit", "visiting", "to visit"], correctAnswer: "visiting", hint: "Na expressão 'look forward to', use o verbo com -ing." },
        { id: 19, question: "He apologized for ___ the meeting.", options: ["miss", "missing", "to miss"], correctAnswer: "missing", hint: "Depois de 'for', use o verbo com -ing." },
        { id: 20, question: "She went to bed after ___ a book.", options: ["read", "reading", "to read"], correctAnswer: "reading", hint: "Depois da preposição 'after', use o verbo com -ing." },
        { id: 21, question: "They are worried about ___ the train.", options: ["miss", "missing", "to miss"], correctAnswer: "missing", hint: "Depois de 'about', use o verbo com -ing." },
        { id: 22, question: "He is responsible for ___ the office.", options: ["clean", "cleaning", "to clean"], correctAnswer: "cleaning", hint: "Depois de 'for', use o verbo com -ing." },
        { id: 23, question: "She is tired of ___ for the bus.", options: ["wait", "waiting", "to wait"], correctAnswer: "waiting", hint: "Depois de 'of', use o verbo com -ing." },
        { id: 24, question: "We talked about ___ a trip together.", options: ["take", "taking", "to take"], correctAnswer: "taking", hint: "Depois de 'about', use o verbo com -ing." },
        { id: 25, question: "He is bad at ___ names.", options: ["remember", "remembering", "to remember"], correctAnswer: "remembering", hint: "Depois da preposição 'at', use o verbo com -ing." },
        { id: 26, question: "She got better at ___ after practicing every day.", options: ["dance", "dancing", "to dance"], correctAnswer: "dancing", hint: "Depois da preposição 'at', use o verbo com -ing." },
        { id: 27, question: "Before ___ the house, please turn off the lights.", options: ["leave", "leaving", "to leave"], correctAnswer: "leaving", hint: "Depois de 'before', use o verbo com -ing." },
        { id: 28, question: "He is afraid of ___ mistakes in the test.", options: ["make", "making", "to make"], correctAnswer: "making", hint: "Depois da preposição 'of', use o verbo com -ing." },
        { id: 29, question: "They succeeded in ___ the problem.", options: ["solve", "solving", "to solve"], correctAnswer: "solving", hint: "Depois de 'in', use o verbo com -ing." },
        { id: 30, question: "She left the party without ___ goodbye.", options: ["say", "saying", "to say"], correctAnswer: "saying", hint: "Depois de 'without', use o verbo com -ing." },

        { id: 31, question: "She is excited about ___ her new classmates.", options: ["meet", "meeting", "to meet"], correctAnswer: "meeting", hint: "Depois da preposição 'about', use o verbo com -ing." },
        { id: 32, question: "He left the house without ___ his keys.", options: ["take", "taking", "to take"], correctAnswer: "taking", hint: "Depois de 'without', use o verbo com -ing." },
        { id: 33, question: "They are interested in ___ a language course.", options: ["take", "taking", "to take"], correctAnswer: "taking", hint: "Depois da preposição 'in', use o verbo com -ing." },
        { id: 34, question: "Thank you for ___ us to your party.", options: ["invite", "inviting", "to invite"], correctAnswer: "inviting", hint: "Depois de 'for', use o verbo com -ing." },
        { id: 35, question: "He is good at ___ things by hand.", options: ["make", "making", "to make"], correctAnswer: "making", hint: "Depois da preposição 'at', use o verbo com -ing." },
        { id: 36, question: "We talked about ___ a weekend trip.", options: ["plan", "planning", "to plan"], correctAnswer: "planning", hint: "Depois de 'about', use o verbo com -ing." },
        { id: 37, question: "She apologized for ___ the wrong address.", options: ["write", "writing", "to write"], correctAnswer: "writing", hint: "Depois de 'for', use o verbo com -ing." },
        { id: 38, question: "I am looking forward to ___ the movie.", options: ["watch", "watching", "to watch"], correctAnswer: "watching", hint: "Em 'look forward to', 'to' é uma preposição; use o verbo com -ing." },
        { id: 39, question: "He went to work after ___ breakfast.", options: ["have", "having", "to have"], correctAnswer: "having", hint: "Depois da preposição 'after', use o verbo com -ing." },
        { id: 40, question: "She is afraid of ___ in front of a large audience.", options: ["speak", "speaking", "to speak"], correctAnswer: "speaking", hint: "Depois da preposição 'of', use o verbo com -ing." },
        { id: 41, question: "They succeeded in ___ the old building.", options: ["repair", "repairing", "to repair"], correctAnswer: "repairing", hint: "Depois de 'in', use o verbo com -ing." },
        { id: 42, question: "He is tired of ___ for the same bus every morning.", options: ["wait", "waiting", "to wait"], correctAnswer: "waiting", hint: "Depois de 'of', use o verbo com -ing." },
        { id: 43, question: "Before ___ the email, check the spelling.", options: ["send", "sending", "to send"], correctAnswer: "sending", hint: "Depois de 'before', use o verbo com -ing." },
        { id: 44, question: "She left without ___ anyone where she was going.", options: ["tell", "telling", "to tell"], correctAnswer: "telling", hint: "Depois de 'without', use o verbo com -ing." },
        { id: 45, question: "He is responsible for ___ the weekly schedule.", options: ["organize", "organizing", "to organize"], correctAnswer: "organizing", hint: "Depois da preposição 'for', use o verbo com -ing." },
        { id: 46, question: "We are thinking about ___ a dog.", options: ["get", "getting", "to get"], correctAnswer: "getting", hint: "Depois de 'about', use o verbo com -ing." },
        { id: 47, question: "She is worried about ___ her flight.", options: ["miss", "missing", "to miss"], correctAnswer: "missing", hint: "Depois de 'about', use o verbo com -ing." },
        { id: 48, question: "He thanked his friend for ___ him move.", options: ["help", "helping", "to help"], correctAnswer: "helping", hint: "Depois de 'for', use o verbo com -ing." },
        { id: 49, question: "After ___ the dishes, I watched television.", options: ["wash", "washing", "to wash"], correctAnswer: "washing", hint: "Depois da preposição 'after', use o verbo com -ing." },
        { id: 50, question: "She is interested in ___ how to cook Italian food.", options: ["learn", "learning", "to learn"], correctAnswer: "learning", hint: "Depois da preposição 'in', use o verbo com -ing." },
        { id: 51, question: "He is very good at ___ complicated instructions.", options: ["follow", "following", "to follow"], correctAnswer: "following", hint: "Depois da preposição 'at', use o verbo com -ing." },
        { id: 52, question: "They left the restaurant before ___ dessert.", options: ["order", "ordering", "to order"], correctAnswer: "ordering", hint: "Depois de 'before', use o verbo com -ing." },
        { id: 53, question: "I am looking forward to ___ my new job.", options: ["start", "starting", "to start"], correctAnswer: "starting", hint: "Na expressão 'look forward to', use o verbo com -ing." },
        { id: 54, question: "She apologized for ___ the appointment.", options: ["forget", "forgetting", "to forget"], correctAnswer: "forgetting", hint: "Depois de 'for', use o verbo com -ing." },
        { id: 55, question: "He is afraid of ___ alone in the forest.", options: ["camp", "camping", "to camp"], correctAnswer: "camping", hint: "Depois da preposição 'of', use o verbo com -ing." },
        { id: 56, question: "We talked about ___ a community garden.", options: ["create", "creating", "to create"], correctAnswer: "creating", hint: "Depois de 'about', use o verbo com -ing." },
        { id: 57, question: "She improved her English by ___ podcasts every day.", options: ["listen to", "listening to", "to listen to"], correctAnswer: "listening to", hint: "Depois da preposição 'by', use o verbo com -ing." },
        { id: 58, question: "He went to bed without ___ his alarm.", options: ["set", "setting", "to set"], correctAnswer: "setting", hint: "Depois de 'without', use o verbo com -ing." },
        { id: 59, question: "They are excited about ___ in the school play.", options: ["perform", "performing", "to perform"], correctAnswer: "performing", hint: "Depois de 'about', use o verbo com -ing." },
        { id: 60, question: "She succeeded in ___ her fear of public speaking.", options: ["overcome", "overcoming", "to overcome"], correctAnswer: "overcoming", hint: "Depois de 'in', use o verbo com -ing." },

        { id: 61, question: "He is interested in ___ how the machine works.", options: ["learn", "learning", "to learn"], correctAnswer: "learning", hint: "Depois da preposição 'in', use o verbo com -ing." },
        { id: 62, question: "They celebrated by ___ a special dinner.", options: ["prepare", "preparing", "to prepare"], correctAnswer: "preparing", hint: "Depois de 'by', use o verbo com -ing." },
        { id: 63, question: "She left the office without ___ her computer.", options: ["turn off", "turning off", "to turn off"], correctAnswer: "turning off", hint: "Depois de 'without', use o verbo com -ing." },
        { id: 64, question: "I am thinking about ___ my old bicycle.", options: ["sell", "selling", "to sell"], correctAnswer: "selling", hint: "Depois de 'about', use o verbo com -ing." },
        { id: 65, question: "He is nervous about ___ in the competition.", options: ["compete", "competing", "to compete"], correctAnswer: "competing", hint: "Depois de 'about', use o verbo com -ing." },
        { id: 66, question: "Thank you for ___ us with the move.", options: ["help", "helping", "to help"], correctAnswer: "helping", hint: "Depois de 'for', use o verbo com -ing." },
        { id: 67, question: "After ___ the report, she sent it to her manager.", options: ["finish", "finishing", "to finish"], correctAnswer: "finishing", hint: "Depois da preposição 'after', use o verbo com -ing." },
        { id: 68, question: "He is responsible for ___ the children after school.", options: ["pick up", "picking up", "to pick up"], correctAnswer: "picking up", hint: "Depois da preposição 'for', use o verbo com -ing." },
        { id: 69, question: "We are looking forward to ___ at the new restaurant.", options: ["eat", "eating", "to eat"], correctAnswer: "eating", hint: "Em 'look forward to', 'to' é uma preposição; use o verbo com -ing." },
        { id: 70, question: "She is good at ___ difficult decisions.", options: ["make", "making", "to make"], correctAnswer: "making", hint: "Depois da preposição 'at', use o verbo com -ing." },
        { id: 71, question: "Before ___ the cake, preheat the oven.", options: ["bake", "baking", "to bake"], correctAnswer: "baking", hint: "Depois de 'before', use o verbo com -ing." },
        { id: 72, question: "He apologized for ___ my call yesterday.", options: ["not answer", "not answering", "not to answer"], correctAnswer: "not answering", hint: "Depois de 'for', use o verbo com -ing. A negação fica 'not' antes do verbo com -ing." },
        { id: 73, question: "She improved her pronunciation by ___ aloud every day.", options: ["read", "reading", "to read"], correctAnswer: "reading", hint: "Depois da preposição 'by', use o verbo com -ing." },
        { id: 74, question: "They talked about ___ a new apartment.", options: ["rent", "renting", "to rent"], correctAnswer: "renting", hint: "Depois de 'about', use o verbo com -ing." },
        { id: 75, question: "He left the meeting without ___ a word.", options: ["say", "saying", "to say"], correctAnswer: "saying", hint: "Depois de 'without', use o verbo com -ing." },
        { id: 76, question: "I am tired of ___ the same questions.", options: ["answer", "answering", "to answer"], correctAnswer: "answering", hint: "Depois de 'of', use o verbo com -ing." },
        { id: 77, question: "She is excited about ___ her grandparents next week.", options: ["visit", "visiting", "to visit"], correctAnswer: "visiting", hint: "Depois de 'about', use o verbo com -ing." },
        { id: 78, question: "He succeeded in ___ a place on the team.", options: ["get", "getting", "to get"], correctAnswer: "getting", hint: "Depois de 'in', use o verbo com -ing." },
        { id: 79, question: "We went for a walk after ___ lunch.", options: ["have", "having", "to have"], correctAnswer: "having", hint: "Depois da preposição 'after', use o verbo com -ing." },
        { id: 80, question: "She is afraid of ___ the wrong decision.", options: ["make", "making", "to make"], correctAnswer: "making", hint: "Depois da preposição 'of', use o verbo com -ing." },
        { id: 81, question: "He thanked me for ___ him the directions.", options: ["give", "giving", "to give"], correctAnswer: "giving", hint: "Depois de 'for', use o verbo com -ing." },
        { id: 82, question: "They are interested in ___ more about local history.", options: ["find out", "finding out", "to find out"], correctAnswer: "finding out", hint: "Depois da preposição 'in', use o verbo com -ing." },
        { id: 83, question: "Before ___ the door, make sure you have your keys.", options: ["lock", "locking", "to lock"], correctAnswer: "locking", hint: "Depois de 'before', use o verbo com -ing." },
        { id: 84, question: "He is worried about ___ enough time to finish.", options: ["not have", "not having", "not to have"], correctAnswer: "not having", hint: "Depois de 'about', use o verbo com -ing. Para negar, coloque 'not' antes dele." },
        { id: 85, question: "She is excellent at ___ clear presentations.", options: ["give", "giving", "to give"], correctAnswer: "giving", hint: "Depois da preposição 'at', use o verbo com -ing." },
        { id: 86, question: "They celebrated after ___ the final match.", options: ["win", "winning", "to win"], correctAnswer: "winning", hint: "Depois da preposição 'after', use o verbo com -ing." },
        { id: 87, question: "I am looking forward to ___ from you soon.", options: ["hear", "hearing", "to hear"], correctAnswer: "hearing", hint: "Em 'look forward to', 'to' é uma preposição; use o verbo com -ing." },
        { id: 88, question: "He left without ___ the lights.", options: ["turn off", "turning off", "to turn off"], correctAnswer: "turning off", hint: "Depois de 'without', use o verbo com -ing." },
        { id: 89, question: "She learned a lot by ___ with people from other countries.", options: ["talk", "talking", "to talk"], correctAnswer: "talking", hint: "Depois da preposição 'by', use o verbo com -ing." },
        { id: 90, question: "They are thinking about ___ their house next year.", options: ["renovate", "renovating", "to renovate"], correctAnswer: "renovating", hint: "Depois de 'about', use o verbo com -ing." }
    ];

    function updateStudentProgress(isCorrect) {
        const users = JSON.parse(localStorage.getItem('users')) || [];
        const userIndex = users.findIndex(user => user.id === loggedInUser.id);

        if (userIndex === -1) {
            return;
        }

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

    function renderExercise() {
        const exercise = exercises[currentExerciseIndex];
        exerciseArea.innerHTML = '';

        const questionElement = document.createElement('p');
        questionElement.classList.add('exercise-question');
        questionElement.textContent = exercise.question;
        exerciseArea.appendChild(questionElement);

        const optionsContainer = document.createElement('div');
        optionsContainer.classList.add('options-container');

        const shuffledOptions = [...exercise.options].sort(() => Math.random() - 0.5);

        shuffledOptions.forEach(option => {
            const button = document.createElement('button');
            button.type = 'button';
            button.classList.add('option-button');
            button.textContent = option;

            button.addEventListener('click', () => {
                checkAnswer(option, exercise, button);
            });

            optionsContainer.appendChild(button);
        });

        exerciseArea.appendChild(optionsContainer);
        updateNavigationButtons();
    }

    function checkAnswer(userAnswer, exercise, selectedButton) {
        if (exerciseArea.querySelector('.feedback-message')) {
            return;
        }

        const isCorrect =
            userAnswer.trim().toLowerCase() === exercise.correctAnswer.trim().toLowerCase();

        const feedbackMessage = document.createElement('p');
        feedbackMessage.classList.add('feedback-message');

        if (isCorrect) {
            feedbackMessage.textContent = 'Correct!';
            feedbackMessage.classList.add('correct');
            selectedButton.classList.add('correct');
        } else {
            feedbackMessage.textContent = `Incorrect. The correct answer is: "${exercise.correctAnswer}".`;
            feedbackMessage.classList.add('incorrect');
            selectedButton.classList.add('incorrect');

            exerciseArea.querySelectorAll('.option-button').forEach(button => {
                if (button.textContent === exercise.correctAnswer) {
                    button.classList.add('correct');
                }
            });
        }

        if (exercise.hint) {
            const hintElement = document.createElement('p');
            hintElement.textContent = exercise.hint;
            feedbackMessage.appendChild(hintElement);
        }

        exerciseArea.appendChild(feedbackMessage);
        updateStudentProgress(isCorrect);

        exerciseArea.querySelectorAll('.option-button').forEach(button => {
            button.disabled = true;
        });
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
