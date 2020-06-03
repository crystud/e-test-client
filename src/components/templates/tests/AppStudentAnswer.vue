<template>
  <div
    class="app-student-answer"
    :class="{
      'percent-0-40': resultPercent >= 0 && resultPercent <= 40,
      'percent-40-80': answer.resultPercent > 40 && resultPercent <= 80,
      'percent-80-100': resultPercent > 80 && resultPercent <= 100,
    }"
  >
    <div class="question">
      <div
        class="image"
        v-if="answer.task.image"
      >
        <img
          :src="`data:image/jpg;base64,${answer.task.image}`"
          alt="attached image"
        >
      </div>

      <div class="text">{{answer.task.question}}</div>
    </div>


    <div class="answer">
      <span class="icon">
        {{resultPercent.toFixed(1)}}%
      </span>

      <span class="text">
        <div>
          <div class="answers-list">
            <div
              v-for="(text, index) in answer.correct"
              v-bind:key="index"
              class="answer-text"
            >
              <span class="is-right">[-]</span>
              <span class="content">{{text}}</span>
            </div>

            <div
              v-for="(text, index) in answer.incorrect"
              v-bind:key="index"
              class="answer-text"
            >
              <span class="is-right">[-]</span>
              <span class="content">{{text}}</span>
            </div>
          </div>
        </div>
      </span>
    </div>

    <div class="line"></div>
  </div>
</template>

<script>
export default {
  computed: {
    resultPercent() {
      const { answer } = this

      return (answer.receivedScore / answer.maxScore) * 100
    },
  },
  props: {
    answer: {
      type: Object,
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

  font-weight: 300;

  position: relative;

  .question {
    display: flex;
    align-items: center;

    .image {
      img {
        margin-right: 10px;
        max-height: 100px;
      }
    }

    .text {
      color: var(--color-font-dark);
    }
  }

  .answer {
    margin-top: 20px;
    display: flex;
    align-items: center;

    .icon {
      display: flex;
      border-radius: 5px;
      padding: 5px 10px;

      font-size: 1.1em;

      color: #fff;

      justify-content: center;
      align-items: center;
    }

    .text {
      margin-left: 20px;

      .answers-list {
        .answer-text {
          margin-bottom: 5px;
        }

        .is-right {
          margin-right: 10px;
        }
      }
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
    max-width: 100px;

    border-radius: 10px;

    background: var(--color-accent-green);
  }

  &.percent-0-40 {
    .line {
      background: var(--color-accent-red);
    }

    .answer .icon {
      background: var(--color-accent-red);
    }
  }

  &.percent-40-80 {
    .line {
      background: var(--color-accent-orange);
    }

    .answer .icon {
      background: var(--color-accent-orange);
    }
  }

  &.percent-80-100 {
    .line {
      background: var(--color-accent-green);
    }

    .answer .icon {
      background: var(--color-accent-green);
    }
  }
}
</style>
