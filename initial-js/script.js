let num1;
let num2;
let randomOperator;
let answer;
let level = document.getElementById("level");
let score = document.getElementById("score");
let question = document.getElementById("question");
let choices = document.getElementsByTagName("button");
let start = document.getElementById("btn-start");
let finalScore = document.getElementById("final-score");
let startSection = document.getElementById("start-game");
let gameSection = document.getElementById("in-game");
let endSection = document.getElementById("end-game");
let progressBar = document.getElementById("progress");
let result = document.getElementById("result");
let operator = ['+', '-', '*'];
let t;

let highScoreView = document.getElementById("highScore");

let newUserName = document.getElementById("txt-name");
let userName = document.getElementById("user-name");

let arrRandomTF;
let indexTF;
function restart() {
    clearInterval(t);
    score.innerHTML = "0";
    level.innerHTML = "1";
    setQuestion();

    gameSection.style.display = "block";
    startSection.style.display = "none";
    endSection.style.display = "none";
    progressBar.style.display = "block";
    highScoreView.style.display = "none";
}

function backHome() {
    gameSection.style.display = "none"
    startSection.style.display = "flex";
    endSection.style.display = "none";
    highScoreView.style.display = "none";
}

function viewHighScore() {
    highScoreView.style.display = "flex";
    gameSection.style.display = "none"
    startSection.style.display = "none";
    endSection.style.display = "none";
}

function finishGame() {
    gameSection.style.display = "none"
    startSection.style.display = "none";
    endSection.style.display = "flex";
}

function increaseLevel() {
    level.innerHTML = parseInt(level.innerHTML) + 1;
}

function increaseScore() {
    score.innerHTML = parseInt(score.innerHTML) + 5;
}

function setQuestion() {

    progressBar.style.width = "100%";
    countTimeDown();
    userName.innerHTML = newUserName.value;
    finalScore.innerHTML = score.innerHTML;

    num1 = Math.floor(Math.random() * 1000);
    num2 = Math.floor(Math.random() * 1000);
    // generate a random operator
    randomOperator = operator[Math.floor(Math.random() * 3)];

    question.innerHTML = num1 + " " + randomOperator + " " + num2;
    answer = eval(question.innerHTML);

    let arrResult = [answer + Math.floor(Math.random() * 10), answer - Math.floor(Math.random() * 10)];
    arrRandomTF = ["true", "false"];

    indexTF = Math.floor(Math.random() * 2);
    if (arrRandomTF[indexTF] == "true") {
        result.innerHTML = answer;
    } else {
        result.innerHTML = arrResult[Math.floor(Math.random() * 2)];
    }
}

function countTimeDown() {
    t = setInterval(() => {
        progressBar.style.width = (parseInt(progressBar.style.width) - 5) + "%";
        if (parseInt(progressBar.style.width) == 0) {
            finishGame();
            clearInterval(t);
        } else {
            checkColors(parseInt(progressBar.style.width));
        }
    }, 1000);
}

const checkColors = (width) => {
    if (width < 100) {
        progressBar.style.background = "red";}
//    } else if (width > 30) {
//        progressBar.style.background = "yellow";
//    } else if (width < 30) {
//        progressBar.style.background = "red";
//    }
};

function doWhenCorrect() {
    increaseScore();
}

function doWhenIncorrect() {
    finishGame();
}

function moveNextQuestion() {
    setTimeout(() => {
        setQuestion();
    }, 100);
}

for (let i = 0; i < 2; i++) {
    choices[i].addEventListener('click', () => {
        // let qAnswer = result.innerText;

        // let y = qAnswer == answer ? "true" : "false";
        // console.log("hi: " + y);
        // console.log("hi 1: " + choices[i].innerText.toLowerCase());
        // console.log("hi: " + choices[i].value);
        // console.log("hi: " + choices[i].value == y);
        if (choices[i].value == arrRandomTF[indexTF]) {
            doWhenCorrect();
        } else {
            doWhenIncorrect();
        }
        clearInterval(t);   
        moveNextQuestion();
        increaseLevel();
    });
}

//save username - score to json
const saveScoreBtn = document.getElementById('btn-save');
const highScore = JSON.parse(localStorage.getItem('highScore')) || []
saveHighScore = e => {
    e.preventDefault()

    const fakeScore = {
        name: userName.innerText,
        fakeScore: finalScore.innerText
    }
    highScore.push(fakeScore)

    highScore.sort((a, b) => {
        return b.fakeScore - a.fakeScore
    })

    highScore.splice(5)

    localStorage.setItem('highScore', JSON.stringify(highScore))

    window.location.assign('./game.html')
};


const highScoreListFe = document.getElementById('highScoreList');
const highScoreArr = JSON.parse(localStorage.getItem('highScore')) || []

console.log(highScoreArr);
//
highScoreListFe.innerHTML =
    highScoreArr.map((eScore) => {
        console.log(eScore.name)
        return '<li class="high-score">' + eScore.name + ' - ' + eScore.fakeScore + '</li>';
    }).join('');

