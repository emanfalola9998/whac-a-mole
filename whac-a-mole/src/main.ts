import './main.scss';

const cells = document.querySelectorAll(".board__cell") as NodeListOf<HTMLElement>;
const timeRemaining = document.querySelector(".time-remaining") as HTMLElement;
const score = document.querySelector(".score-runner") as HTMLElement;
const startGameButton = document.querySelector(".start-game") as HTMLButtonElement;
const inputDifficulty = document.querySelector(".input-difficulty") as HTMLInputElement;
const setTimer = document.querySelector(".timer") as HTMLInputElement;

if (!cells || !timeRemaining || !score || !inputDifficulty || !setTimer) {
    throw new Error("Required elements not found.");
}

let result: number = 0;
let correctCell: string|null;

let countdownTimer:  number| null = null;
let timeLeft: number = parseInt(timeRemaining.innerText, 10); // Initial time left (in seconds)

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



const randomMoleMovement = (inputDifficulty: HTMLInputElement) => {
  let moleMovementTimer = 0;
  moleMovementTimer = setInterval(randomCell, parseInt(inputDifficulty.value))
}

const startCountdown = () => {
  if (countdownTimer) clearInterval(countdownTimer);

  timeLeft = parseInt(setTimer.value); 
  timeRemaining.innerText = timeLeft.toString(); 

  countdownTimer = setInterval(() => {
      timeLeft--;
      timeRemaining.innerText = timeLeft.toString();

      if (timeLeft <= 0 && countdownTimer !== null) {
          clearInterval(countdownTimer);
          alert(`Time's up! Your Final Score is ${score.innerText}`);
      }
  }, 1000);
}


cells.forEach((cell) => {
  cell.addEventListener("click", () => {
  });
});

startGameButton.addEventListener("click", () => {
  randomCell();
  startCountdown();
  randomMoleMovement(inputDifficulty);
});