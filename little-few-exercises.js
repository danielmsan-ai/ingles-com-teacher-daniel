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
        // Bloco 1: uso básico de few, a few, little e a little
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
        { id: 13, type: 'mc', question: "Few students ___ the answer.", options: ["knows", "know", "knowing"], correctAnswer: "know", hint: "'Students' está no plural; use o verbo 'know'." },
        { id: 14, type: 'mc', question: "There is little ___ in the bottle.", options: ["apples", "juice", "chairs"], correctAnswer: "juice", hint: "'Little' acompanha substantivos incontáveis." },
        { id: 15, type: 'mc', question: "Few ___ were open after midnight.", options: ["shops", "water", "money"], correctAnswer: "shops", hint: "'Few' acompanha substantivos contáveis no plural." },
        { id: 16, type: 'mc', question: "There is little ___ in the room, so we can hear each other.", options: ["noise", "people", "cars"], correctAnswer: "noise", hint: "'Noise' é incontável e combina com 'little'." },
        { id: 17, type: 'mc', question: "Few ___ understand this difficult question.", options: ["person", "people", "milk"], correctAnswer: "people", hint: "'Few' acompanha substantivos contáveis no plural." },
        { id: 18, type: 'mc', question: "We have little ___ left for the trip.", options: ["suitcases", "money", "tickets"], correctAnswer: "money", hint: "'Money' é incontável e combina com 'little'." },
        { id: 19, type: 'mc', question: "Few ___ arrived on time.", options: ["guest", "guests", "furniture"], correctAnswer: "guests", hint: "Use 'few' com um substantivo contável no plural." },
        { id: 20, type: 'mc', question: "There is little ___ in this town at night.", options: ["traffic", "cars", "buses"], correctAnswer: "traffic", hint: "'Traffic' é incontável e combina com 'little'." },
        { id: 21, type: 'mc', question: "I have ___ questions about the homework, so I can start now.", options: ["a few", "a little", "little"], correctAnswer: "a few", hint: "'Questions' é contável e plural. 'A few' significa algumas." },
        { id: 22, type: 'mc', question: "She speaks ___ Spanish, so she can order food.", options: ["a few", "a little", "few"], correctAnswer: "a little", hint: "'Spanish', referindo-se ao idioma, é incontável. Use 'a little'." },
        { id: 23, type: 'mc', question: "We have ___ oranges, enough to make some juice.", options: ["a few", "a little", "little"], correctAnswer: "a few", hint: "'Oranges' é contável e plural. Use 'a few'." },
        { id: 24, type: 'mc', question: "There is ___ coffee in the pot, enough for one cup.", options: ["a few", "a little", "few"], correctAnswer: "a little", hint: "'Coffee' é incontável. Use 'a little'." },
        { id: 25, type: 'mc', question: "I have ___ close friends I can always rely on.", options: ["a few", "a little", "little"], correctAnswer: "a few", hint: "'Friends' é contável e plural. Use 'a few'." },
        { id: 26, type: 'mc', question: "We have ___ bread, enough to make a sandwich.", options: ["a few", "a little", "few"], correctAnswer: "a little", hint: "'Bread' é incontável. Use 'a little'." },
        { id: 27, type: 'mc', question: "Few ___ like getting up very early.", options: ["child", "children", "homework"], correctAnswer: "children", hint: "'Few' acompanha substantivos contáveis no plural. O plural de 'child' é 'children'." },
        { id: 28, type: 'mc', question: "There is little ___ in the classroom today.", options: ["students", "noise", "desks"], correctAnswer: "noise", hint: "'Noise' é incontável e combina com 'little'." },
        { id: 29, type: 'mc', question: "A few ___ are waiting outside.", options: ["person", "people", "information"], correctAnswer: "people", hint: "'A few' acompanha substantivos contáveis no plural." },
        { id: 30, type: 'mc', question: "I need a little ___ to finish this project.", options: ["days", "hours", "help"], correctAnswer: "help", hint: "'Help' é incontável. Use 'a little'." },

        // Bloco 2: diferença de sentido entre few/a few e little/a little
        { id: 31, type: 'mc', question: "Only ___ students came to class, so the teacher was disappointed.", options: ["a few", "a little", "few"], correctAnswer: "few", hint: "'Few' enfatiza que quase nenhum estudante veio." },
        { id: 32, type: 'mc', question: "I have ___ money, so I can buy a snack.", options: ["little", "a little", "a few"], correctAnswer: "a little", hint: "'A little' indica que há algum dinheiro, suficiente neste contexto." },
        { id: 33, type: 'mc', question: "There is ___ hope of finding the lost keys; we should keep looking.", options: ["little", "a little", "a few"], correctAnswer: "a little", hint: "'A little' indica que ainda existe alguma esperança." },
        { id: 34, type: 'mc', question: "Very ___ people knew about the surprise party, so it remained a secret.", options: ["few", "a few", "little"], correctAnswer: "few", hint: "'Very few' significa pouquíssimas pessoas." },
        { id: 35, type: 'mc', question: "We have ___ time before the movie starts, so let's get a drink.", options: ["a little", "little", "a few"], correctAnswer: "a little", hint: "'A little' indica que há algum tempo disponível." },
        { id: 36, type: 'mc', question: "There is ___ food left, so we need to go shopping immediately.", options: ["a little", "little", "a few"], correctAnswer: "little", hint: "'Little' enfatiza que quase não há comida." },
        { id: 37, type: 'mc', question: "I made ___ good friends at my new school, and I am happy.", options: ["a few", "few", "a little"], correctAnswer: "a few", hint: "'A few' significa alguns, com sentido positivo neste contexto." },
        { id: 38, type: 'mc', question: "She has ___ patience with rude customers; she gets angry quickly.", options: ["a little", "little", "a few"], correctAnswer: "little", hint: "'Little patience' indica pouca paciência." },
        { id: 39, type: 'mc', question: "We have ___ chairs available, so everyone can sit down.", options: ["a few", "few", "a little"], correctAnswer: "a few", hint: "'A few' indica que há algumas cadeiras disponíveis." },
        { id: 40, type: 'mc', question: "Few ___ were interested in the long lecture.", options: ["people", "person", "water"], correctAnswer: "people", hint: "'Few' acompanha um substantivo contável no plural." },
        { id: 41, type: 'mc', question: "There is ___ milk left, but enough for your coffee.", options: ["a little", "little", "a few"], correctAnswer: "a little", hint: "'A little' indica que ainda há uma pequena quantidade." },
        { id: 42, type: 'mc', question: "There is ___ chance that the shop is still open; it usually closes at six.", options: ["little", "a little", "a few"], correctAnswer: "little", hint: "'Little chance' enfatiza que a possibilidade é muito pequena." },
        { id: 43, type: 'mc', question: "We invited ___ neighbors, and they all came to dinner.", options: ["a few", "few", "a little"], correctAnswer: "a few", hint: "'A few' significa alguns vizinhos." },
        { id: 44, type: 'mc', question: "Few ___ can finish this puzzle in under a minute.", options: ["child", "children", "furniture"], correctAnswer: "children", hint: "'Few' acompanha substantivos contáveis no plural; 'children' é plural." },
        { id: 45, type: 'mc', question: "I know ___ French, enough to introduce myself.", options: ["a little", "little", "a few"], correctAnswer: "a little", hint: "'A little' indica que sei um pouco de francês." },
        { id: 46, type: 'mc', question: "The town has ___ buses at night, so getting home is difficult.", options: ["few", "a few", "a little"], correctAnswer: "few", hint: "'Few buses' enfatiza que quase não há ônibus." },
        { id: 47, type: 'mc', question: "Add ___ salt to the soup; it tastes bland.", options: ["a little", "a few", "few"], correctAnswer: "a little", hint: "'Salt' é incontável. Use 'a little' para indicar uma pequena quantidade." },
        { id: 48, type: 'mc', question: "There was ___ traffic, so we arrived much earlier than expected.", options: ["little", "a little", "a few"], correctAnswer: "little", hint: "'Little traffic' indica que havia pouco trânsito." },
        { id: 49, type: 'mc', question: "I have ___ ideas for the project, and we can discuss them now.", options: ["a few", "few", "a little"], correctAnswer: "a few", hint: "'A few' indica que há algumas ideias disponíveis." },
        { id: 50, type: 'mc', question: "He has ___ experience, so he isn't ready to lead the team.", options: ["little", "a little", "a few"], correctAnswer: "little", hint: "'Little experience' enfatiza a falta de experiência." },
        { id: 51, type: 'mc', question: "We have ___ minutes before the train leaves, so we should hurry.", options: ["a few", "few", "a little"], correctAnswer: "few", hint: "'Few minutes' enfatiza que quase não há tempo." },
        { id: 52, type: 'mc', question: "She put ___ honey in her tea, just enough to make it sweeter.", options: ["a little", "a few", "few"], correctAnswer: "a little", hint: "'Honey' é incontável. Use 'a little'." },
        { id: 53, type: 'mc', question: "Few ___ applied for the position because it required moving abroad.", options: ["applicant", "applicants", "advice"], correctAnswer: "applicants", hint: "'Few' acompanha substantivos contáveis no plural." },
        { id: 54, type: 'mc', question: "We had ___ difficulty finding the hotel, so we arrived on time.", options: ["little", "a little", "a few"], correctAnswer: "little", hint: "'Little difficulty' indica que tivemos pouca dificuldade." },
        { id: 55, type: 'mc', question: "There are ___ seats left, so you and your friend can sit together.", options: ["a few", "few", "a little"], correctAnswer: "a few", hint: "'A few' indica que ainda há algumas cadeiras." },
        { id: 56, type: 'mc', question: "He has ___ interest in sports, so he rarely watches games.", options: ["little", "a little", "a few"], correctAnswer: "little", hint: "'Little interest' indica pouco interesse." },
        { id: 57, type: 'mc', question: "I found ___ useful websites for my research.", options: ["a few", "a little", "little"], correctAnswer: "a few", hint: "'Websites' é contável e plural. Use 'a few'." },
        { id: 58, type: 'mc', question: "There is ___ oil in the pan, enough to cook the eggs.", options: ["a little", "a few", "few"], correctAnswer: "a little", hint: "'Oil' é incontável. 'A little' indica uma pequena quantidade suficiente." },
        { id: 59, type: 'mc', question: "Few ___ understood the instructions, so the activity had to be explained again.", options: ["student", "students", "homework"], correctAnswer: "students", hint: "'Few' acompanha substantivos contáveis no plural." },
        { id: 60, type: 'mc', question: "We have ___ information about the event, so we cannot make a decision yet.", options: ["little", "a little", "a few"], correctAnswer: "little", hint: "'Little information' enfatiza que quase não temos informação." },

        // Bloco 3: contraste e aplicação em diferentes contextos
        { id: 61, type: 'mc', question: "There are ___ cookies left, so we can share them.", options: ["a few", "a little", "little"], correctAnswer: "a few", hint: "'Cookies' é contável e plural; 'a few' indica que ainda há alguns." },
        { id: 62, type: 'mc', question: "We have ___ fuel left, so we should stop at the next gas station.", options: ["a few", "little", "few"], correctAnswer: "little", hint: "'Fuel' é incontável; 'little' enfatiza que quase não resta." },
        { id: 63, type: 'mc', question: "Could you give me ___ advice about choosing a laptop?", options: ["a few", "a little", "few"], correctAnswer: "a little", hint: "'Advice' é incontável. Use 'a little'." },
        { id: 64, type: 'mc', question: "Only ___ houses in this area have solar panels.", options: ["a little", "few", "little"], correctAnswer: "few", hint: "'Houses' é contável e plural; 'few' significa poucas." },
        { id: 65, type: 'mc', question: "I still have ___ work to do, but I should finish soon.", options: ["a few", "a little", "few"], correctAnswer: "a little", hint: "'Work' é incontável; 'a little' indica que ainda resta algum trabalho." },
        { id: 66, type: 'mc', question: "Very ___ customers complained about the new menu.", options: ["little", "a little", "few"], correctAnswer: "few", hint: "'Customers' é contável e plural. Use 'few'." },
        { id: 67, type: 'mc', question: "There is ___ cheese in the fridge, enough for one sandwich.", options: ["a little", "a few", "few"], correctAnswer: "a little", hint: "'Cheese' é incontável. Use 'a little'." },
        { id: 68, type: 'mc', question: "We received ___ replies to the email, so we need to contact more people.", options: ["little", "few", "a little"], correctAnswer: "few", hint: "'Replies' é contável e plural; 'few' indica que foram poucas." },
        { id: 69, type: 'mc', question: "She has ___ knowledge of the subject, so she can help us.", options: ["a little", "a few", "few"], correctAnswer: "a little", hint: "'Knowledge' é incontável. Use 'a little'." },
        { id: 70, type: 'mc', question: "There are ___ mistakes in your essay. Most of it is excellent.", options: ["a few", "a little", "little"], correctAnswer: "a few", hint: "'Mistakes' é contável e plural; 'a few' indica alguns erros." },
        { id: 71, type: 'mc', question: "We had ___ luggage, so we carried everything easily.", options: ["few", "little", "a few"], correctAnswer: "little", hint: "'Luggage' é incontável. 'Little luggage' indica pouca bagagem." },
        { id: 72, type: 'mc', question: "Few ___ remember the town before the new bridge was built.", options: ["resident", "residents", "furniture"], correctAnswer: "residents", hint: "'Few' acompanha substantivos contáveis no plural." },
        { id: 73, type: 'mc', question: "I have ___ cash with me, but I can pay for the bus.", options: ["a little", "a few", "few"], correctAnswer: "a little", hint: "'Cash' é incontável. 'A little' indica uma pequena quantia disponível." },
        { id: 74, type: 'mc', question: "There are ___ job opportunities in this small village.", options: ["little", "few", "a little"], correctAnswer: "few", hint: "'Opportunities' é contável e plural. Use 'few'." },
        { id: 75, type: 'mc', question: "He added ___ flour to the mixture, just enough to thicken it.", options: ["a few", "a little", "few"], correctAnswer: "a little", hint: "'Flour' é incontável. Use 'a little'." },

        { id: 76, type: 'mc', question: "A few ___ volunteered to help clean the park.", options: ["person", "people", "advice"], correctAnswer: "people", hint: "'A few' acompanha substantivos contáveis no plural." },
        { id: 77, type: 'mc', question: "There is ___ possibility of rain today, so take an umbrella.", options: ["a little", "a few", "few"], correctAnswer: "a little", hint: "'Possibility' é contável, mas aqui aparece no singular; a frase pede 'a little' antes do nome incontável? Revise: use 'a little possibility' não é natural." },
        { id: 78, type: 'mc', question: "We have ___ clean plates, so we need to wash some more.", options: ["few", "little", "a little"], correctAnswer: "few", hint: "'Plates' é contável e plural; 'few' indica que restam poucas." },
        { id: 79, type: 'mc', question: "Could you wait ___ longer? The meeting is almost over.", options: ["a few", "a little", "few"], correctAnswer: "a little", hint: "'Longer' indica duração. Use 'a little' para pedir mais um pouco de tempo." },
        { id: 80, type: 'mc', question: "Few ___ were available for rent near the university.", options: ["apartment", "apartments", "traffic"], correctAnswer: "apartments", hint: "'Few' acompanha substantivos contáveis no plural." },
        { id: 81, type: 'mc', question: "There is ___ evidence to support the claim, so we need to investigate further.", options: ["little", "a few", "few"], correctAnswer: "little", hint: "'Evidence' é incontável; 'little evidence' indica evidência insuficiente." },
        { id: 82, type: 'mc', question: "I invited ___ colleagues over, and we had a pleasant evening.", options: ["a few", "a little", "little"], correctAnswer: "a few", hint: "'Colleagues' é contável e plural. Use 'a few'." },
        { id: 83, type: 'mc', question: "She showed ___ interest in the offer, so we chose another candidate.", options: ["a little", "little", "a few"], correctAnswer: "little", hint: "'Little interest' indica pouco interesse." },
        { id: 84, type: 'mc', question: "We need ___ more minutes to finish setting up the room.", options: ["a little", "a few", "little"], correctAnswer: "a few", hint: "'Minutes' é contável e plural. Use 'a few'." },
        { id: 85, type: 'mc', question: "There is ___ light in the hallway, so please turn on the lamp.", options: ["little", "few", "a few"], correctAnswer: "little", hint: "'Light', no sentido de iluminação, é incontável. Use 'little'." },
        { id: 86, type: 'mc', question: "A few ___ stayed after class to ask questions.", options: ["student", "students", "homework"], correctAnswer: "students", hint: "'A few' acompanha substantivos contáveis no plural." },
        { id: 87, type: 'mc', question: "I drank ___ water during the hike, but I still feel thirsty.", options: ["a few", "little", "few"], correctAnswer: "little", hint: "'Water' é incontável; 'little' indica que bebi pouca água." },
        { id: 88, type: 'mc', question: "We have ___ options to choose from, so let's compare them.", options: ["a few", "a little", "little"], correctAnswer: "a few", hint: "'Options' é contável e plural. Use 'a few'." },
        { id: 89, type: 'mc', question: "There is ___ paint left, enough to touch up the door.", options: ["a few", "a little", "few"], correctAnswer: "a little", hint: "'Paint' é incontável. 'A little' indica uma pequena quantidade suficiente." },
        { id: 90, type: 'mc', question: "Few ___ knew that the museum was free on Sundays.", options: ["tourist", "tourists", "information"], correctAnswer: "tourists", hint: "'Few' acompanha substantivos contáveis no plural." }
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

        const currentExercise = exercises[currentExerciseIndex];
        if (currentExercise.hint) {
            const hintElement = document.createElement('p');
            hintElement.textContent = currentExercise.hint;
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
