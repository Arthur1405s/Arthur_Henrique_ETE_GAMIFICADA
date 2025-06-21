/* ===========================================================
 *  cadastre‑se.js  –  LÓGICA COMPLETA DO FORMULÁRIO DE CADASTRO
 *  -----------------------------------------------------------
 *  • Valida senha forte em tempo real (8+ car., maiúsc., minúsc.,
 *    número e caractere especial)                          ✔
 *  • Verifica se confirmação de senha coincide             ✔
 *  • Valida formato de e‑mail (regex simples)              ✔
 *  • Garante que o tipo de usuário foi selecionado         ✔
 *  • Mostra mensagens claras de erro / sucesso             ✔
 *  • Totalmente comentado passo a passo                    ✔
 * ===========================================================
 */

document.addEventListener('DOMContentLoaded', () => {
  /* ---------- ELEMENTOS DO DOM ---------- */
  const form                = document.getElementById('form-cadastro');
  const msgGeral            = document.getElementById('mensagem');

  const nomeInput           = document.getElementById('nome');
  const emailInput          = document.getElementById('email');
  const tipoSelect          = document.getElementById('tipoUsuario');

  const senhaInput          = document.getElementById('senha');
  const confSenhaInput      = document.getElementById('confirmarSenha');

  const msgSenha            = document.getElementById('mensagem-senha');
  const msgConfirmaSenha    = document.getElementById('mensagem-confirmar-senha');

  /* ---------- REGEX DE VALIDAÇÃO ---------- */
  // Senha forte: 8+ chars, 1 minúsc., 1 maiúsc., 1 número, 1 símbolo
  const regexSenhaForte = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/;
  // E‑mail simples (usuario@dominio.ext)
  const regexEmail      = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  /* =========================================================
   *  VALIDAÇÃO EM TEMPO REAL –  SENHA
   * =======================================================*/
  senhaInput.addEventListener('input', () => {
    const senha = senhaInput.value;

    if (!regexSenhaForte.test(senha)) {
      msgSenha.textContent =
        'A senha precisa de 8+ caracteres, maiúscula, minúscula, número e símbolo.';
    } else {
      msgSenha.textContent = '';
    }

    /* Se a senha mudou, limpe aviso de confirmação */
    msgConfirmaSenha.textContent = '';
  });

  /* =========================================================
   *  VALIDAÇÃO EM TEMPO REAL –  CONFIRMAÇÃO DE SENHA
   * =======================================================*/
  confSenhaInput.addEventListener('input', () => {
    if (confSenhaInput.value !== senhaInput.value) {
      msgConfirmaSenha.textContent = 'As senhas não coincidem!';
    } else {
      msgConfirmaSenha.textContent = '';
    }
  });

  /* =========================================================
   *  ENVIO DO FORMULÁRIO
   * =======================================================*/
  form.addEventListener('submit', (event) => {
    event.preventDefault(); // Evita recarregar a página

    /* --- COLETA DE DADOS --- */
    const nome        = nomeInput.value.trim();
    const email       = emailInput.value.trim();
    const tipoUsuario = tipoSelect.value;
    const senha       = senhaInput.value;
    const confirmar   = confSenhaInput.value;

    /* --- VALIDAÇÕES MANUAIS --- */

    /* 1. E‑mail válido? */
    if (!regexEmail.test(email)) {
      msgGeral.style.color = 'red';
      msgGeral.textContent = 'Informe um e‑mail válido.';
      emailInput.focus();
      return;
    }

    /* 2. Senha forte? */
    if (!regexSenhaForte.test(senha)) {
      msgGeral.style.color = 'red';
      msgGeral.textContent = 'Senha fraca! Siga os requisitos.';
      senhaInput.focus();
      return;
    }

    /* 3. Senhas iguais? */
    if (senha !== confirmar) {
      msgGeral.style.color = 'red';
      msgGeral.textContent = 'As senhas não coincidem!';
      confSenhaInput.focus();
      return;
    }

    /* 4. Tipo de usuário selecionado? */
    if (!tipoUsuario) {
      msgGeral.style.color = 'red';
      msgGeral.textContent = 'Selecione o tipo de usuário.';
      tipoSelect.focus();
      return;
    }

    /* ---------- AQUI VAI A CHAMADA AO BACK‑END ---------- */
    // Exemplo (fictício):
    /*
    fetch('/api/cadastrar', {
      method : 'POST',
      headers: { 'Content-Type': 'application/json' },
      body   : JSON.stringify({ nome, email, tipoUsuario, senha })
    })
      .then(res  => res.json())
      .then(data => {
        msgGeral.style.color = 'green';
        msgGeral.textContent = `Cadastro realizado com sucesso, ${nome}!`;
        form.reset();
      })
      .catch(err => {
        msgGeral.style.color = 'red';
        msgGeral.textContent = 'Erro no cadastro. Tente novamente.';
      });
    */

    /* ----- SIMULAÇÃO DE SUCESSO (frontend) ----- */
    msgGeral.style.color = 'green';
    msgGeral.textContent = `Cadastro realizado com sucesso, ${nome}!`;
    form.reset();                      // Limpa o formulário
    msgSenha.textContent        = '';  // Limpa avisos
    msgConfirmaSenha.textContent = '';
  });
});
