<template>
  <div
    class="app-student-answer"
    :class="{
      'wrong-answer': !isRight,
      'right-answer': isRight,
    }"
  >
    <div class="question">Lorem ipsum dolor sit amet?</div>

    <div class="answer">
      <span class="icon">
        <font-awesome-icon
          :icon="isRight ? 'check' : 'times'"
        ></font-awesome-icon>
      </span>

      <span class="text">
        Lorem, ipsum.
      </span>
    </div>

    <div class="line"></div>
  </div>
</template>

<script>
export default {
  name: 'AppStudentAnswer',
  props: {
    isRight: {
      type: Boolean,
      required: true,
    },
  },
}
</script>

<style lang="less" scoped>
.app-student-answer {
  padding: 20px;

  border-radius: 10px;
  background: var(--color-bg-dark);

  color: var(--color-font-main);

  font-weight: 100;

  position: relative;

  .question {
    color: var(--color-font-dark);
  }

  .answer {
    margin-top: 20px;
    display: flex;
    align-items: center;

    .icon {
      display: flex;
      width: 30px;
      height: 30px;
      border-radius: 50%;

      font-size: 1.1em;

      color: #fff;

      justify-content: center;
      align-items: center;
    }

    .text {
      margin-left: 10px;
    }
  }

  .line {
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    margin: auto;

    height: 3px;
    width: 20%;

    border-radius: 10px;

    background: #1ED6BA;
  }

  &.right-answer {
    .answer .icon {
      background: #1ED6BA;
    }
  }

  &.wrong-answer {
    .answer .icon {
      background: #D32323;
    }

    .line {
      background: #D32323;
    }
  }
}
</style>
