import { auth, db } from "./firebase-config.js";
import { signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";
import { doc, getDoc } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.getElementById('login-form');
    const loginMessage = document.getElementById('login-message');

    if (loginForm) {
        loginForm.addEventListener('submit', async (event) => {
            event.preventDefault();
            loginMessage.textContent = '';

            const email = document.getElementById('email').value.trim();
            const password = document.getElementById('password').value;

            try {
                const userCredential = await signInWithEmailAndPassword(auth, email, password);
                const user = userCredential.user;

                const userDocRef = doc(db, "usuarios", user.uid);
                const userDocSnap = await getDoc(userDocRef);

                if (!userDocSnap.exists()) {
                    loginMessage.textContent = 'Usuário não encontrado no sistema.';
                    loginMessage.style.color = '#e74c3c';
                    return;
                }

                const userData = userDocSnap.data();

                localStorage.setItem('loggedInUser', JSON.stringify({
                    uid: user.uid,
                    nome: userData.nome,
                    email: userData.email,
                    tipo: userData.tipo
                }));

                loginMessage.textContent = `Login de ${userData.tipo} bem-sucedido!`;
                loginMessage.style.color = '#4CAF50';

                if (userData.tipo === 'professor') {
                    window.location.href = 'teacher-dashboard.html';
                } else {
                    window.location.href = 'student-dashboard.html';
                }

            } catch (error) {
                loginMessage.style.color = '#e74c3c';
                if (error.code === 'auth/invalid-credential' ||
                    error.code === 'auth/wrong-password' ||
                    error.code === 'auth/user-not-found') {
                    loginMessage.textContent = 'E-mail ou senha incorretos.';
                } else if (error.code === 'auth/invalid-email') {
                    loginMessage.textContent = 'E-mail inválido.';
                } else {
                    loginMessage.textContent = 'Erro ao fazer login. Tente novamente.';
                }
            }
        });
    }
});
