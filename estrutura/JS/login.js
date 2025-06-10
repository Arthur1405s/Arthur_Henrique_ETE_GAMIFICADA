import { signInWithEmailAndPassword, getAuth } from "https://www.gstatic.com/firebasejs/11.6.0/firebase-auth.js";

// Função de login
async function login(email, senha) {
    const auth = getAuth();
    try {
        const userCredential = await signInWithEmailAndPassword(auth, email, senha);
        // Usuário autenticado
        carregarSaldo(); // Carrega o saldo após login
    } catch (error) {
        console.error('Erro de login: ', error);
    }
}