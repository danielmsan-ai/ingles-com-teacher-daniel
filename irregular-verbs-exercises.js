document.addEventListener('DOMContentLoaded', () => {
    const loggedInUser = JSON.parse(localStorage.getItem('loggedInUser'));

    if (!loggedInUser || loggedInUser.type !== 'student') {
        alert('Acesso não autorizado. Por favor, faça login como aluno.');
        window.location.href = 'index.html';
        return;
    }

    const TOPIC_NAME = 'Irregular Verbs Memorizer';
    const STORAGE_KEY = `irregularVerbsProgress_${loggedInUser.id}`;

    const exerciseArea = document.getElementById('exercise-area');
    const progressStatus = document.getElementById('progress-status');
    const nextButton = document.getElementById('next-exercise');

    if (!exerciseArea || !progressStatus || !nextButton) {
        console.error('Não foram encontrados os elementos necessários na página do memorizador.');
        return;
    }

    const verbs = [
        { base: 'cost', past: ['cost'], participle: ['cost'], sentence: 'The ticket ___ ten dollars.' },
        { base: 'cut', past: ['cut'], participle: ['cut'], sentence: 'I ___ the paper with scissors.' },
        { base: 'hit', past: ['hit'], participle: ['hit'], sentence: 'The player ___ the ball.' },
        { base: 'hurt', past: ['hurt'], participle: ['hurt'], sentence: 'I ___ my arm while playing.' },
        { base: 'let', past: ['let'], participle: ['let'], sentence: 'My parents ___ me stay up late.' },
        { base: 'put', past: ['put'], participle: ['put'], sentence: 'She ___ the book on the table.' },
        { base: 'read', past: ['read'], participle: ['read'], sentence: 'I ___ a book every week.' },

        { base: 'beat', past: ['beat'], participle: ['beaten'], sentence: 'Our team ___ the other team.' },
        { base: 'bite', past: ['bit'], participle: ['bitten'], sentence: 'The dog ___ the toy.' },
        { base: 'hide', past: ['hid'], participle: ['hidden'], sentence: 'The child ___ behind the door.' },

        { base: 'begin', past: ['began'], participle: ['begun'], sentence: 'The class ___ at nine o’clock.' },
        { base: 'drink', past: ['drank'], participle: ['drunk'], sentence: 'I ___ water every morning.' },
        { base: 'ring', past: ['rang'], participle: ['rung'], sentence: 'The telephone ___ during dinner.' },
        { base: 'run', past: ['ran'], participle: ['run'], sentence: 'She ___ in the park yesterday.' },
        { base: 'sing', past: ['sang'], participle: ['sung'], sentence: 'They ___ their favorite song.' },
        { base: 'swim', past: ['swam'], participle: ['swum'], sentence: 'We ___ in the lake last summer.' },

        { base: 'become', past: ['became'], participle: ['become'], sentence: 'He ___ a doctor last year.' },
        { base: 'come', past: ['came'], participle: ['come'], sentence: 'My friends ___ to my house yesterday.' },

        { base: 'hold', past: ['held'], participle: ['held'], sentence: 'She ___ the baby carefully.' },
        { base: 'send', past: ['sent'], participle: ['sent'], sentence: 'I ___ an email to my teacher.' },
        { base: 'spend', past: ['spent'], participle: ['spent'], sentence: 'They ___ the weekend at home.' },

        { base: 'draw', past: ['drew'], participle: ['drawn'], sentence: 'The student ___ a picture in class.' },
        { base: 'fly', past: ['flew'], participle: ['flown'], sentence: 'We ___ to another city last week.' },
        { base: 'grow', past: ['grew'], participle: ['grown'], sentence: 'The children ___ quickly.' },
        { base: 'know', past: ['knew'], participle: ['known'], sentence: 'I ___ the answer yesterday.' },
        { base: 'throw', past: ['threw'], participle: ['thrown'], sentence: 'He ___ the ball to his friend.' },

        { base: 'break', past: ['broke'], participle: ['broken'], sentence: 'The boy ___ the window by accident.' },
        { base: 'choose', past: ['chose'], participle: ['chosen'], sentence: 'She ___ the blue dress.' },
        { base: 'drive', past: ['drove'], participle: ['driven'], sentence: 'My father ___ to work yesterday.' },
        { base: 'ride', past: ['rode'], participle: ['ridden'], sentence: 'We ___ our bikes in the park.' },
        { base: 'write', past: ['wrote'], participle: ['written'], sentence: 'He ___ a letter to his cousin.' },
        { base: 'wake', past: ['woke'], participle: ['woken'], sentence: 'I ___ early this morning.' },
        { base: 'take', past: ['took'], participle: ['taken'], sentence: 'She ___ the bus to school.' },
        { base: 'steal', past: ['stole'], participle: ['stolen'], sentence: 'Someone ___ my bicycle yesterday.' },
        { base: 'speak', past: ['spoke'], participle: ['spoken'], sentence: 'They ___ English during the lesson.' },

        { base: 'bring', past: ['brought'], participle: ['brought'], sentence: 'He ___ some food to the party.' },
        { base: 'buy', past: ['bought'], participle: ['bought'], sentence: 'I ___ a new notebook yesterday.' },
        { base: 'catch', past: ['caught'], participle: ['caught'], sentence: 'The player ___ the ball.' },
        { base: 'fight', past: ['fought'], participle: ['fought'], sentence: 'The two teams ___ hard.' },
        { base: 'find', past: ['found'], participle: ['found'], sentence: 'She ___ her keys under the sofa.' },
        { base: 'seek', past: ['sought'], participle: ['sought'], sentence: 'They ___ help from their teacher.' },
        { base: 'think', past: ['thought'], participle: ['thought'], sentence: 'I ___ about the question last night.' },
        { base: 'teach', past: ['taught'], participle: ['taught'], sentence: 'Mr. Brown ___ us English last year.' },

        { base: 'deal', past: ['dealt'], participle: ['dealt'], sentence: 'She ___ with the problem yesterday.' },
        { base: 'feel', past: ['felt'], participle: ['felt'], sentence: 'He ___ happy after the game.' },
        { base: 'keep', past: ['kept'], participle: ['kept'], sentence: 'I ___ the photo in my room.' },
        { base: 'leave', past: ['left'], participle: ['left'], sentence: 'They ___ the house at eight.' },
        { base: 'lend', past: ['lent'], participle: ['lent'], sentence: 'My friend ___ me a pencil.' },
        { base: 'mean', past: ['meant'], participle: ['meant'], sentence: 'Her message ___ a lot to me.' },
        { base: 'meet', past: ['met'], participle: ['met'], sentence: 'We ___ our new neighbors yesterday.' },
        { base: 'sleep', past: ['slept'], participle: ['slept'], sentence: 'The baby ___ for three hours.' },

        { base: 'forgive', past: ['forgave'], participle: ['forgiven'], sentence: 'She ___ her friend after the argument.' },
        { base: 'give', past: ['gave'], participle: ['given'], sentence: 'He ___ me a present yesterday.' },

        { base: 'forget', past: ['forgot'], participle: ['forgotten'], sentence: 'I ___ my homework at home.' },
        { base: 'get', past: ['got'], participle: ['got'], sentence: 'She ___ a message this morning.' },
        { base: 'wear', past: ['wore'], participle: ['worn'], sentence: 'He ___ a blue jacket yesterday.' },
        { base: 'swear', past: ['swore'], participle: ['sworn'], sentence: 'The witness ___ to tell the truth.' },

        { base: 'lay', past: ['laid'], participle: ['laid'], sentence: 'She ___ the blanket on the bed.' },
        { base: 'pay', past: ['paid'], participle: ['paid'], sentence: 'We ___ for lunch yesterday.' },
        { base: 'say', past: ['said'], participle: ['said'], sentence: 'He ___ hello to his neighbor.' },

        {
            base: 'be',
            past: ['was', 'were'],
            participle: ['been'],
            sentences: {
                base: 'They ___ happy today.',
                past: 'I ___ at home yesterday.',
                participle: 'I have ___ very busy this week.'
            }
        },
        { base: 'build', past: ['built'], participle: ['built'], sentence: 'They ___ a new house last year.' },

        { base: 'do', past: ['did'], participle: ['done'], sentence: 'I ___ my homework after school.' },
        { base: 'eat', past: ['ate'], participle: ['eaten'], sentence: 'We ___ dinner at seven yesterday.' },
        { base: 'fall', past: ['fell'], participle: ['fallen'], sentence: 'The leaves ___ from the tree.' },
        { base: 'go', past: ['went'], participle: ['gone'], sentence: 'She ___ to the library yesterday.' },
        { base: 'lie', past: ['lay'], participle: ['lain'], sentence: 'The dog ___ on the floor all afternoon.' },
        { base: 'see', past: ['saw'], participle: ['seen'], sentence: 'I ___ a rainbow after the rain.' },

        { base: 'have', past: ['had'], participle: ['had'], sentence: 'We ___ a great time at the party.' },
        { base: 'hear', past: ['heard'], participle: ['heard'], sentence: 'She ___ a strange noise last night.' },
        { base: 'lose', past: ['lost'], participle: ['lost'], sentence: 'He ___ his wallet on the bus.' },
        { base: 'make', past: ['made'], participle: ['made'], sentence: 'My mother ___ a cake yesterday.' },
        { base: 'sell', past: ['sold'], participle: ['sold'], sentence: 'They ___ their old car last month.' },
        { base: 'sit', past: ['sat'], participle: ['sat'], sentence: 'The students ___ near the window.' },
        { base: 'stand', past: ['stood'], participle: ['stood'], sentence: 'We ___ outside the classroom.' },
        { base: 'tell', past: ['told'], participle: ['told'], sentence: 'He ___ us a funny story.' },
        { base: 'understand', past: ['understood'], participle: ['understood'], sentence: 'I ___ the instructions after the lesson.' },
        { base: 'win', past: ['won'], participle: ['won'], sentence: 'Our team ___ the game yesterday.' }
    ];

    const formInfo = {
        base: {
            label: 'Base form — Simple Present',
            tense: 'Simple Present'
        },
        past: {
            label: 'Simple Past',
            tense: 'Simple Past'
        },
        participle: {
            label: 'Past Participle — Present Perfect',
            tense: 'Present Perfect'
        }
    };

    function createInitialProgress() {
        const progress = {};

        verbs.forEach(verb => {
            progress[verb.base] = {
                base: false,
                past: false,
                participle: false
            };
        });

        return progress;
    }

    function loadProgress() {
        try {
            const savedProgress = JSON.parse(localStorage.getItem(STORAGE_KEY));

            if (!savedProgress || typeof savedProgress !== 'object') {
                return createInitialProgress();
            }

            const progress = createInitialProgress();

            verbs.forEach(verb => {
                const savedVerbProgress = savedProgress[verb.base];

                if (savedVerbProgress) {
                    progress[verb.base].base = savedVerbProgress.base === true;
                    progress[verb.base].past = savedVerbProgress.past === true;
                    progress[verb.base].participle = savedVerbProgress.participle === true;
                }
            });

            return progress;
        } catch (error) {
            console.error('Não foi possível carregar o progresso dos verbos:', error);
            return createInitialProgress();
        }
    }

    let progress = loadProgress();
    let currentExercise = null;
    let answerSubmitted = false;

    function saveProgress() {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
    }

    function getActiveForms() {
        const activeForms = [];

        verbs.forEach(verb => {
            ['base', 'past', 'participle'].forEach(formType => {
                if (!progress[verb.base][formType]) {
                    activeForms.push({ verb, formType });
                }
            });
        });

        return activeForms;
    }

    function getProgressCounts() {
        let totalForms = 0;
        let completedForms = 0;

        verbs.forEach(verb => {
            ['base', 'past', 'participle'].forEach(formType => {
                totalForms++;

                if (progress[verb.base][formType]) {
                    completedForms++;
                }
            });
        });

        return { totalForms, completedForms };
    }

    function updateProgressDisplay() {
        const counts = getProgressCounts();
        const remainingForms = counts.totalForms - counts.completedForms;

        progressStatus.textContent =
            `Verbos: ${verbs.length} | Formas acertadas: ${counts.completedForms} de ${counts.totalForms} | Restantes: ${remainingForms}`;
    }

    function shuffleArray(items) {
        const shuffled = [...items];

        for (let i = shuffled.length - 1; i > 0; i--) {
            const randomIndex = Math.floor(Math.random() * (i + 1));
            [shuffled[i], shuffled[randomIndex]] = [shuffled[randomIndex], shuffled[i]];
        }

        return shuffled;
    }

    function getSentence(verb, formType) {
        if (verb.sentences && verb.sentences[formType]) {
            return verb.sentences[formType];
        }

        if (formType === 'base') {
            return verb.sentence || `I ___ ${verb.base} every day.`;
        }

        if (formType === 'past') {
            return verb.sentence || `Yesterday, I ___ ${verb.base}.`;
        }

        return `I have ___ ${verb.base}.`;
    }

    function getCorrectAnswers(verb, formType) {
        if (formType === 'base') {
            return [verb.base];
        }

        return verb[formType];
    }

       function getDistractors(correctAnswers) {
        const correctSet = new Set(
            correctAnswers.map(answer => answer.toLowerCase())
        );
        const possibleAnswers = [];

        verbs.forEach(verb => {
            ['base', 'past', 'participle'].forEach(formType => {
                const answers = Array.isArray(verb[formType])
                    ? verb[formType]
                    : [verb[formType]];

                answers.forEach(answer => {
                    const normalizedAnswer = answer.toLowerCase();

                    if (
                        !correctSet.has(normalizedAnswer) &&
                        !possibleAnswers.some(
                            existingAnswer =>
                                existingAnswer.toLowerCase() === normalizedAnswer
                        )
                    ) {
                        possibleAnswers.push(answer);
                    }
                });
            });
        });

        return shuffleArray(possibleAnswers).slice(0, 2);
    }
    function createOptions(correctAnswers) {
        const distractors = getDistractors(correctAnswers);
        const options = [...correctAnswers, ...distractors];

        return shuffleArray(options);
    }

    function renderExercise() {
        const activeForms = getActiveForms();
        exerciseArea.innerHTML = '';
        answerSubmitted = false;
        nextButton.style.display = 'none';

        updateProgressDisplay();

        if (activeForms.length === 0) {
            renderCompletionMessage();
            return;
        }

        currentExercise = activeForms[Math.floor(Math.random() * activeForms.length)];

        const { verb, formType } = currentExercise;
        const acceptedAnswers = getCorrectAnswers(verb, formType);
        const tenseLabel = document.createElement('p');
        tenseLabel.classList.add('tense-label');
        tenseLabel.textContent = `Forma para praticar: ${formInfo[formType].label}`;

        const verbLabel = document.createElement('p');
        verbLabel.classList.add('tense-label');
        verbLabel.textContent = `Verbo: ${verb.base}`;

        const questionElement = document.createElement('p');
        questionElement.classList.add('exercise-question');
        questionElement.textContent = getSentence(verb, formType);

        const optionsContainer = document.createElement('div');
        optionsContainer.classList.add('options-container');

        createOptions(acceptedAnswers).forEach(option => {
            const button = document.createElement('button');
            button.type = 'button';
            button.classList.add('option-button');
            button.textContent = option;

            button.addEventListener('click', () => {
                checkAnswer(option, acceptedAnswers, button);
            });

            optionsContainer.appendChild(button);
        });

        exerciseArea.appendChild(tenseLabel);
        exerciseArea.appendChild(verbLabel);
        exerciseArea.appendChild(questionElement);
        exerciseArea.appendChild(optionsContainer);

        updateProgressDisplay();
    }

    function checkAnswer(userAnswer, acceptedAnswers, selectedButton) {
        if (answerSubmitted || !currentExercise) {
            return;
        }

        answerSubmitted = true;

        const normalizedUserAnswer = userAnswer.trim().toLowerCase();
        const isCorrect = acceptedAnswers.some(
            answer => answer.trim().toLowerCase() === normalizedUserAnswer
        );

        const feedbackMessage = document.createElement('p');
        feedbackMessage.classList.add('feedback-message');

        if (isCorrect) {
            progress[currentExercise.verb.base][currentExercise.formType] = true;
            saveProgress();

            feedbackMessage.textContent = 'Correct!';
            feedbackMessage.classList.add('correct');
            selectedButton.classList.add('correct');

            updateStudentProgress(true);
        } else {
            feedbackMessage.textContent =
                `Incorrect. The correct answer is: "${acceptedAnswers.join(' / ')}".`;
            feedbackMessage.classList.add('incorrect');
            selectedButton.classList.add('incorrect');

            exerciseArea.querySelectorAll('.option-button').forEach(button => {
                if (acceptedAnswers.some(
                    answer => answer.toLowerCase() === button.textContent.trim().toLowerCase()
                )) {
                    button.classList.add('correct');
                }
            });

            updateStudentProgress(false);
        }

        exerciseArea.appendChild(feedbackMessage);

        exerciseArea.querySelectorAll('.option-button').forEach(button => {
            button.disabled = true;
        });

        updateProgressDisplay();
        nextButton.textContent = getActiveForms().length === 0 ? 'Concluir' : 'Próxima forma';
        nextButton.style.display = 'inline-block';
    }

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

    function renderCompletionMessage() {
        exerciseArea.innerHTML = '';

        const completionMessage = document.createElement('p');
        completionMessage.classList.add('completion-message');
        completionMessage.textContent =
            'Parabéns! Você acertou todas as formas dos verbos desta lista.';

        exerciseArea.appendChild(completionMessage);
        nextButton.style.display = 'none';
        updateProgressDisplay();
    }

    nextButton.addEventListener('click', () => {
        renderExercise();
    });

    renderExercise();
});
