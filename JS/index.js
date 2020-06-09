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

var layout = {
  title: title,
  xaxis: {
    title: xaxis,
  },
  yaxis: {
    title: yaxis,
  }
};

Plotly.newPlot('myDiv', graph, layout);
}

function resetData(){
Plotly.purge("tester");
}
