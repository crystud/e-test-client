<template>
  <div class="app-question-detailed-info">
    <app-preloader :show="showPreloader"></app-preloader>

    <app-fade-card :show="Boolean(questionID)">
      <div class="body">
        <div class="header">
          <div class="question">{{question.question}}</div>

          <div
            class="close"
            @click="$emit('close')"
          >
            <font-awesome-icon icon="times"></font-awesome-icon>
          </div>
        </div>

        <div class="info">
          <div class="task">
            <app-data-list
              class="data-list"
              :data="[
                [
                  'Створив',
                  `
                    ${question.creator.lastName}
                    ${question.creator.firstName}
                    ${question.creator.patronymic}
                    (ID #${question.creator.id})
                  `
                ],
                ['Тип', taskTypes[question.type] || 'Невідомий'],
                ['Тема', question.topic.name],
                ...additionalData,
              ]"
            ></app-data-list>
          </div>

          <div
            v-if="question.type !== 'NUMERICAL'"
            class="answers"
          >
            <div class="title">Варіанти відповідей</div>

            <div class="list">
              <div
                v-for="({ image, answerText, correct }, index) in question.answers"
                :key="index"
                class="answer"
                :class="{
                  correct,
                  incorrect: !correct,
                }"
              >
                <div
                  v-if="image"
                  class="image"
                >
                  <img
                    :src="`data:image/jpg;base64,${image}`"
                    alt="answer option image"
                  >
                </div>

                <div class="answer-body">
                  <div class="answer-text">{{answerText}}</div>

                  <div class="is-correct">
                    {{correct ? 'Правильна відповідь' : 'Неправильна відповідь'}}
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div
            class="answers numerical"
            v-else
          >
            <div class="title">Послідовність:</div>

            <div class="wrap">
              <div
                v-for="({ image, position, answerText }, index) in question.answers"
                v-bind:key="index"
                class="item"
              >
                <div
                  v-if="image"
                  class="image"
                >
                  <img
                    :src="`data:image/jpg;base64,${image}`"
                    alt="answer option image"
                  >
                </div>

                <div class="text">{{position}}. {{answerText}}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </app-fade-card>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'

import AppFadeCard from '@/components/ui/AppFadeCard.vue'
import AppPreloader from '@/components/ui/AppPreloader.vue'
import AppDataList from '@/components/ui/AppDataList.vue'

export default {
  data() {
    return {
      showPreloader: false,
      taskTypes: {
        SIMPLE_CHOICE: 'Простий вибір',
        MULTIPLE_CHOICE: 'Множинний вибір',
        SHORT_ANSWER: 'Коротка відповідь',
        NUMERICAL: 'Послідовність',
      },
    }
  },
  computed: {
    ...mapGetters({
      question: 'questions/question',
    }),
    additionalData() {
      const { question } = this
      const data = []

      if (['SIMPLE_CHOICE', 'MULTIPLE_CHOICE'].includes(question.type)) {
        data.push(['К-сть варіантів відповіді', question.answers.length])
      }

      if (question.type === 'SHORT_ANSWER') {
        data.push(['Відповідь', question.answers[0].answerText || ''])
      }

      return data
    },
  },
  methods: {
    ...mapActions({
      getQuestion: 'questions/getByID',
      setAlert: 'alert/set',
    }),
    async loadQuestion() {
      const { questionID } = this

      try {
        this.showPreloader = true

        await this.getQuestion(questionID)
      } catch (e) {
        this.setAlert({
          title: 'Помилка',
          text: 'Не вдалось отримати інформацію про запитання',
          show: true,
          isSuccess: false,
        })
      } finally {
        this.showPreloader = false
      }
    },
  },
  watch: {
    questionID() {
      const { questionID } = this

      if (questionID !== 0) {
        this.loadQuestion()
      }
    },
  },
  components: {
    AppFadeCard,
    AppPreloader,
    AppDataList,
  },
  props: {
    questionID: {
      type: Number,
      required: true,
    },
  },
}
</script>

<style lang="less" scoped>
.app-question-detailed-info {
  .body {
    padding: 30px;
    border-radius: 10px;
    background: var(--color-bg-dark);
    box-shadow: 0px 0px 10px rgba(0, 0, 0, .2);

    .header {
      display: grid;
      grid-template-columns: 1fr auto;
      grid-gap: 20px;

      align-items: center;

      margin-bottom: 20px;

      .question {
        font-size: 1.3em;
        font-weight: bold;
      }

      .close {
        width: 40px;
        height: 40px;
        border-radius: 5px;
        font-size: 1.2em;
        background: var(--color-accent-red);
        color: #fff;
        cursor: pointer;

        display: flex;

        svg {
          margin: auto;
        }
      }
    }

    .info {
      display: grid;
      grid-template-columns: 1fr 2fr;
      grid-gap: 20px;

      .data-list {
        margin: 0;
      }

      .answers {
        .title {
          font-size: 1.1em;
          margin-bottom: 15px;
        }

        .list {
          display: grid;
          grid-template-columns: 1fr 1fr;
          grid-gap: 20px;
        }

        .image {
          display: flex;

          img {
            margin: auto;
            max-width: 100%;
            max-height: 70px;
          }
        }

        .answer {
          background: var(--color-bg-main);
          border-radius: 10px;
          padding: 30px;

          .answer-text {
            font-size: 1.2em;
            color: var(--color-font-dark);
          }

          &.correct .is-correct {
            color: var(--color-accent-green);
          }

          &.incorrect .is-correct {
            color: var(--color-accent-red);
          }

          .is-correct {
            margin-top: 10px;
          }
        }

        @media screen and (max-width: 680px) {
          .list {
            grid-template-columns: 1fr;
          }

          .answer .image img {
            margin: 0;
          }
        }
      }

      .numerical {
        .wrap {
          .item {
            display: grid;
            grid-template-columns: auto 1fr;

            margin-bottom: 15px;
            border-radius: 5px;
            background: var(--color-bg-main);
            color: var(--color-font-main);
            overflow: hidden;

            .image img {
              display: block;
            }

            .text, .image {
              padding: 15px;
            }
          }
        }
      }

      @media screen and (max-width: 1150px) {
        grid-template-columns: 1fr;
      }
    }
  }
}
</style>
