// variables declaration
let gameseq =[];
let userseq = [];
let btns = ["green", "red", "yellow", "blue"];
let newscore = 0;
let highscore = [];
let level = 0;
let start =false;

//  elements selection
let btn=document.querySelector("#start_game");
let h2=document.querySelector("h2");
let body = document.querySelector("body");

// adding event listener to start button
btn.addEventListener("click", function() {
    if(start == false){
        start =true;
        reset();
        levelup();
    }
});

// function to flash the button 
function flash(btn) {
    btn.classList.add("flash");
    setTimeout(() => {
       btn.classList.remove("flash");
    }, 500);

}

// function to flash the button when user clicks on the button
function userflash(btn) {
    btn.classList.add("userflash");
    setTimeout(() => {
       btn.classList.remove("userflash");
    }, 500);

}

// function to increase level and gnerate a random color
// and push it to gameseq array
function levelup(){
    userseq = [];
    level++;
    h2.innerText = "Level " + level;
    let randomidx = Math.floor(Math.random() * btns.length);
    let randomcolor = btns[randomidx];
    let randombtn = document.querySelector(`.${randomcolor}`) ;
    gameseq.push(randomcolor);
    // console.log(gameseq);
    flash(randombtn);
}

// function to flash the background when game is over
function gameoverflash(){
    body.classList.add("gameoverflash");
    setTimeout(() => {
       body.classList.remove("gameoverflash");
    }, 1000);

}

// function to check if the user sequence matches the game sequence
function check(idx){
    if(gameseq[idx] === userseq[idx]){
        if(userseq.length === gameseq.length){
            setTimeout(levelup, 1000);
        }
    } else {
        newscore = level;
        highscore.push(level);
        let maxScore = Math.max(...highscore);
        if(newscore >= maxScore){
            h2.innerHTML = `Game Over!<br> New High Score: <b>${newscore}</b> <br> press start to play again`;
        } else {
            h2.innerHTML = `Game Over! your score was <b>${newscore}</b> <br> press start to play again`;
        }
        gameoverflash();
        reset();
    }
}

// function to handle user button press
function buttonpress(){
    let  btn = this;
    let usercolor = btn.getAttribute("id");
    userseq.push(usercolor);
    // console.log(userseq);
    userflash(this);
    check(userseq.length - 1);
}

// adding event listener to all buttons
let allbtn = document.querySelectorAll(".button");
for(btnss of allbtn){
    btnss.addEventListener("click", buttonpress);
}

// function to reset the game 

function reset(){
    gameseq = [];
    userseq = [];
    level = 0;
    start = false;
}
