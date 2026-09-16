// ============================================================
// APP.JS — SISTEMA COMPLETO DE ENSINO DE VERBOS EM INGLÊS
// ============================================================

// ============================================================
// BANCO DE DADOS DE USUÁRIOS
// ============================================================

let users = JSON.parse(localStorage.getItem('users')) || [
  {
    id: 1,
    name: 'Professor',
    email: 'professor@escola.com',
    password: '123456',
    role: 'teacher'
  }
];

let currentUser = JSON.parse(localStorage.getItem('currentUser')) || null;

function saveUsers() {
  localStorage.setItem('users', JSON.stringify(users));
}

function saveCurrentUser(user) {
  currentUser = user;
  localStorage.setItem('currentUser', JSON.stringify(user));
}

function logout() {
  currentUser = null;
  localStorage.removeItem('currentUser');
  showScreen('login-screen');
}

// ============================================================
// CONTROLE DE TELAS
// ============================================================

function showScreen(screenId) {
  const screens = document.querySelectorAll('.screen');
  screens.forEach(screen => screen.classList.remove('active'));
  document.getElementById(screenId).classList.add('active');
}

// ============================================================
// LOGIN
// ============================================================

function handleLogin() {
  console.log('Botão de login clicado!'); // Mantido para depuração
  const email = document.getElementById('login-email').value.trim();
  const password = document.getElementById('login-password').value.trim();

  if (!email || !password) {
    alert('Por favor, preencha todos os campos.');
    return;
  }

  const user = users.find(u => u.email === email && u.password === password);

  if (!user) {
    alert('Email ou senha incorretos.');
    return;
  }

  saveCurrentUser(user);

  if (user.role === 'teacher') {
    showTeacherPanel();
  } else {
    showStudentPanel();
  }
}

// ============================================================
// PAINEL DO PROFESSOR
// ============================================================

function showTeacherPanel() {
  showScreen('teacher-screen');
  renderStudentList();
}

function renderStudentList() {
  const students = users.filter(u => u.role === 'student');
  const list = document.getElementById('student-list');

  if (students.length === 0) {
    list.innerHTML = '<p>Nenhum aluno cadastrado ainda.</p>';
    return;
  }

  list.innerHTML = students.map(s => `
    <div class="student-card">
      <span>${s.name} — ${s.email}</span>
      <button onclick="deleteStudent(${s.id})">Remover</button>
    </div>
  `).join('');
}

function addStudent() {
  const name = document.getElementById('student-name').value.trim();
  const email = document.getElementById('student-email').value.trim();
  const password = document.getElementById('student-password').value.trim();

  if (!name || !email || !password) {
    alert('Por favor, preencha todos os campos.');
    return;
  }

  const emailExists = users.find(u => u.email === email);
  if (emailExists) {
    alert('Este email já está cadastrado.');
    return;
  }

  const newStudent = {
    id: Date.now(),
    name,
    email,
    password,
    role: 'student'
  };

  users.push(newStudent);
  saveUsers();

  document.getElementById('student-name').value = '';
  document.getElementById('student-email').value = '';
  document.getElementById('student-password').value = '';

  renderStudentList();
  alert(`Aluno ${name} cadastrado com sucesso!`);
}

function deleteStudent(id) {
  if (!confirm('Tem certeza que deseja remover este aluno?')) return;
  users = users.filter(u => u.id !== id);
  saveUsers();
  renderStudentList();
}

// ============================================================
// PAINEL DO ALUNO
// ============================================================

function showStudentPanel() {
  showScreen('student-screen');
  document.getElementById('student-welcome').textContent =
    `Olá, ${currentUser.name}! Escolha um módulo para praticar:`;
}

// ============================================================
// LÓGICA DO QUIZ
// ============================================================

let currentModule = '';
let currentQuestions = [];
let currentQuestionIndex = 0;
let score = 0;
let selectedOption = null;

function startQuiz(moduleName) {
  console.log(`Iniciando quiz do módulo: ${moduleName}`); // Linha de depuração adicionada

  currentModule = moduleName;
  score = 0;
  currentQuestionIndex = 0;
  selectedOption = null;

  // Seleciona o banco de questões correto
  switch (moduleName) {
    case 'simplePast':
      currentQuestions = simplePastQuestions;
      document.getElementById('quiz-module-title').textContent = 'Módulo: Simple Past';
      break;
    case 'presentPerfect':
      currentQuestions = presentPerfectQuestions;
      document.getElementById('quiz-module-title').textContent = 'Módulo: Present Perfect';
      break;
    case 'presentPerfectContinuous':
      currentQuestions = presentPerfectContinuousQuestions;
      document.getElementById('quiz-module-title').textContent = 'Módulo: Present Perfect Continuous';
      break;
    case 'simplePresent':
      currentQuestions = simplePresentQuestions;
      document.getElementById('quiz-module-title').textContent = 'Módulo: Simple Present';
      break;
    default:
      alert('Módulo não encontrado!');
      return;
  }

  // Embaralha as questões para cada quiz
  currentQuestions = shuffleArray(currentQuestions);

  showScreen('quiz-screen');
  renderQuestion();
}

function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

function renderQuestion() {
  const questionData = currentQuestions[currentQuestionIndex];
  document.getElementById('quiz-progress').textContent =
    `Questão ${currentQuestionIndex + 1} de ${currentQuestions.length}`;
  document.getElementById('quiz-rule').textContent = questionData.rule;
  document.getElementById('quiz-question').textContent = questionData.question;

  const optionsContainer = document.getElementById('quiz-options');
  optionsContainer.innerHTML = ''; // Limpa opções anteriores
  questionData.options.forEach((option, index) => {
    const button = document.createElement('button');
    button.classList.add('option-btn');
    button.textContent = option;
    button.onclick = () => selectOption(index);
    optionsContainer.appendChild(button);
  });

  document.getElementById('quiz-feedback').textContent = '';
  document.getElementById('next-btn').style.display = 'none';
  selectedOption = null; // Reseta a opção selecionada
  // Remove classes de feedback de todas as opções
  document.querySelectorAll('.option-btn').forEach(btn => {
    btn.classList.remove('correct', 'incorrect', 'selected');
    btn.disabled = false; // Garante que os botões estão habilitados para a nova questão
  });
}

function selectOption(index) {
  if (selectedOption !== null) return; // Impede múltiplas seleções
  selectedOption = index;

  // Adiciona classe 'selected' e remove de outros
  document.querySelectorAll('.option-btn').forEach((btn, i) => {
    btn.classList.remove('selected');
    if (i === index) {
      btn.classList.add('selected');
    }
  });
}

function checkAnswer() {
  if (selectedOption === null) {
    alert('Por favor, selecione uma opção antes de verificar.');
    return;
  }

  const questionData = currentQuestions[currentQuestionIndex];
  const feedbackDiv = document.getElementById('quiz-feedback');
  const optionsButtons = document.querySelectorAll('.option-btn');

  optionsButtons.forEach((btn, i) => {
    btn.disabled = true; // Desabilita botões após a resposta
    if (i === questionData.correct) {
      btn.classList.add('correct');
    } else if (i === selectedOption) {
      btn.classList.add('incorrect');
    }
  });

  if (selectedOption === questionData.correct) {
    score++;
    feedbackDiv.innerHTML = `<p class="feedback-correct">Correto! 🎉</p><p>${questionData.explanation}</p>`;
  } else {
    feedbackDiv.innerHTML = `<p class="feedback-incorrect">Incorreto. A resposta correta era: "${questionData.options[questionData.correct]}".</p><p>${questionData.explanation}</p>`;
  }

  document.getElementById('next-btn').style.display = 'block';
}

function nextQuestion() {
  currentQuestionIndex++;
  if (currentQuestionIndex < currentQuestions.length) {
    renderQuestion();
  } else {
    showResult();
  }
}

function showResult() {
  showScreen('result-screen');
  document.getElementById('result-module-title').textContent = `Resultados do Módulo: ${document.getElementById('quiz-module-title').textContent.split(': ')[1]}`;
  document.getElementById('result-score').textContent = `Você acertou ${score} de ${currentQuestions.length} questões.`;

  let message = '';
  const percentage = (score / currentQuestions.length) * 100;
  if (percentage >= 80) {
    message = 'Parabéns! Excelente desempenho! 🏆';
  } else if (percentage >= 50) {
    message = 'Muito bom! Continue praticando para melhorar. 💪';
  } else {
    message = 'Você pode melhorar! Revise as regras e tente novamente. 📚';
  }
  document.getElementById('result-message').textContent = message;

  saveResult(); // Salva o resultado do aluno
}

function resetQuiz() {
  currentModule = '';
  currentQuestions = [];
  currentQuestionIndex = 0;
  score = 0;
  selectedOption = null;
  showScreen('student-screen'); // Volta para a tela de seleção de módulos
}

// ============================================================
// GERENCIAMENTO DE RESULTADOS (PARA PROFESSOR E ALUNO)
// ============================================================

// Estrutura para armazenar resultados:
// { userId: 1, module: 'simplePast', score: 10, total: 15, date: '2026-09-15T10:00:00Z' }
let results = JSON.parse(localStorage.getItem('results')) || [];

function saveResult() {
  if (!currentUser || currentUser.role !== 'student') return; // Apenas alunos salvam resultados

  const newResult = {
    userId: currentUser.id,
    userName: currentUser.name, // Adiciona o nome do aluno para facilitar a exibição
    module: currentModule,
    score: score,
    total: currentQuestions.length,
    date: new Date().toISOString()
  };
  results.push(newResult);
  localStorage.setItem('results', JSON.stringify(results));
}

function renderStudentResults() {
  // Esta função seria para a tela de resultados do professor ou para o próprio aluno ver seu histórico
  // Por enquanto, vamos deixá-la aqui para referência.
  const resultsListDiv = document.getElementById('results-list');
  if (!resultsListDiv) return;

  const studentResults = results.filter(r => r.userId === currentUser.id);

  if (studentResults.length === 0) {
    resultsListDiv.innerHTML = '<p>Nenhum resultado registrado ainda.</p>';
    return;
  }

  resultsListDiv.innerHTML = studentResults.map(r => `
    <div class="result-item">
      <span>Módulo: ${r.module} - Pontuação: ${r.score}/${r.total} (${((r.score / r.total) * 100).toFixed(0)}%)</span>
      <span>Data: ${new Date(r.date).toLocaleDateString()} ${new Date(r.date).toLocaleTimeString()}</span>
    </div>
  `).join('');
}

// ============================================================
// BANCO DE QUESTÕES — SIMPLE PAST (150 questões)
// ============================================================

