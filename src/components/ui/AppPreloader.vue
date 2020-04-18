<template>
  <div
    class="preloader"
    :class="{
      'show': show,
    }"
  >
    <div>
      <div class="bars">
        <div class="bar"
          v-for="i in 5"
          v-bind:key="i"
          :class="{
            'even-bar': i % 2 === 0,
            'odd-bar': i % 2 === 1,
          }"
        ></div>
      </div>

      <div
        class="label"
        v-if="title"
      >{{title}}</div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'AppPreloader.vue',
  data() {
    return {
      interval: null,
      currentState: 0,
    }
  },
  props: {
    show: {
      type: Boolean,
      required: true,
    },
    title: {
      type: [String, Number],
      required: false,
    },
  },
}
</script>

<style lang="less" scoped>
.preloader {
  position: fixed;
  top: 0;
  left: 0;

  z-index: 1003;

  width: 100%;
  height: 100%;

  display: flex;
  justify-content: center;
  align-items: center;

  background: rgba(0, 0, 0, 0.7);
  color: #fff;

  opacity: 0;
  visibility: hidden;

  transition: all .3s;

  &.show {
    opacity: 1;
    visibility: visible;
  }

  .bars {
    height: 100px;

    display: flex;
    align-items: center;

    transform: scale(.7);

    .bar {
      flex-shrink: 0;

      width: 10px;
      height: 50px;
      margin: 0 10px;

      background: #fff;
      border-radius: 10px;

      transition: all .3s;
    }

    .odd-bar {
      background: #219FCE;

      animation: oddBar 1s infinite;
    }

    .even-bar {
      background: #2150CE;

      animation: evenBar 1s infinite;
    }

    @keyframes oddBar {
      0%, 100% {
        height: 60px;
      }

      50% {
        height: 20px;
      }
    }

    @keyframes evenBar {
      0%, 100% {
        height: 0px;
      }

      50% {
        height: 100px;
      }
    }
  }

  .label {
    font-size: 1.2em;
    font-weight: 300;
    margin-top: 30px;

    text-align: center;
    color: var(--color-font-dark);
  }
}
</style>
