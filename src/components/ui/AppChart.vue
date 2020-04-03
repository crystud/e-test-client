<template>
  <div class="app-chart">
    <canvas
      ref="chart"
      class="chart-element"
    ></canvas>

    <div class="vertical-labels">
      <div
        v-for="(label, index) in verticalLabels"
        v-bind:key="index"
      >{{label}}</div>
    </div>

    <div
      class="chart"
      v-on:scroll="handleScroll"
      ref="chartArea"
    >
      <img
        src=""
        alt="chart data"
        class="chart-image"
        ref="chartImage"
      >
    </div>

    <div
      class="horizontal-labels"
      ref="timeLabels"
    >
      <div
        v-for="({ label }, index) in values"
        v-bind:key="index"
      >{{label}}</div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  computed: {
    ...mapGetters({
      isDarkTheme: 'theme/isDarkTheme',
    }),
  },
  watch: {
    isDarkTheme() {
      this.generate()
    },
  },
  props: {
    verticalLabels: {
      type: Array,
      required: true,
      default: () => [],
    },
    values: {
      type: Array,
      required: true,
      default: () => [],
    },
    scrollToEnd: {
      type: Boolean,
      required: false,
      default: () => false,
    },
  },
  methods: {
    generate() {
      const {
        ctx,
        values,
        $refs: { chart: canvas },
      } = this

      const { offsetWidth } = canvas
      const customWidth = values.length * 200

      const canvasWidth = customWidth < offsetWidth ? offsetWidth : customWidth

      canvas.width = canvasWidth
      canvas.height = canvas.offsetHeight

      const normalizedChartData = values

      this.ctx.clearRect(0, 0, canvas.width, canvas.height)

      this.ctx.strokeStyle = this.isDarkTheme ? '#1E2329' : '#eee'

      ctx.lineWidth = 2

      ctx.shadowColor = 'transparent'
      ctx.shadowBlur = 0
      ctx.shadowOffsetX = 0
      ctx.shadowOffsetY = 0

      this.verticalLabels.forEach((_, index) => {
        const y = (canvas.height / this.verticalLabels.length) * (index + 1)

        this.ctx.beginPath()

        this.ctx.moveTo(0, y)
        this.ctx.lineTo(canvas.offsetWidth, y)

        this.ctx.stroke()
      })

      normalizedChartData.forEach((_, index) => {
        const x = (canvas.width / normalizedChartData.length) * (index + 1)

        this.ctx.beginPath()

        this.ctx.moveTo(x, 0)
        this.ctx.lineTo(x, canvas.height)

        this.ctx.stroke()
      })

      ctx.strokeStyle = '#1ED6BA'
      ctx.lineWidth = 3
      ctx.shadowColor = 'rgba(1, 255, 135, 1)'
      ctx.shadowBlur = 45
      ctx.shadowOffsetX = 0
      ctx.shadowOffsetY = 0

      normalizedChartData.forEach(({ value }, index, data) => {
        const x = (canvasWidth / normalizedChartData.length) * index
        const y = canvas.height - ((canvas.height / 100) * (value))

        if (!data[index + 1]) return

        const nextValue = values[index + 1].value
        const nextX = (canvasWidth / normalizedChartData.length) * (index + 1)
        const nextY = canvas.height - ((canvas.height / 100) * (nextValue))

        ctx.beginPath()
        ctx.moveTo(x, y)
        ctx.lineTo(nextX, nextY)
        ctx.stroke()
      })

      const canvasImage = this.$refs.chart.toDataURL('image/png')

      if (canvasImage !== null) {
        this.chartImage = canvasImage

        this.$refs.chartImage.src = canvasImage
      }

      const {
        timeLabels,
        chartArea,
      } = this.$refs

      timeLabels.scrollTo(timeLabels.scrollWidth, 0)
      chartArea.scrollTo(chartArea.scrollWidth, 0)
    },
    handleScroll() {
      const {
        chartArea: { scrollLeft },
        timeLabels,
      } = this.$refs

      timeLabels.scrollTo(scrollLeft, 0)
    },
  },
  mounted() {
    const { chart } = this.$refs

    this.ctx = chart.getContext('2d')

    this.generate()
  },
}
</script>

<style lang="less" scoped>
.app-chart {
  display: grid;
  grid-template-areas: 'verticalLabels chart' '. horizontalLabels';
  grid-template-columns: 50px 1fr;
  grid-template-rows: 1fr 40px;

  width: 100%;
  overflow: auto;

  .chart-element {
    position: absolute;
    top: -1000%;
    left: 0;
    z-index: 100;

    height: 500px;
    background: var(--color-bg-dark);
  }

  .vertical-labels {
    grid-area: verticalLabels;

    display: flex;
    flex-direction: column;
    justify-content: space-between;

    text-align: right;

    div {
      color: var(--color-font-dark);
      padding-right: 10px;
    }
  }

  .horizontal-labels {
    grid-area: horizontalLabels;

    display: flex;
    justify-content: space-between;
    flex-wrap: nowrap;

    width: 100%;
    overflow: hidden;

    margin-top: 10px;

    div {
      color: var(--color-font-dark);
      width: 100px;

      flex-shrink: 0;
      text-align: center;
    }
  }

  .chart {
    grid-area: chart;

    overflow: auto;

    .chart-image {
      height: 250px;
    }
  }
}
</style>
