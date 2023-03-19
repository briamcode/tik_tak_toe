
const cells = document.querySelectorAll('.cell');
const status = document.querySelector('.status');
const resetButton = document.querySelector('.reset-button');
const xClass = 'x';
const oClass = 'o';
let currentClass = xClass;
let gameActive = true;
let gameState = ['', '', '', '', '', '', '', '', ''];




// Variable de contador para numerar las celdas
let cellCounter = 1;

// Función para crear el tablero
function createBoard() {
    cells.forEach((cell) => {
        cell.classList.remove(xClass);
        cell.classList.remove(oClass);
        cell.textContent = cellCounter; // Agrega número a cada celda
        cellCounter++; // Actualiza el contador de celdas
        cell.addEventListener('click', handleCellClick, { once: true });
    });
    status.innerHTML = `It's ${currentClass.toUpperCase()}'s turn`;
}

// Función que se llama cuando se hace clic en una celda
function handleCellClick(e) {
    const cell = e.target;
    const index = Array.from(cells).indexOf(cell);

    // Si la celda ya está marcada o el juego está inactivo, no hacemos nada
    if (gameState[index] !== '' || !gameActive) {
        return;
    }

    // Marcamos la celda con la clase correspondiente
    cell.classList.add(currentClass);

    // Actualizamos el estado del juego
    gameState[index] = currentClass;

    // Revisamos si alguien ganó
    if (checkWin()) {
        gameActive = false;
        status.innerHTML = `${currentClass.toUpperCase()} won the game!`;
        return;
    }

    // Revisamos si hay empate
    if (checkDraw()) {
        gameActive = false;
        status.innerHTML = `It's a tie!`;
        let countdown = 5;
        const intervalId = setInterval(() => {
            status.innerHTML = `Restarting in ${countdown} seconds`;
            countdown--;
            if (countdown < 0) {
                clearInterval(intervalId);
                resetGame();
            }
        }, 1000);
        return;
    }

    // Cambiamos de jugador
    currentClass = currentClass === xClass ? oClass : xClass;
    status.innerHTML = `It's ${currentClass.toUpperCase()}'s turn`;
}

// Función que revisa si alguien ganó
function checkWin() {
    const winConditions = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6],
    ];
    return winConditions.some((condition) => {
        return condition.every((index) => {
            return gameState[index] === currentClass;
        });
    });
}

// Función que revisa si hay empate
function checkDraw() {
    return gameState.every((cell) => {
        return cell !== '';
    });
}

// Función que reinicia el juego
function resetGame() {
    currentClass = xClass;
    gameActive = true;
    gameState = ['', '', '', '', '', '', '', '', ''];
    cellCounter = 1; // Reinicia el contador de celdas
    createBoard(); // Vuelve a crear el tablero con las celdas numeradas

}

// Crear el tablero al cargar la página
createBoard();

// Agregamos un evento
cells.forEach((cell, index) => {
    cell.innerText = index + 1; // Agregamos el número de celda
    cell.addEventListener('click', handleCellClick);
});

// Agregamos un evento para detectar las teclas presionadas
document.addEventListener('keydown', handleKeyPress);

// Función que maneja las teclas presionadas
function handleKeyPress(event) {
    // Verificamos si el juego aún está activo
    if (!gameActive) {
        return;
    }

    // Verificamos si la tecla presionada es un número del 1 al 9
    if (event.keyCode >= 49 && event.keyCode <= 57) {
        const num = event.keyCode - 48; // Obtenemos el número correspondiente
        const cell = cells[num - 1]; // Obtenemos la celda correspondiente
        if (!cell.classList.contains(xClass) && !cell.classList.contains(oClass)) {
            // Si la celda no ha sido marcada, la marcamos con la clase correspondiente
            cell.classList.add(currentClass);
            // Actualizamos el estado del juego
            gameState[num - 1] = currentClass;

            // Revisamos si alguien ganó
            if (checkWin()) {
                gameActive = false;
                status.innerHTML = `${currentClass.toUpperCase()} won the game!`;
                let countdown = 5;
                const intervalId = setInterval(() => {
                    status.innerHTML = `Restarting in ${countdown} seconds`;
                    countdown--;
                    if (countdown < 0) {
                        clearInterval(intervalId);
                        resetGame();
                    }
                }, 1000);
                return;
            }

            // Revisamos si hay empate
            if (checkDraw()) {
                gameActive = false;
                status.innerHTML = `It's a tie!`;
                let countdown = 5;
                const intervalId = setInterval(() => {
                    status.innerHTML = `Restarting in ${countdown} seconds`;
                    countdown--;
                    if (countdown < 0) {
                        clearInterval(intervalId);
                        resetGame();
                    }
                }, 1000);
                return;
            }

            // Cambiamos de jugador
            currentClass = currentClass === xClass ? oClass : xClass;
            status.innerHTML = `It's ${currentClass.toUpperCase()}'s turn`;
        }
    }
}






