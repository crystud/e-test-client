<template>
  <div class="app-test-pass">
    <app-finish-warning
      :show="showWarning"
      @continue="showWarning = false"
      @finish="finish"
    ></app-finish-warning>

    <app-test-header
      :showMinimize="true"
    ></app-test-header>

    <app-questions-list
      :currentQuestion="currentQuestion"
      @setQuestion="(number) => currentQuestion = number"
      @onStop="showWarning = true"
    ></app-questions-list>

    <app-question></app-question>

    <div class="options">
      <div class="header">
        <span class="title">Варіанти відповідей</span>
        <span class="title">макс. к-сть відповідей: 2</span>
      </div>

      <div class="list">
        <app-answer-option
          v-for="i in 6"
          v-bind:key="i"
          @toggleSelect="toggle(i)"
          :selected="selected.includes(i)"
        ></app-answer-option>
      </div>
    </div>

    <div class="next-question">
      <button @click="nextQuestion">Наступне запитання</button>
    </div>
  </div>
</template>

<script>
import AppTestHeader from '@/components/templates/tests/AppTestHeader.vue'
import AppQuestionsList from '@/components/templates/tests/AppQuestionsList.vue'
import AppQuestion from '@/components/templates/tests/AppQuestion.vue'
import AppAnswerOption from '@/components/templates/tests/AppAnswerOption.vue'
import AppFinishWarning from '@/components/templates/tests/AppFinishWarning.vue'

export default {
  name: 'testPass',
  components: {
    AppTestHeader,
    AppQuestionsList,
    AppQuestion,
    AppAnswerOption,
    AppFinishWarning,
  },
  methods: {
    finish() {
      this.$router.push({
        name: 'testResults',
        params: {
          id: 1,
        },
      })
    },
    toggle(id) {
      const { selected } = this

      if (selected.includes(id)) {
        selected.splice(selected.indexOf(id), 1)
      } else {
        selected.push(id)
      }
    },
    nextQuestion() {
      const {
        questionsLength,
        currentQuestion,
      } = this

      const next = currentQuestion + 1

      this.currentQuestion = next > questionsLength ? 1 : next
    },
  },
  data() {
    return {
      showWarning: false,
      selected: [],
      questionsLength: 30,
      currentQuestion: null,
    }
  },
}
</script>

<style lang="less" scoped>
.app-test-pass {
  user-select: none;

  .options {
    margin-top: 30px;

    .header {
      color: var(--color-font-dark);

      margin-bottom: 15px;

      display: flex;
      justify-content: space-between;
    }

    .list {
      margin-top: 10px;

      display: grid;
      grid-template-columns: 1fr 1fr;
      grid-gap: 20px;
    }

    @media screen and (max-width: 680px) {
      .list {
        grid-template-columns: 1fr;
      }
    }
  }

  .next-question {
    margin-top: 30px;
    display: flex;
    justify-content: flex-end;

    button {
      background: linear-gradient(45deg, #21C8D6, #1FCC8A);
      color: #fff;

      padding: 15px;
      border: 0;

      font-size: 1.2em;
      border: 0;
      border-radius: 10px;
      cursor: pointer;
    }
  }
}
</style>
