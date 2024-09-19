let input = Array.from(document.querySelectorAll(".box"));
let resetBtn = document.querySelector("#reset-btn");
let newGame = document.querySelector("#new-btn");
let msgContainer = document.querySelector(".msg-container");
let msg = document.querySelector("#msg");
let game = document.querySelector(".container");

let turn0 = true;

const winPatterns = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

const resetField = () => {
  turn0 = true;
  enableBoxes();
  msgContainer.classList.add("hide");
  game.classList.remove("hide");
};

const newField = () => {
  resetField();
};

const disableBoxes = () => {
  input.forEach((box) => {
    box.disabled = true;
  });
};

const enableBoxes = () => {
  input.forEach((box) => {
    box.disabled = false;
    box.innerText = "";
  });
};

const showWinner = (winner) => {
  msg.innerText = `Congratulations, Winner is ${winner}`;
  msgContainer.classList.remove("hide");
  game.classList.add("hide");
//   disableBoxes();
//   input.forEach(box=>{
//     box.innerText = "";
//   })
};

const checkWinner = () => {
  for (let pattern of winPatterns) {
    let val1 = input[pattern[0]].innerText;
    let val2 = input[pattern[1]].innerText;
    let val3 = input[pattern[2]].innerText;

    if (val1 != "" && val2 != "" && val3 != "") {
      if (val1 === val2 && val2 === val3) {
        showWinner(val1);
        return; // Stop the game after finding a winner
      }
    }
  }

  // Check for a tie after checking the winner
  let allFilled = input.every((box) => box.innerText !== "");
  if (allFilled) {
    msg.innerText = "It's a tie!";
    msgContainer.classList.remove("hide");
    disableBoxes();
    game.classList.add("hide");
  }
};

input.forEach((box) => {
  box.addEventListener("click", () => {
    if (box.innerText === "") {  // Prevent re-clicking a filled box
      if (turn0) {
        box.innerText = "O";
        turn0 = false;
      } else {
        box.innerText = "X";
        turn0 = true;
      }
      box.disabled = true;  // Disable the box after clicking
      checkWinner();
    }
  });
});

resetBtn.addEventListener("click", resetField);
newGame.addEventListener("click", newField);
