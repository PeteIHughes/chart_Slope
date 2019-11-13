

const colorGreen	= 'rgba(100, 204, 102, 1.0)';
const colorBlue		= 'rgba(046, 159, 234, 1.0)';
const colorBlack	= 'rgba(000, 000, 000, 0.6)';


var chartCtx 		= document.getElementById("chart").getContext("2d");
var chartData		= [];
var chartLabels		= [];
var chartConfig		= [];


function chart_Config(data) {

	for(var index = 0; index < data.length; index ++) 
	{
		chartData.push(data[index][1]);
		chartLabels.push(data[index][0]);
	}

	chartConfig = {
		type: 'line',
		data: {
			labels: chartLabels,
			datasets: [
			{
				label: "none",
				borderColor: colorBlue,
				pointBackgroundColor: colorBlue,
				data: Slope_Line,
				pointRadius: 0,
				lineTension: 0.1,
				fill: false
			},
			{
				label: "none",
				borderColor: colorGreen,
				pointBackgroundColor: colorGreen,
				data: chartData,
				fill: false
			}
			]
		},
		options: {
			title:{
				display:false
			},
			legend: {
				display: false
			}
		}
	};
}
