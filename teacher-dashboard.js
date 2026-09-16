document.addEventListener('DOMContentLoaded', () => {
    const loggedInUser = JSON.parse(localStorage.getItem('loggedInUser'));

    // Redireciona se não houver usuário logado ou se não for um professor
    if (!loggedInUser || loggedInUser.type !== 'teacher') {
        alert('Acesso não autorizado. Por favor, faça login como professor.');
        window.location.href = 'index.html';
        return; // Interrompe a execução do script
    }

    const studentListUl = document.querySelector('.student-list ul');
    const frequencyDataDiv = document.querySelector('.frequency-data');

    // Função para carregar e exibir os alunos e suas frequências
    function loadStudentsAndFrequency() {
        const users = JSON.parse(localStorage.getItem('users')) || [];
        const students = users.filter(user => user.type === 'student');

        // Limpa as listas antes de recarregar
        studentListUl.innerHTML = '';
        frequencyDataDiv.innerHTML = '';

        if (students.length === 0) {
            studentListUl.innerHTML = '<p>Nenhum aluno cadastrado ainda.</p>';
            frequencyDataDiv.innerHTML = '<p>Nenhum dado de frequência disponível.</p>';
            return;
        }

        // Exibe os alunos para gerenciamento
        students.forEach(student => {
            const listItem = document.createElement('li');
            listItem.innerHTML = `
                <span>${student.username}</span>
                <button data-student-id="${student.id}">Excluir</button>
            `;
            studentListUl.appendChild(listItem);
        });

        // Adiciona event listeners para os botões de exclusão
        studentListUl.querySelectorAll('button').forEach(button => {
            button.addEventListener('click', (event) => {
                const studentIdToDelete = event.target.dataset.studentId;
                deleteStudent(studentIdToDelete);
            });
        });

        // Exibe os dados de frequência
        students.forEach(student => {
            const frequencyItem = document.createElement('div');
            frequencyItem.classList.add('frequency-item');
            frequencyItem.innerHTML = `
                <span>${student.username}:</span> Acessou ${student.frequency || 0} vez(es).
            `;
            frequencyDataDiv.appendChild(frequencyItem);
        });
    }

    // Função para excluir um aluno
    function deleteStudent(studentId) {
        let users = JSON.parse(localStorage.getItem('users')) || [];
        const updatedUsers = users.filter(user => user.id !== studentId);
        localStorage.setItem('users', JSON.stringify(updatedUsers));
        alert(`Aluno com ID ${studentId} excluído com sucesso!`);
        loadStudentsAndFrequency(); // Recarrega a lista após a exclusão
    }

    // Carrega os dados iniciais
    loadStudentsAndFrequency();
});
