<template>
  <div class="questions-list">
    <div
      v-for="i in 30"
      v-bind:key="i"

      @click="$emit('setQuestion', i)"
      class="question"
      :class="{
        'current': currentQuestion === i,
      }"
    >{{i}}</div>

    <button
      class="finish-test"
      @click="$emit('onStop')"
    >
      <font-awesome-icon
        icon="stop-circle"
      ></font-awesome-icon>
    </button>
  </div>
</template>

<script>
export default {
  name: 'AppQuestionsList',
  props: {
    currentQuestion: {
      type: [Number, null],
      required: false,
      default: () => null,
    },
  },
}
</script>

<style lang="less" scoped>
.questions-list {
  display: grid;
  grid-template-columns: repeat(auto-fill, 40px);
  grid-gap: 10px;

  margin: 20px 0;

  .question {
    cursor: pointer;

    height: 40px;

    border-radius: 5px;

    background: var(--color-bg-dark);
    color: var(--color-font-main);

    display: flex;
    justify-content: center;
    align-items: center;

    transition: all 0s;

    &.current {
      background: linear-gradient(45deg, #23D09A, #1CA5D8);
      color: #fff;
    }
  }

  .finish-test {
    height: 40px;
    font-size: 1.3em;
    background: var(--color-accent-red);
    color: #fff;

    cursor: pointer;

    border: 0;
    border-radius: 5px;
  }
}
</style>
