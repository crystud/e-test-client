<template>
  <div class="app-test-pass">
    <app-preloader :show="showPreloader"></app-preloader>

    <app-finish-warning
      :show="showWarning"
      @continue="showWarning = false"
      @finish="finish"
    ></app-finish-warning>

    <app-test-header
      :showMinimize="true"
      :test="test"
    ></app-test-header>

    <app-questions-list
      :currentQuestion="currentQuestion.id"
      @setQuestion="loadQuestion"
      @onStop="showWarning = true"
      :tasksList="attempt.tasks || []"
    ></app-questions-list>

    <div>
      <div style="margin: 10px 0">{{currentQuestion}}</div>
      <div style="margin: 10px 0">{{options}}</div>
      <div style="margin: 10px 0">{{userAnswers}}</div>
      <div style="margin: 10px 0">{{numbering}}</div>
    </div>

    <div
      v-if="!currentQuestion.id"
      class="select-question"
    >Оберіть запитання</div>

    <div v-if="currentQuestion.id">
      <app-question :question="currentQuestion"></app-question>

      <div class="options">
        <div class="header">
          <span class="title">{{taskTypesTips[currentQuestion.type]}}</span>
          <span class="title">Тип: {{taskTypes[currentQuestion.type]}}</span>
        </div>

        <div
          v-if="currentQuestion.type === 'text_input'"
          class="input-type"
        >
          <input
            type="text"
            placeholder="Введіть свою відповідь"
            v-on:keyup="fillTextInputQuestion"
            :value="getTextInputQuestionValue()"
          >
        </div>

        <div
          v-if="currentQuestion.type === 'numbering'"
          class="numbering-type"
        >
          <div
            class="option"
            v-for="(option, index) in options"
            :key="index"
          >
            <select v-on:change="(ev) => fillNumberingQuestion(ev, index)">
              <option>-</option>

              <option
                v-for="(numberingOption, localIndex) in options"
                :key="localIndex"
                :value="numberingOption.id"
                :selected="checkNumberingOptionSelected(numberingOption.id, index)"
              >{{localIndex+1}}</option>
            </select>

            <span class="text">{{option.text}}</span>
          </div>
        </div>

        <div v-if="['single_choice', 'multy_choice'].includes(currentQuestion.type)">
          <div
            v-if="!options.length"
            class="select-question"
          >
            Варіантів відповіді не знайдено...
          </div>

          <div class="list">
            <app-answer-option
              v-for="(option, index) in options"
              v-bind:key="index"
              :text="option.text"
              @toggleSelect="toggle(option.id, currentQuestion.id)"
              :selected="isSelected(option.id, currentQuestion.id)"
            ></app-answer-option>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex'

import AppTestHeader from '@/components/templates/tests/AppTestHeader.vue'
import AppQuestionsList from '@/components/templates/tests/AppQuestionsList.vue'
import AppQuestion from '@/components/templates/tests/AppQuestion.vue'
import AppAnswerOption from '@/components/templates/tests/AppAnswerOption.vue'
import AppFinishWarning from '@/components/templates/tests/AppFinishWarning.vue'
import AppPreloader from '@/components/ui/AppPreloader.vue'

