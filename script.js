let boxes = document.querySelectorAll(".box");
let btn = document.querySelector(".reset");
let msgContainer = document.querySelector(".msg-container");
let newGamebtn = document.querySelector(".new-btn");
let msgPara = document.querySelector("#msg");

let turnO = true;
let count = 0;

const winPatterns = [
    [0,1,2],
    [0,3,6],
    [0,4,8],
    [1,4,7],
    [2,5,8],
    [2,4,6],
    [3,4,5],
    [6,7,8]
];

let resetGame = () => {
    turnO = true;
    count = 0;
    btnEnabled();
    msgContainer.classList.add("hide");
};

boxes.forEach((box) => {
    box.addEventListener("click", () => {
        if(box.disabled)
            return;
        if(turnO){
            box.innerHTML = "O";
            box.classList.add("O");
            turnO = false;
        }else{
            box.innerHTML = "X";
            box.classList.add("X");
            turnO = true;
        }
        box.disabled = true;
        count++;

        let isWinner = checkWinner();
        if(count===9 && !isWinner){
            gameDraw();
        }
    });
});

const gameDraw = () => {
    msgPara.innerHTML = `---Game draw---`;
    msgPara.classList.add("draw");
    msgContainer.classList.remove("hide");
    btnDisabled();
};

let btnDisabled = () => {
    for(let box of boxes){
        box.disabled = true;
    }
};

let btnEnabled = () => {
    for(let box of boxes){
        box.disabled = false;
        box.innerHTML = "";
        box.classList.remove("O", "X", "draw");
    }
};

let showWinner = (winner) => {
    msgPara.innerText = `Congratulations! Winner is ${winner}`;
    msgContainer.classList.remove("hide");
    btnDisabled();
};

const checkWinner = () => {
    for(let pattern of winPatterns){
        let pos1Val = boxes[pattern[0]].innerHTML;
        let pos2Val = boxes[pattern[1]].innerHTML;
        let pos3Val = boxes[pattern[2]].innerHTML;
         if(pos1Val!= "" && pos2Val!= "" && pos3Val!=""){
            if(pos1Val===pos2Val && pos2Val===pos3Val){
                showWinner(pos1Val);
                return true;
            }
         }
    }
};

newGamebtn.addEventListener("click", resetGame);
btn.addEventListener("click", resetGame);