const express = require("express");
const app = express();
const http = require("http").createServer(app);
const io = require("socket.io")(http);

//tous les joueurs qui vont se connectés
let players = [];
//compteur
let compteur_guess = 0;
let compteur_ancienne_rep = 0;
//compteur aléatoire
let randomnumber = 0;
//ressources url : reponse
let Guess_All = [
  {
    url: "https://cdn.glitch.global/5a1d0a3f-739f-476e-a5af-3efd7b0fa731/aatrox.jpg?v=1663751893645",
    reponse: "aatrox"
  },
  {
    url: "https://cdn.glitch.global/5a1d0a3f-739f-476e-a5af-3efd7b0fa731/akali.jpg?v=1663767943158",
    reponse: "akali"
  },
  {
    url: "https://cdn.glitch.global/5a1d0a3f-739f-476e-a5af-3efd7b0fa731/RiotX_ChampionList_darius.jpg?v=1663784637978",
    reponse: "darius"
  },
  {
    url: "https://cdn.glitch.global/5a1d0a3f-739f-476e-a5af-3efd7b0fa731/belveth.jpg?v=1663784639311",
    reponse: "belveth"
  },
  {
    url: "https://cdn.glitch.global/5a1d0a3f-739f-476e-a5af-3efd7b0fa731/ahri.jpg?v=1663784639622",
    reponse: "ahri"
  },
  {
    url: "https://cdn.glitch.global/5a1d0a3f-739f-476e-a5af-3efd7b0fa731/amumu.jpg?v=1663784638341",
    reponse: "amumu"
  },
  {
    url: "https://cdn.glitch.global/5a1d0a3f-739f-476e-a5af-3efd7b0fa731/draven.jpg?v=1663784638192",
    reponse: "draven"
  },
  {
    url: "https://cdn.glitch.global/5a1d0a3f-739f-476e-a5af-3efd7b0fa731/RiotX_ChampionList_diana.jpg?v=1663784639883",
    reponse: "diana"
  },
  {
    url: "https://cdn.glitch.global/5a1d0a3f-739f-476e-a5af-3efd7b0fa731/caytlin.jpg?v=1663784638507",
    reponse: "caitlyn"
  },
  {
    url: "https://cdn.glitch.global/5a1d0a3f-739f-476e-a5af-3efd7b0fa731/bard.jpg?v=1663784638897",
    reponse: "bard"
  },
  {
    url: "https://cdn.glitch.global/5a1d0a3f-739f-476e-a5af-3efd7b0fa731/aurelion.jpg?v=1663784639047",
    reponse: "aurelion sol"
  },
  {
    url: "https://cdn.glitch.global/5a1d0a3f-739f-476e-a5af-3efd7b0fa731/alistar.jpg?v=1663784638837",
    reponse: "alistar"
  },
  {
    url: "https://cdn.glitch.global/5a1d0a3f-739f-476e-a5af-3efd7b0fa731/Aphelios_0.jpg?v=1663786076478",
    reponse: "aphelios"
  },
  {
    url: "https://cdn.glitch.global/5a1d0a3f-739f-476e-a5af-3efd7b0fa731/RiotX_ChampionList_annie.jpg?v=1663786074047",
    reponse: "annie"
  },
  {
    url: "https://cdn.glitch.global/5a1d0a3f-739f-476e-a5af-3efd7b0fa731/RiotX_ChampionList_akshan_v2.jpg?v=1663786073898",
    reponse: "akshan"
  },
  {
    url: "https://cdn.glitch.global/5a1d0a3f-739f-476e-a5af-3efd7b0fa731/RiotX_ChampionList_brand.jpg?v=1663786073829",
    reponse: "brand"
  },
  {
    url: "https://cdn.glitch.global/5a1d0a3f-739f-476e-a5af-3efd7b0fa731/RiotX_ChampionList_cassiopeia.jpg?v=1663786073490",
    reponse: "cassiopeia"
  },
  {
    url: "https://cdn.glitch.global/5a1d0a3f-739f-476e-a5af-3efd7b0fa731/RiotX_ChampionList_camille.jpg?v=1663786072486",
    reponse: "camille"
  },
  {
    url: "https://cdn.glitch.global/5a1d0a3f-739f-476e-a5af-3efd7b0fa731/RiotX_ChampionList_ashe.jpg?v=1663786074213",
    reponse: "ashe"
  },
  {
    url: "https://cdn.glitch.global/5a1d0a3f-739f-476e-a5af-3efd7b0fa731/RiotX_ChampionList_braum.jpg?v=1663786072271",
    reponse: "braum"
  },
  {
    url: "https://cdn.glitch.global/5a1d0a3f-739f-476e-a5af-3efd7b0fa731/RiotX_ChampionList_blitzcrank.jpg?v=1663786072005",
    reponse: "blitzcrank"
  },
  {
    url: "https://cdn.glitch.global/5a1d0a3f-739f-476e-a5af-3efd7b0fa731/RiotX_ChampionList_azir.jpg?v=1663786071852",
    reponse: "azir"
  }
];

