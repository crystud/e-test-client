<template>
  <div
    @click="$emit('toggleSelect')"
    class="option"
    :class="{
      'selected': selected,
    }"
  >
    <div class="content">
      <div
        class="image"
        v-if="image"
      >
        <img
          :src="`data:image/jpg;base64,${image}`"
          alt="attached image"
        >
      </div>

      <div class="text">
        {{text}}
      </div>
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
    image: {
      type: String,
      required: false,
      default: () => '',
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

  .image {
    img {
      max-height: 150px;
    }
  }

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
