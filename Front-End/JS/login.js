// Aguarda o carregamento completo do DOM
document.addEventListener('DOMContentLoaded', function () {
  // Seleciona o formulário e a tag de mensagem de erro
  const form = document.getElementById('form-login');
  const mensagemErro = document.getElementById('mensagem-erro');

  // Escuta o envio do formulário
  form.addEventListener('submit', async function (event) {
    event.preventDefault(); // Impede o envio tradicional

    // Coleta os valores dos campos de email e senha
    const email = document.getElementById('email').value.trim();
    const senha = document.getElementById('senha').value;

    // Limpa a mensagem anterior
    mensagemErro.textContent = '';

    try {
      // Envia a requisição de login
      const resposta = await fetch('http://localhost:3000/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, senha }) // Envia os dados do formulário
      });

      // Converte a resposta para JSON
      const dados = await resposta.json();

      // Verifica se o login foi bem-sucedido
      if (resposta.ok) {
        localStorage.setItem('usuario', JSON.stringify(dados)); // Armazena o usuário logado
        window.location.href = '../HTML/inicio.html'; // Redireciona para a página inicial
      } else {
        // Mostra mensagem de erro na interface
        mensagemErro.textContent = dados.mensagem || 'Email ou senha incorretos.';
      }
    } catch (erro) {
      // Exibe erro de conexão
      console.error('Erro ao fazer login:', erro);
      mensagemErro.textContent = 'Erro ao conectar com o servidor.';
    }
  });
});
