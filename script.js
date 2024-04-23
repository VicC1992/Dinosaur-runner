const TEN = 10;
const HUNDRED = 100;
const THOUSAND = 1000;
const windowGame = document.querySelector(".gameDiv");
const windowGameRect = windowGame.getBoundingClientRect();
let gameInProcess = false;
//create dinosaur
function createDinosaur() {
    const dinosaur = document.createElement("div");
    windowGame.appendChild(dinosaur);
    dinosaur.classList.add("dinosaur");
    document.addEventListener("keydown", dinosaurJump);
    document.addEventListener("keyup", timeout);
}
//up
let jumpSize = 30;
let verticalPositionDinosaur = 4;
let limitJump = 34;

function dinosaurJump(e) {
    const jump = document.querySelector(".dinosaur");
    if (e.key === " " && verticalPositionDinosaur < limitJump) {
        verticalPositionDinosaur += jumpSize;
        jump.style.bottom = `${verticalPositionDinosaur}%`;
    }
}
let jumpDuration = 1300;
//down
function timeout(e) {
    if (e.key === " ") {
        setTimeout(
            function dinosaurAvoide() {
                const avoide = document.querySelector(".dinosaur");
                verticalPositionDinosaur -= jumpSize;
                avoide.style.bottom = `${verticalPositionDinosaur}%`;
        }, jumpDuration);
    }
}
const obstaclesSpeed = 6;
const startObstaclePosition = 950;
//createCactus
function createGreenCactus() {
    const greenCactus = document.createElement("div");
    windowGame.appendChild(greenCactus);
    greenCactus.classList.add("cactus");
    greenCactusMove(greenCactus);
}
//move cactus
function greenCactusMove(greenCactus) {
    if (gameInProcess === true) {
        let cactusPosition = startObstaclePosition;
        let setGreenCactusMove = setInterval(() => {
            cactusPosition -= changePosition;
            greenCactus.style.left = `${cactusPosition}px`;
            const cactusRect = greenCactus.getBoundingClientRect();
            if (cactusRect.left <= windowGameRect.left) {
                clearInterval(setGreenCactusMove);
                greenCactus.remove();
            }
        }, obstaclesSpeed);
    }
}
//create a straw bale
function createStrawBale() {
    const bale = document.createElement("div");
    windowGame.appendChild(bale);
    bale.classList.add("bale");
    baleMove(bale);
}
// move straw bale
function baleMove(bale) {
    if (gameInProcess === true) {
        let balePosition = startObstaclePosition;
        let setBaleMove = setInterval(() => {
            balePosition -= changePosition;
            bale.style.left = `${balePosition}px`;
            const baleRect = bale.getBoundingClientRect();
            if (baleRect.left <= windowGameRect.left) {
                clearInterval(setBaleMove);
                bale.remove();
            }
        }, obstaclesSpeed);
    }
}
//create a rock;
function createRock() {
    const rock = document.createElement("div");
    windowGame.appendChild(rock);
    rock.classList.add("rock");
    rockMove(rock);
}
//move rock;
function rockMove(rock) {
    if (gameInProcess === true) {
        let rockPosition = startObstaclePosition;
        let setRockMove = setInterval(() => {
            rockPosition -= changePosition;
            rock.style.left = `${rockPosition}px`;
            const rockRect = rock.getBoundingClientRect();
            if (rockRect.left <= windowGameRect.left) {
                clearInterval(setRockMove);
                rock.remove();
            }
        }, obstaclesSpeed);
    }
}

let cactusObstacle = 1;
let baleObstacle = 2;
let rockObstacle = 3;
let setCreateObscatles;
let obstacleType;
//generate a integer number between min - max
function getRandomNumber(min, max) {
    const minCeiled = Math.ceil(min);
    const maxFloored = Math.floor(max);
    return Math.floor(Math.random() * (maxFloored - minCeiled) + minCeiled);
}
// cerate obstacles for dinosaur
let intervalCreateObstacles = 3000;

function createRandomObstacle() {
    obstacleType = getRandomNumber(1, 4);
    if (obstacleType === cactusObstacle) {
        createGreenCactus();
    } else if (obstacleType === baleObstacle) {
        createStrawBale();
    } else if (obstacleType === rockObstacle) {
        createRock();
    }
}
//timer
let hour = 0;
let minute = 0;
let second = 0;
let millisecond = 0;
let cron;

function start() {
    pause();
    cron = setInterval(() => {
        timer();
    }, TEN);
}

function pause() {
    clearInterval(cron);
}

function reset() {
    hour = 0;
    minute = 0;
    second = 0;
    millisecond = 0;
    document.getElementById('hour').innerText = '00';
    document.getElementById('minute').innerText = '00';
    document.getElementById('second').innerText = '00';
}

function timer() {
    if ((millisecond += TEN) == THOUSAND) {
        millisecond = 0;
        second++;
    }
    if (second == 60) {
        second = 0;
        nextLevel();
        minute++;
    }
    if (minute == 60) {
        minute = 0;
        hour++;
    }
    document.getElementById('hour').innerText = returnData(hour);
    document.getElementById('minute').innerText = returnData(minute);
    document.getElementById('second').innerText = returnData(second);
}

