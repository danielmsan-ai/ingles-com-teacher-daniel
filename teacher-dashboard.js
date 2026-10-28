import { db } from './firebase-config.js';
import { collection, getDocs } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

document.addEventListener('DOMContentLoaded', () => {
    const loggedInUser = JSON.parse(localStorage.getItem('loggedInUser'));

    if (!loggedInUser || loggedInUser.tipo !== 'professor') {
        alert('Acesso não autorizado. Por favor, faça login como professor.');
        window.location.href = 'index.html';
        return;
    }

    async function debugUsers() {
        try {
            const usersRef = collection(db, 'usuarios');
            const querySnapshot = await getDocs(usersRef);
            console.log('Total de documentos encontrados:', querySnapshot.size);
            querySnapshot.forEach((doc) => {
                console.log('ID:', doc.id, '| Dados:', doc.data());
            });
        } catch (error) {
            console.error('Erro ao buscar usuários:', error);
        }
    }

    debugUsers();
});