const simplePastQuestions = [

  // REGRA PRIMÁRIA — tempo específico na frase (1 a 30)
  {
    rule: "Usamos o Simple Past quando há um tempo específico na frase.",
    question: "She ___ her keys yesterday.",
    options: ["loses", "lost", "has lost", "is losing"],
    correct: 1,
    explanation: '"Yesterday" é um tempo específico, então usamos o Simple Past: "lost".'
  },
  {
    rule: "Usamos o Simple Past quando há um tempo específico na frase.",
    question: "They ___ to the beach last summer.",
    options: ["go", "have gone", "went", "are going"],
    correct: 2,
    explanation: '"Last summer" é um tempo específico no passado. Usamos "went".'
  },
  {
    rule: "Usamos o Simple Past quando há um tempo específico na frase.",
    question: "He ___ his homework two hours ago.",
    options: ["finishes", "has finished", "finished", "is finishing"],
    correct: 2,
    explanation: '"Two hours ago" indica um tempo específico no passado. Usamos "finished".'
  },
  {
    rule: "Usamos o Simple Past quando há um tempo específico na frase.",
    question: "We ___ a wonderful dinner last night.",
    options: ["have", "had", "have had", "are having"],
    correct: 1,
    explanation: '"Last night" é um tempo específico, então usamos o Simple Past: "had".'
  },
  {
    rule: "Usamos o Simple Past quando há um tempo específico na frase.",
    question: "She ___ her friend on Monday.",
    options: ["calls", "has called", "called", "is calling"],
    correct: 2,
    explanation: '"On Monday" é um tempo específico no passado. Usamos "called".'
  },
  {
    rule: "Usamos o Simple Past quando há um tempo específico na frase.",
    question: "I ___ a great book last week.",
    options: ["read", "reads", "have read", "am reading"],
    correct: 0,
    explanation: '"Last week" indica tempo específico. Usamos o Simple Past: "read" (pronunciado como "red").'
  },
  {
    rule: "Usamos o Simple Past quando há um tempo específico na frase.",
    question: "They ___ a new car in January.",
    options: ["buy", "have bought", "bought", "are buying"],
    correct: 2,
    explanation: '"In January" é um tempo específico no passado. Usamos "bought".'
  },
  {
    rule: "Usamos o Simple Past quando há um tempo específico na frase.",
    question: "He ___ to London three days ago.",
    options: ["travels", "traveled", "has traveled", "is traveling"],
    correct: 1,
    explanation: '"Three days ago" é um tempo específico. Usamos o Simple Past: "traveled".'
  },
  {
    rule: "Usamos o Simple Past quando há um tempo específico na frase.",
    question: "We ___ the game last Saturday.",
    options: ["win", "won", "have won", "are winning"],
    correct: 1,
    explanation: '"Last Saturday" é um tempo específico no passado. Usamos "won".'
  },
  {
    rule: "Usamos o Simple Past quando há um tempo específico na frase.",
    question: "She ___ her grandmother last Sunday.",
    options: ["visits", "has visited", "visited", "is visiting"],
    correct: 2,
    explanation: '"Last Sunday" indica tempo específico. Usamos o Simple Past: "visited".'
  },
  {
    rule: "Usamos o Simple Past quando há um tempo específico na frase.",
    question: "I ___ my bike yesterday afternoon.",
    options: ["fix", "fixed", "have fixed", "am fixing"],
    correct: 1,
    explanation: '"Yesterday afternoon" é um tempo específico no passado. Usamos "fixed".'
  },
  {
    rule: "Usamos o Simple Past quando há um tempo específico na frase.",
    question: "They ___ pizza for dinner last Friday.",
    options: ["eat", "have eaten", "ate", "are eating"],
    correct: 2,
    explanation: '"Last Friday" é um tempo específico. Usamos o Simple Past: "ate".'
  },
  {
    rule: "Usamos o Simple Past quando há um tempo específico na frase.",
    question: "He ___ the report at 9 a.m. this morning.",
    options: ["sends", "sent", "has sent", "is sending"],
    correct: 1,
    explanation: '"At 9 a.m. this morning" é um tempo específico já concluído. Usamos "sent".'
  },
  {
    rule: "Usamos o Simple Past quando há um tempo específico na frase.",
    question: "She ___ her driving test last month.",
    options: ["passes", "passed", "has passed", "is passing"],
    correct: 1,
    explanation: '"Last month" é um tempo específico no passado. Usamos "passed".'
  },
  {
    rule: "Usamos o Simple Past quando há um tempo específico na frase.",
    question: "We ___ our new neighbors two weeks ago.",
    options: ["meet", "met", "have met", "are meeting"],
    correct: 1,
    explanation: '"Two weeks ago" é um tempo específico. Usamos o Simple Past: "met".'
  },
  {
    rule: "Usamos o Simple Past quando há um tempo específico na frase.",
    question: "I ___ at the gym yesterday morning.",
    options: ["work out", "worked out", "have worked out", "am working out"],
    correct: 1,
    explanation: '"Yesterday morning" é um tempo específico no passado. Usamos "worked out".'
  },
  {
    rule: "Usamos o Simple Past quando há um tempo específico na frase.",
    question: "He ___ his presentation last Tuesday.",
    options: ["gives", "gave", "has given", "is giving"],
    correct: 1,
    explanation: '"Last Tuesday" é um tempo específico. Usamos o Simple Past: "gave".'
  },
  {
    rule: "Usamos o Simple Past quando há um tempo específico na frase.",
    question: "They ___ the project deadline last Thursday.",
    options: ["miss", "missed", "have missed", "are missing"],
    correct: 1,
    explanation: '"Last Thursday" indica tempo específico no passado. Usamos "missed".'
  },
  {
    rule: "Usamos o Simple Past quando há um tempo específico na frase.",
    question: "She ___ a letter to her cousin in 2022.",
    options: ["writes", "wrote", "has written", "is writing"],
    correct: 1,
    explanation: '"In 2022" é um tempo específico no passado. Usamos "wrote".'
  },
  {
    rule: "Usamos o Simple Past quando há um tempo específico na frase.",
    question: "We ___ the museum last holiday.",
    options: ["visit", "visited", "have visited", "are visiting"],
    correct: 1,
    explanation: '"Last holiday" é um tempo específico. Usamos o Simple Past: "visited".'
  },
  {
    rule: "Usamos o Simple Past quando há um tempo específico na frase.",
    question: "He ___ soccer with his friends on Saturday.",
    options: ["plays", "played", "has played", "is playing"],
    correct: 1,
    explanation: '"On Saturday" é um tempo específico no passado. Usamos "played".'
  },
  {
    rule: "Usamos o Simple Past quando há um tempo específico na frase.",
    question: "I ___ my wallet at the restaurant yesterday.",
    options: ["forget", "forgot", "have forgotten", "am forgetting"],
    correct: 1,
    explanation: '"Yesterday" é um tempo específico. Usamos o Simple Past: "forgot".'
  },
  {
    rule: "Usamos o Simple Past quando há um tempo específico na frase.",
    question: "She ___ her ankle during the race last week.",
    options: ["twists", "twisted", "has twisted", "is twisting"],
    correct: 1,
    explanation: '"Last week" é um tempo específico no passado. Usamos "twisted".'
  },
  {
    rule: "Usamos o Simple Past quando há um tempo específico na frase.",
    question: "They ___ a surprise party for him last night.",
    options: ["organize", "organized", "have organized", "are organizing"],
    correct: 1,
    explanation: '"Last night" é um tempo específico. Usamos o Simple Past: "organized".'
  },
  {
    rule: "Usamos o Simple Past quando há um tempo específico na frase.",
    question: "He ___ the contract yesterday afternoon.",
    options: ["signs", "signed", "has signed", "is signing"],
    correct: 1,
    explanation: '"Yesterday afternoon" é um tempo específico no passado. Usamos "signed".'
  },
  {
    rule: "Usamos o Simple Past quando há um tempo específico na frase.",
    question: "We ___ a lot of fun at the party last weekend.",
    options: ["have", "had", "have had", "are having"],
    correct: 1,
    explanation: '"Last weekend" é um tempo específico. Usamos o Simple Past: "had".'
  },
  {
    rule: "Usamos o Simple Past quando há um tempo específico na frase.",
    question: "She ___ her boss an email this morning.",
    options: ["sends", "sent", "has sent", "is sending"],
    correct: 1,
    explanation: '"This morning" referindo-se a um momento já concluído indica Simple Past. Usamos "sent".'
  },
  {
    rule: "Usamos o Simple Past quando há um tempo específico na frase.",
    question: "I ___ to the dentist last Monday.",
    options: ["go", "went", "have gone", "am going"],
    correct: 1,
    explanation: '"Last Monday" é um tempo específico no passado. Usamos "went".'
  },
  {
    rule: "Usamos o Simple Past quando há um tempo específico na frase.",
    question: "They ___ the wrong bus yesterday.",
    options: ["take", "took", "have taken", "are taking"],
    correct: 1,
    explanation: '"Yesterday" é um tempo específico. Usamos o Simple Past: "took".'
  },
  {
    rule: "Usamos o Simple Past quando há um tempo específico na frase.",
    question: "He ___ his phone on the train last night.",
    options: ["loses", "lost", "has lost", "is losing"],
    correct: 1,
    explanation: '"Last night" é um tempo específico no passado. Usamos "lost".'
  },

  // REGRA SECUNDÁRIA — passado distante que já acabou completamente (31 a 40)
  {
    rule: "O Simple Past também é usado para fatos passados distantes que já acabaram completamente.",
    question: "Albert Einstein ___ the theory of relativity.",
    options: ["develops", "developed", "has developed", "is developing"],
    correct: 1,
    explanation: "Einstein já faleceu e o fato está completamente no passado. Usamos \"developed\"."
  },
  {
    rule: "O Simple Past também é usado para fatos passados distantes que já acabaram completamente.",
    question: "The Romans ___ a vast empire.",
    options: ["build", "built", "have built", "are building"],
    correct: 1,
    explanation: "O Império Romano já acabou completamente. Usamos o Simple Past: \"built\"."
  },
  {
    rule: "O Simple Past também é usado para fatos passados distantes que já acabaram completamente.",
    question: "Shakespeare ___ many famous plays.",
    options: ["writes", "wrote", "has written", "is writing"],
    correct: 1,
    explanation: "Shakespeare já faleceu e sua obra pertence completamente ao passado. Usamos \"wrote\"."
  },
  {
    rule: "O Simple Past também é usado para fatos passados distantes que já acabaram completamente.",
    question: "Neil Armstrong ___ on the moon in 1969.",
    options: ["walks", "walked", "has walked", "is walking"],
    correct: 1,
    explanation: "O evento está completamente no passado e há um tempo específico. Usamos \"walked\"."
  },
  {
    rule: "O Simple Past também é usado para fatos passados distantes que já acabaram completamente.",
    question: "The dinosaurs ___ millions of years ago.",
    options: ["disappear", "disappeared", "have disappeared", "are disappearing"],
    correct: 1,
    explanation: "O desaparecimento dos dinossauros é um fato completamente no passado. Usamos \"disappeared\"."
  },
  {
    rule: "O Simple Past também é usado para fatos passados distantes que já acabaram completamente.",
    question: "Beethoven ___ nine symphonies.",
    options: ["composes", "composed", "has composed", "is composing"],
    correct: 1,
    explanation: "Beethoven já faleceu e sua obra está completamente no passado. Usamos \"composed\"."
  },
  {
    rule: "O Simple Past também é usado para fatos passados distantes que já acabaram completamente.",
    question: "The Berlin Wall ___ in 1989.",
    options: ["falls", "fell", "has fallen", "is falling"],
    correct: 1,
    explanation: "O evento está completamente no passado com um tempo específico. Usamos \"fell\"."
  },
  {
    rule: "O Simple Past também é usado para fatos passados distantes que já acabaram completamente.",
    question: "Christopher Columbus ___ America in 1492.",
    options: ["discovers", "discovered", "has discovered", "is discovering"],
    correct: 1,
    explanation: "O evento está completamente no passado. Usamos o Simple Past: \"discovered\"."
  },
  {
    rule: "O Simple Past também é usado para fatos passados distantes que já acabaram completamente.",
    question: "The Wright brothers ___ the first airplane.",
    options: ["invent", "invented", "have invented", "are inventing"],
    correct: 1,
    explanation: "Os irmãos Wright já faleceram e o fato está completamente no passado. Usamos \"invented\"."
  },
  {
    rule: "O Simple Past também é usado para fatos passados distantes que já acabaram completamente.",
    question: "Ancient Egyptians ___ the pyramids.",
    options: ["build", "built", "have built", "are building"],
    correct: 1,
    explanation: "A construção das pirâmides é um fato completamente no passado. Usamos \"built\"."
  },

  // SIMPLE PAST DO TO BE — WAS / WERE (41 a 50)
  {
    rule: "Simple Past do To Be: WAS (I, he, she, it) / WERE (you, we, they e plurais).",
    question: "The movie ___ really boring.",
    options: ["were", "is", "was", "has been"],
    correct: 2,
    explanation: '"The movie" equivale a "it", então usamos "was". O To Be aqui se traduz como "era/estava".'
  },
  {
    rule: "Simple Past do To Be: WAS (I, he, she, it) / WERE (you, we, they e plurais).",
    question: "The students ___ very excited about the trip.",
    options: ["was", "is", "were", "has been"],
    correct: 2,
    explanation: '"The students" é plural, então usamos "were".'
  },
  {
    rule: "Simple Past do To Be: WAS (I, he, she, it) / WERE (you, we, they e plurais).",
    question: "I ___ very nervous before the exam.",
    options: ["were", "was", "am", "have been"],
    correct: 1,
    explanation: '"I" sempre usa "was" no Simple Past do To Be.'
  },
  {
    rule: "Simple Past do To Be: WAS (I, he, she, it) / WERE (you, we, they e plurais).",
    question: "You ___ right about the answer.",
    options: ["was", "is", "were", "has been"],
    correct: 2,
    explanation: '"You" sempre usa "were" no Simple Past do To Be, seja singular ou plural.'
  },
  {
    rule: "Simple Past do To Be: WAS (I, he, she, it) / WERE (you, we, they e plurais).",
    question: "The food at the restaurant ___ delicious.",
    options: ["were", "was", "is", "have been"],
    correct: 1,
    explanation: '"The food" equivale a "it", então usamos "was". Aqui o To Be se traduz como "estava".'
  },
  {
    rule: "Simple Past do To Be: WAS (I, he, she, it) / WERE (you, we, they e plurais).",
    question: "We ___ late for the meeting yesterday.",
    options: ["was", "is", "were", "has been"],
    correct: 2,
    explanation: '"We" usa "were" no Simple Past do To Be.'
  },
  {
    rule: "Simple Past do To Be: WAS (I, he, she, it) / WERE (you, we, they e plurais).",
    question: "She ___ a brilliant student in high school.",
    options: ["were", "is", "was", "has been"],
    correct: 2,
    explanation: '"She" usa "was" no Simple Past do To Be. Aqui se traduz como "era".'
  },
  {
    rule: "Simple Past do To Be: WAS (I, he, she, it) / WERE (you, we, they e plurais).",
    question: "The roads ___ very dangerous during the storm.",
    options: ["was", "is", "were", "has been"],
    correct: 2,
    explanation: '"The roads" é plural, então usamos "weren\'t". Aqui o To Be se traduz como "estavam".'
  },
  {
    rule: "Simple Past do To Be: WAS (I, he, she, it) / WERE (you, we, they e plurais).",
    question: "He ___ the best player on the team.",
    options: ["were", "are", "was", "has been"],
    correct: 2,
    explanation: '"He" usa "was" no Simple Past do To Be. Aqui se traduz como "era".'
  },
  {
    rule: "Simple Past do To Be: WAS (I, he, she, it) / WERE (you, we, they e plurais).",
    question: "They ___ happy with the results.",
    options: ["was", "is", "were", "has been"],
    correct: 2,
    explanation: '"They" usa "were" no Simple Past do To Be.'
  },

  // NEGATIVA DO SIMPLE PAST — did not / didn't (51 a 80)
  {
    rule: "Na negativa do Simple Past usamos 'didn't' (did not) + verbo no infinitivo para todos os sujeitos.",
    question: "She ___ to the party last night.",
    options: ["didn't went", "didn't go", "doesn't go", "wasn't go"],
    correct: 1,
    explanation: 'Na negativa do Simple Past usamos "didn\'t" + infinitivo. O correto é "didn\'t go", nunca "didn\'t went".'
  },
  {
    rule: "Na negativa do Simple Past usamos 'didn't' (did not) + verbo no infinitivo para todos os sujeitos.",
    question: "They ___ the game last Saturday.",
    options: ["didn't won", "doesn't win", "didn't win", "weren't win"],
    correct: 2,
    explanation: 'Na negativa do Simple Past usamos "didn\'t" + infinitivo. O correto é "didn\'t win".'
  },
  {
    rule: "Na negativa do Simple Past usamos 'didn't' (did not) + verbo no infinitivo para todos os sujeitos.",
    question: "He ___ his homework yesterday.",
    options: ["doesn't do", "didn't did", "wasn't do", "didn't do"],
    correct: 3,
    explanation: 'Na negativa do Simple Past usamos "didn\'t" + infinitivo. O correto é "didn\'t do".'
  },
  {
    rule: "Na negativa do Simple Past usamos 'didn't' (did not) + verbo no infinitivo para todos os sujeitos.",
    question: "I ___ breakfast this morning.",
    options: ["didn't ate", "doesn't eat", "didn't eat", "wasn't eat"],
    correct: 2,
    explanation: 'Na negativa do Simple Past usamos "didn\'t" + infinitivo. O correto é "didn\'t eat".'
  },
  {
    rule: "Na negativa do Simple Past usamos 'didn't' (did not) + verbo no infinitivo para todos os sujeitos.",
    question: "We ___ the movie last weekend.",
    options: ["didn't saw", "doesn't see", "wasn't see", "didn't see"],
    correct: 3,
    explanation: 'Na negativa do Simple Past usamos "didn\'t" + infinitivo. O correto é "didn\'t see".'
  },
  {
    rule: "Na negativa do Simple Past usamos 'didn't' (did not) + verbo no infinitivo para todos os sujeitos.",
    question: "She ___ her keys at home yesterday.",
    options: ["didn't leave", "didn't left", "doesn't leave", "wasn't leave"],
    correct: 0,
    explanation: 'Na negativa do Simple Past usamos "didn\'t" + infinitivo. O correto é "didn\'t leave".'
  },
  {
    rule: "Na negativa do Simple Past usamos 'didn't' (did not) + verbo no infinitivo para todos os sujeitos.",
    question: "He ___ to work last Monday.",
    options: ["didn't came", "doesn't come", "didn't come", "wasn't come"],
    correct: 2,
    explanation: 'Na negativa do Simple Past usamos "didn\'t" + infinitivo. O correto é "didn\'t come".'
  },
  {
    rule: "Na negativa do Simple Past usamos 'didn't' (did not) + verbo no infinitivo para todos os sujeitos.",
    question: "They ___ the contract last week.",
    options: ["didn't signed", "doesn't sign", "wasn't sign", "didn't sign"],
    correct: 3,
    explanation: 'Na negativa do Simple Past usamos "didn\'t" + infinitivo. O correto é "didn\'t sign".'
  },
  {
    rule: "Na negativa do Simple Past usamos 'didn't' (did not) + verbo no infinitivo para todos os sujeitos.",
    question: "I ___ you at the meeting yesterday.",
    options: ["didn't saw", "didn't see", "doesn't see", "wasn't see"],
    correct: 1,
    explanation: 'Na negativa do Simple Past usamos "didn\'t" + infinitivo. O correto é "didn\'t see".'
  },
  {
    rule: "Na negativa do Simple Past usamos 'didn't' (did not) + verbo no infinitivo para todos os sujeitos.",
    question: "We ___ enough time to finish the project last month.",
    options: ["didn't had", "doesn't have", "didn't have", "weren't have"],
    correct: 2,
    explanation: 'Na negativa do Simple Past usamos "didn\'t" + infinitivo. O correto é "didn\'t have".'
  },
  {
    rule: "Na negativa do Simple Past usamos 'didn't' (did not) + verbo no infinitivo para todos os sujeitos.",
    question: "She ___ the email before the deadline yesterday.",
    options: ["didn't sent", "doesn't send", "wasn't send", "didn't send"],
    correct: 3,
    explanation: 'Na negativa do Simple Past usamos "didn\'t" + infinitivo. O correto é "didn\'t send".'
  },
  {
    rule: "Na negativa do Simple Past usamos 'didn't' (did not) + verbo no infinitivo para todos os sujeitos.",
    question: "He ___ the truth about what happened.",
    options: ["didn't told", "didn't tell", "doesn't tell", "wasn't tell"],
    correct: 1,
    explanation: 'Na negativa do Simple Past usamos "didn\'t" + infinitivo. O correto é "didn\'t tell".'
  },
  {
    rule: "Na negativa do Simple Past usamos 'didn't' (did not) + verbo no infinitivo para todos os sujeitos.",
    question: "They ___ to the concert last Friday.",
    options: ["didn't went", "doesn't go", "didn't go", "weren't go"],
    correct: 2,
    explanation: 'Na negativa do Simple Past usamos "didn\'t" + infinitivo. O correto é "didn\'t go".'
  },
  {
    rule: "Na negativa do Simple Past usamos 'didn't' (did not) + verbo no infinitivo para todos os sujeitos.",
    question: "I ___ my phone on the table last night.",
    options: ["didn't left", "doesn't leave", "wasn't leave", "didn't leave"],
    correct: 3,
    explanation: 'Na negativa do Simple Past usamos "didn\'t" + infinitivo. O correto é "didn\'t leave".'
  },
  {
    rule: "Na negativa do Simple Past usamos 'didn't' (did not) + verbo no infinitivo para todos os sujeitos.",
    question: "She ___ her presentation well last week.",
    options: ["didn't prepared", "didn't prepare", "doesn't prepare", "wasn't prepare"],
    correct: 1,
    explanation: 'Na negativa do Simple Past usamos "didn\'t" + infinitivo. O correto é "didn\'t prepare".'
  },
  {
    rule: "Na negativa do Simple Past usamos 'didn't' (did not) + verbo no infinitivo para todos os sujeitos.",
    question: "He ___ his old friends at the reunion last year.",
    options: ["didn't recognized", "doesn't recognize", "didn't recognize", "wasn't recognize"],
    correct: 2,
    explanation: 'Na negativa do Simple Past usamos "didn\'t" + infinitivo. O correto é "didn\'t recognize".'
  },
  {
    rule: "Na negativa do Simple Past usamos 'didn't' (did not) + verbo no infinitivo para todos os sujeitos.",
    question: "We ___ the bus this morning.",
    options: ["didn't caught", "doesn't catch", "wasn't catch", "didn't catch"],
    correct: 3,
    explanation: 'Na negativa do Simple Past usamos "didn\'t" + infinitivo. O correto é "didn\'t catch".'
  },
  {
    rule: "Na negativa do Simple Past usamos 'didn't' (did not) + verbo no infinitivo para todos os sujeitos.",
    question: "They ___ anything at the restaurant last night.",
    options: ["didn't ordered", "didn't order", "doesn't order", "weren't order"],
    correct: 1,
    explanation: 'Na negativa do Simple Past usamos "didn\'t" + infinitivo. O correto é "didn\'t order".'
  },
  {
    rule: "Na negativa do Simple Past usamos 'didn't' (did not) + verbo no infinitivo para todos os sujeitos.",
    question: "I ___ to finish the report yesterday.",
    options: ["didn't managed", "doesn't manage", "didn't manage", "wasn't manage"],
    correct: 2,
    explanation: 'Na negativa do Simple Past usamos "didn\'t" + infinitivo. O correto é "didn\'t manage".'
  },
  {
    rule: "Na negativa do Simple Past usamos 'didn't' (did not) + verbo no infinitivo para todos os sujeitos.",
    question: "She ___ her medicine last night.",
    options: ["didn't took", "doesn't take", "wasn't take", "didn't take"],
    correct: 3,
    explanation: 'Na negativa do Simple Past usamos "didn\'t" + infinitivo. O correto é "didn\'t take".'
  },
  {
    rule: "Na negativa do Simple Past usamos 'didn't' (did not) + verbo no infinitivo para todos os sujeitos.",
    question: "He ___ his boss about the problem last week.",
    options: ["didn't told", "didn't tell", "doesn't tell", "wasn't tell"],
    correct: 1,
    explanation: 'Na negativa do Simple Past usamos "didn\'t" + infinitivo. O correto é "didn\'t tell".'
  },
  {
    rule: "Na negativa do Simple Past usamos 'didn't' (did not) + verbo no infinitivo para todos os sujeitos.",
    question: "We ___ the new shopping mall last weekend.",
    options: ["didn't visited", "doesn't visit", "didn't visit", "weren't visit"],
    correct: 2,
    explanation: 'Na negativa do Simple Past usamos "didn\'t" + infinitivo. O correto é "didn\'t visit".'
  },
  {
    rule: "Na negativa do Simple Past usamos 'didn't' (did not) + verbo no infinitivo para todos os sujeitos.",
    question: "They ___ enough sleep last night.",
    options: ["didn't got", "doesn't get", "wasn't get", "didn't get"],
    correct: 3,
    explanation: 'Na negativa do Simple Past usamos "didn\'t" + infinitivo. O correto é "didn\'t get".'
  },
  {
    rule: "Na negativa do Simple Past usamos 'didn't' (did not) + verbo no infinitivo para todos os sujeitos.",
    question: "I ___ what she said at the meeting yesterday.",
    options: ["didn't understood", "didn't understand", "doesn't understand", "wasn't understand"],
    correct: 1,
    explanation: 'Na negativa do Simple Past usamos "didn\'t" + infinitivo. O correto é "didn\'t understand".'
  },
  {
    rule: "Na negativa do Simple Past usamos 'didn't' (did not) + verbo no infinitivo para todos os sujeitos.",
    question: "She ___ her friends to her birthday party last year.",
    options: ["didn't invited", "doesn't invite", "didn't invite", "wasn't invite"],
    correct: 2,
    explanation: 'Na negativa do Simple Past usamos "didn\'t" + infinitivo. O correto é "didn\'t invite".'
  },
  {
    rule: "Na negativa do Simple Past usamos 'didn't' (did not) + verbo no infinitivo para todos os sujeitos.",
    question: "He ___ his car to work last Monday.",
    options: ["didn't drove", "doesn't drive", "wasn't drive", "didn't drive"],
    correct: 3,
    explanation: 'Na negativa do Simple Past usamos "didn\'t" + infinitivo. O correto é "didn\'t drive".'
  },
  {
    rule: "Na negativa do Simple Past usamos 'didn't' (did not) + verbo no infinitivo para todos os sujeitos.",
    question: "We ___ the instructions carefully last time.",
    options: ["didn't readed", "didn't read", "doesn't read", "weren't read"],
    correct: 1,
    explanation: 'Na negativa do Simple Past usamos "didn\'t" + infinitivo. O correto é "didn\'t read".'
  },
  {
    rule: "Na negativa do Simple Past usamos 'didn't' (did not) + verbo no infinitivo para todos os sujeitos.",
    question: "They ___ the deadline last Thursday.",
    options: ["didn't met", "doesn't meet", "didn't meet", "weren't meet"],
    correct: 2,
    explanation: 'Na negativa do Simple Past usamos "didn\'t" + infinitivo. O correto é "didn\'t meet".'
  },
  {
    rule: "Na negativa do Simple Past usamos 'didn't' (did not) + verbo no infinitivo para todos os sujeitos.",
    question: "I ___ my wallet at home this morning.",
    options: ["didn't forgot", "doesn't forget", "wasn't forget", "didn't forget"],
    correct: 3,
    explanation: 'Na negativa do Simple Past usamos "didn\'t" + infinitivo. O correto é "didn\'t forget".'
  },
  {
    rule: "Na negativa do Simple Past usamos 'didn't' (did not) + verbo no infinitivo para todos os sujeitos.",
    question: "She ___ to music while studying last night.",
    options: ["didn't listened", "didn't listen", "doesn't listen", "wasn't listen"],
    correct: 1,
    explanation: 'Na negativa do Simple Past usamos "didn\'t" + infinitivo. O correto é "didn\'t listen".'
  },

  // NEGATIVA DO SIMPLE PAST COM TO BE — wasn't / weren't (81 a 100)
  {
    rule: "Na negativa do Simple Past do verbo To Be usamos 'wasn't' (I, he, she, it) ou 'weren't' (you, we, they).",
    question: "The weather ___ nice last weekend.",
    options: ["didn't be", "weren't", "wasn't", "doesn't be"],
    correct: 2,
    explanation: '"The weather" equivale a "it", então usamos "wasn\'t". Nunca usamos "didn\'t" com o verbo To Be.'
  },
  {
    rule: "Na negativa do Simple Past do verbo To Be usamos 'wasn't' (I, he, she, it) ou 'weren't' (you, we, they).",
    question: "The students ___ ready for the exam.",
    options: ["wasn't", "didn't be", "weren't", "doesn't be"],
    correct: 2,
    explanation: '"The students" é plural, então usamos "weren\'t".'
  },
  {
    rule: "Na negativa do Simple Past do verbo To Be usamos 'wasn't' (I, he, she, it) ou 'weren't' (you, we, they).",
    question: "I ___ at home when you called.",
    options: ["weren't", "didn't be", "wasn't", "doesn't be"],
    correct: 2,
    explanation: '"I" usa "wasn\'t" na negativa do Simple Past do To Be.'
  },
  {
    rule: "Na negativa do Simple Past do verbo To Be usamos 'wasn't' (I, he, she, it) ou 'weren't' (you, we, they).",
    question: "You ___ at the meeting yesterday.",
    options: ["wasn't", "didn't be", "weren't", "doesn't be"],
    correct: 2,
    explanation: '"You" usa "weren\'t" na negativa do Simple Past do To Be.'
  },
  {
    rule: "Na negativa do Simple Past do verbo To Be usamos 'wasn't' (I, he, she, it) ou 'weren't' (you, we, they).",
    question: "The food at the event ___ very good.",
    options: ["weren't", "didn't be", "wasn't", "doesn't be"],
    correct: 2,
    explanation: '"The food" equivale a "it", então usamos "wasn\'t".'
  },
  {
    rule: "Na negativa do Simple Past do verbo To Be usamos 'wasn't' (I, he, she, it) ou 'weren't' (you, we, they).",
    question: "We ___ happy with the results.",
    options: ["wasn't", "didn't be", "weren't", "doesn't be"],
    correct: 2,
    explanation: '"We" usa "weren\'t" na negativa do Simple Past do To Be.'
  },
  {
    rule: "Na negativa do Simple Past do verbo To Be usamos 'wasn't' (I, he, she, it) ou 'weren't' (you, we, they).",
    question: "She ___ aware of the problem.",
    options: ["weren't", "didn't be", "wasn't", "doesn't be"],
    correct: 2,
    explanation: '"She" usa "wasn\'t" na negativa do Simple Past do To Be.'
  },
  {
    rule: "Na negativa do Simple Past do verbo To Be usamos 'wasn't' (I, he, she, it) ou 'weren't' (you, we, they).",
    question: "The prices ___ affordable at that store.",
    options: ["wasn't", "didn't be", "weren't", "doesn't be"],
    correct: 2,
    explanation: '"The prices" é plural, então usamos "weren\'t".'
  },
  {
    rule: "Na negativa do Simple Past do verbo To Be usamos 'wasn't' (I, he, she, it) ou 'weren't' (you, we, they).",
    question: "He ___ confident during the presentation.",
    options: ["weren't", "didn't be", "wasn't", "doesn't be"],
    correct: 2,
    explanation: '"He" usa "wasn\'t" na negativa do Simple Past do To Be.'
  },
  {
    rule: "Na negativa do Simple Past do verbo To Be usamos 'wasn't' (I, he, she, it) ou 'weren't' (you, we, they).",
    question: "They ___ interested in the proposal.",
    options: ["wasn't", "didn't be", "weren't", "doesn't be"],
    correct: 2,
    explanation: '"They" usa "weren\'t" na negativa do Simple Past do To Be.'
  },
  {
    rule: "Na negativa do Simple Past do verbo To Be usamos 'wasn't' (I, he, she, it) ou 'weren't' (you, we, they).",
    question: "The concert ___ as good as I expected.",
    options: ["weren't", "didn't be", "wasn't", "doesn't be"],
    correct: 2,
    explanation: '"The concert" equivale a "it", então usamos "wasn\'t".'
  },
  {
    rule: "Na negativa do Simple Past do verbo To Be usamos 'wasn't' (I, he, she, it) ou 'weren't' (you, we, they).",
    question: "My parents ___ home when I arrived.",
    options: ["wasn't", "didn't be", "weren't", "doesn't be"],
    correct: 2,
    explanation: '"My parents" é plural, então usamos "weren\'t".'
  },
  {
    rule: "Na negativa do Simple Past do verbo To Be usamos 'wasn't' (I, he, she, it) ou 'weren't' (you, we, they).",
    question: "It ___ cold enough to snow last winter.",
    options: ["weren't", "didn't be", "wasn't", "doesn't be"],
    correct: 2,
    explanation: '"It" usa "wasn\'t" na negativa do Simple Past do To Be.'
  },
  {
    rule: "Na negativa do Simple Past do verbo To Be usamos 'wasn't' (I, he, she, it) ou 'weren't' (you, we, they).",
    question: "The instructions ___ clear enough.",
    options: ["wasn't", "didn't be", "weren't", "doesn't be"],
    correct: 2,
    explanation: '"The instructions" é plural, então usamos "weren\'t".'
  },
  {
    rule: "Na negativa do Simple Past do verbo To Be usamos 'wasn't' (I, he, she, it) ou 'weren't' (you, we, they).",
    question: "She ___ prepared for the interview.",
    options: ["weren't", "didn't be", "wasn't", "doesn't be"],
    correct: 2,
    explanation: '"She" usa "wasn\'t" na negativa do Simple Past do To Be.'
  },
  {
    rule: "Na negativa do Simple Past do verbo To Be usamos 'wasn't' (I, he, she, it) ou 'weren't' (you, we, they).",
    question: "The team ___ satisfied with the coach's decision.",
    options: ["wasn't", "didn't be", "weren't", "doesn't be"],
    correct: 2,
    explanation: '"The team" pode ser tratado como singular. Usamos "wasn\'t".'
  },
  {
    rule: "Na negativa do Simple Past do verbo To Be usamos 'wasn't' (I, he, she, it) ou 'weren't' (you, we, they).",
    question: "I ___ in the mood to go out last Friday.",
    options: ["weren't", "didn't be", "wasn't", "doesn't be"],
    correct: 2,
    explanation: '"I" usa "wasn\'t" na negativa do Simple Past do To Be.'
  },
  {
    rule: "Na negativa do Simple Past do verbo To Be usamos 'wasn't' (I, he, she, it) ou 'weren't' (you, we, they).",
    question: "The children ___ tired after the nap.",
    options: ["wasn't", "didn't be", "weren't", "doesn't be"],
    correct: 2,
    explanation: '"The children" é plural, então usamos "weren\'t".'
  },
  {
    rule: "Na negativa do Simple Past do verbo To Be usamos 'wasn't' (I, he, she, it) ou 'weren't' (you, we, they).",
    question: "He ___ aware that the meeting had been cancelled.",
    options: ["weren't", "didn't be", "wasn't", "doesn't be"],
    correct: 2,
    explanation: '"He" usa "wasn\'t" na negativa do Simple Past do To Be.'
  },
  {
    rule: "Na negativa do Simple Past do verbo To Be usamos 'wasn't' (I, he, she, it) ou 'weren't' (you, we, they).",
    question: "You ___ very focused during the class yesterday.",
    options: ["wasn't", "didn't be", "weren't", "doesn't be"],
    correct: 2,
    explanation: '"You" usa "weren\'t" na negativa do Simple Past do To Be.'
  },

  // INTERROGATIVA DO SIMPLE PAST — did (101 a 130)
  {
    rule: "Na interrogativa do Simple Past usamos 'Did' + sujeito + verbo no infinitivo para todos os sujeitos.",
    question: "___ she go to the party last night?",
    options: ["Was she go", "Did she went", "Did she go", "Does she go"],
    correct: 2,
    explanation: 'Na interrogativa do Simple Past usamos "Did" + sujeito + infinitivo. O correto é "Did she go", nunca "Did she went".'
  },
  {
    rule: "Na interrogativa do Simple Past usamos 'Did' + sujeito + verbo no infinitivo para todos os sujeitos.",
    question: "___ they win the championship last year?",
    options: ["Were they win", "Did they won", "Does they win", "Did they win"],
    correct: 3,
    explanation: 'Na interrogativa do Simple Past usamos "Did" + sujeito + infinitivo. O correto é "Did they win".'
  },
  {
    rule: "Na interrogativa do Simple Past usamos 'Did' + sujeito + verbo no infinitivo para todos os sujeitos.",
    question: "___ he finish his homework yesterday?",
    options: ["Did he finished", "Was he finish", "Did he finish", "Does he finish"],
    correct: 2,
    explanation: 'Na interrogativa do Simple Past usamos "Did" + sujeito + infinitivo. O correto é "Did he finish".'
  },
  {
    rule: "Na interrogativa do Simple Past usamos 'Did' + sujeito + verbo no infinitivo para todos os sujeitos.",
    question: "___ you eat breakfast this morning?",
    options: ["Were you eat", "Did you ate", "Does you eat", "Did you eat"],
    correct: 3,
    explanation: 'Na interrogativa do Simple Past usamos "Did" + sujeito + infinitivo. O correto é "Did you eat".'
  },
  {
    rule: "Na interrogativa do Simple Past usamos 'Did' + sujeito + verbo no infinitivo para todos os sujeitos.",
    question: "___ we lock the door before leaving?",
    options: ["Did we locked", "Were we lock", "Did we lock", "Does we lock"],
    correct: 2,
    explanation: 'Na interrogativa do Simple Past usamos "Did" + sujeito + infinitivo. O correto é "Did we lock".'
  },
  {
    rule: "Na interrogativa do Simple Past usamos 'Did' + sujeito + verbo no infinitivo para todos os sujeitos.",
    question: "___ she call you last night?",
    options: ["Did she called", "Was she call", "Does she call", "Did she call"],
    correct: 3,
    explanation: 'Na interrogativa do Simple Past usamos "Did" + sujeito + infinitivo. O correto é "Did she call".'
  },
  {
    rule: "Na interrogativa do Simple Past usamos 'Did' + sujeito + verbo no infinitivo para todos os sujeitos.",
    question: "___ he tell you the truth?",
    options: ["Did he told", "Was he tell", "Did he tell", "Does he tell"],
    correct: 2,
    explanation: 'Na interrogativa do Simple Past usamos "Did" + sujeito + infinitivo. O correto é "Did he tell".'
  },
  {
    rule: "Na interrogativa do Simple Past usamos 'Did' + sujeito + verbo no infinitivo para todos os sujeitos.",
    question: "___ they arrive on time yesterday?",
    options: ["Were they arrive", "Did they arrived", "Does they arrive", "Did they arrive"],
    correct: 3,
    explanation: 'Na interrogativa do Simple Past usamos "Did" + sujeito + infinitivo. O correto é "Did they arrive".'
  },
  {
    rule: "Na interrogativa do Simple Past usamos 'Did' + sujeito + verbo no infinitivo para todos os sujeitos.",
    question: "___ you see that movie last weekend?",
    options: ["Did you saw", "Were you see", "Did you see", "Does you see"],
    correct: 2,
    explanation: 'Na interrogativa do Simple Past usamos "Did" + sujeito + infinitivo. O correto é "Did you see".'
  },
  {
    rule: "Na interrogativa do Simple Past usamos 'Did' + sujeito + verbo no infinitivo para todos os sujeitos.",
    question: "___ she pass her driving test last month?",
    options: ["Did she passed", "Was she pass", "Does she pass", "Did she pass"],
    correct: 3,
    explanation: 'Na interrogativa do Simple Past usamos "Did" + sujeito + infinitivo. O correto é "Did she pass".'
  },
  {
    rule: "Na interrogativa do Simple Past usamos 'Did' + sujeito + verbo no infinitivo para todos os sujeitos.",
    question: "___ he send the email before the deadline?",
    options: ["Did he sent", "Was he send", "Did he send", "Does he send"],
    correct: 2,
    explanation: 'Na interrogativa do Simple Past usamos "Did" + sujeito + infinitivo. O correto é "Did he send".'
  },
  {
    rule: "Na interrogativa do Simple Past usamos 'Did' + sujeito + verbo no infinitivo para todos os sujeitos.",
    question: "___ they enjoy the concert last Friday?",
    options: ["Were they enjoy", "Did they enjoyed", "Does they enjoy", "Did they enjoy"],
    correct: 3,
    explanation: 'Na interrogativa do Simple Past usamos "Did" + sujeito + infinitivo. O correto é "Did they enjoy".'
  },
  {
    rule: "Na interrogativa do Simple Past usamos 'Did' + sujeito + verbo no infinitivo para todos os sujeitos.",
    question: "___ you understand the instructions?",
    options: ["Did you understood", "Were you understand", "Did you understand", "Does you understand"],
    correct: 2,
    explanation: 'Na interrogativa do Simple Past usamos "Did" + sujeito + infinitivo. O correto é "Did you understand".'
  },
  {
    rule: "Na interrogativa do Simple Past usamos 'Did' + sujeito + verbo no infinitivo para todos os sujeitos.",
    question: "___ she meet her new colleagues yesterday?",
    options: ["Did she met", "Was she meet", "Does she meet", "Did she meet"],
    correct: 3,
    explanation: 'Na interrogativa do Simple Past usamos "Did" + sujeito + infinitivo. O correto é "Did she meet".'
  },
  {
    rule: "Na interrogativa do Simple Past usamos 'Did' + sujeito + verbo no infinitivo para todos os sujeitos.",
    question: "___ he buy a new car last month?",
    options: ["Did he bought", "Was he buy", "Did he buy", "Does he buy"],
    correct: 2,
    explanation: 'Na interrogativa do Simple Past usamos "Did" + sujeito + infinitivo. O correto é "Did he buy".'
  },
  {
    rule: "Na interrogativa do Simple Past usamos 'Did' + sujeito + verbo no infinitivo para todos os sujeitos.",
    question: "___ they complete the project on time?",
    options: ["Were they complete", "Did they completed", "Does they complete", "Did they complete"],
    correct: 3,
    explanation: 'Na interrogativa do Simple Past usamos "Did" + sujeito + infinitivo. O correto é "Did they complete".'
  },
  {
    rule: "Na interrogativa do Simple Past usamos 'Did' + sujeito + verbo no infinitivo para todos os sujeitos.",
    question: "___ you forget to bring your keys?",
    options: ["Did you forgot", "Were you forget", "Did you forget", "Does you forget"],
    correct: 2,
    explanation: 'Na interrogativa do Simple Past usamos "Did" + sujeito + infinitivo. O correto é "Did you forget".'
  },
  {
    rule: "Na interrogativa do Simple Past usamos 'Did' + sujeito + verbo no infinitivo para todos os sujeitos.",
    question: "___ she write the report last week?",
    options: ["Did she wrote", "Was she write", "Does she write", "Did she write"],
    correct: 3,
    explanation: 'Na interrogativa do Simple Past usamos "Did" + sujeito + infinitivo. O correto é "Did she write".'
  },
  {
    rule: "Na interrogativa do Simple Past usamos 'Did' + sujeito + verbo no infinitivo para todos os sujeitos.",
    question: "___ he take his medicine last night?",
    options: ["Did he took", "Was he take", "Did he take", "Does he take"],
    correct: 2,
    explanation: 'Na interrogativa do Simple Past usamos "Did" + sujeito + infinitivo. O correto é "Did he take".'
  },
  {
    rule: "Na interrogativa do Simple Past usamos 'Did' + sujeito + verbo no infinitivo para todos os sujeitos.",
    question: "___ they sign the contract last Thursday?",
    options: ["Were they sign", "Did they signed", "Does they sign", "Did they sign"],
    correct: 3,
    explanation: 'Na interrogativa do Simple Past usamos "Did" + sujeito + infinitivo. O correto é "Did they sign".'
  },
  {
    rule: "Na interrogativa do Simple Past usamos 'Did' + sujeito + verbo no infinitivo para todos os sujeitos.",
    question: "___ you speak to your manager yesterday?",
    options: ["Did you spoke", "Were you speak", "Did you speak", "Does you speak"],
    correct: 2,
    explanation: 'Na interrogativa do Simple Past usamos "Did" + sujeito + infinitivo. O correto é "Did you speak".'
  },
  {
    rule: "Na interrogativa do Simple Past usamos 'Did' + sujeito + verbo no infinitivo para todos os sujeitos.",
    question: "___ she find her wallet?",
    options: ["Did she found", "Was she find", "Does she find", "Did she find"],
    correct: 3,
    explanation: 'Na interrogativa do Simple Past usamos "Did" + sujeito + infinitivo. O correto é "Did she find".'
  },
  {
    rule: "Na interrogativa do Simple Past usamos 'Did' + sujeito + verbo no infinitivo para todos os sujeitos.",
    question: "___ he drive to work last Monday?",
    options: ["Did he drove", "Was he drive", "Did he drive", "Does he drive"],
    correct: 2,
    explanation: 'Na interrogativa do Simple Past usamos "Did" + sujeito + infinitivo. O correto é "Did he drive".'
  },
  {
    rule: "Na interrogativa do Simple Past usamos 'Did' + sujeito + verbo no infinitivo para todos os sujeitos.",
    question: "___ they travel to another country last summer?",
    options: ["Were they travel", "Did they traveled", "Does they travel", "Did they travel"],
    correct: 3,
    explanation: 'Na interrogativa do Simple Past usamos "Did" + sujeito + infinitivo. O correto é "Did they travel".'
  },
  {
    rule: "Na interrogativa do Simple Past usamos 'Did' + sujeito + verbo no infinitivo para todos os sujeitos.",
    question: "___ you read the instructions carefully?",
    options: ["Did you readed", "Were you read", "Did you read", "Does you read"],
    correct: 2,
    explanation: 'Na interrogativa do Simple Past usamos "Did" + sujeito + infinitivo. O correto é "Did you read".'
  },
  {
    rule: "Na interrogativa do Simple Past usamos 'Did' + sujeito + verbo no infinitivo para todos os sujeitos.",
    question: "___ she enjoy her vacation last month?",
    options: ["Did she enjoyed", "Was she enjoy", "Does she enjoy", "Did she enjoy"],
    correct: 3,
    explanation: 'Na interrogativa do Simple Past usamos "Did" + sujeito + infinitivo. O correto é "Did she enjoy".'
  },
  {
    rule: "Na interrogativa do Simple Past usamos 'Did' + sujeito + verbo no infinitivo para todos os sujeitos.",
    question: "___ he pay the bill at the restaurant?",
    options: ["Did he paid", "Was he pay", "Did he pay", "Does he pay"],
    correct: 2,
    explanation: 'Na interrogativa do Simple Past usamos "Did" + sujeito + infinitivo. O correto é "Did he pay".'
  },
  {
    rule: "Na interrogativa do Simple Past usamos 'Did' + sujeito + verbo no infinitivo para todos os sujeitos.",
    question: "___ they visit their grandparents last weekend?",
    options: ["Were they visit", "Did they visited", "Does they visit", "Did they visit"],
    correct: 3,
    explanation: 'Na interrogativa do Simple Past usamos "Did" + sujeito + infinitivo. O correto é "Did they visit".'
  },
  {
    rule: "Na interrogativa do Simple Past usamos 'Did' + sujeito + verbo no infinitivo para todos os sujeitos.",
    question: "___ you hear the news this morning?",
    options: ["Did you heard", "Were you hear", "Did you hear", "Does you hear"],
    correct: 2,
    explanation: 'Na interrogativa do Simple Past usamos "Did" + sujeito + infinitivo. O correto é "Did you hear".'
  },
  {
    rule: "Na interrogativa do Simple Past usamos 'Did' + sujeito + verbo no infinitivo para todos os sujeitos.",
    question: "___ she bring her umbrella yesterday?",
    options: ["Did she brought", "Was she bring", "Does she bring", "Did she bring"],
    correct: 3,
    explanation: 'Na interrogativa do Simple Past usamos "Did" + sujeito + infinitivo. O correto é "Did she bring".'
  },

  // INTERROGATIVA DO SIMPLE PAST COM TO BE — Was / Were (131 a 150)
  {
    rule: "Na interrogativa do Simple Past do verbo To Be usamos 'Was' (I, he, she, it) ou 'Were' (you, we, they) + sujeito.",
    question: "___ she happy with the results?",
    options: ["Did she be happy", "Was she happy", "Were she happy", "Does she be happy"],
    correct: 1,
    explanation: '"She" usa "Was" na interrogativa do Simple Past do To Be. Nunca usamos "Did" com o verbo To Be.'
  },
  {
    rule: "Na interrogativa do Simple Past do verbo To Be usamos 'Was' (I, he, she, it) ou 'Were' (you, we, they) + sujeito.",
    question: "___ they at home when you arrived?",
    options: ["Did they be", "Was they", "Were they", "Does they be"],
    correct: 2,
    explanation: '"They" usa "Were" na interrogativa do Simple Past do To Be.'
  },
  {
    rule: "Na interrogativa do Simple Past do verbo To Be usamos 'Was' (I, he, she, it) ou 'Were' (you, we, they) + sujeito.",
    question: "___ he nervous before the presentation?",
    options: ["Did he be nervous", "Were he nervous", "Was he nervous", "Does he be nervous"],
    correct: 2,
    explanation: '"He" usa "Was" na interrogativa do Simple Past do To Be.'
  },
  {
    rule: "Na interrogativa do Simple Past do verbo To Be usamos 'Was' (I, he, she, it) ou 'Were' (you, we, they) + sujeito.",
    question: "___ you at the office yesterday?",
    options: ["Did you be", "Was you", "Were you", "Does you be"],
    correct: 2,
    explanation: '"You" usa "Were" na interrogativa do Simple Past do To Be.'
  },
  {
    rule: "Na interrogativa do Simple Past do verbo To Be usamos 'Was' (I, he, she, it) ou 'Were' (you, we, they) + sujeito.",
    question: "___ the movie interesting?",
    options: ["Did the movie be interesting", "Were the movie interesting", "Was the movie interesting", "Does the movie be interesting"],
    correct: 2,
    explanation: '"The movie" equivale a "it", então usamos "Was".'
  },
  {
    rule: "Na interrogativa do Simple Past do verbo To Be usamos 'Was' (I, he, she, it) ou 'Were' (you, we, they) + sujeito.",
    question: "___ we on time for the meeting?",
    options: ["Did we be", "Was we", "Were we", "Does we be"],
    correct: 2,
    explanation: '"We" usa "Were" na interrogativa do Simple Past do To Be.'
  },
  {
    rule: "Na interrogativa do Simple Past do verbo To Be usamos 'Was' (I, he, she, it) ou 'Were' (you, we, they) + sujeito.",
    question: "___ she a good student in high school?",
    options: ["Did she be", "Were she", "Was she", "Does she be"],
    correct: 2,
    explanation: '"She" usa "Was" na interrogativa do Simple Past do To Be.'
  },
  {
    rule: "Na interrogativa do Simple Past do verbo To Be usamos 'Was' (I, he, she, it) ou 'Were' (you, we, they) + sujeito.",
    question: "___ the children quiet during the class?",
    options: ["Did the children be quiet", "Was the children quiet", "Were the children quiet", "Does the children be quiet"],
    correct: 2,
    explanation: '"The children" é plural, então usamos "Were".'
  },
  {
    rule: "Na interrogativa do Simple Past do verbo To Be usamos 'Was' (I, he, she, it) ou 'Were' (you, we, they) + sujeito.",
    question: "___ I clear in my explanation?",
    options: ["Did I be clear", "Were I clear", "Was I clear", "Does I be clear"],
    correct: 2,
    explanation: '"I" usa "Was" na interrogativa do Simple Past do To Be.'
  },
  {
    rule: "Na interrogativa do Simple Past do verbo To Be usamos 'Was' (I, he, she, it) ou 'Were' (you, we, they) + sujeito.",
    question: "___ the weather cold last week?",
    options: ["Did the weather be cold", "Were the weather cold", "Was the weather cold", "Does the weather be cold"],
    correct: 2,
    explanation: '"The weather" equivale a "it", então usamos "Was".'
  },
  {
    rule: "Na interrogativa do Simple Past do verbo To Be usamos 'Was' (I, he, she, it) ou 'Were' (you, we, they) + sujeito.",
    question: "___ they happy with the service?",
    options: ["Did they be happy", "Was they happy", "Were they happy", "Does they be happy"],
    correct: 2,
    explanation: '"They" usa "Were" na interrogativa do Simple Past do To Be.'
  },
  {
    rule: "Na interrogativa do Simple Past do verbo To Be usamos 'Was' (I, he, she, it) ou 'Were' (you, we, they) + sujeito.",
    question: "___ he the best player on the team?",
    options: ["Did he be", "Were he", "Was he", "Does he be"],
    correct: 2,
    explanation: '"He" usa "Was" na interrogativa do Simple Past do To Be.'
  },
  {
    rule: "Na interrogativa do Simple Past do verbo To Be usamos 'Was' (I, he, she, it) ou 'Were' (you, we, they) + sujeito.",
    question: "___ you busy yesterday afternoon?",
    options: ["Did you be busy", "Was you busy", "Were you busy", "Does you be busy"],
    correct: 2,
    explanation: '"You" usa "Were" na interrogativa do Simple Past do To Be.'
  },
  {
    rule: "Na interrogativa do Simple Past do verbo To Be usamos 'Was' (I, he, she, it) ou 'Were' (you, we, they) + sujeito.",
    question: "___ the food delicious at the party?",
    options: ["Did the food be delicious", "Were the food delicious", "Was the food delicious", "Does the food be delicious"],
    correct: 2,
    explanation: '"The food" equivale a "it", então usamos "Was".'
  },
  {
    rule: "Na interrogativa do Simple Past do verbo To Be usamos 'Was' (I, he, she, it) ou 'Were' (you, we, they) + sujeito.",
    question: "___ we supposed to meet at 10 a.m.?",
    options: ["Did we be", "Was we", "Were we", "Does we be"],
    correct: 2,
    explanation: '"We" usa "Were" na interrogativa do Simple Past do To Be.'
  },
  {
    rule: "Na interrogativa do Simple Past do verbo To Be usamos 'Was' (I, he, she, it) ou 'Were' (you, we, they) + sujeito.",
    question: "___ she aware of the changes?",
    options: ["Did she be aware", "Were she aware", "Was she aware", "Does she be aware"],
    correct: 2,
    explanation: '"She" usa "Was" na interrogativa do Simple Past do To Be.'
  },
  {
    rule: "Na interrogativa do Simple Past do verbo To Be usamos 'Was' (I, he, she, it) ou 'Were' (you, we, they) + sujeito.",
    question: "___ the roads slippery after the rain?",
    options: ["Did the roads be slippery", "Was the roads slippery", "Were the roads slippery", "Does the roads be slippery"],
    correct: 2,
    explanation: '"The roads" é plural, então usamos "Were".'
  },
  {
    rule: "Na interrogativa do Simple Past do verbo To Be usamos 'Was' (I, he, she, it) ou 'Were' (you, we, they) + sujeito.",
    question: "___ I wrong about that?",
    options: ["Did I be wrong", "Were I wrong", "Was I wrong", "Does I be wrong"],
    correct: 2,
    explanation: '"I" usa "Was" na interrogativa do Simple Past do To Be.'
  },
  {
    rule: "Na interrogativa do Simple Past do verbo To Be usamos 'Was' (I, he, she, it) ou 'Were' (you, we, they) + sujeito.",
    question: "___ the concert crowded?",
    options: ["Did the concert be crowded", "Were the concert crowded", "Was the concert crowded", "Does the concert be crowded"],
    correct: 2,
    explanation: '"The concert" equivale a "it", então usamos "Was".'
  },
  {
    rule: "Na interrogativa do Simple Past do verbo To Be usamos 'Was' (I, he, she, it) ou 'Were' (you, we, they) + sujeito.",
    question: "___ they interested in the offer?",
    options: ["Did they be interested", "Was they interested", "Were they interested", "Does they be interested"],
    correct: 2,
    explanation: '"They" usa "Were" na interrogativa do Simple Past do To Be.'
  },
];

