<template>
  <div class="app-circle-chart">
    <div class="label">
      <div>
        <div class="value">{{progress.toFixed(2)}}%</div>

        <div
          class="text"
          v-if="label"
        >{{label}}</div>
      </div>
    </div>

    <svg
      viewPort="0 0 100 100"
      :width="radius * 2 + 20"
      :height="radius * 2 + 20"
      version="1.1"
      xmlns="http://www.w3.org/2000/svg"
    >
      <filter id="dropshadow" height="130%">
        <feGaussianBlur in="SourceAlpha" stdDeviation="5"/>
        <feOffset dx="0" dy="0" result="offsetblur"/>

        <feComponentTransfer>
          <feFuncA type="linear" slope="0.5"/>
        </feComponentTransfer>

        <feMerge>
          <feMergeNode/>
          <feMergeNode in="SourceGraphic"/>
        </feMerge>
      </filter>

      <circle
        :style="{
          transform: `translate(0, ${radius * 2 + 20}px) rotate(-90deg)`,
          filter: 'url(#dropshadow)',
        }"
        ref="circlePath"
        :r="radius"
        :cx="radius + 10"
        :cy="radius + 10"
      />
    </svg>
  </div>
</template>

<script>
export default {
  data() {
    return {
      offset: null,
    }
  },
  methods: {
    handleChanges() {
      let { progress } = this

      const { radius } = this
      const c = Math.PI * (radius * 2)
      const path = this.$refs.circlePath

      if (progress > 100) progress = 100
      if (progress < 0) progress = 0

      if (!path) return


      const length = path.getTotalLength()

      path.style.strokeDashoffset = length
      path.style.strokeDasharray = length

      const to = length * ((100 - progress) / 100)

      path.getBoundingClientRect()
      path.style.strokeDashoffset = Math.max(0, to)

      this.offset = ((100 - progress) / 100) * c
    },
  },
  watch: {
    radius() {
      this.handleChanges()
    },
    progress() {
      this.handleChanges()
    },
  },
  mounted() {
    this.handleChanges()
  },
  props: {
    progress: {
      type: Number,
      required: false,
      default: () => 0,
    },
    radius: {
      type: Number,
      required: false,
      default: () => 50,
    },
    label: {
      type: String,
      required: false,
      default: () => '',
    },
  },
}
</script>

<style lang="less" scoped>
.app-circle-chart {
  position: relative;;

  .label {
    display: flex;
    justify-content: center;
    align-items: center;

    position: absolute;
    top: 0;
    left: 0;

    width: 100%;
    height: 100%;

    text-align: center;

    .value {
      font-weight: bold;
    }

    .text {
      color: var(--color-font-dark);
    }
  }

  svg {
    fill: none;
    margin: 0;

    circle {
      stroke: var(--color-accent-green);
      stroke-width: 10px;
      stroke-linecap: round;
      stroke-dasharray: 141.37;

      transition: all .3s;
    }
  }
}
</style>
