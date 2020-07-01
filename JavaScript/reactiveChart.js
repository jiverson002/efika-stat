Vue.component("reactive-chart", {
  props: ["url"],

  template: `
  <div>
  <table width="100%">
  <tr>
  <td width="100%">
  <input type="text" id="JSONfile" value="Enter a Valid URL" style="color: black; margin-right: auto;margin-left: auto; width: 100%;"/>
  </td>
  <td width="80px">
  <button style="color: black; width: 75px;" type="submit" v-on:click="createGraph">Submit</button>
  </td>
  </tr>
  </table>
  <div :ref="chart.uuid">
  </div>
  </div>`,

  data: function() {
    return {
      chart: {
        uuid: "123",
        traces: [],
        layout: {}
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
            type: 'date',
            title: json.xaxis
          },
          yaxis: {
            title: json.yaxis
          }
        };
        var config = {responsive: true};
        traces = json.traces;
        Plotly.react(
          this.$refs[this.chart.uuid],
          traces,
          layout,
          config
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
          this.chart.layout,
          this.chart.config
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
      this.chart.config = {responsive: true};
    })
  },

  mounted() {
    Plotly.plot(
      this.$refs[this.chart.uuid],
      this.chart.traces,
      this.chart.layout,
      this.chart.config
    );
  }
});
