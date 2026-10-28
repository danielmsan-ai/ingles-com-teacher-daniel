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

            querySnapshot.forEach((doc) => {
                const student = doc.data();
                const listItem = document.createElement('li');
                listItem.innerHTML = `<span>${student.nome} (${student.email})</span>`;
                studentListUl.appendChild(listItem);
            });

            frequencyDataDiv.innerHTML = '<p>Em breve: o progresso de cada aluno aparecerá aqui.</p>';

        } catch (error) {
            console.error('Erro ao carregar alunos:', error);
            studentListUl.innerHTML = '<p>Erro ao carregar a lista de alunos.</p>';
        }
    }

    loadStudents();
});
