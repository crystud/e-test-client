<template>
  <div
    class="alert"
    :class="{
      'show': show,
    }"
  >
    <div
      class="body"
      :class="{
        'no-paddings': noPaddings,
      }"
    >
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: 'AppModalWindow.vue',
  props: {
    show: {
      type: Boolean,
      required: true,
    },
    noPaddings: {
      type: Boolean,
      required: false,
      default: () => false,
    },
  },
}
</script>

<style lang="less" scoped>
@small: ~"screen and (max-width: 799px)";
@medium: ~"screen and (max-width: 1200px)";
@large: ~"screen and (min-width: 1201px)";

.alert {
  position: fixed;
  top: 0;
  left: 0;

  width: 100vw;
  height: 100vh;

  z-index: 1000;

  background: rgba(0, 0, 0, 0.85);

  display: flex;

  visibility: hidden;
  opacity: 0;

  transition: all .3s;

  &.show {
    opacity: 1;
    visibility: visible;

    .body {
      transform: scale(1);

      .icon {
        transform: scale(1);
      }
    }
  }

  .body {
    padding: 50px 30px;

    margin: auto;
    background: var(--color-bg-dark);
    color: #fff;
    box-shadow: 0px 0px 25px rgba(0, 0, 0, 0.72);
    border-radius: 10px;

    max-height: 95vh;
    overflow: auto;

    transform: scale(0.9);
    transition: transform .3s;

    &.no-paddings {
      padding: 0;
    }
  }

  @media @small {
    padding: 10px;

    .body {
      padding: 20px;
    }
  }
}
</style>
