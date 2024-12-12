const cells = document.querySelectorAll('.cell');
const statusText = document.querySelector('.status');
const score0 = document.getElementById('score-0');
const score1 = document.getElementById('score-1');
let currentPlayer = "1"; // começa com o jogador "1"
let boardState = Array(9).fill(null); // estado inicial do tabuleiro
let gameActive = true;
let player0Score = 0; let player1Score = 0; // pontuação do jogador 0 e 1

// combinações vencedoras
const winningCombinations = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

// configura o evento de clique
cells.forEach(cell => {
    cell.addEventListener('click', () => {
        if (!gameActive || cell.textContent !== "") return;

        const index = cell.getAttribute('data-index');
        boardState[index] = currentPlayer;
        cell.textContent = currentPlayer;

        // aplica a cor correta com base no jogador
        if (currentPlayer === "1") {
            cell.classList.add("red"); // para o jogador 1 (vermelho)
        } else {
            cell.classList.add("white"); // para o jogador 0 (branco)
        }
        cell.classList.add("occupied");

        if (checkWinner()) {
            statusText.textContent = `Jogador ${currentPlayer} venceu esta rodada!`;
            updateScore(currentPlayer);
            gameActive = false; // bloqueia o tabuleiro
            checkGameOver(); // verifica se alguém ganhou o melhor de 3
        } else if (boardState.every(cell => cell !== null)) {
            statusText.textContent = "Empate!";
            gameActive = false;
            setTimeout(resetBoard, 2000); // reinicia após empate
        } else {
            // alterna o jogador após cada rodada
            currentPlayer = currentPlayer === "1" ? "0" : "1";
            statusText.textContent = `Vez do Jogador ${currentPlayer}`;
        }
    });
});

// atualiza placar
function updateScore(player) {
    if (player === "0") {
        player0Score++;
        score0.textContent = player0Score;
    } else {
        player1Score++;
        score1.textContent = player1Score;
    }
}

// verifica se alguém atingiu 3 pontos
function checkGameOver() {
    if (player0Score >= 3) {
        statusText.textContent = "Jogador 0 (Branco) venceu o melhor de 3!";
        setTimeout(resetGame, 3000); // reinicia o jogo após o vencedor
    } else if (player1Score >= 3) {
        statusText.textContent = "Jogador 1 (Vermelho) venceu o melhor de 3!";
        setTimeout(resetGame, 3000); // reinicia o jogo após o vencedor
    } else {
        setTimeout(resetBoard, 2000); // reinicia a rodada
    }
}

// reinicia o tabuleiro após uma rodada
function resetBoard() {
    gameActive = true;
    boardState = Array(9).fill(null); // reseta o estado do tabuleiro
    cells.forEach(cell => {
        cell.textContent = "";
        cell.classList.remove("white", "red", "occupied");
    });
    // a cada rodada (vitória ou empate), troca o jogador
    currentPlayer = currentPlayer === "1" ? "0" : "1";
    statusText.textContent = `Vez do Jogador ${currentPlayer}`;
}

// reinicia o jogo quando alguém atingir 3 pontos
function resetGame() {
    player0Score = 0;
    player1Score = 0;
    score0.textContent = player0Score;
    score1.textContent = player1Score;
    resetBoard();
}

// verifica se ha vitória
function checkWinner() {
    return winningCombinations.some(combination => {
        return combination.every(index => boardState[index] === currentPlayer);
    });
}
