window.onload = () =>
{
    var answer = generateQuestion();
    var input = document.getElementById("numInput");
    input.addEventListener("input", () =>
    {
        if (input.value == answer)
        {
            input.value = "";
            answer = generateQuestion();
        }
    });
}

function generateQuestion()
{
    var num1 = Math.floor(Math.random() * 8) + 2;
    var num2 = Math.floor(Math.random() * 8) + 2;

    document.getElementById("question").textContent = num1 + " x " + num2 + " = ?";
    return num1 * num2;
}