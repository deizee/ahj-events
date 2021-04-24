class GameField {
  constructor(container) {
    this.container = container;
    this.cells = [];
    this.cellClickListeners = [];
  }

  generateGameField() {
    const scoresP = document.createElement('p');
    const missedP = document.createElement('p');
    this.scoresSpan = document.createElement('span');
    this.missedSpan = document.createElement('span');
    this.scoresSpan.textContent = '0';
    this.missedSpan.textContent = '0';
    scoresP.textContent = 'Scores: ';
    missedP.textContent = 'Missed: ';
    scoresP.appendChild(this.scoresSpan);
    missedP.appendChild(this.missedSpan);

    this.container.appendChild(scoresP);
    this.container.appendChild(missedP);

    const gameField = document.createElement('div');
    gameField.classList.add('gameField');
    gameField.classList.add('cursor-hummer');
    for (let i = 0; i < 16; i += 1) {
      const cell = document.createElement('div');
      cell.classList.add('cell');
      cell.addEventListener('click', (event) => this.onCellClick(event));
      gameField.appendChild(cell);
    }
    this.cells = [...gameField.children];
    this.container.appendChild(gameField);
  }

  removeImage(index) {
    if (this.cells[index].firstElementChild === null) {
      return;
    }

    this.cells[index].firstElementChild.remove();
  }

  showImage(index) {
    const imageContainer = document.createElement('div');
    imageContainer.classList.add('image-container');
    this.cells[index].appendChild(imageContainer);
  }

  changeCursor() {
    this.container.querySelector('.gameField').classList.remove('cursor-hummer');
    this.container.querySelector('.gameField').classList.add('cursor-hummer-down');
    this.timerId = setTimeout(() => {
      this.container.querySelector('.gameField').classList.remove('cursor-hummer-down');
      this.container.querySelector('.gameField').classList.add('cursor-hummer');
      this.timerId = null;
    }, 300);
  }

  renderScores(scores = 0) {
    this.scoresSpan.textContent = scores;
  }

  renderMissed(missed = 0) {
    this.missedSpan.textContent = missed;
  }

  addCellClickListener(callback) {
    this.cellClickListeners.push(callback);
  }

  onCellClick(event) {
    const index = this.cells.indexOf(event.currentTarget);
    this.cellClickListeners.forEach((o) => o.call(null, index));
  }
}

export default GameField;
