const menuToggle = document.getElementById('menuToggle');
const sidebar = document.getElementById('sidebar');
const painelStatus = document.getElementById('painelStatus');

menuToggle.addEventListener('click', () => {
  sidebar.classList.toggle('open');
  painelStatus.style.left = sidebar.classList.contains('open') ? '290px' : '70px';
});

const eventos = [
  { 
    titulo: "Taça das Casas", 
    imagem: "../img/quadriboll.png",
    descricao: "O taça das casas chega com todo o gás para edição 2025.2, nesse evento, os bruxos GilRodriguenses embarcam em suas vassouras e unem-se com sua casa para encarar desafios pesados que contabilizam pontos no evento: Livro da Hermione, X1 da Sala Precisa, Tribruxo, Mapa do Maroto, e o grande Quadriboll, ôloko! A média trimestral também bonificam pontus no evento, e em contrapartida, as punioções fazem com que a casa se prejudique."
  },
  { 
    titulo: "Gincana Ecológica", 
    imagem: "../img/gin-eco.jpg",
    descricao: "A gincana ecológica chega com tudo para conscientização ambiental, nesse evento as casas entram no clima de competição, mas no fundo, há uma mensagem maior a ser empregada: Devemos sempre cuidar do que está ao nosso redor. Os desafios nesses eventos são: Produção Textual, Produção Audiovisual, Projeto cienífico, Produção de Trends, Carrosel de conscientização, Guardiões da Natureza, Cestas Básicas, Card Game, Manifestação Artístico Cultural e o Restaura Natureza."
  },
  { 
    titulo: "Leiturarte", 
    imagem: "../img/leiturarte.webp",
    descricao: "O Leiturarte é o evento que faz com que os alunos unam a Leitura, Arte e a Criatividade, A escolha e boa leitura de um livro, o roteiro bem elaborado, os ensaios, as trilhas sonoras e o cenário são primordiais para um bom espetáculo artístico. Os jurados avaliarão cada peça e, baseado em suas pontuações teremos um grande vencedor, que levará para sua casa um trófeu e a consagração de Grandes Campeões do Leiturarte. "
  },
  { 
    titulo: "Saberes Urbanos", 
    imagem: "../img/saberes.png",
    descricao: "No evento Saberes Urbanos, os alunos do 2- ano embarcam em uma jornada de descobertas pelos patrimônios históricos e culturais de Recife. Organizados em grupos, os participantes exploram pontos importantes da cidade, aprofundando seus conhecimentos sobre a história, cultura e riquezas do nosso estado. É uma experiência que conecta o aprendizado à vivência real, valorizando a identidade pernambucana."
  },
  { 
    titulo: "The Masked Singer", 
    imagem: "../img/the masked.png",
    descricao: "Inspirado no famoso show internacional, O  The Masked Singer traz um desafio musical cheio de mistério e diversão! Um aluno sobe ao palco totalmente mascarado, com figurino criativo e cenário digno de espetáculo, para cantar uma música em inglês. O público precisa usar seus sentidos e intuição para tentar adivinhar quem está por trás da máscara — mas sem nenhuma dica fácil! Voz, presença de palco e suspense tomam conta desse evento inesquecível."
  },
  { 
    titulo: "Intergil", 
    imagem: "../img/intergi.png",
    descricao: "O Intergil é o maior evento da ETE Gil Rodrigues, reunindo mais de 60 modalidades que vão de desafios físicos a provas intelectuais e criativas. Cada aluno deve participar de pelo menos 2 modalidades, podendo se inscrever em até 3, garantindo envolvimento, diversidade e trabalho em equipe. É um evento que une competição, estratégia e diversão — tudo isso com o espírito das casas e a vibração de uma verdadeira arena escolar."
  }
];

let eventoAtual = 0;

function mudarEvento(direcao) {
  eventoAtual += direcao;

  if (eventoAtual < 0) eventoAtual = eventos.length - 1;
  if (eventoAtual >= eventos.length) eventoAtual = 0;

  const titulo = document.getElementById("tituloEvento");
  const imagem = document.getElementById("imagemEvento");
  const descricao = document.getElementById("descricaoEvento");

  titulo.textContent = eventos[eventoAtual].titulo;
  imagem.src = eventos[eventoAtual].imagem;
  descricao.textContent = eventos[eventoAtual].descricao;
}

// Inicializar com o primeiro evento
document.addEventListener("DOMContentLoaded", () => {
  mudarEvento(0);
});

const botaoLogout = document.getElementById('botaoLogout');
const modalLogout = document.getElementById('modalLogout');
const confirmarLogout = document.getElementById('confirmarLogout');
const cancelarLogout = document.getElementById('cancelarLogout');

botaoLogout.addEventListener('click', function (e) {
  e.preventDefault();
  modalLogout.style.display = 'flex';
});

confirmarLogout.addEventListener('click', () => {
  window.location.href = "login.html";
});

cancelarLogout.addEventListener('click', () => {
  modalLogout.style.display = 'none';
});
