// ===== CONFIGURAÇÃO =====
const ADMIN_EMAIL = "teacherdanielvip@gmail.com";
const ADMIN_PASSWORD = "Gust@vo2017"; // Troque pela sua senha

// ===== BANCO DE DADOS LOCAL (localStorage) =====
function getStudents() {
    return JSON.parse(localStorage.getItem('students') || '[]');
}

function saveStudents(students) {
    localStorage.setItem('students', JSON.stringify(students));
}

function getProgress(email) {
    return JSON.parse(localStorage.getItem('progress_' + email) || '{}');
}

function saveProgress(email, progress) {
    localStorage.setItem('progress_' + email, JSON.stringify(progress));
}

// ===== EXERCÍCIOS DE TEMPOS VERBAIS =====
const exercises = {
    simplePast: [
        {
            rule: "Regra primária: usamos o Simple Past quando colocamos um tempo específico na frase (yesterday, last week, in 2010, etc.)",
            question: "Choose the correct option: 'She ___ to the market last Monday.'",
            options: ["goes", "went", "has gone", "is going"],
            correct: 1,
            explanation: "Usamos 'went' porque 'last Monday' é um tempo específico no passado. Essa é a regra primária do Simple Past."
        },
        {
            rule: "Regra primária: tempo específico no passado indica Simple Past.",
            question: "Choose the correct option: 'They ___ a great movie last night.'",
            options: ["watch", "have watched", "watched", "are watching"],
            correct: 2,
            explanation: "'Last night' é um tempo específico, então usamos o Simple Past: 'watched'."
        },
        {
            rule: "Regra secundária: o Simple Past também é usado para fatos passados distantes que já acabaram completamente.",
            question: "Choose the correct option: 'Leonardo da Vinci ___ the Mona Lisa.'",
            options: ["paints", "has painted", "paint", "painted"],
            correct: 3,
            explanation: "Leonardo da Vinci já faleceu, então o fato está completamente no passado. Usamos 'painted'."
        },
        {
            rule: "Simple Past do verbo To Be: WAS (I, he, she, it) / WERE (you, we, they)",
            question: "Choose the correct option: 'The children ___ very tired after the trip.'",
            options: ["was", "is", "were", "are"],
            correct: 2,
            explanation: "'Children' é plural, então usamos 'were'. Lembre: WERE para you, we, they e substantivos no plural."
        },
        {
            rule: "Simple Past do verbo To Be: WAS (I, he, she, it) / WERE (you, we, they)",
            question: "Choose the correct option: 'The weather ___ beautiful yesterday.'",
            options: ["were", "is", "was", "has been"],
            correct: 2,
            explanation: "'The weather' equivale a 'it', então usamos 'was'. Além disso, 'yesterday' confirma o Simple Past."
        }
    ],
    presentPerfect: [
        {
            rule: "Regra primária: usamos o Present Perfect quando NÃO colocamos um tempo específico na frase.",
            question: "Choose the correct option: 'She ___ to Paris.'",
            options: ["went", "goes", "has gone", "is going"],
            correct: 2,
            explanation: "Sem tempo específico na frase, usamos o Present Perfect: 'has gone'. Não sabemos quando foi."
        },
        {
            rule: "Regra secundária: palavras como 'ever', 'already', 'yet' e 'just' indicam Present Perfect.",
            question: "Choose the correct option: 'Have you ___ tried sushi?'",
            options: ["never", "ever", "already", "yet"],
            correct: 1,
            explanation: "'Ever' é uma das palavras-chave do Present Perfect. A frase pergunta se a pessoa já experimentou sushi alguma vez na vida."
        },
        {
            rule: "Regra secundária: 'already' indica que algo aconteceu antes do esperado. Usamos com Present Perfect.",
            question: "Choose the correct option: 'I have ___ finished my homework.'",
            options: ["yet", "just now", "already", "yesterday"],
            correct: 2,
            explanation: "'Already' é palavra-chave do Present Perfect e indica que a tarefa foi concluída antes do esperado."
        },
        {
            rule: "Regra terciária: o Present Perfect conecta um fato passado com o presente.",
            question: "Choose the correct option: 'She ___ learned to forgive others.' (and she still carries this lesson today)",
            options: ["learned", "was learning", "has learned", "learns"],
            correct: 2,
            explanation: "A aprendizagem aconteceu no passado mas tem conexão com o presente. Usamos 'has learned'."
        }
    ],
    presentPerfectContinuous: [
        {
            rule: "O Present Perfect Continuous é usado para algo que COMEÇOU no passado e CONTINUA no presente.",
            question: "Choose the correct option: 'They ___ TV all day.'",
            options: ["watched", "watch", "have been watching", "are watching"],
            correct: 2,
            explanation: "'All day' indica que a ação começou no passado e ainda continua. Usamos 'have been watching'."
        },
        {
            rule: "O Present Perfect Continuous é formado por: have/has + been + verbo-ing",
            question: "Choose the correct option: 'She ___ English for three years.'",
            options: ["studies", "has been studying", "studied", "is studying"],
            correct: 1,
            explanation: "'For three years' indica duração contínua desde o passado até agora. Usamos 'has been studying'."
        },
        {
            rule: "Palavras como 'for', 'since' e 'all day/week/month' frequentemente acompanham o Present Perfect Continuous.",
            question: "Choose the correct option: 'He ___ since 7 a.m.'",
            options: ["works", "worked", "has been working", "was working"],
            correct: 2,
            explanation: "'Since 7 a.m.' indica o ponto de início de uma ação que continua até agora. Usamos 'has been working'."
        }
    ],
    simplePresent: [
        {
            rule: "Simple Present com he/she/it: lembre-se de adicionar 'S' no final do verbo na terceira pessoa do singular.",
            question: "Choose the correct option: 'He ___ a shower every morning.'",
            options: ["take", "taking", "takes", "took"],
            correct: 2,
            explanation: "'He' é terceira pessoa do singular, então o verbo recebe 'S': 'takes'. Rotina diária = Simple Present."
        },
        {
            rule: "Simple Present é usado para rotinas e fatos. Com he/she/it, o verbo sempre tem 'S'.",
            question: "Choose the correct option: 'She ___ to the supermarket on Fridays.'",
            options: ["go", "went", "is going", "goes"],
            correct: 3,
            explanation: "'She' exige o 'S' no verbo: 'goes'. 'On Fridays' indica rotina, confirmando o Simple Present."
        },
        {
            rule: "Contraste: Simple Present para rotinas permanentes. Present Continuous para situações temporárias.",
            question: "Which sentence describes a TEMPORARY situation?",
            options: [
                "She goes to the supermarket on Fridays.",
                "She is going to the supermarket this Friday.",
                "She went to the supermarket last Friday.",
                "She has gone to the supermarket."
            ],
            correct: 1,
            explanation: "'Is going this Friday' indica uma situação temporária ou específica. O Present Continuous é usado para atividades temporárias."
        }
    ]
};

