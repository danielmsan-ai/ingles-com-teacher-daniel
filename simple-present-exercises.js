document.addEventListener('DOMContentLoaded', () => {
    const loggedInUser = JSON.parse(localStorage.getItem('loggedInUser'));

    // Redireciona se não houver usuário logado ou se não for um aluno
    if (!loggedInUser || loggedInUser.type !== 'student') {
        alert('Acesso não autorizado. Por favor, faça login como aluno.');
        window.location.href = 'index.html';
        return;
    }

    const exerciseArea = document.getElementById('exercise-area');
    const prevButton = document.getElementById('prev-exercise');
    const nextButton = document.getElementById('next-exercise');

    let currentExerciseIndex = 0;
    let exercises = []; // Será preenchido com os exercícios afirmativos

    // --- EXERCÍCIOS AFIRMATIVOS (50 exemplos) ---
    // Tipo 'mc' para Múltipla Escolha, 'rewrite' para Reescrever
    // Para 'mc', 'correctAnswer' é o texto da opção correta.
    // Para 'rewrite', 'correctAnswer' é a frase completa esperada.
    exercises = [
        // Múltipla Escolha (25 exercícios)
        {
            id: 1,
            type: 'mc',
            question: "She often ___ (visit) her grandparents on weekends.",
            options: ["visit", "visits", "visiting"],
            correctAnswer: "visits",
            hint: "Lembre-se do 's' na 3ª pessoa do singular."
        },
        {
            id: 2,
            type: 'mc',
            question: "They ___ (live) in a big city.",
            options: ["lives", "live", "living"],
            correctAnswer: "live",
            hint: "Para 'they', o verbo não muda."
        },
        {
            id: 3,
            type: 'mc',
            question: "He always ___ (drink) coffee in the morning.",
            options: ["drink", "drinks", "drinking"],
            correctAnswer: "drinks",
            hint: "Atenção à 3ª pessoa do singular."
        },
        {
            id: 4,
            type: 'mc',
            question: "We ___ (study) English every day.",
            options: ["studies", "study", "studying"],
            correctAnswer: "study",
            hint: "Com 'we', o verbo permanece na forma base."
        },
        {
            id: 5,
            type: 'mc',
            question: "The sun ___ (rise) in the east.",
            options: ["rises", "rise", "rising"],
            correctAnswer: "rises",
            hint: "Um fato geral, e 'the sun' é 3ª pessoa do singular."
        },
        {
            id: 6,
            type: 'mc',
            question: "Birds ___ (sing) beautifully.",
            options: ["sings", "sing", "singing"],
            correctAnswer: "sing",
            hint: "'Birds' é plural, então o verbo não leva 's'."
        },
        {
            id: 7,
            type: 'mc',
            question: "My mother ___ (cook) dinner every evening.",
            options: ["cook", "cooks", "cooking"],
            correctAnswer: "cooks",
            hint: "'My mother' é 3ª pessoa do singular."
        },
        {
            id: 8,
            type: 'mc',
            question: "I ___ (work) as a teacher.",
            options: ["works", "work", "working"],
            correctAnswer: "work",
            hint: "Com 'I', o verbo não muda."
        },
        {
            id: 9,
            type: 'mc',
            question: "Cats ___ (like) to sleep a lot.",
            options: ["likes", "like", "liking"],
            correctAnswer: "like",
            hint: "'Cats' é plural."
        },
        {
            id: 10,
            type: 'mc',
            question: "Water ___ (boil) at 100 degrees Celsius.",
            options: ["boils", "boil", "boiling"],
            correctAnswer: "boils",
            hint: "Um fato científico, 'water' é 3ª pessoa do singular."
        },
        {
            id: 11,
            type: 'mc',
            question: "He ___ (go) to the gym three times a week.",
            options: ["go", "goes", "going"],
            correctAnswer: "goes",
            hint: "Verbos terminados em 'o' na 3ª pessoa do singular recebem 'es'."
        },
        {
            id: 12,
            type: 'mc',
            question: "We ___ (watch) TV in the evening.",
            options: ["watches", "watch", "watching"],
            correctAnswer: "watch",
            hint: "Com 'we', o verbo permanece na forma base."
        },
        {
            id: 13,
            type: 'mc',
            question: "The train ___ (leave) at 7 AM.",
            options: ["leave", "leaves", "leaving"],
            correctAnswer: "leaves",
            hint: "Horários fixos usam Simple Present. 'The train' é 3ª pessoa do singular."
        },
        {
            id: 14,
            type: 'mc',
            question: "My sister ___ (teach) math.",
            options: ["teach", "teaches", "teaching"],
            correctAnswer: "teaches",
            hint: "Verbos terminados em 'ch' na 3ª pessoa do singular recebem 'es'."
        },
        {
            id: 15,
            type: 'mc',
            question: "They often ___ (play) soccer.",
            options: ["plays", "play", "playing"],
            correctAnswer: "play",
            hint: "Com 'they', o verbo não muda."
        },
        {
            id: 16,
            type: 'mc',
            question: "The earth ___ (revolve) around the sun.",
            options: ["revolve", "revolves", "revolving"],
            correctAnswer: "revolves",
            hint: "Um fato universal. 'The earth' é 3ª pessoa do singular."
        },
        {
            id: 17,
            type: 'mc',
            question: "I usually ___ (read) a book before bed.",
            options: ["reads", "read", "reading"],
            correctAnswer: "read",
            hint: "Com 'I', o verbo não muda."
        },
        {
            id: 18,
            type: 'mc',
            question: "She ___ (finish) work at 5 PM.",
            options: ["finish", "finishes", "finishing"],
            correctAnswer: "finishes",
            hint: "Verbos terminados em 'sh' na 3ª pessoa do singular recebem 'es'."
        },
        {
            id: 19,
            type: 'mc',
            question: "We ___ (go) to the beach every summer.",
            options: ["goes", "go", "going"],
            correctAnswer: "go",
            hint: "Com 'we', o verbo permanece na forma base."
        },
        {
            id: 20,
            type: 'mc',
            question: "He ___ (wash) his car on Sundays.",
            options: ["wash", "washes", "washing"],
            correctAnswer: "washes",
            hint: "Verbos terminados em 'sh' na 3ª pessoa do singular recebem 'es'."
        },
        {
            id: 21,
            type: 'mc',
            question: "My parents ___ (travel) a lot.",
            options: ["travels", "travel", "traveling"],
            correctAnswer: "travel",
            hint: "'My parents' é plural."
        },
        {
            id: 22,
            type: 'mc',
            question: "The baby ___ (cry) when he is hungry.",
            options: ["cry", "cries", "crying"],
            correctAnswer: "cries",
            hint: "Verbos terminados em 'y' precedido de consoante na 3ª pessoa do singular mudam para 'ies'."
        },
        {
            id: 23,
            type: 'mc',
            question: "You always ___ (help) me.",
            options: ["helps", "help", "helping"],
            correctAnswer: "help",
            hint: "Com 'you', o verbo não muda."
        },
        {
            id: 24,
            type: 'mc',
            question: "It ___ (rain) a lot in winter here.",
            options: ["rain", "rains", "raining"],
            correctAnswer: "rains",
            hint: "'It' é 3ª pessoa do singular."
        },
        {
            id: 25,
            type: 'mc',
            question: "Students ___ (learn) new things every day.",
            options: ["learns", "learn", "learning"],
            correctAnswer: "learn",
            hint: "'Students' é plural."
        },

        // Reescrever Frases (25 exercícios)
        {
            id: 26,
            type: 'rewrite',
            question: "Rewrite the sentence using the Simple Present: I (go) to school every morning.",
            correctAnswer: "I go to school every morning.",
            hint: "Com 'I', o verbo permanece na forma base."
        },
        {
            id: 27,
            type: 'rewrite',
            question: "Rewrite the sentence using the Simple Present: She (work) in a hospital.",
            correctAnswer: "She works in a hospital.",
            hint: "Lembre-se do 's' na 3ª pessoa do singular."
        },
        {
            id: 28,
            type: 'rewrite',
            question: "Rewrite the sentence using the Simple Present: They (speak) English very well.",
            correctAnswer: "They speak English very well.",
            hint: "Com 'they', o verbo não muda."
        },
        {
            id: 29,
            type: 'rewrite',
            question: "Rewrite the sentence using the Simple Present: He (watch) TV every night.",
            correctAnswer: "He watches TV every night.",
            hint: "Verbos terminados em 'ch' na 3ª pessoa do singular recebem 'es'."
        },
        {
            id: 30,
            type: 'rewrite',
            question: "Rewrite the sentence using the Simple Present: We (eat) breakfast at 7 AM.",
            correctAnswer: "We eat breakfast at 7 AM.",
            hint: "Com 'we', o verbo permanece na forma base."
        },
        {
            id: 31,
            type: 'rewrite',
            question: "Rewrite the sentence using the Simple Present: The dog (bark) at strangers.",
            correctAnswer: "The dog barks at strangers.",
            hint: "'The dog' é 3ª pessoa do singular."
        },
        {
            id: 32,
            type: 'rewrite',
            question: "Rewrite the sentence using the Simple Present: You (listen) to music often.",
            correctAnswer: "You listen to music often.",
            hint: "Com 'you', o verbo não muda."
        },
        {
            id: 33,
            type: 'rewrite',
            question: "Rewrite the sentence using the Simple Present: My brother (play) video games.",
            correctAnswer: "My brother plays video games.",
            hint: "'My brother' é 3ª pessoa do singular."
        },
        {
            id: 34,
            type: 'rewrite',
            question: "Rewrite the sentence using the Simple Present: They (have) a big house.",
            correctAnswer: "They have a big house.",
            hint: "Com 'they', o verbo não muda."
        },
        {
            id: 35,
            type: 'rewrite',
            question: "Rewrite the sentence using the Simple Present: She (study) for her exams.",
            correctAnswer: "She studies for her exams.",
            hint: "Verbos terminados em 'y' precedido de consoante na 3ª pessoa do singular mudam para 'ies'."
        },
        {
            id: 36,
            type: 'rewrite',
            question: "Rewrite the sentence using the Simple Present: He (teach) English at school.",
            correctAnswer: "He teaches English at school.",
            hint: "Verbos terminados em 'ch' na 3ª pessoa do singular recebem 'es'."
        },
        {
            id: 37,
            type: 'rewrite',
            question: "Rewrite the sentence using the Simple Present: I (like) chocolate.",
            correctAnswer: "I like chocolate.",
            hint: "Com 'I', o verbo não muda."
        },
        {
            id: 38,
            type: 'rewrite',
            question: "Rewrite the sentence using the Simple Present: The children (play) in the park.",
            correctAnswer: "The children play in the park.",
            hint: "'The children' é plural."
        },
        {
            id: 39,
            type: 'rewrite',
            question: "Rewrite the sentence using the Simple Present: My father (drive) to work.",
            correctAnswer: "My father drives to work.",
            hint: "'My father' é 3ª pessoa do singular."
        },
        {
            id: 40,
            type: 'rewrite',
            question: "Rewrite the sentence using the Simple Present: We (live) in Brazil.",
            correctAnswer: "We live in Brazil.",
            hint: "Com 'we', o verbo permanece na forma base."
        },
        {
            id: 41,
            type: 'rewrite',
            question: "Rewrite the sentence using the Simple Present: She (read) books every night.",
            correctAnswer: "She reads books every night.",
            hint: "Lembre-se do 's' na 3ª pessoa do singular."
        },
        {
            id: 42,
            type: 'rewrite',
            question: "Rewrite the sentence using the Simple Present: He (fix) cars.",
            correctAnswer: "He fixes cars.",
            hint: "Verbos terminados em 'x' na 3ª pessoa do singular recebem 'es'."
        },
        {
            id: 43,
            type: 'rewrite',
            question: "Rewrite the sentence using the Simple Present: They (visit) their friends.",
            correctAnswer: "They visit their friends.",
            hint: "Com 'they', o verbo não muda."
        },
        {
            id: 44,
            type: 'rewrite',
            question: "Rewrite the sentence using the Simple Present: The cat (sleep) on the sofa.",
            correctAnswer: "The cat sleeps on the sofa.",
            hint: "'The cat' é 3ª pessoa do singular."
        },
        {
            id: 45,
            type: 'rewrite',
            question: "Rewrite the sentence using the Simple Present: I (drink) water when I'm thirsty.",
            correctAnswer: "I drink water when I'm thirsty.",
            hint: "Com 'I', o verbo não muda."
        },
        {
            id: 46,
            type: 'rewrite',
            question: "Rewrite the sentence using the Simple Present: She (wash) her hands before eating.",
            correctAnswer: "She washes her hands before eating.",
            hint: "Verbos terminados em 'sh' na 3ª pessoa do singular recebem 'es'."
        },
        {
            id: 47,
            type: 'rewrite',
            question: "Rewrite the sentence using the Simple Present: We (love) pizza.",
            correctAnswer: "We love pizza.",
            hint: "Com 'we', o verbo permanece na forma base."
        },
        {
            id: 48,
            type: 'rewrite',
            question: "Rewrite the sentence using the Simple Present: He (do) his homework after school.",
            correctAnswer: "He does his homework after school.",
            hint: "O verbo 'do' na 3ª pessoa do singular vira 'does'."
        },
        {
            id: 49,
            type: 'rewrite',
            question: "Rewrite the sentence using the Simple Present: They (study) at the library.",
            correctAnswer: "They study at the library.",
            hint: "Com 'they', o verbo não muda."
        },
        {
            id: 50,
            type: 'rewrite',
            question: "Rewrite the sentence using the Simple Present: The store (open) at 9 AM.",
            correctAnswer: "The store opens at 9 AM.",
            hint: "'The store' é 3ª pessoa do singular."
        }
    ];

    // --- FUNÇÕES DE EXIBIÇÃO E LÓGICA ---

    function renderExercise() {
        const exercise = exercises[currentExerciseIndex];
        exerciseArea.innerHTML = ''; // Limpa a área do exercício

        const questionElement = document.createElement('p');
        questionElement.classList.add('exercise-question');
        questionElement.textContent = exercise.question;
        exerciseArea.appendChild(questionElement);

        if (exercise.type === 'mc') {
            const optionsContainer = document.createElement('div');
            optionsContainer.classList.add('options-container');

            // Embaralha as opções para variar a posição da resposta correta
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

        // Normaliza as respostas para comparação (remove espaços extras, ignora maiúsculas/minúsculas)
        const normalizedUserAnswer = userAnswer.trim().toLowerCase();
        const normalizedCorrectAnswer = correctAnswer.trim().toLowerCase();

        if (normalizedUserAnswer === normalizedCorrectAnswer) {
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
                // Opcional: destacar a resposta correta
                const options = exerciseArea.querySelectorAll('.option-button');
                options.forEach(opt => {
                    if (opt.textContent.trim().toLowerCase() === normalizedCorrectAnswer) {
                        opt.classList.add('correct');
                    }
                });
            }
        }
        exerciseArea.appendChild(feedbackMessage);

        // Desabilita os botões/input após a resposta para evitar múltiplas tentativas
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

    // Carrega o primeiro exercício ao iniciar
    renderExercise();
});
