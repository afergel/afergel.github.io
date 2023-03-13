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

    // Makes a copy of the HTML for the main menu screen before clearing it
    var mainMenu = document.getElementById("mainMenu").cloneNode(true);
    gameArea.textContent = '';

    var questionDisplay = document.createElement("h1");
    questionDisplay.id = "questionDisplay";
    gameArea.appendChild(questionDisplay);

    var textInput = document.createElement("input");
    textInput.type = 'text';
    gameArea.appendChild(textInput);

    var currentQuestion = 1;
    var data = []; // info about the current question

    function displayQuestion(questionNum)
    {
        if (questionNum <= NUM_OF_QUESTIONS)
        {
            textInput.value = '';
            data = generateQuestion(true, true, true, true, 1);
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
    return ["2 + 2", 4];
}