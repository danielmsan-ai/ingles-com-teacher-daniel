document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.getElementById('login-form');
    const loginMessage = document.getElementById('login-message');

    // Função para inicializar usuários no localStorage se não existirem
    function initializeUsers() {
        if (!localStorage.getItem('users')) {
            const defaultUsers = [
                { username: 'professor', password: '123', type: 'teacher', id: 'prof1' },
                { username: 'aluno1', password: 'abc', type: 'student', id: 'stu1', frequency: 0 },
                { username: 'aluno2', password: 'def', type: 'student', id: 'stu2', frequency: 0 }
            ];
            localStorage.setItem('users', JSON.stringify(defaultUsers));
        }
    }

    initializeUsers(); // Chama a função para garantir que os usuários existam

    if (loginForm) {
        loginForm.addEventListener('submit', (event) => {
            event.preventDefault();

            const usernameInput = document.getElementById('username');
            const passwordInput = document.getElementById('password');

            const username = usernameInput.value;
            const password = passwordInput.value;

            const users = JSON.parse(localStorage.getItem('users'));
            const foundUser = users.find(user => user.username === username && user.password === password);

            if (foundUser) {
                loginMessage.textContent = `Login de ${foundUser.type} bem-sucedido!`;
                loginMessage.style.color = '#4CAF50';

                // Armazena o usuário logado e seu tipo no localStorage
                localStorage.setItem('loggedInUser', JSON.stringify(foundUser));

                if (foundUser.type === 'teacher') {
                    window.location.href = 'teacher-dashboard.html';
                } else { // type === 'student'
                    // Atualiza a frequência do aluno ao logar
                    foundUser.frequency = (foundUser.frequency || 0) + 1;
                    localStorage.setItem('users', JSON.stringify(users)); // Salva a lista atualizada
                    window.location.href = 'student-dashboard.html';
                }
            } else {
                loginMessage.textContent = 'Usuário ou senha incorretos.';
                loginMessage.style.color = '#e74c3c';
            }
        });
    }
});
