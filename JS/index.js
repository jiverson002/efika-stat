//This is the JSON object where the graph  will receive all of its data

var data = null;
var title = null;
var xaxis = null;
var yaxis = null;
var xvals = null;
var yvals = null;

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
  data = responseAsJson;
  title = data.title;
  xaxis = data.xaxis;
  yaxis = data.yaxis;
  xvals = data.xvals;
  yvals = data.yvals;
})
.catch(function(error) {
  console.log('Looks like there was a problem: \n', error);
});


function getData() {

  var graph = new Array();
  for(var i = 0; i < data.xvals.length; i++){
    var trace1 = {
      x: data.xvals[i],
      y: data.yvals[i],
      type: 'scatter'
    };
    graph.push(trace1);
  }

  var layout = {
    title: title,
    xaxis: {
      title: xaxis,
    },
    yaxis: {
      title: yaxis,
    }
  };

var config = {responsive: true}

  Plotly.newPlot('myDiv', graph, layout, config);
}

function resetData(){
  Plotly.purge("tester");
}
