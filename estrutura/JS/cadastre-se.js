// script.js

// Pega o formulário pelo ID
const form = document.getElementById('form-cadastro');

// Pega o parágrafo onde vamos exibir mensagens
const mensagem = document.getElementById('mensagem');

// Adiciona um "ouvinte" de evento para o envio do formulário
form.addEventListener('submit', function(event) {
  event.preventDefault(); // Impede que o formulário recarregue a página

  // Captura os valores digitados nos campos, removendo espaços extras com trim()
  const nome = document.getElementById('nome').value.trim();
  const email = document.getElementById('email').value.trim();
  const senha = document.getElementById('senha').value;
  const confirmarSenha = document.getElementById('confirmarSenha').value;

  // Verifica se a senha é igual à confirmação
  if (senha !== confirmarSenha) {
    mensagem.style.color = 'red'; // Define a cor da mensagem para vermelho
    mensagem.textContent = 'As senhas não coincidem!'; // Mostra o erro
    return; // Interrompe a execução do restante da função
  }

  // Aqui poderia ir um código para enviar os dados para um servidor (backend)
  // Exemplo: fetch('https://api.escolagamificada.com/cadastro', { method: 'POST', body: JSON.stringify({ nome, email, senha }) })

  // Se deu tudo certo, mostra mensagem de sucesso
  mensagem.style.color = 'green'; // Cor da mensagem: verde
  mensagem.textContent = `Cadastro realizado com sucesso, ${nome}!`; // Saudação personalizada

  // Limpa os campos do formulário
  form.reset();
});

const senha1 = document.getElementById('senha');
const senha2 = document.getElementById('confirmarSenha');

if (Number(senha1.value) == Number(senha2.value)) {
    alert('As senhas são iguais!');
} else{
    alert('As senhas não são iguais!');
}
document.addEventListener('DOMContentLoaded', () => {
  const senhaInput = document.getElementById('senha');
  const msgSenha = document.getElementById('msgSenha');

  const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/;

  senhaInput.addEventListener('input', () => {
    const senha = senhaInput.value;

    if (!regex.test(senha)) {
      msgSenha.textContent = "A senha precisa conter: mínimo 8 caracteres, letras maiúsculas e minúsculas, números e caracteres especiais.";
    } else {
      msgSenha.textContent = "";
    }
  });
});
