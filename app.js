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
// INICIALIZAÇÃO
// ============================================================

window.onload = function () {
  if (currentUser) {
    if (currentUser.role === 'teacher') {
      showTeacherPanel();
    } else {
      showStudentPanel();
    }
  } else {
    showScreen('login-screen');
  }

  document.getElementById('login-btn').addEventListener('click', handleLogin);
  document.getElementById('add-student-btn').addEventListener('click', addStudent);
};
// ============================================================
// BANCO DE QUESTÕES — SIMPLE PAST (50 questões)
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
    explanation: '"Last summer" é um tempo específico no passado, então usamos "went".'
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
    explanation: '"The roads" é plural, então usamos "were". Aqui o To Be se traduz como "estavam".'
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
  }

];

// ============================================================
// BANCO DE QUESTÕES — PRESENT PERFECT (50 questões)
// ============================================================

const presentPerfectQuestions = [

  // REGRA PRIMÁRIA — sem tempo específico na frase (1 a 20)
  {
    rule: "Usamos o Present Perfect quando não há um tempo específico na frase.",
    question: "She ___ to Japan.",
    options: ["has been", "went", "goes", "is going"],
    correct: 0,
    explanation: 'Sem tempo específico na frase, usamos o Present Perfect: "has been". Não sabemos quando foi.'
  },
  {
    rule: "Usamos o Present Perfect quando não há um tempo específico na frase.",
    question: "They ___ this movie before.",
    options: ["watched", "watch", "are watching", "have watched"],
    correct: 3,
    explanation: 'Sem tempo específico, usamos o Present Perfect: "have watched".'
  },
  {
    rule: "Usamos o Present Perfect quando não há um tempo específico na frase.",
    question: "He ___ three languages.",
    options: ["learns", "learned", "has learned", "is learning"],
    correct: 2,
    explanation: 'Sem tempo específico na frase, usamos o Present Perfect: "has learned".'
  },
  {
    rule: "Usamos o Present Perfect quando não há um tempo específico na frase.",
    question: "I ___ sushi before.",
    options: ["have tried", "tried", "try", "am trying"],
    correct: 0,
    explanation: 'Sem tempo específico, usamos o Present Perfect: "have tried". Não sabemos quando a pessoa experimentou.'
  },
  {
    rule: "Usamos o Present Perfect quando não há um tempo específico na frase.",
    question: "We ___ that restaurant.",
    options: ["visited", "visit", "are visiting", "have visited"],
    correct: 3,
    explanation: 'Sem tempo específico na frase, usamos o Present Perfect: "have visited".'
  },
  {
    rule: "Usamos o Present Perfect quando não há um tempo específico na frase.",
    question: "She ___ her wallet.",
    options: ["loses", "lost", "has lost", "is losing"],
    correct: 2,
    explanation: 'Sem tempo específico, usamos o Present Perfect: "has lost". O resultado ainda é relevante agora.'
  },
  {
    rule: "Usamos o Present Perfect quando não há um tempo específico na frase.",
    question: "He ___ a novel.",
    options: ["has written", "wrote", "writes", "is writing"],
    correct: 0,
    explanation: 'Sem tempo específico na frase, usamos o Present Perfect: "has written".'
  },
  {
    rule: "Usamos o Present Perfect quando não há um tempo específico na frase.",
    question: "They ___ the problem.",
    options: ["solved", "solve", "are solving", "have solved"],
    correct: 3,
    explanation: 'Sem tempo específico, usamos o Present Perfect: "have solved".'
  },
  {
    rule: "Usamos o Present Perfect quando não há um tempo específico na frase.",
    question: "I ___ this song many times.",
    options: ["hear", "heard", "have heard", "am hearing"],
    correct: 2,
    explanation: 'Sem tempo específico na frase, usamos o Present Perfect: "have heard".'
  },
  {
    rule: "Usamos o Present Perfect quando não há um tempo específico na frase.",
    question: "She ___ a lot recently.",
    options: ["has changed", "changed", "changes", "is changing"],
    correct: 0,
    explanation: '"Recently" não é um tempo específico como "yesterday" ou "last week". Usamos o Present Perfect: "has changed".'
  },
  {
    rule: "Usamos o Present Perfect quando não há um tempo específico na frase.",
    question: "We ___ the new shopping mall.",
    options: ["visited", "visit", "are visiting", "have visited"],
    correct: 3,
    explanation: 'Sem tempo específico na frase, usamos o Present Perfect: "have visited".'
  },
  {
    rule: "Usamos o Present Perfect quando não há um tempo específico na frase.",
    question: "He ___ his driving license.",
    options: ["gets", "got", "has gotten", "is getting"],
    correct: 2,
    explanation: 'Sem tempo específico, usamos o Present Perfect: "has gotten".'
  },
  {
    rule: "Usamos o Present Perfect quando não há um tempo específico na frase.",
    question: "They ___ to fix the issue.",
    options: ["have tried", "tried", "try", "are trying"],
    correct: 0,
    explanation: 'Sem tempo específico na frase, usamos o Present Perfect: "have tried".'
  },
  {
    rule: "Usamos o Present Perfect quando não há um tempo específico na frase.",
    question: "I ___ that book.",
    options: ["reads", "read", "am reading", "have read"],
    correct: 3,
    explanation: 'Sem tempo específico, usamos o Present Perfect: "have read".'
  },
  {
    rule: "Usamos o Present Perfect quando não há um tempo específico na frase.",
    question: "She ___ her mind about the trip.",
    options: ["changed", "changes", "has changed", "is changing"],
    correct: 2,
    explanation: 'Sem tempo específico na frase, usamos o Present Perfect: "has changed".'
  },
  {
    rule: "Usamos o Present Perfect quando não há um tempo específico na frase.",
    question: "We ___ this problem before.",
    options: ["have faced", "faced", "face", "are facing"],
    correct: 0,
    explanation: 'Sem tempo específico, usamos o Present Perfect: "have faced".'
  },
  {
    rule: "Usamos o Present Perfect quando não há um tempo específico na frase.",
    question: "He ___ the answer.",
    options: ["finds", "found", "is finding", "has found"],
    correct: 3,
    explanation: 'Sem tempo específico na frase, usamos o Present Perfect: "has found".'
  },
  {
    rule: "Usamos o Present Perfect quando não há um tempo específico na frase.",
    question: "They ___ their homework.",
    options: ["finished", "finish", "have finished", "are finishing"],
    correct: 2,
    explanation: 'Sem tempo específico, usamos o Present Perfect: "have finished".'
  },
  {
    rule: "Usamos o Present Perfect quando não há um tempo específico na frase.",
    question: "I ___ him somewhere before.",
    options: ["have seen", "saw", "see", "am seeing"],
    correct: 0,
    explanation: 'Sem tempo específico na frase, usamos o Present Perfect: "have seen".'
  },
  {
    rule: "Usamos o Present Perfect quando não há um tempo específico na frase.",
    question: "She ___ a new job.",
    options: ["finds", "found", "is finding", "has found"],
    correct: 3,
    explanation: 'Sem tempo específico, usamos o Present Perfect: "has found".'
  },

  // REGRA SECUNDÁRIA — ever, already, yet, just (21 a 35)
  {
    rule: 'Palavras como "ever", "already", "yet" e "just" indicam Present Perfect.',
    question: "Have you ___ visited the Amazon rainforest?",
    options: ["ever", "yesterday", "last year", "in 2020"],
    correct: 0,
    explanation: '"Ever" é uma das palavras-chave do Present Perfect. Pergunta sobre alguma experiência na vida.'
  },
  {
    rule: 'Palavras como "ever", "already", "yet" e "just" indicam Present Perfect.',
    question: "She has ___ finished her presentation.",
    options: ["last week", "ago", "just", "yesterday"],
    correct: 2,
    explanation: '"Just" indica que algo aconteceu muito recentemente. É uma palavra-chave do Present Perfect.'
  },
  {
    rule: 'Palavras como "ever", "already", "yet" e "just" indicam Present Perfect.',
    question: "Have they arrived ___?",
    options: ["already", "yet", "ever", "just"],
    correct: 1,
    explanation: '"Yet" é usado em perguntas e frases negativas no Present Perfect para indicar se algo aconteceu até agora.'
  },
  {
    rule: 'Palavras como "ever", "already", "yet" e "just" indicam Present Perfect.',
    question: "I have ___ seen that movie. I don't need to watch it again.",
    options: ["yet", "ever", "never", "already"],
    correct: 3,
    explanation: '"Already" indica que algo aconteceu antes do esperado. É palavra-chave do Present Perfect.'
  },
  {
    rule: 'Palavras como "ever", "already", "yet" e "just" indicam Present Perfect.',
    question: "He has ___ eaten dinner. He's not hungry.",
    options: ["already", "yet", "never", "ever"],
    correct: 0,
    explanation: '"Already" indica que a ação foi concluída antes do esperado. Usamos com Present Perfect.'
  },
  {
    rule: 'Palavras como "ever", "already", "yet" e "just" indicam Present Perfect.',
    question: "Have you ___ tried skydiving?",
    options: ["yesterday", "last month", "in 2019", "ever"],
    correct: 3,
    explanation: '"Ever" pergunta sobre qualquer momento na vida da pessoa. É palavra-chave do Present Perfect.'
  },
  {
    rule: 'Palavras como "ever", "already", "yet" e "just" indicam Present Perfect.',
    question: "She has ___ arrived. She's at the door right now.",
    options: ["yet", "ever", "just", "already"],
    correct: 2,
    explanation: '"Just" indica que algo aconteceu há pouquíssimo tempo. É palavra-chave do Present Perfect.'
  },
  {
    rule: 'Palavras como "ever", "already", "yet" e "just" indicam Present Perfect.',
    question: "They haven't called me ___.",
    options: ["already", "just", "ever", "yet"],
    correct: 3,
    explanation: '"Yet" em frases negativas indica que algo não aconteceu até o momento presente.'
  },
  {
    rule: 'Palavras como "ever", "already", "yet" e "just" indicam Present Perfect.',
    question: "I have ___ been to Africa. It was an incredible experience.",
    options: ["ever", "yet", "never", "already"],
    correct: 0,
    explanation: '"Ever" aqui confirma uma experiência de vida. É palavra-chave do Present Perfect.'
  },
  {
    rule: 'Palavras como "ever", "already", "yet" e "just" indicam Present Perfect.',
    question: "He hasn't finished his homework ___.",
    options: ["already", "just", "ever", "yet"],
    correct: 3,
    explanation: '"Yet" em frases negativas indica que algo ainda não aconteceu até agora.'
  },
  {
    rule: 'Palavras como "ever", "already", "yet" e "just" indicam Present Perfect.',
    question: "We have ___ decided where to go on vacation.",
    options: ["yet", "already", "ever", "just"],
    correct: 1,
    explanation: '"Already" indica que a decisão foi tomada antes do esperado. Palavra-chave do Present Perfect.'
  },
  {
    rule: 'Palavras como "ever", "already", "yet" e "just" indicam Present Perfect.',
    question: "Has she ___ met a famous person?",
    options: ["already", "yet", "just", "ever"],
    correct: 3,
    explanation: '"Ever" em perguntas questiona se algo aconteceu em algum momento da vida.'
  },
  {
    rule: 'Palavras como "ever", "already", "yet" e "just" indicam Present Perfect.',
    question: "They have ___ landed. The plane touched down a minute ago.",
    options: ["yet", "ever", "just", "already"],
    correct: 2,
    explanation: '"Just" indica que algo aconteceu há pouquíssimo tempo. Palavra-chave do Present Perfect.'
  },
  {
    rule: 'Palavras como "ever", "already", "yet" e "just" indicam Present Perfect.',
    question: "I have ___ read that book twice this year.",
    options: ["already", "yet", "just", "ever"],
    correct: 0,
    explanation: '"Already" indica que algo foi concluído antes do esperado. Palavra-chave do Present Perfect.'
  },
  {
    rule: 'Palavras como "ever", "already", "yet" e "just" indicam Present Perfect.',
    question: "Have you packed your bags ___?",
    options: ["already", "just", "ever", "yet"],
    correct: 3,
    explanation: '"Yet" em perguntas questiona se algo já aconteceu até o momento presente.'
  },

  // REGRA TERCIÁRIA — passado com conexão com o presente (36 a 50)
  {
    rule: "O Present Perfect conecta um fato do passado com uma consequência ou relevância no presente.",
    question: "She ___ to forgive others. She is a much happier person now.",
    options: ["learned", "learns", "has learned", "is learning"],
    correct: 2,
    explanation: 'A aprendizagem aconteceu no passado mas tem impacto direto no presente. Usamos "has learned".'
  },
  {
    rule: "O Present Perfect conecta um fato do passado com uma consequência ou relevância no presente.",
    question: "He ___ his leg. That's why he's using crutches.",
    options: ["breaks", "broke", "is breaking", "has broken"],
    correct: 3,
    explanation: 'A perna foi quebrada no passado e a consequência é visível agora. Usamos "has broken".'
  },
  {
    rule: "O Present Perfect conecta um fato do passado com uma consequência ou relevância no presente.",
    question: "They ___ all the food. There's nothing left.",
    options: ["have eaten", "ate", "eat", "are eating"],
    correct: 0,
    explanation: 'A comida foi consumida no passado e o resultado é evidente agora. Usamos "have eaten".'
  },
  {
    rule: "O Present Perfect conecta um fato do passado com uma consequência ou relevância no presente.",
    question: "I ___ my keys. I can't open the door.",
    options: ["lost", "lose", "am losing", "have lost"],
    correct: 3,
    explanation: 'As chaves foram perdidas no passado e a consequência é sentida agora. Usamos "have lost".'
  },
  {
    rule: "O Present Perfect conecta um fato do passado com uma consequência ou relevância no presente.",
    question: "She ___ a new dress for the party. She looks beautiful.",
    options: ["buys", "bought", "has bought", "is buying"],
    correct: 2,
    explanation: 'A compra aconteceu no passado e o resultado é visível no presente. Usamos "has bought".'
  },
  {
    rule: "O Present Perfect conecta um fato do passado com uma consequência ou relevância no presente.",
    question: "He ___ his passport. He can't travel.",
    options: ["has lost", "lost", "loses", "is losing"],
    correct: 0,
    explanation: 'O passaporte foi perdido no passado e a consequência é sentida agora. Usamos "has lost".'
  },
  {
    rule: "O Present Perfect conecta um fato do passado com uma consequência ou relevância no presente.",
    question: "We ___ all the tickets. The show is sold out.",
    options: ["sold", "sell", "are selling", "have sold"],
    correct: 3,
    explanation: 'Os ingressos foram vendidos no passado e o resultado é visível agora. Usamos "have sold".'
  },
  {
    rule: "O Present Perfect conecta um fato do passado com uma consequência ou relevância no presente.",
    question: "She ___ weight. She looks so healthy now.",
    options: ["loses", "lost", "has lost", "is losing"],
    correct: 2,
    explanation: 'O emagrecimento aconteceu no passado e o resultado é visível no presente. Usamos "has lost".'
  },
  {
    rule: "O Present Perfect conecta um fato do passado com uma consequência ou relevância no presente.",
    question: "They ___ a new house. They're moving next week.",
    options: ["have bought", "bought", "buy", "are buying"],
    correct: 0,
    explanation: 'A compra aconteceu no passado e tem consequência direta no presente. Usamos "have bought".'
  },
  {
    rule: "O Present Perfect conecta um fato do passado com uma consequência ou relevância no presente.",
    question: "I ___ my report. My boss can read it now.",
    options: ["finished", "finish", "am finishing", "have finished"],
    correct: 3,
    explanation: 'O relatório foi concluído no passado e está disponível agora. Usamos "have finished".'
  },
  {
    rule: "O Present Perfect conecta um fato do passado com uma consequência ou relevância no presente.",
    question: "He ___ English for years. He's fluent now.",
    options: ["studies", "studied", "has studied", "is studying"],
    correct: 2,
    explanation: 'O estudo aconteceu no passado e o resultado é a fluência atual. Usamos "has studied".'
  },
  {
    rule: "O Present Perfect conecta um fato do passado com uma consequência ou relevância no presente.",
    question: "She ___ the instructions. She knows what to do.",
    options: ["has read", "read", "reads", "is reading"],
    correct: 0,
    explanation: 'A leitura aconteceu no passado e o resultado é o conhecimento atual. Usamos "has read".'
  },
  {
    rule: "O Present Perfect conecta um fato do passado com uma consequência ou relevância no presente.",
    question: "We ___ our flight. We need to book another one.",
    options: ["missed", "miss", "are missing", "have missed"],
    correct: 3,
    explanation: 'O voo foi perdido no passado e a consequência é sentida agora. Usamos "have missed".'
  },
  {
    rule: "O Present Perfect conecta um fato do passado com uma consequência ou relevância no presente.",
    question: "He ___ a lot since we last met. I barely recognize him.",
    options: ["changes", "changed", "is changing", "has changed"],
    correct: 3,
    explanation: 'A mudança aconteceu no passado e o resultado é visível agora. Usamos "has changed".'
  },
  {
    rule: "O Present Perfect conecta um fato do passado com uma consequência ou relevância no presente.",
    question: "They ___ the contract. The deal is official.",
    options: ["signed", "sign", "have signed", "are signing"],
    correct: 2,
    explanation: 'A assinatura aconteceu no passado e o resultado é o acordo oficial agora. Usamos "have signed".'
  }

];
// ============================================================
// BANCO DE QUESTÕES — PRESENT PERFECT CONTINUOUS (50 questões)
// ============================================================