// ============================================================
// BANCO DE QUESTÕES — PRESENT PERFECT (150 questões)
// ============================================================

const presentPerfectQuestions = [

  // REGRA PRIMÁRIA — ação no passado com resultado no presente (1 a 30)
  {
    rule: "Usamos o Present Perfect para ações que aconteceram no passado, mas têm um resultado ou relevância no presente.",
    question: "I can't find my keys. I ___ them.",
    options: ["lost", "have lost", "was losing", "lose"],
    correct: 1,
    explanation: 'A ação de perder as chaves aconteceu no passado, mas o resultado (não ter as chaves agora) é relevante no presente. Usamos "have lost".'
  },
  {
    rule: "Usamos o Present Perfect para ações que aconteceram no passado, mas têm um resultado ou relevância no presente.",
    question: "She ___ her leg, so she can't play soccer today.",
    options: ["broke", "has broken", "was breaking", "breaks"],
    correct: 1,
    explanation: 'Ela quebrou a perna no passado, e o resultado (não poder jogar hoje) afeta o presente. Usamos "has broken".'
  },
  {
    rule: "Usamos o Present Perfect para ações que aconteceram no passado, mas têm um resultado ou relevância no presente.",
    question: "They ___ all the food. There's nothing left.",
    options: ["ate", "have eaten", "were eating", "eat"],
    correct: 1,
    explanation: 'Eles comeram a comida no passado, e o resultado (não ter mais comida) é relevante agora. Usamos "have eaten".'
  },
  {
    rule: "Usamos o Present Perfect para ações que aconteceram no passado, mas têm um resultado ou relevância no presente.",
    question: "He ___ his homework, so he is free to play now.",
    options: ["finished", "has finished", "was finishing", "finishes"],
    correct: 1,
    explanation: 'Ele terminou a tarefa no passado, e o resultado (estar livre agora) é relevante no presente. Usamos "has finished".'
  },
  {
    rule: "Usamos o Present Perfect para ações que aconteceram no passado, mas têm um resultado ou relevância no presente.",
    question: "We ___ a new car. It's parked outside.",
    options: ["bought", "have bought", "were buying", "buy"],
    correct: 1,
    explanation: 'Compramos o carro no passado, e o resultado (ter um carro novo agora) é relevante no presente. Usamos "have bought".'
  },
  {
    rule: "Usamos o Present Perfect para ações que aconteceram no passado, mas têm um resultado ou relevância no presente.",
    question: "The train ___ yet, so we have to wait.",
    options: ["didn't arrive", "hasn't arrived", "wasn't arriving", "doesn't arrive"],
    correct: 1,
    explanation: 'O trem não chegou no passado (até agora), e o resultado (ter que esperar) é relevante no presente. Usamos "hasn\'t arrived".'
  },
  {
    rule: "Usamos o Present Perfect para ações que aconteceram no passado, mas têm um resultado ou relevância no presente.",
    question: "I ___ my wallet. I need to go back home.",
    options: ["forgot", "have forgotten", "was forgetting", "forget"],
    correct: 1,
    explanation: 'Esqueci a carteira no passado, e o resultado (precisar voltar) é relevante no presente. Usamos "have forgotten".'
  },
  {
    rule: "Usamos o Present Perfect para ações que aconteceram no passado, mas têm um resultado ou relevância no presente.",
    question: "She ___ a new job. She starts next week.",
    options: ["found", "has found", "was finding", "finds"],
    correct: 1,
    explanation: 'Ela encontrou um emprego no passado, e o resultado (começar na próxima semana) é relevante no presente. Usamos "has found".'
  },
  {
    rule: "Usamos o Present Perfect para ações que aconteceram no passado, mas têm um resultado ou relevância no presente.",
    question: "They ___ their house. It looks beautiful now.",
    options: ["painted", "have painted", "were painting", "paint"],
    correct: 1,
    explanation: 'Eles pintaram a casa no passado, e o resultado (estar bonita agora) é relevante no presente. Usamos "have painted".'
  },
  {
    rule: "Usamos o Present Perfect para ações que aconteceram no passado, mas têm um resultado ou relevância no presente.",
    question: "He ___ his exams. He's very happy.",
    options: ["passed", "has passed", "was passing", "passes"],
    correct: 1,
    explanation: 'Ele passou nos exames no passado, e o resultado (estar feliz agora) é relevante no presente. Usamos "has passed".'
  },
  {
    rule: "Usamos o Present Perfect para ações que aconteceram no passado, mas têm um resultado ou relevância no presente.",
    question: "We ___ to London many times. We know the city well.",
    options: ["went", "have been", "were going", "go"],
    correct: 1,
    explanation: 'Fomos a Londres no passado, e o resultado (conhecer bem a cidade) é relevante no presente. Usamos "have been".'
  },
  {
    rule: "Usamos o Present Perfect para ações que aconteceram no passado, mas têm um resultado ou relevância no presente.",
    question: "I ___ my hand. It hurts a lot.",
    options: ["cut", "have cut", "was cutting", "cut"],
    correct: 1,
    explanation: 'Cortei a mão no passado, e o resultado (estar doendo agora) é relevante no presente. Usamos "have cut".'
  },
  {
    rule: "Usamos o Present Perfect para ações que aconteceram no passado, mas têm um resultado ou relevância no presente.",
    question: "She ___ her phone. She can't call anyone.",
    options: ["lost", "has lost", "was losing", "loses"],
    correct: 1,
    explanation: 'Ela perdeu o telefone no passado, e o resultado (não poder ligar) é relevante no presente. Usamos "has lost".'
  },
  {
    rule: "Usamos o Present Perfect para ações que aconteceram no passado, mas têm um resultado ou relevância no presente.",
    question: "They ___ the project. They are celebrating now.",
    options: ["finished", "have finished", "were finishing", "finish"],
    correct: 1,
    explanation: 'Eles terminaram o projeto no passado, e o resultado (estar celebrando) é relevante no presente. Usamos "have finished".'
  },
  {
    rule: "Usamos o Present Perfect para ações que aconteceram no passado, mas têm um resultado ou relevância no presente.",
    question: "He ___ his car. It's all clean now.",
    options: ["washed", "has washed", "was washing", "washes"],
    correct: 1,
    explanation: 'Ele lavou o carro no passado, e o resultado (estar limpo agora) é relevante no presente. Usamos "has washed".'
  },
  {
    rule: "Usamos o Present Perfect para ações que aconteceram no passado, mas têm um resultado ou relevância no presente.",
    question: "We ___ a new house. We are moving next month.",
    options: ["bought", "have bought", "were buying", "buy"],
    correct: 1,
    explanation: 'Compramos a casa no passado, e o resultado (mudar no próximo mês) é relevante no presente. Usamos "have bought".'
  },
  {
    rule: "Usamos o Present Perfect para ações que aconteceram no passado, mas têm um resultado ou relevância no presente.",
    question: "I ___ to that restaurant before. The food is great.",
    options: ["went", "have been", "was going", "go"],
    correct: 1,
    explanation: 'Fui a esse restaurante no passado, e o resultado (saber que a comida é boa) é relevante no presente. Usamos "have been".'
  },
  {
    rule: "Usamos o Present Perfect para ações que aconteceram no passado, mas têm um resultado ou relevância no presente.",
    question: "She ___ her hair. It looks different.",
    options: ["cut", "has cut", "was cutting", "cuts"],
    correct: 1,
    explanation: 'Ela cortou o cabelo no passado, e o resultado (parecer diferente) é relevante no presente. Usamos "has cut".'
  },
  {
    rule: "Usamos o Present Perfect para ações que aconteceram no passado, mas têm um resultado ou relevância no presente.",
    question: "They ___ a new movie. It's in cinemas now.",
    options: ["released", "have released", "were releasing", "release"],
    correct: 1,
    explanation: 'Eles lançaram o filme no passado, e o resultado (estar nos cinemas agora) é relevante no presente. Usamos "have released".'
  },
  {
    rule: "Usamos o Present Perfect para ações que aconteceram no passado, mas têm um resultado ou relevância no presente.",
    question: "He ___ his phone. He can't find it anywhere.",
    options: ["lost", "has lost", "was losing", "loses"],
    correct: 1,
    explanation: 'Ele perdeu o telefone no passado, e o resultado (não conseguir encontrá-lo) é relevante no presente. Usamos "has lost".'
  },
  {
    rule: "Usamos o Present Perfect para ações que aconteceram no passado, mas têm um resultado ou relevância no presente.",
    question: "We ___ all the tickets. The show is sold out.",
    options: ["bought", "have bought", "were buying", "buy"],
    correct: 1,
    explanation: 'Compramos os ingressos no passado, e o resultado (o show estar esgotado) é relevante no presente. Usamos "have bought".'
  },
  {
    rule: "Usamos o Present Perfect para ações que aconteceram no passado, mas têm um resultado ou relevância no presente.",
    question: "I ___ my homework. Now I can relax.",
    options: ["did", "have done", "was doing", "do"],
    correct: 1,
    explanation: 'Fiz a tarefa no passado, e o resultado (poder relaxar agora) é relevante no presente. Usamos "have done".'
  },
  {
    rule: "Usamos o Present Perfect para ações que aconteceram no passado, mas têm um resultado ou relevância no presente.",
    question: "She ___ a new dress. She's wearing it tonight.",
    options: ["bought", "has bought", "was buying", "buys"],
    correct: 1,
    explanation: 'Ela comprou o vestido no passado, e o resultado (usá-lo hoje à noite) é relevante no presente. Usamos "has bought".'
  },
  {
    rule: "Usamos o Present Perfect para ações que aconteceram no passado, mas têm um resultado ou relevância no presente.",
    question: "They ___ the window. It's broken.",
    options: ["broke", "have broken", "were breaking", "break"],
    correct: 1,
    explanation: 'Eles quebraram a janela no passado, e o resultado (estar quebrada) é relevante no presente. Usamos "have broken".'
  },
  {
    rule: "Usamos o Present Perfect para ações que aconteceram no passado, mas têm um resultado ou relevância no presente.",
    question: "He ___ his hand. He can't write.",
    options: ["hurt", "has hurt", "was hurting", "hurts"],
    correct: 1,
    explanation: 'Ele machucou a mão no passado, e o resultado (não poder escrever) é relevante no presente. Usamos "has hurt".'
  },
  {
    rule: "Usamos o Present Perfect para ações que aconteceram no passado, mas têm um resultado ou relevância no presente.",
    question: "We ___ the news. It's very shocking.",
    options: ["heard", "have heard", "were hearing", "hear"],
    correct: 1,
    explanation: 'Ouvimos a notícia no passado, e o resultado (ser chocante) é relevante no presente. Usamos "have heard".'
  },
  {
    rule: "Usamos o Present Perfect para ações que aconteceram no passado, mas têm um resultado ou relevância no presente.",
    question: "I ___ my passport. I can't travel.",
    options: ["lost", "have lost", "was losing", "lose"],
    correct: 1,
    explanation: 'Perdi o passaporte no passado, e o resultado (não poder viajar) é relevante no presente. Usamos "have lost".'
  },
  {
    rule: "Usamos o Present Perfect para ações que aconteceram no passado, mas têm um resultado ou relevância no presente.",
    question: "She ___ her car. It's in the garage for repairs.",
    options: ["damaged", "has damaged", "was damaging", "damages"],
    correct: 1,
    explanation: 'Ela danificou o carro no passado, e o resultado (estar na garagem) é relevante no presente. Usamos "has damaged".'
  },
  {
    rule: "Usamos o Present Perfect para ações que aconteceram no passado, mas têm um resultado ou relevância no presente.",
    question: "They ___ their flight. They will miss the meeting.",
    options: ["missed", "have missed", "were missing", "miss"],
    correct: 1,
    explanation: 'Eles perderam o voo no passado, e o resultado (perder a reunião) é relevante no presente. Usamos "have missed".'
  },
  {
    rule: "Usamos o Present Perfect para ações que aconteceram no passado, mas têm um resultado ou relevância no presente.",
    question: "He ___ his job. He's looking for a new one.",
    options: ["lost", "has lost", "was losing", "loses"],
    correct: 1,
    explanation: 'Ele perdeu o emprego no passado, e o resultado (estar procurando um novo) é relevante no presente. Usamos "has lost".'
  },

  // REGRA SECUNDÁRIA — ações que começaram no passado e continuam no presente (31 a 50)
  {
    rule: "Usamos o Present Perfect para ações que começaram no passado e continuam até o presente, geralmente com 'for' (por um período) ou 'since' (desde um ponto no tempo).",
    question: "I ___ here for five years.",
    options: ["lived", "have lived", "was living", "live"],
    correct: 1,
    explanation: 'A ação de morar começou no passado e continua até agora ("for five years"). Usamos "have lived".'
  },
  {
    rule: "Usamos o Present Perfect para ações que começaram no passado e continuam até o presente, geralmente com 'for' (por um período) ou 'since' (desde um ponto no tempo).",
    question: "She ___ in this company since 2020.",
    options: ["worked", "has worked", "was working", "works"],
    correct: 1,
    explanation: 'A ação de trabalhar começou em 2020 e continua até agora ("since 2020"). Usamos "has worked".'
  },
  {
    rule: "Usamos o Present Perfect para ações que começaram no passado e continuam até o presente, geralmente com 'for' (por um período) ou 'since' (desde um ponto no tempo).",
    question: "They ___ married for ten years.",
    options: ["were", "have been", "are being", "are"],
    correct: 1,
    explanation: 'O estado de casados começou no passado e continua até agora ("for ten years"). Usamos "have been".'
  },
  {
    rule: "Usamos o Present Perfect para ações que começaram no passado e continuam até o presente, geralmente com 'for' (por um período) ou 'since' (desde um ponto no tempo).",
    question: "He ___ that car since he was 18.",
    options: ["owned", "has owned", "was owning", "owns"],
    correct: 1,
    explanation: 'A ação de possuir o carro começou no passado e continua até agora ("since he was 18"). Usamos "has owned".'
  },
  {
    rule: "Usamos o Present Perfect para ações que começaram no passado e continuam até o presente, geralmente com 'for' (por um período) ou 'since' (desde um ponto no tempo).",
    question: "We ___ each other since childhood.",
    options: ["knew", "have known", "were knowing", "know"],
    correct: 1,
    explanation: 'A ação de se conhecer começou na infância e continua até agora ("since childhood"). Usamos "have known".'
  },
  {
    rule: "Usamos o Present Perfect para ações que começaram no passado e continuam até o presente, geralmente com 'for' (por um período) ou 'since' (desde um ponto no tempo).",
    question: "I ___ English for seven years.",
    options: ["studied", "have studied", "was studying", "study"],
    correct: 1,
    explanation: 'A ação de estudar começou no passado e continua até agora ("for seven years"). Usamos "have studied".'
  },
  {
    rule: "Usamos o Present Perfect para ações que começaram no passado e continuam até o presente, geralmente com 'for' (por um período) ou 'since' (desde um ponto no tempo).",
    question: "She ___ a teacher since she graduated.",
    options: ["was", "has been", "is being", "is"],
    correct: 1,
    explanation: 'O estado de ser professora começou no passado e continua até agora ("since she graduated"). Usamos "has been".'
  },
  {
    rule: "Usamos o Present Perfect para ações que começaram no passado e continuam até o presente, geralmente com 'for' (por um período) ou 'since' (desde um ponto no tempo).",
    question: "They ___ in this city for a long time.",
    options: ["lived", "have lived", "were living", "live"],
    correct: 1,
    explanation: 'A ação de morar começou no passado e continua até agora ("for a long time"). Usamos "have lived".'
  },
  {
    rule: "Usamos o Present Perfect para ações que começaram no passado e continuam até o presente, geralmente com 'for' (por um período) ou 'since' (desde um ponto no tempo).",
    question: "He ___ sick since Monday.",
    options: ["was", "has been", "is being", "is"],
    correct: 1,
    explanation: 'O estado de estar doente começou na segunda e continua até agora ("since Monday"). Usamos "has been".'
  },
  {
    rule: "Usamos o Present Perfect para ações que começaram no passado e continuam até o presente, geralmente com 'for' (por um período) ou 'since' (desde um ponto no tempo).",
    question: "We ___ this house for twenty years.",
    options: ["owned", "have owned", "were owning", "own"],
    correct: 1,
    explanation: 'A ação de possuir a casa começou no passado e continua até agora ("for twenty years"). Usamos "have owned".'
  },
  {
    rule: "Usamos o Present Perfect para ações que começaram no passado e continuam até o presente, geralmente com 'for' (por um período) ou 'since' (desde um ponto no tempo).",
    question: "I ___ my best friend for fifteen years.",
    options: ["knew", "have known", "was knowing", "know"],
    correct: 1,
    explanation: 'A ação de conhecer começou no passado e continua até agora ("for fifteen years"). Usamos "have known".'
  },
  {
    rule: "Usamos o Present Perfect para ações que começaram no passado e continuam até o presente, geralmente com 'for' (por um período) ou 'since' (desde um ponto no tempo).",
    question: "She ___ her current job for three years.",
    options: ["had", "has had", "was having", "has"],
    correct: 1,
    explanation: 'A ação de ter o emprego começou no passado e continua até agora ("for three years"). Usamos "has had".'
  },
  {
    rule: "Usamos o Present Perfect para ações que começaram no passado e continuam até o presente, geralmente com 'for' (por um período) ou 'since' (desde um ponto no tempo).",
    question: "They ___ in that apartment since last year.",
    options: ["lived", "have lived", "were living", "live"],
    correct: 1,
    explanation: 'A ação de morar começou no passado e continua até agora ("since last year"). Usamos "have lived".'
  },
  {
    rule: "Usamos o Present Perfect para ações que começaram no passado e continuam até o presente, geralmente com 'for' (por um período) ou 'since' (desde um ponto no tempo).",
    question: "He ___ a doctor for over ten years.",
    options: ["was", "has been", "is being", "is"],
    correct: 1,
    explanation: 'O estado de ser médico começou no passado e continua até agora ("for over ten years"). Usamos "has been".'
  },
  {
    rule: "Usamos o Present Perfect para ações que começaram no passado e continuam até o presente, geralmente com 'for' (por um período) ou 'since' (desde um ponto no tempo).",
    question: "We ___ here since 9 a.m.",
    options: ["waited", "have waited", "were waiting", "wait"],
    correct: 1,
    explanation: 'A ação de esperar começou às 9h e continua até agora ("since 9 a.m."). Usamos "have waited".'
  },
  {
    rule: "Usamos o Present Perfect para ações que começaram no passado e continuam até o presente, geralmente com 'for' (por um período) ou 'since' (desde um ponto no tempo).",
    question: "I ___ this book for two weeks.",
    options: ["read", "have read", "was reading", "read"],
    correct: 1,
    explanation: 'A ação de ler começou no passado e continua até agora ("for two weeks"). Usamos "have read".'
  },
  {
    rule: "Usamos o Present Perfect para ações que começaram no passado e continuam até o presente, geralmente com 'for' (por um período) ou 'since' (desde um ponto no tempo).",
    question: "She ___ her car for a long time.",
    options: ["drove", "has driven", "was driving", "drives"],
    correct: 1,
    explanation: 'A ação de dirigir o carro começou no passado e continua até agora ("for a long time"). Usamos "has driven".'
  },
  {
    rule: "Usamos o Present Perfect para ações que começaram no passado e continuam até o presente, geralmente com 'for' (por um período) ou 'since' (desde um ponto no tempo).",
    question: "They ___ friends since elementary school.",
    options: ["were", "have been", "are being", "are"],
    correct: 1,
    explanation: 'O estado de serem amigos começou no passado e continua até agora ("since elementary school"). Usamos "have been".'
  },
  {
    rule: "Usamos o Present Perfect para ações que começaram no passado e continuam até o presente, geralmente com 'for' (por um período) ou 'since' (desde um ponto no tempo).",
    question: "He ___ in this house all his life.",
    options: ["lived", "has lived", "was living", "lives"],
    correct: 1,
    explanation: 'A ação de morar começou no passado e continua até agora ("all his life"). Usamos "has lived".'
  },
  {
    rule: "Usamos o Present Perfect para ações que começaram no passado e continuam até o presente, geralmente com 'for' (por um período) ou 'since' (desde um ponto no tempo).",
    question: "We ___ to this song many times since it came out.",
    options: ["listened", "have listened", "were listening", "listen"],
    correct: 1,
    explanation: 'A ação de ouvir começou no passado e continua até agora ("since it came out"). Usamos "have listened".'
  },

  // REGRA TERCIÁRIA — experiências de vida (51 a 70)
  {
    rule: "Usamos o Present Perfect para falar sobre experiências de vida, sem especificar quando elas aconteceram. Frequentemente usamos 'ever' (alguma vez) ou 'never' (nunca).",
    question: "I ___ to Paris.",
    options: ["was", "have been", "went", "go"],
    correct: 1,
    explanation: 'É uma experiência de vida ("já fui a Paris"). Não importa quando, apenas que aconteceu. Usamos "have been".'
  },
  {
    rule: "Usamos o Present Perfect para falar sobre experiências de vida, sem especificar quando elas aconteceram. Frequentemente usamos 'ever' (alguma vez) ou 'never' (nunca).",
    question: "She ___ a famous person.",
    options: ["met", "has met", "was meeting", "meets"],
    correct: 1,
    explanation: 'É uma experiência de vida ("já conheceu uma pessoa famosa"). Usamos "has met".'
  },
  {
    rule: "Usamos o Present Perfect para falar sobre experiências de vida, sem especificar quando elas aconteceram. Frequentemente usamos 'ever' (alguma vez) ou 'never' (nunca).",
    question: "They ___ sushi before.",
    options: ["didn't eat", "haven't eaten", "weren't eating", "don't eat"],
    correct: 1,
    explanation: 'É uma experiência de vida ("nunca comeram sushi antes"). Usamos "haven\'t eaten".'
  },
  {
    rule: "Usamos o Present Perfect para falar sobre experiências de vida, sem especificar quando elas aconteceram. Frequentemente usamos 'ever' (alguma vez) ou 'never' (nunca).",
    question: "Have you ___ a horse?",
    options: ["rode", "ridden", "ride", "riding"],
    correct: 1,
    explanation: 'Pergunta sobre uma experiência de vida ("já andou a cavalo?"). Usamos o particípio passado "ridden".'
  },
  {
    rule: "Usamos o Present Perfect para falar sobre experiências de vida, sem especificar quando elas aconteceram. Frequentemente usamos 'ever' (alguma vez) ou 'never' (nunca).",
    question: "He ___ a lot of interesting places.",
    options: ["visited", "has visited", "was visiting", "visits"],
    correct: 1,
    explanation: 'É uma experiência de vida ("já visitou muitos lugares interessantes"). Usamos "has visited".'
  },
  {
    rule: "Usamos o Present Perfect para falar sobre experiências de vida, sem especificar quando elas aconteceram. Frequentemente usamos 'ever' (alguma vez) ou 'never' (nunca).",
    question: "I ___ that movie.",
    options: ["saw", "have seen", "was seeing", "see"],
    correct: 1,
    explanation: 'É uma experiência de vida ("já vi aquele filme"). Usamos "have seen".'
  },
  {
    rule: "Usamos o Present Perfect para falar sobre experiências de vida, sem especificar quando elas aconteceram. Frequentemente usamos 'ever' (alguma vez) ou 'never' (nunca).",
    question: "She ___ a book in English.",
    options: ["read", "has read", "was reading", "reads"],
    correct: 1,
    explanation: 'É uma experiência de vida ("já leu um livro em inglês"). Usamos "has read" (pronunciado "red").'
  },
  {
    rule: "Usamos o Present Perfect para falar sobre experiências de vida, sem especificar quando elas aconteceram. Frequentemente usamos 'ever' (alguma vez) ou 'never' (nunca).",
    question: "They ___ a marathon.",
    options: ["ran", "have run", "were running", "run"],
    correct: 1,
    explanation: 'É uma experiência de vida ("já correram uma maratona"). Usamos "have run".'
  },
  {
    rule: "Usamos o Present Perfect para falar sobre experiências de vida, sem especificar quando elas aconteceram. Frequentemente usamos 'ever' (alguma vez) ou 'never' (nunca).",
    question: "He ___ a foreign country.",
    options: ["never left", "has never left", "was never leaving", "never leaves"],
    correct: 1,
    explanation: 'É uma experiência de vida ("nunca saiu do país"). Usamos "has never left".'
  },
  {
    rule: "Usamos o Present Perfect para falar sobre experiências de vida, sem especificar quando elas aconteceram. Frequentemente usamos 'ever' (alguma vez) ou 'never' (nunca).",
    question: "Have you ever ___ a snake?",
    options: ["touched", "touch", "touching", "touches"],
    correct: 0,
    explanation: 'Pergunta sobre uma experiência de vida ("já tocou em uma cobra?"). Usamos o particípio passado "touched".'
  },
  {
    rule: "Usamos o Present Perfect para falar sobre experiências de vida, sem especificar quando elas aconteceram. Frequentemente usamos 'ever' (alguma vez) ou 'never' (nunca).",
    question: "I ___ a lot of different foods.",
    options: ["tried", "have tried", "was trying", "try"],
    correct: 1,
    explanation: 'É uma experiência de vida ("já experimentei muitas comidas diferentes"). Usamos "have tried".'
  },
  {
    rule: "Usamos o Present Perfect para falar sobre experiências de vida, sem especificar quando elas aconteceram. Frequentemente usamos 'ever' (alguma vez) ou 'never' (nunca).",
    question: "She ___ a car accident.",
    options: ["had", "has had", "was having", "has"],
    correct: 1,
    explanation: 'É uma experiência de vida ("já sofreu um acidente de carro"). Usamos "has had".'
  },
  {
    rule: "Usamos o Present Perfect para falar sobre experiências de vida, sem especificar quando elas aconteceram. Frequentemente usamos 'ever' (alguma vez) ou 'never' (nunca).",
    question: "They ___ in a plane.",
    options: ["never flew", "have never flown", "were never flying", "never fly"],
    correct: 1,
    explanation: 'É uma experiência de vida ("nunca voaram de avião"). Usamos "have never flown".'
  },
  {
    rule: "Usamos o Present Perfect para falar sobre experiências de vida, sem especificar quando elas aconteceram. Frequentemente usamos 'ever' (alguma vez) ou 'never' (nunca).",
    question: "He ___ a professional athlete.",
    options: ["was", "has been", "is being", "is"],
    correct: 1,
    explanation: 'É uma experiência de vida ("já foi um atleta profissional"). Usamos "has been".'
  },
  {
    rule: "Usamos o Present Perfect para falar sobre experiências de vida, sem especificar quando elas aconteceram. Frequentemente usamos 'ever' (alguma vez) ou 'never' (nunca).",
    question: "We ___ a lot of challenges.",
    options: ["faced", "have faced", "were facing", "face"],
    correct: 1,
    explanation: 'É uma experiência de vida ("já enfrentamos muitos desafios"). Usamos "have faced".'
  },
  {
    rule: "Usamos o Present Perfect para falar sobre experiências de vida, sem especificar quando elas aconteceram. Frequentemente usamos 'ever' (alguma vez) ou 'never' (nunca).",
    question: "I ___ a famous painting.",
    options: ["saw", "have seen", "was seeing", "see"],
    correct: 1,
    explanation: 'É uma experiência de vida ("já vi uma pintura famosa"). Usamos "have seen".'
  },
  {
    rule: "Usamos o Present Perfect para falar sobre experiências de vida, sem especificar quando elas aconteceram. Frequentemente usamos 'ever' (alguma vez) ou 'never' (nunca).",
    question: "She ___ a speech in front of many people.",
    options: ["gave", "has given", "was giving", "gives"],
    correct: 1,
    explanation: 'É uma experiência de vida ("já fez um discurso para muitas pessoas"). Usamos "has given".'
  },
  {
    rule: "Usamos o Present Perfect para falar sobre experiências de vida, sem especificar quando elas aconteceram. Frequentemente usamos 'ever' (alguma vez) ou 'never' (nunca).",
    question: "They ___ a musical instrument.",
    options: ["played", "have played", "were playing", "play"],
    correct: 1,
    explanation: 'É uma experiência de vida ("já tocaram um instrumento musical"). Usamos "have played".'
  },
  {
    rule: "Usamos o Present Perfect para falar sobre experiências de vida, sem especificar quando elas aconteceram. Frequentemente usamos 'ever' (alguma vez) ou 'never' (nunca).",
    question: "He ___ a different culture.",
    options: ["experienced", "has experienced", "was experiencing", "experiences"],
    correct: 1,
    explanation: 'É uma experiência de vida ("já experimentou uma cultura diferente"). Usamos "has experienced".'
  },
  {
    rule: "Usamos o Present Perfect para falar sobre experiências de vida, sem especificar quando elas aconteceram. Frequentemente usamos 'ever' (alguma vez) ou 'never' (nunca).",
    question: "We ___ a lot of interesting people.",
    options: ["met", "have met", "were meeting", "meet"],
    correct: 1,
    explanation: 'É uma experiência de vida ("já conhecemos muitas pessoas interessantes"). Usamos "have met".'
  },

  // REGRA QUARTA — ações recentes com 'just', 'already', 'yet' (71 a 90)
  {
    rule: "Usamos o Present Perfect para ações que aconteceram muito recentemente, geralmente com 'just' (acabei de), 'already' (já) ou 'yet' (ainda, em negativas e perguntas).",
    question: "I ___ finished my dinner. I'm full.",
    options: ["just", "have just", "was just", "am just"],
    correct: 1,
    explanation: '"Just" indica uma ação muito recente. Usamos "have just finished".'
  },
  {
    rule: "Usamos o Present Perfect para ações que aconteceram muito recentemente, geralmente com 'just' (acabei de), 'already' (já) ou 'yet' (ainda, em negativas e perguntas).",
    question: "She ___ arrived. She's at the door.",
    options: ["just", "has just", "was just", "is just"],
    correct: 1,
    explanation: '"Just" indica uma ação muito recente. Usamos "has just arrived".'
  },
  {
    rule: "Usamos o Present Perfect para ações que aconteceram muito recentemente, geralmente com 'just' (acabei de), 'already' (já) ou 'yet' (ainda, em negativas e perguntas).",
    question: "They ___ left. You just missed them.",
    options: ["just", "have just", "were just", "are just"],
    correct: 1,
    explanation: '"Just" indica uma ação muito recente. Usamos "have just left".'
  },
  {
    rule: "Usamos o Present Perfect para ações que aconteceram muito recentemente, geralmente com 'just' (acabei de), 'already' (já) ou 'yet' (ainda, em negativas e perguntas).",
    question: "He ___ seen that movie. It was great.",
    options: ["just", "has just", "was just", "is just"],
    correct: 1,
    explanation: '"Just" indica uma ação muito recente. Usamos "has just seen".'
  },
  {
    rule: "Usamos o Present Perfect para ações que aconteceram muito recentemente, geralmente com 'just' (acabei de), 'already' (já) ou 'yet' (ainda, em negativas e perguntas).",
    question: "We ___ bought a new car. It's outside.",
    options: ["just", "have just", "were just", "are just"],
    correct: 1,
    explanation: '"Just" indica uma ação muito recente. Usamos "have just bought".'
  },
  {
    rule: "Usamos o Present Perfect para ações que aconteceram muito recentemente, geralmente com 'just' (acabei de), 'already' (já) ou 'yet' (ainda, em negativas e perguntas).",
    question: "I ___ finished my homework.",
    options: ["already", "have already", "was already", "am already"],
    correct: 1,
    explanation: '"Already" indica que a ação já foi concluída. Usamos "have already finished".'
  },
  {
    rule: "Usamos o Present Perfect para ações que aconteceram muito recentemente, geralmente com 'just' (acabei de), 'already' (já) ou 'yet' (ainda, em negativas e perguntas).",
    question: "She ___ seen that movie.",
    options: ["already", "has already", "was already", "is already"],
    correct: 1,
    explanation: '"Already" indica que a ação já foi concluída. Usamos "has already seen".'
  },
  {
    rule: "Usamos o Present Perfect para ações que aconteceram muito recentemente, geralmente com 'just' (acabei de), 'already' (já) ou 'yet' (ainda, em negativas e perguntas).",
    question: "They ___ eaten dinner.",
    options: ["already", "have already", "were already", "are already"],
    correct: 1,
    explanation: '"Already" indica que a ação já foi concluída. Usamos "have already eaten".'
  },
  {
    rule: "Usamos o Present Perfect para ações que aconteceram muito recentemente, geralmente com 'just' (acabei de), 'already' (já) ou 'yet' (ainda, em negativas e perguntas).",
    question: "He ___ paid the bill.",
    options: ["already", "has already", "was already", "is already"],
    correct: 1,
    explanation: '"Already" indica que a ação já foi concluída. Usamos "has already paid".'
  },
  {
    rule: "Usamos o Present Perfect para ações que aconteceram muito recentemente, geralmente com 'just' (acabei de), 'already' (já) ou 'yet' (ainda, em negativas e perguntas).",
    question: "We ___ booked our flights.",
    options: ["already", "have already", "were already", "are already"],
    correct: 1,
    explanation: '"Already" indica que a ação já foi concluída. Usamos "have already booked".'
  },
  {
    rule: "Usamos o Present Perfect para ações que aconteceram muito recentemente, geralmente com 'just' (acabei de), 'already' (já) ou 'yet' (ainda, em negativas e perguntas).",
    question: "Has he finished his work ___?",
    options: ["already", "just", "yet", "ever"],
    correct: 2,
    explanation: '"Yet" é usado em perguntas e negativas para indicar se algo aconteceu até agora. Usamos "yet".'
  },
  {
    rule: "Usamos o Present Perfect para ações que aconteceram muito recentemente, geralmente com 'just' (acabei de), 'already' (já) ou 'yet' (ainda, em negativas e perguntas).",
    question: "I haven't seen her ___.",
    options: ["already", "just", "yet", "ever"],
    correct: 2,
    explanation: '"Yet" é usado em negativas para indicar que algo não aconteceu até agora. Usamos "yet".'
  },
  {
    rule: "Usamos o Present Perfect para ações que aconteceram muito recentemente, geralmente com 'just' (acabei de), 'already' (já) ou 'yet' (ainda, em negativas e perguntas).",
    question: "They haven't arrived ___.",
    options: ["already", "just", "yet", "ever"],
    correct: 2,
    explanation: '"Yet" é usado em negativas para indicar que algo não aconteceu até agora. Usamos "yet".'
  },
  {
    rule: "Usamos o Present Perfect para ações que aconteceram muito recentemente, geralmente com 'just' (acabei de), 'already' (já) ou 'yet' (ainda, em negativas e perguntas).",
    question: "Has she called you ___?",
    options: ["already", "just", "yet", "ever"],
    correct: 2,
    explanation: '"Yet" é usado em perguntas para indicar se algo aconteceu até agora. Usamos "yet".'
  },
  {
    rule: "Usamos o Present Perfect para ações que aconteceram muito recentemente, geralmente com 'just' (acabei de), 'already' (já) ou 'yet' (ainda, em negativas e perguntas).",
    question: "We haven't decided ___.",
    options: ["already", "just", "yet", "ever"],
    correct: 2,
    explanation: '"Yet" é usado em negativas para indicar que algo não aconteceu até agora. Usamos "yet".'
  },
  {
    rule: "Usamos o Present Perfect para ações que aconteceram muito recentemente, geralmente com 'just' (acabei de), 'already' (já) ou 'yet' (ainda, em negativas e perguntas).",
    question: "I ___ received an email from him.",
    options: ["just", "have just", "was just", "am just"],
    correct: 1,
    explanation: '"Just" indica uma ação muito recente. Usamos "have just received".'
  },
  {
    rule: "Usamos o Present Perfect para ações que aconteceram muito recentemente, geralmente com 'just' (acabei de), 'already' (já) ou 'yet' (ainda, em negativas e perguntas).",
    question: "She ___ left for work.",
    options: ["just", "has just", "was just", "is just"],
    correct: 1,
    explanation: '"Just" indica uma ação muito recente. Usamos "has just left".'
  },
  {
    rule: "Usamos o Present Perfect para ações que aconteceram muito recentemente, geralmente com 'just' (acabei de), 'already' (já) ou 'yet' (ainda, em negativas e perguntas).",
    question: "They ___ finished their project.",
    options: ["already", "have already", "were already", "are already"],
    correct: 1,
    explanation: '"Already" indica que a ação já foi concluída. Usamos "have already finished".'
  },
  {
    rule: "Usamos o Present Perfect para ações que aconteceram muito recentemente, geralmente com 'just' (acabei de), 'already' (já) ou 'yet' (ainda, em negativas e perguntas).",
    question: "He ___ eaten lunch.",
    options: ["already", "has already", "was already", "is already"],
    correct: 1,
    explanation: '"Already" indica que a ação já foi concluída. Usamos "has already eaten".'
  },
  {
    rule: "Usamos o Present Perfect para ações que aconteceram muito recentemente, geralmente com 'just' (acabei de), 'already' (já) ou 'yet' (ainda, em negativas e perguntas).",
    question: "Have you packed your bags ___?",
    options: ["already", "just", "yet", "ever"],
    correct: 2,
    explanation: '"Yet" é usado em perguntas para indicar se algo aconteceu até agora. Usamos "yet".'
  },

  // NEGATIVA DO PRESENT PERFECT — haven't / hasn't (91 a 110)
  {
    rule: "Na negativa do Present Perfect usamos 'haven't' (I, you, we, they) ou 'hasn't' (he, she, it) + particípio passado.",
    question: "I ___ finished my work yet.",
    options: ["didn't", "haven't", "wasn't", "don't"],
    correct: 1,
    explanation: 'Na negativa do Present Perfect com "I", usamos "haven\'t" + particípio passado ("finished").'
  },
  {
    rule: "Na negativa do Present Perfect usamos 'haven't' (I, you, we, they) ou 'hasn't' (he, she, it) + particípio passado.",
    question: "She ___ seen that movie before.",
    options: ["didn't", "hasn't", "wasn't", "doesn't"],
    correct: 1,
    explanation: 'Na negativa do Present Perfect com "She", usamos "hasn\'t" + particípio passado ("seen").'
  },
  {
    rule: "Na negativa do Present Perfect usamos 'haven't' (I, you, we, they) ou 'hasn't' (he, she, it) + particípio passado.",
    question: "They ___ arrived yet.",
    options: ["didn't", "haven't", "weren't", "don't"],
    correct: 1,
    explanation: 'Na negativa do Present Perfect com "They", usamos "haven\'t" + particípio passado ("arrived").'
  },
  {
    rule: "Na negativa do Present Perfect usamos 'haven't' (I, you, we, they) ou 'hasn't' (he, she, it) + particípio passado.",
    question: "He ___ visited his grandparents this month.",
    options: ["didn't", "hasn't", "wasn't", "doesn't"],
    correct: 1,
    explanation: 'Na negativa do Present Perfect com "He", usamos "hasn\'t" + particípio passado ("visited").'
  },
  {
    rule: "Na negativa do Present Perfect usamos 'haven't' (I, you, we, they) ou 'hasn't' (he, she, it) + particípio passado.",
    question: "We ___ eaten anything since morning.",
    options: ["didn't", "haven't", "weren't", "don't"],
    correct: 1,
    explanation: 'Na negativa do Present Perfect com "We", usamos "haven\'t" + particípio passado ("eaten").'
  },
  {
    rule: "Na negativa do Present Perfect usamos 'haven't' (I, you, we, they) ou 'hasn't' (he, she, it) + particípio passado.",
    question: "I ___ been to that country.",
    options: ["didn't", "haven't", "wasn't", "don't"],
    correct: 1,
    explanation: 'Na negativa do Present Perfect com "I", usamos "haven\'t" + particípio passado ("been").'
  },
  {
    rule: "Na negativa do Present Perfect usamos 'haven't' (I, you, we, they) ou 'hasn't' (he, she, it) + particípio passado.",
    question: "She ___ called me back.",
    options: ["didn't", "hasn't", "wasn't", "doesn't"],
    correct: 1,
    explanation: 'Na negativa do Present Perfect com "She", usamos "hasn\'t" + particípio passado ("called").'
  },
  {
    rule: "Na negativa do Present Perfect usamos 'haven't' (I, you, we, they) ou 'hasn't' (he, she, it) + particípio passado.",
    question: "They ___ decided what to do.",
    options: ["didn't", "haven't", "weren't", "don't"],
    correct: 1,
    explanation: 'Na negativa do Present Perfect com "They", usamos "haven\'t" + particípio passado ("decided").'
  },
  {
    rule: "Na negativa do Present Perfect usamos 'haven't' (I, you, we, they) ou 'hasn't' (he, she, it) + particípio passado.",
    question: "He ___ found his keys yet.",
    options: ["didn't", "hasn't", "wasn't", "doesn't"],
    correct: 1,
    explanation: 'Na negativa do Present Perfect com "He", usamos "hasn\'t" + particípio passado ("found").'
  },
  {
    rule: "Na negativa do Present Perfect usamos 'haven't' (I, you, we, they) ou 'hasn't' (he, she, it) + particípio passado.",
    question: "We ___ seen each other for ages.",
    options: ["didn't", "haven't", "weren't", "don't"],
    correct: 1,
    explanation: 'Na negativa do Present Perfect com "We", usamos "haven\'t" + particípio passado ("seen").'
  },
  {
    rule: "Na negativa do Present Perfect usamos 'haven't' (I, you, we, they) ou 'hasn't' (he, she, it) + particípio passado.",
    question: "I ___ finished reading that book.",
    options: ["didn't", "haven't", "wasn't", "don't"],
    correct: 1,
    explanation: 'Na negativa do Present Perfect com "I", usamos "haven\'t" + particípio passado ("finished").'
  },
  {
    rule: "Na negativa do Present Perfect usamos 'haven't' (I, you, we, they) ou 'hasn't' (he, she, it) + particípio passado.",
    question: "She ___ traveled abroad before.",
    options: ["didn't", "hasn't", "wasn't", "doesn't"],
    correct: 1,
    explanation: 'Na negativa do Present Perfect com "She", usamos "hasn\'t" + particípio passado ("traveled").'
  },
  {
    rule: "Na negativa do Present Perfect usamos 'haven't' (I, you, we, they) ou 'hasn't' (he, she, it) + particípio passado.",
    question: "They ___ bought a new car.",
    options: ["didn't", "haven't", "weren't", "don't"],
    correct: 1,
    explanation: 'Na negativa do Present Perfect com "They", usamos "haven\'t" + particípio passado ("bought").'
  },
  {
    rule: "Na negativa do Present Perfect usamos 'haven't' (I, you, we, they) ou 'hasn't' (he, she, it) + particípio passado.",
    question: "He ___ eaten his breakfast yet.",
    options: ["didn't", "hasn't", "wasn't", "doesn't"],
    correct: 1,
    explanation: 'Na negativa do Present Perfect com "He", usamos "hasn\'t" + particípio passado ("eaten").'
  },
  {
    rule: "Na negativa do Present Perfect usamos 'haven't' (I, you, we, they) ou 'hasn't' (he, she, it) + particípio passado.",
    question: "We ___ heard from them recently.",
    options: ["didn't", "haven't", "weren't", "don't"],
    correct: 1,
    explanation: 'Na negativa do Present Perfect com "We", usamos "haven\'t" + particípio passado ("heard").'
  },
  {
    rule: "Na negativa do Present Perfect usamos 'haven't' (I, you, we, they) ou 'hasn't' (he, she, it) + particípio passado.",
    question: "I ___ understood the instructions.",
    options: ["didn't", "haven't", "wasn't", "don't"],
    correct: 1,
    explanation: 'Na negativa do Present Perfect com "I", usamos "haven\'t" + particípio passado ("understood").'
  },
  {
    rule: "Na negativa do Present Perfect usamos 'haven't' (I, you, we, they) ou 'hasn't' (he, she, it) + particípio passado.",
    question: "She ___ started her new job yet.",
    options: ["didn't", "hasn't", "wasn't", "doesn't"],
    correct: 1,
    explanation: 'Na negativa do Present Perfect com "She", usamos "hasn\'t" + particípio passado ("started").'
  },
  {
    rule: "Na negativa do Present Perfect usamos 'haven't' (I, you, we, they) ou 'hasn't' (he, she, it) + particípio passado.",
    question: "They ___ seen that movie.",
    options: ["didn't", "haven't", "weren't", "don't"],
    correct: 1,
    explanation: 'Na negativa do Present Perfect com "They", usamos "haven\'t" + particípio passado ("seen").'
  },
  {
    rule: "Na negativa do Present Perfect usamos 'haven't' (I, you, we, they) ou 'hasn't' (he, she, it) + particípio passado.",
    question: "He ___ called his mother today.",
    options: ["didn't", "hasn't", "wasn't", "doesn't"],
    correct: 1,
    explanation: 'Na negativa do Present Perfect com "He", usamos "hasn\'t" + particípio passado ("called").'
  },
  {
    rule: "Na negativa do Present Perfect usamos 'haven't' (I, you, we, they) ou 'hasn't' (he, she, it) + particípio passado.",
    question: "We ___ finished our project.",
    options: ["didn't", "haven't", "weren't", "don't"],
    correct: 1,
    explanation: 'Na negativa do Present Perfect com "We", usamos "haven\'t" + particípio passado ("finished").'
  },

  // INTERROGATIVA DO PRESENT PERFECT — Have / Has (111 a 130)
  {
    rule: "Na interrogativa do Present Perfect usamos 'Have' (I, you, we, they) ou 'Has' (he, she, it) + sujeito + particípio passado.",
    question: "___ you ever been to New York?",
    options: ["Did you", "Have you", "Are you", "Do you"],
    correct: 1,
    explanation: 'Na interrogativa do Present Perfect com "You", usamos "Have" + sujeito + particípio passado ("been").'
  },
  {
    rule: "Na interrogativa do Present Perfect usamos 'Have' (I, you, we, they) ou 'Has' (he, she, it) + sujeito + particípio passado.",
    question: "___ she finished her homework yet?",
    options: ["Did she", "Has she", "Is she", "Does she"],
    correct: 1,
    explanation: 'Na interrogativa do Present Perfect com "She", usamos "Has" + sujeito + particípio passado ("finished").'
  },
  {
    rule: "Na interrogativa do Present Perfect usamos 'Have' (I, you, we, they) ou 'Has' (he, she, it) + sujeito + particípio passado.",
    question: "___ they seen that movie?",
    options: ["Did they", "Have they", "Are they", "Do they"],
    correct: 1,
    explanation: 'Na interrogativa do Present Perfect com "They", usamos "Have" + sujeito + particípio passado ("seen").'
  },
  {
    rule: "Na interrogativa do Present Perfect usamos 'Have' (I, you, we, they) ou 'Has' (he, she, it) + sujeito + particípio passado.",
    question: "___ he ever eaten sushi?",
    options: ["Did he", "Has he", "Is he", "Does he"],
    correct: 1,
    explanation: 'Na interrogativa do Present Perfect com "He", usamos "Has" + sujeito + particípio passado ("eaten").'
  },
  {
    rule: "Na interrogativa do Present Perfect usamos 'Have' (I, you, we, they) ou 'Has' (he, she, it) + sujeito + particípio passado.",
    question: "___ we met before?",
    options: ["Did we", "Have we", "Are we", "Do we"],
    correct: 1,
    explanation: 'Na interrogativa do Present Perfect com "We", usamos "Have" + sujeito + particípio passado ("met").'
  },
  {
    rule: "Na interrogativa do Present Perfect usamos 'Have' (I, you, we, they) ou 'Has' (he, she, it) + sujeito + particípio passado.",
    question: "___ you finished your work?",
    options: ["Did you", "Have you", "Are you", "Do you"],
    correct: 1,
    explanation: 'Na interrogativa do Present Perfect com "You", usamos "Have" + sujeito + particípio passado ("finished").'
  },
  {
    rule: "Na interrogativa do Present Perfect usamos 'Have' (I, you, we, they) ou 'Has' (he, she, it) + sujeito + particípio passado.",
    question: "___ she called you?",
    options: ["Did she", "Has she", "Is she", "Does she"],
    correct: 1,
    explanation: 'Na interrogativa do Present Perfect com "She", usamos "Has" + sujeito + particípio passado ("called").'
  },
  {
    rule: "Na interrogativa do Present Perfect usamos 'Have' (I, you, we, they) ou 'Has' (he, she, it) + sujeito + particípio passado.",
    question: "___ they arrived?",
    options: ["Did they", "Have they", "Are they", "Do they"],
    correct: 1,
    explanation: 'Na interrogativa do Present Perfect com "They", usamos "Have" + sujeito + particípio passado ("arrived").'
  },
  {
    rule: "Na interrogativa do Present Perfect usamos 'Have' (I, you, we, they) ou 'Has' (he, she, it) + sujeito + particípio passado.",
    question: "___ he found his keys?",
    options: ["Did he", "Has he", "Is he", "Does he"],
    correct: 1,
    explanation: 'Na interrogativa do Present Perfect com "He", usamos "Has" + sujeito + particípio passado ("found").'
  },
  {
    rule: "Na interrogativa do Present Perfect usamos 'Have' (I, you, we, they) ou 'Has' (he, she, it) + sujeito + particípio passado.",
    question: "___ we seen each other for ages?",
    options: ["Did we", "Have we", "Are we", "Do we"],
    correct: 1,
    explanation: 'Na interrogativa do Present Perfect com "We", usamos "Have" + sujeito + particípio passado ("seen").'
  },
  {
    rule: "Na interrogativa do Present Perfect usamos 'Have' (I, you, we, they) ou 'Has' (he, she, it) + sujeito + particípio passado.",
    question: "___ you ever tried skydiving?",
    options: ["Did you", "Have you", "Are you", "Do you"],
    correct: 1,
    explanation: 'Na interrogativa do Present Perfect com "You", usamos "Have" + sujeito + particípio passado ("tried").'
  },
  {
    rule: "Na interrogativa do Present Perfect usamos 'Have' (I, you, we, they) ou 'Has' (he, she, it) + sujeito + particípio passado.",
    question: "___ she read that book?",
    options: ["Did she", "Has she", "Is she", "Does she"],
    correct: 1,
    explanation: 'Na interrogativa do Present Perfect com "She", usamos "Has" + sujeito + particípio passado ("read").'
  },
  {
    rule: "Na interrogativa do Present Perfect usamos 'Have' (I, you, we, they) ou 'Has' (he, she, it) + sujeito + particípio passado.",
    question: "___ they bought a new house?",
    options: ["Did they", "Have they", "Are they", "Do they"],
    correct: 1,
    explanation: 'Na interrogativa do Present Perfect com "They", usamos "Have" + sujeito + particípio passado ("bought").'
  },
  {
    rule: "Na interrogativa do Present Perfect usamos 'Have' (I, you, we, they) ou 'Has' (he, she, it) + sujeito + particípio passado.",
    question: "___ he eaten his breakfast?",
    options: ["Did he", "Has he", "Is he", "Does he"],
    correct: 1,
    explanation: 'Na interrogativa do Present Perfect com "He", usamos "Has" + sujeito + particípio passado ("eaten").'
  },
  {
    rule: "Na interrogativa do Present Perfect usamos 'Have' (I, you, we, they) ou 'Has' (he, she, it) + sujeito + particípio passado.",
    question: "___ we heard from them?",
    options: ["Did we", "Have we", "Are we", "Do we"],
    correct: 1,
    explanation: 'Na interrogativa do Present Perfect com "We", usamos "Have" + sujeito + particípio passado ("heard").'
  },
  {
    rule: "Na interrogativa do Present Perfect usamos 'Have' (I, you, we, they) ou 'Has' (he, she, it) + sujeito + particípio passado.",
    question: "___ you understood the lesson?",
    options: ["Did you", "Have you", "Are you", "Do you"],
    correct: 1,
    explanation: 'Na interrogativa do Present Perfect com "You", usamos "Have" + sujeito + particípio passado ("understood").'
  },
  {
    rule: "Na interrogativa do Present Perfect usamos 'Have' (I, you, we, they) ou 'Has' (he, she, it) + sujeito + particípio passado.",
    question: "___ she started her new job?",
    options: ["Did she", "Has she", "Is she", "Does she"],
    correct: 1,
    explanation: 'Na interrogativa do Present Perfect com "She", usamos "Has" + sujeito + particípio passado ("started").'
  },
  {
    rule: "Na interrogativa do Present Perfect usamos 'Have' (I, you, we, they) ou 'Has' (he, she, it) + sujeito + particípio passado.",
    question: "___ they finished their project?",
    options: ["Did they", "Have they", "Are they", "Do they"],
    correct: 1,
    explanation: 'Na interrogativa do Present Perfect com "They", usamos "Have" + sujeito + particípio passado ("finished").'
  },
  {
    rule: "Na interrogativa do Present Perfect usamos 'Have' (I, you, we, they) ou 'Has' (he, she, it) + sujeito + particípio passado.",
    question: "___ he called his family?",
    options: ["Did he", "Has he", "Is he", "Does he"],
    correct: 1,
    explanation: 'Na interrogativa do Present Perfect com "He", usamos "Has" + sujeito + particípio passado ("called").'
  },
  {
    rule: "Na interrogativa do Present Perfect usamos 'Have' (I, you, we, they) ou 'Has' (he, she, it) + sujeito + particípio passado.",
    question: "___ we made a decision?",
    options: ["Did we", "Have we", "Are we", "Do we"],
    correct: 1,
    explanation: 'Na interrogativa do Present Perfect com "We", usamos "Have" + sujeito + particípio passado ("made").'
  },

  // PRESENT PERFECT vs SIMPLE PAST (131 a 150)
  {
    rule: "Present Perfect vs Simple Past: Usamos Simple Past para ações concluídas em um tempo específico no passado. Usamos Present Perfect para ações com resultado no presente, experiências de vida ou ações que continuam até agora, sem tempo específico ou com 'for'/'since'.",
    question: "I ___ to the cinema yesterday. (Simple Past)",
    options: ["went", "have gone", "go", "am going"],
    correct: 0,
    explanation: '"Yesterday" é um tempo específico no passado, então usamos Simple Past: "went".'
  },
  {
    rule: "Present Perfect vs Simple Past: Usamos Simple Past para ações concluídas em um tempo específico no passado. Usamos Present Perfect para ações com resultado no presente, experiências de vida ou ações que continuam até agora, sem tempo específico ou com 'for'/'since'.",
    question: "I ___ to the cinema many times. (Present Perfect)",
    options: ["went", "have been", "go", "am going"],
    correct: 1,
    explanation: 'É uma experiência de vida, sem tempo específico. Usamos Present Perfect: "have been".'
  },
  {
    rule: "Present Perfect vs Simple Past: Usamos Simple Past para ações concluídas em um tempo específico no passado. Usamos Present Perfect para ações com resultado no presente, experiências de vida ou ações que continuam até agora, sem tempo específico ou com 'for'/'since'.",
    question: "She ___ her keys last night. (Simple Past)",
    options: ["lost", "has lost", "loses", "is losing"],
    correct: 0,
    explanation: '"Last night" é um tempo específico no passado. Usamos Simple Past: "lost".'
  },
  {
    rule: "Present Perfect vs Simple Past: Usamos Simple Past para ações concluídas em um tempo específico no passado. Usamos Present Perfect para ações com resultado no presente, experiências de vida ou ações que continuam até agora, sem tempo específico ou com 'for'/'since'.",
    question: "She can't find her keys. She ___ them. (Present Perfect)",
    options: ["lost", "has lost", "loses", "is losing"],
    correct: 1,
    explanation: 'O resultado (não encontrar as chaves agora) é relevante no presente. Usamos Present Perfect: "has lost".'
  },
  {
    rule: "Present Perfect vs Simple Past: Usamos Simple Past para ações concluídas em um tempo específico no passado. Usamos Present Perfect para ações com resultado no presente, experiências de vida ou ações que continuam até agora, sem tempo específico ou com 'for'/'since'.",
    question: "They ___ to London in 2020. (Simple Past)",
    options: ["went", "have been", "go", "are going"],
    correct: 0,
    explanation: '"In 2020" é um tempo específico no passado. Usamos Simple Past: "went".'
  },
  {
    rule: "Present Perfect vs Simple Past: Usamos Simple Past para ações concluídas em um tempo específico no passado. Usamos Present Perfect para ações com resultado no presente, experiências de vida ou ações que continuam até agora, sem tempo específico ou com 'for'/'since'.",
    question: "They ___ to London twice. (Present Perfect)",
    options: ["went", "have been", "go", "are going"],
    correct: 1,
    explanation: 'É uma experiência de vida, sem tempo específico. Usamos Present Perfect: "have been".'
  },
  {
    rule: "Present Perfect vs Simple Past: Usamos Simple Past para ações concluídas em um tempo específico no passado. Usamos Present Perfect para ações com resultado no presente, experiências de vida ou ações que continuam até agora, sem tempo específico ou com 'for'/'since'.",
    question: "He ___ his homework an hour ago. (Simple Past)",
    options: ["finished", "has finished", "finishes", "is finishing"],
    correct: 0,
    explanation: '"An hour ago" é um tempo específico no passado. Usamos Simple Past: "finished".'
  },
  {
    rule: "Present Perfect vs Simple Past: Usamos Simple Past para ações concluídas em um tempo específico no passado. Usamos Present Perfect para ações com resultado no presente, experiências de vida ou ações que continuam até agora, sem tempo específico ou com 'for'/'since'.",
    question: "He is free now. He ___ his homework. (Present Perfect)",
    options: ["finished", "has finished", "finishes", "is finishing"],
    correct: 1,
    explanation: 'O resultado (estar livre agora) é relevante no presente. Usamos Present Perfect: "has finished".'
  },
  {
    rule: "Present Perfect vs Simple Past: Usamos Simple Past para ações concluídas em um tempo específico no passado. Usamos Present Perfect para ações com resultado no presente, experiências de vida ou ações que continuam até agora, sem tempo específico ou com 'for'/'since'.",
    question: "We ___ a new car last month. (Simple Past)",
    options: ["bought", "have bought", "buy", "are buying"],
    correct: 0,
    explanation: '"Last month" é um tempo específico no passado. Usamos Simple Past: "bought".'
  },
  {
    rule: "Present Perfect vs Simple Past: Usamos Simple Past para ações concluídas em um tempo específico no passado. Usamos Present Perfect para ações com resultado no presente, experiências de vida ou ações que continuam até agora, sem tempo específico ou com 'for'/'since'.",
    question: "We have a new car now. We ___ it. (Present Perfect)",
    options: ["bought", "have bought", "buy", "are buying"],
    correct: 1,
    explanation: 'O resultado (ter um carro novo agora) é relevante no presente. Usamos Present Perfect: "have bought".'
  },
  {
    rule: "Present Perfect vs Simple Past: Usamos Simple Past para ações concluídas em um tempo específico no passado. Usamos Present Perfect para ações com resultado no presente, experiências de vida ou ações que continuam até agora, sem tempo específico ou com 'for'/'since'.",
    question: "I ___ a great book last week. (Simple Past)",
    options: ["read", "have read", "read", "am reading"],
    correct: 0,
    explanation: '"Last week" é um tempo específico no passado. Usamos Simple Past: "read" (pronunciado "red").'
  },
  {
    rule: "Present Perfect vs Simple Past: Usamos Simple Past para ações concluídas em um tempo específico no passado. Usamos Present Perfect para ações com resultado no presente, experiências de vida ou ações que continuam até agora, sem tempo específico ou com 'for'/'since'.",
    question: "I ___ this book for three days. (Present Perfect)",
    options: ["read", "have read", "read", "am reading"],
    correct: 1,
    explanation: 'A ação começou no passado e continua ("for three days"). Usamos Present Perfect: "have read".'
  },
  {
    rule: "Present Perfect vs Simple Past: Usamos Simple Past para ações concluídas em um tempo específico no passado. Usamos Present Perfect para ações com resultado no presente, experiências de vida ou ações que continuam até agora, sem tempo específico ou com 'for'/'since'.",
    question: "She ___ to Paris in 2021. (Simple Past)",
    options: ["went", "has been", "goes", "is going"],
    correct: 0,
    explanation: '"In 2021" é um tempo específico no passado. Usamos Simple Past: "went".'
  },
  {
    rule: "Present Perfect vs Simple Past: Usamos Simple Past para ações concluídas em um tempo específico no passado. Usamos Present Perfect para ações com resultado no presente, experiências de vida ou ações que continuam até agora, sem tempo específico ou com 'for'/'since'.",
    question: "She ___ to Paris twice. (Present Perfect)",
    options: ["went", "has been", "goes", "is going"],
    correct: 1,
    explanation: 'É uma experiência de vida, sem tempo específico. Usamos Present Perfect: "has been".'
  },
  {
    rule: "Present Perfect vs Simple Past: Usamos Simple Past para ações concluídas em um tempo específico no passado. Usamos Present Perfect para ações com resultado no presente, experiências de vida ou ações que continuam até agora, sem tempo específico ou com 'for'/'since'.",
    question: "They ___ a new movie last week. (Simple Past)",
    options: ["released", "have released", "release", "are releasing"],
    correct: 0,
    explanation: '"Last week" é um tempo específico no passado. Usamos Simple Past: "released".'
  },
  {
    rule: "Present Perfect vs Simple Past: Usamos Simple Past para ações concluídas em um tempo específico no passado. Usamos Present Perfect para ações com resultado no presente, experiências de vida ou ações que continuam até agora, sem tempo específico ou com 'for'/'since'.",
    question: "The new movie is in cinemas now. They ___ it. (Present Perfect)",
    options: ["released", "have released", "release", "are releasing"],
    correct: 1,
    explanation: 'O resultado (estar nos cinemas agora) é relevante no presente. Usamos Present Perfect: "have released".'
  },
  {
    rule: "Present Perfect vs Simple Past: Usamos Simple Past para ações concluídas em um tempo específico no passado. Usamos Present Perfect para ações com resultado no presente, experiências de vida ou ações que continuam até agora, sem tempo específico ou com 'for'/'since'.",
    question: "He ___ his job in 2023. (Simple Past)",
    options: ["lost", "has lost", "loses", "is losing"],
    correct: 0,
    explanation: '"In 2023" é um tempo específico no passado. Usamos Simple Past: "lost".'
  },
  {
    rule: "Present Perfect vs Simple Past: Usamos Simple Past para ações concluídas em um tempo específico no passado. Usamos Present Perfect para ações com resultado no presente, experiências de vida ou ações que continuam até agora, sem tempo específico ou com 'for'/'since'.",
    question: "He is looking for a new job. He ___ his old one. (Present Perfect)",
    options: ["lost", "has lost", "loses", "is losing"],
    correct: 1,
    explanation: 'O resultado (estar procurando um novo emprego) é relevante no presente. Usamos Present Perfect: "has lost".'
  },
  {
    rule: "Present Perfect vs Simple Past: Usamos Simple Past para ações concluídas em um tempo específico no passado. Usamos Present Perfect para ações com resultado no presente, experiências de vida ou ações que continuam até agora, sem tempo específico ou com 'for'/'since'.",
    question: "I ___ my hand yesterday. (Simple Past)",
    options: ["cut", "have cut", "cut", "am cutting"],
    correct: 0,
    explanation: '"Yesterday" é um tempo específico no passado. Usamos Simple Past: "cut".'
  },
  {
    rule: "Present Perfect vs Simple Past: Usamos Simple Past para ações concluídas em um tempo específico no passado. Usamos Present Perfect para ações com resultado no presente, experiências de vida ou ações que continuam até agora, sem tempo específico ou com 'for'/'since'.",
    question: "My hand hurts. I ___ it. (Present Perfect)",
    options: ["cut", "have cut", "cut", "am cutting"],
    correct: 1,
    explanation: 'O resultado (a mão estar doendo) é relevante no presente. Usamos Present Perfect: "have cut".'
  },
];

