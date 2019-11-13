
var Chart_Data	= [
				[01,50],
				[02,51],
				[03,53],
				[04,56],
				[05,50],
				[06,59],
				[07,57],
				[08,42],
				[09,31],
				[10,30],
				[11,25],
				[12,22],
				[13,21],
				[14,26],
				[15,18],
				[16,22],
				[17,16],
				[18,18],
				[19,20],
				[20,25],
				[21,37],
				[22,38],
				[23,40],
				[24,63],
				[25,44],
				[26,21],
				[27,17],
				[28,23],
				[29,11],
				[30,35],
				[31,36],
				[32,37],
				[33,44],
				[34,48],
				[35,49],
				[36,51],
				[37,54],
				[38,58],
				[39,59],
				[40,61],
				[41,62],
				[42,64],
				[43,66],
				[44,67],
				[45,69],
				[46,76],
				[47,71],
				[48,67],
				[49,64]
				];
//console.log("Chart Data");
//console.table(Chart_Data);

//var Slope_Line			= getSlope(Chart_Data, "linear");
var Slope_Line			= getSlope(Chart_Data, "poly");
//console.log("Slope_Line");
//console.table(Slope_Line);


chart_Config(Chart_Data, Slope_Line);
new Chart(chartCtx, chartConfig);
