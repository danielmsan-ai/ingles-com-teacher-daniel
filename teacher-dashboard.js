document.addEventListener('DOMContentLoaded', () => {
    const loggedInUser = JSON.parse(localStorage.getItem('loggedInUser'));

    if (!loggedInUser || loggedInUser.type !== 'teacher') {
        alert('Acesso não autorizado. Por favor, faça login como professor.');
        window.location.href = 'index.html';
        return;
    }

    const studentListUl = document.querySelector('.student-list ul');
    const frequencyDataDiv = document.querySelector('.frequency-data');

    function loadStudentsAndFrequency() {
        const users = JSON.parse(localStorage.getItem('users')) || [];
        const students = users.filter(user => user.type === 'student');

        studentListUl.innerHTML = '';
        frequencyDataDiv.innerHTML = '';

        if (students.length === 0) {
            studentListUl.innerHTML = '<p>Nenhum aluno cadastrado ainda.</p>';
            frequencyDataDiv.innerHTML = '<p>Nenhum dado de frequência disponível.</p>';
            return;
        }

        students.forEach(student => {
            const listItem = document.createElement('li');
            listItem.innerHTML = `
                <span>${student.username}</span>
                <button data-student-id="${student.id}">Excluir</button>
            `;
            studentListUl.appendChild(listItem);
        });

        studentListUl.querySelectorAll('button').forEach(button => {
            button.addEventListener('click', (event) => {
                const studentIdToDelete = event.target.dataset.studentId;
                deleteStudent(studentIdToDelete);
            });
        });

        students.forEach(student => {
            const frequencyItem = document.createElement('div');
            frequencyItem.classList.add('frequency-item');

            let progressHtml = '<p style="margin: 5px 0 0 15px; font-size: 0.9em; color: #555;">Nenhum exercício realizado ainda.</p>';

            if (student.progress && Object.keys(student.progress).length > 0) {
                progressHtml = '';
                for (const topic in student.progress) {
                    const data = student.progress[topic];
                    const total = data.correct + data.incorrect;
                    const percentage = total > 0 ? ((data.correct / total) * 100).toFixed(1) : 0;
                    progressHtml += `
                        <p style="margin: 5px 0 0 15px; font-size: 0.9em; color: #555;">
                            <strong>${topic}:</strong> ${data.correct} corretas, ${data.incorrect} incorretas (${percentage}% de acerto, ${total} exercícios respondidos)
                        </p>
                    `;
                }
            }

            frequencyItem.innerHTML = `
                <p><strong>${student.username}</strong>: acessou ${student.frequency || 0} vez(es).</p>
                ${progressHtml}
            `;
            frequencyDataDiv.appendChild(frequencyItem);
        });
    }

    function deleteStudent(studentId) {
        let users = JSON.parse(localStorage.getItem('users')) || [];
        const updatedUsers = users.filter(user => user.id !== studentId);
        localStorage.setItem('users', JSON.stringify(updatedUsers));
        alert(`Aluno com ID ${studentId} excluído com sucesso!`);
        loadStudentsAndFrequency();
    }

    loadStudentsAndFrequency();
});