// ============================================================
// BANCO DE QUESTÕES — PRESENT PERFECT CONTINUOUS (150 questões)
// ============================================================

const presentPerfectContinuousQuestions = [

  // REGRA PRIMÁRIA — ação que começou no passado e continua até o presente, com ênfase na duração (1 a 30)
  {
    rule: "Usamos o Present Perfect Continuous para ações que começaram no passado e continuam até o presente, com ênfase na duração da ação. Geralmente usamos 'for' ou 'since'.",
    question: "I ___ for two hours.",
    options: ["have been studying", "studied", "was studying", "study"],
    correct: 0,
    explanation: 'A ação de estudar começou no passado e continua até agora, com ênfase na duração ("for two hours"). Usamos "have been studying".'
  },
  {
    rule: "Usamos o Present Perfect Continuous para ações que começaram no passado e continuam até o presente, com ênfase na duração da ação. Geralmente usamos 'for' ou 'since'.",
    question: "She ___ since morning.",
    options: ["has been waiting", "waited", "was waiting", "waits"],
    correct: 0,
    explanation: 'A ação de esperar começou no passado e continua até agora, com ênfase na duração ("since morning"). Usamos "has been waiting".'
  },
  {
    rule: "Usamos o Present Perfect Continuous para ações que começaram no passado e continuam até o presente, com ênfase na duração da ação. Geralmente usamos 'for' ou 'since'.",
    question: "They ___ for a long time.",
    options: ["have been living", "lived", "were living", "live"],
    correct: 0,
    explanation: 'A ação de morar começou no passado e continua até agora, com ênfase na duração ("for a long time"). Usamos "have been living".'
  },
  {
    rule: "Usamos o Present Perfect Continuous para ações que começaram no passado e continuam até o presente, com ênfase na duração da ação. Geralmente usamos 'for' ou 'since'.",
    question: "He ___ all day.",
    options: ["has been working", "worked", "was working", "works"],
    correct: 0,
    explanation: 'A ação de trabalhar começou no passado e continua até agora, com ênfase na duração ("all day"). Usamos "has been working".'
  },
  {
    rule: "Usamos o Present Perfect Continuous para ações que começaram no passado e continuam até o presente, com ênfase na duração da ação. Geralmente usamos 'for' ou 'since'.",
    question: "We ___ since 8 a.m.",
    options: ["have been discussing", "discussed", "were discussing", "discuss"],
    correct: 0,
    explanation: 'A ação de discutir começou no passado e continua até agora, com ênfase na duração ("since 8 a.m."). Usamos "have been discussing".'
  },
  {
    rule: "Usamos o Present Perfect Continuous para ações que começaram no passado e continuam até o presente, com ênfase na duração da ação. Geralmente usamos 'for' ou 'since'.",
    question: "I ___ for an hour.",
    options: ["have been reading", "read", "was reading", "read"],
    correct: 0,
    explanation: 'A ação de ler começou no passado e continua até agora, com ênfase na duração ("for an hour"). Usamos "have been reading".'
  },
  {
    rule: "Usamos o Present Perfect Continuous para ações que começaram no passado e continuam até o presente, com ênfase na duração da ação. Geralmente usamos 'for' ou 'since'.",
    question: "She ___ for a week.",
    options: ["has been traveling", "traveled", "was traveling", "travels"],
    correct: 0,
    explanation: 'A ação de viajar começou no passado e continua até agora, com ênfase na duração ("for a week"). Usamos "has been traveling".'
  },
  {
    rule: "Usamos o Present Perfect Continuous para ações que começaram no passado e continuam até o presente, com ênfase na duração da ação. Geralmente usamos 'for' ou 'since'.",
    question: "They ___ for three months.",
    options: ["have been learning", "learned", "were learning", "learn"],
    correct: 0,
    explanation: 'A ação de aprender começou no passado e continua até agora, com ênfase na duração ("for three months"). Usamos "have been learning".'
  },
  {
    rule: "Usamos o Present Perfect Continuous para ações que começaram no passado e continuam até o presente, com ênfase na duração da ação. Geralmente usamos 'for' ou 'since'.",
    question: "He ___ since he was a child.",
    options: ["has been playing", "played", "was playing", "plays"],
    correct: 0,
    explanation: 'A ação de tocar começou no passado e continua até agora, com ênfase na duração ("since he was a child"). Usamos "has been playing".'
  },
  {
    rule: "Usamos o Present Perfect Continuous para ações que começaram no passado e continuam até o presente, com ênfase na duração da ação. Geralmente usamos 'for' ou 'since'.",
    question: "We ___ for a long time.",
    options: ["have been waiting", "waited", "were waiting", "wait"],
    correct: 0,
    explanation: 'A ação de esperar começou no passado e continua até agora, com ênfase na duração ("for a long time"). Usamos "have been waiting".'
  },
  {
    rule: "Usamos o Present Perfect Continuous para ações que começaram no passado e continuam até o presente, com ênfase na duração da ação. Geralmente usamos 'for' ou 'since'.",
    question: "I ___ all morning.",
    options: ["have been cleaning", "cleaned", "was cleaning", "clean"],
    correct: 0,
    explanation: 'A ação de limpar começou no passado e continua até agora, com ênfase na duração ("all morning"). Usamos "have been cleaning".'
  },
  {
    rule: "Usamos o Present Perfect Continuous para ações que começaram no passado e continuam até o presente, com ênfase na duração da ação. Geralmente usamos 'for' ou 'since'.",
    question: "She ___ for five years.",
    options: ["has been teaching", "taught", "was teaching", "teaches"],
    correct: 0,
    explanation: 'A ação de ensinar começou no passado e continua até agora, com ênfase na duração ("for five years"). Usamos "has been teaching".'
  },
  {
    rule: "Usamos o Present Perfect Continuous para ações que começaram no passado e continuam até o presente, com ênfase na duração da ação. Geralmente usamos 'for' ou 'since'.",
    question: "They ___ since last year.",
    options: ["have been building", "built", "were building", "build"],
    correct: 0,
    explanation: 'A ação de construir começou no passado e continua até agora, com ênfase na duração ("since last year"). Usamos "have been building".'
  },
  {
    rule: "Usamos o Present Perfect Continuous para ações que começaram no passado e continuam até o presente, com ênfase na duração da ação. Geralmente usamos 'for' ou 'since'.",
    question: "He ___ for an hour.",
    options: ["has been talking", "talked", "was talking", "talks"],
    correct: 0,
    explanation: 'A ação de conversar começou no passado e continua até agora, com ênfase na duração ("for an hour"). Usamos "has been talking".'
  },
  {
    rule: "Usamos o Present Perfect Continuous para ações que começaram no passado e continuam até o presente, com ênfase na duração da ação. Geralmente usamos 'for' ou 'since'.",
    question: "We ___ for a long time.",
    options: ["have been planning", "planned", "were planning", "plan"],
    correct: 0,
    explanation: 'A ação de planejar começou no passado e continua até agora, com ênfase na duração ("for a long time"). Usamos "have been planning".'
  },
  {
    rule: "Usamos o Present Perfect Continuous para ações que começaram no passado e continuam até o presente, com ênfase na duração da ação. Geralmente usamos 'for' ou 'since'.",
    question: "I ___ for three hours.",
    options: ["have been driving", "drove", "was driving", "drive"],
    correct: 0,
    explanation: 'A ação de dirigir começou no passado e continua até agora, com ênfase na duração ("for three hours"). Usamos "have been driving".'
  },
  {
    rule: "Usamos o Present Perfect Continuous para ações que começaram no passado e continuam até o presente, com ênfase na duração da ação. Geralmente usamos 'for' ou 'since'.",
    question: "She ___ since she was a teenager.",
    options: ["has been writing", "wrote", "was writing", "writes"],
    correct: 0,
    explanation: 'A ação de escrever começou no passado e continua até agora, com ênfase na duração ("since she was a teenager"). Usamos "has been writing".'
  },
  {
    rule: "Usamos o Present Perfect Continuous para ações que começaram no passado e continuam até o presente, com ênfase na duração da ação. Geralmente usamos 'for' ou 'since'.",
    question: "They ___ all afternoon.",
    options: ["have been playing", "played", "were playing", "play"],
    correct: 0,
    explanation: 'A ação de brincar/jogar começou no passado e continua até agora, com ênfase na duração ("all afternoon"). Usamos "have been playing".'
  },
  {
    rule: "Usamos o Present Perfect Continuous para ações que começaram no passado e continuam até o presente, com ênfase na duração da ação. Geralmente usamos 'for' ou 'since'.",
    question: "He ___ for two weeks.",
    options: ["has been training", "trained", "was training", "trains"],
    correct: 0,
    explanation: 'A ação de treinar começou no passado e continua até agora, com ênfase na duração ("for two weeks"). Usamos "has been training".'
  },
  {
    rule: "Usamos o Present Perfect Continuous para ações que começaram no passado e continuam até o presente, com ênfase na duração da ação. Geralmente usamos 'for' ou 'since'.",
    question: "We ___ since the morning.",
    options: ["have been cooking", "cooked", "were cooking", "cook"],
    correct: 0,
    explanation: 'A ação de cozinhar começou no passado e continua até agora, com ênfase na duração ("since the morning"). Usamos "have been cooking".'
  },
  {
    rule: "Usamos o Present Perfect Continuous para ações que começaram no passado e continuam até o presente, com ênfase na duração da ação. Geralmente usamos 'for' ou 'since'.",
    question: "I ___ for a long time.",
    options: ["have been thinking", "thought", "was thinking", "think"],
    correct: 0,
    explanation: 'A ação de pensar começou no passado e continua até agora, com ênfase na duração ("for a long time"). Usamos "have been thinking".'
  },
  {
    rule: "Usamos o Present Perfect Continuous para ações que começaram no passado e continuam até o presente, com ênfase na duração da ação. Geralmente usamos 'for' ou 'since'.",
    question: "She ___ for three hours.",
    options: ["has been watching", "watched", "was watching", "watches"],
    correct: 0,
    explanation: 'A ação de assistir começou no passado e continua até agora, com ênfase na duração ("for three hours"). Usamos "has been watching".'
  },
  {
    rule: "Usamos o Present Perfect Continuous para ações que começaram no passado e continuam até o presente, com ênfase na duração da ação. Geralmente usamos 'for' ou 'since'.",
    question: "They ___ all night.",
    options: ["have been dancing", "danced", "were dancing", "dance"],
    correct: 0,
    explanation: 'A ação de dançar começou no passado e continua até agora, com ênfase na duração ("all night"). Usamos "have been dancing".'
  },
  {
    rule: "Usamos o Present Perfect Continuous para ações que começaram no passado e continuam até o presente, com ênfase na duração da ação. Geralmente usamos 'for' ou 'since'.",
    question: "He ___ for six months.",
    options: ["has been learning", "learned", "was learning", "learns"],
    correct: 0,
    explanation: 'A ação de aprender começou no passado e continua até agora, com ênfase na duração ("for six months"). Usamos "has been learning".'
  },
  {
    rule: "Usamos o Present Perfect Continuous para ações que começaram no passado e continuam até o presente, com ênfase na duração da ação. Geralmente usamos 'for' ou 'since'.",
    question: "We ___ for a while.",
    options: ["have been waiting", "waited", "were waiting", "wait"],
    correct: 0,
    explanation: 'A ação de esperar começou no passado e continua até agora, com ênfase na duração ("for a while"). Usamos "have been waiting".'
  },
  {
    rule: "Usamos o Present Perfect Continuous para ações que começaram no passado e continuam até o presente, com ênfase na duração da ação. Geralmente usamos 'for' ou 'since'.",
    question: "I ___ all day.",
    options: ["have been working", "worked", "was working", "work"],
    correct: 0,
    explanation: 'A ação de trabalhar começou no passado e continua até agora, com ênfase na duração ("all day"). Usamos "have been working".'
  },
  {
    rule: "Usamos o Present Perfect Continuous para ações que começaram no passado e continuam até o presente, com ênfase na duração da ação. Geralmente usamos 'for' ou 'since'.",
    question: "She ___ for an hour.",
    options: ["has been talking", "talked", "was talking", "talks"],
    correct: 0,
    explanation: 'A ação de conversar começou no passado e continua até agora, com ênfase na duração ("for an hour"). Usamos "has been talking".'
  },
  {
    rule: "Usamos o Present Perfect Continuous para ações que começaram no passado e continuam até o presente, com ênfase na duração da ação. Geralmente usamos 'for' ou 'since'.",
    question: "They ___ since 2020.",
    options: ["have been living", "lived", "were living", "live"],
    correct: 0,
    explanation: 'A ação de morar começou no passado e continua até agora, com ênfase na duração ("since 2020"). Usamos "have been living".'
  },
  {
    rule: "Usamos o Present Perfect Continuous para ações que começaram no passado e continuam até o presente, com ênfase na duração da ação. Geralmente usamos 'for' ou 'since'.",
    question: "He ___ for a long time.",
    options: ["has been studying", "studied", "was studying", "studies"],
    correct: 0,
    explanation: 'A ação de estudar começou no passado e continua até agora, com ênfase na duração ("for a long time"). Usamos "has been studying".'
  },
  {
    rule: "Usamos o Present Perfect Continuous para ações que começaram no passado e continuam até o presente, com ênfase na duração da ação. Geralmente usamos 'for' ou 'since'.",
    question: "We ___ for a few minutes.",
    options: ["have been discussing", "discussed", "were discussing", "discuss"],
    correct: 0,
    explanation: 'A ação de discutir começou no passado e continua até agora, com ênfase na duração ("for a few minutes"). Usamos "have been discussing".'
  },

  // REGRA SECUNDÁRIA — ação que acabou de terminar, mas seus efeitos são visíveis no presente (31 a 50)
  {
    rule: "Usamos o Present Perfect Continuous para ações que acabaram de terminar, mas seus efeitos ou resultados são visíveis no presente.",
    question: "Her eyes are red. She ___.",
    options: ["has been crying", "cried", "was crying", "cries"],
    correct: 0,
    explanation: 'A ação de chorar acabou de terminar, e o efeito (olhos vermelhos) é visível agora. Usamos "has been crying".'
  },
  {
    rule: "Usamos o Present Perfect Continuous para ações que acabaram de terminar, mas seus efeitos ou resultados são visíveis no presente.",
    question: "The ground is wet. It ___.",
    options: ["has been raining", "rained", "was raining", "rains"],
    correct: 0,
    explanation: 'A ação de chover acabou de terminar, e o efeito (chão molhado) é visível agora. Usamos "has been raining".'
  },
  {
    rule: "Usamos o Present Perfect Continuous para ações que acabaram de terminar, mas seus efeitos ou resultados são visíveis no presente.",
    question: "I'm tired because I ___ all day.",
    options: ["have been working", "worked", "was working", "work"],
    correct: 0,
    explanation: 'A ação de trabalhar acabou de terminar, e o efeito (estar cansado) é visível agora. Usamos "have been working".'
  },
  {
    rule: "Usamos o Present Perfect Continuous para ações que acabaram de terminar, mas seus efeitos ou resultados são visíveis no presente.",
    question: "He's out of breath. He ___.",
    options: ["has been running", "ran", "was running", "runs"],
    correct: 0,
    explanation: 'A ação de correr acabou de terminar, e o efeito (estar ofegante) é visível agora. Usamos "has been running".'
  },
  {
    rule: "Usamos o Present Perfect Continuous para ações que acabaram de terminar, mas seus efeitos ou resultados são visíveis no presente.",
    question: "The kitchen is messy. We ___.",
    options: ["have been cooking", "cooked", "were cooking", "cook"],
    correct: 0,
    explanation: 'A ação de cozinhar acabou de terminar, e o efeito (cozinha bagunçada) é visível agora. Usamos "have been cooking".'
  },
  {
    rule: "Usamos o Present Perfect Continuous para ações que acabaram de terminar, mas seus efeitos ou resultados são visíveis no presente.",
    question: "My head hurts. I ___ on the computer for hours.",
    options: ["have been staring", "stared", "was staring", "stare"],
    correct: 0,
    explanation: 'A ação de olhar para o computador acabou de terminar, e o efeito (dor de cabeça) é visível agora. Usamos "have been staring".'
  },
  {
    rule: "Usamos o Present Perfect Continuous para ações que acabaram de terminar, mas seus efeitos ou resultados são visíveis no presente.",
    question: "She looks upset. She ___.",
    options: ["has been arguing", "argued", "was arguing", "argues"],
    correct: 0,
    explanation: 'A ação de discutir acabou de terminar, e o efeito (parecer chateada) é visível agora. Usamos "has been arguing".'
  },
  {
    rule: "Usamos o Present Perfect Continuous para ações que acabaram de terminar, mas seus efeitos ou resultados são visíveis no presente.",
    question: "The children are dirty. They ___ in the garden.",
    options: ["have been playing", "played", "were playing", "play"],
    correct: 0,
    explanation: 'A ação de brincar acabou de terminar, e o efeito (crianças sujas) é visível agora. Usamos "have been playing".'
  },
  {
    rule: "Usamos o Present Perfect Continuous para ações que acabaram de terminar, mas seus efeitos ou resultados são visíveis no presente.",
    question: "My throat is sore. I ___ too much.",
    options: ["have been talking", "talked", "was talking", "talk"],
    correct: 0,
    explanation: 'A ação de falar acabou de terminar, e o efeito (dor de garganta) é visível agora. Usamos "have been talking".'
  },
  {
    rule: "Usamos o Present Perfect Continuous para ações que acabaram de terminar, mas seus efeitos ou resultados são visíveis no presente.",
    question: "The car is hot. It ___ in the sun.",
    options: ["has been sitting", "sat", "was sitting", "sits"],
    correct: 0,
    explanation: 'A ação de o carro estar no sol acabou de terminar, e o efeito (carro quente) é visível agora. Usamos "has been sitting".'
  },
  {
    rule: "Usamos o Present Perfect Continuous para ações que acabaram de terminar, mas seus efeitos ou resultados são visíveis no presente.",
    question: "I'm hungry because I ___ all morning.",
    options: ["have been exercising", "exercised", "was exercising", "exercise"],
    correct: 0,
    explanation: 'A ação de se exercitar acabou de terminar, e o efeito (estar com fome) é visível agora. Usamos "have been exercising".'
  },
  {
    rule: "Usamos o Present Perfect Continuous para ações que acabaram de terminar, mas seus efeitos ou resultados são visíveis no presente.",
    question: "His clothes are wet. He ___ his car.",
    options: ["has been washing", "washed", "was washing", "washes"],
    correct: 0,
    explanation: 'A ação de lavar o carro acabou de terminar, e o efeito (roupas molhadas) é visível agora. Usamos "has been washing".'
  },
  {
    rule: "Usamos o Present Perfect Continuous para ações que acabaram de terminar, mas seus efeitos ou resultados são visíveis no presente.",
    question: "The house smells of paint. They ___.",
    options: ["have been painting", "painted", "were painting", "paint"],
    correct: 0,
    explanation: 'A ação de pintar acabou de terminar, e o efeito (cheiro de tinta) é visível agora. Usamos "have been painting".'
  },
  {
    rule: "Usamos o Present Perfect Continuous para ações que acabaram de terminar, mas seus efeitos ou resultados são visíveis no presente.",
    question: "My back aches. I ___ heavy boxes.",
    options: ["have been lifting", "lifted", "was lifting", "lift"],
    correct: 0,
    explanation: 'A ação de levantar caixas pesadas acabou de terminar, e o efeito (dor nas costas) é visível agora. Usamos "have been lifting".'
  },
  {
    rule: "Usamos o Present Perfect Continuous para ações que acabaram de terminar, mas seus efeitos ou resultados são visíveis no presente.",
    question: "She's tired. She ___ for hours.",
    options: ["has been studying", "studied", "was studying", "studies"],
    correct: 0,
    explanation: 'A ação de estudar acabou de terminar, e o efeito (estar cansada) é visível agora. Usamos "has been studying".'
  },
  {
    rule: "Usamos o Present Perfect Continuous para ações que acabaram de terminar, mas seus efeitos ou resultados são visíveis no presente.",
    question: "The dog is panting. It ___.",
    options: ["has been running", "ran", "was running", "runs"],
    correct: 0,
    explanation: 'A ação de correr acabou de terminar, e o efeito (cachorro ofegante) é visível agora. Usamos "has been running".'
  },
  {
    rule: "Usamos o Present Perfect Continuous para ações que acabaram de terminar, mas seus efeitos ou resultados são visíveis no presente.",
    question: "My hands are dirty. I ___ in the garden.",
    options: ["have been digging", "dug", "was digging", "dig"],
    correct: 0,
    explanation: 'A ação de cavar acabou de terminar, e o efeito (mãos sujas) é visível agora. Usamos "have been digging".'
  },
  {
    rule: "Usamos o Present Perfect Continuous para ações que acabaram de terminar, mas seus efeitos ou resultados são visíveis no presente.",
    question: "He's sleepy. He ___ all night.",
    options: ["has been reading", "read", "was reading", "reads"],
    correct: 0,
    explanation: 'A ação de ler acabou de terminar, e o efeito (estar com sono) é visível agora. Usamos "has been reading".'
  },
  {
    rule: "Usamos o Present Perfect Continuous para ações que acabaram de terminar, mas seus efeitos ou resultados são visíveis no presente.",
    question: "The room is warm. The heater ___.",
    options: ["has been on", "was on", "is on", "had been on"],
    correct: 0,
    explanation: 'A ação de o aquecedor estar ligado acabou de terminar, e o efeito (quarto quente) é visível agora. Usamos "has been on".'
  },
  {
    rule: "Usamos o Present Perfect Continuous para ações que acabaram de terminar, mas seus efeitos ou resultados são visíveis no presente.",
    question: "I'm sweating. I ___.",
    options: ["have been exercising", "exercised", "was exercising", "exercise"],
    correct: 0,
    explanation: 'A ação de se exercitar acabou de terminar, e o efeito (estar suando) é visível agora. Usamos "have been exercising".'
  },

  // NEGATIVA DO PRESENT PERFECT CONTINUOUS — haven't been / hasn't been (51 a 70)
  {
    rule: "Na negativa do Present Perfect Continuous usamos 'haven't been' (I, you, we, they) ou 'hasn't been' (he, she, it) + verbo com -ing.",
    question: "I ___ feeling well lately.",
    options: ["haven't been", "didn't been", "wasn't been", "don't been"],
    correct: 0,
    explanation: 'Na negativa do Present Perfect Continuous com "I", usamos "haven\'t been" + verbo com -ing ("feeling").'
  },
  {
    rule: "Na negativa do Present Perfect Continuous usamos 'haven't been' (I, you, we, they) ou 'hasn't been' (he, she, it) + verbo com -ing.",
    question: "She ___ working here for long.",
    options: ["hasn't been", "didn't been", "wasn't been", "doesn't been"],
    correct: 0,
    explanation: 'Na negativa do Present Perfect Continuous com "She", usamos "hasn\'t been" + verbo com -ing ("working").'
  },
  {
    rule: "Na negativa do Present Perfect Continuous usamos 'haven't been' (I, you, we, they) ou 'hasn't been' (he, she, it) + verbo com -ing.",
    question: "They ___ living in this city for many years.",
    options: ["haven't been", "didn't been", "weren't been", "don't been"],
    correct: 0,
    explanation: 'Na negativa do Present Perfect Continuous com "They", usamos "haven\'t been" + verbo com -ing ("living").'
  },
  {
    rule: "Na negativa do Present Perfect Continuous usamos 'haven't been' (I, you, we, they) ou 'hasn't been' (he, she, it) + verbo com -ing.",
    question: "He ___ sleeping well recently.",
    options: ["hasn't been", "didn't been", "wasn't been", "doesn't been"],
    correct: 0,
    explanation: 'Na negativa do Present Perfect Continuous com "He", usamos "hasn\'t been" + verbo com -ing ("sleeping").'
  },
  {
    rule: "Na negativa do Present Perfect Continuous usamos 'haven't been' (I, you, we, they) ou 'hasn't been' (he, she, it) + verbo com -ing.",
    question: "We ___ making much progress on the project.",
    options: ["haven't been", "didn't been", "weren't been", "don't been"],
    correct: 0,
    explanation: 'Na negativa do Present Perfect Continuous com "We", usamos "haven\'t been" + verbo com -ing ("making").'
  },
  {
    rule: "Na negativa do Present Perfect Continuous usamos 'haven't been' (I, you, we, they) ou 'hasn't been' (he, she, it) + verbo com -ing.",
    question: "I ___ studying English for a long time.",
    options: ["haven't been", "didn't been", "wasn't been", "don't been"],
    correct: 0,
    explanation: 'Na negativa do Present Perfect Continuous com "I", usamos "haven\'t been" + verbo com -ing ("studying").'
  },
  {
    rule: "Na negativa do Present Perfect Continuous usamos 'haven't been' (I, you, we, they) ou 'hasn't been' (he, she, it) + verbo com -ing.",
    question: "She ___ waiting for you all day.",
    options: ["hasn't been", "didn't been", "wasn't been", "doesn't been"],
    correct: 0,
    explanation: 'Na negativa do Present Perfect Continuous com "She", usamos "hasn\'t been" + verbo com -ing ("waiting").'
  },
  {
    rule: "Na negativa do Present Perfect Continuous usamos 'haven't been' (I, you, we, they) ou 'hasn't been' (he, she, it) + verbo com -ing.",
    question: "They ___ playing outside because of the rain.",
    options: ["haven't been", "didn't been", "weren't been", "don't been"],
    correct: 0,
    explanation: 'Na negativa do Present Perfect Continuous com "They", usamos "haven\'t been" + verbo com -ing ("playing").'
  },
  {
    rule: "Na negativa do Present Perfect Continuous usamos 'haven't been' (I, you, we, they) ou 'hasn't been' (he, she, it) + verbo com -ing.",
    question: "He ___ feeling well since last week.",
    options: ["hasn't been", "didn't been", "wasn't been", "doesn't been"],
    correct: 0,
    explanation: 'Na negativa do Present Perfect Continuous com "He", usamos "hasn\'t been" + verbo com -ing ("feeling").'
  },
  {
    rule: "Na negativa do Present Perfect Continuous usamos 'haven't been' (I, you, we, they) ou 'hasn't been' (he, she, it) + verbo com -ing.",
    question: "We ___ watching much TV lately.",
    options: ["haven't been", "didn't been", "weren't been", "don't been"],
    correct: 0,
    explanation: 'Na negativa do Present Perfect Continuous com "We", usamos "haven\'t been" + verbo com -ing ("watching").'
  },
  {
    rule: "Na negativa do Present Perfect Continuous usamos 'haven't been' (I, you, we, they) ou 'hasn't been' (he, she, it) + verbo com -ing.",
    question: "I ___ eating much these days.",
    options: ["haven't been", "didn't been", "wasn't been", "don't been"],
    correct: 0,
    explanation: 'Na negativa do Present Perfect Continuous com "I", usamos "haven\'t been" + verbo com -ing ("eating").'
  },
  {
    rule: "Na negativa do Present Perfect Continuous usamos 'haven't been' (I, you, we, they) ou 'hasn't been' (he, she, it) + verbo com -ing.",
    question: "She ___ studying for her exams.",
    options: ["hasn't been", "didn't been", "wasn't been", "doesn't been"],
    correct: 0,
    explanation: 'Na negativa do Present Perfect Continuous com "She", usamos "hasn\'t been" + verbo com -ing ("studying").'
  },
  {
    rule: "Na negativa do Present Perfect Continuous usamos 'haven't been' (I, you, we, they) ou 'hasn't been' (he, she, it) + verbo com -ing.",
    question: "They ___ building the new house quickly.",
    options: ["haven't been", "didn't been", "weren't been", "don't been"],
    correct: 0,
    explanation: 'Na negativa do Present Perfect Continuous com "They", usamos "haven\'t been" + verbo com -ing ("building").'
  },
  {
    rule: "Na negativa do Present Perfect Continuous usamos 'haven't been' (I, you, we, they) ou 'hasn't been' (he, she, it) + verbo com -ing.",
    question: "He ___ talking on the phone for a long time.",
    options: ["hasn't been", "didn't been", "wasn't been", "doesn't been"],
    correct: 0,
    explanation: 'Na negativa do Present Perfect Continuous com "He", usamos "hasn\'t been" + verbo com -ing ("talking").'
  },
  {
    rule: "Na negativa do Present Perfect Continuous usamos 'haven't been' (I, you, we, they) ou 'hasn't been' (he, she, it) + verbo com -ing.",
    question: "We ___ planning our vacation yet.",
    options: ["haven't been", "didn't been", "weren't been", "don't been"],
    correct: 0,
    explanation: 'Na negativa do Present Perfect Continuous com "We", usamos "haven\'t been" + verbo com -ing ("planning").'
  },
  {
    rule: "Na negativa do Present Perfect Continuous usamos 'haven't been' (I, you, we, they) ou 'hasn't been' (he, she, it) + verbo com -ing.",
    question: "I ___ driving for many hours.",
    options: ["haven't been", "didn't been", "wasn't been", "don't been"],
    correct: 0,
    explanation: 'Na negativa do Present Perfect Continuous com "I", usamos "haven\'t been" + verbo com -ing ("driving").'
  },
  {
    rule: "Na negativa do Present Perfect Continuous usamos 'haven't been' (I, you, we, they) ou 'hasn't been' (he, she, it) + verbo com -ing.",
    question: "She ___ writing her book for long.",
    options: ["hasn't been", "didn't been", "wasn't been", "doesn't been"],
    correct: 0,
    explanation: 'Na negativa do Present Perfect Continuous com "She", usamos "hasn\'t been" + verbo com -ing ("writing").'
  },
  {
    rule: "Na negativa do Present Perfect Continuous usamos 'haven't been' (I, you, we, they) ou 'hasn't been' (he, she, it) + verbo com -ing.",
    question: "They ___ playing that game all day.",
    options: ["haven't been", "didn't been", "weren't been", "don't been"],
    correct: 0,
    explanation: 'Na negativa do Present Perfect Continuous com "They", usamos "haven\'t been" + verbo com -ing ("playing").'
  },
  {
    rule: "Na negativa do Present Perfect Continuous usamos 'haven't been' (I, you, we, they) ou 'hasn't been' (he, she, it) + verbo com -ing.",
    question: "He ___ training for the marathon for long.",
    options: ["hasn't been", "didn't been", "wasn't been", "doesn't been"],
    correct: 0,
    explanation: 'Na negativa do Present Perfect Continuous com "He", usamos "hasn\'t been" + verbo com -ing ("training").'
  },
  {
    rule: "Na negativa do Present Perfect Continuous usamos 'haven't been' (I, you, we, they) ou 'hasn't been' (he, she, it) + verbo com -ing.",
    question: "We ___ cooking much lately.",
    options: ["haven't been", "didn't been", "weren't been", "don't been"],
    correct: 0,
    explanation: 'Na negativa do Present Perfect Continuous com "We", usamos "haven\'t been" + verbo com -ing ("cooking").'
  },

  // INTERROGATIVA DO PRESENT PERFECT CONTINUOUS — Have / Has + been + -ing (71 a 90)
  {
    rule: "Na interrogativa do Present Perfect Continuous usamos 'Have' (I, you, we, they) ou 'Has' (he, she, it) + sujeito + been + verbo com -ing.",
    question: "___ you been studying for long?",
    options: ["Did you been studying", "Has you been studying", "Have you been studying", "Do you been studying"],
    correct: 2,
    explanation: '"You" usa "Have" na interrogativa do Present Perfect Continuous. O correto é "Have you been studying".'
  },
  {
    rule: "Na interrogativa do Present Perfect Continuous usamos 'Have' (I, you, we, they) ou 'Has' (he, she, it) + sujeito + been + verbo com -ing.",
    question: "___ she been going to the gym regularly?",
    options: ["Did she been going", "Have she been going", "Has she been going", "Does she been going"],
    correct: 2,
    explanation: '"She" usa "Has" na interrogativa do Present Perfect Continuous. O correto é "Has she been going".'
  },
  {
    rule: "Na interrogativa do Present Perfect Continuous usamos 'Have' (I, you, we, they) ou 'Has' (he, she, it) + sujeito + been + verbo com -ing.",
    question: "___ they been living in that apartment for long?",
    options: ["Did they been living", "Has they been living", "Have they been living", "Do they been living"],
    correct: 2,
    explanation: '"They" usa "Have" na interrogativa do Present Perfect Continuous. O correto é "Have they been living".'
  },
  {
    rule: "Na interrogativa do Present Perfect Continuous usamos 'Have' (I, you, we, they) ou 'Has' (he, she, it) + sujeito + been + verbo com -ing.",
    question: "___ he been training hard for the marathon?",
    options: ["Did he been training", "Have he been training", "Has he been training", "Does he been training"],
    correct: 2,
    explanation: '"He" usa "Has" na interrogativa do Present Perfect Continuous. O correto é "Has he been training".'
  },
  {
    rule: "Na interrogativa do Present Perfect Continuous usamos 'Have' (I, you, we, they) ou 'Has' (he, she, it) + sujeito + been + verbo com -ing.",
    question: "___ you been waiting here since morning?",
    options: ["Did you been waiting", "Has you been waiting", "Have you been waiting", "Do you been waiting"],
    correct: 2,
    explanation: '"You" usa "Have" na interrogativa do Present Perfect Continuous. O correto é "Have you been waiting". "Since" confirma o Present Perfect Continuous.'
  },
  {
    rule: "Na interrogativa do Present Perfect Continuous usamos 'Have' (I, you, we, they) ou 'Has' (he, she, it) + sujeito + been + verbo com -ing.",
    question: "___ we been making progress on the project?",
    options: ["Did we been making", "Has we been making", "Have we been making", "Do we been making"],
    correct: 2,
    explanation: '"We" usa "Have" na interrogativa do Present Perfect Continuous. O correto é "Have we been making".'
  },
  {
    rule: "Na interrogativa do Present Perfect Continuous usamos 'Have' (I, you, we, they) ou 'Has' (he, she, it) + sujeito + been + verbo com -ing.",
    question: "___ she been crying? Her eyes are red.",
    options: ["Did she been crying", "Have she been crying", "Has she been crying", "Does she been crying"],
    correct: 2,
    explanation: '"She" usa "Has" na interrogativa do Present Perfect Continuous. O correto é "Has she been crying".'
  },
  {
    rule: "Na interrogativa do Present Perfect Continuous usamos 'Have' (I, you, we, they) ou 'Has' (he, she, it) + sujeito + been + verbo com -ing.",
    question: "___ they been arguing again?",
    options: ["Did they been arguing", "Has they been arguing", "Have they been arguing", "Do they been arguing"],
    correct: 2,
    explanation: '"They" usa "Have" na interrogativa do Present Perfect Continuous. O correto é "Have they been arguing".'
  },
  {
    rule: "Na interrogativa do Present Perfect Continuous usamos 'Have' (I, you, we, they) ou 'Has' (he, she, it) + sujeito + been + verbo com -ing.",
    question: "___ he been smoking again? I can smell it.",
    options: ["Did he been smoking", "Have he been smoking", "Has he been smoking", "Does he been smoking"],
    correct: 2,
    explanation: '"He" usa "Has" na interrogativa do Present Perfect Continuous. O correto é "Has he been smoking".'
  },
  {
    rule: "Na interrogativa do Present Perfect Continuous usamos 'Have' (I, you, we, they) ou 'Has' (he, she, it) + sujeito + been + verbo com -ing.",
    question: "___ you been exercising regularly this month?",
    options: ["Did you been exercising", "Has you been exercising", "Have you been exercising", "Do you been exercising"],
    correct: 2,
    explanation: '"You" usa "Have" na interrogativa do Present Perfect Continuous. O correto é "Have you been exercising".'
  },
  {
    rule: "Na interrogativa do Present Perfect Continuous usamos 'Have' (I, you, we, they) ou 'Has' (he, she, it) + sujeito + been + verbo com -ing.",
    question: "___ we been wasting time on unnecessary tasks?",
    options: ["Did we been wasting", "Has we been wasting", "Have we been wasting", "Do we been wasting"],
    correct: 2,
    explanation: '"We" usa "Have" na interrogativa do Present Perfect Continuous. O correto é "Have we been wasting".'
  },
  {
    rule: "Na interrogativa do Present Perfect Continuous usamos 'Have' (I, you, we, they) ou 'Has' (he, she, it) + sujeito + been + verbo com -ing.",
    question: "___ she been learning a new language?",
    options: ["Did she been learning", "Have she been learning", "Has she been learning", "Does she been learning"],
    correct: 2,
    explanation: '"She" usa "Has" na interrogativa do Present Perfect Continuous. O correto é "Has she been learning".'
  },
  {
    rule: "Na interrogativa do Present Perfect Continuous usamos 'Have' (I, you, we, they) ou 'Has' (he, she, it) + sujeito + been + verbo com -ing.",
    question: "___ they been saving money for the trip?",
    options: ["Did they been saving", "Has they been saving", "Have they been saving", "Do they been saving"],
    correct: 2,
    explanation: '"They" usa "Have" na interrogativa do Present Perfect Continuous. O correto é "Have they been saving".'
  },
  {
    rule: "Na interrogativa do Present Perfect Continuous usamos 'Have' (I, you, we, they) ou 'Has' (he, she, it) + sujeito + been + verbo com -ing.",
    question: "___ he been working overtime this week?",
    options: ["Did he been working", "Have he been working", "Has he been working", "Does he been working"],
    correct: 2,
    explanation: '"He" usa "Has" na interrogativa do Present Perfect Continuous. O correto é "Has he been working".'
  },
  {
    rule: "Na interrogativa do Present Perfect Continuous usamos 'Have' (I, you, we, they) ou 'Has' (he, she, it) + sujeito + been + verbo com -ing.",
    question: "___ you been feeling stressed lately?",
    options: ["Did you been feeling", "Has you been feeling", "Have you been feeling", "Do you been feeling"],
    correct: 2,
    explanation: '"You" usa "Have" na interrogativa do Present Perfect Continuous. O correto é "Have you been feeling".'
  },
  {
    rule: "Na interrogativa do Present Perfect Continuous usamos 'Have' (I, you, we, they) ou 'Has' (he, she, it) + sujeito + been + verbo com -ing.",
    question: "___ we been meeting our targets this quarter?",
    options: ["Did we been meeting", "Has we been meeting", "Have we been meeting", "Do we been meeting"],
    correct: 2,
    explanation: '"We" usa "Have" na interrogativa do Present Perfect Continuous. O correto é "Have we been meeting".'
  },
  {
    rule: "Na interrogativa do Present Perfect Continuous usamos 'Have' (I, you, we, they) ou 'Has' (he, she, it) + sujeito + been + verbo com -ing.",
    question: "___ she been working from home since January?",
    options: ["Did she been working", "Have she been working", "Has she been working", "Does she been working"],
    correct: 2,
    explanation: '"She" usa "Has" na interrogativa do Present Perfect Continuous. O correto é "Has she been working". "Since" confirma o Present Perfect Continuous.'
  },
  {
    rule: "Na interrogativa do Present Perfect Continuous usamos 'Have' (I, you, we, they) ou 'Has' (he, she, it) + sujeito + been + verbo com -ing.",
    question: "___ they been complaining about the service?",
    options: ["Did they been complaining", "Has they been complaining", "Have they been complaining", "Do they been complaining"],
    correct: 2,
    explanation: '"They" usa "Have" na interrogativa do Present Perfect Continuous. O correto é "Have they been complaining".'
  },
  {
    rule: "Na interrogativa do Present Perfect Continuous usamos 'Have' (I, you, we, they) ou 'Has' (he, she, it) + sujeito + been + verbo com -ing.",
    question: "___ he been taking care of his health lately?",
    options: ["Did he been taking", "Have he been taking", "Has he been taking", "Does he been taking"],
    correct: 2,
    explanation: '"He" usa "Has" na interrogativa do Present Perfect Continuous. O correto é "Has he been taking".'
  },
  {
    rule: "Na interrogativa do Present Perfect Continuous usamos 'Have' (I, you, we, they) ou 'Has' (he, she, it) + sujeito + been + verbo com -ing.",
    question: "___ you been drinking enough water today?",
    options: ["Did you been drinking", "Has you been drinking", "Have you been drinking", "Do you been drinking"],
    correct: 2,
    explanation: '"You" usa "Have" na interrogativa do Present Perfect Continuous. O correto é "Have you been drinking".'
  },
  {
    rule: "Na interrogativa do Present Perfect Continuous usamos 'Have' (I, you, we, they) ou 'Has' (he, she, it) + sujeito + been + verbo com -ing.",
    question: "___ we been communicating clearly with the team?",
    options: ["Did we been communicating", "Has we been communicating", "Have we been communicating", "Do we been communicating"],
    correct: 2,
    explanation: '"We" usa "Have" na interrogativa do Present Perfect Continuous. O correto é "Have we been communicating".'
  },
  {
    rule: "Na interrogativa do Present Perfect Continuous usamos 'Have' (I, you, we, they) ou 'Has' (he, she, it) + sujeito + been + verbo com -ing.",
    question: "___ she been attending all the meetings?",
    options: ["Did she been attending", "Have she been attending", "Has she been attending", "Does she been attending"],
    correct: 2,
    explanation: '"She" usa "Has" na interrogativa do Present Perfect Continuous. O correto é "Has she been attending".'
  },
  {
    rule: "Na interrogativa do Present Perfect Continuous usamos 'Have' (I, you, we, they) ou 'Has' (he, she, it) + sujeito + been + verbo com -ing.",
    question: "___ they been renovating their house for long?",
    options: ["Did they been renovating", "Has they been renovating", "Have they been renovating", "Do they been renovating"],
    correct: 2,
    explanation: '"They" usa "Have" na interrogativa do Present Perfect Continuous. O correto é "Have they been renovating".'
  },
  {
    rule: "Na interrogativa do Present Perfect Continuous usamos 'Have' (I, you, we, they) ou 'Has' (he, she, it) + sujeito + been + verbo com -ing.",
    question: "___ he been seeing a therapist lately?",
    options: ["Did he been seeing", "Have he been seeing", "Has he been seeing", "Does he been seeing"],
    correct: 2,
    explanation: '"He" usa "Has" na interrogativa do Present Perfect Continuous. O correto é "Has he been seeing".'
  },
  {
    rule: "Na interrogativa do Present Perfect Continuous usamos 'Have' (I, you, we, they) ou 'Has' (he, she, it) + sujeito + been + verbo com -ing.",
    question: "___ you been thinking about changing careers?",
    options: ["Did you been thinking", "Has you been thinking", "Have you been thinking", "Do you been thinking"],
    correct: 2,
    explanation: '"You" usa "Have" na interrogativa do Present Perfect Continuous. O correto é "Have you been thinking".'
  },
  {
    rule: "Na interrogativa do Present Perfect Continuous usamos 'Have' (I, you, we, they) ou 'Has' (he, she, it) + sujeito + been + verbo com -ing.",
    question: "___ we been using the right tools for this task?",
    options: ["Did we been using", "Has we been using", "Have we been using", "Do we been using"],
    correct: 2,
    explanation: '"We" usa "Have" na interrogativa do Present Perfect Continuous. O correto é "Have we been using".'
  },
  {
    rule: "Na interrogativa do Present Perfect Continuous usamos 'Have' (I, you, we, they) ou 'Has' (he, she, it) + sujeito + been + verbo com -ing.",
    question: "___ she been preparing for the job interview?",
    options: ["Did she been preparing", "Have she been preparing", "Has she been preparing", "Does she been preparing"],
    correct: 2,
    explanation: '"She" usa "Has" na interrogativa do Present Perfect Continuous. O correto é "Has she been preparing".'
  },
  {
    rule: "Na interrogativa do Present Perfect Continuous usamos 'Have' (I, you, we, they) ou 'Has' (he, she, it) + sujeito + been + verbo com -ing.",
    question: "___ they been working as a team lately?",
    options: ["Did they been working", "Has they been working", "Have they been working", "Do they been working"],
    correct: 2,
    explanation: '"They" usa "Have" na interrogativa do Present Perfect Continuous. O correto é "Have they been working".'
  },
  {
    rule: "Na interrogativa do Present Perfect Continuous usamos 'Have' (I, you, we, they) ou 'Has' (he, she, it) + sujeito + been + verbo com -ing.",
    question: "___ he been running every morning this week?",
    options: ["Did he been running", "Have he been running", "Has he been running", "Does he been running"],
    correct: 2,
    explanation: '"He" usa "Has" na interrogativa do Present Perfect Continuous. O correto é "Has he been running".'
  },
  {
    rule: "Na interrogativa do Present Perfect Continuous usamos 'Have' (I, you, we, they) ou 'Has' (he, she, it) + sujeito + been + verbo com -ing.",
    question: "___ you been reading that book for a long time?",
    options: ["Did you been reading", "Has you been reading", "Have you been reading", "Do you been reading"],
    correct: 2,
    explanation: '"You" usa "Have" na interrogativa do Present Perfect Continuous. O correto é "Have you been reading".'
  },
  {
    rule: "Na interrogativa do Present Perfect Continuous usamos 'Have' (I, you, we, they) ou 'Has' (he, she, it) + sujeito + been + verbo com -ing.",
    question: "___ we been ignoring the warning signs?",
    options: ["Did we been ignoring", "Has we been ignoring", "Have we been ignoring", "Do we been ignoring"],
    correct: 2,
    explanation: '"We" usa "Have" na interrogativa do Present Perfect Continuous. O correto é "Have we been ignoring".'
  },
  {
    rule: "Na interrogativa do Present Perfect Continuous usamos 'Have' (I, you, we, they) ou 'Has' (he, she, it) + sujeito + been + verbo com -ing.",
    question: "___ she been volunteering at the shelter?",
    options: ["Did she been volunteering", "Have she been volunteering", "Has she been volunteering", "Does she been volunteering"],
    correct: 2,
    explanation: '"She" usa "Has" na interrogativa do Present Perfect Continuous. O correto é "Has she been volunteering".'
  },
  {
    rule: "Na interrogativa do Present Perfect Continuous usamos 'Have' (I, you, we, they) ou 'Has' (he, she, it) + sujeito + been + verbo com -ing.",
    question: "___ they been dealing with that issue for a while?",
    options: ["Did they been dealing", "Has they been dealing", "Have they been dealing", "Do they been dealing"],
    correct: 2,
    explanation: '"They" usa "Have" na interrogativa do Present Perfect Continuous. O correto é "Have they been dealing".'
  },
  {
    rule: "Na interrogativa do Present Perfect Continuous usamos 'Have' (I, you, we, they) ou 'Has' (he, she, it) + sujeito + been + verbo com -ing.",
    question: "___ he been keeping up with his studies?",
    options: ["Did he been keeping", "Have he been keeping", "Has he been keeping", "Does he been keeping"],
    correct: 2,
    explanation: '"He" usa "Has" na interrogativa do Present Perfect Continuous. O correto é "Has he been keeping".'
  },
  {
    rule: "Na interrogativa do Present Perfect Continuous usamos 'Have' (I, you, we, they) ou 'Has' (he, she, it) + sujeito + been + verbo com -ing.",
    question: "___ you been managing your time well lately?",
    options: ["Did you been managing", "Has you been managing", "Have you been managing", "Do you been managing"],
    correct: 2,
    explanation: '"You" usa "Have" na interrogativa do Present Perfect Continuous. O correto é "Have you been managing".'
  },
  {
    rule: "Na interrogativa do Present Perfect Continuous usamos 'Have' (I, you, we, they) ou 'Has' (he, she, it) + sujeito + been + verbo com -ing.",
    question: "___ we been spending enough time on quality control?",
    options: ["Did we been spending", "Has we been spending", "Have we been spending", "Do we been spending"],
    correct: 2,
    explanation: '"We" usa "Have" na interrogativa do Present Perfect Continuous. O correto é "Have we been spending".'
  },
  {
    rule: "Na interrogativa do Present Perfect Continuous usamos 'Have' (I, you, we, they) ou 'Has' (he, she, it) + sujeito + been + verbo com -ing.",
    question: "___ she been cooking more at home lately?",
    options: ["Did she been cooking", "Have she been cooking", "Has she been cooking", "Does she been cooking"],
    correct: 2,
    explanation: '"She" usa "Has" na interrogativa do Present Perfect Continuous. O correto é "Has she been cooking".'
  },
  {
    rule: "Na interrogativa do Present Perfect Continuous usamos 'Have' (I, you, we, they) ou 'Has' (he, she, it) + sujeito + been + verbo com -ing.",
    question: "___ they been taking the situation seriously?",
    options: ["Did they been taking", "Has they been taking", "Have they been taking", "Do they been taking"],
    correct: 2,
    explanation: '"They" usa "Have" na interrogativa do Present Perfect Continuous. O correto é "Have they been taking".'
  },
  {
    rule: "Na interrogativa do Present Perfect Continuous usamos 'Have' (I, you, we, they) ou 'Has' (he, she, it) + sujeito + been + verbo com -ing.",
    question: "___ he been giving his best at work lately?",
    options: ["Did he been giving", "Have he been giving", "Has he been giving", "Does he been giving"],
    correct: 2,
    explanation: '"He" usa "Has" na interrogativa do Present Perfect Continuous. O correto é "Has he been giving".'
  },
  {
    rule: "Na interrogativa do Present Perfect Continuous usamos 'Have' (I, you, we, they) ou 'Has' (he, she, it) + sujeito + been + verbo com -ing.",
    question: "___ you been reading that book for a long time?",
    options: ["Did you been reading", "Has you been reading", "Have you been reading", "Do you been reading"],
    correct: 2,
    explanation: '"You" usa "Have" na interrogativa do Present Perfect Continuous. O correto é "Have you been reading".'
  },
  {
    rule: "Na interrogativa do Present Perfect Continuous usamos 'Have' (I, you, we, they) ou 'Has' (he, she, it) + sujeito + been + verbo com -ing.",
    question: "___ we been ignoring the warning signs?",
    options: ["Did we been ignoring", "Has we been ignoring", "Have we been ignoring", "Do we been ignoring"],
    correct: 2,
    explanation: '"We" usa "Have" na interrogativa do Present Perfect Continuous. O correto é "Have we been ignoring".'
  },
  {
    rule: "Na interrogativa do Present Perfect Continuous usamos 'Have' (I, you, we, they) ou 'Has' (he, she, it) + sujeito + been + verbo com -ing.",
    question: "___ she been volunteering at the shelter?",
    options: ["Did she been volunteering", "Have she been volunteering", "Has she been volunteering", "Does she been volunteering"],
    correct: 2,
    explanation: '"She" usa "Has" na interrogativa do Present Perfect Continuous. O correto é "Has she been volunteering".'
  },
  {
    rule: "Na interrogativa do Present Perfect Continuous usamos 'Have' (I, you, we, they) ou 'Has' (he, she, it) + sujeito + been + verbo com -ing.",
    question: "___ they been dealing with that issue for a while?",
    options: ["Did they been dealing", "Has they been dealing", "Have they been dealing", "Do they been dealing"],
    correct: 2,
    explanation: '"They" usa "Have" na interrogativa do Present Perfect Continuous. O correto é "Have they been dealing".'
  },
  {
    rule: "Na interrogativa do Present Perfect Continuous usamos 'Have' (I, you, we, they) ou 'Has' (he, she, it) + sujeito + been + verbo com -ing.",
    question: "___ he been keeping up with his studies?",
    options: ["Did he been keeping", "Have he been keeping", "Has he been keeping", "Does he been keeping"],
    correct: 2,
    explanation: '"He" usa "Has" na interrogativa do Present Perfect Continuous. O correto é "Has he been keeping".'
  },
  {
    rule: "Na interrogativa do Present Perfect Continuous usamos 'Have' (I, you, we, they) ou 'Has' (he, she, it) + sujeito + been + verbo com -ing.",
    question: "___ you been managing your time well lately?",
    options: ["Did you been managing", "Has you been managing", "Have you been managing", "Do you been managing"],
    correct: 2,
    explanation: '"You" usa "Have" na interrogativa do Present Perfect Continuous. O correto é "Have you been managing".'
  },
  {
    rule: "Na interrogativa do Present Perfect Continuous usamos 'Have' (I, you, we, they) ou 'Has' (he, she, it) + sujeito + been + verbo com -ing.",
    question: "___ we been spending enough time on quality control?",
    options: ["Did we been spending", "Has we been spending", "Have we been spending", "Do we been spending"],
    correct: 2,
    explanation: '"We" usa "Have" na interrogativa do Present Perfect Continuous. O correto é "Have we been spending".'
  },
  {
    rule: "Na interrogativa do Present Perfect Continuous usamos 'Have' (I, you, we, they) ou 'Has' (he, she, it) + sujeito + been + verbo com -ing.",
    question: "___ she been cooking more at home lately?",
    options: ["Did she been cooking", "Have she been cooking", "Has she been cooking", "Does she been cooking"],
    correct: 2,
    explanation: '"She" usa "Has" na interrogativa do Present Perfect Continuous. O correto é "Has she been cooking".'
  },
  {
    rule: "Na interrogativa do Present Perfect Continuous usamos 'Have' (I, you, we, they) ou 'Has' (he, she, it) + sujeito + been + verbo com -ing.",
    question: "___ they been taking the situation seriously?",
    options: ["Did they been taking", "Has they been taking", "Have they been taking", "Do they been taking"],
    correct: 2,
    explanation: '"They" usa "Have" na interrogativa do Present Perfect Continuous. O correto é "Have they been taking".'
  },
  {
    rule: "Na interrogativa do Present Perfect Continuous usamos 'Have' (I, you, we, they) ou 'Has' (he, she, it) + sujeito + been + verbo com -ing.",
    question: "___ he been giving his best at work lately?",
    options: ["Did he been giving", "Have he been giving", "Has he been giving", "Does he been giving"],
    correct: 2,
    explanation: '"He" usa "Has" na interrogativa do Present Perfect Continuous. O correto é "Has he been giving".'
  },
];

