document.addEventListener('DOMContentLoaded', () => {
    const loggedInUser = JSON.parse(localStorage.getItem('loggedInUser'));

    // Redireciona se não houver usuário logado ou se não for um aluno
    if (!loggedInUser || loggedInUser.type !== 'student') {
        alert('Acesso não autorizado. Por favor, faça login como aluno.');
        window.location.href = 'index.html';
        return; // Interrompe a execução do script
    }

    // Opcional: Exibir o nome do aluno logado
    // const welcomeMessage = document.querySelector('.dashboard-container h2');
    // if (welcomeMessage) {
    //     welcomeMessage.textContent = `Olá, ${loggedInUser.username}! Escolha um tópico para praticar:`;
    // }

    const topicButtons = document.querySelectorAll('.topic-button');

    topicButtons.forEach(button => {
        button.addEventListener('click', (event) => {
            const topic = button.textContent; // Pega o texto do botão como o nome do tópico
            console.log(`Aluno ${loggedInUser.username} clicou no tópico: ${topic}`);

            // Futuramente, aqui chamaremos uma função para carregar os exercícios
            // Por exemplo: loadExercises(topic, loggedInUser.id);
        });
    });
});
