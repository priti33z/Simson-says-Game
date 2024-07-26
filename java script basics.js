let gameSeq = [];
let userSeq = [];
let btns = document.querySelectorAll('.btn');
let started = false;
let level = 0;
let h2 = document.querySelector("h2");

function gameFlash(btn) {
    btn.classList.add("flash");
    setTimeout(function() {
        btn.classList.remove("flash");
    }, 250);
}

function userFlash(btn) {
    btn.classList.add("userflash");
    setTimeout(function() {
        btn.classList.remove("userflash");
    }, 250);
}

function levelUp() {
    userSeq = [];
    level++;
    h2.innerText = `Level ${level}`;
    let randIdx = Math.floor(Math.random() * btns.length);
    let randBtn = btns[randIdx];
    gameSeq.push(randBtn.id);
    console.log(gameSeq);
    gameFlash(randBtn);
}

function checkAns() {
    let idx = userSeq.length - 1;
    if (userSeq[idx] === gameSeq[idx]) {
        if (userSeq.length === gameSeq.length) {
            setTimeout(levelUp, 1000);
        }
    } else {
        h2.innerHTML = `Game Over! Your score was <b>${level}</b>. Press any key to start.`;
        document.body.style.backgroundColor = "red";
        setTimeout(function() {
            document.body.style.backgroundColor = "white";
        }, 150);
        reset();
    }
}

function btnPress() {
    let btn = this;
    userFlash(btn);
    userSeq.push(btn.id);
    checkAns();
}

btns.forEach(btn => {
    btn.addEventListener("click", btnPress);
});

document.addEventListener("keypress", function() {
    if (!started) {
        console.log("Game started");
        started = true;
        levelUp();
    }
});

function reset() {
    started = false;
    gameSeq = [];
    userSeq = [];
    level = 0;
}
