let trainWeightMetricElement = document.getElementById("trainWeightMetric");
trainWeightMetricElement.addEventListener("input", calculate);

let maxSpeedMetric1Element = document.getElementById("maxSpeedMetric1");
maxSpeedMetric1Element.addEventListener("input", calculate);

let angleElement = document.getElementById("inclineAngle");
angleElement.addEventListener("input", calculate);

let inclineLengthElement = document.getElementById("maxInclineLength");
inclineLengthElement.addEventListener("input", calculate);

let trainLengthElement = document.getElementById("trainLength");
trainLengthElement.addEventListener("input", calculate);


function calculate()
{
	let weight = parseInt(trainWeightMetricElement.value);
	let speedmps = parseFloat(maxSpeedMetric1Element.value) / 3.6;
	let angle = parseInt(angleElement.value);
	let inclineLength = parseInt(inclineLengthElement.value);
	let trainLength = parseInt(trainLengthElement.value);

	
	let tractiveEffort = calculateTractiveEffort(weight, angle, inclineLength, trainLength);
	
	let tractiveElement = document.getElementById("requiredEffort");
	tractiveElement.innerText = tractiveEffort.toString() + "kN";	
	
	
	let requiredPower = calculatePower(tractiveEffort, speedmps);
	
	let powerElement = document.getElementById("requiredPower");
	powerElement.innerText = requiredPower.toString() + "kW";
	
	generateSpeedTable(tractiveEffort);
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
	tractiveEffort = Math.round(tractiveEffort / 1000);
	
	return tractiveEffort;
}

function calculatePower(tractiveEffort, speedmps)
{
	let requiredPower = speedmps * tractiveEffort;
	requiredPower = Math.round(requiredPower);
	return requiredPower;
}

function generateSpeedTable(tractiveEffort)
{
	const lowSpeedValues = [20, 30, 40, 50, 60, 70, 80, 90, 100, 110, 120, 130, 140, 150];
	const medSpeedValues = [150, 160, 170, 180, 190, 200, 210, 220, 230, 240, 250];
	const highSpeedValues = [250, 300, 350, 400, 450, 500, 550, 600, 650, 700, 750];
	let speedValues = [lowSpeedValues, medSpeedValues, highSpeedValues];

	let speedTableLow = document.getElementById("speedTableLow");
	let speedTableMed = document.getElementById("speedTableMid");
	let speedTableHigh = document.getElementById("speedTableHigh");
	let tables = [speedTableLow, speedTableMed, speedTableHigh];
	
	// create table headers
	
	for (i in tables)
	{
		let table = tables[i];
		let speeds = speedValues[i];
		table.innerHTML = "";
		
		let headerRow = document.createElement("tr");
		
		for (speed of speeds)
		{
			let newHeader = document.createElement("th");
			newHeader.innerText = speed.toString() + "km/h";
			headerRow.appendChild(newHeader);
		}
		
		table.appendChild(headerRow);	
	
		
		let powerRow = document.createElement("tr");
		
		for (speed of speeds)
		{
			let newCell = document.createElement("td");
			let speedmps = speed / 3.6;
			newCell.innerText =  calculatePower(tractiveEffort, speedmps).toString() + "kW";
			powerRow.appendChild(newCell);
		}
		
		table.appendChild(powerRow);
	}
	
}

calculate();