app.use(express.static(__dirname + "/public"));

app.get("/", (request, response) => {
  response.sendFile(__dirname + "/views/index.html");
});

io.on("connection", function (socket) {
  socket.on("user_join", (name) => {
    const player = {
      id: socket.id,
      name,
      points: 0,
    };
    //on ajoute le joueur a la liste de joueurs
    players.push(player);

    //on met à jour le classement
    Update_LeaderBoard();
  });

  // on gère la réception de réponse
  socket.on("send_response_Guess", (name, reponse_Guess_pixel) => {
    //on vérifie que la réponse reçu correspond à celle dans notre tableau
    if (reponse_Guess_pixel == Guess_All[compteur_guess].reponse) {
      //on incrémente les points du joueur
      increasePoints(socket.id);
      //on génère un nombre aléatoire
      randomnumber = Math.floor(Math.random() * (Guess_All.length - 0 + 1)) + 0;
      compteur_ancienne_rep = compteur_guess;
      compteur_guess = randomnumber;
      //on met à jour le classement
      Update_LeaderBoard();
    }
  });
  
  //On va afficher quelle etait la reponse
   socket.on("reponse_ancienne", function (data) {
    io.emit("reponse_ancienne_all", Guess_All[compteur_ancienne_rep]);
  });

  //On affiche le buzzer 1 en couleur pour tous les joueurs
  socket.on("buzzer_off", function (data) {
    io.emit("buzzer_off_all", "On dit aux autres que les buzzer sont off");
  });

  //On affiche le buzzer 2 en couleur pour tous les joueurs
  socket.on("buzzer_off_2", function (data) {
    io.emit("buzzer_off_all_2", "On dit aux autres que les buzzer sont off");
  });

  //On affiche le buzzer 3 en couleur pour tous les joueurs
  socket.on("buzzer_off_3", function (data) {
    io.emit("buzzer_off_all_3", "On dit aux autres que les buzzer sont off");
  });

  //On affiche le buzzer 4 en couleur pour tous les joueurs
  socket.on("buzzer_off_4", function (data) {
    io.emit("buzzer_off_all_4", "On dit aux autres que les buzzer sont off");
  });

  //On affiche le buzzer 5 en couleur pour tous les joueurs
  socket.on("buzzer_off_5", function (data) {
    io.emit("buzzer_off_all_5", "On dit aux autres que les buzzer sont off");
  });

  //On affiche le buzzer 6 en couleur pour tous les joueurs
  socket.on("buzzer_off_6", function (data) {
    io.emit("buzzer_off_all_6", "On dit aux autres que les buzzer sont off");
  });

  //On envoie aux clients l'url de l'image choisit aléatoirement
  socket.on("lance_pixel", function (data) {
    randomnumber = Math.floor(Math.random() * (Guess_All.length - 0 + 1)) + 0;
    compteur_guess = randomnumber;
    compteur_ancienne_rep = compteur_guess;
    io.emit("lance_pixel_all", Guess_All[compteur_guess]);
  });

  //Lorsqu'une personne se déconnecte
  socket.on("disconnect", function () {
    //on retire le joueur de la liste
    players = [...players.filter((player) => player.id !== socket.id)];
  });
});

//Mis a jour du classement
function Update_LeaderBoard() {
  const leaderboard = players.sort((a, b) => b.points - a.points).slice(0, 10);
  io.emit("leaderboard", leaderboard);
}

//Ajout de points
function increasePoints(id) {
  players = players.map((player) => {
    if (player.id == id) {
      return {
        ...player,
        points: player.points + 1,
      };
    } else {
      return player;
    }
  });
}

//Serveur en écoute sur le port 3000
http.listen(3000, function () {
  console.log("Server listening on Port", 3000);
});
