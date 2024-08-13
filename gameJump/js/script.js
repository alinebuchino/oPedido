window.addEventListener("load", () => {
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
  let timerSpeed;
  let lastPipePosition = 0;

  startGameInfo.innerHTML = `
  <p>Pressione na tela para iniciar</p>`;

  reset.addEventListener("click", () => window.location.reload());
  document.addEventListener("click", startGameFunction);

  function startGameFunction() {
    pipe.classList.add("pipeRun");
    mario.classList.add("jump");

    setTimeout(() => mario.classList.remove("jump"), 500);

    if (startGame) {
      let pipeSpeed = 6;
      startGameInfo.innerHTML = "";
      startGameInfo.style.background = "transparent";

      timerSpeed = setInterval(() => {
        pipeSpeed -= 0.1;
        if (pipeSpeed <= 0) {
          pipeSpeed = 0.6;
        }
        pipe.style.animationDelay = `pipe-animate ${pipeSpeed}s infinite linear`;
      }, 1000 * 10);
    }

    startGame = false;

    timerVerifyDead = setInterval(() => {
      handleLogicForGameOver();
      detectPipePass();
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

      mario.src = "../imagens/aline.png";
      mario.style.marginLeft = "50px";
      mario.style.bottom = `-200px`;
      mario.style.width = "80px";
      mario.classList.add("dead");

      overlayScore.innerHTML = `SCORE ${countScore}`;
      overlay.style.display = "flex";

      clearInterval(timerVerifyDead);
      clearInterval(timerSpeed);
    }
  };

  const detectPipePass = () => {
    const pipeLocalization = pipe.offsetLeft;

    if (pipeLocalization < 0 && lastPipePosition >= 0) {
      countScore++;
      score.innerHTML = `SCORE ${countScore}`;
      lastPipePosition = pipeLocalization;

      if (countScore === 50) {
        pipe.classList.remove("pipeRun");
        Swal.fire({
          title: "Parabéns!",
          text: "Coisa marlinda!",
          icon: "success",
          confirmButtonText: "OK",
        }).then(() => {
          location.href = "../../jogoDaVelha/index.html";
        });
      }
    } else if (pipeLocalization >= 0) {
      lastPipePosition = pipeLocalization;
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
});
