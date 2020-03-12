<template>
  <div
    @click="$emit('toggleSelect')"
    class="option"
    :class="{
      'selected': selected,
    }"
  >
    <div class="text">
      Lorem, ipsum dolor sit amet consectetur
      adipisicing elit. Recusandae quos
      illo natus. Molestias distinctio totam
      quidem, reiciendis sed optio veritatis,
      aspernatur facilis ratione expedita
      perspiciatis iure? Vel ex nemo dolor!
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
  },
}
</script>

<style lang="less" scoped>
.option {
  cursor: pointer;

  background: var(--color-bg-dark);
  color: var(--color-font-dark);

  padding: 30px;
  border-radius: 7px;

  position: relative;
  z-index: 1;

  transition: all .3s;

  .line {
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;

    margin: auto;

    width: 25%;
    background: var(--color-bg-light);
    height: 5px;
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
