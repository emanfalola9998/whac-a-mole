import './main.scss';

const cells = document.querySelectorAll(".board__cell") as NodeListOf<HTMLElement>;
const mole = document.querySelector(".mole") as HTMLElement | null;
const timeRemaining = document.querySelector(".time-remaining") as HTMLElement;
const score = document.querySelector(".score-runner") as HTMLElement;
const startGameButton = document.querySelector(".start-game") as HTMLButtonElement;


if (!cells || !timeRemaining || !score) {
    throw new Error("Required elements not found.");
}

let result: number = 0;
let correctCell: string|null;


const randomCell = () => {
    cells.forEach((cell) => {
        cell.classList.remove("mole");
    });

    let randomIndex: number = Math.floor(Math.random() * cells.length);
    let randomPosition: HTMLElement = cells[randomIndex];
    randomPosition.classList.add("mole");

    correctCell = randomPosition.id;
}

cells.forEach(cell => {
    cell.addEventListener('mousedown', () => {
        if (cell.id === correctCell) {
          result++;
          score.innerText = result.toString();
          correctCell = null
        }
    });
});



const randomMoleMovement = () => {
  let timer = 0;
  timer = setInterval(randomCell, 1000)
}




cells.forEach((cell) => {
  cell.addEventListener("click", () => {
  });
});

startGameButton.addEventListener("click", randomMoleMovement)