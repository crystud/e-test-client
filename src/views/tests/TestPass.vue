<template>
  <div class="app-test-pass">
    <app-preloader :show="showPreloader"></app-preloader>

    <app-finish-warning
      :show="showWarning"
      @continue="showWarning = false"
      @finish="finish"
    ></app-finish-warning>

    <div class="markup">
      <div class="leftbar">
        <div class="questions">
          <ul>
            <li
              v-for="(task, index) in tasksList"
              v-bind:key="index"
              :class="{
                selected: currentQuestion.id === task.id,
              }"
              @click="
                currentQuestion = task
                loadQuestion()
              "
            >Питання №{{index+1}}</li>
          </ul>
        </div>

        <div
          class="finish"
          @click="showWarning = true"
        >
          Закінчити тест
        </div>
      </div>

      <div class="status">
        Статус: {{userAnswers.length}} / {{tasksList.length}}
      </div>

      <div class="current-question">
        <div
          v-if="!currentQuestion.id"
          class="select-question"
        >Оберіть запитання</div>

        <div v-if="question.task">
          <div class="options">
            <div class="header">
              <span class="title">{{taskTypesTips[currentQuestion.task.type]}}</span>
              <span class="title">Тип: {{taskTypes[currentQuestion.task.type]}}</span>
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

            <div v-if="['SIMPLE_CHOICE', 'MULTI_CHOICE'].includes(question.task.type)">
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
                  :text="option.answer.answerText"
                  @toggleSelect="toggle(option.id, question.id)"
                  :selected="isSelected(option.id, question.id)"
                ></app-answer-option>
              </div>

              <pre>
                {{question}}
              </pre>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex'

import AppAnswerOption from '@/components/templates/tests/AppAnswerOption.vue'
import AppFinishWarning from '@/components/templates/tests/AppFinishWarning.vue'
import AppPreloader from '@/components/ui/AppPreloader.vue'

export default {
  name: 'testPass',
  components: {
    AppAnswerOption,
    AppFinishWarning,
    AppPreloader,
  },
  computed: {
    tasksList() {
      const { attempt: { attemptTasks } = {} } = this

      return attemptTasks || []
    },
    options() {
      return this.question.attemptAnswers || []
    },
  },
  methods: {
    ...mapActions({
      setAlert: 'alert/set',
      getTest: 'tests/getTestByID',
      getAttempt: 'attempts/getByID',
      getTasks: 'attempts/getTasks',
      loadOptions: 'attempts/loadOptions',
      sendAnswers: 'attempts/sendAnswers',
      getQuestion: 'attempts/getQuestion',
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

        this.$router.push({ name: 'homeUser' })
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
        switch (this.question.task.type) {
          case 'SIMPLE_CHOICE':
            question.answers = [optionID]
            break
          case 'MULTI_CHOICE':
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
    async loadQuestion() {
      try {
        const { currentQuestion: { id } = {} } = this

        this.showPreloader = true

        this.question = await this.getQuestion(id)
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
      attempt: {},
      question: {},
      userAnswers: [],
      numbering: [],
      taskTypes: {
        SIMPLE_CHOICE: 'Простий вибір',
        MULTI_CHOICE: 'Множинний вибір',
        SHORT_ANSWER: 'Коротка відповідь',
        NUMERICAL: 'Послідовність',
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
    const { attemptID } = this.$route.params

    this.showPreloader = true

    try {
      this.attempt = await this.getAttempt(attemptID)
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

  .markup {
    display: grid;
    grid-template-areas: 'leftbar status' 'leftbar current-question';
    grid-template-columns: 230px 1fr;
    grid-template-rows: auto 1fr;

    width: 100%;
    min-height: calc(100vh - 130px);

    background: var(--color-bg-dark);
    border-radius: 10px;

    .leftbar {
      grid-area: leftbar;
      border-right: 1px solid var(--color-bg-main);

      display: grid;
      grid-template-rows: 1fr 50px;

      .questions {
        overflow: auto;

        ul {
          display: block;
          padding: 0;
          margin: 0;
          list-style: none;

          li {
            padding: 15px 20px;
            position: relative;
            cursor: pointer;
            transition: all .3s;

            &:hover {
              background: var(--color-bg-main);
            }

            &::before {
              content: "";

              display: block;
              position: absolute;
              top: 0;
              left: 0;
              bottom: 0;
              margin: auto;

              width: 4px;
              height: 0%;
              background: var(--color-accent-green);
              border-radius: 10px;

              transition: all .3s;
            }

            &.selected {
              color: var(--color-accent-green);

              &::before {
                height: 70%;
              }
            }
          }
        }
      }

      .finish {
        cursor: pointer;
        color: var(--color-accent-red);
        background: var(--color-bg-dark);
        border-top: 1px solid var(--color-bg-main);
        border-radius: 0 0 0 10px;

        display: flex;
        justify-content: center;
        align-items: center;

        &:active {
          transform: scale(.96);
        }
      }
    }

    .status {
      grid-area: status;
      border-bottom: 1px solid var(--color-bg-main);

      padding: 20px;
    }

    .current-question {
      grid-area: current-question;
      padding: 30px;

      .list {
        display: grid;
        grid-template-columns: 1fr 1fr;
        grid-gap: 20px;

        @media screen and (max-width: 700px) {
          grid-template-columns: 1fr;
        }
      }
    }

    @media screen and (max-width: 650px) {
      grid-template-columns: 1fr;
      grid-template-rows: auto;
      grid-template-areas: 'status' 'leftbar' 'current-question';

      .leftbar {
        border-right: 0;
      }
    }
  }
}
</style>
