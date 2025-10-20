const gridContainer = document.querySelector('.grid-container');

for (let i = 0; i < 15; i++) {
    const cell = document.createElement('div');
    cell.classList.add('cell');
    gridContainer.appendChild(cell);
}