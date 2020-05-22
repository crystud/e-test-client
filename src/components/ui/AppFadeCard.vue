<template>
  <div
    class="app-fade-card"
    :class="{ show }"
    :style="{
      'margin-top': `${marginTop}px`,
    }"
    ref="wrap"
  >
    <slot></slot>
  </div>
</template>

<script>
export default {
  methods: {
    checkState() {
      const {
        show,
        $refs: { wrap = 0 } = {},
      } = this

      this.marginTop = show ? 0 : -wrap.clientHeight - 10
    },
  },
  mounted() {
    this.checkState()
  },
  watch: {
    show() {
      this.checkState()
    },
  },
  data() {
    return {
      marginTop: 0,
    }
  },
  props: {
    show: {
      type: Boolean,
      required: true,
    },
  },
}
</script>

<style lang="less" scoped>
.app-fade-card {
  opacity: 0;
  visibility: hidden;
  transition: all .3s;

  &.show {
    margin-top: 0px;

    opacity: 1;
    visibility: visible;
  }
}
</style>
