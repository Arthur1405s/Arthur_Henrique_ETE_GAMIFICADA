document.getElementById('form-cadastro').addEventListener('submit', async function (event) {
  event.preventDefault();

  const tipoUsuario = document.getElementById('tipoUsuario').value;
  const nome = document.getElementById('nome').value.trim();
  const email = document.getElementById('email').value.trim();
  const senha = document.getElementById('senha').value;
  const confirmarSenha = document.getElementById('confirmarSenha').value;
  const mensagem = document.getElementById('mensagem');

  // Limpa mensagens anteriores
  mensagem.textContent = '';
  document.getElementById('mensagem-senha').textContent = '';
  document.getElementById('mensagem-confirmar-senha').textContent = '';

  // Validação simples
  if (senha.length < 6) {
    document.getElementById('mensagem-senha').textContent = 'A senha deve ter pelo menos 6 caracteres.';
    return;
  }

  if (senha !== confirmarSenha) {
    document.getElementById('mensagem-confirmar-senha').textContent = 'As senhas não coincidem.';
    return;
  }

  try {
    const resposta = await fetch('http://localhost:3000/cadastro', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ nome, email, senha, tipoUsuario })
    });

    const dados = await resposta.json();

    if (resposta.ok) {
      mensagem.style.color = 'green';
      mensagem.textContent = dados.mensagem;

      // Redireciona após 1.5s
      setTimeout(() => {
        window.location.href = '../HTML/login.html';
      }, 1500);
    } else {
      mensagem.style.color = 'red';
      mensagem.textContent = dados.mensagem || 'Erro ao cadastrar.';
    }
  } catch (erro) {
    console.error('Erro ao enviar requisição:', erro);
    mensagem.style.color = 'red';
    mensagem.textContent = 'Erro de conexão com o servidor.';
  }
});
