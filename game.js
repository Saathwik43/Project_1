const boardElem = document.getElementById('board');
const statusElem = document.getElementById('status');
const resetBtn = document.getElementById('reset');

let board = Array(3).fill().map(() => Array(3).fill(null));
let currentPlayer = 'X';
let gameOver = false;

function renderBoard() {
    boardElem.innerHTML = '';
    for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
            const cell = document.createElement('div');
            cell.className = 'cell';
            cell.textContent = board[i][j] || '';
            cell.dataset.row = i;
            cell.dataset.col = j;
            cell.addEventListener('click', onCellClick);
            boardElem.appendChild(cell);
        }
    }
}

function onCellClick(e) {
    if (gameOver) return;
    const row = e.target.dataset.row;
    const col = e.target.dataset.col;
    if (board[row][col]) return;
    board[row][col] = currentPlayer;
    renderBoard();
    if (checkWinner()) {
        statusElem.textContent = `Player ${currentPlayer} wins!`;
        gameOver = true;
    } else if (board.flat().every(cell => cell)) {
        statusElem.textContent = "It's a tie!";
        gameOver = true;
    } else {
        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
        statusElem.textContent = `Player ${currentPlayer}'s turn`;
    }
}

function checkWinner() {
    // Rows, columns, diagonals
    for (let i = 0; i < 3; i++) {
        if (board[i][0] && board[i][0] === board[i][1] && board[i][1] === board[i][2]) return true;
        if (board[0][i] && board[0][i] === board[1][i] && board[1][i] === board[2][i]) return true;
    }
    if (board[0][0] && board[0][0] === board[1][1] && board[1][1] === board[2][2]) return true;
    if (board[0][2] && board[0][2] === board[1][1] && board[1][1] === board[2][0]) return true;
    return false;
}

resetBtn.addEventListener('click', () => {
    board = Array(3).fill().map(() => Array(3).fill(null));
    currentPlayer = 'X';
    gameOver = false;
    statusElem.textContent = `Player ${currentPlayer}'s turn`;
    renderBoard();
});

renderBoard();