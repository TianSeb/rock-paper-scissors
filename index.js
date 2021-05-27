// Main variables for the game

const obj = ["rock","paper","scissors"];
let playerScore = 0;
let pcScore = 0;

const rules = {
  rock: {
    scissors: "win",
    paper: "lose",
    rock: "tie"
  },
  paper: {
    scissors: "lose",
    rock: "win",
    paper: "tie"
  },
  scissors: {
    paper: "win",
    rock: "lose",
    scissors: "tie"
  }
}

// Playing Functions

function computerPlay() { // Returns paper,rock or scissors from array
  return obj[Math.floor((Math.random() * 3))];
}

function playRound(playerSelection) { // Upload element Photo for visualizing option
  var computerSel = computerPlay();
  var p1Img = document.getElementById("p1selection");
  var p2Img = document.getElementById("p2selection");
  
  p1Img.style.backgroundImage = "url(./images/" + playerSelection + ".png)";
  p2Img.style.backgroundImage = "url(./images/" + computerSel + ".png)";

  pressButton(playerSelection,computerSel);
  game(rules[playerSelection][computerSel],playerSelection,computerSel);

}

function game(rtdo,player,compu){ //Uses the result to run the process of adding score and changing text
  let result = rtdo;
  var p1Score = document.getElementById("p1score");
  var p2Score = document.getElementById("p2score");
  
  if (result === "win"){
    playerScore++;
    textChange(rtdo,player,compu);
  }
  else if (result === "lose") {
    pcScore++;
    textChange(rtdo,player,compu);
  }
  else {
    textChange(rtdo,player,compu);
  }
  p1Score.innerText = "Score: " + playerScore;  
  p2Score.innerText = "Score: " + pcScore;

  checkStatus();
}

function checkStatus() { //checks the current score, if 5 refresh the page.
  var text = document.getElementsByTagName("h1")[0];
  var tablero = document.getElementById("tablero");

  if(playerScore === 5 || pcScore === 5){
    tablero.parentNode.removeChild(tablero);
    if(playerScore > pcScore){
      text.style.fontSize = "8rem";
      text.style.marginTop = "150px";
      text.innerText = "GANASTE!!"
    }
    else {
      text.style.fontSize = "8rem";
      text.style.marginTop = "150px";
      text.innerText = "PERDISTE"
    }
   setTimeout(() => {
      location.reload();
    }, 2500);
  } 
}

function pressButton(player,compu) {
  p1 = document.getElementById(player);
  p2 = document.getElementById(compu+"pc");

  p1.classList.add("pressed");
  p2.classList.add("pressed");

  setTimeout(() => {
    p1.classList.remove("pressed");
    p2.classList.remove("pressed");
  }, 800);
}

function textChange(rtdo,player,compu){
  var text = document.getElementsByTagName("h1")[0];
  var elementoPlayer = player;
  var elementoPc = compu;

  switch (elementoPlayer) {
    case "rock": elementoPlayer = "Roca";
    break;
    case "paper" : elementoPlayer =  "Papel";
    break;
    case "scissors": elementoPlayer = "Tijeras";
  }
  switch (elementoPc) {
    case "rock": elementoPc = "Roca";
    break;
    case "paper" : elementoPc =  "Papel";
    break;
    case "scissors": elementoPc = "Tijeras";
  }
  if (rtdo === "win"){
    text.innerText = "Ganaste! " + elementoPlayer + " vence a " + elementoPc;
  }
  else if (rtdo === "lose") {
    text.innerText = "La Pc Gana! " + elementoPc + " vence a " + elementoPlayer;
  }
  else {
    text.innerText = "Empate";
  }
}

function initialize() {
  const options = document.querySelectorAll('#options');
  options.forEach(option => option.addEventListener('click', (e) => 
  playRound(e.target.id)));
}

initialize();
