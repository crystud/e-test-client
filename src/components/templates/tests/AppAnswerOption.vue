<template>
  <div
    @click="$emit('toggleSelect')"
    class="option"
    :class="{
      'selected': selected,
    }"
  >
    <div class="text">
      {{text}}
    </div>

    <div class="line"></div>
  </div>
</template>

<script>
export default {
  name: 'AppAnswerOption',
  props: {
    selected: {
      type: Boolean,
      required: true,
      default: () => false,
    },
    text: {
      type: String,
      required: true,
    },
  },
}
</script>

<style lang="less" scoped>
.option {
  cursor: pointer;

  background: var(--color-bg-main);
  color: var(--color-font-dark);

  padding: 30px;
  border-radius: 7px;

  position: relative;
  z-index: 1;

  user-select: none;

  transition: all .3s;

  .line {
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;

    margin: auto;

    width: 15%;
    background: var(--color-bg-light);
    height: 2px;
    border-radius: 10px;
  }

  &.selected {
    color: var(--color-font-main);

    .line {
      background: #1FD999;
    }
  }
}
</style>
