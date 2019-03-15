var wordChoices = ["MAUVE", "PERIWINKLE", "SALMON", "SAPPHIRE", "YELLOW", "TAUPE", "SCARLET", "ULTRAMARINE", "VIOLET", "OLIVE", "AMBER", "PINK", "BLUE", "GOLD", "JADE", "MAGENTA", "PURPLE", "ORANGE", "SILVER", "VIRIDIAN"];
var chosenWord = "";
var lettersInWord = [];
var numBlanks = 0;
var lettersRevealed = [];
var incorrectLetters = [];
var winCount = 0;
var guessesRemaining = 8;
var lossCount = 0;

function startGame() {
  chosenWord = wordChoices[Math.floor(Math.random() * wordChoices.length)];
  lettersInWord = chosenWord.split("");
  numBlanks = lettersInWord.length;
  numblanks = [];
  guessesRemaining = 8;
  incorrectLetters = [];
  lettersRevealed = [];
  for (var i = 0; i < numBlanks; i++) {
    lettersRevealed.push("_");
  }
  document.getElementById("chosenWord").innerHTML = lettersRevealed.join(" ");
  document.getElementById("guessesRemaining").innerHTML = guessesRemaining;
  document.getElementById("winCount").innerHTML = winCount;
  document.getElementById("lossCount").innerHTML = lossCount;
  document.getElementById("guessedLetter").innerHTML = incorrectLetters;
  console.log(chosenWord);
  console.log(lettersInWord);
  console.log(numBlanks);
  console.log(lettersRevealed);
}

function checkLetters(letter) {
  var lettersInWord = false;
  for (var i = 0; i < numBlanks; i++) {
    if (chosenWord[i] == letter) {
      lettersInWord = true;
    }
  }
  if (lettersInWord) {
    for (var i = 0; i < numBlanks; i++) {
      if (chosenWord[i] == letter) {
        lettersRevealed[i] = letter;
      }
    }
  } else {
    incorrectLetters.push(letter);
    guessesRemaining--
  }
  console.log(lettersRevealed);
}

function gameEnd() {
  console.log("Win Count: " + winCount + " Guesses Left " + guessesRemaining);
  document.getElementById("chosenWord").innerHTML = lettersRevealed.join(" ");
  document.getElementById("guessesRemaining").innerHTML = guessesRemaining;
  document.getElementById("guessedLetter").innerHTML = incorrectLetters.join(" ");
  if (lettersInWord.toString() == lettersRevealed.toString()) {
    winCount++;
    document.getElementById("winCount").innerHTML = winCount;
    let audio = new Audio('assets/Store_Door_Chime-Mike_Koenig-570742973.mp3');
    audio.play();
    alert("You Guessed It ☺! The correct word is " + chosenWord);
    startGame();
  } else if (guessesRemaining == 0) {
    lossCount++;
    document.getElementById("lossCount").innerHTML = lossCount;
    let audio = new Audio('assets/Buzzer-SoundBible.com-188422102.mp3');
    audio.play();
    alert("Sorry ☹, the correct word is " + chosenWord);
    startGame();
  }
}
startGame();
document.onkeyup = function (event) {
  var lettersRevealed = String.fromCharCode(event.keyCode).toUpperCase();
  checkLetters(lettersRevealed);
  gameEnd();
  console.log(lettersRevealed);
}
document.getElementById("chosenWord").textContent = "Press any key to get started ☀";
document.onkeyup = function () {
  startGame();
  document.onkeyup = function () {
    var letter = String.fromCharCode(event.keyCode).toUpperCase();
    checkLetters(letter);
    gameEnd();
  }
}
