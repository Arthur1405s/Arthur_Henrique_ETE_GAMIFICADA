// Menu lateral
const menuToggle = document.getElementById('menuToggle');
const sidebar = document.getElementById('sidebar');
const body = document.body;

menuToggle.addEventListener('click', () => {
  sidebar.classList.toggle('open');
  body.classList.toggle('sidebar-open');
});

// Carrossel
const caixas = [document.getElementById('conteudo0'), document.getElementById('conteudo1')];
const infos = [document.getElementById('info0'), document.getElementById('info1')];
let index = 0;

function atualizarConteudo() {
  caixas.forEach((caixa, i) => {
    caixa.style.display = i === index ? 'block' : 'none';
  });
  infos.forEach((info, i) => {
    info.style.display = i === index ? 'block' : 'none';
  });
}

document.querySelector('.seta-esquerda').addEventListener('click', () => {
  index = (index - 1 + caixas.length) % caixas.length;
  atualizarConteudo();
});

document.querySelector('.seta-direita').addEventListener('click', () => {
  index = (index + 1) % caixas.length;
  atualizarConteudo();
});

atualizarConteudo();
