document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.getElementById('login-form');
    const loginMessage = document.getElementById('login-message');

    if (loginForm) {
        loginForm.addEventListener('submit', (event) => {
            event.preventDefault(); // Impede o envio padrão do formulário

            const usernameInput = document.getElementById('username');
            const passwordInput = document.getElementById('password');

            const username = usernameInput.value;
            const password = passwordInput.value;

            // Simulação de login (sem backend por enquanto)
            // Para fins de teste, vamos aceitar "professor" como usuário e "123" como senha
            // e qualquer outro usuário/senha para "aluno"
            if (username === 'professor' && password === '123') {
                loginMessage.textContent = 'Login de professor bem-sucedido!';
                loginMessage.style.color = '#4CAF50'; // Verde para sucesso
                // Redirecionar para a página do professor
                window.location.href = 'teacher-dashboard.html'; // Criaremos esta página depois
            } else if (username && password) { // Qualquer outro usuário/senha é tratado como aluno
                loginMessage.textContent = 'Login de aluno bem-sucedido!';
                loginMessage.style.color = '#4CAF50'; // Verde para sucesso
                // Redirecionar para a página do aluno
                window.location.href = 'student-dashboard.html'; // Criaremos esta página depois
            } else {
                loginMessage.textContent = 'Por favor, preencha usuário e senha.';
                loginMessage.style.color = '#e74c3c'; // Vermelho para erro
            }
        });
    }
});
