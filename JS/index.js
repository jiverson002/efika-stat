//This is the JSON object where the graph  will receive all of its data
var data = {"title": "Graph of Speed Over Time",
  "xaxis": "Time",
  "yaxis": "Speed",
  "xvals": [1, 2, 3, 4, 5, 6],
  "yvals": [60, 48, 33, 37, 26, 12] };

var title = data.title;
var xaxis = data.xaxis;
var yaxis = data.yaxis;
var xvals = data.xvals;
var yvals = data.yvals;

function getData() {

var layout = {
title: title,
xaxis: {
  title: xaxis,
},
yaxis: {
  title: yaxis,
}
};

TESTER = document.getElementById('tester');
Plotly.newPlot(TESTER, [{
x: xvals,
y: yvals }], layout );
}

function resetData(){
Plotly.purge("tester");
}
