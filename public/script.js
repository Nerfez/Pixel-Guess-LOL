//Tout notre jeu
const game = document.getElementById("game");
//Formulaire qui récupère le pseudo du joueur
const pseudo = document.getElementById("form_pseudo");
//Containeur qui récupère le pseudo du joueur
const intro = document.getElementById("intro");
//TIMER
const timer = document.getElementById("timer");
//Reponse apres timer
const reponse_ancien_guess = document.getElementById("reponse_ancien_guess");
//Les <ul> de notre classement
const classement = document.getElementById("leaderboard");
const buzzer = document.getElementById("buzzer");
//Boutton qui permet de lancer le jeu
const animate = document.getElementById("animate");
//Champs de texte pour répondre
const reponse_pixel = document.getElementById("reponse_pixel");
//Formulaire qui récupère la réponse du joueur
const form_jeu = document.getElementById("form_jeu");
//Buzzer numero 1
const Buzzer_1 = document.getElementById("Buzzer_1");
//Buzzer numero 2
const Buzzer_2 = document.getElementById("Buzzer_2");
//Buzzer numero 3
const Buzzer_3 = document.getElementById("Buzzer_3");
//Buzzer numero 4
const Buzzer_4 = document.getElementById("Buzzer_4");
//Buzzer numero 5
const Buzzer_5 = document.getElementById("Buzzer_5");
//Buzzer numero 6
const Buzzer_6 = document.getElementById("Buzzer_6");
//pseudo joueur
let name = "anonyme";
//la reponse du pixel guess
let reponse_du_pixel_guess = "";
let socket = undefined;
//image par défaut
let url =
  "https://cdn.glitch.global/5a1d0a3f-739f-476e-a5af-3efd7b0fa731/pixel_base.jpg?v=1663772787701";
let a,
  r,
  g,
  b = 0;

if (pseudo) {
  pseudo.addEventListener("submit", function (evt) {
    evt.preventDefault();
    //On récupère le nom
    name = evt.target["name"].value;

    //si le pseudo n'est pas vide
    if (name) {
      //On se connecte à la socket
      socket = window.io();

      //on indique le pseudo du joueur qui vient de se connecter
      socket.emit("user_join", name);
      //Lancement du jeu
      StartGame();
    }
  });
}

if (form_jeu) {
  //on ajoute le droit de pouvoir répondre
  form_jeu.addEventListener("submit", function (evt) {
    evt.preventDefault();
    //on récupère la réponse
    const reponse_Guess_pixel = evt.target["reponse_pixel"].value;
    //on l'envoie au serveur pour vérifier si c'est correct
    socket.emit("send_response_Guess", name, reponse_Guess_pixel);
    //on repasse le champs texte vide
    evt.target["reponse_pixel"].value = "";
    //on retire le droit de pouvoir répondre
    form_jeu.classList.add("hidden");
  });
}

