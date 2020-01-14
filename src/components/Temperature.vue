  <template>
  <div>
    <h1 class="text-3xl pb-4 font-bold text-gray-800">Temperatur</h1>
    <chart :chart-data="datacollection" id="Temperature"></chart>
  </div>
  </template>
  <script>
    import Chart from "../script/chart.js";
    import moment from 'moment'
    export default {
      components: {
        Chart
      },
      data() {
        return {
          datacollection: null,
        };
      },
      mounted() {
        this.$store.subscribe((mutation, state) => {
          if (mutation.type == 'printer') {
            this.fillData();
          }
        })
      },
      methods: {
        fillData() {
          moment.locale('de')
          // Labels
          var lbls = []
          var rm = []
          this.$store.state.printer.temperature.history.forEach(elem => {
            var time = moment.unix(elem.time).fromNow()
            // subtract(moment(elem.time))
            lbls.push(time)
          });
          // Datasets

          // Annahme: Wenn ein element undefined ist, dann nehme den vorherigen Wert. Ist zwar ein disguisting hack, aber was will man machen?
          // Bed
          var bedTarget = []
          this.$store.state.printer.temperature.history.forEach(elem => {
            if (typeof elem.bed !== 'undefined') {
              bedTarget.push(elem.bed.target)
            } else {
              bedTarget.push(bedTarget[bedTarget.length - 2])
              // rm.push(bedTarget.length - 1)
            }
          });
          var bedActual = []
          this.$store.state.printer.temperature.history.forEach(elem => {
            if (typeof elem.bed !== 'undefined') {
              bedActual.push(elem.bed.actual)
            } else {
              bedActual.push(bedActual[bedActual.length - 2])
              // rm.push(bedActual.length - 1)
            }
          });

          // Tool0
          var tool0Target = []
          this.$store.state.printer.temperature.history.forEach(elem => {
            if (typeof elem.tool0 !== 'undefined') {
              tool0Target.push(elem.tool0.target)
            } else {
              tool0Target.push(tool0Target[tool0Target.length - 2])
              // rm.push(tool0Target.length - 1)
            }
          });
          var tool0Actual = []
          this.$store.state.printer.temperature.history.forEach(elem => {
            if (typeof elem.tool0 !== 'undefined') {
              tool0Actual.push(elem.tool0.actual)
            } else {
              tool0Actual.push(tool0Actual[bedTarget.length - 2])
              // rm.push(tool0Actual.length - 1)
            }
          });
        //   // console.log({
        //     bt: bedTarget.length,
        //     bA: bedActual.length,
        //     tT: tool0Target.length,
        //     tA: tool0Actual.length,
        //   })
        // // console.log(rm)
        // Entfernen aller undefined values
        // rm = [...new Set(rm)].sort().reverse()
        // rm.forEach(i => {
        //   bedTarget.splice(i, 1)
        //   bedActual.splice(i, 1)
        //   tool0Target.splice(i, 1)
        //   tool0Actual.splice(i, 1)
        // });



          this.datacollection = {
            labels: lbls,
            datasets: [{
                label: "Bed Target",
                backgroundColor: 'rgba(72,187,120,0.5)',  // Green 500, 0.5 opacity
                borderColor: "#48BB78", // Green 500
                data: bedTarget,
                pointRadius: 0,
                fill: false
              },
              {
                label: "Bed Actual",
                borderColor: "#276749", // Green 800
                data: bedActual,
                pointRadius: 0,
                pointStyle: 'line',
                fill: false
              },
              {
                label: "Tool Target",
                backgroundColor: "rgba(102,126,234,0.5)", // Indigo 500, 0.5 opacity
                borderColor: "#667EEA", // Indigo 500
                data: tool0Target,
                pointRadius: 0,
                pointStyle: 'line',
                fill: false
              },
              {
                label: "Tool Actual",
                borderColor: "#4C51BF", // Indigo 700
                data: tool0Actual,
                pointRadius: 0,
                pointStyle: 'line',
                fill: false
              },

            ]
          };
        },
      }
    };
  </script>