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
  <button id="submitButton" style="color: black; width: 75px;" type="submit" v-on:click="createOrUpdateGraph">Submit</button>
  <button id="updateButton" style="color: black; width: 75px; display: none; " type="submit" v-on:click="createOrUpdateGraph">Update</button>
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
//Creates the chart or updates it depending on which button above is active
  methods: {
    createOrUpdateGraph: function() {
      fetch (document.getElementById("JSONfile").value)
      .then(response => response.json())
      .then(json => {
        var layout = "";
        var traces = "";
        layout = json.layout;
        var config = {responsive: true};
        traces = json.traces;
        if(document.getElementById("updateButton").style.display == "none"){
          Plotly.plot(
            this.$refs[this.chart.uuid],
            traces,
            layout,
            config
          );
          document.getElementById("updateButton").style.display="block";
          document.getElementById("submitButton").style.display="none";
        }
        else{
          Plotly.react(
            this.$refs[this.chart.uuid],
            traces,
            layout,
            config
          );
        }
      })
    }
  },
//watches for changes to the charts current data
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
});
