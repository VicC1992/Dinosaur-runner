const TEN = 10;
const SIXTY = 60;
const HUNDRED = 100;
const THOUSAND = 1000;
const windowGame = document.querySelector(".gameDiv");
const windowGameRect = windowGame.getBoundingClientRect();
let gameInProgress = false;

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

//down
let jumpDuration = 1300;

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
let obstacleType;

//create obstacles
function createObstacleObjects(obstacleType) {
    const obstacle = document.createElement("div");
    windowGame.appendChild(obstacle);
    obstacle.classList.add(obstacleType);
    obstacleObjectsMove(obstacle);
}

function obstacleObjectsMove(obstacle) {
    if (gameInProgress) {
        let obstaclePosition = startObstaclePosition;
        let setObstacleMove = setInterval(() => {
            obstaclePosition -= changePosition;
            obstacle.style.left = `${obstaclePosition}px`;
            const obstacleRect = obstacle.getBoundingClientRect();
            if (obstacleRect.left <= windowGameRect.left) {
                clearInterval(setObstacleMove);
                obstacle.remove();
            }
        }, obstaclesSpeed);
    }
}

let cactusObstacle = 1;
let baleObstacle = 2;
let rockObstacle = 3;
let setCreateObscatles;
let randomObstacle;

//generate a integer number between min - max
function getRandomNumber(min, max) {
    const minCeiled = Math.ceil(min);
    const maxFloored = Math.floor(max);
    return Math.floor(Math.random() * (maxFloored - minCeiled) + minCeiled);
}

// create types of obstacles
let intervalCreateObstacles = 3000;

function createRandomObstacle() {
    randomObstacle = getRandomNumber(1, 4);
    if (randomObstacle === cactusObstacle) {
        obstacleType = "cactus";;
    } else if (randomObstacle === baleObstacle) {
        obstacleType = "bale";
    } else if (randomObstacle === rockObstacle) {
        obstacleType = "rock";
    }
    createObstacleObjects(obstacleType);
}

// check objects collisions
let firstObstacle = "cactus";
let secondObstacle = "bale";
let thirdObstacle = "rock";
let checkCollisionRockInterval;
let checkCollisionBaleInterval;
let checkCollisionCactusInterval;

function checkCollision(typeObstacle) {
    if (gameInProgress) {
        const obstacles = document.querySelectorAll("." + `${typeObstacle}`);
        const dinosaur = document.querySelector(".dinosaur");
        const dinosaurRect = dinosaur.getBoundingClientRect();
        obstacles.forEach(obstacle => {
            const obstacleRect = obstacle.getBoundingClientRect();
            if (obstacleRect.left <= dinosaurRect.right &&
                obstacleRect.right >= dinosaurRect.left &&
                obstacleRect.top <= dinosaurRect.bottom) {
                gameOver();
            }
        });
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
        ++second;
    }
    if (second == SIXTY) {
        second = 0;
        nextLevel();
        ++minute;
    }
    if (minute == SIXTY) {
        minute = 0;
        ++hour;
    }
    document.getElementById('hour').innerText = returnData(hour);
    document.getElementById('minute').innerText = returnData(minute);
    document.getElementById('second').innerText = returnData(second);
}

function returnData(input) {
    if (input >= TEN) {
        return input;
    }
    return `0${input}`;
}

//start game function
function startGame() {
    let startButton = document.querySelector(".startButton");
    gameInProgress = true;
    createDinosaur();
    start();
    startButton.remove();
    setCreateObscatles = setInterval(createRandomObstacle, intervalCreateObstacles);
    checkCollisionCactusInterval = setInterval(()=> {
        checkCollision(firstObstacle);
    }, HUNDRED);
    checkCollisionRockInterval = setInterval(()=> {
        checkCollision(thirdObstacle);
    }, HUNDRED);
    checkCollisionBaleInterval = setInterval(()=> {
        checkCollision(secondObstacle);
    }, HUNDRED);
}

//restart a new game function
function restartGame() {
    changePosition = 2;
    level = 0;
    spanLevel.innerText = level;
    gameInProgress = true;
    let restartButton = document.querySelector(".restartButton");
    restartButton.remove();
    let gameOverDiv = document.querySelector(".gameOverDiv");
    gameOverDiv.remove();
    createDinosaur();
    reset();
    start();
    setCreateObscatles = setInterval(createRandomObstacle, intervalCreateObstacles);
    checkCollisionCactusInterval = setInterval(()=> {
        checkCollision(firstObstacle);
    }, HUNDRED);
    checkCollisionRockInterval = setInterval(()=> {
        checkCollision(thirdObstacle);
    }, HUNDRED);
    checkCollisionBaleInterval = setInterval(()=> {
        checkCollision(secondObstacle);
    }, HUNDRED);
}

function createGameOverDiv() {
    const gameOverDiv = document.createElement("div");
    windowGame.appendChild(gameOverDiv);
    gameOverDiv.classList.add("gameOverDiv");
}

//stop game
function gameOver() {
    createGameOverDiv();
    gameInProgress = false;
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
