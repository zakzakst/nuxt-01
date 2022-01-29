import { Line, mixins } from 'vue-chartjs'
const { reactiveProp } = mixins

export default {
  extends: Line,

  mixins: [reactiveProp],

  props: {
    chartData: {
      required: true,
      type: Object,
    },
    options: {
      type: Object,
      default: () => ({
        responsive: true,
        maintainAspectRatio: false,
      }),
    },
  },

  watch: {
    chartData() {
      this.$data._chart.update()
    },
  },

  mounted() {
    this.renderChart(this.chartData, this.options)
  },
}
