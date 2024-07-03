let trainWeightImperialElement = document.getElementById("trainWeightImperial");
trainWeightImperialElement.addEventListener("input", calculate);

let maxSpeedImperialElement = document.getElementById("maxSpeedImperial");
maxSpeedImperialElement.addEventListener("input", calculate);

let angleElement = document.getElementById("inclineAngle");
angleElement.addEventListener("input", calculate);

let inclineLengthElement = document.getElementById("maxInclineLength");
inclineLengthElement.addEventListener("input", calculate);

let trainLengthElement = document.getElementById("trainLength");
trainLengthElement.addEventListener("input", calculate);


function calculate()
{
	let weight = parseFloat(trainWeightImperialElement.value) / 1.02;
	let speedmps = parseFloat(maxSpeedImperialElement.value) * 0.45; //mph to mps
	let angle = parseInt(angleElement.value);
	let inclineLength = parseInt(inclineLengthElement.value);
	let trainLength = parseFloat(trainLengthElement.value);

	
	let metricEffort = calculateTractiveEffort(weight, angle, inclineLength, trainLength);
	let tractiveEffort = Math.round(metricEffort / 4.45);
	
	let tractiveElement = document.getElementById("requiredEffort");
	tractiveElement.innerText = tractiveEffort.toString() + " lbf•ft";	
	
	
	let metricPower = calculatePower(metricEffort, speedmps);
	let requiredPower = Math.round(metricPower / 746);
	
	let powerElement = document.getElementById("requiredPower");
	powerElement.innerText = requiredPower.toString() + " HP";
	
	generateSpeedTable(metricEffort);
}

function calculateTractiveEffort(weight, angle, inclineLength, trainLength)
{
	let flatEffort = weight * 35;
	
	let inclineEffort = 0;
	if (trainLength)
	{
		inclineEffort = weight * angle * 100 * (inclineLength / trainLength); // 100N per gradian of incline
	}

	return (flatEffort + inclineEffort);
}

function calculatePower(metricEffort, speedmps)
{
	return (speedmps * metricEffort);
}

function generateSpeedTable(metricEffort)
{
	const lowSpeedValues = [10, 20, 30, 40, 50, 60, 70, 80, 90, 100];
	const medSpeedValues = [100, 110, 120, 130, 140, 150, 160, 170, 180, 190, 200];
	const highSpeedValues = [200, 225, 250, 275, 300, 325, 350, 375, 400, 425, 450];
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
			newHeader.innerText = speed.toString() + " MPH";
			headerRow.appendChild(newHeader);
		}
		
		table.appendChild(headerRow);	
	
		
		let powerRow = document.createElement("tr");
		
		for (speed of speeds)
		{
			let newCell = document.createElement("td");
			let speedmps = speed * 0.45; //mph to mps
			newCell.innerText = (Math.round(calculatePower(metricEffort, speedmps) / 746)).toString() + " HP";
			powerRow.appendChild(newCell);
		}
		
		table.appendChild(powerRow);
	}
	
}

calculate();