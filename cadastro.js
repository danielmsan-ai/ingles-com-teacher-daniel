import { auth, db } from "./firebase-config.js";
import { createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";
import { doc, setDoc } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

const form = document.getElementById("cadastro-form");
const message = document.getElementById("cadastro-message");

form.addEventListener("submit", async (event) => {
  event.preventDefault();
  message.textContent = "";

  const nome = document.getElementById("nome").value.trim();
  const email = document.getElementById("email").value.trim();
  const senha = document.getElementById("senha").value;

  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, senha);
    const user = userCredential.user;

    await setDoc(doc(db, "usuarios", user.uid), {
      nome: nome,
      email: email,
      tipo: "aluno"
    });

    message.style.color = "#4CAF50";
    message.textContent = "Conta criada com sucesso! Redirecionando para o login...";

    setTimeout(() => {
      window.location.href = "index.html";
    }, 2000);

  } catch (error) {
    message.style.color = "#e74c3c";
    if (error.code === "auth/email-already-in-use") {
      message.textContent = "Este e-mail já está cadastrado.";
    } else if (error.code === "auth/weak-password") {
      message.textContent = "A senha precisa ter pelo menos 6 caracteres.";
    } else if (error.code === "auth/invalid-email") {
      message.textContent = "E-mail inválido.";
    } else {
      message.textContent = "Erro ao criar conta. Tente novamente.";
    }
  }
});
