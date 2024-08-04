function toggleMode() {
  const html = document.documentElement;

  if (html.classList.contains("light")) {
    html.classList.remove("light");
  } else {
    html.classList.add("light");
  }

  const img = document.querySelector("#profile img");
  if (html.classList.contains("light")) {
    img.setAttribute("src", "./imgForm/avatar.png");
  } else {
    img.setAttribute("src", "./imgForm/avatar1.png");
  }
}

function log() {
  var senha = document.getElementById("password").value;

  if (senha === "2704") {
    Swal.fire({
      title: "Parabéns!",
      text: "Coisa marlinda!",
      icon: "success",
      confirmButtonText: "OK",
    }).then(() => {
      location.href = "home/home.html";
    });
  } else {
    Swal.fire({
      title: "Pense mais um pouco!",
      text: "Lerdinha!",
      icon: "error",
      confirmButtonText: "OK",
    });
  }
}
