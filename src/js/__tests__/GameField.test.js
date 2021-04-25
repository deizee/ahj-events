import GameField from '../GameField';

function generateGameField() {
  const gameContainerElement = document.createElement('div');
  gameContainerElement.classList.add('container');
  const gameField = new GameField(gameContainerElement);
  gameField.drawGameField();

  return gameField;
}

test('Метод showImage добавляет div с картинкой в определенную ячейку, а метод removeImage удаляет', () => {
  const gameField = generateGameField();

  gameField.showImage(1);
  expect(gameField.cells[1].firstElementChild.classList.contains('image-container')).toBeTruthy();

  gameField.removeImage(1);
  expect(gameField.cells[1].children.length).toBe(0);

  gameField.removeImage(5);
  expect(gameField.cells[5].children.length).toBe(0);
});

jest.useFakeTimers();
test('Метод changeCursor меняет курсор с поднятого молотка на опущенный и по таймеру - обратно', () => {
  const gameContainerElement = document.createElement('div');
  gameContainerElement.classList.add('container');
  const gameField = new GameField(gameContainerElement);
  gameField.drawGameField();
  gameField.changeCursor();
  expect(gameContainerElement.querySelector('.gameField').classList.contains('cursor-hummer')).not.toBeTruthy();
  expect(gameContainerElement.querySelector('.gameField').classList.contains('cursor-hummer-down')).toBeTruthy();

  jest.runAllTimers();
  expect(gameContainerElement.querySelector('.gameField').classList.contains('cursor-hummer-down')).not.toBeTruthy();
  expect(gameContainerElement.querySelector('.gameField').classList.contains('cursor-hummer')).toBeTruthy();
});

test('Метод renderScores отрисовывет значение scores', () => {
  const gameField = generateGameField();
  gameField.renderScores(5);

  expect(gameField.scoresSpan.textContent).toBe('5');
});

test('Метод renderMissed отрисовывет значение missed', () => {
  const gameField = generateGameField();
  gameField.renderMissed(5);

  expect(gameField.missedSpan.textContent).toBe('5');
});

test('Метод addCellClickListener пушит переданные парамерты в массив', () => {
  const gameField = generateGameField();
  gameField.addCellClickListener('test');

  expect(gameField.cellClickListeners).toEqual(['test']);
});

test('Метод onCellClick вызывает коллбеки из массива коллбеков', () => {
  const gameField = generateGameField();
  let fn1 = () => {};
  let fn2 = () => {};
  fn1 = jest.fn();
  fn2 = jest.fn();
  gameField.addCellClickListener(() => fn1());
  gameField.addCellClickListener(() => fn2());

  gameField.onCellClick({ currentTarget: document.createElement('div') });

  expect(fn1).toBeCalled();
  expect(fn2).toBeCalled();
});
