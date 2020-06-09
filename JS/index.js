//This is the JSON object where the graph  will receive all of its data
/*
var data = {"title": "Graph of Speed Over Time",
  "xaxis": "Time",
  "yaxis": "Speed",

  "xvals":[
    [1, 2, 3, 4, 5, 6],
    [1, 2, 3, 4, 5, 6]
  ],
  "yvals":[
    [60, 48, 33, 37, 26, 12],
    [12, 32, 43, 83, 57, 22]

  ]

  };

*/
  fetch('https://gist.githubusercontent.com/iwilson001/295fce39e79e828be028489a4c3b43bd/raw/a7777a7f31f88cb625bc6f0eb836276334794b8e/data.json')
  .then(function(response) {
    if (!response.ok) {
      throw Error(response.statusText);
    }
    // Read the response as json.
    return response.json();
  })
  .then(function(responseAsJson) {
    // Do stuff with the JSON
    console.log(responseAsJson);
  })
  .catch(function(error) {
    console.log('Looks like there was a problem: \n', error);
  });

/*
var title = data.title;
var xaxis = data.xaxis;
var yaxis = data.yaxis;
var xvals = data.xvals;
var yvals = data.yvals;


var getData = new Vue({

e1: '#app',
data(){
  return{
    info: null
  }
},
mounted(){
  axios
  .get('https://gist.githubusercontent.com/iwilson001/295fce39e79e828be028489a4c3b43bd/raw/a7777a7f31f88cb625bc6f0eb836276334794b8e/data.json')
  .then(response => (this.info = response.data.bpi))
}

});
*/
function getData() {
  var trace1 = {
    x: data.xvals[0],
    y: data.yvals[0],
    type: 'scatter'
  };
  var trace2 = {
    x: data.xvals[1],
    y: data.yvals[1],
    type: 'scatter'
  };

var graph = [trace1, trace2];

Plotly.newPlot('myDiv', graph);


/* Old original plot
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
*/
}

function resetData(){
Plotly.purge("tester");
}
