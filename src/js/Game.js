import GameField from './GameField';

class Game {
  constructor(container) {
    this.gameField = new GameField(container);
    this.currentPosition = 0;
    this.scores = 0;
    this.missed = 0;
  }

  init() {
    this.gameField.generateGameField();
    this.gameField.addCellClickListener(this.onCellClick.bind(this));
    this.start();
  }

  start() {
    setInterval(() => {
      this.showImage();
    }, 1000);
  }

  generateRandomIndex() {
    return Math.floor(Math.random() * 16);
  }

  showImage() {
    let randomIndex = this.generateRandomIndex();
    while (randomIndex === this.currentPosition) {
      randomIndex = this.generateRandomIndex();
    }

    this.gameField.removeImage(this.currentPosition);
    this.currentPosition = randomIndex;
    this.gameField.showImage(this.currentPosition);
  }

  onCellClick(index) {
    this.gameField.changeCursor();

    if (this.currentPosition === index) {
      this.scores += 1;
      this.gameField.renderScores(this.scores);
      return;
    }

    this.missed += 1;
    this.gameField.renderMissed(this.missed);

    if (this.missed === 5) {
      // eslint-disable-next-line no-alert
      alert(`Your scores: ${this.scores}. Try again`);
      this.scores = 0;
      this.missed = 0;
      this.gameField.renderScores();
      this.gameField.renderMissed();
    }
  }
}

export default Game;
