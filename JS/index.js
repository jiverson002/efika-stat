//var data = JSON.parse(JSON/data.js);

//This is the JSON object where the graph  will receive all of its data
var data = {"title": "Graph of Speed Over Time",
  "xaxis": "Time",
  "yaxis": "Speed",
  "xvals": [1, 2, 3, 4, 5, 6],
  "yvals": [60, 48, 33, 37, 26, 12] };


/*
  This was for testing purposes only and can be removed

  console.log(data.title);
  console.log(data.xaxis);
  console.log(data.yaxis);
  console.log(data.xvals[0]);
  console.log(data.yvals[0]);
*/
var title = data.title;
var xaxis = data.xaxis;
var yaxis = data.yaxis;
var xvals = data.xvals;
var yvals = data.yvals;

function getData() {

  /*
  This is old code to make the graph using text boxes

  title = document.getElementById("title").value;
  xaxis = document.getElementById("xaxis").value;
  yaxis = document.getElementById("yaxis").value;

  var temp = document.getElementById("xvals").value;
  var newVal = "";
  for(var i = 0; i < temp.length; i++){
    while(temp.charAt(i) != ',' && i < temp.length){
      newVal += (temp.charAt(i)).toString();
      i++;
    }
    xvals.push(Number(newVal));
    newVal = "";
  }

  temp = document.getElementById("yvals").value;
  newVal = "";
  for(var i = 0; i < temp.length; i++){
    while(temp.charAt(i) != ',' && i < temp.length){
      newVal += (temp.charAt(i)).toString();
      i++;
    }
    yvals.push(Number(newVal));
    newVal = "";
  }
*/
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
