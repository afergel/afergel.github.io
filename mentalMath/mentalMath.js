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
    startBtn.addEventListener("click", startGame);
}

function startGame()
{
    var gameArea = document.getElementById("gameArea");

    // Makes a copy of the HTML for the main menu screen before clearing it
    var mainMenu = document.getElementById("mainMenu").cloneNode(true);
    gameArea.textContent = '';





    // Re-load the main menu
    alert("Testing");
    gameArea.appendChild(mainMenu);
    addSliderEvent();
    addStartEvent();
}