const presentPerfectContinuousQuestions = [

  // REGRA PRIMÁRIA — ação que começou no passado e continua no presente (1 a 20)
  {
    rule: "O Present Perfect Continuous é usado para algo que começou no passado e continua no presente.",
    question: "She ___ all morning. Her eyes are red.",
    options: ["cried", "cries", "has been crying", "is crying"],
    correct: 2,
    explanation: 'O choro começou no passado e continua até agora, com resultado visível. Usamos "has been crying".'
  },
  {
    rule: "O Present Perfect Continuous é usado para algo que começou no passado e continua no presente.",
    question: "They ___ for the exam since Monday.",
    options: ["study", "studied", "are studying", "have been studying"],
    correct: 3,
    explanation: '"Since Monday" indica que o estudo começou na segunda e continua até agora. Usamos "have been studying".'
  },
  {
    rule: "O Present Perfect Continuous é usado para algo que começou no passado e continua no presente.",
    question: "He ___ in that company for ten years.",
    options: ["has been working", "worked", "works", "is working"],
    correct: 0,
    explanation: '"For ten years" indica duração contínua desde o passado até agora. Usamos "has been working".'
  },
  {
    rule: "O Present Perfect Continuous é usado para algo que começou no passado e continua no presente.",
    question: "I ___ to reach you all day.",
    options: ["tried", "try", "am trying", "have been trying"],
    correct: 3,
    explanation: '"All day" indica que a ação começou no passado e continua até agora. Usamos "have been trying".'
  },
  {
    rule: "O Present Perfect Continuous é usado para algo que começou no passado e continua no presente.",
    question: "She ___ English since she was a child.",
    options: ["has been studying", "studied", "studies", "is studying"],
    correct: 0,
    explanation: '"Since she was a child" indica o ponto de início de uma ação que continua até hoje. Usamos "has been studying".'
  },
  {
    rule: "O Present Perfect Continuous é usado para algo que começou no passado e continua no presente.",
    question: "We ___ for the bus for half an hour.",
    options: ["waited", "wait", "are waiting", "have been waiting"],
    correct: 3,
    explanation: '"For half an hour" indica duração contínua desde o passado. Usamos "have been waiting".'
  },
  {
    rule: "O Present Perfect Continuous é usado para algo que começou no passado e continua no presente.",
    question: "He ___ in this city since 2018.",
    options: ["has been living", "lived", "lives", "is living"],
    correct: 0,
    explanation: '"Since 2018" indica o ponto de início de uma situação que continua até agora. Usamos "has been living".'
  },
  {
    rule: "O Present Perfect Continuous é usado para algo que começou no passado e continua no presente.",
    question: "They ___ on this project for months.",
    options: ["worked", "work", "are working", "have been working"],
    correct: 3,
    explanation: '"For months" indica duração contínua desde o passado até agora. Usamos "have been working".'
  },
  {
    rule: "O Present Perfect Continuous é usado para algo que começou no passado e continua no presente.",
    question: "I ___ this book for two weeks and I'm still not done.",
    options: ["read", "have been reading", "reads", "am reading"],
    correct: 1,
    explanation: '"For two weeks" indica duração contínua. A leitura começou no passado e ainda continua. Usamos "have been reading".'
  },
  {
    rule: "O Present Perfect Continuous é usado para algo que começou no passado e continua no presente.",
    question: "She ___ piano since she was six years old.",
    options: ["has been playing", "played", "plays", "is playing"],
    correct: 0,
    explanation: '"Since she was six" indica o ponto de início de uma atividade que continua até hoje. Usamos "has been playing".'
  },
  {
    rule: "O Present Perfect Continuous é usado para algo que começou no passado e continua no presente.",
    question: "He ___ about changing careers for a while.",
    options: ["thought", "thinks", "is thinking", "has been thinking"],
    correct: 3,
    explanation: '"For a while" indica que o pensamento começou no passado e continua até agora. Usamos "has been thinking".'
  },
  {
    rule: "O Present Perfect Continuous é usado para algo que começou no passado e continua no presente.",
    question: "We ___ Spanish together since January.",
    options: ["learned", "learn", "have been learning", "are learning"],
    correct: 2,
    explanation: '"Since January" indica o ponto de início de uma atividade que continua até agora. Usamos "have been learning".'
  },
  {
    rule: "O Present Perfect Continuous é usado para algo que começou no passado e continua no presente.",
    question: "She ___ a lot lately. Is she okay?",
    options: ["has been crying", "cried", "cries", "is crying"],
    correct: 0,
    explanation: '"Lately" indica que a ação vem acontecendo continuamente até o presente. Usamos "has been crying".'
  },
  {
    rule: "O Present Perfect Continuous é usado para algo que começou no passado e continua no presente.",
    question: "They ___ in that apartment for three years.",
    options: ["lived", "live", "are living", "have been living"],
    correct: 3,
    explanation: '"For three years" indica duração contínua desde o passado até agora. Usamos "have been living".'
  },
  {
    rule: "O Present Perfect Continuous é usado para algo que começou no passado e continua no presente.",
    question: "I ___ for a new job since last month.",
    options: ["has been looking", "look", "have been looking", "looked"],
    correct: 2,
    explanation: '"Since last month" indica o ponto de início de uma busca que continua até agora. Usamos "have been looking".'
  },
  {
    rule: "O Present Perfect Continuous é usado para algo que começou no passado e continua no presente.",
    question: "He ___ that song all day. I can't take it anymore!",
    options: ["sang", "sings", "is singing", "has been singing"],
    correct: 3,
    explanation: '"All day" indica que a ação começou no passado e ainda continua. Usamos "has been singing".'
  },
  {
    rule: "O Present Perfect Continuous é usado para algo que começou no passado e continua no presente.",
    question: "She ___ her presentation since this morning.",
    options: ["has been preparing", "prepared", "prepares", "is preparing"],
    correct: 0,
    explanation: '"Since this morning" indica o ponto de início de uma atividade que continua até agora. Usamos "has been preparing".'
  },
  {
    rule: "O Present Perfect Continuous é usado para algo que começou no passado e continua no presente.",
    question: "We ___ hard to meet the deadline.",
    options: ["worked", "work", "are working", "have been working"],
    correct: 3,
    explanation: 'A ação de trabalhar duro vem acontecendo continuamente até o presente. Usamos "have been working".'
  },
  {
    rule: "O Present Perfect Continuous é usado para algo que começou no passado e continua no presente.",
    question: "It ___ for hours. The streets are flooded.",
    options: ["has been raining", "rained", "rains", "is raining"],
    correct: 0,
    explanation: 'A chuva começou no passado, continua até agora e o resultado é visível. Usamos "has been raining".'
  },
  {
    rule: "O Present Perfect Continuous é usado para algo que começou no passado e continua no presente.",
    question: "They ___ about the same issue for weeks.",
    options: ["argued", "argue", "have been arguing", "are arguing"],
    correct: 2,
    explanation: '"For weeks" indica duração contínua desde o passado até agora. Usamos "have been arguing".'
  },

  // REGRA SECUNDÁRIA — for e since (21 a 35)
  {
    rule: '"For" indica duração e "since" indica o ponto de início. Ambos são palavras-chave do Present Perfect Continuous.',
    question: "She has been teaching ___ twenty years.",
    options: ["since", "for", "ago", "during"],
    correct: 1,
    explanation: '"Twenty years" é uma duração, então usamos "for". "Since" seria usado com um ponto específico como "since 2004".'
  },
  {
    rule: '"For" indica duração e "since" indica o ponto de início. Ambos são palavras-chave do Present Perfect Continuous.',
    question: "He has been waiting ___ 8 o'clock.",
    options: ["for", "ago", "since", "during"],
    correct: 2,
    explanation: '"8 o\'clock" é um ponto específico no tempo, então usamos "since".'
  },
  {
    rule: '"For" indica duração e "since" indica o ponto de início. Ambos são palavras-chave do Present Perfect Continuous.',
    question: "They have been living here ___ a long time.",
    options: ["since", "during", "ago", "for"],
    correct: 3,
    explanation: '"A long time" é uma duração, então usamos "for".'
  },
  {
    rule: '"For" indica duração e "since" indica o ponto de início. Ambos são palavras-chave do Present Perfect Continuous.',
    question: "I have been feeling tired ___ last week.",
    options: ["for", "since", "ago", "during"],
    correct: 1,
    explanation: '"Last week" é um ponto específico no tempo, então usamos "since".'
  },
  {
    rule: '"For" indica duração e "since" indica o ponto de início. Ambos são palavras-chave do Present Perfect Continuous.',
    question: "She has been working on that report ___ three days.",
    options: ["since", "during", "for", "ago"],
    correct: 2,
    explanation: '"Three days" é uma duração, então usamos "for".'
  },
  {
    rule: '"For" indica duração e "since" indica o ponto de início. Ambos são palavras-chave do Present Perfect Continuous.',
    question: "He has been playing guitar ___ he was a teenager.",
    options: ["for", "since", "ago", "during"],
    correct: 1,
    explanation: '"He was a teenager" é um ponto específico no tempo, então usamos "since".'
  },
  {
    rule: '"For" indica duração e "since" indica o ponto de início. Ambos são palavras-chave do Present Perfect Continuous.',
    question: "We have been waiting ___ two hours.",
    options: ["since", "during", "ago", "for"],
    correct: 3,
    explanation: '"Two hours" é uma duração, então usamos "for".'
  },
  {
    rule: '"For" indica duração e "since" indica o ponto de início. Ambos são palavras-chave do Present Perfect Continuous.',
    question: "They have been arguing ___ this morning.",
    options: ["for", "since", "ago", "during"],
    correct: 1,
    explanation: '"This morning" é um ponto específico no tempo, então usamos "since".'
  },
  {
    rule: '"For" indica duração e "since" indica o ponto de início. Ambos são palavras-chave do Present Perfect Continuous.',
    question: "I have been learning French ___ six months.",
    options: ["since", "during", "for", "ago"],
    correct: 2,
    explanation: '"Six months" é uma duração, então usamos "for".'
  },
  {
    rule: '"For" indica duração e "since" indica o ponto de início. Ambos são palavras-chave do Present Perfect Continuous.',
    question: "She has been feeling unwell ___ yesterday.",
    options: ["for", "since", "ago", "during"],
    correct: 1,
    explanation: '"Yesterday" é um ponto específico no tempo, então usamos "since".'
  },
  {
    rule: '"For" indica duração e "since" indica o ponto de início. Ambos são palavras-chave do Present Perfect Continuous.',
    question: "He has been training for the championship ___ months.",
    options: ["since", "for", "ago", "during"],
    correct: 1,
    explanation: '"Months" é uma duração, então usamos "for".'
  },
  {
    rule: '"For" indica duração e "since" indica o ponto de início. Ambos são palavras-chave do Present Perfect Continuous.',
    question: "We have been friends ___ we were in school.",
    options: ["for", "during", "since", "ago"],
    correct: 2,
    explanation: '"We were in school" é um ponto específico no tempo, então usamos "since".'
  },
  {
    rule: '"For" indica duração e "since" indica o ponto de início. Ambos são palavras-chave do Present Perfect Continuous.',
    question: "They have been renovating the house ___ a year.",
    options: ["since", "during", "ago", "for"],
    correct: 3,
    explanation: '"A year" é uma duração, então usamos "for".'
  },
  {
    rule: '"For" indica duração e "since" indica o ponto de início. Ambos são palavras-chave do Present Perfect Continuous.',
    question: "She has been running ___ 6 a.m.",
    options: ["for", "since", "ago", "during"],
    correct: 1,
    explanation: '"6 a.m." é um ponto específico no tempo, então usamos "since".'
  },
  {
    rule: '"For" indica duração e "since" indica o ponto de início. Ambos são palavras-chave do Present Perfect Continuous.',
    question: "I have been working here ___ five years.",
    options: ["since", "during", "for", "ago"],
    correct: 2,
    explanation: '"Five years" é uma duração, então usamos "for".'
  },

  // REGRA TERCIÁRIA — resultado visível no presente (36 a 50)
  {
    rule: "O Present Perfect Continuous frequentemente explica um resultado visível no presente.",
    question: "His hands are dirty. He ___ the car.",
    options: ["fixed", "fixes", "has been fixing", "is fixing"],
    correct: 2,
    explanation: 'As mãos sujas são o resultado visível de uma ação contínua. Usamos "has been fixing".'
  },
  {
    rule: "O Present Perfect Continuous frequentemente explica um resultado visível no presente.",
    question: "She looks exhausted. She ___ all night.",
    options: ["studied", "studies", "is studying", "has been studying"],
    correct: 3,
    explanation: 'O cansaço é o resultado visível de uma ação contínua durante a noite. Usamos "has been studying".'
  },
  {
    rule: "O Present Perfect Continuous frequentemente explica um resultado visível no presente.",
    question: "The ground is wet. It ___.",
    options: ["has been raining", "rained", "rains", "is raining"],
    correct: 0,
    explanation: 'O chão molhado é o resultado visível de uma chuva contínua. Usamos "has been raining".'
  },
  {
    rule: "O Present Perfect Continuous frequentemente explica um resultado visível no presente.",
    question: "He looks really fit. He ___ out regularly.",
    options: ["worked", "works", "is working", "has been working"],
    correct: 3,
    explanation: 'A boa forma física é o resultado visível de exercícios contínuos. Usamos "has been working".'
  },
  {
    rule: "O Present Perfect Continuous frequentemente explica um resultado visível no presente.",
    question: "Her English is getting better. She ___ hard.",
    options: ["has been practicing", "practiced", "practices", "is practicing"],
    correct: 0,
    explanation: 'A melhora no inglês é o resultado visível de uma prática contínua. Usamos "has been practicing".'
  },
  {
    rule: "O Present Perfect Continuous frequentemente explica um resultado visível no presente.",
    question: "The kitchen smells amazing. She ___.",
    options: ["cooked", "cooks", "is cooking", "has been cooking"],
    correct: 3,
    explanation: 'O cheiro na cozinha é o resultado visível de uma ação contínua. Usamos "has been cooking".'
  },
  {
    rule: "O Present Perfect Continuous frequentemente explica um resultado visível no presente.",
    question: "His eyes are tired. He ___ at the screen all day.",
    options: ["has been staring", "stared", "stares", "is staring"],
    correct: 0,
    explanation: 'O cansaço nos olhos é o resultado visível de uma ação contínua. Usamos "has been staring".'
  },
  {
    rule: "O Present Perfect Continuous frequentemente explica um resultado visível no presente.",
    question: "The kids are covered in paint. They ___.",
    options: ["painted", "paint", "are painting", "have been painting"],
    correct: 3,
    explanation: 'A tinta nas crianças é o resultado visível de uma atividade contínua. Usamos "have been painting".'
  },
  {
    rule: "O Present Perfect Continuous frequentemente explica um resultado visível no presente.",
    question: "She's out of breath. She ___.",
    options: ["has been running", "ran", "runs", "is running"],
    correct: 0,
    explanation: 'A falta de ar é o resultado visível de uma ação contínua. Usamos "has been running".'
  },
  {
    rule: "O Present Perfect Continuous frequentemente explica um resultado visível no presente.",
    question: "The dog is muddy. It ___ in the garden.",
    options: ["played", "plays", "is playing", "has been playing"],
    correct: 3,
    explanation: 'A lama no cachorro é o resultado visível de uma atividade contínua. Usamos "has been playing".'
  },
  {
    rule: "O Present Perfect Continuous frequentemente explica um resultado visível no presente.",
    question: "His voice is hoarse. He ___ too much.",
    options: ["has been talking", "talked", "talks", "is talking"],
    correct: 0,
    explanation: 'A rouquidão é o resultado visível de uma ação contínua. Usamos "has been talking".'
  },
  {
    rule: "O Present Perfect Continuous frequentemente explica um resultado visível no presente.",
    question: "The floor is spotless. She ___.",
    options: ["cleaned", "cleans", "is cleaning", "has been cleaning"],
    correct: 3,
    explanation: 'O piso limpo é o resultado visível de uma atividade contínua. Usamos "has been cleaning".'
  },
  {
    rule: "O Present Perfect Continuous frequentemente explica um resultado visível no presente.",
    question: "He smells like smoke. He ___.",
    options: ["has been smoking", "smoked", "smokes", "is smoking"],
    correct: 0,
    explanation: 'O cheiro de fumaça é o resultado visível de uma ação contínua. Usamos "has been smoking".'
  },
  {
    rule: "O Present Perfect Continuous frequentemente explica um resultado visível no presente.",
    question: "She's soaking wet. It ___.",
    options: ["rained", "rains", "is raining", "has been raining"],
    correct: 3,
    explanation: 'O fato de estar encharcada é o resultado visível de uma chuva contínua. Usamos "has been raining".'
  },
  {
    rule: "O Present Perfect Continuous frequentemente explica um resultado visível no presente.",
    question: "The baby is finally asleep. She ___ him for an hour.",
    options: ["rocked", "rocks", "is rocking", "has been rocking"],
    correct: 3,
    explanation: 'O bebê dormindo é o resultado visível de uma ação contínua. Usamos "has been rocking".'
  }

];

