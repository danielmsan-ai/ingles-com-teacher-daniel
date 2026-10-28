import { db } from './firebase-config.js';
import { collection, query, where, getDocs } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

document.addEventListener('DOMContentLoaded', () => {
    const loggedInUser = JSON.parse(localStorage.getItem('loggedInUser'));

    if (!loggedInUser || loggedInUser.tipo !== 'professor') {
        alert('Acesso não autorizado. Por favor, faça login como professor.');
        window.location.href = 'index.html';
        return;
    }

    const studentListUl = document.querySelector('.student-list ul');
    const frequencyDataDiv = document.querySelector('.frequency-data');

    async function loadStudents() {
        studentListUl.innerHTML = '<p>Carregando alunos...</p>';
        frequencyDataDiv.innerHTML = '';

        try {
            const usersRef = collection(db, 'usuarios');
            const q = query(usersRef, where('tipo', '==', 'aluno'));
            const querySnapshot = await getDocs(q);

            studentListUl.innerHTML = '';

            if (querySnapshot.empty) {
                studentListUl.innerHTML = '<p>Nenhum aluno cadastrado ainda.</p>';
                frequencyDataDiv.innerHTML = '<p>Nenhum dado de frequência disponível.</p>';
                return;
            }

            for (const studentDoc of querySnapshot.docs) {
                const student = studentDoc.data();
                const studentId = studentDoc.id;

                const listItem = document.createElement('li');
                listItem.classList.add('student-item');
                listItem.innerHTML = `<strong>${student.nome}</strong> (${student.email})`;

                const progressRef = collection(db, 'usuarios', studentId, 'progresso');
                const progressSnapshot = await getDocs(progressRef);

                if (progressSnapshot.empty) {
                    const noProgress = document.createElement('p');
                    noProgress.textContent = 'Nenhum progresso registrado ainda.';
                    listItem.appendChild(noProgress);
                } else {
                    const progressList = document.createElement('ul');
                    progressSnapshot.forEach((progressDoc) => {
                        const topicName = progressDoc.id;
                        const data = progressDoc.data();
                        const correct = data.correct || 0;
                        const incorrect = data.incorrect || 0;
                        const total = correct + incorrect;

                        const topicItem = document.createElement('li');
                        topicItem.textContent = `${topicName}: ${correct} acertos, ${incorrect} erros (${total} respondidas)`;
                        progressList.appendChild(topicItem);
                    });
                    listItem.appendChild(progressList);
                }

                studentListUl.appendChild(listItem);
            }

            frequencyDataDiv.innerHTML = '';

        } catch (error) {
            console.error('Erro ao carregar alunos:', error);
            studentListUl.innerHTML = '<p>Erro ao carregar a lista de alunos.</p>';
        }
    }

    loadStudents();
});
