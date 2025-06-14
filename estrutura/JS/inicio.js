// Obtém os elementos do botão e da sidebar
const menuToggle = document.getElementById('menuToggle');
const sidebar = document.getElementById('sidebar');
const body = document.body;

// Ao clicar no botão de menu...
menuToggle.addEventListener('click', () => {
  // Alterna a classe 'open' na sidebar
  sidebar.classList.toggle('open');

  // Alterna a classe no body para permitir mover outros elementos junto com a sidebar
  body.classList.toggle('sidebar-open');
});
