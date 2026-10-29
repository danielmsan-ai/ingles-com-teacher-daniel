import { db } from './firebase-config.js';
import { doc, setDoc, increment } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

document.addEventListener('DOMContentLoaded', () => {
    const loggedInUser = JSON.parse(localStorage.getItem('loggedInUser'));

    if (!loggedInUser || loggedInUser.tipo !== 'aluno') {
        alert('Acesso não autorizado. Por favor, faça login como aluno.');
        window.location.href = 'index.html';
        return;
    }

    const TOPIC_NAME = 'Irregular Verbs Memorizer';
    const STORAGE_KEY = `irregularVerbsProgress_${loggedInUser.uid}`;

    const exerciseArea = document.getElementById('exercise-area');
    const progressStatus = document.getElementById('progress-status');
    const nextButton = document.getElementById('next-exercise');

    if (!exerciseArea || !progressStatus || !nextButton) {
        console.error('Não foram encontrados os elementos necessários na página do memorizador.');
        return;
    }

    const verbs = [
        { base: 'cost', past: ['cost'], participle: ['cost'], sentences: { base: 'Train tickets usually ___ a lot of money.', past: 'The ticket ___ ten dollars.', participle: 'The repairs have ___ more than we expected.' } },
        { base: 'cut', past: ['cut'], participle: ['cut'], sentences: { base: 'I always ___ the vegetables before cooking.', past: 'I ___ the paper with scissors.', participle: 'She has ___ her hair short this year.' } },
        { base: 'hit', past: ['hit'], participle: ['hit'], sentences: { base: 'Strong waves often ___ the rocks.', past: 'The player ___ the ball.', participle: 'The storm has ___ the coast hard.' } },
        { base: 'hurt', past: ['hurt'], participle: ['hurt'], sentences: { base: "Harsh words can really ___ people's feelings.", past: 'I ___ my arm while playing.', participle: 'He has ___ his knee during training.' } },
        { base: 'let', past: ['let'], participle: ['let'], sentences: { base: 'Good teachers ___ students ask questions.', past: 'My parents ___ me stay up late.', participle: 'They have ___ us use their car before.' } },
        { base: 'put', past: ['put'], participle: ['put'], sentences: { base: 'I usually ___ my keys on the table.', past: 'She ___ the book on the table.', participle: 'We have ___ a lot of effort into this project.' } },
        { base: 'read', past: ['read'], participle: ['read'], sentences: { base: 'I ___ a book every week.', past: 'Yesterday, I ___ an interesting article.', participle: 'I have never ___ that author before.' } },

        { base: 'beat', past: ['beat'], participle: ['beaten'], sentences: { base: 'Strong teams usually ___ weaker opponents.', past: 'Our team ___ the other team.', participle: 'They have ___ the record for the fastest time.' } },
        { base: 'bite', past: ['bit'], participle: ['bitten'], sentences: { base: 'Dogs sometimes ___ when they are scared.', past: 'The dog ___ the toy.', participle: 'The dog has ___ the mailman twice.' } },
        { base: 'hide', past: ['hid'], participle: ['hidden'], sentences: { base: 'Children often ___ during this game.', past: 'The child ___ behind the door.', participle: 'She has ___ the present in her closet.' } },

        { base: 'begin', past: ['began'], participle: ['begun'], sentences: { base: "Classes usually ___ at nine o'clock.", past: "The class ___ at nine o'clock.", participle: 'The meeting has already ___.' } },
        { base: 'drink', past: ['drank'], participle: ['drunk'], sentences: { base: 'I ___ water every morning.', past: 'Yesterday, I ___ two cups of coffee.', participle: 'I have never ___ coffee before.' } },
        { base: 'ring', past: ['rang'], participle: ['rung'], sentences: { base: 'Church bells usually ___ at noon.', past: 'The telephone ___ during dinner.', participle: 'The phone has ___ three times already.' } },
        { base: 'run', past: ['ran'], participle: ['run'], sentences: { base: 'They usually ___ every morning.', past: 'She ___ in the park yesterday.', participle: 'We have ___ five kilometers today.' } },
        { base: 'sing', past: ['sang'], participle: ['sung'], sentences: { base: 'They often ___ in the school choir.', past: 'They ___ their favorite song.', participle: 'She has ___ that song many times.' } },
        { base: 'swim', past: ['swam'], participle: ['swum'], sentences: { base: 'We often ___ in the lake in summer.', past: 'We ___ in the lake last summer.', participle: 'They have ___ across the lake before.' } },

        { base: 'become', past: ['became'], participle: ['become'], sentences: { base: 'People often ___ nervous before exams.', past: 'He ___ a doctor last year.', participle: 'She has ___ a great teacher.' } },
        { base: 'come', past: ['came'], participle: ['come'], sentences: { base: 'My friends usually ___ to my house on weekends.', past: 'My friends ___ to my house yesterday.', participle: 'They have just ___ back from vacation.' } },

        { base: 'hold', past: ['held'], participle: ['held'], sentences: { base: 'They usually ___ the baby carefully.', past: 'She ___ the baby carefully.', participle: 'We have ___ this tradition for years.' } },
        { base: 'send', past: ['sent'], participle: ['sent'], sentences: { base: 'I often ___ emails to my teacher.', past: 'I ___ an email to my teacher.', participle: 'She has already ___ the invitations.' } },
        { base: 'spend', past: ['spent'], participle: ['spent'], sentences: { base: 'They usually ___ the weekend at home.', past: 'They ___ the weekend at home.', participle: 'We have ___ too much money this month.' } },

        { base: 'draw', past: ['drew'], participle: ['drawn'], sentences: { base: 'Students usually ___ pictures in class.', past: 'The student ___ a picture in class.', participle: 'She has ___ many beautiful paintings.' } },
        { base: 'fly', past: ['flew'], participle: ['flown'], sentences: { base: 'We often ___ to other cities for work.', past: 'We ___ to another city last week.', participle: 'They have ___ over twenty countries.' } },
        { base: 'grow', past: ['grew'], participle: ['grown'], sentences: { base: 'Children usually ___ quickly.', past: 'The children ___ quickly.', participle: 'This tree has ___ a lot since last year.' } },
        { base: 'know', past: ['knew'], participle: ['known'], sentences: { base: 'I usually ___ the answers in class.', past: 'I ___ the answer yesterday.', participle: 'We have ___ each other for years.' } },
        { base: 'throw', past: ['threw'], participle: ['thrown'], sentences: { base: 'They often ___ the ball to each other.', past: 'He ___ the ball to his friend.', participle: 'She has ___ the ball three times already.' } },

        { base: 'break', past: ['broke'], participle: ['broken'], sentences: { base: 'Children sometimes ___ their toys.', past: 'The boy ___ the window by accident.', participle: 'He has ___ his arm before.' } },
        { base: 'choose', past: ['chose'], participle: ['chosen'], sentences: { base: 'Students usually ___ their own topics.', past: 'She ___ the blue dress.', participle: 'They have already ___ a winner.' } },
        { base: 'drive', past: ['drove'], participle: ['driven'], sentences: { base: 'My parents usually ___ to work.', past: 'My father ___ to work yesterday.', participle: 'She has ___ this car for ten years.' } },
        { base: 'ride', past: ['rode'], participle: ['ridden'], sentences: { base: 'We often ___ our bikes in the park.', past: 'We ___ our bikes in the park.', participle: 'He has never ___ a horse before.' } },
        { base: 'write', past: ['wrote'], participle: ['written'], sentences: { base: 'They often ___ letters to their cousins.', past: 'He ___ a letter to his cousin.', participle: 'She has ___ three books so far.' } },
        { base: 'wake', past: ['woke'], participle: ['woken'], sentences: { base: 'I usually ___ early in the morning.', past: 'I ___ early this morning.', participle: 'She has already ___ up.' } },
        { base: 'take', past: ['took'], participle: ['taken'], sentences: { base: 'They usually ___ the bus to school.', past: 'She ___ the bus to school.', participle: 'I have already ___ my medicine.' } },
        { base: 'steal', past: ['stole'], participle: ['stolen'], sentences: { base: 'Thieves sometimes ___ bicycles in this area.', past: 'Someone ___ my bicycle yesterday.', participle: 'Someone has ___ my bicycle before.' } },
        { base: 'speak', past: ['spoke'], participle: ['spoken'], sentences: { base: 'They usually ___ English during the lesson.', past: 'They ___ English during the lesson.', participle: 'She has ___ to the manager already.' } },

        { base: 'bring', past: ['brought'], participle: ['brought'], sentences: { base: 'They often ___ food to the party.', past: 'He ___ some food to the party.', participle: 'She has already ___ the documents.' } },
        { base: 'buy', past: ['bought'], participle: ['bought'], sentences: { base: 'I often ___ notebooks for school.', past: 'I ___ a new notebook yesterday.', participle: 'We have already ___ the tickets.' } },
        { base: 'catch', past: ['caught'], participle: ['caught'], sentences: { base: 'The players usually ___ the ball well.', past: 'The player ___ the ball.', participle: 'She has ___ a bad cold.' } },
        { base: 'fight', past: ['fought'], participle: ['fought'], sentences: { base: 'The two teams usually ___ hard for the trophy.', past: 'The two teams ___ hard.', participle: 'They have ___ about this before.' } },
        { base: 'find', past: ['found'], participle: ['found'], sentences: { base: 'I usually ___ my keys quickly.', past: 'She ___ her keys under the sofa.', participle: 'I have already ___ the solution.' } },
        { base: 'seek', past: ['sought'], participle: ['sought'], sentences: { base: 'Students often ___ help from their teachers.', past: 'They ___ help from their teacher.', participle: 'They have already ___ professional advice.' } },
        { base: 'think', past: ['thought'], participle: ['thought'], sentences: { base: 'I often ___ about difficult questions.', past: 'I ___ about the question last night.', participle: 'I have ___ about this a lot.' } },
        { base: 'teach', past: ['taught'], participle: ['taught'], sentences: { base: 'Teachers usually ___ English here.', past: 'Mr. Brown ___ us English last year.', participle: 'She has ___ here for ten years.' } },

        { base: 'deal', past: ['dealt'], participle: ['dealt'], sentences: { base: 'They usually ___ with problems calmly.', past: 'She ___ with the problem yesterday.', participle: 'We have already ___ with this issue.' } },
        { base: 'feel', past: ['felt'], participle: ['felt'], sentences: { base: 'They often ___ happy after a game.', past: 'He ___ happy after the game.', participle: 'I have ___ tired all week.' } },
        { base: 'keep', past: ['kept'], participle: ['kept'], sentences: { base: 'I usually ___ my photos in a box.', past: 'I ___ the photo in my room.', participle: 'She has ___ the same job for years.' } },
        { base: 'leave', past: ['left'], participle: ['left'], sentences: { base: 'They usually ___ the house at eight.', past: 'They ___ the house at eight.', participle: 'He has already ___ for the airport.' } },
        { base: 'lend', past: ['lent'], participle: ['lent'], sentences: { base: 'My friends often ___ me pencils.', past: 'My friend ___ me a pencil.', participle: 'She has ___ me money before.' } },
        { base: 'mean', past: ['meant'], participle: ['meant'], sentences: { base: 'Her messages usually ___ a lot to me.', past: 'Her message ___ a lot to me.', participle: 'This gift has always ___ a lot to her.' } },
        { base: 'meet', past: ['met'], participle: ['met'], sentences: { base: 'We often ___ our neighbors at the park.', past: 'We ___ our new neighbors yesterday.', participle: 'I have never ___ him in person.' } },
        { base: 'sleep', past: ['slept'], participle: ['slept'], sentences: { base: 'Babies usually ___ for hours.', past: 'The baby ___ for three hours.', participle: 'I have barely ___ this week.' } },

        { base: 'forgive', past: ['forgave'], participle: ['forgiven'], sentences: { base: 'They usually ___ each other quickly.', past: 'She ___ her friend after the argument.', participle: 'I have already ___ him for that.' } },
        { base: 'give', past: ['gave'], participle: ['given'], sentences: { base: 'They often ___ presents on birthdays.', past: 'He ___ me a present yesterday.', participle: 'She has already ___ her answer.' } },

        { base: 'forget', past: ['forgot'], participle: ['forgotten'], sentences: { base: 'I sometimes ___ my homework.', past: 'I ___ my homework at home.', participle: 'I have never ___ that day.' } },
        { base: 'get', past: ['got'], participle: ['got'], sentences: { base: 'They usually ___ messages in the morning.', past: 'She ___ a message this morning.', participle: 'I have just ___ some good news.' } },
        { base: 'wear', past: ['wore'], participle: ['worn'], sentences: { base: 'They often ___ blue jackets.', past: 'He ___ a blue jacket yesterday.', participle: 'She has never ___ that dress.' } },
        { base: 'swear', past: ['swore'], participle: ['sworn'], sentences: { base: 'Witnesses usually ___ to tell the truth.', past: 'The witness ___ to tell the truth.', participle: 'He has ___ he will come.' } },

        { base: 'lay', past: ['laid'], participle: ['laid'], sentences: { base: 'They usually ___ the blanket on the bed.', past: 'She ___ the blanket on the bed.', participle: 'The hens have already ___ their eggs.' } },
        { base: 'pay', past: ['paid'], participle: ['paid'], sentences: { base: 'We usually ___ for lunch together.', past: 'We ___ for lunch yesterday.', participle: 'They have already ___ the bill.' } },
        { base: 'say', past: ['said'], participle: ['said'], sentences: { base: 'They often ___ hello to their neighbors.', past: 'He ___ hello to his neighbor.', participle: 'She has already ___ goodbye.' } },

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
        { base: 'build', past: ['built'], participle: ['built'], sentences: { base: 'They usually ___ houses quickly.', past: 'They ___ a new house last year.', participle: 'We have already ___ the foundation.' } },

        { base: 'do', past: ['did'], participle: ['done'], sentences: { base: 'I usually ___ my homework after school.', past: 'I ___ my homework yesterday.', participle: 'I have already ___ my homework.' } },
        { base: 'eat', past: ['ate'], participle: ['eaten'], sentences: { base: 'We usually ___ dinner at seven.', past: 'We ___ dinner at seven yesterday.', participle: 'I have already ___ breakfast.' } },
        { base: 'fall', past: ['fell'], participle: ['fallen'], sentences: { base: 'Leaves usually ___ in autumn.', past: 'The leaves ___ from the tree.', participle: 'She has ___ twice this week.' } },
        { base: 'go', past: ['went'], participle: ['gone'], sentences: { base: 'They usually ___ to the library.', past: 'She ___ to the library yesterday.', participle: 'I have already ___ to that place.' } },
        { base: 'lie', past: ['lay'], participle: ['lain'], sentences: { base: 'Dogs usually ___ on the floor.', past: 'The dog ___ on the floor all afternoon.', participle: 'The cat has ___ there all day.' } },
        { base: 'see', past: ['saw'], participle: ['seen'], sentences: { base: 'I often ___ rainbows after it rains.', past: 'I ___ a rainbow after the rain.', participle: 'I have never ___ such a beautiful view.' } },

        { base: 'have', past: ['had'], participle: ['had'], sentences: { base: 'We usually ___ a great time at parties.', past: 'We ___ a great time at the party.', participle: 'I have already ___ lunch.' } },
        { base: 'hear', past: ['heard'], participle: ['heard'], sentences: { base: 'They often ___ strange noises at night.', past: 'She ___ a strange noise last night.', participle: 'I have never ___ that song before.' } },
        { base: 'lose', past: ['lost'], participle: ['lost'], sentences: { base: 'They sometimes ___ their wallets.', past: 'He ___ his wallet on the bus.', participle: 'She has never ___ a game.' } },
        { base: 'make', past: ['made'], participle: ['made'], sentences: { base: 'My parents usually ___ a cake on Sundays.', past: 'My mother ___ a cake yesterday.', participle: 'We have already ___ the decision.' } },
        { base: 'sell', past: ['sold'], participle: ['sold'], sentences: { base: 'They usually ___ old cars at this shop.', past: 'They ___ their old car last month.', participle: 'She has already ___ her house.' } },
        { base: 'sit', past: ['sat'], participle: ['sat'], sentences: { base: 'The students usually ___ near the window.', past: 'The students ___ near the window.', participle: 'I have already ___ for the exam.' } },
        { base: 'stand', past: ['stood'], participle: ['stood'], sentences: { base: 'We usually ___ outside the classroom.', past: 'We ___ outside the classroom.', participle: 'They have ___ in line for hours.' } },
        { base: 'tell', past: ['told'], participle: ['told'], sentences: { base: 'They often ___ funny stories.', past: 'He ___ us a funny story.', participle: 'She has already ___ me the news.' } },
        { base: 'understand', past: ['understood'], participle: ['understood'], sentences: { base: 'I usually ___ the instructions quickly.', past: 'I ___ the instructions after the lesson.', participle: 'I have finally ___ this topic.' } },
        { base: 'win', past: ['won'], participle: ['won'], sentences: { base: 'Good teams usually ___ most of their games.', past: 'Our team ___ the game yesterday.', participle: 'They have already ___ three matches this year.' } }
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
            return `I ___ ${verb.base} every day.`;
        }

        if (formType === 'past') {
            return `Yesterday, I ___ ${verb.base}.`;
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

    async function updateStudentProgress(isCorrect) {
        try {
            const progressRef = doc(db, 'usuarios', loggedInUser.uid, 'progresso', TOPIC_NAME);
            await setDoc(progressRef, {
                correct: increment(isCorrect ? 1 : 0),
                incorrect: increment(isCorrect ? 0 : 1)
            }, { merge: true });
        } catch (error) {
            console.error('Erro ao salvar progresso no Firestore:', error);
        }
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
