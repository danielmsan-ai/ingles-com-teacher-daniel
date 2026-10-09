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
        // Bloco 1: usos básicos
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
        { id: 30, question: "We stayed for ___ two days.", options: ["another", "other", "others"], correctAnswer: "another", hint: "'Another' também pode ser usado antes de número + substantivo plural: 'another two days'." },

        // Bloco 2: contraste entre as formas
        { id: 31, question: "I don't want this notebook. Do you have ___?", options: ["another", "other", "others"], correctAnswer: "another", hint: "'Another' pode aparecer sozinho quando o substantivo singular já está claro pelo contexto." },
        { id: 32, question: "Some of the guests are from Brazil; ___ are from Argentina.", options: ["another", "the others", "other"], correctAnswer: "the others", hint: "'The others' se refere ao restante de um grupo específico de convidados." },
        { id: 33, question: "We need ___ chairs because more people are coming.", options: ["another", "other", "others"], correctAnswer: "other", hint: "'Other' vem antes do substantivo plural 'chairs'." },
        { id: 34, question: "Would you like ___ cookie, or are you full?", options: ["another", "other", "others"], correctAnswer: "another", hint: "'Another' significa 'mais um' e acompanha o substantivo singular 'cookie'." },
        { id: 35, question: "Some people prefer tea; ___ prefer coffee.", options: ["another", "others", "other"], correctAnswer: "others", hint: "'Others' significa 'outras pessoas' e não é seguido por substantivo." },
        { id: 36, question: "One of my shoes is under the bed; ___ is by the door.", options: ["another", "the other", "others"], correctAnswer: "the other", hint: "Para o segundo item de um par, usamos 'the other'." },
        { id: 37, question: "Do you have ___ suggestions for improving the project?", options: ["another", "other", "others"], correctAnswer: "other", hint: "'Other' vem antes do substantivo plural 'suggestions'." },
        { id: 38, question: "The first restaurant was closed, so we went to ___ nearby.", options: ["another", "other", "others"], correctAnswer: "another", hint: "'Another' acompanha um substantivo contável singular, aqui implícito: restaurant." },
        { id: 39, question: "Some of these boxes are empty; ___ contain books.", options: ["another", "the others", "other"], correctAnswer: "the others", hint: "'The others' aponta para as caixas restantes de um grupo específico." },
        { id: 40, question: "We have ___ work to do before the presentation.", options: ["another", "other", "others"], correctAnswer: "other", hint: "'Other' pode vir antes do substantivo incontável 'work'." },
        { id: 41, question: "This chair is uncomfortable. Could I sit on ___?", options: ["another", "other", "others"], correctAnswer: "another", hint: "'Another' pode ser usado sozinho para indicar outra cadeira." },
        { id: 42, question: "Some students finished the test early; ___ needed more time.", options: ["another", "others", "other"], correctAnswer: "others", hint: "'Others' substitui 'other students'." },
        { id: 43, question: "I have two jackets. One is black, and ___ is brown.", options: ["another", "the other", "others"], correctAnswer: "the other", hint: "'The other' indica o segundo elemento de um conjunto de dois." },
        { id: 44, question: "He has lived in many ___ cities.", options: ["another", "other", "others"], correctAnswer: "other", hint: "'Other' vem antes do substantivo plural 'cities'." },
        { id: 45, question: "Could we meet on ___ day? I am busy tomorrow.", options: ["another", "other", "others"], correctAnswer: "another", hint: "'Another' acompanha o substantivo singular 'day'." },
        { id: 46, question: "Some birds migrate in winter; ___ stay here all year.", options: ["another", "others", "other"], correctAnswer: "others", hint: "'Others' é usado sem um substantivo depois." },
        { id: 47, question: "Are there any ___ sizes available?", options: ["another", "other", "others"], correctAnswer: "other", hint: "'Other' vem antes do substantivo plural 'sizes'." },
        { id: 48, question: "There are two keys on the table. One is mine; ___ is yours.", options: ["another", "the other", "others"], correctAnswer: "the other", hint: "'The other' identifica o segundo item de um grupo de dois." },
        { id: 49, question: "She ordered ___ glass of water.", options: ["another", "other", "others"], correctAnswer: "another", hint: "'Another' significa 'mais um' antes do substantivo singular 'glass'." },
        { id: 50, question: "Some of the paintings are original; ___ are copies.", options: ["another", "the others", "other"], correctAnswer: "the others", hint: "'The others' se refere ao restante de um grupo definido de pinturas." },
        { id: 51, question: "We should consider ___ options before deciding.", options: ["another", "other", "others"], correctAnswer: "other", hint: "'Other' vem antes do substantivo plural 'options'." },
        { id: 52, question: "This answer is incorrect. Please try ___ time.", options: ["another", "other", "others"], correctAnswer: "another", hint: "'Another time' significa 'mais uma vez' neste contexto." },
        { id: 53, question: "Some of my neighbors have dogs; ___ have cats.", options: ["another", "others", "other"], correctAnswer: "others", hint: "'Others' substitui 'other neighbors'." },
        { id: 54, question: "One of the twins is very quiet, but ___ is quite talkative.", options: ["another", "the other", "others"], correctAnswer: "the other", hint: "Há dois gêmeos; 'the other' indica o segundo." },
        { id: 55, question: "There is no more coffee. Would you like ___ drink?", options: ["another", "other", "others"], correctAnswer: "another", hint: "'Another' acompanha o substantivo contável singular 'drink'." },
        { id: 56, question: "Some employees work on Mondays; ___ work on Tuesdays.", options: ["another", "others", "other"], correctAnswer: "others", hint: "'Others' aparece sem substantivo depois e significa 'outros funcionários'." },
        { id: 57, question: "Please bring ___ documents you have about the application.", options: ["another", "other", "others"], correctAnswer: "other", hint: "'Other' vem antes do substantivo plural 'documents'." },
        { id: 58, question: "I have one more idea. Let me suggest ___ possibility.", options: ["another", "other", "others"], correctAnswer: "another", hint: "'Another' acompanha o substantivo singular 'possibility'." },
        { id: 59, question: "Of the five applicants, one was hired and ___ were rejected.", options: ["another", "the others", "other"], correctAnswer: "the others", hint: "'The others' indica os candidatos restantes de um grupo específico." },
        { id: 60, question: "Some children wanted to play outside; ___ wanted to stay indoors.", options: ["another", "others", "other"], correctAnswer: "others", hint: "'Others' substitui 'other children' e não vem antes de um substantivo." },

        // Bloco 3: uso misto em diferentes contextos
        { id: 61, question: "I have finished this book. Could you recommend ___ one?", options: ["another", "other", "others"], correctAnswer: "another", hint: "'Another' acompanha o substantivo contável singular 'one'." },
        { id: 62, question: "Some of the workers took the morning shift; ___ took the afternoon shift.", options: ["another", "the others", "other"], correctAnswer: "the others", hint: "'The others' se refere ao restante dos trabalhadores do grupo." },
        { id: 63, question: "We need ___ equipment for the camping trip.", options: ["another", "other", "others"], correctAnswer: "other", hint: "'Equipment' é incontável; use 'other' antes dele." },
        { id: 64, question: "One of these gloves is wet, but ___ is dry.", options: ["another", "the other", "others"], correctAnswer: "the other", hint: "Estamos falando de um par: 'the other' indica a segunda luva." },
        { id: 65, question: "Some people enjoy spicy food; ___ prefer mild dishes.", options: ["another", "others", "other"], correctAnswer: "others", hint: "'Others' substitui 'other people' e aparece sem substantivo depois." },
        { id: 66, question: "Could you give me ___ example of this grammar rule?", options: ["another", "other", "others"], correctAnswer: "another", hint: "'Another' acompanha o substantivo singular 'example'." },
        { id: 67, question: "The shop sells shoes, bags, and many ___ accessories.", options: ["another", "other", "others"], correctAnswer: "other", hint: "'Other' vem antes do substantivo plural 'accessories'." },
        { id: 68, question: "There are four rooms. One is a kitchen, and ___ are bedrooms.", options: ["another", "the others", "other"], correctAnswer: "the others", hint: "'The others' indica todas as salas restantes de um grupo definido." },
        { id: 69, question: "This bus is full. We will catch ___ one.", options: ["another", "other", "others"], correctAnswer: "another", hint: "'Another' acompanha o substantivo singular 'one'." },
        { id: 70, question: "Some of the students chose to present first; ___ volunteered to go last.", options: ["another", "others", "other"], correctAnswer: "others", hint: "'Others' substitui 'other students'." },
        { id: 71, question: "Do you have any ___ luggage to check in?", options: ["another", "other", "others"], correctAnswer: "other", hint: "'Luggage' é incontável; use 'other' antes dele." },
        { id: 72, question: "One of the two windows is open; ___ is closed.", options: ["another", "the other", "others"], correctAnswer: "the other", hint: "'The other' indica o segundo elemento de um par." },
        { id: 73, question: "I would like ___ slice of bread, please.", options: ["another", "other", "others"], correctAnswer: "another", hint: "'Another' significa 'mais uma' antes do substantivo singular 'slice'." },
        { id: 74, question: "Some flowers need direct sunlight; ___ grow well in the shade.", options: ["another", "others", "other"], correctAnswer: "others", hint: "'Others' substitui 'other flowers'." },
        { id: 75, question: "We visited several museums and galleries in ___ European cities.", options: ["another", "other", "others"], correctAnswer: "other", hint: "'Other' vem antes do substantivo plural 'cities'." },
        { id: 76, question: "She tried one key, then ___, but neither opened the door.", options: ["another", "other", "others"], correctAnswer: "another", hint: "'Another' significa 'mais uma' chave, diferente da primeira." },
        { id: 77, question: "Of the six players, one was injured and ___ continued the game.", options: ["another", "the others", "other"], correctAnswer: "the others", hint: "'The others' se refere aos jogadores restantes do grupo." },
        { id: 78, question: "We have ___ time before the train arrives, so let's buy a snack.", options: ["another", "other", "others"], correctAnswer: "other", hint: "'Other' pode vir antes do substantivo incontável 'time'." },
        { id: 79, question: "I don't like this color. Can you show me ___?", options: ["another", "other", "others"], correctAnswer: "another", hint: "'Another' pode ser usado sozinho quando o substantivo singular está claro pelo contexto." },
        { id: 80, question: "Some of the guests are staying at the hotel; ___ are staying with friends.", options: ["another", "others", "other"], correctAnswer: "others", hint: "'Others' substitui 'other guests'." },
        { id: 81, question: "Please send the report to ___ department as well.", options: ["another", "other", "others"], correctAnswer: "another", hint: "'Another' acompanha o substantivo contável singular 'department'." },
        { id: 82, question: "One of the two paintings is a landscape; ___ is a portrait.", options: ["another", "the other", "others"], correctAnswer: "the other", hint: "Para o segundo item de um grupo de dois, usamos 'the other'." },
        { id: 83, question: "The library has many books on history and ___ subjects.", options: ["another", "other", "others"], correctAnswer: "other", hint: "'Other' vem antes do substantivo plural 'subjects'." },
        { id: 84, question: "Some of the apples are green; ___ are red.", options: ["another", "the others", "other"], correctAnswer: "the others", hint: "'The others' indica as maçãs restantes do grupo específico." },
        { id: 85, question: "We need ___ day to finish painting the house.", options: ["another", "other", "others"], correctAnswer: "another", hint: "'Another' acompanha o substantivo singular 'day'." },
        { id: 86, question: "Some restaurants close early; ___ stay open until midnight.", options: ["another", "others", "other"], correctAnswer: "others", hint: "'Others' substitui 'other restaurants'." },
        { id: 87, question: "Are there any ___ details you would like to add?", options: ["another", "other", "others"], correctAnswer: "other", hint: "'Other' vem antes do substantivo plural 'details'." },
        { id: 88, question: "I have two tickets. One is for me, and ___ is for you.", options: ["another", "the other", "others"], correctAnswer: "the other", hint: "'The other' indica o segundo item de um conjunto de dois." },
        { id: 89, question: "Would you like ___ cup of coffee before you leave?", options: ["another", "other", "others"], correctAnswer: "another", hint: "'Another' significa 'mais uma' antes do substantivo singular 'cup'." },
        { id: 90, question: "Some people learn by reading; ___ learn by listening.", options: ["another", "others", "other"], correctAnswer: "others", hint: "'Others' substitui 'other people' e não vem seguido de substantivo." }
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

        const isCorrect = userAnswer.trim().toLowerCase() === exercise.correctAnswer.trim().toLowerCase();
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