// ===== CONTROLE DE TELAS =====
function showScreen(screenId) {
    const screens = ['loginScreen', 'adminDashboard', 'studentDashboard', 'exerciseScreen'];
    screens.forEach(id => {
        const el = document.getElementById(id);
        if (el) el.style.display = 'none';
    });
    const target = document.getElementById(screenId);
    if (target) target.style.display = 'block';
}

// ===== LOGIN =====
document.getElementById('loginForm').addEventListener('submit', function(e) {
    e.preventDefault();
    const email = document.getElementById('email').value.trim();
    const password = document.getElementById('password').value.trim();
    const errorMsg = document.getElementById('errorMsg');

    if (email === ADMIN_EMAIL && password === ADMIN_PASSWORD) {
        showScreen('adminDashboard');
        loadAdminDashboard();
        return;
    }

    const students = getStudents();
    const student = students.find(s => s.email === email && s.password === password);

    if (student) {
        if (!student.active) {
            errorMsg.textContent = 'Seu acesso foi desativado. Entre em contato com o Teacher Daniel.';
            return;
        }
        localStorage.setItem('currentStudent', JSON.stringify(student));
        showScreen('studentDashboard');
        loadStudentDashboard(student);
        return;
    }

    errorMsg.textContent = 'Email ou senha incorretos.';
});

