// defines the html elements for the input form (answer), check button (button), and selected dropdown options (operations)
let answer = document.getElementsByClassName("form-control")[0]
let button = document.getElementsByClassName("btn-light")[0]
let operations = document.getElementsByClassName("btn-dropdown active")

// function used to take the maximum number you want and return a random integer less than that
function getRandomInt(max) {
    return Math.floor(Math.random() *(max))
}

// function that takes those possible operations, picks one, generates a problem, changes the html to show the problem, and returns the correct answer
function problemGenerator(operations) {
    // defines the html element for the place where the problem is shown (problemSpace)
    let problemSpace = document.getElementById("problem")

    // sets the maximum numbers for the problems, these can be easily adjusted by the user
    let operationLimits = {
        addition: 100,
        subtraction: 100,
        multiplication: 20,
        divisor: 20,
    }

    // sets what symbol the operation should use
    let operationSeperator = {
        addition: "+",
        subtraction: "-",
        multiplication: "&sdot;",
        division: "/",
    }

    // picks a random operation
    // options are addition, subtraction, multiplication, and division
    let operationChosen = operations[getRandomInt(operations.length)].innerHTML

    // placeholder correct answer
    let correctResult = 25

    // what happens when the operation is addition or multiplication
    if (operationChosen.toLowerCase() == "addition" || operationChosen.toLowerCase() == "multiplication") {

        firstNum = getRandomInt(operationLimits[operationChosen.toLowerCase()]);
        secondNum = getRandomInt(operationLimits[operationChosen.toLowerCase()]);

        problemSpace.innerHTML = `${firstNum} ${operationSeperator[operationChosen.toLowerCase()]} ${secondNum}`

        if (operationChosen.toLowerCase() == "addition") {
            correctResult = (firstNum + secondNum)
        }
        else {
            correctResult = (firstNum * secondNum)
        }
    }

    // what happens when the operation is subtraction
    else if (operationChosen.toLowerCase() == "subtraction") {

        firstNum = getRandomInt(operationLimits["subtraction"]);
        secondNum = getRandomInt(firstNum)

        problemSpace.innerHTML = `${firstNum} ${operationSeperator["subtraction"]} ${secondNum}`

        correctResult = (firstNum - secondNum)
    }

    // what happens when the operation is division
    else if (operationChosen.toLowerCase() == "division") {

        secondNum = getRandomInt(operationLimits["divisor"]);
        firstNum = secondNum * getRandomInt(operationLimits["divisor"]);

        problemSpace.innerHTML = `${firstNum} ${operationSeperator["division"]} ${secondNum}`

        correctResult = (firstNum / secondNum)
    }

    return correctResult
}

// function that checks the answer of the problem, changes the background color of the form, and generates a new problem
function checkAnswer(correctAns, ans) {

    if (correctAns == ans.value) {
        ans.style.backgroundColor = "rgb(25, 200, 25)";
    }

    else {
        ans.style.backgroundColor = "rgb(255, 40, 40)";
    }

    problem = problemGenerator(operations)
    ans.value = ""
}

// generates the first problem
let problem = problemGenerator(operations)

//listens for enter key and pressing the click button to run checkAnswer
button.addEventListener("click", function() {checkAnswer(problem, answer)});
answer.addEventListener('keypress', function (e) {
    if (e.key === 'Enter') {
      checkAnswer(problem, answer)
    }
});