export default {
  name: 'testPass',
  components: {
    AppTestHeader,
    AppQuestionsList,
    AppQuestion,
    AppAnswerOption,
    AppFinishWarning,
    AppPreloader,
  },
  methods: {
    ...mapActions({
      setAlert: 'alert/set',
      getTest: 'tests/getTestByID',
      getAttempt: 'attempts/getByID',
      getQuestion: 'attempts/getQuestion',
      getTasks: 'attempts/getTasks',
      loadOptions: 'attempts/loadOptions',
      sendAnswers: 'attempts/sendAnswers',
    }),
    async finish() {
      const {
        userAnswers,
        tasks,
        $route: { params: { attemptID } },
      } = this

      const responseTasks = []

      userAnswers.forEach(({ question, answers }) => {
        const location = tasks.findIndex(({ id }) => question.id === id)

        if (question.type === 'text_input') {
          responseTasks[location] = {
            answers: answers[0],
          }

          return
        }

        const intParsedAnswers = answers.map((id) => parseInt(id, 10))

        responseTasks[location] = { answers: intParsedAnswers }
      })

      try {
        this.showPreloader = true

        await this.sendAnswers({
          payload: { tasks: responseTasks },
          attemptID,
        })
      } catch (e) {
        this.setAlert({
          title: 'Помилка',
          text: 'Не вдалось надіслати результати...',
          show: true,
          delay: 2500,
          isSuccess: false,
        })
      } finally {
        this.showPreloader = false

        this.$router.push({
          name: 'homeStudent',
        })
      }
    },
    checkNumberingOptionSelected(optionID, index) {
      const {
        currentQuestion: { id: questionID },
      } = this

      const question = this.userAnswers.find(({ question: { id } }) => questionID === id)

      if (!question) return false

      return parseInt(question.answers[index], 10) === parseInt(optionID, 10)
    },
    fillNumberingQuestion(ev, index) {
      const {
        currentQuestion: { id: questionID },
      } = this

      const question = this.userAnswers.findIndex(({ question: { id } }) => questionID === id)

      if (question === -1) {
        const answers = []

        answers[index] = ev.target.value

        this.userAnswers.push({
          question: this.currentQuestion,
          answers,
        })
      } else {
        const answers = this.userAnswers

        answers[question].answers[index] = ev.target.value

        this.userAnswers = answers
      }
    },
    fillTextInputQuestion(ev) {
      const {
        currentQuestion: { id: questionID },
        userAnswers,
      } = this

      const question = userAnswers.find(({ question: { id } }) => questionID === id)

      if (!question) {
        userAnswers.push({
          question: this.currentQuestion,
          answers: [ev.target.value],
        })
      } else {
        question.answers = [ev.target.value]
      }
    },
    getTextInputQuestionValue() {
      const {
        currentQuestion: { id: questionID },
        userAnswers,
      } = this

      const question = userAnswers.find(({ question: { id } }) => questionID === id)

      if (!question) return ''

      return question.answers[0]
    },
    isSelected(optionID, questionID) {
      const question = this.userAnswers.find(({ question: { id } }) => questionID === id)

      if (!question) return false

      return question.answers.includes(optionID)
    },
    toggle(optionID, questionID) {
      const { userAnswers } = this

      const question = userAnswers.find(({ question: { id } }) => id === questionID)

      if (!question) {
        userAnswers.push({
          question: this.currentQuestion,
          answers: [optionID],
        })
      } else {
        switch (this.currentQuestion.type) {
          case 'single_choice':
            question.answers = [optionID]
            break
          case 'multy_choice':
            if (question.answers.length + 1 < this.options.length
                && !question.answers.includes(optionID)) {
              question.answers.push(optionID)
            } else {
              const location = question.answers.indexOf(optionID)

              if (location !== -1) {
                question.answers.splice(location, 1)
              }
            }
            break
          default:
            return false
        }
      }

      return false
    },
    async loadQuestion(questionID) {
      try {
        this.showPreloader = true

        const question = this.tasks.find(({ id }) => id === questionID)

        this.options = await this.loadOptions({
          questionID: question.id,
          attemptID: this.attempt.id,
        })

        this.currentQuestion = question
      } catch (e) {
        this.setAlert({
          title: 'Помилка',
          text: 'Не вдалось прогрузити питання...',
          show: true,
          isSuccess: false,
        })
      } finally {
        this.showPreloader = false
      }
    },
  },
  data() {
    return {
      showWarning: false,
      showPreloader: false,
      currentQuestion: {},
      test: {},
      attempt: {},
      tasks: [],
      options: [],
      userAnswers: [],
      numbering: [],
      taskTypes: {
        single_choice: 'Один варіант',
        multy_choice: 'Декілька варіантів',
        text_input: 'Ввести значення',
        numbering: 'Визначити послідовність',
      },
      taskTypesTips: {
        single_choice: 'Варіанти відповідей',
        multy_choice: 'Варіанти відповідей',
        text_input: 'Введіть відповідь',
        numbering: 'Визначте послідовність',
      },
    }
  },
  async created() {
    const { testID, attemptID } = this.$route.params

    this.showPreloader = true

    try {
      this.test = await this.getTest(testID)
      this.attempt = await this.getAttempt(attemptID)
      this.tasks = await this.getTasks(attemptID)
    } catch (e) {
      this.setAlert({
        title: 'Помилка',
        text: 'Не вдалось прогрузити дані...',
        isSuccess: false,
        show: true,
      })
    } finally {
      this.showPreloader = false
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

    .numbering-type,
    .input-type {
      padding: 60px 30px;
      text-align: center;
      border-radius: 10px;
      background: var(--color-bg-dark);
    }

    .numbering-type {
      display: flex;
      align-items: center;
      flex-direction: column;

      .option {
        margin-bottom: 30px;
        display: grid;

        grid-template-columns: 70px 200px;
        grid-gap: 10px;

        select,
        .text {
          background: var(--color-bg-main);
          color: var(--color-font-main);
          padding: 10px;
          border-radius: 5px;
          font-size: 1.2em;
        }

        select {
          height: 100%;
          border: 0;
          width: 70px;
        }

        .text {
          display: flex;
          align-items: center;
        }
      }
    }

    .input-type {
      input {
        padding: 15px;
        max-width: 300px;
        width: 100%;
        font-size: 1em;
        border-radius: 10px;
        border: 0;
        background: var(--color-bg-main);
        color: var(--color-font-main);

        &::placeholder {
          color: var(--color-font-dark);
        }
      }
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

  .select-question {
    text-align: center;
    margin: 80px;
    font-size: 1.5em;
    color: var(--color-font-dark);
  }
}
</style>