// ===== PAINEL DO PROFESSOR =====
function loadAdminDashboard() {
    const students = getStudents();
    const activeCount = students.filter(s => s.active).length;
    const inactiveCount = students.filter(s => !s.active).length;

    document.getElementById('totalStudents').textContent = students.length;
    document.getElementById('activeStudents').textContent = activeCount;
    document.getElementById('inactiveStudents').textContent = inactiveCount;

    renderStudentsTable(students);
}

function renderStudentsTable(students) {
    const tbody = document.getElementById('studentsTableBody');
    if (students.length === 0) {
        tbody.innerHTML = '<tr><td colspan="4" style="text-align:center;color:#888;padding:20px;">Nenhum aluno cadastrado ainda.</td></tr>';
        return;
    }

    tbody.innerHTML = students.map((s, index) => `
        <tr>
            <td>${s.name}</td>
            <td>${s.email}</td>
            <td><span class="badge ${s.active ? 'badge-active' : 'badge-inactive'}">${s.active ? 'Ativo' : 'Inativo'}</span></td>
            <td>
                <button class="btn-toggle ${s.active ? 'btn-deactivate' : 'btn-activate'}" 
                    onclick="toggleStudent(${index})">
                    ${s.active ? 'Desativar' : 'Ativar'}
                </button>
            </td>
        </tr>
    `).join('');
}

function toggleStudent(index) {
    const students = getStudents();
    students[index].active = !students[index].active;
    saveStudents(students);
    loadAdminDashboard();
}

document.getElementById('addStudentForm').addEventListener('submit', function(e) {
    e.preventDefault();
    const name = document.getElementById('newStudentName').value.trim();
    const email = document.getElementById('newStudentEmail').value.trim();
    const password = document.getElementById('newStudentPassword').value.trim();

    if (!name || !email || !password) return;

    const students = getStudents();
    const exists = students.find(s => s.email === email);
    if (exists) {
        alert('Já existe um aluno com este email.');
        return;
    }

    students.push({ name, email, password, active: true, level: 'beginner' });
    saveStudents(students);
    loadAdminDashboard();

    document.getElementById('newStudentName').value = '';
    document.getElementById('newStudentEmail').value = '';
    document.getElementById('newStudentPassword').value = '';
});

document.getElementById('adminLogout').addEventListener('click', function() {
    showScreen('loginScreen');
});

// ===== PAINEL DO ALUNO =====
function loadStudentDashboard(student) {
    document.getElementById('studentName').textContent = 'Olá, ' + student.name + '!';

    const progress = getProgress(student.email);
    const modules = [
        { key: 'simplePast', title: 'Simple Past', icon: '⏮️', desc: 'Ações concluídas no passado' },
        { key: 'presentPerfect', title: 'Present Perfect', icon: '🔗', desc: 'Passado conectado ao presente' },
        { key: 'presentPerfectContinuous', title: 'Present Perfect Continuous', icon: '⏳', desc: 'Ação que continua até agora' },
        { key: 'simplePresent', title: 'Simple Present', icon: '🔄', desc: 'Rotinas e fatos' }
    ];

    const grid = document.getElementById('modulesGrid');
    grid.innerHTML = modules.map(m => {
        const p = progress[m.key] || { completed: 0, total: exercises[m.key].length };
        const pct = Math.round((p.completed / exercises[m.key].length) * 100);
        return `
            <div class="module-card" onclick="startExercise('${m.key}')">
                <div class="icon">${m.icon}</div>
                <h4>${m.title}</h4>
                <p>${m.desc}</p>
                <div class="progress-bar-container">
                    <div class="progress-bar" style="width:${pct}%"></div>
                </div>
                <p style="font-size:0.8rem;color:#888;margin-top:6px;">${pct}% concluído</p>
            </div>
        `;
    }).join('');
}

