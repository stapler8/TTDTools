let weightInput = document.getElementById("weight");

weightInput.addEventListener("change", calculateTractiveEffort);

function calculateTractiveEffort()
{
    let weight = weightInput.value; // "100"
    let outputWeight = parseInt(weight) * 2.2; // 100

    let tractiveEffort = document.getElementById("weightOutput");
    tractiveEffort.innerText = outputWeight.toString() + "kW";
}
