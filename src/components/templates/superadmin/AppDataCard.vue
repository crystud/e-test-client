<template>
  <div
    class="card"
    :class="{
      'is-good': isGoodState,
      'is-bad': !isGoodState,
    }"
  >
    <div class="value">
      <slot name="value"></slot>
    </div>

    <div class="label">
      <slot name="label"></slot>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    isGoodState: {
      type: Boolean,
      required: false,
      default: () => true,
    },
  },
}
</script>

<style lang="less" scoped>
.card {
  background: var(--color-bg-dark);
  padding: 20px;
  border-radius: 10px;

  display: flex;
  flex-direction: column;
  justify-content: center;

  position: relative;

  &::before {
    content: "";
    display: block;
    height: 2px;
    width: 30%;
    max-width: 50px;

    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    margin: auto;
  }

  &.is-good::before {
    background: #1ED6BA;
  }

  &.is-bad::before {
    background: #E01313;
  }

  .value {
    font-size: 1.7em;
    color: var(--color-font-main);
  }

  .label {
    margin-top: 5px;
    color: var(--color-font-dark);
  }
}
</style>
