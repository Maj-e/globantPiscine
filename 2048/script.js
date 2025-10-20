let activeIndex = 1;

function initGame()
{
    const gridContainer = document.querySelector('.grid-container');

    for (let i = 0; i < 16; i++) {
        const cell = document.createElement('div');
        cell.classList.add('cell');
        cell.dataset.index = i + 1;
        cell.textContent = i + 1;
        gridContainer.appendChild(cell);
        setActive(activeIndex);

    }
}

function setActive(index) {
    const prev = document.querySelector(`[data-index="${activeIndex}"]`);
    if (prev) prev.classList.remove('colorGrid');

    const next = document.querySelector(`[data-index="${index}"]`);
    if (next) next.classList.add('colorGrid');

    activeIndex = index;
}

function handleArrow(key) {
    const row = Math.floor((activeIndex - 1) / 4);
    const col = (activeIndex - 1) % 4;

    let newRow = row;
    let newCol = col;

    switch (key) {
        case 'ArrowUp':
            if (row > 0) newRow--;
            break;
        case 'ArrowDown':
            if (row < 3) newRow++;
            break;
        case 'ArrowLeft':
            if (col > 0) newCol--;
            break;
        case 'ArrowRight':
            if (col < 3) newCol++;
            break;
        default:
            return;
    }

    const newIndex = newRow * 4 + newCol + 1;
    setActive(newIndex);
}

function playGame()
{
    document.addEventListener('keydown', (event) => {
        if (['ArrowUp','ArrowDown','ArrowLeft','ArrowRight'].includes(event.key)) {
            event.preventDefault();
            handleArrow(event.key);
        }
    });
}
initGame();
playGame();