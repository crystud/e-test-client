<template>
  <div
    class="app-switch"
    :class="{
      'is-on': isOn,
    }"
    @click="$emit('switch', !isOn)"
  >
    <div class="circle"></div>
  </div>
</template>

<script>
export default {
  name: 'AppSwitch',
  props: {
    isOn: {
      type: Boolean,
      required: true,
      default: () => false,
    },
  },
}
</script>

<style lang="less" scoped>
@circle-size: 25px;

.app-switch {
  display: flex;
  align-items: center;

  width: 50px;
  height: @circle-size - 5px;

  background: var(--color-bg-light);
  border-radius: 30px;

  cursor: pointer;

  position: relative;

  .circle {
    position: absolute;
    left: 0;

    width: @circle-size;
    height: @circle-size;
    border-radius: 50%;

    background: var(--color-font-dark);

    transition: all .3s;
  }

  &.is-on {
    .circle {
      background: #19CE88;
      left: calc(100% - @circle-size);
    }
  }
}
</style>
