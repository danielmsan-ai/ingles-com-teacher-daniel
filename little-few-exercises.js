document.addEventListener('DOMContentLoaded', () => {
    const loggedInUser = JSON.parse(localStorage.getItem('loggedInUser'));

    if (!loggedInUser || loggedInUser.type !== 'student') {
        alert('Acesso não autorizado. Por favor, faça login como aluno.');
        window.location.href = 'index.html';
        return;
    }

    const TOPIC_NAME = 'Little and Few';
    const exerciseArea = document.getElementById('exercise-area');
    const prevButton = document.getElementById('prev-exercise');
    const nextButton = document.getElementById('next-exercise');

    let currentExerciseIndex = 0;

    const exercises = [
        { id: 1, type: 'mc', question: "I have ___ books to read this week.", options: ["a few", "a little", "little"], correctAnswer: "a few", hint: "'Books' é contável e está no plural. Use 'a few'." },
        { id: 2, type: 'mc', question: "There is ___ milk left in the fridge.", options: ["a few", "a little", "few"], correctAnswer: "a little", hint: "'Milk' é incontável. Use 'a little' para indicar um pouco." },
        { id: 3, type: 'mc', question: "We have ___ chairs for the guests.", options: ["a few", "a little", "little"], correctAnswer: "a few", hint: "'Chairs' é contável e está no plural. Use 'a few'." },
        { id: 4, type: 'mc', question: "She needs ___ water before the walk.", options: ["a few", "a little", "few"], correctAnswer: "a little", hint: "'Water' é incontável. Use 'a little'." },
        { id: 5, type: 'mc', question: "There are ___ eggs in the basket.", options: ["a few", "a little", "little"], correctAnswer: "a few", hint: "'Eggs' é contável e está no plural. Use 'a few'." },
        { id: 6, type: 'mc', question: "He has ___ free time this afternoon.", options: ["a few", "a little", "few"], correctAnswer: "a little", hint: "'Free time' é incontável. Use 'a little'." },
        { id: 7, type: 'mc', question: "I made ___ mistakes in the exercise.", options: ["a few", "a little", "little"], correctAnswer: "a few", hint: "'Mistakes' é contável e está no plural. Use 'a few'." },
        { id: 8, type: 'mc', question: "Can I have ___ sugar in my tea?", options: ["a few", "a little", "few"], correctAnswer: "a little", hint: "'Sugar' é incontável. Use 'a little'." },
        { id: 9, type: 'mc', question: "They invited ___ friends to dinner.", options: ["a few", "a little", "little"], correctAnswer: "a few", hint: "'Friends' é contável e está no plural. Use 'a few'." },
        { id: 10, type: 'mc', question: "We need ___ information about the course.", options: ["a few", "a little", "few"], correctAnswer: "a little", hint: "'Information' é incontável. Use 'a little'." },

        { id: 11, type: 'mc', question: "There are ___ cookies on the plate.", options: ["few", "little", "a little"], correctAnswer: "few", hint: "'Cookies' é contável e está no plural. Use 'few'." },
        { id: 12, type: 'mc', question: "We have ___ time to catch the bus.", options: ["few", "little", "a few"], correctAnswer: "little", hint: "'Time' é incontável. Use 'little'." },
        { id: 13, type: 'mc', question: "Few students ___ the answer.", options: ["knows", "know", "knowing"], correctAnswer: "know", hint: "'Students' é plural; o verbo também fica no plural: 'know'." },
        { id: 14, type: 'mc', question: "There is little ___ in the bottle.", options: ["apples", "juice", "chairs"], correctAnswer: "juice", hint: "'Little' acompanha substantivos incontáveis." },
        { id: 15, type: 'mc', question: "Few ___ were open after midnight.", options: ["shops", "water", "money"], correctAnswer: "shops", hint: "'Few' acompanha substantivos contáveis no plural." },
        { id: 16, type: 'mc', question: "There is little ___ in the room, so we can hear each other.", options: ["noise", "people", "cars"], correctAnswer: "noise", hint: "'Noise' é incontável e combina com 'little'." },
        { id: 17, type: 'mc', question: "Few ___ understand this difficult question.", options: ["person", "people", "milk"], correctAnswer: "people", hint: "'Few' acompanha substantivos contáveis no plural." },
        { id: 18, type: 'mc', question: "We have little ___ left for the trip.", options: ["suitcases", "money", "tickets"], correctAnswer: "money", hint: "'Money' é incontável e combina com 'little'." },
        { id: 19, type: 'mc', question: "Few ___ arrived on time.", options: ["guest", "guests", "furniture"], correctAnswer: "guests", hint: "Use 'few' com um substantivo contável no plural." },
        { id: 20, type: 'mc', question: "There is little ___ in this town at night.", options: ["traffic", "cars", "buses"], correctAnswer: "traffic", hint: "'Traffic' é incontável e combina com 'little'." },

        { id: 21, type: 'mc', question: "I have ___ questions about the homework, so I can start now.", options: ["a few", "a little", "little"], correctAnswer: "a few", hint: "'Questions' é contável e plural. 'A few' significa algumas." },
        { id: 22, type: 'mc', question: "She speaks ___ Spanish, so she can order food.", options: ["a few", "a little", "few"], correctAnswer: "a little", hint: "'Spanish' (o idioma) é incontável. 'A little' significa um pouco." },
        { id: 23, type: 'mc', question: "We have ___ oranges, enough to make some juice.", options: ["a few", "a little", "little"], correctAnswer: "a few", hint: "'Oranges' é contável e plural. Use 'a few'." },
        { id: 24, type: 'mc', question: "There is ___ coffee in the pot, enough for one cup.", options: ["a few", "a little", "few"], correctAnswer: "a little", hint: "'Coffee' é incontável. Use 'a little'." },
        { id: 25, type: 'mc', question: "I have ___ close friends I can always rely on.", options: ["a few", "a little", "little"], correctAnswer: "a few", hint: "'Friends' é contável e plural. Use 'a few'." },
        { id: 26, type: 'mc', question: "We have ___ bread, enough to make a sandwich.", options: ["a few", "a little", "few"], correctAnswer: "a little", hint: "'Bread' é incontável. Use 'a little'." },
        { id: 27, type: 'mc', question: "Few ___ like getting up very early.", options: ["child", "children", "homework"], correctAnswer: "children", hint: "'Few' acompanha substantivos contáveis no plural. O plural de 'child' é 'children'." },
        { id: 28, type: 'mc', question: "There is little ___ in the classroom today.", options: ["students", "noise", "desks"], correctAnswer: "noise", hint: "'Noise' é incontável e combina com 'little'." },
        { id: 29, type: 'mc', question: "A few ___ are waiting outside.", options: ["person", "people", "information"], correctAnswer: "people", hint: "'A few' acompanha substantivos contáveis no plural." },
        { id: 30, type: 'mc', question: "I need a little ___ to finish this project.", options: ["days", "hours", "help"], correctAnswer: "help", hint: "'Help' é incontável. Use 'a little'." }
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
                checkAnswer(option, exercise.correctAnswer, button);
            });

            optionsContainer.appendChild(button);
        });

        exerciseArea.appendChild(optionsContainer);
        updateNavigationButtons();
    }

    function checkAnswer(userAnswer, correctAnswer, selectedButton) {
        if (exerciseArea.querySelector('.feedback-message')) {
            return;
        }

        const isCorrect = userAnswer.trim().toLowerCase() === correctAnswer.trim().toLowerCase();
        const feedbackMessage = document.createElement('p');
        feedbackMessage.classList.add('feedback-message');

        if (isCorrect) {
            feedbackMessage.textContent = 'Correct!';
            feedbackMessage.classList.add('correct');
            selectedButton.classList.add('correct');
        } else {
            feedbackMessage.textContent = `Incorrect. The correct answer is: "${correctAnswer}".`;
            feedbackMessage.classList.add('incorrect');
            selectedButton.classList.add('incorrect');

            exerciseArea.querySelectorAll('.option-button').forEach(button => {
                if (button.textContent === correctAnswer) {
                    button.classList.add('correct');
                }
            });
        }

        if (exercises[currentExerciseIndex].hint) {
            const hintElement = document.createElement('p');
            hintElement.textContent = exercises[currentExerciseIndex].hint;
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
