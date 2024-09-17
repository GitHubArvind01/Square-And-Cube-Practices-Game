let gameType = ""; // Square or Cube
let minRange, maxRange;
let correct = 0, incorrect = 0, totalTime = 0, totalQuestions = 0;
let currentNumber;
let startTime;
let usedNumbers = []; // Array to track used numbers
let analytics = []; // Store each question, answer, and result

document.getElementById("squareGameBtn").addEventListener("click", () => {
    gameType = "square";
    startGame();
    document.getElementById("squareGameBtn").classList.add('selected');
    document.getElementById("cubeGameBtn").classList.remove('selected');
});

document.getElementById("cubeGameBtn").addEventListener("click", () => {
    gameType = "cube";
    startGame();
    document.getElementById("cubeGameBtn").classList.add('selected');
    document.getElementById("squareGameBtn").classList.remove('selected');
});

function startGame() {
    minRange = parseInt(document.getElementById("minRange").value);
    maxRange = parseInt(document.getElementById("maxRange").value);
    correct = 0;
    incorrect = 0;
    totalTime = 0;
    totalQuestions = 0;
    usedNumbers = []; // Reset used numbers when a new game starts
    analytics = []; // Reset analytics data
    document.getElementById("gameArea").style.display = "block";
    document.getElementById("analyticsSection").style.display = "none";
    nextQuestion();
}

function nextQuestion() {
    if (usedNumbers.length >= (maxRange - minRange + 1)) {
        endGame();
        return;
    }

    let randomNum;
    do {
        randomNum = Math.floor(Math.random() * (maxRange - minRange + 1)) + minRange;
    } while (usedNumbers.includes(randomNum));

    usedNumbers.push(randomNum); // Add number to usedNumbers so it doesn't repeat
    currentNumber = randomNum;
    document.getElementById("question").textContent = `What is ${currentNumber} ${gameType === 'square' ? 'squared' : 'cubed'}?`;
    startTime = new Date(); // Track start time for this question
}

document.getElementById("submitAnswer").addEventListener("click", checkAnswer);
document.getElementById("userAnswer").addEventListener("keypress", (e) => {
    if (e.key === 'Enter') checkAnswer();
});

function checkAnswer() {
    const userAnswer = parseInt(document.getElementById("userAnswer").value);
    const correctAnswer = gameType === 'square' ? currentNumber ** 2 : currentNumber ** 3;
    const endTime = new Date();
    const timeTaken = (endTime - startTime) / 1000; // Time taken in seconds

    totalQuestions++;
    totalTime += timeTaken;

    const resultMessage = userAnswer === correctAnswer ? "Correct!" : `Incorrect! The answer was ${correctAnswer}`;
    document.getElementById("result").textContent = resultMessage;

    analytics.push({
        number: currentNumber,
        userAnswer: userAnswer,
        correctAnswer: correctAnswer,
        timeTaken: timeTaken,
        result: userAnswer === correctAnswer ? 'Correct' : 'Incorrect'
    });

    if (userAnswer === correctAnswer) {
        correct++;
    } else {
        incorrect++;
    }

    document.getElementById("userAnswer").value = ""; // Clear the input for next question
    nextQuestion();
}

function endGame() {
    document.getElementById("gameArea").style.display = "none";
    document.getElementById("analyticsSection").style.display = "block";

    const averageTime = (totalTime / totalQuestions).toFixed(2);
    document.getElementById("correctAnswers").textContent = `Correct Answers: ${correct}`;
    document.getElementById("incorrectAnswers").textContent = `Incorrect Answers: ${incorrect}`;
    document.getElementById("averageTime").textContent = `Average Time per Question: ${averageTime} seconds`;

    console.table(analytics); // Log the detailed analytics in the console
}