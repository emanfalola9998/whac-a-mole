import './main.scss';

const cells = document.querySelectorAll(".board__cell") as NodeListOf<HTMLElement>;
const timeRemaining = document.querySelector(".time-remaining") as HTMLElement;
const score = document.querySelector(".score-runner") as HTMLElement;
const startGameButton = document.querySelector(".start-game") as HTMLButtonElement;
const inputDifficulty = document.querySelector(".input-difficulty") as HTMLInputElement;
const setTimer = document.querySelector(".timer") as HTMLInputElement;
const resetButton = document.querySelector(".reset-game") as HTMLButtonElement;

if (!cells || !timeRemaining || !score || !inputDifficulty || !setTimer || !resetButton) {
    throw new Error("Required elements not found.");
}

let result: number = 0;
let correctCell: string|null;

let countdownTimer:  number| null = null;
let timeLeft: number = parseInt(timeRemaining.innerText, 10); 
let moleMovementTimer: number | null = null;

const randomCell = () => {
  const screenWidth = window.innerWidth;
  console.log('Screen width:', screenWidth);

  const hiddenMobileArray: string[] = [];
    cells.forEach((cell) => {
        cell.classList.remove("mole");
        if(cell.classList.contains("hidden-mobile") && screenWidth < 768)
          hiddenMobileArray.push("a")
    });
    console.log("hiddenMobileArray:", hiddenMobileArray);
    
    
    let randomIndex: number = Math.floor(Math.random() * (cells.length-hiddenMobileArray.length))
    let randomPosition: HTMLElement = cells[randomIndex];
    randomPosition.classList.add("mole");

    correctCell = randomPosition.id;
}


const prerequisites = () => {
  cells.forEach(cell => {
    cell.addEventListener('mousedown', () => {
        if (cell.id === correctCell) {
          result++;
          score.innerText = result.toString();
          correctCell = null
        }
    });
});

  cells.forEach((cell) => {
    cell.addEventListener("click", () => {
    });
  });
}



const randomMoleMovement = (inputDifficulty: HTMLInputElement) => {
  if (moleMovementTimer) clearInterval(moleMovementTimer)
  if(inputDifficulty.value == ""){
    inputDifficulty.value = "1000" 
  }
  moleMovementTimer = setInterval(randomCell, parseInt(inputDifficulty.value))
}

const startCountdown = () => {
  if (countdownTimer) clearInterval(countdownTimer);
  if(setTimer.value == ""){
    setTimer.value = "70"
  }
  timeLeft = parseInt(setTimer.value); 
  timeRemaining.innerText = timeLeft.toString(); 

  countdownTimer = setInterval(() => {
      timeLeft--;
      timeRemaining.innerText = timeLeft.toString();

      if (timeLeft <= 0 && countdownTimer !== null) {
          clearInterval(countdownTimer);
          alert(`Time's up! Your Final Score is ${score.innerText}`);
          resetGame();
      }
  }, 1000);
}




const resetGame = () => {
  result = 0;
  score.innerText = "0";

  if (countdownTimer) clearInterval(countdownTimer);
  countdownTimer = null;
  setTimer.value = "";
  timeRemaining.innerText = "0";

  if (moleMovementTimer)  clearInterval(moleMovementTimer);
  moleMovementTimer = null;
  cells.forEach((cell) => {
      cell.classList.remove("mole");
      console.log("mole class removed")
  });
  console.log("Game reset successfully");
};



startGameButton.addEventListener("click", () => {
  prerequisites()
  randomCell();
  startCountdown();
  randomMoleMovement(inputDifficulty);
});

resetButton.addEventListener("click", () => {
    resetGame(); 
});