function StartGame() {
  //on supprime " l'intro " : pseudo
  intro.classList.add("hidden");
  //on affiche notre jeu : pixel guess / classement
  game.classList.remove("hidden");
  //on affiche les buzzers
  buzzer.classList.remove("hidden");

  //mis a jour du classement
  socket.on("leaderboard", (leaderboard) => {
    classement.innerHTML = `
    ${leaderboard
      .map(
        (player) =>
          `<li class="flex text-white text-2xl justify-between"><strong>${player.name}</strong> ${player.points}</li>`
      )
      .join("")}
    `;
  });

  //lorsque le buzzer 1 est enfoncé :
  socket.on("buzzer_off_all", (data) => {
    //on affiche le buzzer 1 en vert
    Buzzer_1.src =
      "https://cdn.glitch.global/5a1d0a3f-739f-476e-a5af-3efd7b0fa731/enabutton.png?v=1663761468077";
    //on ne peut plus appuyer sur les buzzers
    $("#Buzzer_1").css("pointer-events", "none");
    $("#Buzzer_2").css("pointer-events", "none");
    $("#Buzzer_3").css("pointer-events", "none");
    $("#Buzzer_4").css("pointer-events", "none");
    $("#Buzzer_5").css("pointer-events", "none");
    $("#Buzzer_6").css("pointer-events", "none");
    //au bout de 4 secondes ...
    setTimeout(() => {
      //on affiche le buzzer 1 en rouge
      Buzzer_1.src =
        "https://cdn.glitch.global/5a1d0a3f-739f-476e-a5af-3efd7b0fa731/disbutton.png?v=1663761468034";
      //on peut appuyer sur les buzzers
      $("#Buzzer_1").css("pointer-events", "auto");
      $("#Buzzer_2").css("pointer-events", "auto");
      $("#Buzzer_3").css("pointer-events", "auto");
      $("#Buzzer_4").css("pointer-events", "auto");
      $("#Buzzer_5").css("pointer-events", "auto");
      $("#Buzzer_6").css("pointer-events", "auto");
    }, 4000);
  });

  socket.on("buzzer_off_all_2", (data) => {
    //on affiche le buzzer 2 en vert
    Buzzer_2.src =
      "https://cdn.glitch.global/5a1d0a3f-739f-476e-a5af-3efd7b0fa731/enabutton.png?v=1663761468077";
    //on ne peut plus appuyer sur les buzzers
    $("#Buzzer_1").css("pointer-events", "none");
    $("#Buzzer_2").css("pointer-events", "none");
    $("#Buzzer_3").css("pointer-events", "none");
    $("#Buzzer_4").css("pointer-events", "none");
    $("#Buzzer_5").css("pointer-events", "none");
    $("#Buzzer_6").css("pointer-events", "none");
    //au bout de 4 secondes ...
    setTimeout(() => {
      //on affiche le buzzer 2 en rouge
      Buzzer_2.src =
        "https://cdn.glitch.global/5a1d0a3f-739f-476e-a5af-3efd7b0fa731/disbutton.png?v=1663761468034";
      //on peut appuyer sur les buzzers
      $("#Buzzer_1").css("pointer-events", "auto");
      $("#Buzzer_2").css("pointer-events", "auto");
      $("#Buzzer_3").css("pointer-events", "auto");
      $("#Buzzer_4").css("pointer-events", "auto");
      $("#Buzzer_5").css("pointer-events", "auto");
      $("#Buzzer_6").css("pointer-events", "auto");
    }, 4000);
  });

  socket.on("buzzer_off_all_3", (data) => {
    //on affiche le buzzer 3 en vert
    Buzzer_3.src =
      "https://cdn.glitch.global/5a1d0a3f-739f-476e-a5af-3efd7b0fa731/enabutton.png?v=1663761468077";
    //on ne peut plus appuyer sur les buzzers
    $("#Buzzer_1").css("pointer-events", "none");
    $("#Buzzer_2").css("pointer-events", "none");
    $("#Buzzer_3").css("pointer-events", "none");
    $("#Buzzer_4").css("pointer-events", "none");
    $("#Buzzer_5").css("pointer-events", "none");
    $("#Buzzer_6").css("pointer-events", "none");
    //au bout de 4 secondes ...
    setTimeout(() => {
      //on affiche le buzzer 3 en rouge
      Buzzer_3.src =
        "https://cdn.glitch.global/5a1d0a3f-739f-476e-a5af-3efd7b0fa731/disbutton.png?v=1663761468034";
      //on peut appuyer sur les buzzers
      $("#Buzzer_1").css("pointer-events", "auto");
      $("#Buzzer_2").css("pointer-events", "auto");
      $("#Buzzer_3").css("pointer-events", "auto");
      $("#Buzzer_4").css("pointer-events", "auto");
      $("#Buzzer_5").css("pointer-events", "auto");
      $("#Buzzer_6").css("pointer-events", "auto");
    }, 4000);
  });

  socket.on("buzzer_off_all_4", (data) => {
    //on affiche le buzzer 4 en vert
    Buzzer_4.src =
      "https://cdn.glitch.global/5a1d0a3f-739f-476e-a5af-3efd7b0fa731/enabutton.png?v=1663761468077";
    //on ne peut plus appuyer sur les buzzers
    $("#Buzzer_1").css("pointer-events", "none");
    $("#Buzzer_2").css("pointer-events", "none");
    $("#Buzzer_3").css("pointer-events", "none");
    $("#Buzzer_4").css("pointer-events", "none");
    $("#Buzzer_5").css("pointer-events", "none");
    $("#Buzzer_6").css("pointer-events", "none");
    //au bout de 4 secondes ...
    setTimeout(() => {
      //on affiche le buzzer 4 en rouge
      Buzzer_4.src =
        "https://cdn.glitch.global/5a1d0a3f-739f-476e-a5af-3efd7b0fa731/disbutton.png?v=1663761468034";
      //on peut appuyer sur les buzzers
      $("#Buzzer_1").css("pointer-events", "auto");
      $("#Buzzer_2").css("pointer-events", "auto");
      $("#Buzzer_3").css("pointer-events", "auto");
      $("#Buzzer_4").css("pointer-events", "auto");
      $("#Buzzer_5").css("pointer-events", "auto");
      $("#Buzzer_6").css("pointer-events", "auto");
    }, 4000);
  });

  socket.on("buzzer_off_all_5", (data) => {
    //on affiche le buzzer 5 en vert
    Buzzer_5.src =
      "https://cdn.glitch.global/5a1d0a3f-739f-476e-a5af-3efd7b0fa731/enabutton.png?v=1663761468077";
    //on ne peut plus appuyer sur les buzzers
    $("#Buzzer_1").css("pointer-events", "none");
    $("#Buzzer_2").css("pointer-events", "none");
    $("#Buzzer_3").css("pointer-events", "none");
    $("#Buzzer_4").css("pointer-events", "none");
    $("#Buzzer_5").css("pointer-events", "none");
    $("#Buzzer_6").css("pointer-events", "none");
    //au bout de 4 secondes ...
    setTimeout(() => {
      //on affiche le buzzer 5 en rouge
      Buzzer_5.src =
        "https://cdn.glitch.global/5a1d0a3f-739f-476e-a5af-3efd7b0fa731/disbutton.png?v=1663761468034";
      //on peut appuyer sur les buzzers
      $("#Buzzer_1").css("pointer-events", "auto");
      $("#Buzzer_2").css("pointer-events", "auto");
      $("#Buzzer_3").css("pointer-events", "auto");
      $("#Buzzer_4").css("pointer-events", "auto");
      $("#Buzzer_5").css("pointer-events", "auto");
      $("#Buzzer_6").css("pointer-events", "auto");
    }, 4000);
  });

  socket.on("buzzer_off_all_6", (data) => {
    //on affiche le buzzer 6 en vert
    Buzzer_6.src =
      "https://cdn.glitch.global/5a1d0a3f-739f-476e-a5af-3efd7b0fa731/enabutton.png?v=1663761468077";
    //on ne peut plus appuyer sur les buzzers
    $("#Buzzer_1").css("pointer-events", "none");
    $("#Buzzer_2").css("pointer-events", "none");
    $("#Buzzer_3").css("pointer-events", "none");
    $("#Buzzer_4").css("pointer-events", "none");
    $("#Buzzer_5").css("pointer-events", "none");
    $("#Buzzer_6").css("pointer-events", "none");
    //au bout de 4 secondes ...
    setTimeout(() => {
      //on affiche le buzzer 6 en rouge
      Buzzer_6.src =
        "https://cdn.glitch.global/5a1d0a3f-739f-476e-a5af-3efd7b0fa731/disbutton.png?v=1663761468034";
      //on peut appuyer sur les buzzers
      $("#Buzzer_1").css("pointer-events", "auto");
      $("#Buzzer_2").css("pointer-events", "auto");
      $("#Buzzer_3").css("pointer-events", "auto");
      $("#Buzzer_4").css("pointer-events", "auto");
      $("#Buzzer_5").css("pointer-events", "auto");
      $("#Buzzer_6").css("pointer-events", "auto");
    }, 4000);
  });

  //on charge l'image envoyée par le serveur et on démarre l'animation de pixel
  socket.on("lance_pixel_all", (data) => {
    url = data.url;
    //degré de pixellisation a 100
    rasterSize = 100;
    //on dessine limage
    drawCanvas();
    //on depixellise progressivement
    AnimerLaBoucle();
  });

  //on affiche quelle etait la reponse
  socket.on("reponse_ancienne_all", (data) => {
    console.log("reponse : " + data.reponse);
    reponse_du_pixel_guess = data.reponse;
    reponse_ancien_guess.innerHTML =
      "La réponse était : " +
      '<span class="text-orange-500">' +
      reponse_du_pixel_guess +
      "</span>";
    reponse_ancien_guess.classList.remove("hidden");
    //au bout de 4 secondes ...
    setTimeout(() => {
      reponse_ancien_guess.classList.add("hidden");
      Lancer_Guess();
    }, 4000);
  });

  if (!document.createElement("canvas").getContext) {
    return;
  }

  var theCanvas = document.getElementById("canvas");
  var context = theCanvas.getContext("2d");

  var img = new Image();

  img.addEventListener("load", onImageLoaded);
  img.src = url;
  img.setAttribute("crossOrigin", "");

  var rasterSize = 100;

  var spriteSizeWidth = 250;
  var spriteSizeHeight = 282;

  var numFrames = 10;

  var frameID = 0;

  function drawCanvas() {
    img.src = url;
    context.clearRect(0, 0, theCanvas.width, theCanvas.height);
    var sourceX = (frameID * img.width) / numFrames;

    context.drawImage(
      img,
      0,
      0,
      spriteSizeWidth,
      spriteSizeHeight,
      0,
      0,
      spriteSizeWidth,
      spriteSizeHeight
    );

    var imgData = context.getImageData(0, 0, spriteSizeWidth, spriteSizeHeight);
    for (var x = 0; x < spriteSizeWidth; x++) {
      for (var y = 0; y < spriteSizeHeight; y++) {
        var rasterX = ((x / rasterSize) | 0) * rasterSize;
        var rasterY = ((y / rasterSize) | 0) * rasterSize;

        var rasterValIndex = (rasterX + rasterY * imgData.width) * 4;

        r = imgData.data[rasterValIndex];
        g = imgData.data[rasterValIndex + 1];
        b = imgData.data[rasterValIndex + 2];
        a = imgData.data[rasterValIndex + 3];

        var currentValIndex = (x + y * imgData.width) * 4;

        imgData.data[currentValIndex] = r;
        imgData.data[currentValIndex + 1] = g;
        imgData.data[currentValIndex + 2] = b;
        imgData.data[currentValIndex + 3] = a;
      }
    }
    context.putImageData(imgData, 0, 0);

    frameID++;
    if (frameID == numFrames) {
      frameID = 0;
    }
  }

  //Animation de la depixelisation
  async function AnimerLaBoucle() {
    refresh();
    for (let i = 100; i >= 1; i--) {
      rasterSize = i;
      drawCanvas();
      await sleep(100);
    }
  }

  function sleep(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  function onImageLoaded(e) {
    renderingLoop();
  }

  function renderingLoop() {
    window.setTimeout(renderingLoop, 100);
    drawCanvas();
  }
}

//timer en secondes
let temps = 15;

//lancement timer
function start() {
  var self = this;
  this.interval = setInterval(() => {
    temps -= 1;
    timer.value = temps;
    counterStyle();
    CheckTemps();
  }, 1000);
}

//si le temps tombe a zero on donne la reponse et on passe a une image suivante
function CheckTemps() {
  if (temps == 0) {
    socket.emit("reponse_ancienne", "Quelle etait la reponse ?");
    clearInterval(this.interval);
    delete this.interval;
  }
}

function refresh() {
  temps = 18;
  clearInterval(this.interval);
  delete this.interval;
  if (!this.interval) this.start();
}

function Play() {
  if (!this.interval) this.start();
}

//changement de couleur du timer
function counterStyle() {
  if (temps < 8) {
    timer.classList.remove("text-green-400");
    timer.classList.add("text-red-400");
  } else if (temps > 8) {
    timer.classList.remove("text-red-400");
    timer.classList.add("text-green-400");
  }
}

animate.addEventListener("click", Lancer_Guess, false);
Buzzer_1.addEventListener("click", Buzzer_Ecrire_1, false);
Buzzer_2.addEventListener("click", Buzzer_Ecrire_2, false);
Buzzer_3.addEventListener("click", Buzzer_Ecrire_3, false);
Buzzer_4.addEventListener("click", Buzzer_Ecrire_4, false);
Buzzer_5.addEventListener("click", Buzzer_Ecrire_5, false);
Buzzer_6.addEventListener("click", Buzzer_Ecrire_6, false);

//on demande au serveur de lancer l'animation pour tous les clients
function Lancer_Guess() {
  socket.emit("lance_pixel", "On demande au serveur pour lancer pixel");
}

//Si le buzzer 1 est pressé alors :
function Buzzer_Ecrire_1() {
  //on demande au serveur de l'afficher pour les autres clients
  socket.emit("buzzer_off", "On passe les buzzer en off");
  //on affiche la possibilite de repondre
  form_jeu.classList.remove("hidden");
  //on deplace le curseur automatique sur le champs de texte pour écrire directement la réponse
  reponse_pixel.focus();
  //au bout de 3 secondes ...
  setTimeout(() => {
    //on retire la possibilite de repondre
    form_jeu.classList.add("hidden");
  }, 4000);
}

//Si le buzzer 2 est pressé alors :
function Buzzer_Ecrire_2() {
  //on demande au serveur de l'afficher pour les autres clients
  socket.emit("buzzer_off_2", "On passe les buzzer en off");
  //on affiche la possibilite de repondre
  form_jeu.classList.remove("hidden");
  reponse_pixel.focus();
  //au bout de 3 secondes ...
  setTimeout(() => {
    //on retire la possibilite de repondre
    form_jeu.classList.add("hidden");
  }, 4000);
}

//Si le buzzer 3 est pressé alors :
function Buzzer_Ecrire_3() {
  //on demande au serveur de l'afficher pour les autres clients
  socket.emit("buzzer_off_3", "On passe les buzzer en off");
  //on affiche la possibilite de repondre
  form_jeu.classList.remove("hidden");
  reponse_pixel.focus();
  //au bout de 3 secondes ...
  setTimeout(() => {
    //on retire la possibilite de repondre
    form_jeu.classList.add("hidden");
  }, 4000);
}

//Si le buzzer 4 est pressé alors :
function Buzzer_Ecrire_4() {
  //on demande au serveur de l'afficher pour les autres clients
  socket.emit("buzzer_off_4", "On passe les buzzer en off");
  //on affiche la possibilite de repondre
  form_jeu.classList.remove("hidden");
  reponse_pixel.focus();
  //au bout de 3 secondes ...
  setTimeout(() => {
    //on retire la possibilite de repondre
    form_jeu.classList.add("hidden");
  }, 4000);
}

//Si le buzzer 5 est pressé alors :
function Buzzer_Ecrire_5() {
  //on demande au serveur de l'afficher pour les autres clients
  socket.emit("buzzer_off_5", "On passe les buzzer en off");
  //on affiche la possibilite de repondre
  form_jeu.classList.remove("hidden");
  reponse_pixel.focus();
  //au bout de 3 secondes ...
  setTimeout(() => {
    //on retire la possibilite de repondre
    form_jeu.classList.add("hidden");
  }, 4000);
}

//Si le buzzer 6 est pressé alors :
function Buzzer_Ecrire_6() {
  //on demande au serveur de l'afficher pour les autres clients
  socket.emit("buzzer_off_6", "On passe les buzzer en off");
  //on affiche la possibilite de repondre
  form_jeu.classList.remove("hidden");
  reponse_pixel.focus();
  //au bout de 3 secondes ...
  setTimeout(() => {
    //on retire la possibilite de repondre
    form_jeu.classList.add("hidden");
  }, 4000);
}
