<template>
  <div class="app-image">
    <div
      class="modal"
      :class="{
        'show': showModal,
      }"
      @click="showModal = false"
    >
      <img
        :src="src"
        :alt="alt"
      >
    </div>

    <div
      class="image"
      :style="{
        'width': `${(width || 150)}px`,
        'height': `${(height || 150)}px`,
      }"
      @click="showModal = true"
    >
      <img
        :src="src"
        :alt="alt"
      >
    </div>
  </div>
</template>

<script>
export default {
  name: 'AppImage',
  props: {
    src: {
      type: String,
      required: true,
    },
    alt: {
      type: String,
      required: true,
    },
    height: Number,
    width: Number,
  },
  data() {
    return {
      showModal: false,
    }
  },
}
</script>

<style lang="less" scoped>
.app-image {
  .modal {
    display: flex;

    position: fixed;
    top: 0;
    left: 0;

    z-index: 105;

    width: 100%;
    height: 100%;

    background: fadeout(#000, 20%);

    visibility: hidden;
    opacity: 0;

    transition: all .15s;

    img {
      margin: auto;
      max-width: 90vw;

      transform: scale(.8);
      transition: all .15s .1s;
    }

    &.show {
      opacity: 1;
      visibility: visible;

      img {
        transform: scale(1);
      }
    }
  }

  .image {
    display: flex;
    overflow: hidden;

    background: fadeout(#000, 80%);

    cursor: pointer;

    img {
      width: 100%;
      margin: auto;
    }
  }
}
</style>
