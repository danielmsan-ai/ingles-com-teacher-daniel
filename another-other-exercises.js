document.addEventListener('DOMContentLoaded', () => {
    const loggedInUser = JSON.parse(localStorage.getItem('loggedInUser'));

    if (!loggedInUser || loggedInUser.type !== 'student') {
        alert('Acesso não autorizado. Por favor, faça login como aluno.');
        window.location.href = 'index.html';
        return;
    }

    const TOPIC_NAME = 'Another and Other';
    const exerciseArea = document.getElementById('exercise-area');
    const prevButton = document.getElementById('prev-exercise');
    const nextButton = document.getElementById('next-exercise');

    let currentExerciseIndex = 0;

    const exercises = [
        { id: 1, question: "Would you like ___ cup of tea?", options: ["another", "other", "others"], correctAnswer: "another", hint: "'Another' significa 'mais um/uma' e acompanha um substantivo contável singular." },
        { id: 2, question: "I have two sisters. One lives in Brazil, and ___ lives in Canada.", options: ["another", "the other", "others"], correctAnswer: "the other", hint: "Para falar da segunda pessoa de um grupo de duas, usamos 'the other'." },
        { id: 3, question: "Some students like working alone; ___ prefer working in groups.", options: ["another", "other", "others"], correctAnswer: "others", hint: "'Others' significa 'outros' e é usado sem um substantivo logo depois." },
        { id: 4, question: "Do you have any ___ questions?", options: ["another", "other", "others"], correctAnswer: "other", hint: "'Other' vem antes de um substantivo plural: 'questions'." },
        { id: 5, question: "This apple is bruised. Can I have ___ one?", options: ["another", "other", "others"], correctAnswer: "another", hint: "'Another' vem antes de um substantivo contável singular: 'one'." },
        { id: 6, question: "Some people arrived early, but ___ arrived later.", options: ["another", "the others", "other"], correctAnswer: "the others", hint: "'The others' se refere ao restante de um grupo específico." },
        { id: 7, question: "We need ___ information before making a decision.", options: ["another", "other", "others"], correctAnswer: "other", hint: "'Other' pode vir antes de um substantivo incontável, como 'information'." },
        { id: 8, question: "I don't like this shirt. Show me ___ one.", options: ["another", "other", "others"], correctAnswer: "another", hint: "'Another' significa 'uma outra' e acompanha o singular 'one'." },
        { id: 9, question: "Some of the books are new; ___ are quite old.", options: ["another", "the others", "other"], correctAnswer: "the others", hint: "'The others' indica os demais elementos de um grupo específico." },
        { id: 10, question: "There are many ___ ways to solve this problem.", options: ["another", "other", "others"], correctAnswer: "other", hint: "'Other' vem antes de um substantivo plural: 'ways'." },

        { id: 11, question: "Could I have ___ minute to finish this?", options: ["another", "other", "others"], correctAnswer: "another", hint: "'Another' significa 'mais um' e acompanha o singular 'minute'." },
        { id: 12, question: "Some children were playing outside; ___ were reading indoors.", options: ["another", "other", "others"], correctAnswer: "others", hint: "'Others' substitui um substantivo plural já mencionado." },
        { id: 13, question: "We visited three cities. One was Paris, and ___ was Rome.", options: ["another", "the other", "others"], correctAnswer: "another", hint: "Quando falamos de uma cidade diferente entre várias, podemos usar 'another'." },
        { id: 14, question: "The first test was easy, but ___ tests were more difficult.", options: ["another", "other", "others"], correctAnswer: "other", hint: "'Other' vem antes do substantivo plural 'tests'." },
        { id: 15, question: "I finished my sandwich and ordered ___ one.", options: ["another", "other", "others"], correctAnswer: "another", hint: "'Another' indica mais um item singular." },
        { id: 16, question: "Two doors were open. One was locked, and ___ was closed.", options: ["another", "the other", "others"], correctAnswer: "the other", hint: "'The other' é usado para o segundo elemento de um grupo de dois." },
        { id: 17, question: "Some employees work remotely; ___ work in the office.", options: ["another", "other", "others"], correctAnswer: "others", hint: "'Others' é usado sozinho, sem substantivo depois." },
        { id: 18, question: "We need ___ chairs for the guests.", options: ["another", "other", "others"], correctAnswer: "other", hint: "'Other' vem antes de um substantivo plural: 'chairs'." },
        { id: 19, question: "This exercise is too hard. Let's try ___ one.", options: ["another", "other", "others"], correctAnswer: "another", hint: "'Another' acompanha o substantivo singular 'one'." },
        { id: 20, question: "Some of my friends like soccer; ___ prefer basketball.", options: ["another", "the others", "other"], correctAnswer: "the others", hint: "'The others' pode indicar os outros membros de um grupo conhecido." },

        { id: 21, question: "Would you like ___ piece of cake?", options: ["another", "other", "others"], correctAnswer: "another", hint: "'Another' significa 'mais um/uma' antes de um substantivo singular." },
        { id: 22, question: "Do you have any ___ plans for the weekend?", options: ["another", "other", "others"], correctAnswer: "other", hint: "'Other' vem antes do substantivo plural 'plans'." },
        { id: 23, question: "Some guests left early, while ___ stayed until midnight.", options: ["another", "others", "other"], correctAnswer: "others", hint: "'Others' significa 'outros' e não vem diretamente antes de um substantivo." },
        { id: 24, question: "I have one more question. Can I ask ___?", options: ["another", "other", "others"], correctAnswer: "another", hint: "'Another' pode ser usado antes de 'one' para indicar mais um." },
        { id: 25, question: "This road is closed. We should take ___ route.", options: ["another", "other", "others"], correctAnswer: "another", hint: "'Another' acompanha o substantivo contável singular 'route'." },
        { id: 26, question: "Some of the cookies are chocolate; ___ are vanilla.", options: ["another", "the others", "other"], correctAnswer: "the others", hint: "'The others' se refere ao restante dos biscoitos do grupo." },
        { id: 27, question: "She has visited many ___ countries.", options: ["another", "other", "others"], correctAnswer: "other", hint: "'Other' vem antes do substantivo plural 'countries'." },
        { id: 28, question: "One of these bags is mine; ___ belongs to my brother.", options: ["another", "the other", "others"], correctAnswer: "the other", hint: "Para o segundo item de um grupo de dois, usamos 'the other'." },
        { id: 29, question: "Some students chose the blue pen; ___ chose the black one.", options: ["another", "others", "other"], correctAnswer: "others", hint: "'Others' substitui 'other students' e aparece sem substantivo depois." },
        { id: 30, question: "We stayed for ___ two days.", options: ["another", "other", "others"], correctAnswer: "another", hint: "'Another' também pode ser usado antes de número + substantivo plural: 'another two days'." }
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
