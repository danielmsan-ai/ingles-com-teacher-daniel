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
  console.log('Botão de login clicado!'); // Adicione esta linha
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
  },
  // NEGATIVA DO SIMPLE PAST — did not / didn't (51 a 100)
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
      // INTERROGATIVA DO SIMPLE PAST — did (101 a 150)
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
    question: "___ the roads dangerous during the storm?",
    options: ["Did the roads be dangerous", "Was the roads dangerous", "Were the roads dangerous", "Does the roads be dangerous"],
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
    question: "___ the food at the event good?",
    options: ["Did the food be good", "Were the food good", "Was the food good", "Does the food be good"],
    correct: 2,
    explanation: '"The food" equivale a "it", então usamos "Was".'
  },
  {
    rule: "Na interrogativa do Simple Past do verbo To Be usamos 'Was' (I, he, she, it) ou 'Were' (you, we, they) + sujeito.",
    question: "___ they satisfied with the service?",
    options: ["Did they be satisfied", "Was they satisfied", "Were they satisfied", "Does they be satisfied"],
    correct: 2,
    explanation: '"They" usa "Were" na interrogativa do Simple Past do To Be.'
  },
  {
    rule: "Na interrogativa do Simple Past do verbo To Be usamos 'Was' (I, he, she, it) ou 'Were' (you, we, they) + sujeito.",
    question: "___ he aware of the problem?",
    options: ["Did he be aware", "Were he aware", "Was he aware", "Does he be aware"],
    correct: 2,
    explanation: '"He" usa "Was" na interrogativa do Simple Past do To Be.'
  },
  {
    rule: "Na interrogativa do Simple Past do verbo To Be usamos 'Was' (I, he, she, it) ou 'Were' (you, we, they) + sujeito.",
    question: "___ you comfortable in the new apartment?",
    options: ["Did you be comfortable", "Was you comfortable", "Were you comfortable", "Does you be comfortable"],
    correct: 2,
    explanation: '"You" usa "Were" na interrogativa do Simple Past do To Be.'
  },
  {
    rule: "Na interrogativa do Simple Past do verbo To Be usamos 'Was' (I, he, she, it) ou 'Were' (you, we, they) + sujeito.",
    question: "___ the concert as good as you expected?",
    options: ["Did the concert be good", "Were the concert good", "Was the concert good", "Does the concert be good"],
    correct: 2,
    explanation: '"The concert" equivale a "it", então usamos "Was".'
  },
  {
    rule: "Na interrogativa do Simple Past do verbo To Be usamos 'Was' (I, he, she, it) ou 'Were' (you, we, they) + sujeito.",
    question: "___ we right to make that decision?",
    options: ["Did we be right", "Was we right", "Were we right", "Does we be right"],
    correct: 2,
    explanation: '"We" usa "Were" na interrogativa do Simple Past do To Be.'
  },
  {
    rule: "Na interrogativa do Simple Past do verbo To Be usamos 'Was' (I, he, she, it) ou 'Were' (you, we, they) + sujeito.",
    question: "___ she tired after the long trip?",
    options: ["Did she be tired", "Were she tired", "Was she tired", "Does she be tired"],
    correct: 2,
    explanation: '"She" usa "Was" na interrogativa do Simple Past do To Be.'
  },
  {
    rule: "Na interrogativa do Simple Past do verbo To Be usamos 'Was' (I, he, she, it) ou 'Were' (you, we, they) + sujeito.",
    question: "___ the children excited about the trip?",
    options: ["Did the children be excited", "Was the children excited", "Were the children excited", "Does the children be excited"],
    correct: 2,
    explanation: '"The children" é plural, então usamos "Were".'
  },
  {
    rule: "Na interrogativa do Simple Past do verbo To Be usamos 'Was' (I, he, she, it) ou 'Were' (you, we, they) + sujeito.",
    question: "___ it cold enough to snow last winter?",
    options: ["Did it be cold", "Were it cold", "Was it cold", "Does it be cold"],
    correct: 2,
    explanation: '"It" usa "Was" na interrogativa do Simple Past do To Be.'
  },
  {
    rule: "Na interrogativa do Simple Past do verbo To Be usamos 'Was' (I, he, she, it) ou 'Were' (you, we, they) + sujeito.",
    question: "___ they ready for the challenge?",
    options: ["Did they be ready", "Was they ready", "Were they ready", "Does they be ready"],
    correct: 2,
    explanation: '"They" usa "Were" na interrogativa do Simple Past do To Be.'
  },
  {
    rule: "Na interrogativa do Simple Past do verbo To Be usamos 'Was' (I, he, she, it) ou 'Were' (you, we, they) + sujeito.",
    question: "___ he the best player on the team?",
    options: ["Did he be the best", "Were he the best", "Was he the best", "Does he be the best"],
    correct: 2,
    explanation: '"He" usa "Was" na interrogativa do Simple Past do To Be.'
  },
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
  },
  // NEGATIVA DO PRESENT PERFECT — haven't / hasn't (51 a 100)
  {
    rule: "Na negativa do Present Perfect usamos 'haven't' (I, you, we, they) ou 'hasn't' (he, she, it) + particípio passado.",
    question: "She ___ her homework yet.",
    options: ["hasn't finished", "didn't finished", "hasn't finish", "don't finished"],
    correct: 0,
    explanation: '"She" usa "hasn\'t" + particípio. O correto é "hasn\'t finished". "Yet" confirma o uso do Present Perfect.'
  },
  {
    rule: "Na negativa do Present Perfect usamos 'haven't' (I, you, we, they) ou 'hasn't' (he, she, it) + particípio passado.",
    question: "They ___ to Europe before.",
    options: ["hasn't been", "didn't been", "haven't been", "don't been"],
    correct: 2,
    explanation: '"They" usa "haven\'t" + particípio. O correto é "haven\'t been".'
  },
  {
    rule: "Na negativa do Present Perfect usamos 'haven't' (I, you, we, they) ou 'hasn't' (he, she, it) + particípio passado.",
    question: "He ___ his keys anywhere.",
    options: ["haven't found", "didn't found", "hasn't find", "hasn't found"],
    correct: 3,
    explanation: '"He" usa "hasn\'t" + particípio. O correto é "hasn\'t found".'
  },
  {
    rule: "Na negativa do Present Perfect usamos 'haven't' (I, you, we, they) ou 'hasn't' (he, she, it) + particípio passado.",
    question: "I ___ that movie yet.",
    options: ["hasn't seen", "didn't seen", "haven't saw", "haven't seen"],
    correct: 3,
    explanation: '"I" usa "haven\'t" + particípio. O correto é "haven\'t seen". "Yet" confirma o Present Perfect.'
  },
  {
    rule: "Na negativa do Present Perfect usamos 'haven't' (I, you, we, they) ou 'hasn't' (he, she, it) + particípio passado.",
    question: "We ___ our decision yet.",
    options: ["hasn't made", "didn't made", "haven't made", "don't made"],
    correct: 2,
    explanation: '"We" usa "haven\'t" + particípio. O correto é "haven\'t made".'
  },
  {
    rule: "Na negativa do Present Perfect usamos 'haven't' (I, you, we, they) ou 'hasn't' (he, she, it) + particípio passado.",
    question: "She ___ to him since last week.",
    options: ["haven't spoken", "didn't spoken", "hasn't spoke", "hasn't spoken"],
    correct: 3,
    explanation: '"She" usa "hasn\'t" + particípio. O correto é "hasn\'t spoken". "Since" confirma o Present Perfect.'
  },
  {
    rule: "Na negativa do Present Perfect usamos 'haven't' (I, you, we, they) ou 'hasn't' (he, she, it) + particípio passado.",
    question: "They ___ the report yet.",
    options: ["hasn't submitted", "didn't submitted", "haven't submitted", "don't submitted"],
    correct: 2,
    explanation: '"They" usa "haven\'t" + particípio. O correto é "haven\'t submitted".'
  },
  {
    rule: "Na negativa do Present Perfect usamos 'haven't' (I, you, we, they) ou 'hasn't' (he, she, it) + particípio passado.",
    question: "He ___ lunch yet. He's still hungry.",
    options: ["haven't had", "didn't had", "hasn't have", "hasn't had"],
    correct: 3,
    explanation: '"He" usa "hasn\'t" + particípio. O correto é "hasn\'t had".'
  },
  {
    rule: "Na negativa do Present Perfect usamos 'haven't' (I, you, we, they) ou 'hasn't' (he, she, it) + particípio passado.",
    question: "I ___ my brother in two years.",
    options: ["hasn't seen", "didn't seen", "haven't saw", "haven't seen"],
    correct: 3,
    explanation: '"I" usa "haven\'t" + particípio. O correto é "haven\'t seen".'
  },
  {
    rule: "Na negativa do Present Perfect usamos 'haven't' (I, you, we, they) ou 'hasn't' (he, she, it) + particípio passado.",
    question: "We ___ from the client yet.",
    options: ["hasn't heard", "didn't heard", "haven't heard", "don't heard"],
    correct: 2,
    explanation: '"We" usa "haven\'t" + particípio. O correto é "haven\'t heard".'
  },
  {
    rule: "Na negativa do Present Perfect usamos 'haven't' (I, you, we, they) ou 'hasn't' (he, she, it) + particípio passado.",
    question: "She ___ her new apartment yet.",
    options: ["haven't decorated", "didn't decorated", "hasn't decorate", "hasn't decorated"],
    correct: 3,
    explanation: '"She" usa "hasn\'t" + particípio. O correto é "hasn\'t decorated".'
  },
  {
    rule: "Na negativa do Present Perfect usamos 'haven't' (I, you, we, they) ou 'hasn't' (he, she, it) + particípio passado.",
    question: "They ___ the problem yet.",
    options: ["hasn't solved", "didn't solved", "haven't solved", "don't solved"],
    correct: 2,
    explanation: '"They" usa "haven\'t" + particípio. O correto é "haven\'t solved".'
  },
  {
    rule: "Na negativa do Present Perfect usamos 'haven't' (I, you, we, they) ou 'hasn't' (he, she, it) + particípio passado.",
    question: "He ___ his old friends in years.",
    options: ["haven't visited", "didn't visited", "hasn't visit", "hasn't visited"],
    correct: 3,
    explanation: '"He" usa "hasn\'t" + particípio. O correto é "hasn\'t visited".'
  },
  {
    rule: "Na negativa do Present Perfect usamos 'haven't' (I, you, we, they) ou 'hasn't' (he, she, it) + particípio passado.",
    question: "I ___ the book you recommended.",
    options: ["hasn't read", "didn't read", "haven't read", "don't read"],
    correct: 2,
    explanation: '"I" usa "haven\'t" + particípio. O correto é "haven\'t read".'
  },
  {
    rule: "Na negativa do Present Perfect usamos 'haven't' (I, you, we, they) ou 'hasn't' (he, she, it) + particípio passado.",
    question: "We ___ a vacation in three years.",
    options: ["hasn't taken", "didn't taken", "haven't took", "haven't taken"],
    correct: 3,
    explanation: '"We" usa "haven\'t" + particípio. O correto é "haven\'t taken".'
  },
  {
    rule: "Na negativa do Present Perfect usamos 'haven't' (I, you, we, they) ou 'hasn't' (he, she, it) + particípio passado.",
    question: "She ___ her passport yet.",
    options: ["haven't renewed", "didn't renewed", "hasn't renew", "hasn't renewed"],
    correct: 3,
    explanation: '"She" usa "hasn\'t" + particípio. O correto é "hasn\'t renewed".'
  },
  {
    rule: "Na negativa do Present Perfect usamos 'haven't' (I, you, we, they) ou 'hasn't' (he, she, it) + particípio passado.",
    question: "They ___ their new house yet.",
    options: ["hasn't moved into", "didn't moved into", "haven't moved into", "don't moved into"],
    correct: 2,
    explanation: '"They" usa "haven\'t" + particípio. O correto é "haven\'t moved into".'
  },
  {
    rule: "Na negativa do Present Perfect usamos 'haven't' (I, you, we, they) ou 'hasn't' (he, she, it) + particípio passado.",
    question: "He ___ his salary raise yet.",
    options: ["haven't received", "didn't received", "hasn't receive", "hasn't received"],
    correct: 3,
    explanation: '"He" usa "hasn\'t" + particípio. O correto é "hasn\'t received".'
  },
  {
    rule: "Na negativa do Present Perfect usamos 'haven't' (I, you, we, they) ou 'hasn't' (he, she, it) + particípio passado.",
    question: "I ___ sushi before. I'm nervous to try it.",
    options: ["hasn't tried", "didn't tried", "haven't tried", "don't tried"],
    correct: 2,
    explanation: '"I" usa "haven\'t" + particípio. O correto é "haven\'t tried".'
  },
  {
    rule: "Na negativa do Present Perfect usamos 'haven't' (I, you, we, they) ou 'hasn't' (he, she, it) + particípio passado.",
    question: "We ___ anything about the new policy yet.",
    options: ["hasn't decided", "didn't decided", "haven't decided", "don't decided"],
    correct: 2,
    explanation: '"We" usa "haven\'t" + particípio. O correto é "haven\'t decided".'
  },
  {
    rule: "Na negativa do Present Perfect usamos 'haven't' (I, you, we, they) ou 'hasn't' (he, she, it) + particípio passado.",
    question: "She ___ her driving test yet.",
    options: ["haven't passed", "didn't passed", "hasn't pass", "hasn't passed"],
    correct: 3,
    explanation: '"She" usa "hasn\'t" + particípio. O correto é "hasn\'t passed".'
  },
  {
    rule: "Na negativa do Present Perfect usamos 'haven't' (I, you, we, they) ou 'hasn't' (he, she, it) + particípio passado.",
    question: "They ___ a answer from the company yet.",
    options: ["hasn't gotten", "didn't gotten", "haven't gotten", "don't gotten"],
    correct: 2,
    explanation: '"They" usa "haven\'t" + particípio. O correto é "haven\'t gotten".'
  },
  {
    rule: "Na negativa do Present Perfect usamos 'haven't' (I, you, we, they) ou 'hasn't' (he, she, it) + particípio passado.",
    question: "He ___ his room yet. It's still a mess.",
    options: ["haven't cleaned", "didn't cleaned", "hasn't clean", "hasn't cleaned"],
    correct: 3,
    explanation: '"He" usa "hasn\'t" + particípio. O correto é "hasn\'t cleaned".'
  },
  {
    rule: "Na negativa do Present Perfect usamos 'haven't' (I, you, we, they) ou 'hasn't' (he, she, it) + particípio passado.",
    question: "I ___ to my doctor about this issue.",
    options: ["hasn't talked", "didn't talked", "haven't talked", "don't talked"],
    correct: 2,
    explanation: '"I" usa "haven\'t" + particípio. O correto é "haven\'t talked".'
  },
  {
    rule: "Na negativa do Present Perfect usamos 'haven't' (I, you, we, they) ou 'hasn't' (he, she, it) + particípio passado.",
    question: "We ___ our flight tickets yet.",
    options: ["hasn't booked", "didn't booked", "haven't booked", "don't booked"],
    correct: 2,
    explanation: '"We" usa "haven\'t" + particípio. O correto é "haven\'t booked".'
  },
  {
    rule: "Na negativa do Present Perfect usamos 'haven't' (I, you, we, they) ou 'hasn't' (he, she, it) + particípio passado.",
    question: "She ___ her mind about the job offer.",
    options: ["haven't made up", "didn't made up", "hasn't make up", "hasn't made up"],
    correct: 3,
    explanation: '"She" usa "hasn\'t" + particípio. O correto é "hasn\'t made up".'
  },
  {
    rule: "Na negativa do Present Perfect usamos 'haven't' (I, you, we, they) ou 'hasn't' (he, she, it) + particípio passado.",
    question: "They ___ the new employee yet.",
    options: ["hasn't met", "didn't met", "haven't met", "don't met"],
    correct: 2,
    explanation: '"They" usa "haven\'t" + particípio. O correto é "haven\'t met".'
  },
  {
    rule: "Na negativa do Present Perfect usamos 'haven't' (I, you, we, they) ou 'hasn't' (he, she, it) + particípio passado.",
    question: "He ___ his phone since this morning.",
    options: ["haven't found", "didn't found", "hasn't find", "hasn't found"],
    correct: 3,
    explanation: '"He" usa "hasn\'t" + particípio. O correto é "hasn\'t found". "Since" confirma o Present Perfect.'
  },
  {
    rule: "Na negativa do Present Perfect usamos 'haven't' (I, you, we, they) ou 'hasn't' (he, she, it) + particípio passado.",
    question: "I ___ enough water today. I'm so thirsty.",
    options: ["hasn't drunk", "didn't drunk", "haven't drank", "haven't drunk"],
    correct: 3,
    explanation: '"I" usa "haven\'t" + particípio. O correto é "haven\'t drunk".'
  },
  {
    rule: "Na negativa do Present Perfect usamos 'haven't' (I, you, we, they) ou 'hasn't' (he, she, it) + particípio passado.",
    question: "We ___ to our neighbors since they moved in.",
    options: ["hasn't talked", "didn't talked", "haven't talked
  // INTERROGATIVA DO PRESENT PERFECT — Have / Has (101 a 150)
  {
    rule: "Na interrogativa do Present Perfect usamos 'Have' (I, you, we, they) ou 'Has' (he, she, it) + sujeito + particípio passado.",
    question: "___ she finished her homework yet?",
    options: ["Did she finish", "Has she finished", "Have she finished", "Does she finish"],
    correct: 1,
    explanation: '"She" usa "Has" na interrogativa do Present Perfect. O correto é "Has she finished". "Yet" confirma o uso do Present Perfect.'
  },
  {
    rule: "Na interrogativa do Present Perfect usamos 'Have' (I, you, we, they) ou 'Has' (he, she, it) + sujeito + particípio passado.",
    question: "___ they ever visited Japan?",
    options: ["Did they visit", "Has they visited", "Have they visited", "Do they visit"],
    correct: 2,
    explanation: '"They" usa "Have" na interrogativa do Present Perfect. O correto é "Have they visited". "Ever" confirma o Present Perfect.'
  },
  {
    rule: "Na interrogativa do Present Perfect usamos 'Have' (I, you, we, they) ou 'Has' (he, she, it) + sujeito + particípio passado.",
    question: "___ he called you back yet?",
    options: ["Did he call", "Have he called", "Has he called", "Does he call"],
    correct: 2,
    explanation: '"He" usa "Has" na interrogativa do Present Perfect. O correto é "Has he called".'
  },
  {
    rule: "Na interrogativa do Present Perfect usamos 'Have' (I, you, we, they) ou 'Has' (he, she, it) + sujeito + particípio passado.",
    question: "___ you ever tried sushi?",
    options: ["Did you try", "Has you tried", "Have you tried", "Do you try"],
    correct: 2,
    explanation: '"You" usa "Have" na interrogativa do Present Perfect. O correto é "Have you tried". "Ever" confirma o Present Perfect.'
  },
  {
    rule: "Na interrogativa do Present Perfect usamos 'Have' (I, you, we, they) ou 'Has' (he, she, it) + sujeito + particípio passado.",
    question: "___ we met before?",
    options: ["Did we meet", "Has we met", "Have we met", "Do we meet"],
    correct: 2,
    explanation: '"We" usa "Have" na interrogativa do Present Perfect. O correto é "Have we met".'
  },
  {
    rule: "Na interrogativa do Present Perfect usamos 'Have' (I, you, we, they) ou 'Has' (he, she, it) + sujeito + particípio passado.",
    question: "___ she ever lived abroad?",
    options: ["Did she live", "Have she lived", "Has she lived", "Does she live"],
    correct: 2,
    explanation: '"She" usa "Has" na interrogativa do Present Perfect. O correto é "Has she lived". "Ever" confirma o Present Perfect.'
  },
  {
    rule: "Na interrogativa do Present Perfect usamos 'Have' (I, you, we, they) ou 'Has' (he, she, it) + sujeito + particípio passado.",
    question: "___ they received the package yet?",
    options: ["Did they receive", "Has they received", "Have they received", "Do they receive"],
    correct: 2,
    explanation: '"They" usa "Have" na interrogativa do Present Perfect. O correto é "Have they received". "Yet" confirma o Present Perfect.'
  },
  {
    rule: "Na interrogativa do Present Perfect usamos 'Have' (I, you, we, they) ou 'Has' (he, she, it) + sujeito + particípio passado.",
    question: "___ he ever won a competition?",
    options: ["Did he win", "Have he won", "Has he won", "Does he win"],
    correct: 2,
    explanation: '"He" usa "Has" na interrogativa do Present Perfect. O correto é "Has he won". "Ever" confirma o Present Perfect.'
  },
  {
    rule: "Na interrogativa do Present Perfect usamos 'Have' (I, you, we, they) ou 'Has' (he, she, it) + sujeito + particípio passado.",
    question: "___ you seen this movie before?",
    options: ["Did you see", "Has you seen", "Have you seen", "Do you see"],
    correct: 2,
    explanation: '"You" usa "Have" na interrogativa do Present Perfect. O correto é "Have you seen".'
  },
  {
    rule: "Na interrogativa do Present Perfect usamos 'Have' (I, you, we, they) ou 'Has' (he, she, it) + sujeito + particípio passado.",
    question: "___ she spoken to her boss yet?",
    options: ["Did she speak", "Have she spoken", "Has she spoken", "Does she speak"],
    correct: 2,
    explanation: '"She" usa "Has" na interrogativa do Present Perfect. O correto é "Has she spoken". "Yet" confirma o Present Perfect.'
  },
  {
    rule: "Na interrogativa do Present Perfect usamos 'Have' (I, you, we, they) ou 'Has' (he, she, it) + sujeito + particípio passado.",
    question: "___ we finished all the tasks?",
    options: ["Did we finish", "Has we finished", "Have we finished", "Do we finish"],
    correct: 2,
    explanation: '"We" usa "Have" na interrogativa do Present Perfect. O correto é "Have we finished".'
  },
  {
    rule: "Na interrogativa do Present Perfect usamos 'Have' (I, you, we, they) ou 'Has' (he, she, it) + sujeito + particípio passado.",
    question: "___ they ever eaten at that restaurant?",
    options: ["Did they eat", "Has they eaten", "Have they eaten", "Do they eat"],
    correct: 2,
    explanation: '"They" usa "Have" na interrogativa do Present Perfect. O correto é "Have they eaten". "Ever" confirma o Present Perfect.'
  },
  {
    rule: "Na interrogativa do Present Perfect usamos 'Have' (I, you, we, they) ou 'Has' (he, she, it) + sujeito + particípio passado.",
    question: "___ he read the report yet?",
    options: ["Did he read", "Have he read", "Has he read", "Does he read"],
    correct: 2,
    explanation: '"He" usa "Has" na interrogativa do Present Perfect. O correto é "Has he read". "Yet" confirma o Present Perfect.'
  },
  {
    rule: "Na interrogativa do Present Perfect usamos 'Have' (I, you, we, they) ou 'Has' (he, she, it) + sujeito + particípio passado.",
    question: "___ you ever met a famous person?",
    options: ["Did you meet", "Has you met", "Have you met", "Do you meet"],
    correct: 2,
    explanation: '"You" usa "Have" na interrogativa do Present Perfect. O correto é "Have you met". "Ever" confirma o Present Perfect.'
  },
  {
    rule: "Na interrogativa do Present Perfect usamos 'Have' (I, you, we, they) ou 'Has' (he, she, it) + sujeito + particípio passado.",
    question: "___ she booked the hotel yet?",
    options: ["Did she book", "Have she booked", "Has she booked", "Does she book"],
    correct: 2,
    explanation: '"She" usa "Has" na interrogativa do Present Perfect. O correto é "Has she booked". "Yet" confirma o Present Perfect.'
  },
  {
    rule: "Na interrogativa do Present Perfect usamos 'Have' (I, you, we, they) ou 'Has' (he, she, it) + sujeito + particípio passado.",
    question: "___ they made a final decision yet?",
    options: ["Did they make", "Has they made", "Have they made", "Do they make"],
    correct: 2,
    explanation: '"They" usa "Have" na interrogativa do Present Perfect. O correto é "Have they made". "Yet" confirma o Present Perfect.'
  },
  {
    rule: "Na interrogativa do Present Perfect usamos 'Have' (I, you, we, they) ou 'Has' (he, she, it) + sujeito + particípio passado.",
    question: "___ he ever traveled to South America?",
    options: ["Did he travel", "Have he traveled", "Has he traveled", "Does he travel"],
    correct: 2,
    explanation: '"He" usa "Has" na interrogativa do Present Perfect. O correto é "Has he traveled". "Ever" confirma o Present Perfect.'
  },
  {
    rule: "Na interrogativa do Present Perfect usamos 'Have' (I, you, we, they) ou 'Has' (he, she, it) + sujeito + particípio passado.",
    question: "___ you heard the latest news?",
    options: ["Did you hear", "Has you heard", "Have you heard", "Do you hear"],
    correct: 2,
    explanation: '"You" usa "Have" na interrogativa do Present Perfect. O correto é "Have you heard".'
  },
  {
    rule: "Na interrogativa do Present Perfect usamos 'Have' (I, you, we, they) ou 'Has' (he, she, it) + sujeito + particípio passado.",
    question: "___ she ever skydived?",
    options: ["Did she skydive", "Have she skydived", "Has she skydived", "Does she skydive"],
    correct: 2,
    explanation: '"She" usa "Has" na interrogativa do Present Perfect. O correto é "Has she skydived". "Ever" confirma o Present Perfect.'
  },
  {
    rule: "Na interrogativa do Present Perfect usamos 'Have' (I, you, we, they) ou 'Has' (he, she, it) + sujeito + particípio passado.",
    question: "___ we submitted the application yet?",
    options: ["Did we submit", "Has we submitted", "Have we submitted", "Do we submit"],
    correct: 2,
    explanation: '"We" usa "Have" na interrogativa do Present Perfect. O correto é "Have we submitted". "Yet" confirma o Present Perfect.'
  },
  {
    rule: "Na interrogativa do Present Perfect usamos 'Have' (I, you, we, they) ou 'Has' (he, she, it) + sujeito + particípio passado.",
    question: "___ they signed the contract yet?",
    options: ["Did they sign", "Has they signed", "Have they signed", "Do they sign"],
    correct: 2,
    explanation: '"They" usa "Have" na interrogativa do Present Perfect. O correto é "Have they signed". "Yet" confirma o Present Perfect.'
  },
  {
    rule: "Na interrogativa do Present Perfect usamos 'Have' (I, you, we, they) ou 'Has' (he, she, it) + sujeito + particípio passado.",
    question: "___ he lost weight recently?",
    options: ["Did he lose", "Have he lost", "Has he lost", "Does he lose"],
    correct: 2,
    explanation: '"He" usa "Has" na interrogativa do Present Perfect. O correto é "Has he lost". "Recently" confirma o Present Perfect.'
  },
  {
    rule: "Na interrogativa do Present Perfect usamos 'Have' (I, you, we, they) ou 'Has' (he, she, it) + sujeito + particípio passado.",
    question: "___ you ever been to Australia?",
    options: ["Did you go", "Has you been", "Have you been", "Do you go"],
    correct: 2,
    explanation: '"You" usa "Have" na interrogativa do Present Perfect. O correto é "Have you been". "Ever" confirma o Present Perfect.'
  },
  {
    rule: "Na interrogativa do Present Perfect usamos 'Have' (I, you, we, they) ou 'Has' (he, she, it) + sujeito + particípio passado.",
    question: "___ she found a new job yet?",
    options: ["Did she find", "Have she found", "Has she found", "Does she find"],
    correct: 2,
    explanation: '"She" usa "Has" na interrogativa do Present Perfect. O correto é "Has she found". "Yet" confirma o Present Perfect.'
  },
  {
    rule: "Na interrogativa do Present Perfect usamos 'Have' (I, you, we, they) ou 'Has' (he, she, it) + sujeito + particípio passado.",
    question: "___ they ever seen the Northern Lights?",
    options: ["Did they see", "Has they seen", "Have they seen", "Do they see"],
    correct: 2,
    explanation: '"They" usa "Have" na interrogativa do Present Perfect. O correto é "Have they seen". "Ever" confirma o Present Perfect.'
  },
  {
    rule: "Na interrogativa do Present Perfect usamos 'Have' (I, you, we, they) ou 'Has' (he, she, it) + sujeito + particípio passado.",
    question: "___ he spoken to the doctor yet?",
    options: ["Did he speak", "Have he spoken", "Has he spoken", "Does he speak"],
    correct: 2,
    explanation: '"He" usa "Has" na interrogativa do Present Perfect. O correto é "Has he spoken". "Yet" confirma o Present Perfect.'
  },
  {
    rule: "Na interrogativa do Present Perfect usamos 'Have' (I, you, we, they) ou 'Has' (he, she, it) + sujeito + particípio passado.",
    question: "___ you taken your medicine today?",
    options: ["Did you take", "Has you taken", "Have you taken", "Do you take"],
    correct: 2,
    explanation: '"You" usa "Have" na interrogativa do Present Perfect. O correto é "Have you taken".'
  },
  {
    rule: "Na interrogativa do Present Perfect usamos 'Have' (I, you, we, they) ou 'Has' (he, she, it) + sujeito + particípio passado.",
    question: "___ she ever written a novel?",
    options: ["Did she write", "Have she written", "Has she written", "Does she write"],
    correct: 2,
    explanation: '"She" usa "Has" na interrogativa do Present Perfect. O correto é "Has she written". "Ever" confirma o Present Perfect.'
  },
  {
    rule: "Na interrogativa do Present Perfect usamos 'Have' (I, you, we, they) ou 'Has' (he, she, it) + sujeito + particípio passado.",
    question: "___ we discussed this issue before?",
    options: ["Did we discuss", "Has we discussed", "Have we discussed", "Do we discuss"],
    correct: 2,
    explanation: '"We" usa "Have" na interrogativa do Present Perfect. O correto é "Have we discussed".'
  },
  {
    rule: "Na interrogativa do Present Perfect usamos 'Have' (I, you, we, they) ou 'Has' (he, she, it) + sujeito + particípio passado.",
    question: "___ they hired a new manager yet?",
    options: ["Did they hire", "Has they hired", "Have they hired", "Do they hire"],
    correct: 2,
    explanation: '"They" usa "Have" na interrogativa do Present Perfect. O correto é "Have they hired". "Yet" confirma o Present Perfect.'
  },
  {
    rule: "Na interrogativa do Present Perfect usamos 'Have' (I, you, we, they) ou 'Has' (he, she, it) + sujeito + particípio passado.",
    question: "___ he ever climbed a mountain?",
    options: ["Did he climb", "Have he climbed", "Has he climbed", "Does he climb"],
    correct: 2,
    explanation: '"He" usa "Has" na interrogativa do Present Perfect. O correto é "Has he climbed". "Ever" confirma o Present Perfect.'
  },
  {
    rule: "Na interrogativa do Present Perfect usamos 'Have' (I, you, we, they) ou 'Has' (he, she, it) + sujeito + particípio passado.",
    question: "___ you finished reading that book?",
    options: ["Did you finish", "Has you finished", "Have you finished", "Do you finish"],
    correct: 2,
    explanation: '"You" usa "Have" na interrogativa do Present Perfect. O correto é "Have you finished".'
  },
  {
    rule: "Na interrogativa do Present Perfect usamos 'Have' (I, you, we, they) ou 'Has' (he, she, it) + sujeito + particípio passado.",
    question: "___ she packed her bags yet?",
    options: ["Did she pack", "Have she packed", "Has she packed", "Does she pack"],
    correct: 2,
    explanation: '"She" usa "Has" na interrogativa do Present Perfect. O correto é "Has she packed". "Yet" confirma o Present Perfect.'
  },
  {
    rule: "Na interrogativa do Present Perfect usamos 'Have' (I, you, we, they) ou 'Has' (he, she, it) + sujeito + particípio passado.",
    question: "___ they moved into their new house yet?",
    options: ["Did they move", "Has they moved", "Have they moved", "Do they move"],
    correct: 2,
    explanation: '"They" usa "Have" na interrogativa do Present Perfect. O correto é "Have they moved". "Yet" confirma o Present Perfect.'
  },
  {
    rule: "Na interrogativa do Present Perfect usamos 'Have' (I, you, we, they) ou 'Has' (he, she, it) + sujeito + particípio passado.",
    question: "___ he ever run a marathon?",
    options: ["Did he run", "Have he run", "Has he run", "Does he run"],
    correct: 2,
    explanation: '"He" usa "Has" na interrogativa do Present Perfect. O correto é "Has he run". "Ever" confirma o Present Perfect.'
  },
  {
    rule: "Na interrogativa do Present Perfect usamos 'Have' (I, you, we, they) ou 'Has' (he, she, it) + sujeito + particípio passado.",
    question: "___ you ever learned a third language?",
    options: ["Did you learn", "Has you learned", "Have you learned", "Do you learn"],
    correct: 2,
    explanation: '"You" usa "Have" na interrogativa do Present Perfect. O correto é "Have you learned". "Ever" confirma o Present Perfect.'
  },
  {
    rule: "Na interrogativa do Present Perfect usamos 'Have' (I, you, we, they) ou 'Has' (he, she, it) + sujeito + particípio passado.",
    question: "___ she received the documents yet?",
    options: ["Did she receive", "Have she received", "Has she received", "Does she receive"],
    correct: 2,
    explanation: '"She" usa "Has" na interrogativa do Present Perfect. O correto é "Has she received". "Yet" confirma o Present Perfect.'
  },
  {
    rule: "Na interrogativa do Present Perfect usamos 'Have' (I, you, we, they) ou 'Has' (he, she, it) + sujeito + particípio passado.",
    question: "___ we ever worked on a project like this before?",
    options: ["Did we work", "Has we worked", "Have we worked", "Do we work"],
    correct: 2,
    explanation: '"We" usa "Have" na interrogativa do Present Perfect. O correto é "Have we worked". "Ever" confirma o Present Perfect.'
  },
  {
    rule: "Na interrogativa do Present Perfect usamos 'Have' (I, you, we, they) ou 'Has' (he, she, it) + sujeito + particípio passado.",
    question: "___ they contacted the supplier yet?",
    options: ["Did they contact", "Has they contacted", "Have they contacted", "Do they contact"],
    correct: 2,
    explanation: '"They" usa "Have" na interrogativa do Present Perfect. O correto é "Have they contacted". "Yet" confirma o Present Perfect.'
  },
  {
    rule: "Na interrogativa do Present Perfect usamos 'Have' (I, you, we, they) ou 'Has' (he, she, it) + sujeito + particípio passado.",
    question: "___ he changed his mind about the decision?",
    options: ["Did he change", "Have he changed", "Has he changed", "Does he change"],
    correct: 2,
    explanation: '"He" usa "Has" na interrogativa do Present Perfect. O correto é "Has he changed".'
  },
  {
    rule: "Na interrogativa do Present Perfect usamos 'Have' (I, you, we, they) ou 'Has' (he, she, it) + sujeito + particípio passado.",
    question: "___ you told anyone about this yet?",
    options: ["Did you tell", "Has you told", "Have you told", "Do you tell"],
    correct: 2,
    explanation: '"You" usa "Have" na interrogativa do Present Perfect. O correto é "Have you told". "Yet" confirma o Present Perfect.'
  },
  {
    rule: "Na interrogativa do Present Perfect usamos 'Have' (I, you, we, they) ou 'Has' (he, she, it) + sujeito + particípio passado.",
    question: "___ she admitted her mistake yet?",
    options: ["Did she admit", "Have she admitted", "Has she admitted", "Does she admit"],
    correct: 2,
    explanation: '"She" usa "Has" na interrogativa do Present Perfect. O correto é "Has she admitted". "Yet" confirma o Present Perfect.'
  },
  {
    rule: "Na interrogativa do Present Perfect usamos 'Have' (I, you, we, they) ou 'Has' (he, she, it) + sujeito + particípio passado.",
    question: "___ they ever tried rock climbing?",
    options: ["Did they try", "Has they tried", "Have they tried", "Do they try"],
    correct: 2,
    explanation: '"They" usa "Have" na interrogativa do Present Perfect. O correto é "Have they tried". "Ever" confirma o Present Perfect.'
  },
  {
    rule: "Na interrogativa do Present Perfect usamos 'Have' (I, you, we, they) ou 'Has' (he, she, it) + sujeito + particípio passado.",
    question: "___ he fixed the problem yet?",
    options: ["Did he fix", "Have he fixed", "Has he fixed", "Does he fix"],
    correct: 2,
    explanation: '"He" usa "Has" na interrogativa do Present Perfect. O correto é "Has he fixed". "Yet" confirma o Present Perfect.'
  },
  {
    rule: "Na interrogativa do Present Perfect usamos 'Have' (I, you, we, they) ou 'Has' (he, she, it) + sujeito + particípio passado.",
    question: "___ you spoken to your parents about this?",
    options: ["Did you speak", "Has you spoken", "Have you spoken", "Do you speak"],
    correct: 2,
    explanation: '"You" usa "Have" na interrogativa do Present Perfect. O correto é "Have you spoken".'
  },
  {
    rule: "Na interrogativa do Present Perfect usamos 'Have' (I, you, we, they) ou 'Has' (he, she, it) + sujeito + particípio passado.",
    question: "___ she updated her resume yet?",
    options: ["Did she update", "Have she updated", "Has she updated", "Does she update"],
    correct: 2,
    explanation: '"She" usa "Has" na interrogativa do Present Perfect. O correto é "Has she updated". "Yet" confirma o Present Perfect.'
  },
  {
    rule: "Na interrogativa do Present Perfect usamos 'Have' (I, you, we, they) ou 'Has' (he, she, it) + sujeito + particípio passado.",
    question: "___ we ever had a meeting this productive?",
    options: ["Did we have", "Has we had", "Have we had", "Do we have"],
    correct: 2,
    explanation: '"We" usa "Have" na interrogativa do Present Perfect. O correto é "Have we had". "Ever" confirma o Present Perfect.'
  },
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
  },
  // NEGATIVA DO PRESENT PERFECT CONTINUOUS — haven't been / hasn't been (51 a 100)
  {
    rule: "Na negativa do Present Perfect Continuous usamos 'haven't been' (I, you, we, they) ou 'hasn't been' (he, she, it) + verbo com -ing.",
    question: "She ___ well lately. She looks pale.",
    options: ["hasn't been feeling", "haven't been feeling", "didn't been feeling", "hasn't feeling"],
    correct: 0,
    explanation: '"She" usa "hasn\'t been" + verbo com -ing. O correto é "hasn\'t been feeling".'
  },
  {
    rule: "Na negativa do Present Perfect Continuous usamos 'haven't been' (I, you, we, they) ou 'hasn't been' (he, she, it) + verbo com -ing.",
    question: "They ___ to the gym lately.",
    options: ["hasn't been going", "haven't been going", "didn't been going", "haven't going"],
    correct: 1,
    explanation: '"They" usa "haven\'t been" + verbo com -ing. O correto é "haven\'t been going".'
  },
  {
    rule: "Na negativa do Present Perfect Continuous usamos 'haven't been' (I, you, we, they) ou 'hasn't been' (he, she, it) + verbo com -ing.",
    question: "He ___ enough lately. He looks exhausted.",
    options: ["haven't been sleeping", "hasn't been sleeping", "didn't been sleeping", "hasn't sleeping"],
    correct: 1,
    explanation: '"He" usa "hasn\'t been" + verbo com -ing. O correto é "hasn\'t been sleeping".'
  },
  {
    rule: "Na negativa do Present Perfect Continuous usamos 'haven't been' (I, you, we, they) ou 'hasn't been' (he, she, it) + verbo com -ing.",
    question: "I ___ much attention to the news recently.",
    options: ["hasn't been paying", "haven't been paying", "didn't been paying", "haven't paying"],
    correct: 1,
    explanation: '"I" usa "haven\'t been" + verbo com -ing. O correto é "haven\'t been paying".'
  },
  {
    rule: "Na negativa do Present Perfect Continuous usamos 'haven't been' (I, you, we, they) ou 'hasn't been' (he, she, it) + verbo com -ing.",
    question: "We ___ enough water during the hike.",
    options: ["hasn't been drinking", "haven't been drinking", "didn't been drinking", "haven't drinking"],
    correct: 1,
    explanation: '"We" usa "haven\'t been" + verbo com -ing. O correto é "haven\'t been drinking".'
  },
  {
    rule: "Na negativa do Present Perfect Continuous usamos 'haven't been' (I, you, we, they) ou 'hasn't been' (he, she, it) + verbo com -ing.",
    question: "She ___ her medication regularly. That's why she feels worse.",
    options: ["haven't been taking", "hasn't been taking", "didn't been taking", "hasn't taking"],
    correct: 1,
    explanation: '"She" usa "hasn\'t been" + verbo com -ing. O correto é "hasn\'t been taking".'
  },
  {
    rule: "Na negativa do Present Perfect Continuous usamos 'haven't been' (I, you, we, they) ou 'hasn't been' (he, she, it) + verbo com -ing.",
    question: "They ___ on the project as a team lately.",
    options: ["hasn't been working", "haven't been working", "didn't been working", "haven't working"],
    correct: 1,
    explanation: '"They" usa "haven\'t been" + verbo com -ing. O correto é "haven\'t been working".'
  },
  {
    rule: "Na negativa do Present Perfect Continuous usamos 'haven't been' (I, you, we, they) ou 'hasn't been' (he, she, it) + verbo com -ing.",
    question: "He ___ his English classes recently.",
    options: ["haven't been attending", "hasn't been attending", "didn't been attending", "hasn't attending"],
    correct: 1,
    explanation: '"He" usa "hasn\'t been" + verbo com -ing. O correto é "hasn\'t been attending".'
  },
  {
    rule: "Na negativa do Present Perfect Continuous usamos 'haven't been' (I, you, we, they) ou 'hasn't been' (he, she, it) + verbo com -ing.",
    question: "I ___ well since I changed jobs.",
    options: ["hasn't been sleeping", "haven't been sleeping", "didn't been sleeping", "haven't sleeping"],
    correct: 1,
    explanation: '"I" usa "haven\'t been" + verbo com -ing. O correto é "haven\'t been sleeping". "Since" confirma o Present Perfect Continuous.'
  },
  {
    rule: "Na negativa do Present Perfect Continuous usamos 'haven't been' (I, you, we, they) ou 'hasn't been' (he, she, it) + verbo com -ing.",
    question: "We ___ enough time together lately.",
    options: ["hasn't been spending", "haven't been spending", "didn't been spending", "haven't spending"],
    correct: 1,
    explanation: '"We" usa "haven\'t been" + verbo com -ing. O correto é "haven\'t been spending".'
  },
  {
    rule: "Na negativa do Present Perfect Continuous usamos 'haven't been' (I, you, we, they) ou 'hasn't been' (he, she, it) + verbo com -ing.",
    question: "She ___ her diet properly this month.",
    options: ["haven't been following", "hasn't been following", "didn't been following", "hasn't following"],
    correct: 1,
    explanation: '"She" usa "hasn\'t been" + verbo com -ing. O correto é "hasn\'t been following".'
  },
  {
    rule: "Na negativa do Present Perfect Continuous usamos 'haven't been' (I, you, we, they) ou 'hasn't been' (he, she, it) + verbo com -ing.",
    question: "They ___ their bills on time lately.",
    options: ["hasn't been paying", "haven't been paying", "didn't been paying", "haven't paying"],
    correct: 1,
    explanation: '"They" usa "haven\'t been" + verbo com -ing. O correto é "haven\'t been paying".'
  },
  {
    rule: "Na negativa do Present Perfect Continuous usamos 'haven't been' (I, you, we, they) ou 'hasn't been' (he, she, it) + verbo com -ing.",
    question: "He ___ his best at work recently. His performance has dropped.",
    options: ["haven't been giving", "hasn't been giving", "didn't been giving", "hasn't giving"],
    correct: 1,
    explanation: '"He" usa "hasn\'t been" + verbo com -ing. O correto é "hasn\'t been giving".'
  },
  {
    rule: "Na negativa do Present Perfect Continuous usamos 'haven't been' (I, you, we, they) ou 'hasn't been' (he, she, it) + verbo com -ing.",
    question: "I ___ enough exercise lately. I feel out of shape.",
    options: ["hasn't been getting", "haven't been getting", "didn't been getting", "haven't getting"],
    correct: 1,
    explanation: '"I" usa "haven\'t been" + verbo com -ing. O correto é "haven\'t been getting".'
  },
  {
    rule: "Na negativa do Present Perfect Continuous usamos 'haven't been' (I, you, we, they) ou 'hasn't been' (he, she, it) + verbo com -ing.",
    question: "We ___ to each other much since the argument.",
    options: ["hasn't been talking", "haven't been talking", "didn't been talking", "haven't talking"],
    correct: 1,
    explanation: '"We" usa "haven\'t been" + verbo com -ing. O correto é "haven\'t been talking". "Since" confirma o Present Perfect Continuous.'
  },
  {
    rule: "Na negativa do Present Perfect Continuous usamos 'haven't been' (I, you, we, they) ou 'hasn't been' (he, she, it) + verbo com -ing.",
    question: "She ___ her full potential at school lately.",
    options: ["haven't been reaching", "hasn't been reaching", "didn't been reaching", "hasn't reaching"],
    correct: 1,
    explanation: '"She" usa "hasn\'t been" + verbo com -ing. O correto é "hasn\'t been reaching".'
  },
  {
    rule: "Na negativa do Present Perfect Continuous usamos 'haven't been' (I, you, we, they) ou 'hasn't been' (he, she, it) + verbo com -ing.",
    question: "They ___ their homework on time this semester.",
    options: ["hasn't been submitting", "haven't been submitting", "didn't been submitting", "haven't submitting"],
    correct: 1,
    explanation: '"They" usa "haven\'t been" + verbo com -ing. O correto é "haven\'t been submitting".'
  },
  {
    rule: "Na negativa do Present Perfect Continuous usamos 'haven't been' (I, you, we, they) ou 'hasn't been' (he, she, it) + verbo com -ing.",
    question: "He ___ his dog for walks recently. The dog is restless.",
    options: ["haven't been taking", "hasn't been taking", "didn't been taking", "hasn't taking"],
    correct: 1,
    explanation: '"He" usa "hasn\'t been" + verbo com -ing. O correto é "hasn\'t been taking".'
  },
  {
    rule: "Na negativa do Present Perfect Continuous usamos 'haven't been' (I, you, we, they) ou 'hasn't been' (he, she, it) + verbo com -ing.",
    question: "I ___ enough lately. My mind is exhausted.",
    options: ["hasn't been resting", "haven't been resting", "didn't been resting", "haven't resting"],
    correct: 1,
    explanation: '"I" usa "haven\'t been" + verbo com -ing. O correto é "haven\'t been resting".'
  },
  {
    rule: "Na negativa do Present Perfect Continuous usamos 'haven't been' (I, you, we, they) ou 'hasn't been' (he, she, it) + verbo com -ing.",
    question: "We ___ our goals seriously this year.",
    options: ["hasn't been pursuing", "haven't been pursuing", "didn't been pursuing", "haven't pursuing"],
    correct: 1,
    explanation: '"We" usa "haven\'t been" + verbo com -ing. O correto é "haven\'t been pursuing".'
  },
  {
    rule: "Na negativa do Present Perfect Continuous usamos 'haven't been' (I, you, we, they) ou 'hasn't been' (he, she, it) + verbo com -ing.",
    question: "She ___ to her therapist regularly since last year.",
    options: ["haven't been going", "hasn't been going", "didn't been going", "hasn't going"],
    correct: 1,
    explanation: '"She" usa "hasn\'t been" + verbo com -ing. O correto é "hasn\'t been going". "Since" confirma o Present Perfect Continuous.'
  },
  {
    rule: "Na negativa do Present Perfect Continuous usamos 'haven't been' (I, you, we, they) ou 'hasn't been' (he, she, it) + verbo com -ing.",
    question: "They ___ the safety rules on the construction site.",
    options: ["hasn't been following", "haven't been following", "didn't been following", "haven't following"],
    correct: 1,
    explanation: '"They" usa "haven\'t been" + verbo com -ing. O correto é "haven\'t been following".'
  },
  {
    rule: "Na negativa do Present Perfect Continuous usamos 'haven't been' (I, you, we, they) ou 'hasn't been' (he, she, it) + verbo com -ing.",
    question: "He ___ his responsibilities at home lately.",
    options: ["haven't been fulfilling", "hasn't been fulfilling", "didn't been fulfilling", "hasn't fulfilling"],
    correct: 1,
    explanation: '"He" usa "hasn\'t been" + verbo com -ing. O correto é "hasn\'t been fulfilling".'
  },
  {
    rule: "Na negativa do Present Perfect Continuous usamos 'haven't been' (I, you, we, they) ou 'hasn't been' (he, she, it) + verbo com -ing.",
    question: "I ___ enough fruits and vegetables lately.",
    options: ["hasn't been eating", "haven't been eating", "didn't been eating", "haven't eating"],
    correct: 1,
    explanation: '"I" usa "haven\'t been" + verbo com -ing. O correto é "haven\'t been eating".'
  },
  {
    rule: "Na negativa do Present Perfect Continuous usamos 'haven't been' (I, you, we, they) ou 'hasn't been' (he, she, it) + verbo com -ing.",
    question: "We ___ our budget properly this month.",
    options: ["hasn't been managing", "haven't been managing", "didn't been managing", "haven't managing"],
    correct: 1,
    explanation: '"We" usa "haven\'t been" + verbo com -ing. O correto é "haven\'t been managing".'
  },
  {
    rule: "Na negativa do Present Perfect Continuous usamos 'haven't been' (I, you, we, they) ou 'hasn't been' (he, she, it) + verbo com -ing.",
    question: "She ___ her true feelings lately.",
    options: ["haven't been expressing", "hasn't been expressing", "didn't been expressing", "hasn't expressing"],
    correct: 1,
    explanation: '"She" usa "hasn\'t been" + verbo com -ing. O correto é "hasn\'t been expressing".'
  },
  {
    rule: "Na negativa do Present Perfect Continuous usamos 'haven't been' (I, you, we, they) ou 'hasn't been' (he, she, it) + verbo com -ing.",
    question: "They ___ enough for their retirement.",
    options: ["hasn't been saving", "haven't been saving", "didn't been saving", "haven't saving"],
    correct: 1,
    explanation: '"They" usa "haven\'t been" + verbo com -ing. O correto é "haven\'t been saving".'
  },
  {
    rule: "Na negativa do Present Perfect Continuous usamos 'haven't been' (I, you, we, they) ou 'hasn't been' (he, she, it) + verbo com -ing.",
    question: "He ___ his friends since he started the new job.",
    options: ["haven't been seeing", "hasn't been seeing", "didn't been seeing", "hasn't seeing"],
    correct: 1,
    explanation: '"He" usa "hasn\'t been" + verbo com -ing. O correto é "hasn\'t been seeing". "Since" confirma o Present Perfect Continuous.'
  },
  {
    rule: "Na negativa do Present Perfect Continuous usamos 'haven't been' (I, you, we, they) ou 'hasn't been' (he, she, it) + verbo com -ing.",
    question: "I ___ to music as much as I used to.",
    options: ["hasn't been listening", "haven't been listening", "didn't been listening", "haven't listening"],
    correct: 1,
    explanation: '"I" usa "haven\'t been" + verbo com -ing. O correto é "haven\'t been listening".'
  },
  {
    rule: "Na negativa do Present Perfect Continuous usamos 'haven't been' (I, you, we, they) ou 'hasn't been' (he, she, it) + verbo com -ing.",
    question: "We ___ to the office regularly since the new policy.",
    options: ["hasn't been coming", "haven't been coming", "didn't been coming", "haven't coming"],
    correct: 1,
    explanation: '"We" usa "haven\'t been" + verbo com -ing. O correto é "haven\'t been coming". "Since" confirma o Present Perfect Continuous.'
  },
  {
    rule: "Na negativa do Present Perfect Continuous usamos 'haven't been' (I, you, we, they) ou 'hasn't been' (he, she, it) + verbo com -ing.",
    question: "She ___ on her thesis as much as she should.",
    options: ["haven't been working", "hasn't been working", "didn't been working", "hasn't working"],
    correct: 1,
    explanation: '"She" usa "hasn\'t been" + verbo com -ing. O correto é "hasn\'t been working".'
  },
  {
    rule: "Na negativa do Present Perfect Continuous usamos 'haven't been' (I, you, we, they) ou 'hasn't been' (he, she, it) + verbo com -ing.",
    question: "They ___ their children enough attention lately.",
    options: ["hasn't been giving", "haven't been giving", "didn't been giving", "haven't giving"],
    correct: 1,
    explanation: '"They" usa "haven\'t been" + verbo com -ing. O correto é "haven\'t been giving".'
  },
  {
    rule: "Na negativa do Present Perfect Continuous usamos 'haven't been' (I, you, we, they) ou 'hasn't been' (he, she, it) + verbo com -ing.",
    question: "He ___ his full potential at training.",
    options: ["haven't been showing", "hasn't been showing", "didn't been showing", "hasn't showing"],
    correct: 1,
    explanation: '"He" usa "hasn\'t been" + verbo com -ing. O correto é "hasn\'t been showing".'
  },
  {
    rule: "Na negativa do Present Perfect Continuous usamos 'haven't been' (I, you, we, they) ou 'hasn't been' (he, she, it) + verbo com -ing.",
    question: "I ___ my emails regularly this week.",
    options: ["hasn't been checking", "haven't been checking", "didn't been checking", "haven't checking"],
    correct: 1,
    explanation: '"I" usa "haven\'t been" + verbo com -ing. O correto é "haven\'t been checking".'
  },
  {
    rule: "Na negativa do Present Perfect Continuous usamos 'haven't been' (I, you, we, they) ou 'hasn't been' (he, she, it) + verbo com -ing.",
    question: "We ___ our meetings on schedule lately.",
    options: ["hasn't been starting", "haven't been starting", "didn't been starting", "haven't starting"],
    correct: 1,
    explanation: '"We" usa "haven\'t been" + verbo com -ing. O correto é "haven\'t been starting".'
  },
  {
    rule: "Na negativa do Present Perfect Continuous usamos 'haven't been' (I, you, we, they) ou 'hasn't been' (he, she, it) + verbo com -ing.",
    question: "She ___ care of herself since the breakup.",
    options: ["haven't been taking", "hasn't been taking", "didn't been taking", "hasn't taking"],
    correct: 1,
    explanation: '"She" usa "hasn\'t been" + verbo com -ing. O correto é "hasn\'t been taking". "Since" confirma o Present Perfect Continuous.'
  },
  {
    rule: "Na negativa do Present Perfect Continuous usamos 'haven't been' (I, you, we, they) ou 'hasn't been' (he, she, it) + verbo com -ing.",
    question: "They ___ their promises lately.",
    options: ["hasn't been keeping", "haven't been keeping", "didn't been keeping", "haven't keeping"],
    correct: 1,
    explanation: '"They" usa "haven\'t been" + verbo com -ing. O correto é "haven\'t been keeping".'
  },
  {
    rule: "Na negativa do Present Perfect Continuous usamos 'haven't been' (I, you, we, they) ou 'hasn't been' (he, she, it) + verbo com -ing.",
    question: "He ___ his teammates enough credit lately.",
    options: ["haven't been giving", "hasn't been giving", "didn't been giving", "hasn't giving"],
    correct: 1,
    explanation: '"He" usa "hasn\'t been" + verbo com -ing. O correto é "hasn\'t been giving".'
  },
  {
    rule: "Na negativa do Present Perfect Continuous usamos 'haven't been' (I, you, we, they) ou 'hasn't been' (he, she, it) + verbo com -ing.",
    question: "I ___ enough time with my family recently.",
    options: ["hasn't been spending", "haven't been spending", "didn't been spending", "haven't spending"],
    correct: 1,
    explanation: '"I" usa "haven\'t been" + verbo com -ing. O correto é "haven\'t been spending".'
  },
  {
    rule: "Na negativa do Present Perfect Continuous usamos 'haven't been' (I, you, we, they) ou 'hasn't been' (he, she, it) + verbo com -ing.",
    question: "We ___ our goals clearly this quarter.",
    options: ["hasn't been communicating", "haven't been communicating", "didn't been communicating", "haven't communicating"],
    correct: 1,
    explanation: '"We" usa "haven\'t been" + verbo com -ing. O correto é "haven\'t been communicating".'
  },
  {
    rule: "Na negativa do Present Perfect Continuous usamos 'haven't been' (I, you, we, they) ou 'hasn't been' (he, she, it) + verbo com -ing.",
    question: "She ___ herself to the new routine.",
    options: ["haven't been adapting", "hasn't been adapting", "didn't been adapting", "hasn't adapting"],
    correct: 1,
    explanation: '"She" usa "hasn\'t been" + verbo com -ing. O correto é "hasn\'t been adapting".'
  },
  {
    rule: "Na negativa do Present Perfect Continuous usamos 'haven't been' (I, you, we, they) ou 'hasn't been' (he, she, it) + verbo com -ing.",
    question: "They ___ their sales targets this month.",
    options: ["hasn't been hitting", "haven't been hitting", "didn't been hitting", "haven't hitting"],
    correct: 1,
    explanation: '"They" usa "haven\'t been" + verbo com -ing. O correto é "haven\'t been hitting".'
  },
  {
    rule: "Na negativa do Present Perfect Continuous usamos 'haven't been' (I, you, we, they) ou 'hasn't been' (he, she, it) + verbo com -ing.",
    question: "He ___ much progress with his recovery.",
    options: ["haven't been making", "hasn't been making", "didn't been making", "hasn't making"],
    correct: 1,
    explanation: '"He" usa "hasn\'t been" + verbo com -ing. O correto é "hasn\'t been making".'
  },
  {
    rule: "Na negativa do Present Perfect Continuous usamos 'haven't been' (I, you, we, they) ou 'hasn't been' (he, she, it) + verbo com -ing.",
    question: "I ___ the situation the attention it deserves.",
    options: ["hasn't been giving", "haven't been giving", "didn't been giving", "haven't giving"],
    correct: 1,
    explanation: '"I" usa "haven\'t been" + verbo com -ing. O correto é "haven\'t been giving".'
  },
  {
    rule: "Na negativa do Present Perfect Continuous usamos 'haven't been' (I, you, we, they) ou 'hasn't been' (he, she, it) + verbo com -ing.",
    question: "We ___ the right approach to solve this problem.",
    options: ["hasn't been using", "haven't been using", "didn't been using", "haven't using"],
    correct: 1,
    explanation: '"We" usa "haven\'t been" + verbo com -ing. O correto é "haven\'t been using".'
  },
  {
    rule: "Na negativa do Present Perfect Continuous usamos 'haven't been' (I, you, we, they) ou 'hasn't been' (he, she, it) + verbo com -ing.",
    question: "She ___ her social life since she moved abroad.",
    options: ["haven't been maintaining", "hasn't been maintaining", "didn't been maintaining", "hasn't maintaining"],
    correct: 1,
    explanation: '"She" usa "hasn\'t been" + verbo com -ing. O correto é "hasn\'t been maintaining". "Since" confirma o Present Perfect Continuous.'
  },
  {
    rule: "Na negativa do Present Perfect Continuous usamos 'haven't been' (I, you, we, they) ou 'hasn't been' (he, she, it) + verbo com -ing.",
    question: "They ___ realistic about their deadlines.",
    options: ["hasn't been being", "haven't been being", "didn't been being", "haven't being"],
    correct: 1,
    explanation: '"They" usa "haven\'t been" + verbo com -ing. O correto é "haven\'t been being".'
  },
  {
    rule: "Na negativa do Present Perfect Continuous usamos 'haven't been' (I, you, we, they) ou 'hasn't been' (he, she, it) + verbo com -ing.",
    question: "He ___ enough water during his workouts.",
    options: ["haven't been drinking", "hasn't been drinking", "didn't been drinking", "hasn't drinking"],
    correct: 1,
    explanation: '"He" usa "hasn\'t been" + verbo com -ing. O correto é "hasn\'t been drinking".'
  },
  {
    rule: "Na negativa do Present Perfect Continuous usamos 'haven't been' (I, you, we, they) ou 'hasn't been' (he, she, it) + verbo com -ing.",
    question: "I ___ my best to keep up with the workload lately.",
    options: ["hasn't been doing", "haven't been doing", "didn't been doing", "haven't doing"],
    correct: 1,
    explanation: '"I" usa "haven\'t been" + verbo com -ing. O correto é "haven\'t been doing".'
  },
  // INTERROGATIVA DO PRESENT PERFECT CONTINUOUS — Have / Has + been + verbo com -ing (101 a 150)
  {
    rule: "Na interrogativa do Present Perfect Continuous usamos 'Have' (I, you, we, they) ou 'Has' (he, she, it) + sujeito + been + verbo com -ing.",
    question: "___ she been feeling better lately?",
    options: ["Did she been feeling", "Has she been feeling", "Have she been feeling", "Does she been feeling"],
    correct: 1,
    explanation: '"She" usa "Has" na interrogativa do Present Perfect Continuous. O correto é "Has she been feeling".'
  },
  {
    rule: "Na interrogativa do Present Perfect Continuous usamos 'Have' (I, you, we, they) ou 'Has' (he, she, it) + sujeito + been + verbo com -ing.",
    question: "___ they been waiting long?",
    options: ["Did they been waiting", "Has they been waiting", "Have they been waiting", "Do they been waiting"],
    correct: 2,
    explanation: '"They" usa "Have" na interrogativa do Present Perfect Continuous. O correto é "Have they been waiting".'
  },
  {
    rule: "Na interrogativa do Present Perfect Continuous usamos 'Have' (I, you, we, they) ou 'Has' (he, she, it) + sujeito + been + verbo com -ing.",
    question: "___ he been working on the project all day?",
    options: ["Did he been working", "Have he been working", "Has he been working", "Does he been working"],
    correct: 2,
    explanation: '"He" usa "Has" na interrogativa do Present Perfect Continuous. O correto é "Has he been working".'
  },
  {
    rule: "Na interrogativa do Present Perfect Continuous usamos 'Have' (I, you, we, they) ou 'Has' (he, she, it) + sujeito + been + verbo com -ing.",
    question: "___ you been sleeping well lately?",
    options: ["Did you been sleeping", "Has you been sleeping", "Have you been sleeping", "Do you been sleeping"],
    correct: 2,
    explanation: '"You" usa "Have" na interrogativa do Present Perfect Continuous. O correto é "Have you been sleeping".'
  },
  {
    rule: "Na interrogativa do Present Perfect Continuous usamos 'Have' (I, you, we, they) ou 'Has' (he, she, it) + sujeito + been + verbo com -ing.",
    question: "___ we been spending too much money lately?",
    options: ["Did we been spending", "Has we been spending", "Have we been spending", "Do we been spending"],
    correct: 2,
    explanation: '"We" usa "Have" na interrogativa do Present Perfect Continuous. O correto é "Have we been spending".'
  },
  {
    rule: "Na interrogativa do Present Perfect Continuous usamos 'Have' (I, you, we, they) ou 'Has' (he, she, it) + sujeito + been + verbo com -ing.",
    question: "___ she been taking her medication regularly?",
    options: ["Did she been taking", "Have she been taking", "Has she been taking", "Does she been taking"],
    correct: 2,
    explanation: '"She" usa "Has" na interrogativa do Present Perfect Continuous. O correto é "Has she been taking".'
  },
  {
    rule: "Na interrogativa do Present Perfect Continuous usamos 'Have' (I, you, we, they) ou 'Has' (he, she, it) + sujeito + been + verbo com -ing.",
    question: "___ they been practicing for the competition?",
    options: ["Did they been practicing", "Has they been practicing", "Have they been practicing", "Do they been practicing"],
    correct: 2,
    explanation: '"They" usa "Have" na interrogativa do Present Perfect Continuous. O correto é "Have they been practicing".'
  },
  {
    rule: "Na interrogativa do Present Perfect Continuous usamos 'Have' (I, you, we, they) ou 'Has' (he, she, it) + sujeito + been + verbo com -ing.",
    question: "___ he been eating properly lately?",
    options: ["Did he been eating", "Have he been eating", "Has he been eating", "Does he been eating"],
    correct: 2,
    explanation: '"He" usa "Has" na interrogativa do Present Perfect Continuous. O correto é "Has he been eating".'
  },
  {
    rule: "Na interrogativa do Present Perfect Continuous usamos 'Have' (I, you, we, they) ou 'Has' (he, she, it) + sujeito + been + verbo com -ing.",
    question: "___ you been studying for the exam?",
    options: ["Did you been studying", "Has you been studying", "Have you been studying", "Do you been studying"],
    correct: 2,
    explanation: '"You" usa "Have" na interrogativa do Present Perfect Continuous. O correto é "Have you been studying".'
  },
  {
    rule: "Na interrogativa do Present Perfect Continuous usamos 'Have' (I, you, we, they) ou 'Has' (he, she, it) + sujeito + been + verbo com -ing.",
    question: "___ we been following the right strategy?",
    options: ["Did we been following", "Has we been following", "Have we been following", "Do we been following"],
    correct: 2,
    explanation: '"We" usa "Have" na interrogativa do Present Perfect Continuous. O correto é "Have we been following".'
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
  },
  // NEGATIVA DO SIMPLE PRESENT — don't / doesn't (51 a 100)
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
    rule: "Na negativa do Simple Present do verbo To Be usamos 'isn't' (he, she, it) ou 'ären't' (you, we, they) ou 'am not' (I).",
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
   // INTERROGATIVA DO SIMPLE PRESENT — Do / Does (101 a 150)
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
  {
    rule: "Na interrogativa do Simple Present usamos 'Do' (I, you, we, they) ou 'Does' (he, she, it) + sujeito + verbo no infinitivo.",
    question: "___ you remember his phone number?",
    options: ["Does you remember", "Is you remember", "Do you remembers", "Do you remember"],
    correct: 3,
    explanation: '"You" usa "Do" na interrogativa do Simple Present. O correto é "Do you remember".'
  },
  {
    rule: "Na interrogativa do Simple Present usamos 'Do' (I, you, we, they) ou 'Does' (he, she, it) + sujeito + verbo no infinitivo.",
    question: "___ we allow pets in this building?",
    options: ["Does we allow", "Is we allow", "Do we allows", "Do we allow"],
    correct: 3,
    explanation: '"We" usa "Do" na interrogativa do Simple Present. O correto é "Do we allow".'
  },
  {
    rule: "Na interrogativa do Simple Present usamos 'Do' (I, you, we, they) ou 'Does' (he, she, it) + sujeito + verbo no infinitivo.",
    question: "___ she drive to work every day?",
    options: ["Do she drive", "Is she drive", "Does she drives", "Does she drive"],
    correct: 3,
    explanation: '"She" usa "Does" na interrogativa do Simple Present. O correto é "Does she drive".'
  },
  {
    rule: "Na interrogativa do Simple Present usamos 'Do' (I, you, we, they) ou 'Does' (he, she, it) + sujeito + verbo no infinitivo.",
    question: "___ he believe in second chances?",
    options: ["Do he believe", "Is he believe", "Does he believes", "Does he believe"],
    correct: 3,
    explanation: '"He" usa "Does" na interrogativa do Simple Present. O correto é "Does he believe".'
  },
  {
    rule: "Na interrogativa do Simple Present usamos 'Do' (I, you, we, they) ou 'Does' (he, she, it) + sujeito + verbo no infinitivo.",
    question: "___ they offer any discounts for students?",
    options: ["Does they offer", "Is they offer", "Do they offers", "Do they offer"],
    correct: 3,
    explanation: '"They" usa "Do" na interrogativa do Simple Present. O correto é "Do they offer".'
  },
  {
    rule: "Na interrogativa do Simple Present usamos 'Do' (I, you, we, they) ou 'Does' (he, she, it) + sujeito + verbo no infinitivo.",
    question: "___ you think that's a good idea?",
    options: ["Does you think", "Is you think", "Do you thinks", "Do you think"],
    correct: 3,
    explanation: '"You" usa "Do" na interrogativa do Simple Present. O correto é "Do you think".'
  },
  {
    rule: "Na interrogativa do Simple Present usamos 'Do' (I, you, we, they) ou 'Does' (he, she, it) + sujeito + verbo no infinitivo.",
    question: "___ we charge extra for delivery?",
    options: ["Does we charge", "Is we charge", "Do we charges", "Do we charge"],
    correct: 3,
    explanation: '"We" usa "Do" na interrogativa do Simple Present. O correto é "Do we charge".'
  },
  {
    rule: "Na interrogativa do Simple Present usamos 'Do' (I, you, we, they) ou 'Does' (he, she, it) + sujeito + verbo no infinitivo.",
    question: "___ she wake up early on weekdays?",
    options: ["Do she wake up", "Is she wake up", "Does she wakes up", "Does she wake up"],
    correct: 3,
    explanation: '"She" usa "Does" na interrogativa do Simple Present. O correto é "Does she wake up".'
  },
  {
    rule: "Na interrogativa do Simple Present usamos 'Do' (I, you, we, they) ou 'Does' (he, she, it) + sujeito + verbo no infinitivo.",
    question: "___ he read the news every morning?",
    options: ["Do he read", "Is he read", "Does he reads", "Does he read"],
    correct: 3,
    explanation: '"He" usa "Does" na interrogativa do Simple Present. O correto é "Does he read".'
  },
  {
    rule: "Na interrogativa do Simple Present usamos 'Do' (I, you, we, they) ou 'Does' (he, she, it) + sujeito + verbo no infinitivo.",
    question: "___ they sell organic products here?",
    options: ["Does they sell", "Is they sell", "Do they sells", "Do they sell"],
    correct: 3,
    explanation: '"They" usa "Do" na interrogativa do Simple Present. O correto é "Do they sell".'
  },
  {
    rule: "Na interrogativa do Simple Present usamos 'Do' (I, you, we, they) ou 'Does' (he, she, it) + sujeito + verbo no infinitivo.",
    question: "___ you feel comfortable speaking in public?",
    options: ["Does you feel", "Is you feel", "Do you feels", "Do you feel"],
    correct: 3,
    explanation: '"You" usa "Do" na interrogativa do Simple Present. O correto é "Do you feel".'
  },
  {
    rule: "Na interrogativa do Simple Present usamos 'Do' (I, you, we, they) ou 'Does' (he, she, it) + sujeito + verbo no infinitivo.",
    question: "___ we start the meeting at nine?",
    options: ["Does we start", "Is we start", "Do we starts", "Do we start"],
    correct: 3,
    explanation: '"We" usa "Do" na interrogativa do Simple Present. O correto é "Do we start".'
  },
  {
    rule: "Na interrogativa do Simple Present usamos 'Do' (I, you, we, they) ou 'Does' (he, she, it) + sujeito + verbo no infinitivo.",
    question: "___ she speak more than one language?",
    options: ["Do she speak", "Is she speak", "Does she speaks", "Does she speak"],
    correct: 3,
    explanation: '"She" usa "Does" na interrogativa do Simple Present. O correto é "Does she speak".'
  },
  {
    rule: "Na interrogativa do Simple Present usamos 'Do' (I, you, we, they) ou 'Does' (he, she, it) + sujeito + verbo no infinitivo.",
    question: "___ he know how to cook?",
    options: ["Do he know", "Is he know", "Does he knows", "Does he know"],
    correct: 3,
    explanation: '"He" usa "Does" na interrogativa do Simple Present. O correto é "Does he know".'
  },
  {
    rule: "Na interrogativa do Simple Present usamos 'Do' (I, you, we, they) ou 'Does' (he, she, it) + sujeito + verbo no infinitivo.",
    question: "___ they accept credit cards here?",
    options: ["Does they accept", "Is they accept", "Do they accepts", "Do they accept"],
    correct: 3,
    explanation: '"They" usa "Do" na interrogativa do Simple Present. O correto é "Do they accept".'
  },
  {
    rule: "Na interrogativa do Simple Present usamos 'Do' (I, you, we, they) ou 'Does' (he, she, it) + sujeito + verbo no infinitivo.",
    question: "___ you watch television every night?",
    options: ["Does you watch", "Is you watch", "Do you watches", "Do you watch"],
    correct: 3,
    explanation: '"You" usa "Do" na interrogativa do Simple Present. O correto é "Do you watch".'
  },
  {
    rule: "Na interrogativa do Simple Present usamos 'Do' (I, you, we, they) ou 'Does' (he, she, it) + sujeito + verbo no infinitivo.",
    question: "___ we have a meeting tomorrow?",
    options: ["Does we have", "Is we have", "Do we has", "Do we have"],
    correct: 3,
    explanation: '"We" usa "Do" na interrogativa do Simple Present. O correto é "Do we have".'
  },
  // INTERROGATIVA DO SIMPLE PRESENT COM TO BE — Is / Are / Am (131 a 150)
  {
    rule: "Na interrogativa do Simple Present do verbo To Be usamos 'Is' (he, she, it), 'Are' (you, we, they) ou 'Am' (I) + sujeito.",
    question: "___ she happy with the new arrangement?",
    options: ["Does she be happy", "Are she happy", "Is she happy", "Do she be happy"],
    correct: 2,
    explanation: '"She" usa "Is" na interrogativa do Simple Present do To Be. Nunca usamos "Does" com o To Be.'
  },
  {
    rule: "Na interrogativa do Simple Present do verbo To Be usamos 'Is' (he, she, it), 'Are' (you, we, they) ou 'Am' (I) + sujeito.",
    question: "___ they ready for the exam?",
    options: ["Does they be ready", "Is they ready", "Are they ready", "Do they be ready"],
    correct: 2,
    explanation: '"They" usa "Are" na interrogativa do Simple Present do To Be.'
  },
  {
    rule: "Na interrogativa do Simple Present do verbo To Be usamos 'Is' (he, she, it), 'Are' (you, we, they) ou 'Am' (I) + sujeito.",
    question: "___ he the right person for the job?",
    options: ["Does he be", "Are he", "Is he", "Do he be"],
    correct: 2,
    explanation: '"He" usa "Is" na interrogativa do Simple Present do To Be.'
  },
  {
    rule: "Na interrogativa do Simple Present do verbo To Be usamos 'Is' (he, she, it), 'Are' (you, we, they) ou 'Am' (I) + sujeito.",
    question: "___ you sure about that?",
    options: ["Does you be sure", "Is you sure", "Are you sure", "Do you be sure"],
    correct: 2,
    explanation: '"You" usa "Are" na interrogativa do Simple Present do To Be.'
  },
  {
    rule: "Na interrogativa do Simple Present do verbo To Be usamos 'Is' (he, she, it), 'Are' (you, we, they) ou 'Am' (I) + sujeito.",
    question: "___ the meeting scheduled for today?",
    options: ["Does the meeting be scheduled", "Are the meeting scheduled", "Is the meeting scheduled", "Do the meeting be scheduled"],
    correct: 2,
    explanation: '"The meeting" equivale a "it", então usamos "Is".'
  },
  {
    rule: "Na interrogativa do Simple Present do verbo To Be usamos 'Is' (he, she, it), 'Are' (you, we, they) ou 'Am' (I) + sujeito.",
    question: "___ we on the right track?",
    options: ["Does we be", "Is we", "Are we", "Do we be"],
    correct: 2,
    explanation: '"We" usa "Are" na interrogativa do Simple Present do To Be.'
  },
  {
    rule: "Na interrogativa do Simple Present do verbo To Be usamos 'Is' (he, she, it), 'Are' (you, we, they) ou 'Am' (I) + sujeito.",
    question: "___ I late for the meeting?",
    options: ["Does I be late", "Are I late", "Is I late", "Am I late"],
    correct: 3,
    explanation: '"I" usa "Am" na interrogativa do Simple Present do To Be.'
  },
  {
    rule: "Na interrogativa do Simple Present do verbo To Be usamos 'Is' (he, she, it), 'Are' (you, we, they) ou 'Am' (I) + sujeito.",
    question: "___ the prices reasonable at that store?",
    options: ["Does the prices be reasonable", "Is the prices reasonable", "Are the prices reasonable", "Do the prices be reasonable"],
    correct: 2,
    explanation: '"The prices" é plural, então usamos "Are".'
  },
  {
    rule: "Na interrogativa do Simple Present do verbo To Be usamos 'Is' (he, she, it), 'Are' (you, we, they) ou 'Am' (I) + sujeito.",
    question: "___ she aware of the new rules?",
    options: ["Does she be aware", "Are she aware", "Is she aware", "Do she be aware"],
    correct: 2,
    explanation: '"She" usa "Is" na interrogativa do Simple Present do To Be.'
  },
  {
    rule: "Na interrogativa do Simple Present do verbo To Be usamos 'Is' (he, she, it), 'Are' (you, we, they) ou 'Am' (I) + sujeito.",
    question: "___ they from the same country?",
    options: ["Does they be from", "Is they from", "Are they from", "Do they be from"],
    correct: 2,
    explanation: '"They" usa "Are" na interrogativa do Simple Present do To Be.'
  },
  {
    rule: "Na interrogativa do Simple Present do verbo To Be usamos 'Is' (he, she, it), 'Are' (you, we, they) ou 'Am' (I) + sujeito.",
    question: "___ he responsible for that decision?",
    options: ["Does he be responsible", "Are he responsible", "Is he responsible", "Do he be responsible"],
    correct: 2,
    explanation: '"He" usa "Is" na interrogativa do Simple Present do To Be.'
  },
  {
    rule: "Na interrogativa do Simple Present do verbo To Be usamos 'Is' (he, she, it), 'Are' (you, we, they) ou 'Am' (I) + sujeito.",
    question: "___ I the only one who thinks this is wrong?",
    options: ["Does I be", "Are I", "Is I", "Am I"],
    correct: 3,
    explanation: '"I" usa "Am" na interrogativa do Simple Present do To Be.'
  },
  {
    rule: "Na interrogativa do Simple Present do verbo To Be usamos 'Is' (he, she, it), 'Are' (you, we, they) ou 'Am' (I) + sujeito.",
    question: "___ the coffee hot enough?",
    options: ["Does the coffee be hot", "Are the coffee hot", "Is the coffee hot", "Do the coffee be hot"],
    correct: 2,
    explanation: '"The coffee" equivale a "it", então usamos "Is".'
  },
  {
    rule: "Na interrogativa do Simple Present do verbo To Be usamos 'Is' (he, she, it), 'Are' (you, we, they) ou 'Am' (I) + sujeito.",
    question: "___ you comfortable with the new schedule?",
    options: ["Does you be comfortable", "Is you comfortable", "Are you comfortable", "Do you be comfortable"],
    correct: 2,
    explanation: '"You" usa "Are" na interrogativa do Simple Present do To Be.'
  },
  {
    rule: "Na interrogativa do Simple Present do verbo To Be usamos 'Is' (he, she, it), 'Are' (you, we, they) ou 'Am' (I) + sujeito.",
    question: "___ the results what you expected?",
    options: ["Does the results be", "Is the results", "Are the results", "Do the results be"],
    correct: 2,
    explanation: '"The results" é plural, então usamos "Are".'
  },
  {
    rule: "Na interrogativa do Simple Present do verbo To Be usamos 'Is' (he, she, it), 'Are' (you, we, they) ou 'Am' (I) + sujeito.",
    question: "___ we allowed to park here?",
    options: ["Does we be allowed", "Is we allowed", "Are we allowed", "Do we be allowed"],
    correct: 2,
    explanation: '"We" usa "Are" na interrogativa do Simple Present do To Be.'
  },
  {
    rule: "Na interrogativa do Simple Present do verbo To Be usamos 'Is' (he, she, it), 'Are' (you, we, they) ou 'Am' (I) + sujeito.",
    question: "___ she the new manager?",
    options: ["Does she be", "Are she", "Is she", "Do she be"],
    correct: 2,
    explanation: '"She" usa "Is" na interrogativa do Simple Present do To Be.'
  },
  {
    rule: "Na interrogativa do Simple Present do verbo To Be usamos 'Is' (he, she, it), 'Are' (you, we, they) ou 'Am' (I) + sujeito.",
    question: "___ they interested in the proposal?",
    options: ["Does they be interested", "Is they interested", "Are they interested", "Do they be interested"],
    correct: 2,
    explanation: '"They" usa "Are" na interrogativa do Simple Present do To Be.'
  },
  {
    rule: "Na interrogativa do Simple Present do verbo To Be usamos 'Is' (he, she, it), 'Are' (you, we, they) ou 'Am' (I) + sujeito.",
    question: "___ I doing this correctly?",
    options: ["Does I be doing", "Are I doing", "Is I doing", "Am I doing"],
    correct: 3,
    explanation: '"I" usa "Am" na interrogativa do Simple Present do To Be.'
  },
  {
    rule: "Na interrogativa do Simple Present do verbo To Be usamos 'Is' (he, she, it), 'Are' (you, we, they) ou 'Am' (I) + sujeito.",
    question: "___ the instructions clear enough for everyone?",
    options: ["Does the instructions be clear", "Is the instructions clear", "Are the instructions clear", "Do the instructions be clear"],
    correct: 2,
    explanation: '"The instructions" é plural, então usamos "Are".'
  },   
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
