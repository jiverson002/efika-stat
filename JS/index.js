//This is the JSON object where the graph  will receive all of its data

var data = null;
var title = null;
var xaxis = null;
var yaxis = null;
var traces = null;

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
  traces = data.traces;
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

Vue.component("reactive-chart", {
  //receives chart object from Vue instance
  props: ["chart"],
  //binds the uuid of chart??
  template: '<div :ref="chart.uuid"></div>',
  mounted() {
    //plots the plotly graph
    Plotly.plot(this.$refs[this.chart.uuid], this.chart.traces, this.chart.layout, this.chart.config);
  },
  //watches for changes in the chart
  watch: {
    // this is the chart object to watch
    chart: {
      handler: function() {
        //this will change the graph with the updated data
        Plotly.react(
          this.$refs[this.chart.uuid],
          this.chart.traces,
          this.chart.layout
        );
      },
      //makes this work with the inside objects layout and traces
      deep: true
    }
  }
});

var app = new Vue({
el: "#app",
data() {
    return {
      chart: {

        uuid: "123",

        traces: traces,
        layout: {
          title: title,
          xaxis: {
            title: xaxis,
          },
          yaxis: {
            title: yaxis,
          }
        },

        config: {
          responsive: true
        }

      }
    };
  }
});
