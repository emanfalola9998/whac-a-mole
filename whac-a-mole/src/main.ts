import './main.scss';

const cells = document.querySelectorAll(".board__cell") as NodeListOf<HTMLElement>;
const mole = document.querySelector(".mole") as HTMLElement | null;
const timeRemaining = document.querySelector(".time-remaining") as HTMLElement;
const score = document.querySelector(".score-runner") as HTMLElement;

if (!cells || !timeRemaining || !score) {
    throw new Error("Required elements not found.");
}

let result = 0;

const randomCell = () => {
  cells.forEach((cell) => {
      cell.classList.remove("mole");
  });

  let randomIndex = Math.floor(Math.random() * cells.length);
  let randomPosition = cells[randomIndex];
  randomPosition.classList.add("mole");
}

randomCell();


cells.forEach((cell) => {
  cell.addEventListener("click", () => {
  });
});
