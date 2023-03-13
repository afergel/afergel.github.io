var NUM_OF_QUESTIONS = 10;

window.onload = () =>
{
    addSliderEvent();
    addStartEvent();
}

function addSliderEvent()
{
    difSlider = document.getElementById("difSlider");
    difSlider.addEventListener("input", () =>
    {
        var output;
        switch (difSlider.value)
        {
            case '0':
                output = "Easy";
                break;
            case '1':
                output = "Normal";
                break;
            case '2':
                output = "Hard";
                break;
            case '3':
                output = "Impossible";
                break;
        }
        document.getElementById("difDisplay").textContent = output;
    });
}

function addStartEvent()
{
    startBtn = document.getElementById("start");
    startBtn.addEventListener("click", () =>
    {
        // Check to see if any "types of questions" boxes are checked before starting
        if (document.getElementById("add").checked || document.getElementById("subt").checked ||
            document.getElementById("mult").checked || document.getElementById("divis").checked)
        {
            startGame();
        }
        else
        {
            alert("Please choose at least one question type!");
        }
    });
}

function startGame()
{
    var gameArea = document.getElementById("gameArea");

    var add = document.getElementById("add").checked;
    var subt = document.getElementById("subt").checked;
    var mult = document.getElementById("mult").checked;
    var divis = document.getElementById("divis").checked;
    var difficulty = document.getElementById("difSlider").value;

    // Makes a copy of the HTML for the main menu screen before clearing it
    var mainMenu = document.getElementById("mainMenu").cloneNode(true);
    gameArea.textContent = '';

    var questionDisplay = document.createElement("h1");
    questionDisplay.id = "questionDisplay";
    gameArea.appendChild(questionDisplay);

    var textInput = document.createElement("input");
    textInput.type = 'text';
    textInput.inputMode = 'numeric';
    gameArea.appendChild(textInput);

    var currentQuestion = 1;
    var data = []; // info about the current question

    function displayQuestion(questionNum)
    {
        if (questionNum <= NUM_OF_QUESTIONS)
        {
            textInput.value = '';
            data = generateQuestion(add, subt, mult, divis, difficulty);
            questionDisplay.textContent = data[0];
            textInput.addEventListener("input", checkAnswer);
        }
        else
        {
            // Reload the main menu upon completion
            gameArea.textContent = '';
            gameArea.appendChild(mainMenu);
            addSliderEvent();
            addStartEvent();
        }
    }

    function checkAnswer()
    {
        if (textInput.value == data[1])
        {
            textInput.removeEventListener("input", checkAnswer);
            displayQuestion(++currentQuestion);
        }
    }

    displayQuestion(currentQuestion);
}

/*
 * Generates a math question. Returns an array with two elements:
 *      - A string representation of the question
 *      - The answer as an integer
 */
function generateQuestion(add, subt, mult, divis, difficulty)
{
    var questionTypes = [];
    if (add) questionTypes.push("add");
    if (subt) questionTypes.push("subt");
    if (mult) questionTypes.push("mult");
    if (divis) questionTypes.push("divis");

    var chosenType = questionTypes[Math.floor(Math.random() * questionTypes.length)];

    switch (chosenType)
    {
        case "add":
            return generateAdditionQuestion(difficulty);
            break;
        case "subt":
            return ["3 - 1", 2];
            break;
        case "mult":
            return ["3 x 2", 6];
            break;
        case "divis":
            return ["10 / 2", 5];
            break;
        default:
            return ["ERROR: type -1 to continue", -1];
    }
}

function generateAdditionQuestion(difficulty)
{
    var num1, num2;

    switch (difficulty)
    {
        case '0':
            // Possible numbers: 1 through 9
            num1 = Math.floor(1 + Math.random() * 9);
            num2 = Math.floor(1 + Math.random() * 9);
            break;
        case '1':
            // Possible numbers: 11 through 99
            num1 = Math.floor(11 + Math.random() * (99 - 10));
            num2 = Math.floor(11 + Math.random() * (99 - 10));
            break;
        case '2':
            // Possible numbers: 1001 through 9999
            num1 = Math.floor(1001 + Math.random() * (9999 - 1000));
            num2 = Math.floor(1001 + Math.random() * (9999 - 1000));
            break;
        case '3':
            // Possible numbers: 100000001 through 999999999
            num1 = Math.floor(100000001 + Math.random() * (999999999 - 100000000));
            num2 = Math.floor(100000001 + Math.random() * (999999999 - 100000000));
            break;
    }

    return [num1 + " + " + num2, num1 + num2];
}