// ============================================================
// BANCO DE QUESTÕES — SIMPLE PRESENT (150 questões)
// ============================================================

const simplePresentQuestions = [

  // REGRA PRIMÁRIA — fatos e verdades universais (1 a 15)
  {
    rule: "Usamos o Simple Present para fatos e verdades universais.",
    question: "The sun ___ in the east.",
    options: ["risen", "rises", "is rising", "has risen"],
    correct: 1,
    explanation: '"The sun rises in the east" é uma verdade universal. Usamos o Simple Present: "rises".'
  },
  {
    rule: "Usamos o Simple Present para fatos e verdades universais.",
    question: "Water ___ at 100 degrees Celsius.",
    options: ["boils", "boiled", "is boiling", "has boiled"],
    correct: 0,
    explanation: 'É uma verdade científica universal. Usamos o Simple Present: "boils".'
  },
  {
    rule: "Usamos o Simple Present para fatos e verdades universais.",
    question: "The Earth ___ around the Sun.",
    options: ["orbited", "is orbiting", "orbits", "has orbited"],
    correct: 2,
    explanation: 'É um fato científico universal. Usamos o Simple Present: "orbits".'
  },
  {
    rule: "Usamos o Simple Present para fatos e verdades universais.",
    question: "Cats ___ carnivores.",
    options: ["were", "are being", "have been", "are"],
    correct: 3,
    explanation: 'É uma verdade universal sobre a natureza dos gatos. Usamos o Simple Present: "are".'
  },
  {
    rule: "Usamos o Simple Present para fatos e verdades universais.",
    question: "Ice ___ when it gets warm.",
    options: ["has melted", "melts", "melted", "is melting"],
    correct: 1,
    explanation: 'É uma verdade científica universal. Usamos o Simple Present: "melts".'
  },
  {
    rule: "Usamos o Simple Present para fatos e verdades universais.",
    question: "Bees ___ honey.",
    options: ["produced", "are producing", "produce", "have produced"],
    correct: 2,
    explanation: 'É uma verdade universal sobre o comportamento das abelhas. Usamos "produce".'
  },
  {
    rule: "Usamos o Simple Present para fatos e verdades universais.",
    question: "Light ___ faster than sound.",
    options: ["traveled", "is traveling", "has traveled", "travels"],
    correct: 3,
    explanation: 'É uma verdade científica universal. Usamos o Simple Present: "travels".'
  },
  {
    rule: "Usamos o Simple Present para fatos e verdades universais.",
    question: "The Moon ___ around the Earth.",
    options: ["orbits", "orbited", "is orbiting", "has orbited"],
    correct: 0,
    explanation: 'É um fato científico universal. Usamos o Simple Present: "orbits".'
  },
  {
    rule: "Usamos o Simple Present para fatos e verdades universais.",
    question: "Plants ___ sunlight to survive.",
    options: ["needed", "are needing", "need", "have needed"],
    correct: 2,
    explanation: 'É uma verdade universal sobre a natureza das plantas. Usamos "need".'
  },
  {
    rule: "Usamos o Simple Present para fatos e verdades universais.",
    question: "Sharks ___ fish.",
    options: ["are", "were", "have been", "is"],
    correct: 0,
    explanation: 'É uma verdade universal sobre a classificação dos tubarões. Usamos o Simple Present: "are".'
  },
  {
    rule: "Usamos o Simple Present para fatos e verdades universais.",
    question: "The Amazon River ___ through Brazil.",
    options: ["flowed", "is flowing", "flows", "has flowed"],
    correct: 2,
    explanation: 'É um fato geográfico permanente. Usamos o Simple Present: "flows".'
  },
  {
    rule: "Usamos o Simple Present para fatos e verdades universais.",
    question: "Diamonds ___ the hardest natural material.",
    options: ["were", "are being", "have been", "are"],
    correct: 3,
    explanation: 'É uma verdade científica universal. Usamos o Simple Present: "are".'
  },
  {
    rule: "Usamos o Simple Present para fatos e verdades universais.",
    question: "The human body ___ about 60% water.",
    options: ["contained", "is containing", "contains", "has contained"],
    correct: 2,
    explanation: 'É uma verdade científica universal. Usamos "contains".'
  },
  {
    rule: "Usamos o Simple Present para fatos e verdades universais.",
    question: "Birds ___ wings.",
    options: ["had", "are having", "have had", "have"],
    correct: 3,
    explanation: 'É uma verdade universal sobre a natureza das aves. Usamos o Simple Present: "have".'
  },
  {
    rule: "Usamos o Simple Present para fatos e verdades universais.",
    question: "The Pacific Ocean ___ the largest ocean on Earth.",
    options: ["was", "is being", "is", "has been"],
    correct: 2,
    explanation: 'É um fato geográfico permanente. Usamos o Simple Present: "is".'
  },

  // REGRA SECUNDÁRIA — rotinas e hábitos (16 a 35)
  {
    rule: "Usamos o Simple Present para rotinas e hábitos do dia a dia.",
    question: "She ___ to work by bus every day.",
    options: ["went", "goes", "is going", "has gone"],
    correct: 1,
    explanation: '"Every day" indica uma rotina. Usamos o Simple Present: "goes".'
  },
  {
    rule: "Usamos o Simple Present para rotinas e hábitos do dia a dia.",
    question: "They ___ dinner together every Sunday.",
    options: ["have", "had", "are having", "have had"],
    correct: 0,
    explanation: '"Every Sunday" indica um hábito regular. Usamos o Simple Present: "have".'
  },
  {
    rule: "Usamos o Simple Present para rotinas e hábitos do dia a dia.",
    question: "He ___ up at 6 a.m. every morning.",
    options: ["woke", "is waking", "wakes", "has woken"],
    correct: 2,
    explanation: '"Every morning" indica uma rotina diária. Usamos "wakes".'
  },
  {
    rule: "Usamos o Simple Present para rotinas e hábitos do dia a dia.",
    question: "I ___ to the gym three times a week.",
    options: ["went", "go", "am going", "have gone"],
    correct: 1,
    explanation: '"Three times a week" indica um hábito regular. Usamos o Simple Present: "go".'
  },
  {
    rule: "Usamos o Simple Present para rotinas e hábitos do dia a dia.",
    question: "She ___ her teeth twice a day.",
    options: ["brushed", "is brushing", "brushes", "has brushed"],
    correct: 2,
    explanation: '"Twice a day" indica uma rotina. Usamos o Simple Present: "brushes".'
  },
  {
    rule: "Usamos o Simple Present para rotinas e hábitos do dia a dia.",
    question: "We ___ English classes on Mondays and Wednesdays.",
    options: ["have", "had", "are having", "have had"],
    correct: 0,
    explanation: 'Dias fixos da semana indicam uma rotina. Usamos o Simple Present: "have".'
  },
  {
    rule: "Usamos o Simple Present para rotinas e hábitos do dia a dia.",
    question: "He ___ coffee every morning before work.",
    options: ["drank", "is drinking", "drinks", "has drunk"],
    correct: 2,
    explanation: '"Every morning" indica um hábito diário. Usamos "drinks".'
  },
  {
    rule: "Usamos o Simple Present para rotinas e hábitos do dia a dia.",
    question: "They ___ to church every Sunday.",
    options: ["go", "went", "are going", "have gone"],
    correct: 0,
    explanation: '"Every Sunday" indica uma rotina semanal. Usamos o Simple Present: "go".'
  },
  {
    rule: "Usamos o Simple Present para rotinas e hábitos do dia a dia.",
    question: "She ___ her grandmother every weekend.",
    options: ["visited", "is visiting", "has visited", "visits"],
    correct: 3,
    explanation: '"Every weekend" indica uma rotina. Usamos o Simple Present: "visits".'
  },
  {
    rule: "Usamos o Simple Present para rotinas e hábitos do dia a dia.",
    question: "I ___ a book before bed every night.",
    options: ["read", "reads", "am reading", "have read"],
    correct: 0,
    explanation: '"Every night" indica um hábito regular. Usamos o Simple Present: "read".'
  },
  {
    rule: "Usamos o Simple Present para rotinas e hábitos do dia a dia.",
    question: "He ___ his dog for a walk every morning.",
    options: ["took", "takes", "is taking", "has taken"],
    correct: 1,
    explanation: '"Every morning" indica uma rotina diária. Usamos "takes".'
  },
  {
    rule: "Usamos o Simple Present para rotinas e hábitos do dia a dia.",
    question: "We ___ our groceries on Saturdays.",
    options: ["bought", "are buying", "buy", "have bought"],
    correct: 2,
    explanation: '"On Saturdays" indica uma rotina semanal. Usamos o Simple Present: "buy".'
  },
  {
    rule: "Usamos o Simple Present para rotinas e hábitos do dia a dia.",
    question: "She ___ yoga every morning before breakfast.",
    options: ["practiced", "practices", "is practicing", "has practiced"],
    correct: 1,
    explanation: '"Every morning" indica um hábito regular. Usamos "practices".'
  },
  {
    rule: "Usamos o Simple Present para rotinas e hábitos do dia a dia.",
    question: "They ___ their parents every week.",
    options: ["call", "called", "are calling", "have called"],
    correct: 0,
    explanation: '"Every week" indica uma rotina. Usamos o Simple Present: "call".'
  },
  {
    rule: "Usamos o Simple Present para rotinas e hábitos do dia a dia.",
    question: "He ___ to work early on Fridays.",
    options: ["arrived", "is arriving", "arrives", "has arrived"],
    correct: 2,
    explanation: '"On Fridays" indica uma rotina semanal. Usamos "arrives".'
  },
  {
    rule: "Usamos o Simple Present para rotinas e hábitos do dia a dia.",
    question: "I ___ lunch at noon every day.",
    options: ["eat", "ate", "am eating", "have eaten"],
    correct: 0,
    explanation: '"Every day" indica uma rotina. Usamos o Simple Present: "eat".'
  },
  {
    rule: "Usamos o Simple Present para rotinas e hábitos do dia a dia.",
    question: "She ___ the news every evening.",
    options: ["watched", "watches", "is watching", "has watched"],
    correct: 1,
    explanation: '"Every evening" indica um hábito regular. Usamos "watches".'
  },
  {
    rule: "Usamos o Simple Present para rotinas e hábitos do dia a dia.",
    question: "They ___ their bills online every month.",
    options: ["paid", "are paying", "pay", "have paid"],
    correct: 2,
    explanation: '"Every month" indica uma rotina. Usamos o Simple Present: "pay".'
  },
  {
    rule: "Usamos o Simple Present para rotinas e hábitos do dia a dia.",
    question: "He ___ his emails first thing every morning.",
    options: ["checked", "checks", "is checking", "has checked"],
    correct: 1,
    explanation: '"Every morning" indica um hábito diário. Usamos "checks".'
  },
  {
    rule: "Usamos o Simple Present para rotinas e hábitos do dia a dia.",
    question: "We ___ a team meeting every Monday.",
    options: ["had", "are having", "have had", "have"],
    correct: 3,
    explanation: '"Every Monday" indica uma rotina semanal. Usamos o Simple Present: "have".'
  },

  // REGRA TERCIÁRIA — preferências, opiniões e estados permanentes (36 a 50)
  {
    rule: "Usamos o Simple Present para expressar preferências, opiniões e estados permanentes.",
    question: "She ___ classical music.",
    options: ["loved", "is loving", "loves", "has loved"],
    correct: 2,
    explanation: '"Loves" expressa uma preferência permanente. Usamos o Simple Present.'
  },
  {
    rule: "Usamos o Simple Present para expressar preferências, opiniões e estados permanentes.",
    question: "I ___ that honesty is the best policy.",
    options: ["believed", "am believing", "have believed", "believe"],
    correct: 3,
    explanation: '"Believe" expressa uma opinião permanente. Usamos o Simple Present.'
  },
  {
    rule: "Usamos o Simple Present para expressar preferências, opiniões e estados permanentes.",
    question: "He ___ in a small town near the mountains.",
    options: ["lived", "lives", "is living", "has lived"],
    correct: 1,
    explanation: '"Lives" expressa um estado permanente. Usamos o Simple Present.'
  },
  {
    rule: "Usamos o Simple Present para expressar preferências, opiniões e estados permanentes.",
    question: "They ___ spicy food.",
    options: ["hated", "are hating", "have hated", "hate"],
    correct: 3,
    explanation: '"Hate" expressa uma preferência permanente. Usamos o Simple Present.'
  },
  {
    rule: "Usamos o Simple Present para expressar preferências, opiniões e estados permanentes.",
    question: "She ___ that education is the key to success.",
    options: ["believes", "believed", "is believing", "has believed"],
    correct: 0,
    explanation: '"Believes" expressa uma opinião permanente. Usamos o Simple Present.'
  },
  {
    rule: "Usamos o Simple Present para expressar preferências, opiniões e estados permanentes.",
    question: "He ___ three languages fluently.",
    options: ["spoke", "is speaking", "speaks", "has spoken"],
    correct: 2,
    explanation: '"Speaks" expressa uma habilidade permanente. Usamos o Simple Present.'
  },
  {
    rule: "Usamos o Simple Present para expressar preferências, opiniões e estados permanentes.",
    question: "I ___ that we should protect the environment.",
    options: ["thought", "think", "am thinking", "have thought"],
    correct: 1,
    explanation: '"Think" expressa uma opinião. Usamos o Simple Present.'
  },
  {
    rule: "Usamos o Simple Present para expressar preferências, opiniões e estados permanentes.",
    question: "She ___ two brothers and one sister.",
    options: ["had", "is having", "has had", "has"],
    correct: 3,
    explanation: '"Has" expressa um estado familiar permanente. Usamos o Simple Present.'
  },
  {
    rule: "Usamos o Simple Present para expressar preferências, opiniões e estados permanentes.",
    question: "They ___ in the power of teamwork.",
    options: ["believed", "believe", "are believing", "have believed"],
    correct: 1,
    explanation: '"Believe" expressa uma opinião permanente. Usamos o Simple Present.'
  },
  {
    rule: "Usamos o Simple Present para expressar preferências, opiniões e estados permanentes.",
    question: "He ___ the mountains to the beach.",
    options: ["preferred", "is preferring", "prefers", "has preferred"],
    correct: 2,
    explanation: '"Prefers" expressa uma preferência permanente. Usamos o Simple Present.'
  },
  {
    rule: "Usamos o Simple Present para expressar preferências, opiniões e estados permanentes.",
    question: "She ___ as a doctor at the local hospital.",
    options: ["worked", "works", "is working", "has worked"],
    correct: 1,
    explanation: '"Works" expressa um estado profissional permanente. Usamos o Simple Present.'
  },
  {
    rule: "Usamos o Simple Present para expressar preferências, opiniões e estados permanentes.",
    question: "I ___ that travel broadens the mind.",
    options: ["felt", "am feeling", "feel", "have felt"],
    correct: 2,
    explanation: '"Feel" expressa uma opinião permanente. Usamos o Simple Present.'
  },
  {
    rule: "Usamos o Simple Present para expressar preferências, opiniões e estados permanentes.",
    question: "He ___ a house with a big garden.",
    options: ["owned", "is owning", "has owned", "owns"],
    correct: 3,
    explanation: '"Owns" expressa um estado permanente. Usamos o Simple Present.'
  },
  {
    rule: "Usamos o Simple Present para expressar preferências, opiniões e estados permanentes.",
    question: "They ___ that hard work always pays off.",
    options: ["knew", "know", "are knowing", "have known"],
    correct: 1,
    explanation: '"Know" expressa uma crença permanente. Usamos o Simple Present.'
  },
  {
    rule: "Usamos o Simple Present para expressar preferências, opiniões e estados permanentes.",
    question: "She ___ animals more than anything in the world.",
    options: ["loved", "is loving", "has loved", "loves"],
    correct: 3,
    explanation: '"Loves" expressa uma preferência permanente. Usamos o Simple Present.'
  },

  // NEGATIVA DO SIMPLE PRESENT — don't / doesn't (51 a 80)
  {
    rule: "Na negativa do Simple Present usamos 'don't' (I, you, we, they) ou 'doesn't' (he, she, it) + verbo no infinitivo.",
    question: "She ___ coffee in the morning.",
    options: ["don't drink", "doesn't drinks", "doesn't drink", "isn't drink"],
    correct: 2,
    explanation: '"She" usa "doesn\'t" + infinitivo. O correto é "doesn\'t drink", nunca "doesn\'t drinks".'
  },
  {
    rule: "Na negativa do Simple Present usamos 'don't' (I, you, we, they) ou 'doesn't' (he, she, it) + verbo no infinitivo.",
    question: "They ___ to work on Sundays.",
    options: ["doesn't go", "don't goes", "don't go", "isn't go"],
    correct: 2,
    explanation: '"They" usa "don\'t" + infinitivo. O correto é "don\'t go".'
  },
  {
    rule: "Na negativa do Simple Present usamos 'don't' (I, you, we, they) ou 'doesn't' (he, she, it) + verbo no infinitivo.",
    question: "He ___ meat. He's a vegetarian.",
    options: ["don't eat", "doesn't eats", "doesn't eat", "isn't eat"],
    correct: 2,
    explanation: '"He" usa "doesn\'t" + infinitivo. O correto é "doesn\'t eat".'
  },
  {
    rule: "Na negativa do Simple Present usamos 'don't' (I, you, we, they) ou 'doesn't' (he, she, it) + verbo no infinitivo.",
    question: "I ___ like horror movies.",
    options: ["doesn't like", "don't likes", "don't like", "isn't like"],
    correct: 2,
    explanation: '"I" usa "don\'t" + infinitivo. O correto é "don\'t like".'
  },
  {
    rule: "Na negativa do Simple Present usamos 'don't' (I, you, we, they) ou 'doesn't' (he, she, it) + verbo no infinitivo.",
    question: "We ___ have class on Fridays.",
    options: ["doesn't have", "don't has", "don't have", "isn't have"],
    correct: 2,
    explanation: '"We" usa "don\'t" + infinitivo. O correto é "don\'t have".'
  },
  {
    rule: "Na negativa do Simple Present usamos 'don't' (I, you, we, they) ou 'doesn't' (he, she, it) + verbo no infinitivo.",
    question: "She ___ speak Spanish fluently.",
    options: ["don't speak", "doesn't speaks", "doesn't speak", "isn't speak"],
    correct: 2,
    explanation: '"She" usa "doesn\'t" + infinitivo. O correto é "doesn\'t speak".'
  },
  {
    rule: "Na negativa do Simple Present usamos 'don't' (I, you, we, they) ou 'doesn't' (he, she, it) + verbo no infinitivo.",
    question: "He ___ know the answer to that question.",
    options: ["don't know", "doesn't knows", "doesn't know", "isn't know"],
    correct: 2,
    explanation: '"He" usa "doesn\'t" + infinitivo. O correto é "doesn\'t know".'
  },
  {
    rule: "Na negativa do Simple Present usamos 'don't' (I, you, we, they) ou 'doesn't' (he, she, it) + verbo no infinitivo.",
    question: "They ___ live in this neighborhood anymore.",
    options: ["doesn't live", "don't lives", "don't live", "isn't live"],
    correct: 2,
    explanation: '"They" usa "don\'t" + infinitivo. O correto é "don\'t live".'
  },
  {
    rule: "Na negativa do Simple Present usamos 'don't' (I, you, we, they) ou 'doesn't' (he, she, it) + verbo no infinitivo.",
    question: "I ___ understand what you mean.",
    options: ["doesn't understand", "don't understands", "don't understand", "isn't understand"],
    correct: 2,
    explanation: '"I" usa "don\'t" + infinitivo. O correto é "don\'t understand".'
  },
  {
    rule: "Na negativa do Simple Present usamos 'don't' (I, you, we, they) ou 'doesn't' (he, she, it) + verbo no infinitivo.",
    question: "We ___ agree with that decision.",
    options: ["doesn't agree", "don't agrees", "don't agree", "isn't agree"],
    correct: 2,
    explanation: '"We" usa "don\'t" + infinitivo. O correto é "don\'t agree".'
  },
  {
    rule: "Na negativa do Simple Present usamos 'don't' (I, you, we, they) ou 'doesn't' (he, she, it) + verbo no infinitivo.",
    question: "She ___ work on weekends.",
    options: ["don't work", "doesn't works", "doesn't work", "isn't work"],
    correct: 2,
    explanation: '"She" usa "doesn\'t" + infinitivo. O correto é "doesn\'t work".'
  },
  {
    rule: "Na negativa do Simple Present usamos 'don't' (I, you, we, they) ou 'doesn't' (he, she, it) + verbo no infinitivo.",
    question: "He ___ believe in coincidences.",
    options: ["don't believe", "doesn't believes", "doesn't believe", "isn't believe"],
    correct: 2,
    explanation: '"He" usa "doesn\'t" + infinitivo. O correto é "doesn\'t believe".'
  },
  {
    rule: "Na negativa do Simple Present usamos 'don't' (I, you, we, they) ou 'doesn't' (he, she, it) + verbo no infinitivo.",
    question: "They ___ take the bus to school.",
    options: ["doesn't take", "don't takes", "don't take", "isn't take"],
    correct: 2,
    explanation: '"They" usa "don\'t" + infinitivo. O correto é "don\'t take".'
  },
  {
    rule: "Na negativa do Simple Present usamos 'don't' (I, you, we, they) ou 'doesn't' (he, she, it) + verbo no infinitivo.",
    question: "I ___ remember his phone number.",
    options: ["doesn't remember", "don't remembers", "don't remember", "isn't remember"],
    correct: 2,
    explanation: '"I" usa "don\'t" + infinitivo. O correto é "don\'t remember".'
  },
  {
    rule: "Na negativa do Simple Present usamos 'don't' (I, you, we, they) ou 'doesn't' (he, she, it) + verbo no infinitivo.",
    question: "We ___ have enough time to finish this today.",
    options: ["doesn't have", "don't has", "don't have", "isn't have"],
    correct: 2,
    explanation: '"We" usa "don\'t" + infinitivo. O correto é "don\'t have".'
  },
  {
    rule: "Na negativa do Simple Present usamos 'don't' (I, you, we, they) ou 'doesn't' (he, she, it) + verbo no infinitivo.",
    question: "She ___ enjoy spicy food.",
    options: ["don't enjoy", "doesn't enjoys", "doesn't enjoy", "isn't enjoy"],
    correct: 2,
    explanation: '"She" usa "doesn\'t" + infinitivo. O correto é "doesn\'t enjoy".'
  },
  {
    rule: "Na negativa do Simple Present usamos 'don't' (I, you, we, they) ou 'doesn't' (he, she, it) + verbo no infinitivo.",
    question: "He ___ play any musical instruments.",
    options: ["don't play", "doesn't plays", "doesn't play", "isn't play"],
    correct: 2,
    explanation: '"He" usa "doesn\'t" + infinitivo. O correto é "doesn\'t play".'
  },
  {
    rule: "Na negativa do Simple Present usamos 'don't' (I, you, we, they) ou 'doesn't' (he, she, it) + verbo no infinitivo.",
    question: "They ___ speak the same language.",
    options: ["doesn't speak", "don't speaks", "don't speak", "isn't speak"],
    correct: 2,
    explanation: '"They" usa "don\'t" + infinitivo. O correto é "don\'t speak".'
  },
  {
    rule: "Na negativa do Simple Present usamos 'don't' (I, you, we, they) ou 'doesn't' (he, she, it) + verbo no infinitivo.",
    question: "I ___ watch television very often.",
    options: ["doesn't watch", "don't watches", "don't watch", "isn't watch"],
    correct: 2,
    explanation: '"I" usa "don\'t" + infinitivo. O correto é "don\'t watch".'
  },
  {
    rule: "Na negativa do Simple Present usamos 'don't' (I, you, we, they) ou 'doesn't' (he, she, it) + verbo no infinitivo.",
    question: "We ___ need any help right now, thank you.",
    options: ["doesn't need", "don't needs", "don't need", "isn't need"],
    correct: 2,
    explanation: '"We" usa "don\'t" + infinitivo. O correto é "don\'t need".'
  },
  {
    rule: "Na negativa do Simple Present usamos 'don't' (I, you, we, they) ou 'doesn't' (he, she, it) + verbo no infinitivo.",
    question: "She ___ drive to work. She prefers to walk.",
    options: ["don't drive", "doesn't drives", "doesn't drive", "isn't drive"],
    correct: 2,
    explanation: '"She" usa "doesn\'t" + infinitivo. O correto é "doesn\'t drive".'
  },
  {
    rule: "Na negativa do Simple Present usamos 'don't' (I, you, we, they) ou 'doesn't' (he, she, it) + verbo no infinitivo.",
    question: "He ___ care about money. He values experiences.",
    options: ["don't care", "doesn't cares", "doesn't care", "isn't care"],
    correct: 2,
    explanation: '"He" usa "doesn\'t" + infinitivo. O correto é "doesn\'t care".'
  },
  {
    rule: "Na negativa do Simple Present usamos 'don't' (I, you, we, they) ou 'doesn't' (he, she, it) + verbo no infinitivo.",
    question: "They ___ offer discounts on new products.",
    options: ["doesn't offer", "don't offers", "don't offer", "isn't offer"],
    correct: 2,
    explanation: '"They" usa "don\'t" + infinitivo. O correto é "don\'t offer".'
  },
  {
    rule: "Na negativa do Simple Present usamos 'don't' (I, you, we, they) ou 'doesn't' (he, she, it) + verbo no infinitivo.",
    question: "I ___ think that's a good idea.",
    options: ["doesn't think", "don't thinks", "don't think", "isn't think"],
    correct: 2,
    explanation: '"I" usa "don\'t" + infinitivo. O correto é "don\'t think".'
  },
  {
    rule: "Na negativa do Simple Present usamos 'don't' (I, you, we, they) ou 'doesn't' (he, she, it) + verbo no infinitivo.",
    question: "We ___ allow pets in this building.",
    options: ["doesn't allow", "don't allows", "don't allow", "isn't allow"],
    correct: 2,
    explanation: '"We" usa "don\'t" + infinitivo. O correto é "don\'t allow".'
  },
  {
    rule: "Na negativa do Simple Present usamos 'don't' (I, you, we, they) ou 'doesn't' (he, she, it) + verbo no infinitivo.",
    question: "She ___ wake up early on weekends.",
    options: ["don't wake up", "doesn't wakes up", "doesn't wake up", "isn't wake up"],
    correct: 2,
    explanation: '"She" usa "doesn\'t" + infinitivo. O correto é "doesn\'t wake up".'
  },
  {
    rule: "Na negativa do Simple Present usamos 'don't' (I, you, we, they) ou 'doesn't' (he, she, it) + verbo no infinitivo.",
    question: "He ___ read the news every day.",
    options: ["don't read", "doesn't reads", "doesn't read", "isn't read"],
    correct: 2,
    explanation: '"He" usa "doesn\'t" + infinitivo. O correto é "doesn\'t read".'
  },
  {
    rule: "Na negativa do Simple Present usamos 'don't' (I, you, we, they) ou 'doesn't' (he, she, it) + verbo no infinitivo.",
    question: "They ___ sell organic products in that store.",
    options: ["doesn't sell", "don't sells", "don't sell", "isn't sell"],
    correct: 2,
    explanation: '"They" usa "don\'t" + infinitivo. O correto é "don\'t sell".'
  },
  {
    rule: "Na negativa do Simple Present usamos 'don't' (I, you, we, they) ou 'doesn't' (he, she, it) + verbo no infinitivo.",
    question: "I ___ feel comfortable in large crowds.",
    options: ["doesn't feel", "don't feels", "don't feel", "isn't feel"],
    correct: 2,
    explanation: '"I" usa "don\'t" + infinitivo. O correto é "don\'t feel".'
  },
  {
    rule: "Na negativa do Simple Present usamos 'don't' (I, you, we, they) ou 'doesn't' (he, she, it) + verbo no infinitivo.",
    question: "We ___ charge extra for delivery.",
    options: ["doesn't charge", "don't charges", "don't charge", "isn't charge"],
    correct: 2,
    explanation: '"We" usa "don\'t" + infinitivo. O correto é "don\'t charge".'
  },

  // NEGATIVA DO SIMPLE PRESENT COM TO BE — isn't / aren't (81 a 100)
  {
    rule: "Na negativa do Simple Present do verbo To Be usamos 'isn't' (he, she, it) ou 'aren't' (you, we, they) ou 'am not' (I).",
    question: "She ___ happy with the results.",
    options: ["don't be happy", "aren't happy", "isn't happy", "doesn't be happy"],
    correct: 2,
    explanation: '"She" usa "isn\'t" na negativa do Simple Present do To Be. Nunca usamos "doesn\'t" com o To Be.'
  },
  {
    rule: "Na negativa do Simple Present do verbo To Be usamos 'isn't' (he, she, it) ou 'aren't' (you, we, they) ou 'am not' (I).",
    question: "They ___ ready for the presentation.",
    options: ["isn't ready", "don't be ready", "aren't ready", "doesn't be ready"],
    correct: 2,
    explanation: '"They" usa "aren\'t" na negativa do Simple Present do To Be.'
  },
  {
    rule: "Na negativa do Simple Present do verbo To Be usamos 'isn't' (he, she, it) ou 'aren't' (you, we, they) ou 'am not' (I).",
    question: "I ___ sure about that.",
    options: ["aren't sure", "don't be sure", "isn't sure", "am not sure"],
    correct: 3,
    explanation: '"I" usa "am not" na negativa do Simple Present do To Be. Nunca usamos "aren\'t" ou "isn\'t" com "I".'
  },
  {
    rule: "Na negativa do Simple Present do verbo To Be usamos 'isn't' (he, she, it) ou 'aren't' (you, we, they) ou 'am not' (I).",
    question: "The meeting ___ scheduled for today.",
    options: ["aren't scheduled", "don't be scheduled", "isn't scheduled", "doesn't be scheduled"],
    correct: 2,
    explanation: '"The meeting" equivale a "it", então usamos "isn\'t".'
  },
  {
    rule: "Na negativa do Simple Present do verbo To Be usamos 'isn't' (he, she, it) ou 'aren't' (you, we, they) ou 'am not' (I).",
    question: "We ___ interested in that offer.",
    options: ["isn't interested", "don't be interested", "aren't interested", "doesn't be interested"],
    correct: 2,
    explanation: '"We" usa "aren\'t" na negativa do Simple Present do To Be.'
  },
  {
    rule: "Na negativa do Simple Present do verbo To Be usamos 'isn't' (he, she, it) ou 'aren't' (you, we, they) ou 'am not' (I).",
    question: "He ___ the right person for this job.",
    options: ["aren't the right person", "don't be the right person", "isn't the right person", "doesn't be the right person"],
    correct: 2,
    explanation: '"He" usa "isn\'t" na negativa do Simple Present do To Be.'
  },
  {
    rule: "Na negativa do Simple Present do verbo To Be usamos 'isn't' (he, she, it) ou 'aren't' (you, we, they) ou 'am not' (I).",
    question: "The prices ___ reasonable at that store.",
    options: ["isn't reasonable", "don't be reasonable", "aren't reasonable", "doesn't be reasonable"],
    correct: 2,
    explanation: '"The prices" é plural, então usamos "aren\'t".'
  },
  {
    rule: "Na negativa do Simple Present do verbo To Be usamos 'isn't' (he, she, it) ou 'aren't' (you, we, they) ou 'am not' (I).",
    question: "I ___ afraid of making mistakes.",
    options: ["aren't afraid", "don't be afraid", "isn't afraid", "am not afraid"],
    correct: 3,
    explanation: '"I" usa "am not" na negativa do Simple Present do To Be.'
  },
  {
    rule: "Na negativa do Simple Present do verbo To Be usamos 'isn't' (he, she, it) ou 'aren't' (you, we, they) ou 'am not' (I).",
    question: "You ___ allowed to enter this area.",
    options: ["isn't allowed", "don't be allowed", "aren't allowed", "doesn't be allowed"],
    correct: 2,
    explanation: '"You" usa "aren\'t" na negativa do Simple Present do To Be.'
  },
  {
    rule: "Na negativa do Simple Present do verbo To Be usamos 'isn't' (he, she, it) ou 'aren't' (you, we, they) ou 'am not' (I).",
    question: "The coffee ___ hot enough.",
    options: ["aren't hot", "don't be hot", "isn't hot", "doesn't be hot"],
    correct: 2,
    explanation: '"The coffee" equivale a "it", então usamos "isn\'t".'
  },
  {
    rule: "Na negativa do Simple Present do verbo To Be usamos 'isn't' (he, she, it) ou 'aren't' (you, we, they) ou 'am not' (I).",
    question: "They ___ from the same country.",
    options: ["isn't from", "don't be from", "aren't from", "doesn't be from"],
    correct: 2,
    explanation: '"They" usa "aren\'t" na negativa do Simple Present do To Be.'
  },
  {
    rule: "Na negativa do Simple Present do verbo To Be usamos 'isn't' (he, she, it) ou 'aren't' (you, we, they) ou 'am not' (I).",
    question: "She ___ aware of the new rules.",
    options: ["aren't aware", "don't be aware", "isn't aware", "doesn't be aware"],
    correct: 2,
    explanation: '"She" usa "isn\'t" na negativa do Simple Present do To Be.'
  },
  {
    rule: "Na negativa do Simple Present do verbo To Be usamos 'isn't' (he, she, it) ou 'aren't' (you, we, they) ou 'am not' (I).",
    question: "I ___ the kind of person who gives up easily.",
    options: ["aren't the kind", "don't be the kind", "isn't the kind", "am not the kind"],
    correct: 3,
    explanation: '"I" usa "am not" na negativa do Simple Present do To Be.'
  },
  {
    rule: "Na negativa do Simple Present do verbo To Be usamos 'isn't' (he, she, it) ou 'aren't' (you, we, they) ou 'am not' (I).",
    question: "The results ___ what we expected.",
    options: ["isn't what we expected", "don't be what we expected", "aren't what we expected", "doesn't be what we expected"],
    correct: 2,
    explanation: '"The results" é plural, então usamos "aren\'t".'
  },
  {
    rule: "Na negativa do Simple Present do verbo To Be usamos 'isn't' (he, she, it) ou 'aren't' (you, we, they) ou 'am not' (I).",
    question: "He ___ responsible for that decision.",
    options: ["aren't responsible", "don't be responsible", "isn't responsible", "doesn't be responsible"],
    correct: 2,
    explanation: '"He" usa "isn\'t" na negativa do Simple Present do To Be.'
  },
  {
    rule: "Na negativa do Simple Present do verbo To Be usamos 'isn't' (he, she, it) ou 'aren't' (you, we, they) ou 'am not' (I).",
    question: "We ___ ready to make a final decision yet.",
    options: ["isn't ready", "don't be ready", "aren't ready", "doesn't be ready"],
    correct: 2,
    explanation: '"We" usa "aren\'t" na negativa do Simple Present do To Be.'
  },
  {
    rule: "Na negativa do Simple Present do verbo To Be usamos 'isn't' (he, she, it) ou 'aren't' (you, we, they) ou 'am not' (I).",
    question: "The food ___ as good as it looks.",
    options: ["aren't as good", "don't be as good", "isn't as good", "doesn't be as good"],
    correct: 2,
    explanation: '"The food" equivale a "it", então usamos "isn\'t".'
  },
  {
    rule: "Na negativa do Simple Present do verbo To Be usamos 'isn't' (he, she, it) ou 'aren't' (you, we, they) ou 'am not' (I).",
    question: "You ___ the only one with this problem.",
    options: ["isn't the only one", "don't be the only one", "aren't the only one", "doesn't be the only one"],
    correct: 2,
    explanation: '"You" usa "aren\'t" na negativa do Simple Present do To Be.'
  },
  {
    rule: "Na negativa do Simple Present do verbo To Be usamos 'isn't' (he, she, it) ou 'aren't' (you, we, they) ou 'am not' (I).",
    question: "I ___ convinced by his argument.",
    options: ["aren't convinced", "don't be convinced", "isn't convinced", "am not convinced"],
    correct: 3,
    explanation: '"I" usa "am not" na negativa do Simple Present do To Be.'
  },
  {
    rule: "Na negativa do Simple Present do verbo To Be usamos 'isn't' (he, she, it) ou 'aren't' (you, we, they) ou 'am not' (I).",
    question: "The instructions ___ clear enough for beginners.",
    options: ["isn't clear", "don't be clear", "aren't clear", "doesn't be clear"],
    correct: 2,
    explanation: '"The instructions" é plural, então usamos "aren\'t".'
  },

  // INTERROGATIVA DO SIMPLE PRESENT — Do / Does (101 a 130)
  {
    rule: "Na interrogativa do Simple Present usamos 'Do' (I, you, we, they) ou 'Does' (he, she, it) + sujeito + verbo no infinitivo.",
    question: "___ she drink coffee in the morning?",
    options: ["Is she drink", "Do she drink", "Does she drinks", "Does she drink"],
    correct: 3,
    explanation: '"She" usa "Does" na interrogativa do Simple Present. O correto é "Does she drink", nunca "Does she drinks".'
  },
  {
    rule: "Na interrogativa do Simple Present usamos 'Do' (I, you, we, they) ou 'Does' (he, she, it) + sujeito + verbo no infinitivo.",
    question: "___ they work on weekends?",
    options: ["Does they work", "Is they work", "Do they works", "Do they work"],
    correct: 3,
    explanation: '"They" usa "Do" na interrogativa do Simple Present. O correto é "Do they work".'
  },
  {
    rule: "Na interrogativa do Simple Present usamos 'Do' (I, you, we, they) ou 'Does' (he, she, it) + sujeito + verbo no infinitivo.",
    question: "___ he speak any foreign languages?",
    options: ["Do he speak", "Is he speak", "Does he speaks", "Does he speak"],
    correct: 3,
    explanation: '"He" usa "Does" na interrogativa do Simple Present. O correto é "Does he speak".'
  },
  {
    rule: "Na interrogativa do Simple Present usamos 'Do' (I, you, we, they) ou 'Does' (he, she, it) + sujeito + verbo no infinitivo.",
    question: "___ you like spicy food?",
    options: ["Does you like", "Is you like", "Do you likes", "Do you like"],
    correct: 3,
    explanation: '"You" usa "Do" na interrogativa do Simple Present. O correto é "Do you like".'
  },
  {
    rule: "Na interrogativa do Simple Present usamos 'Do' (I, you, we, they) ou 'Does' (he, she, it) + sujeito + verbo no infinitivo.",
    question: "___ we have enough time to finish this?",
    options: ["Does we have", "Is we have", "Do we has", "Do we have"],
    correct: 3,
    explanation: '"We" usa "Do" na interrogativa do Simple Present. O correto é "Do we have".'
  },
  {
    rule: "Na interrogativa do Simple Present usamos 'Do' (I, you, we, they) ou 'Does' (he, she, it) + sujeito + verbo no infinitivo.",
    question: "___ she know the answer?",
    options: ["Do she know", "Is she know", "Does she knows", "Does she know"],
    correct: 3,
    explanation: '"She" usa "Does" na interrogativa do Simple Present. O correto é "Does she know".'
  },
  {
    rule: "Na interrogativa do Simple Present usamos 'Do' (I, you, we, they) ou 'Does' (he, she, it) + sujeito + verbo no infinitivo.",
    question: "___ he live near the school?",
    options: ["Do he live", "Is he live", "Does he lives", "Does he live"],
    correct: 3,
    explanation: '"He" usa "Does" na interrogativa do Simple Present. O correto é "Does he live".'
  },
  {
    rule: "Na interrogativa do Simple Present usamos 'Do' (I, you, we, they) ou 'Does' (he, she, it) + sujeito + verbo no infinitivo.",
    question: "___ they understand the instructions?",
    options: ["Does they understand", "Is they understand", "Do they understands", "Do they understand"],
    correct: 3,
    explanation: '"They" usa "Do" na interrogativa do Simple Present. O correto é "Do they understand".'
  },
  {
    rule: "Na interrogativa do Simple Present usamos 'Do' (I, you, we, they) ou 'Does' (he, she, it) + sujeito + verbo no infinitivo.",
    question: "___ you agree with that decision?",
    options: ["Does you agree", "Is you agree", "Do you agrees", "Do you agree"],
    correct: 3,
    explanation: '"You" usa "Do" na interrogativa do Simple Present. O correto é "Do you agree".'
  },
  {
    rule: "Na interrogativa do Simple Present usamos 'Do' (I, you, we, they) ou 'Does' (he, she, it) + sujeito + verbo no infinitivo.",
    question: "___ we need to bring anything to the meeting?",
    options: ["Does we need", "Is we need", "Do we needs", "Do we need"],
    correct: 3,
    explanation: '"We" usa "Do" na interrogativa do Simple Present. O correto é "Do we need".'
  },
  {
    rule: "Na interrogativa do Simple Present usamos 'Do' (I, you, we, they) ou 'Does' (he, she, it) + sujeito + verbo no infinitivo.",
    question: "___ she enjoy reading books?",
    options: ["Do she enjoy", "Is she enjoy", "Does she enjoys", "Does she enjoy"],
    correct: 3,
    explanation: '"She" usa "Does" na interrogativa do Simple Present. O correto é "Does she enjoy".'
  },
  {
    rule: "Na interrogativa do Simple Present usamos 'Do' (I, you, we, they) ou 'Does' (he, she, it) + sujeito + verbo no infinitivo.",
    question: "___ he play any sports?",
    options: ["Do he play", "Is he play", "Does he plays", "Does he play"],
    correct: 3,
    explanation: '"He" usa "Does" na interrogativa do Simple Present. O correto é "Does he play".'
  },
  {
    rule: "Na interrogativa do Simple Present usamos 'Do' (I, you, we, they) ou 'Does' (he, she, it) + sujeito + verbo no infinitivo.",
    question: "___ they take the bus to work?",
    options: ["Does they take", "Is they take", "Do they takes", "Do they take"],
    correct: 3,
    explanation: '"They" usa "Do" na interrogativa do Simple Present. O correto é "Do they take".'
  },
  

  // ============================================================
// INICIALIZAÇÃO E LISTENERS DE EVENTOS
// ============================================================

document.addEventListener('DOMContentLoaded', () => {
  // Exibe a tela de login ao carregar a página
  showScreen('login-screen');

  // Listener para o botão de login
  const loginButton = document.getElementById('login-btn');
  if (loginButton) {
    loginButton.addEventListener('click', handleLogin);
  }

  // Listeners para os botões de logout
  const logoutTeacherBtn = document.getElementById('logout-teacher-btn');
  if (logoutTeacherBtn) {
    logoutTeacherBtn.addEventListener('click', logout);
  }

  const logoutStudentBtn = document.getElementById('logout-student-btn');
  if (logoutStudentBtn) {
    logoutStudentBtn.addEventListener('click', logout);
  }

  // Listener para o botão de adicionar aluno (painel do professor)
  const addStudentBtn = document.getElementById('add-student-btn');
  if (addStudentBtn) {
    addStudentBtn.addEventListener('click', addStudent);
  }

  // Listeners para os botões dos módulos do aluno
  document.getElementById('btn-simplePast')?.addEventListener('click', () => startQuiz('simplePast'));
  document.getElementById('btn-presentPerfect')?.addEventListener('click', () => startQuiz('presentPerfect'));
  document.getElementById('btn-presentPerfectContinuous')?.addEventListener('click', () => startQuiz('presentPerfectContinuous'));
  document.getElementById('btn-simplePresent')?.addEventListener('click', () => startQuiz('simplePresent'));

  // Listener para o botão "Próxima questão" no quiz
  document.getElementById('next-btn')?.addEventListener('click', nextQuestion);

  // Listener para o botão "Tentar novamente" na tela de resultado
  document.getElementById('retry-btn')?.addEventListener('click', resetQuiz);

  // Listener para o botão "Voltar aos módulos" na tela de resultado
  document.getElementById('back-btn')?.addEventListener('click', () => showScreen('student-screen'));

  // Listener para o botão "Ver resultados" no painel do professor
  document.getElementById('view-results-btn')?.addEventListener('click', () => {
    showScreen('results-screen');
    renderStudentResults();
  });

  // Listener para o botão "Voltar" na tela de resultados do professor
  document.getElementById('back-teacher-btn')?.addEventListener('click', () => showScreen('teacher-screen'));

  // Verifica se há um usuário logado ao carregar a página e redireciona
  if (currentUser) {
    if (currentUser.role === 'teacher') {
      showTeacherPanel();
    } else {
      showStudentPanel();
    }
  } else {
    showScreen('login-screen');
  }
});

// Adiciona um listener para o evento 'keydown' no documento
document.addEventListener('keydown', (event) => {
  // Verifica se a tecla pressionada foi 'Enter'
  if (event.key === 'Enter') {
    // Verifica se a tela de login está ativa
    const loginScreen = document.getElementById('login-screen');
    if (loginScreen && loginScreen.classList.contains('active')) {
      // Chama a função handleLogin se a tela de login estiver ativa
      handleLogin();
    }
    // Verifica se a tela do quiz está ativa e o botão "Próxima questão" está visível
    const quizScreen = document.getElementById('quiz-screen');
    const nextButton = document.getElementById('next-btn');
    if (quizScreen && quizScreen.classList.contains('active') && nextButton && nextButton.style.display === 'block') {
      nextQuestion();
    }
  }
});

// Adiciona um listener para o clique nas opções do quiz
document.getElementById('quiz-options')?.addEventListener('click', (event) => {
  if (event.target.classList.contains('option-btn')) {
    // Encontra o índice da opção clicada
    const optionsContainer = document.getElementById('quiz-options');
    const options = Array.from(optionsContainer.children);
    const clickedIndex = options.indexOf(event.target);

    // Seleciona a opção e verifica a resposta
    selectOption(clickedIndex);
    checkAnswer();
  }
});
