const field = document.querySelector(".field"); // обращаемся к field
const cellSize = 100; // размер ячейки

const empty = {
  top: 0,
  left: 0,
}; // пустая ячейка вверху слева, ряды 0,1,2,3  строки 0,1,2,3

// создадим массив
const cells = [];
cells.push(empty);

function move(index) {
  const cell = cells[index];
  const leftDiff = Math.abs(empty.left - cell.left);
  const topDiff = Math.abs(empty.top - cell.top);
  if (leftDiff + topDiff > 1) {
    return;
  }
  // задаем координаты пустой ячейки
  cell.element.style.left = `${empty.left * cellSize}px`;
  cell.element.style.top = `${empty.top * cellSize}px`;

  // обновляем промежуточные координаты для пустой ячейки
  const emptyLeft = empty.left;
  const emptyTop = empty.top;
  // в координаты пустой клетки записываем текущие координаты пустой ячейки
  empty.left = cell.left;
  empty.top = cell.top;
  cell.left = emptyLeft;
  cell.top = emptyTop;
}
// перетасовка ячеек
const numbers = [...Array(15).keys()].sort(() => Math.random() - 0.5);
// создание разметки
for (let i = 1; i <= 15; i++) {
  const cell = document.createElement("div"); //создаем элемент div
  cell.className = "cell";
  cell.innerHTML = numbers[i - 1] + 1;

  const left = i % 4;
  const top = (i - left) / 4;

  cells.push({
    left: left,
    top: top,
    element: cell,
  });

  cell.style.left = `${left * cellSize}px`;
  cell.style.top = `${top * cellSize}px`;
  // добавление элементов на страницу
  field.append(cell);
  // запускаем обработчик событий, при нажатии на ячейку будет срабатывать функция
  cell.addEventListener("click", () => {
    move(i);
  });
}
