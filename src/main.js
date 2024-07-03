let trainWeightMetricElement = document.getElementById("trainWeightMetric");
trainWeightMetricElement.addEventListener("change", calculate);

let maxSpeedMetric1Element = document.getElementById("maxSpeedMetric1");
maxSpeedMetric1Element.addEventListener("change", calculate);

let angleElement = document.getElementById("inclineAngle");
angleElement.addEventListener("change", calculate);

let inclineLengthElement = document.getElementById("maxInclineLength");
inclineLengthElement.addEventListener("change", calculate);

let trainLengthElement = document.getElementById("trainLength");
trainLengthElement.addEventListener("change", calculate);


function calculate()
{
	let weight = parseInt(trainWeightMetricElement.value);
	let speed = parseFloat(maxSpeedMetric1Element.value) / 3.6;
	let angle = parseInt(angleElement.value);
	let inclineLength = parseInt(inclineLengthElement.value);
	let trainLength = parseInt(trainLengthElement.value);

	
	let tractiveEffort = calculateTractiveEffort(weight, angle, inclineLength, trainLength);
	
	let tractiveElement = document.getElementById("requiredEffort");
	tractiveElement.innerText = tractiveEffort.toString() + "kN";	
	
	
	let requiredPower = calculatePower(tractiveEffort, speed);
	
	let powerElement = document.getElementById("requiredPower");
	powerElement.innerText = requiredPower.toString() + "kW";
}

function calculateTractiveEffort(weight, angle, inclineLength, trainLength)
{
	let flatEffort = weight * 35;
	
	let inclineEffort = 0;
	if (trainLength)
	{
		inclineEffort = weight * angle * 100 * (inclineLength / trainLength);
	}
	
	let tractiveEffort = flatEffort + inclineEffort;
	tractiveEffort = Math.round(tractiveEffort) / 1000;
	
	return tractiveEffort;
}

function calculatePower(tractiveEffort, speed)
{
	let requiredPower = speed * tractiveEffort;
	requiredPower = Math.round(requiredPower);
	return requiredPower;
}