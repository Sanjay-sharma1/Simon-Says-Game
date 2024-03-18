let gameSeq = [];
let userSeq = [];
let btns = ["red", "yellow", "green", "purple"]
let started = false;
let level = 0;
let body = document.querySelector("body")

let h2 = document.querySelector("h2");
let h3 = document.querySelector("h3");
let hiScore = `${level}`

document.addEventListener("keypress", function(){
    if(started == false){
        console.log("game started");
        started = true;

        levelUp();
    }
})

function levelUp(){
    userSeq = [];
    level++;
    h2.innerText = `Level ${level}`;

    let randIdx = Math.floor(Math.random()*4);
    let randColor = btns[randIdx];
    let randBtn = document.querySelector(`.${randColor}`);
    gameSeq.push(randColor);

    btnFlash(randBtn);

    if(hiScore < level){
        hiScore=`${level}`;
    }
    h3.innerText = `Hi Score: ${hiScore}`
}


function btnFlash(btn){
    btn.classList.add("flash")
    setTimeout(function() {
        btn.classList.remove("flash")
    },250)
}

function checkAns(idx){
    if(userSeq[idx] === gameSeq[idx]){
        if(userSeq.length == gameSeq.length){
            setTimeout(levelUp, 1000);
        }
    } else{
        h2.innerHTML = `Game Over! Your Score is <b> ${level} </b> <br> Press any key to continue.`
        document.querySelector("body").style.backgroundColor = "red"
        setTimeout(function(){
            document.querySelector("body").style.backgroundColor = "white"
        }, 150)
        reset();
    }
}

function btnPress(){
    console.log(this)
    let btn = this;
    btnFlash(btn)

    userColor = btn.getAttribute("id");
    userSeq.push(userColor);

    checkAns(userSeq.length-1);
}

let allBtns = document.querySelectorAll(".box")
for(btn of allBtns){
    btn.addEventListener("click", btnPress);
}

function reset(){
    started = false;
    gameSeq = [];
    userSeq = [];
    level = 0
}