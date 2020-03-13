<template>
  <button
    @click="$emit('click')"
    :class="appearance"
  >
    <slot></slot>
  </button>
</template>

<script>
export default {
  name: 'AppButton',
  props: {
    appearance: {
      type: String,
      required: false,
      default: () => 'primary',
    },
  },
}
</script>

<style lang="less" scoped>
button {
  &.primary,
  &.secondary,
  &.neutral {
    border: 0;
    border-radius: 7px;

    color: #fff;
    cursor: pointer;
    font-size: 1em;
    padding: 12px 40px;
  }

  &.primary {
    background: #3242D5;
  }

  &.neutral {
    background: var(--color-bg-light);
    color: var(--color-font-main);
  }

  &.secondary {
    background: #D32323;
  }

  &.link {
    background: transparent;
    border: 0;
    color: var(--color-font-light);

    font-size: 1em;
    padding: 5px 10px;
    cursor: pointer;

    &:hover {
      text-decoration: underline;
    }
  }
}
</style>