document.getElementById('studentLogout').addEventListener('click', function() {
    localStorage.removeItem('currentStudent');
    showScreen('loginScreen');
});

// ===== EXERCÍCIOS =====
let currentModule = null;
let currentIndex = 0;
let answered = false;

function startExercise(moduleKey) {
    currentModule = moduleKey;
    currentIndex = 0;
    answered = false;
    showScreen('exerciseScreen');

    const titles = {
        simplePast: 'Simple Past',
        presentPerfect: 'Present Perfect',
        presentPerfectContinuous: 'Present Perfect Continuous',
        simplePresent: 'Simple Present'
    };
    document.getElementById('exerciseTitle').textContent = titles[moduleKey];
    renderExercise();
}

function renderExercise() {
    const list = exercises[currentModule];
    const ex = list[currentIndex];
    answered = false;

    document.getElementById('exerciseProgress').textContent = `Questão ${currentIndex + 1} de ${list.length}`;
    document.getElementById('ruleBox').textContent = ex.rule;
    document.getElementById('questionText').textContent = ex.question;

    const optionsDiv = document.getElementById('optionsDiv');
    optionsDiv.innerHTML = ex.options.map((opt, i) => `
        <button class="option-btn" onclick="selectOption(${i})">${opt}</button>
    `).join('');

    document.getElementById('feedbackBox').style.display = 'none';
    document.getElementById('btnNext').style.display = 'none';
}

function selectOption(index) {
    if (answered) return;
    answered = true;

    const ex = exercises[currentModule][currentIndex];
    const buttons = document.querySelectorAll('.option-btn');
    const feedbackBox = document.getElementById('feedbackBox');
    const btnNext = document.getElementById('btnNext');

    buttons.forEach((btn, i) => {
        btn.disabled = true;
        if (i === ex.correct) btn.classList.add('correct');
        else if (i === index) btn.classList.add('wrong');
    });

    const student = JSON.parse(localStorage.getItem('currentStudent'));
    const progress = getProgress(student.email);
    if (!progress[currentModule]) progress[currentModule] = { completed: 0, total: exercises[currentModule].length };

    if (index === ex.correct) {
        feedbackBox.className = 'feedback-box feedback-correct';
        feedbackBox.textContent = '✅ Correto! ' + ex.explanation;
        progress[currentModule].completed = Math.min(
            progress[currentModule].completed + 1,
            exercises[currentModule].length
        );
    } else {
        feedbackBox.className = 'feedback-box feedback-wrong';
        feedbackBox.textContent = '❌ Não foi dessa vez. ' + ex.explanation;
    }

    feedbackBox.style.display = 'block';
    saveProgress(student.email, progress);

    if (currentIndex < exercises[currentModule].length - 1) {
        btnNext.textContent = 'Próxima questão →';
    } else {
        btnNext.textContent = 'Concluir módulo ✓';
    }
    btnNext.style.display = 'block';
}

document.getElementById('btnNext').addEventListener('click', function() {
    if (currentIndex < exercises[currentModule].length - 1) {
        currentIndex++;
        renderExercise();
    } else {
        const student = JSON.parse(localStorage.getItem('currentStudent'));
        showScreen('studentDashboard');
        loadStudentDashboard(student);
    }
});

document.getElementById('btnBack').addEventListener('click', function() {
    const student = JSON.parse(localStorage.getItem('currentStudent'));
    showScreen('studentDashboard');
    loadStudentDashboard(student);
});
