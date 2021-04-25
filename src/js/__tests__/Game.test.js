import Game from '../Game';

test('Метод init вызывает методы drawGameField, addCellClickListener и start', () => {
  const game = new Game(document.createElement('div'));
  game.gameField.drawGameField = jest.fn();
  game.gameField.addCellClickListener = jest.fn();
  game.start = jest.fn();
  game.init();

  expect(game.gameField.drawGameField).toBeCalled();
  expect(game.gameField.addCellClickListener).toBeCalled();
  expect(game.start).toBeCalled();
});

test('Метод generateRandomIndex возвращает число в диапазоне от 0 до 16', () => {
  const game = new Game(document.createElement('div'));
  expect(game.generateRandomIndex()).toBeLessThan(17);
});

test('Метод showImage вызывает методы removeImage и showImage у gameField', () => {
  const game = new Game(document.createElement('div'));
  game.gameField.removeImage = jest.fn();
  game.gameField.showImage = jest.fn();
  game.showImage();

  expect(game.gameField.removeImage).toBeCalled();
  expect(game.gameField.showImage).toBeCalled();
});

test('Метод onCellClick вызывает метод changeCursor и увеличивает очки, если кликнули на ячейку с гоблином', () => {
  const game = new Game(document.createElement('div'));
  game.gameField.changeCursor = jest.fn();
  game.gameField.renderScores = jest.fn();
  game.currentPosition = 5;
  game.onCellClick(5);

  expect(game.gameField.changeCursor).toBeCalled();
  expect(game.scores).toBe(1);
  expect(game.gameField.renderScores).toBeCalled();
});

test('Метод onCellClick увеличивает значение промахов, если кликнули на пустую ячейку', () => {
  const game = new Game(document.createElement('div'));
  game.gameField.changeCursor = jest.fn();
  game.gameField.renderMissed = jest.fn();
  game.currentPosition = 5;
  game.onCellClick(3);

  expect(game.missed).toBe(1);
  expect(game.gameField.renderMissed).toBeCalled();
});

test('Если сделали пятый промах, то метод onCellClick вызывает alert и обнуляет значения очков и промахов', () => {
  const game = new Game(document.createElement('div'));
  game.gameField.changeCursor = jest.fn();
  game.gameField.renderScores = jest.fn();
  game.gameField.renderMissed = jest.fn();
  window.alert = jest.fn();
  game.currentPosition = 5;
  game.scores = 10;
  game.missed = 4;
  game.onCellClick(3);

  expect(window.alert).toBeCalled();
  expect(game.scores).toBe(0);
  expect(game.missed).toBe(0);
});
