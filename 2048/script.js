let grid = Array(16).fill(0);
let score = 0;

function setCellStyle(cell, value) {
    cell.classList.remove('tile-2', 'tile-4', 'tile-8', 'tile-16', 'tile-32', 'tile-64', 'tile-128', 'tile-256', 'tile-512', 'tile-1024', 'tile-2048', 'tile-new', 'tile-merge');
    if (value) {
        cell.classList.add(`tile-${value}`);
    }
}

function updateScore() {
    document.getElementById('score').textContent = score;
}

function getHighestTileColor() {
    const maxValue = Math.max(...grid);
    if (!maxValue || maxValue < 2) return '#faf8ef';
    const tileColors = {
        2: '#eee4da',
        4: '#ede0c8',
        8: '#f2b179',
        16: '#f59563',
        32: '#f67c5f',
        64: '#f65e3b',
        128: '#edcf72',
        256: '#edcc61',
        512: '#edc850',
        1024: '#edc53f',
        2048: '#edc22e'
    };
    return tileColors[maxValue] || '#faf8ef';
}

function updateBackgroundColor() {
    document.body.style.background = getHighestTileColor();
}

function updateDisplay() {
    const cells = document.querySelectorAll('.cell');
    cells.forEach((cell, index) => {
        const value = grid[index];
        cell.textContent = value || '';
        setCellStyle(cell, value);
    });
    updateScore();
    updateBackgroundColor();
}

function spawnRandomTile() {
    const emptyCells = grid
        .map((val, idx) => val === 0 ? idx : -1)
        .filter(idx => idx !== -1);
    if (emptyCells.length === 0) return false;
    const randomIndex = emptyCells[Math.floor(Math.random() * emptyCells.length)];
    const value = Math.random() < 0.8 ? 2 : 4;
    grid[randomIndex] = value;
    setTimeout(() => {
        const cells = document.querySelectorAll('.cell');
        const cell = cells[randomIndex];
        cell.classList.add('tile-new');
        setTimeout(() => cell.classList.remove('tile-new'), 500);
    }, 10);
    return true;
}

function initGame() {
    const gridContainer = document.querySelector('.grid-container');
    gridContainer.innerHTML = '';
    grid = Array(16).fill(0);
    score = 0;

    for (let i = 0; i < 16; i++) {
        const cell = document.createElement('div');
        cell.classList.add('cell');
        gridContainer.appendChild(cell);
    }
    
    spawnRandomTile();
    spawnRandomTile();
    updateDisplay();
    updateBackgroundColor();
}

function getLine(startIndex, step, count = 4) {
    const line = [];
    for (let i = 0; i < count; i++) {
        line.push(grid[startIndex + i * step]);
    }
    return line;
}

function setLine(startIndex, step, line) {
    for (let i = 0; i < line.length; i++) {
        grid[startIndex + i * step] = line[i];
    }
}

function mergeLine(line, startIndex, step) {
    let newLine = line.filter(val => val !== 0);
    const mergedIndices = [];
    
    for (let i = 0; i < newLine.length - 1; i++) {
        if (newLine[i] === newLine[i + 1]) {
            newLine[i] *= 2;
            score += newLine[i];
            mergedIndices.push(i);
            newLine.splice(i + 1, 1);
        }
    }
    
    while (newLine.length < 4) {
        newLine.push(0);
    }
    
    if (mergedIndices.length > 0) {
        setTimeout(() => {
            const cells = document.querySelectorAll('.cell');
            mergedIndices.forEach(mergePos => {
                const cellIndex = startIndex + mergePos * step;
                cells[cellIndex].classList.add('tile-merge');
                setTimeout(() => cells[cellIndex].classList.remove('tile-merge'), 400);
            });
        }, 50);
    }
    
    return newLine;
}

function move(direction) {
    let moved = false;
    const oldGrid = [...grid];
    
    if (direction === 'left') {
        for (let row = 0; row < 4; row++) {
            const line = getLine(row * 4, 1);
            const newLine = mergeLine(line, row * 4, 1);
            setLine(row * 4, 1, newLine);
        }
    } else if (direction === 'right') {
        for (let row = 0; row < 4; row++) {
            const line = getLine(row * 4, 1);
            const reversed = line.reverse();
            const merged = mergeLine(reversed, row * 4 + 3, -1);
            const newLine = merged.reverse();
            setLine(row * 4, 1, newLine);
        }
    } else if (direction === 'up') {
        for (let col = 0; col < 4; col++) {
            const line = getLine(col, 4);
            const newLine = mergeLine(line, col, 4);
            setLine(col, 4, newLine);
        }
    } else if (direction === 'down') {
        for (let col = 0; col < 4; col++) {
            const line = getLine(col, 4);
            const reversed = line.reverse();
            const merged = mergeLine(reversed, col + 12, -4);
            const newLine = merged.reverse();
            setLine(col, 4, newLine);
        }
    }
    
    moved = oldGrid.some((val, idx) => val !== grid[idx]);
    
    return moved;
}

function handleArrow(key) {
    const directionMap = {
        'ArrowUp': 'up',
        'ArrowDown': 'down',
        'ArrowLeft': 'left',
        'ArrowRight': 'right'
    };
    
    const direction = directionMap[key];
    if (!direction) return;
    
    const moved = move(direction);
    
    if (moved) {
        spawnRandomTile();
        updateDisplay();
    }
}

function playGame() {
    document.addEventListener('keydown', (event) => {
        if (['ArrowUp','ArrowDown','ArrowLeft','ArrowRight'].includes(event.key)) {
            event.preventDefault();
            handleArrow(event.key);
        }
    });

}

document.querySelector('#restart-btn').onclick = function() {
    initGame();
};

initGame();
playGame();
