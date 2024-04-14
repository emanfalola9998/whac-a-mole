import './main.scss';

const cells = document.querySelectorAll(".board__cell") as NodeListOf<HTMLElement>;
const timeRemaining = document.querySelector(".time-remaining") as HTMLElement;
const score = document.querySelector(".score-runner") as HTMLElement;
const startGameButton = document.querySelector(".start-game") as HTMLButtonElement;
const inputDifficulty = document.querySelector(".input-difficulty") as HTMLInputElement;
const setTimer = document.querySelector(".timer") as HTMLInputElement;
const resetButton = document.querySelector(".reset-game") as HTMLButtonElement;
const body = document.querySelector("body");
const nextLevelButton = document.querySelector(".next-level") as HTMLButtonElement;
const heading = document.querySelector(".medium-difficulty-hidden");

if (!cells || !timeRemaining || !score || !inputDifficulty || !setTimer || !resetButton || !body || !nextLevelButton || !heading) {
    throw new Error("Required elements not found.");
}

let setTimerValue = "0";


let scoreGlobal = 0;
let result: number = 0;
let correctCell: string|null;

let countdownTimer:  number| null = null;
let timeLeft: number = parseInt(timeRemaining.innerText, 10); 
let moleMovementTimer: number | null = null;
let nextLevelReset = false;


const randomCell = () => {
  const screenWidth = window.innerWidth;
  // console.log('Screen width:', screenWidth);

  const hiddenMobileArray: string[] = [];
    cells.forEach((cell) => {
        cell.classList.remove("mole");
        if(cell.classList.contains("board__cell--hidden-mobile") && screenWidth < 768)
          hiddenMobileArray.push("a")
    });
    // console.log("hiddenMobileArray:", hiddenMobileArray);
    
    
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

const startCountdown = (setTimerValue: string) => {
  if (countdownTimer) clearInterval(countdownTimer);
  if(setTimer.value == "" && setTimerValue == "0"){
    setTimer.value = "70"
  }
  else if (setTimerValue != "0"){
    setTimer.value = setTimerValue;
  }
  timeLeft = parseInt(setTimer.value); 
  timeRemaining.innerText = timeLeft.toString(); 

  countdownTimer = setInterval(() => {
      timeLeft--;
      timeRemaining.innerText = timeLeft.toString();

      if (timeLeft <= 0 && countdownTimer !== null) {
          clearInterval(countdownTimer);
          alert(`Time's up! Your Final Score is ${score.innerText}`);
          if (parseInt(score.innerText)  && parseInt(score.innerText) > 2){
            // console.log("next level time");
            
            scoreGlobal = parseInt(score.innerText)
            // console.log("scoreGlobal:", scoreGlobal );
          
            // console.log("nextLevelReset:", nextLevelReset);
            
          }
          resetGame();
      }
  }, 1000);
}


const mediumDifficulty = (scored: number,) => {
  console.log("mediumDifficulty");
  const threshold = 2;
  if (scored > threshold){
    heading.classList.remove("medium-difficulty-hidden");
    body.classList.add("medium");
    cells.forEach(cell => {
      cell.classList.add("medium");
    });
    setTimerValue = "10";
    startCountdown(setTimerValue);
    if (moleMovementTimer) clearInterval(moleMovementTimer);
    inputDifficulty.value = "250"; 
    // console.log(inputDifficulty.value);
    
    moleMovementTimer = setInterval(randomCell, parseInt(inputDifficulty.value));
    // console.log("medium level");
    scoreGlobal = parseInt(score.innerText);
    resetGame();
    nextLevelReset = true;
  }
}




const resetGame = () => {
  console.log("run");
  console.log("nextLevelReset:" ,nextLevelReset);
  
  result = 0;
  score.innerText = "0";

  if (countdownTimer) clearInterval(countdownTimer);
  countdownTimer = null;
  setTimer.value = "";
  timeRemaining.innerText = "0";

  if (moleMovementTimer)  clearInterval(moleMovementTimer);
  moleMovementTimer = null;
  // inputDifficulty.value = "1000"
  cells.forEach((cell) => {
      cell.classList.remove("mole");
      // console.log("mole class removed")
  });
  // console.log("Game reset successfully");
  if (nextLevelReset) {
    heading.classList.add("medium-difficulty-hidden");
    body.classList.remove("medium");
    cells.forEach(cell => {
      cell.classList.remove("medium");
    });
    setTimerValue = "0";
    inputDifficulty.value = "1000"
    nextLevelReset = false;
  }
};

// console.log("tracking score:", scoreGlobal)

startGameButton.addEventListener("click", () => {
  prerequisites()
  randomCell();
  startCountdown(setTimerValue);
  randomMoleMovement(inputDifficulty);
});



resetButton.addEventListener("click", () => {
    resetGame(); 
});

nextLevelButton.addEventListener("click", () => {
  mediumDifficulty(scoreGlobal);
});


