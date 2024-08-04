const perguntas = [
  {
    pergunta: "Qual o lugar mais significativo da nossa história ?",
    respostas: ["Arquibancada", "Pista de Atletismo", "Eletrô", "Fundo Fatec"],
    correta: 1,
  },

  {
    pergunta: "O que tinha no Origami que fiz pra ti ?",
    respostas: [
      "Desenho Lilo & Stich",
      "Poema",
      "Referências a Mulher Maravilha",
      "Canção",
    ],
    correta: 2,
  },

  {
    pergunta:
      "Qual frase eu usava quando você comprava muitas comidas no Pinheirinho ?",
    respostas: ["Que gulosa", "Queeeeero também", "Lombriga de goido", "-"],
    correta: 2,
  },

  {
    pergunta: "Qual era a música que vc citava no caderninho que me deu ?",
    respostas: [
      "The Only Exception - Paramore",
      "Água na Boca - Tati Zaqui",
      "Outrória - AnaVitoria",
      "love you I hate you - Ariana Grande",
    ],
    correta: 1,
  },

  {
    pergunta: "Quem deu o primeiro beijo no show do Guns N’ Roses ?",
    respostas: ["Eu", "Você", "Ninguém", "-"],
    correta: 0,
  },

  {
    pergunta: "O que você disse que me ensinaria no caderninho que me deu ?",
    respostas: [
      "⁠⁠Andar de bike até ficarmos 'morridas de canseiras'",
      "Jogar Vídeo Game",
      "Assistir filmes de animação",
      "Tomar açaí",
    ],
    correta: 3,
  },

  {
    pergunta:
      "O escrito da nossa aliança fazia referência a qual banda musical ?",
    respostas: ["⁠P!nk", "Paramore", "Rihana", "Halsey"],
    correta: 1,
  },

  {
    pergunta: "Onde foi nossa primeira vez ?",
    respostas: ["Hotel", "Minha casa", "Pista de Atletismo", "-"],
    correta: 0,
  },

  {
    pergunta: "Quando tempo tínhamos juntas na nossa primeira vez ?",
    respostas: ["8 meses", "11 meses", "1 ano e 2 meses", "1 ano"],
    correta: 3,
  },

  {
    pergunta: "Qual nome de cachorro sempre quis ter ?",
    respostas: ["Lordiana", "Lorde", "Nicolas", "Noop"],
    correta: 1,
  },

  {
    pergunta: "Pronta para a pergunta mais importante?!",
    respostas: ["Sim", "Não", "Talvez", "-"],
    correta: 0,
  },
];

let currentQuestionIndex = 0;
let score = 0;

const quiz = document.querySelector("#quiz");
const template = document.querySelector("template");
const nextBtn = document.querySelector("#next-btn");
const mostrarTotal = document.querySelector("#score");
const totalDePerguntas = perguntas.length;

function showQuestion(index) {
  const question = perguntas[index];
  const quizItem = template.content.cloneNode(true);

  quizItem.querySelector(".question-index").textContent = `${index + 1}`;
  quizItem.querySelector(".question-text").textContent = question.pergunta;

  const dl = quizItem.querySelector("dl");

  const dtTemplate = dl.querySelector("dt");
  dl.removeChild(dtTemplate);

  question.respostas.forEach((resposta, i) => {
    const dt = dtTemplate.cloneNode(true);
    dt.querySelector("span").textContent = resposta;
    dt.querySelector("input").value = i;
    dt.querySelector("input").setAttribute("name", `pergunta-${index}`);
    dl.appendChild(dt);
  });

  quiz.innerHTML = "";
  quiz.appendChild(quizItem);

  nextBtn.style.display = "none";

  atualizarScore();
}

function handleAnswer() {
  const selectedOption = document.querySelector(
    'input[name="pergunta-' + currentQuestionIndex + '"]:checked'
  );

  if (selectedOption) {
    nextBtn.style.display = "block";
  } else {
    nextBtn.style.display = "none";
  }
}

function processAnswer() {
  const selectedOption = document.querySelector(
    'input[name="pergunta-' + currentQuestionIndex + '"]:checked'
  );
  if (!selectedOption) {
    return;
  }

  const selectedValue = parseInt(selectedOption.value, 10);
  const correta = perguntas[currentQuestionIndex].correta;

  if (selectedValue === correta) {
    score++;
  }
}

function atualizarScore() {
  mostrarTotal.textContent = `${score} de ${perguntas.length}`;
}

function showResult() {
  atualizarScore();

  if (score == 11) {
    Swal.fire({
      title: "Prepare-se",
      html: "O segredo de tudo isso será revelado em breve! 💘",
      timer: 5000,
      timerProgressBar: true,
      didOpen: () => {
        Swal.showLoading();
        const b = Swal.getHtmlContainer().querySelector("b");
        timerInterval = setInterval(() => {
          b.textContent = Swal.getTimerLeft();
        }, 100);
      },
      willClose: () => {
        clearInterval(timerInterval);
      },
    }).then(() => {
      location.href = "/pedido/index.html";
    });
  } else {
    Swal.fire({
      title: `Vou ter que estar me divorciando mesmo. Você errou ${
        totalDePerguntas - score
      } alternativa(s)`,
      text: " ='( ",
      icon: "error",
      confirmButtonText: "OK",
    }).then(() => {
      location.href = "/quizz/quizz.html";
    });
  }
}

nextBtn.addEventListener("click", () => {
  processAnswer();
  currentQuestionIndex++;
  if (currentQuestionIndex < perguntas.length) {
    showQuestion(currentQuestionIndex);
  } else {
    showResult();
  }
});

document.addEventListener("change", handleAnswer);

showQuestion(currentQuestionIndex);
