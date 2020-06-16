//This is the JSON object where the graph  will receive all of its data

var data = null;

fetch('https://gist.githubusercontent.com/iwilson001/295fce39e79e828be028489a4c3b43bd/raw/e55cb2bef35ad617cfe12e67304939727304d645/data.json')
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
            this.chart.layout,
            this.chart.config
          );
        },
        //makes this work with the inside objects layout and traces
        deep: true
      }
    }
  });

  var app = new Vue({
  el: "#app",
  methods:{
    editData: function(){
      this.chart.layout.datarevision = new Date().getTime();
      this.chart.traces[0].y[0] = 22;
      console.log(this.chart.traces[0].y[0]);
      this.chart.traces[0].y.push();
    }
  },
  data() {
      return {
        chart: {

          uuid: "123",

          traces: data.traces,

          layout: {
            title: data.title,
            xaxis: {
              title: data.xaxis,
            },
            yaxis: {
              title: data.yaxis,
            }
          },

          config: {
            responsive: true
          }

        }
      };
    }
  });
})
.catch(function(error) {
  console.log('Looks like there was a problem: \n', error);
});
