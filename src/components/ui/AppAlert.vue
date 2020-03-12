<template>
  <div
    class="alert"
    :class="{
      'show': showAlert,
    }"
  >
    <div class="body">
      <font-awesome-icon
        :icon="isSuccess ? 'check-circle' : 'times-circle'"
        class="icon"
        :class="isSuccess ? 'success' : 'bad'"
      ></font-awesome-icon>

      <div class="title">{{title}}</div>

      <div class="text">{{text}}</div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Alert.vue',
  data() {
    return {
      showAlert: false,
    }
  },
  props: {
    text: {
      type: String,
      required: false,
      default: () => '',
    },
    title: {
      type: String,
      required: false,
      default: () => '',
    },
    isSuccess: {
      type: Boolean,
      required: true,
    },
    delay: {
      type: Number,
      required: false,
      default: () => 1500,
    },
    show: {
      type: Boolean,
      required: true,
    },
  },
  watch: {
    show() {
      const { delay, show } = this

      this.showAlert = show

      if (show && delay !== 0) {
        setTimeout(() => {
          this.showAlert = false
          this.$emit('close')
        }, delay)
      }
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

  @media @small {
    padding: 20px;
  }

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
    padding: 50px;

    margin: auto;
    background: #111;
    box-shadow: 0px 0px 25px rgba(0, 0, 0, 0.72);
    border-radius: 10px;

    text-align: center;

    transform: scale(0.9);
    transition: all .3s;

    .icon {
      font-size: 80px;
      margin-bottom: 30px;
      color: #fff;

      transform: scale(.5);
      transition: all .15s .1s;

      &.success {
        color: #30CC7E;
      }

      &.bad {
        color: #C92020;
      }
    }

    .title {
      font-size: 1.7em;
      color: #fff;
      font-weight: 200;
      margin-bottom: 30px;
    }

    .text {
      font-size: 1.05em;
      color: #555;
      font-weight: 100;
    }
  }
}
</style>
