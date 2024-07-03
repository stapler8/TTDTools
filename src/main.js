let weightElement = document.getElementById("trainWeight");
weightElement.addEventListener("change", calculateTractiveEffort);

let speedElement = document.getElementById("maxSpeed");
speedElement.addEventListener("change", calculateTractiveEffort);

let angleElement = document.getElementById("inclineAngle");
angleElement.addEventListener("change", calculateTractiveEffort);

let inclineLengthElement = document.getElementById("maxInclineLength");
inclineLengthElement.addEventListener("change", calculateTractiveEffort);

let trainLengthElement = document.getElementById("trainLength");
trainLengthElement.addEventListener("change", calculateTractiveEffort);


function calculateTractiveEffort()
{
	let weight = parseInt(weightElement.value);
	let speed = parseFloat(speedElement.value) / 3.6;
	let angle = parseInt(angleElement.value);
	let inclineLength = parseInt(inclineLengthElement.value);
	let trainLength = parseInt(trainLengthElement.value);
	
	let flatEffort = weight * 35;
	
	let inclineEffort = 0;
	if (trainLength)
	{
		inclineEffort = weight * angle * 100 * (inclineLength / trainLength);
	}
	
	let tractiveEffort = flatEffort + inclineEffort;
	tractiveEffort = Math.round(tractiveEffort) / 1000;
	
	let tractiveElement = document.getElementById("requiredEffort");
	tractiveElement.innerText = tractiveEffort.toString() + "kN";	
	
	
	let requiredPower = speed * tractiveEffort;
	
	requiredPower = Math.round(requiredPower);
	let powerElement = document.getElementById("requiredPower");
	powerElement.innerText = requiredPower.toString() + "kW";
}
