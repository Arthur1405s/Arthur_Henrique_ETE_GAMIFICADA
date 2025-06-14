// Aguarda o carregamento do DOM
document.addEventListener('DOMContentLoaded', () => {
  // Seleciona elementos importantes
  const form = document.getElementById('form-cadastro');
  const mensagemGeral = document.getElementById('mensagem');
  const senhaInput = document.getElementById('senha');
  const confirmarSenhaInput = document.getElementById('confirmarSenha');
  const mensagemSenha = document.getElementById('mensagem-senha');
  const mensagemConfirmarSenha = document.getElementById('mensagem-confirmar-senha');

  // Regex para validar senha forte:
  // Pelo menos 8 caracteres
  // Pelo menos 1 letra minúscula
  // Pelo menos 1 letra maiúscula
  // Pelo menos 1 número
  // Pelo menos 1 caractere especial (não alfanumérico)
  const regexSenhaForte = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/;

  // Validação em tempo real da senha (ao digitar)
  senhaInput.addEventListener('input', () => {
    const senha = senhaInput.value;

    if (!regexSenhaForte.test(senha)) {
      mensagemSenha.textContent = 'A senha deve ter 8+ caracteres, letra maiúscula, minúscula, número e caractere especial.';
    } else {
      mensagemSenha.textContent = '';
    }

    // Também limpa a mensagem de confirmação se senha mudar
    mensagemConfirmarSenha.textContent = '';
  });

  // Validação em tempo real da confirmação da senha
  confirmarSenhaInput.addEventListener('input', () => {
    if (confirmarSenhaInput.value !== senhaInput.value) {
      mensagemConfirmarSenha.textContent = 'As senhas não coincidem!';
    } else {
      mensagemConfirmarSenha.textContent = '';
    }
  });

  // Ao enviar o formulário
  form.addEventListener('submit', (event) => {
    event.preventDefault(); // Previne envio padrão (reload)

    const nome = document.getElementById('nome').value.trim();
    const email = document.getElementById('email').value.trim();
    const tipoUsuario = document.getElementById('tipoUsuario').value;
    const senha = senhaInput.value;
    const confirmarSenha = confirmarSenhaInput.value;

    // Verifica senha forte
    if (!regexSenhaForte.test(senha)) {
      mensagemGeral.style.color = 'red';
      mensagemGeral.textContent = 'Senha fraca! Atenda aos requisitos mínimos.';
      senhaInput.focus();
      return;
    }

    // Verifica se as senhas coincidem
    if (senha !== confirmarSenha) {
      mensagemGeral.style.color = 'red';
      mensagemGeral.textContent = 'As senhas não coincidem!';
      confirmarSenhaInput.focus();
      return;
    }

    // Verifica se o tipo de usuário foi selecionado
    if (!tipoUsuario) {
      mensagemGeral.style.color = 'red';
      mensagemGeral.textContent = 'Por favor, selecione o tipo de usuário.';
      document.getElementById('tipoUsuario').focus();
      return;
    }

    // Aqui você pode enviar os dados para o backend via fetch, axios, etc.
    // Exemplo fictício:
    /*
    fetch('/api/cadastrar', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ nome, email, tipoUsuario, senha })
    })
    .then(res => res.json())
    .then(data => {
      mensagemGeral.style.color = 'green';
      mensagemGeral.textContent = `Cadastro realizado com sucesso, ${nome}!`;
      form.reset();
    })
    .catch(err => {
      mensagemGeral.style.color = 'red';
      mensagemGeral.textContent = 'Erro ao cadastrar, tente novamente.';
    });
    */

    // Simulação de sucesso:
    mensagemGeral.style.color = 'green';
    mensagemGeral.textContent = `Cadastro realizado com sucesso, ${nome}!`;

    // Limpa formulário
    form.reset();
    // Limpa mensagens de erro
    mensagemSenha.textContent = '';
    mensagemConfirmarSenha.textContent = '';
  });
});
