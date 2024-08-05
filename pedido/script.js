var btn = document.querySelector(".no");
var position = 0;
var isAnimating = false;

btn.addEventListener("click", function () {
  if (!isAnimating) {
    isAnimating = true;
    position = position === 0 ? 80 : 0;
    btn.style.transform = `translate(0px, ${position}px)`;
    btn.style.transition = "all 0.2s ease";

    setTimeout(function () {
      isAnimating = false;
    }, 200);
  }
});

btn.addEventListener("mouseover", function () {
  if (!isAnimating) {
    isAnimating = true;
    position = position === 0 ? 80 : 0;
    btn.style.transform = `translate(0px, ${position}px)`;
    btn.style.transition = "all 0.2s ease";

    setTimeout(function () {
      isAnimating = false;
    }, 200);
  }
});

// Evento de clique para verificar se o clique ocorreu fora do botão
document.addEventListener("click", function (event) {
  if (!btn.contains(event.target)) {
    btn.style.transform = `translate(0px, 0px)`;
  }
});

const sim = document.getElementById("yes");

sim.addEventListener("click", () => {
  let timerInterval;
  Swal.fire({
    title: "EBAAAA, ELA ACEITOUUUU! 😍",
    html: "Prometo te fazer feliz, princesa. 💘",
    timer: 4000,
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
    location.href = "../aceitou/index.html";
  });
});

function chamado() {
  var iconMenu = document.getElementById("icon-menu");

  if (iconMenu) {
    iconMenu.checked = true;
  }
}
