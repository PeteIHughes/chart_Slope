# chart_Slope
Slope of a chart HTML

Using regression.js and chart.js
plots the polynomial best fit line for a simple line chart.

my_index.js suppliies the line chart data (Chart_Data)
and calls getSlope to create the polynomial line data

my_Line_Slope.js finds events in the basic line
such as "an up event" / "two ups in a row" / "a supported up"
and finds matching down events to get the range of data for UP or DOWN slopes
Then call getRegression to get the poly line

my_Draw_Chart.js draws the chart with the basic line