// ============================================================
// BANCO DE QUESTÕES — SIMPLE PRESENT (50 questões)
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
  }

];
// ============================================================
// CONFIGURAÇÃO DOS MÓDULOS
// ============================================================

const modules = [
  {
    id: 'simplePast',
    title: 'Simple Past',
    questions: simplePastQuestions
  },
  {
    id: 'presentPerfect',
    title: 'Present Perfect',
    questions: presentPerfectQuestions
  },
  {
    id: 'presentPerfectContinuous',
    title: 'Present Perfect Continuous',
    questions: presentPerfectContinuousQuestions
  },
  {
    id: 'simplePresent',
    title: 'Simple Present',
    questions: simplePresentQuestions
  }
];

// ============================================================
// ESTADO DO QUIZ
// ============================================================

let currentModule = null;
let currentQuestions = [];
let currentQuestionIndex = 0;
let score = 0;
let answers = [];

// ============================================================
// SORTEIO ALEATÓRIO DE QUESTÕES
// ============================================================

function shuffleArray(array) {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

function getRandomQuestions(questions, count = 5) {
  const shuffled = shuffleArray(questions);
  return shuffled.slice(0, count);
}

// ============================================================
// INICIAR MÓDULO
// ============================================================

function startModule(moduleId) {
  const module = modules.find(m => m.id === moduleId);
  if (!module) return;

  currentModule = module;
  currentQuestions = getRandomQuestions(module.questions, 5);
  currentQuestionIndex = 0;
  score = 0;
  answers = [];

  showScreen('quiz-screen');
  renderQuestion();
}

// ============================================================
// RENDERIZAR QUESTÃO
// ============================================================

function renderQuestion() {
  const question = currentQuestions[currentQuestionIndex];
  const total = currentQuestions.length;
  const current = currentQuestionIndex + 1;

  document.getElementById('quiz-module-title').textContent = currentModule.title;
  document.getElementById('quiz-progress').textContent = `Questão ${current} de ${total}`;
  document.getElementById('quiz-rule').textContent = question.rule;
  document.getElementById('quiz-question').textContent = question.question;

  const optionsContainer = document.getElementById('quiz-options');
  optionsContainer.innerHTML = '';

  const letters = ['a', 'b', 'c', 'd'];

  question.options.forEach((option, index) => {
    const button = document.createElement('button');
    button.classList.add('option-btn');
    button.textContent = `${letters[index]}) ${option}`;
    button.addEventListener('click', () => selectAnswer(index, button));
    optionsContainer.appendChild(button);
  });

  document.getElementById('quiz-feedback').textContent = '';
  document.getElementById('quiz-feedback').className = 'feedback';
  document.getElementById('next-btn').style.display = 'none';
}

// ============================================================
// SELECIONAR RESPOSTA
// ============================================================

function selectAnswer(selectedIndex, selectedButton) {
  const question = currentQuestions[currentQuestionIndex];
  const isCorrect = selectedIndex === question.correct;

  const allButtons = document.querySelectorAll('.option-btn');
  allButtons.forEach(btn => btn.disabled = true);

  const feedbackEl = document.getElementById('quiz-feedback');

  if (isCorrect) {
    selectedButton.classList.add('correct');
    feedbackEl.textContent = `✓ Correto! ${question.explanation}`;
    feedbackEl.className = 'feedback correct';
    score++;
  } else {
    selectedButton.classList.add('incorrect');
    allButtons[question.correct].classList.add('correct');
    feedbackEl.textContent = `✗ Incorreto. ${question.explanation}`;
    feedbackEl.className = 'feedback incorrect';
  }

  answers.push({
    question: question.question,
    selected: selectedIndex,
    correct: question.correct,
    isCorrect
  });

  document.getElementById('next-btn').style.display = 'block';
}

// ============================================================
// PRÓXIMA QUESTÃO
// ============================================================

function nextQuestion() {
  currentQuestionIndex++;

  if (currentQuestionIndex >= currentQuestions.length) {
    showResult();
  } else {
    renderQuestion();
  }
}

// ============================================================
// MOSTRAR RESULTADO
// ============================================================

function showResult() {
  showScreen('result-screen');

  const total = currentQuestions.length;
  const percentage = Math.round((score / total) * 100);

  document.getElementById('result-module-title').textContent = currentModule.title;
  document.getElementById('result-score').textContent = `Você acertou ${score} de ${total} questões (${percentage}%)`;

  let message = '';
  if (percentage === 100) {
    message = 'Perfeito! Você dominou este módulo!';
  } else if (percentage >= 80) {
    message = 'Muito bem! Continue praticando!';
  } else if (percentage >= 60) {
    message = 'Bom trabalho! Revise as questões que errou e tente novamente.';
  } else {
    message = 'Continue estudando! Você vai melhorar com a prática.';
  }

  document.getElementById('result-message').textContent = message;

  saveStudentResult(score, total, percentage);
}

// ============================================================
// SALVAR RESULTADO DO ALUNO
// ============================================================

function saveStudentResult(score, total, percentage) {
  if (!currentUser || currentUser.role !== 'student') return;

  const results = JSON.parse(localStorage.getItem('results')) || [];

  results.push({
    studentId: currentUser.id,
    studentName: currentUser.name,
    module: currentModule.title,
    score,
    total,
    percentage,
    date: new Date().toLocaleDateString('pt-BR')
  });

  localStorage.setItem('results', JSON.stringify(results));
}

// ============================================================
// PAINEL DO PROFESSOR — VER RESULTADOS
// ============================================================

function renderResults() {
  const results = JSON.parse(localStorage.getItem('results')) || [];
  const container = document.getElementById('results-list');

  if (results.length === 0) {
    container.innerHTML = '<p>Nenhum resultado registrado ainda.</p>';
    return;
  }

  const grouped = {};
  results.forEach(r => {
    if (!grouped[r.studentName]) grouped[r.studentName] = [];
    grouped[r.studentName].push(r);
  });

  container.innerHTML = Object.entries(grouped).map(([name, studentResults]) => `
    <div class="student-results">
      <h3>${name}</h3>
      ${studentResults.map(r => `
        <div class="result-item">
          <span>${r.date}</span>
          <span>${r.module}</span>
          <span>${r.score}/${r.total} (${r.percentage}%)</span>
        </div>
      `).join('')}
    </div>
  `).join('');
}

// ============================================================
// EVENTOS DOS BOTÕES
// ============================================================

document.addEventListener('DOMContentLoaded', function () {

  // Login
  const loginBtn = document.getElementById('login-btn');
  if (loginBtn) {
    loginBtn.addEventListener('click', handleLogin);
  }

  // Adicionar aluno
  const addStudentBtn = document.getElementById('add-student-btn');
  if (addStudentBtn) {
    addStudentBtn.addEventListener('click', addStudent);
  }

  // Próxima questão
  const nextBtn = document.getElementById('next-btn');
  if (nextBtn) {
    nextBtn.addEventListener('click', nextQuestion);
  }

  // Tentar novamente
  const retryBtn = document.getElementById('retry-btn');
  if (retryBtn) {
    retryBtn.addEventListener('click', () => startModule(currentModule.id));
  }

  // Voltar ao painel do aluno
  const backBtn = document.getElementById('back-btn');
  if (backBtn) {
    backBtn.addEventListener('click', showStudentPanel);
  }

  // Logout professor
  const logoutTeacherBtn = document.getElementById('logout-teacher-btn');
  if (logoutTeacherBtn) {
    logoutTeacherBtn.addEventListener('click', logout);
  }

  // Logout aluno
  const logoutStudentBtn = document.getElementById('logout-student-btn');
  if (logoutStudentBtn) {
    logoutStudentBtn.addEventListener('click', logout);
  }

  // Ver resultados (professor)
  const viewResultsBtn = document.getElementById('view-results-btn');
  if (viewResultsBtn) {
    viewResultsBtn.addEventListener('click', () => {
      renderResults();
      showScreen('results-screen');
    });
  }

  // Voltar ao painel do professor
  const backTeacherBtn = document.getElementById('back-teacher-btn');
  if (backTeacherBtn) {
    backTeacherBtn.addEventListener('click', showTeacherPanel);
  }

  // Botões dos módulos
  modules.forEach(module => {
    const btn = document.getElementById(`btn-${module.id}`);
    if (btn) {
      btn.addEventListener('click', () => startModule(module.id));
    }
  });

  // Verificar sessão ativa
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
