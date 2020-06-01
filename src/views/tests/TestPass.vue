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
              @click="() => {
                if (currentQuestion.id !== task.id) {
                  currentQuestion = task
                  loadQuestion()
                }
              }"
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
        Статус:
        {{
          (userAnswers.filter(({ answers }) => answers.length > 0).length
          / tasksList.length) * 100
        }}%
      </div>

      <div class="current-question">
        <div
          v-if="question.id"
          class="question-content"
        >
          <div
            class="image"
            v-if="question.task.image"
          >
            <img
              :src="`data:image/jpg;base64,${question.task.image}`"
              alt="question image"
            >
          </div>

          <div
            class="text"
            v-if="question.task.question"
          >
            {{question.task.question}}
          </div>
        </div>

        <div
          v-if="!question.id"
          class="select-question"
        >Оберіть запитання</div>

        <div v-if="question.task">
          <div class="options">
            <div class="header">
              <span class="title">{{taskTypesTips[currentQuestion.task.type]}}</span>
              <span class="title">Тип: {{taskTypes[currentQuestion.task.type]}}</span>
            </div>

            <div
              v-if="question.task.type === 'SHORT_ANSWER'"
              class="input-type"
            >
              <input
                type="text"
                autofocus
                placeholder="Введіть свою відповідь"
                v-on:keyup="fillTextInputQuestion"
                :value="getTextInputQuestionValue()"
              >
            </div>

            <div
              v-if="question.task.type === 'NUMERICAL'"
              class="numbering-type"
            >
              <div
                class="option"
                v-for="(option, index) in options"
                :key="index"
              >
                <span class="number">{{index+1}}</span>

                <select v-on:change="(ev) => fillNumberingQuestion(ev, index)">
                  <option>-</option>

                  <option
                    v-for="(numberingOption, localIndex) in options"
                    :key="localIndex"
                    :value="numberingOption.id"
                    :selected="checkNumberingOptionSelected(numberingOption.id, index)"
                  >{{numberingOption.answer.answerText}}</option>
                </select>
              </div>
            </div>

            <div v-if="['SIMPLE_CHOICE', 'MULTIPLE_CHOICE'].includes(question.task.type)">
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
        tasksList: tasks,
        $route: { params: { attemptID } },
      } = this

      const responseTasks = []

      userAnswers.forEach(({ question, answers }) => {
        const location = tasks.findIndex(({ id }) => question.id === id)

        if (question.task.type === 'SHORT_ANSWER') {
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
          payload: {
            tasks: responseTasks.map((response) => response || { answers: [] }),
          },
          attemptID,
        })

        localStorage.removeItem('attempt')
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
          case 'MULTIPLE_CHOICE':
            if (!question.answers.includes(optionID)) {
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
        MULTIPLE_CHOICE: 'Множинний вибір',
        SHORT_ANSWER: 'Коротка відповідь',
        NUMERICAL: 'Послідовність',
      },
      taskTypesTips: {
        SIMPLE_CHOICE: 'Варіанти відповідей',
        MULTIPLE_CHOICE: 'Варіанти відповідей',
        SHORT_ANSWER: 'Введіть відповідь',
        NUMERICAL: 'Послідовність',
      },
    }
  },
  async created() {
    const { attemptID } = this.$route.params

    this.showPreloader = true

    try {
      this.attempt = await this.getAttempt(attemptID)

      if (!this.attempt.active) {
        const delay = 2000

        localStorage.removeItem('attempt')

        this.setAlert({
          title: 'Спроба неактивна',
          text: 'Час дії спроби витік.',
          show: true,
          isSuccess: false,
          delay,
        })

        setTimeout(() => {
          this.$router.push({ name: 'homeUser' })
        }, 2000)

        return
      }

      localStorage.setItem('attempt', JSON.stringify(this.attempt))

      this.userAnswers = this.attempt.attemptTasks.map((question) => ({
        question,
        answers: [],
      }))
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

      .select-question {
        color: var(--color-font-dark);
        font-size: 1.3em;
        text-align: center;
      }

      .list {
        display: grid;
        grid-template-columns: 1fr 1fr;
        grid-gap: 20px;

        @media screen and (max-width: 700px) {
          grid-template-columns: 1fr;
        }
      }

      .question-content {
        display: grid;
        grid-template-columns: auto auto;

        align-items: center;

        margin-bottom: 20px;
        background: var(--color-bg-main);
        padding: 20px;
        border-radius: 10px;

        .image {
          img {
            max-height: 150px;
          }
        }

        .text {
          font-size: 1.3em;
        }
      }

      .options {
        .header {
          margin-bottom: 20px;

          display: flex;
          justify-content: space-between;

          color: var(--color-font-dark);
        }
      }

      .numbering-type {
        .option {
          margin-bottom: 15px;

          .number {
            font-size: 1.2em;
          }

          select {
            font-size: 1em;
            padding: 10px;
            border-radius: 5px;
            border: 0;
            background: var(--color-bg-main);
            color: var(--color-font-main);

            margin-left: 15px;
          }
        }
      }

      .input-type {
        input {
          padding: 15px;
          font-size: 1em;
          border-radius: 5px;
          border: 0;
          background: var(--color-bg-main);
          color: var(--color-font-main);

          width: 100%;

          &::placeholder {
            color: var(--color-font-dark);
          }
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
