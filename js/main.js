// START GAME 
document.querySelector('#startGame').addEventListener('click', function() {
  const player1Name = document.querySelector('#player1Name').value
  const player2Name = document.querySelector('#player2Name').value
  const music = '<i class="fas fa-music fa-5x"></i>';
  const music1 = "Music sucks!"; 
  let player1 = personFactory(player1Name, music, 1);
  let player2 = personFactory(player2Name, music1, 2);
  enterPlayerInfo(player1, player2);
})


//RESET GAME
document.getElementById("resetGame").addEventListener("click", function(){
    location.reload();
});

//this picks the container class which holds the game board. It is defined as the variable called container 
const container = document.querySelector('.container');

//this variable is defined as a funciton and displays the person's name and which marker they are
const personFactory = function(name, marker, playerNumber) {
  const displayPerson = function() {
    document.querySelector(`#player${playerNumber}`).innerText = `${name}, ${marker}`
  };
  displayPerson();
  return { name, marker, displayPerson };
};


//This variable is defined as a function and  for when users type in their names. The input boxes will disappear and the information will appear 
  const enterPlayerInfo = function (player1, player2) {
  document.querySelector('.gameInformation').classList.remove('hidden');
  document.querySelector('.getPlayerInfo').classList.add('hidden')
  let currentPlayer = player1;
  let gameArray = Array(9).fill('');

  // This checks if all of the indexes in the array are the same 
  Array.prototype.allSameValues = function() {
    if (this[0] === "") { return false; }
    for (let i = 1; i < this.length; i++) {
      if (this[i] !== this[0]) { return false; }
    } 
    return true;
  }

  const validChoice = function(target) {
    const targetIndex = target.id.slice(-1);
    return (gameArray[targetIndex] === "") ? true : false;
  }

  const playerChoose = function(currentPlayer, target) {
    const targetIndex = target.id.slice(-1);
    const playerMarker = currentPlayer.marker;
    if (gameArray[targetIndex] === "") {
      gameArray[targetIndex] = playerMarker;
    }
  }

  const renderBoard = function() {
    const boxes = document.querySelectorAll('.box')
    boxes.forEach(function(box, index) {
      box.innerHTML = `<p>${gameArray[index]}</p>`
    })
  };

  const switchPlayer = function(currentPlayer) {
    return (currentPlayer === player1) ? player2 : player1;
  };

  const checkForTie = function(gameArray) {
    let tieGame = true;
    gameArray.forEach(function(position) {
      if (position === "") { tieGame = false; }
    })
    return tieGame;
  }

  //this shows you all of the winning combinations in the array 
  const checkForWin = function(gameArray) {
    let win = false;

    const winningCombos = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6]
    ];

    //this loops throught he winningCombos array and if they are all the same value, then that player wins 
    winningCombos.forEach(function(arr) {
      const a = gameArray[arr[0]];
      const b = gameArray[arr[1]];
      const c = gameArray[arr[2]];
      if ([a, b, c].allSameValues()) {
        win = true;
        return;
      };
    });

    return win;
  }

  const gameOver = function(player) {
    // If not passed ARG, tie game is displayed
    const messageAnchor = document.querySelector(".message")
    const gameInformation = document.querySelector('.gameInformation')

    const changeScreen = function(displayMessage) {
      container.style.display = 'none';
      gameInformation.style.display = 'none';
      messageAnchor.innerHTML = `<h1>${displayMessage}</h1>`
    }

    const tieGame = function() { 
      changeScreen("Neither of you are very good! Haha!"); 
      }

    const winner = function() {
       changeScreen(`${player.name} wins!`); }
    
    player === undefined ? tieGame() : winner()
  }

  container.addEventListener('click', function(event) {
    const target = event.target;
    if (target.className === "box") {
      let valid = validChoice(target)
      if (valid) {
        playerChoose(currentPlayer, target);
        renderBoard();
        const tie = checkForTie(gameArray);
        const win = checkForWin(gameArray, currentPlayer);
        if (tie) {
          gameOver();
        } else if (win) {
          gameOver(currentPlayer);
        } else {
          currentPlayer = switchPlayer(currentPlayer);
        }
      }
    };
  });
};






