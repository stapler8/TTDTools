let weightInput = document.getElementById("weight");

weightInput.addEventListener("change", weightOnChange);

function weightOnChange()
{
    let weight = weightInput.value; // "100"
    let outputWeight = parseInt(weight) * 2.2; // 100

    let weightOutput = document.getElementById("weightOutput");
    weightOutput.innerText = outputWeight.toString();
}
