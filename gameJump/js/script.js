const score = document.querySelector(".score");
const mario = document.querySelector(".mario");
const pipe = document.querySelector(".pipe");
const overlay = document.querySelector(".overlay");
const reset = document.querySelector(".reset");
const overlayScore = document.querySelector(".overlay-score");
const startGameInfo = document.querySelector(".start-game");

let countScore = 0;
let startGame = true;
let timerVerifyDead;
let timerScore;
let timerSpeed;

startGameInfo.innerHTML = `
  <p style="text-align: center;">Pressione o botão abaixo para iniciar</p>
  <button id="startButton" style="
    background-color: transparent
    border: none;
    display: flex
    font-size: 13px;
    font-weight: bold;
    padding: 10px 10px;
    border-radius: 5px;
    cursor: pointer;
    margin-top: 20px; 
    color: #598419;
  ">Iniciar Jogo</button>
`;

reset.addEventListener("click", () => window.location.reload());

document
  .getElementById("startButton")
  .addEventListener("click", startGameFunction);

function startGameFunction() {
  pipe.classList.add("pipeRun");
  mario.classList.add("jump");

  setTimeout(() => mario.classList.remove("jump"), 500);

  if (startGame) {
    let pipeSpeed = 6;
    startGameInfo.innerHTML = "";
    startGameInfo.style.background = "transparent";
    timerScore = setInterval(() => {
      countScore++;
      score.innerHTML = `SCORE ${countScore}`;

      if (countScore === 2) {
        clearInterval(timerScore);
        clearInterval(timerSpeed);
        pipe.classList.remove("pipeRun");

        Swal.fire({
          title: "Parabéns!",
          text: "Coisa marlinda!",
          icon: "success",
          confirmButtonText: "OK",
        }).then(() => {
          location.href = "/jogoDaVelha/index.html";
        });
      }
    }, 1000);

    timerSpeed = setInterval(() => {
      pipeSpeed -= 0.1;
      if (pipeSpeed <= 0) {
        pipeSpeed = 0.6;
      }
      console.log({ pipeSpeed });
      pipe.style.animationDelay = `pipe-animate ${pipeSpeed}s infinite linear`;
    }, 1000 * 10);
  }

  startGame = false;

  timerVerifyDead = setInterval(() => {
    handleLogicForGameOver();
  }, 10);
}

const handleLogicForGameOver = () => {
  const pipeLocalization = pipe.offsetLeft;
  const marioLocalization = +window
    .getComputedStyle(mario)
    .bottom.replace("px", "");

  if (
    pipeLocalization <= 120 &&
    pipeLocalization > 0 &&
    marioLocalization < 80
  ) {
    pipe.style.animation = "";
    pipe.style.left = `${pipeLocalization}px`;

    mario.src = "/gameJump/imagens/aline.png";
    mario.style.marginLeft = "50px";
    mario.style.bottom = `-200px`;
    mario.style.width = "80px";
    mario.classList.add("dead");

    overlayScore.innerHTML = `SCORE ${countScore}`;
    overlay.style.display = "flex";

    clearInterval(timerScore);
    clearInterval(timerVerifyDead);
  }
};

const jump = () => {
  mario.classList.add("jump");

  setTimeout(() => {
    mario.classList.remove("jump");
  }, 500);
};

document.addEventListener("keydown", jump);
document.addEventListener("touchstart", jump);
