Vue.component("reactive-chart", {
  props: ["url"],

  template: `
  <div>
    <input type="text" id="JSONfile" value="Enter a Valid URL" size="100"/>
    <button type="submit" v-on:click="createGraph">Submit</button>
    <div :ref="chart.uuid">
    </div>
  </div>`,

  data: function() {
    return {
      chart: {
        uuid: "123",
        traces: [],
        layout: { }
      }
    }
  },

  methods: {
    createGraph: function() {
      fetch (document.getElementById("JSONfile").value)
        .then(response => response.json())
        .then(json => {
          var layout = "";
          var traces = "";
          layout = {
            title:json.title,
            xaxis: {
              title: json.xaxis
            },
            yaxis: {
              title: json.yaxis
            }
          };
         traces = json.traces;
          Plotly.react(
            this.$refs[this.chart.uuid],
            traces,
            layout
          );
        })
    }
  },

  watch: {
    chart: {
      handler: function() {
        Plotly.react(
          this.$refs[this.chart.uuid],
          this.chart.traces,
          this.chart.layout
        );
      },
      deep: true
    }
  },

  created() {
    fetch (this.url)
      .then(response => response.json())
      .then(json => {
        this.chart.layout = {
          title:json.title,
          xaxis: {
            title: json.xaxis
          },
          yaxis: {
            title: json.yaxis
          }
        };
        this.chart.traces = json.traces;
      })
  },

  mounted() {
    Plotly.plot(
      this.$refs[this.chart.uuid],
      this.chart.traces,
      this.chart.layout
    );
  }
});
