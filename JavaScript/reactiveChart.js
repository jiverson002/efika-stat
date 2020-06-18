Vue.component("reactive-chart", {
  props: ["url"],

  template: `
  <div>
    <div>
      <button @click="addData()">add data</button>
    </div>
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
    addData: function() {
      this.chart.layout.datarevision = new Date().getTime();
      this.chart.traces[0].y.push(Math.random());
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
        this.chart.layouts = {
          title:'reactive charts',
          xaxis: {
            title: 'xaxis title'
          },
          yaxis: {
            title: 'yaxis title'
          }
        };
        this.chart.traces = json.traces;
        this.chart.traces.forEach(trace => {
          trace['line'] = {
            width: 4,
            shape: "line"
          }
        });
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
