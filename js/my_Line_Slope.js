
function getSlope(data, type) {

	var slopePoints		= findSlopePoints(Chart_Data);
//console.log("slopePoints");
//console.table(slopePoints);


	var slopeLine		= [];
	// pad beginning of chart slope line with nulls
	for(var index = 1; index < slopePoints[0]; index++){
		slopeLine.push({x: index, y: null});
	}

	// get the slope data for the start/end points
	for(var index = 0; index < slopePoints.length; index ++) 
	{
		var startOfSlope	= slopePoints[index];
		var endOfSlope		= slopePoints[index+1];

		var slopeData		= [];
		for(var dataIndex = startOfSlope-1; dataIndex < endOfSlope; dataIndex ++) 
		{
			slopeData.push([dataIndex+1, data[dataIndex][1]]);
		}

		var slopeRegLine	= getRegression(slopeData, type);
		index+=1;

		slopeLine = slopeLine.concat(slopeRegLine);

		if (slopePoints[index]) {
			// pad with zeros thru to the next slope
			for(var padIndex = endOfSlope+1; padIndex < slopePoints[index+1]; padIndex++){
				slopeLine.push({x: padIndex, y: null});
			}
		}
	}

	return slopeLine;
}


function findSlopePoints(data) {

	var slopePointArray		= [];

	// loop through input data
	// find the start and end points of a slope
	var slopeEvent		= findSlopeEvent(data);
//console.log("slopeEvent");
//console.table(slopeEvent);

	// get the slope points
	for(var index = 0; index < slopeEvent.length; index ++) 
	{
		// find the start and end of an "UP" slope
		if (slopeEvent[index][1] == "a supported up")
		{
			slopePointArray.push(slopeEvent[index][0]);
			// find corresponding down
			for(var indexUp = index; indexUp < slopeEvent.length; indexUp ++) 
			{
				if (slopeEvent[indexUp][1] == "2 downs in a row" || slopeEvent[indexUp][1] == "a big down event")
				{
					slopePointArray.push(slopeEvent[indexUp][0]);
					index = indexUp;
					break;
				}
			}
		}

		// find the start and end of a "DOWN" slope
		if (slopeEvent[index][1] == "a supported down")
		{
			slopePointArray.push(slopeEvent[index][0]);
			// find corresponding up
			for(var indexDown = index; indexDown < slopeEvent.length; indexDown ++) 
			{
				if (slopeEvent[indexDown][1] == "2 ups in a row" || slopeEvent[indexDown][1] == "a big up event")
				{
					slopePointArray.push(slopeEvent[indexDown][0]);
					index = indexDown;
					break;
				}
			}
		}
	}

	return slopePointArray;
}


function findSlopeEvent(data) {

	var slopeEventArray		= [];

	slopeEventArray.push([0, "start of data"]);

	for(var index = 0; index < data.length; index ++) 
	{
		// test if next point higher
		if (data[index+1] && data[index+1][1] >= data[index][1])
		{
			slopeEventArray.push([index+1, "an up event"]);
			// test if next point substatially higher
			if (data[index+1] && data[index+1][1] >= data[index][1]*1.1)
			{
				slopeEventArray.push([index+1, "a big up event"]);
			}
			// test point after that higher
			if (data[index+2] && data[index+2][1] >= data[index+1][1])
			{
				slopeEventArray.push([index+1, "2 ups in a row"]);
				// test 4 of the next 5 points must be higher
				if ((data[index+3] && data[index+3][1] >= data[index+2][1])
					&& (data[index+4] && data[index+4][1] >= data[index+3][1])
					&& (data[index+5] && data[index+5][1] >= data[index+4][1])
					&& (data[index+6] && data[index+6][1] >= data[index+5][1])
					&& (data[index+7] && data[index+7][1] >= data[index+6][1]) ) {
					slopeEventArray.push([index+1, "a supported up"]);
				}
			}
		}


		if (data[index+1] && data[index+1][1] <= data[index][1])
		{
			slopeEventArray.push([index+1, "a down event"]);
			// test if next point substatially lower
			if (data[index+1] && data[index+1][1] <= data[index][1]*0.9)
			{
				slopeEventArray.push([index+1, "a big down event"]);
			}
			// test point after that lower
			if (data[index+2] && data[index+2][1] <= data[index+1][1])
			{
				slopeEventArray.push([index+1, "2 downs in a row"]);
				// test 4 of the next 5 points
				if (data[index+7] && data[index+3][1] <= data[index+2][1]
					&& data[index+4][1] <= data[index+3][1]
					&& data[index+5][1] <= data[index+4][1]
					&& data[index+6][1] <= data[index+5][1]
					&& data[index+7][1] <= data[index+6][1] ) {
					slopeEventArray.push([index+1, "a supported down"]);
				}
			}
		}
	}

	return slopeEventArray;
}


function getRegression(data, type) {

	var extrapolatedPoints = [];

	// then add the linear regression points
	for(var index = 0; index < data.length; index++){
		var val = data[index][0];
		switch(type) {
			case "linear":
				var lineRegression		= regression('linear', data);
				extrapolatedPoints.push({x: val, y: lineRegression.equation[0] * val + lineRegression.equation[1]});
			break;
			case "poly":
				var polyRegression		= regression('polynomial', data, 2);
				extrapolatedPoints.push({x: val, y: polyRegression.equation[2] * Math.pow(val,2) + polyRegression.equation[1] * val + polyRegression.equation[0]});
			break;
			default:
		}
	}

	return extrapolatedPoints;
}