function returnData(input) {
    if (input >= TEN) {
        return input;
    } else {
        return `0${input}`;
    }
}
// next level
let level = 0;
const spanLevel = document.getElementById("level");
let changePosition = 2;
let incrementObstacleMove = 0.5;

function nextLevel() {
    ++level;
    spanLevel.innerText = level;
    changePosition += incrementObstacleMove;
}
// check objects collisions
let checkCollisionRockInterval;

function checkCollisionRock() {
    if (gameInProcess === true) {
        const rocks = document.querySelectorAll(".rock");
        const dinosaur = document.querySelector(".dinosaur");
        const dinosaurRect = dinosaur.getBoundingClientRect();
        rocks.forEach(rock => {
            const rockRect = rock.getBoundingClientRect();
            if (rockRect.left <= dinosaurRect.right &&
                rockRect.right >= dinosaurRect.left &&
                rockRect.top <= dinosaurRect.bottom) {
                gameOver();
            }
        });
    }
}
let checkCollisionCactusInterval;

function checkCollisionCactus() {
    if (gameInProcess === true) {
        const cacti = document.querySelectorAll(".cactus");
        const dinosaur = document.querySelector(".dinosaur");
        const dinosaurRect = dinosaur.getBoundingClientRect();
        cacti.forEach(cactus => {
            const cactusRect = cactus.getBoundingClientRect();
            if (cactusRect.left <= dinosaurRect.right &&
                cactusRect.right >= dinosaurRect.left &&
                cactusRect.top <= dinosaurRect.bottom) {
                gameOver();
            }
        });
    }
}
let checkCollisionBaleInterval;

function checkCollisionBale() {
    if (gameInProcess === true) {
        const bales = document.querySelectorAll(".bale");
        const dinosaur = document.querySelector(".dinosaur");
        const dinosaurRect = dinosaur.getBoundingClientRect();
        bales.forEach(bale => {
            const baleRect = bale.getBoundingClientRect();
            if (baleRect.left <= dinosaurRect.right &&
                baleRect.right >= dinosaurRect.left &&
                baleRect.top <= dinosaurRect.bottom) {
                gameOver();
            }
        });
    }
}
//start game function
function startGame() {
    let startButton = document.querySelector(".startButton");
    gameInProcess = true;
    createDinosaur();
    start();
    startButton.remove();
    setCreateObscatles = setInterval(createRandomObstacle, intervalCreateObstacles);
    checkCollisionCactusInterval = setInterval(checkCollisionCactus, HUNDRED);
    checkCollisionRockInterval = setInterval(checkCollisionRock, HUNDRED);
    checkCollisionBaleInterval = setInterval(checkCollisionBale, HUNDRED);
}
//restart a new game function
function restartGame() {
    changePosition = 2;
    level = 0;
    spanLevel.innerText = level;
    gameInProcess = true;
    let restartButton = document.querySelector(".restartButton");
    restartButton.remove();
    let gameOverDiv = document.querySelector(".gameOverDiv");
    gameOverDiv.remove();
    createDinosaur();
    reset();
    start();
    setCreateObscatles = setInterval(createRandomObstacle, intervalCreateObstacles);
    checkCollisionCactusInterval = setInterval(checkCollisionCactus, HUNDRED);
    checkCollisionRockInterval = setInterval(checkCollisionRock, HUNDRED);
    checkCollisionBaleInterval = setInterval(checkCollisionBale, HUNDRED);
}

function createGameOverDiv() {
    const gameOverDiv = document.createElement("div");
    windowGame.appendChild(gameOverDiv);
    gameOverDiv.classList.add("gameOverDiv");
}
//stop game
function gameOver() {
    createGameOverDiv();
    gameInProcess = false;
    pause();
    clearInterval(setCreateObscatles);
    createRestartButton();
    clearInterval(checkCollisionBaleInterval);
    clearInterval(checkCollisionRockInterval);
    clearInterval(checkCollisionCactusInterval);
    let dinosaur = document.querySelector(".dinosaur");
    dinosaur.remove();
    const rocks = document.querySelectorAll(".rock");
    rocks.forEach(rock => {
        rock.remove();
    });
    const cacti = document.querySelectorAll(".cactus");
    cacti.forEach(cactus => {
        cactus.remove();
    });
    const bales = document.querySelectorAll(".bale");
    bales.forEach(bale => {
        bale.remove();
    });
}
createStartButton();

function createStartButton() {
    const startButton = document.createElement("button");
    windowGame.appendChild(startButton);
    startButton.classList.add("startButton");
    startButton.innerText = "Start Game";
    startButton.addEventListener("click", startGame);
}

function createRestartButton() {
    const restartButton = document.createElement("button");
    windowGame.appendChild(restartButton);
    restartButton.classList.add("restartButton");
    restartButton.innerText = "Restart Game";
    restartButton.addEventListener("click", restartGame);
}
