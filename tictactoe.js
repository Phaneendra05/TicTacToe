document.addEventListener("DOMContentLoaded", () => {
    const board = document.getElementById("board");
    const status = document.getElementById("status");
  
    const playerX = "X";
    const playerO = "O";
    let currentPlayer = playerX;
    let gameOver = false;
    let turns = 0;
  
    // Create the board
    const cells = [];
    for (let i = 0; i < 3; i++) {
      cells[i] = [];
      for (let j = 0; j < 3; j++) {
        const cell = document.createElement("div");
        cell.classList.add("cell");
        cell.dataset.row = i;
        cell.dataset.col = j;
  
        cell.addEventListener("click", () => handleClick(cell));
        board.appendChild(cell);
        cells[i][j] = cell;
      }
    }
  
    // Handle cell click
    function handleClick(cell) {
      if (gameOver || cell.textContent !== "") return;
  
      cell.textContent = currentPlayer;
      turns++;
      checkWinner();
  
      if (!gameOver) {
        currentPlayer = currentPlayer === playerX ? playerO : playerX;
        status.textContent = `${currentPlayer}'s turn`;
      }
    }
  
    // Check for a winner
    function checkWinner() {
      // Check rows, columns, and diagonals
      for (let i = 0; i < 3; i++) {
        if (
          cells[i][0].textContent &&
          cells[i][0].textContent === cells[i][1].textContent &&
          cells[i][1].textContent === cells[i][2].textContent
        ) {
          highlightWinner([cells[i][0], cells[i][1], cells[i][2]]);
          return;
        }
  
        if (
          cells[0][i].textContent &&
          cells[0][i].textContent === cells[1][i].textContent &&
          cells[1][i].textContent === cells[2][i].textContent
        ) {
          highlightWinner([cells[0][i], cells[1][i], cells[2][i]]);
          return;
        }
      }
  
      // Check diagonals
      if (
        cells[0][0].textContent &&
        cells[0][0].textContent === cells[1][1].textContent &&
        cells[1][1].textContent === cells[2][2].textContent
      ) {
        highlightWinner([cells[0][0], cells[1][1], cells[2][2]]);
        return;
      }
  
      if (
        cells[0][2].textContent &&
        cells[0][2].textContent === cells[1][1].textContent &&
        cells[1][1].textContent === cells[2][0].textContent
      ) {
        highlightWinner([cells[0][2], cells[1][1], cells[2][0]]);
        return;
      }
  
      // Check for tie
      if (turns === 9) {
        highlightTie();
        return;
      }
    }
  
    // Highlight winning cells
    function highlightWinner(winningCells) {
      winningCells.forEach(cell => cell.classList.add("winner"));
      status.textContent = `${currentPlayer} is the winner!`;
      gameOver = true;
    }
  
    // Highlight tie
    function highlightTie() {
      cells.flat().forEach(cell => cell.classList.add("tie"));
      status.textContent = "It's a tie!";
      gameOver = true;
    }
  });
  