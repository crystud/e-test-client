<template>
  <div class="app-test-develop">
    <app-preloader :show="showPreloader"></app-preloader>

    <app-ask-topic
      :show="Boolean(showAddQuestion && test.subject && !addQuestionTopic.id)"
      @selected="topic => {
        addQuestionTopic = topic
        showAddQuestion = false
      }"
      :subjectID="test.subject ? test.subject.id : 0"
      @cancel="showAddQuestion = false"
    ></app-ask-topic>

    <app-ask-questions
      :show="Boolean(test.subject && addQuestionTopic.id)"
      :topic="addQuestionTopic"
      :testID="test.id || 0"
      @cancel="cancelQuestionAdding"
      @added="
        cancelQuestionAdding()
        loadTest()
      "
      :alreadyAdded="questions.map(({ id }) => id)"
    ></app-ask-questions>

    <div class="header">
      <div class="title">
        <div class="text">Тест: {{test.name}}</div>
      </div>

      <app-button
        appearance="primary"
        @click="
          showAddQuestion = true
          addQuestionSubject = {}
          addQuestionTopic = {}
        "
      >Додати питання до теста</app-button>
    </div>

    <app-question-detailed-info
      :questionID="questionShowInfoID"
      class="question-full-info"
      @close="questionShowInfoID = 0"
    ></app-question-detailed-info>

    <div class="questions">
      <div class="title">Список питань</div>

      <div
        class="no-questions"
        v-if="!questions.length"
      >Запитань немає</div>

      <div
        class="list"
        v-if="questions.length"
      >
        <div class="row header-row">
          <div class="id">ID</div>
          <div class="question">Запитання</div>
          <div class="type">Тип</div>
        </div>

        <div
          v-for="({ id, question, type }, index) in questions"
          :key="index"
          class="row question-row"
          :class="{
            detailed: id === questionShowInfoID,
          }"
          @click="questionShowInfoID = id"
        >
          <div class="id">#{{id}}</div>
          <div class="question">{{question}}</div>
          <div class="type">{{taskTypes[type]}}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex'

import AppAskTopic from '@/components/templates/teacher/AppAskTopic.vue'
import AppAskQuestions from '@/components/templates/teacher/AppAskQuestions.vue'
import AppQuestionDetailedInfo from '@/components/templates/teacher/AppQuestionDetailedInfo.vue'

import AppButton from '@/components/ui/AppButton.vue'
import AppPreloader from '@/components/ui/AppPreloader.vue'

export default {
  components: {
    AppButton,
    AppPreloader,
    AppAskTopic,
    AppAskQuestions,
    AppQuestionDetailedInfo,
  },
  computed: {
    questions() {
      return (this.test.tasks || [])
    },
  },
  methods: {
    ...mapActions({
      getTest: 'tests/getTestByID',
      setAlert: 'alert/set',
    }),
    cancelQuestionAdding() {
      this.addQuestionTopic = {}
      this.showAddQuestion = false
    },
    async loadTest() {
      const { $route: { params: { id } } } = this

      try {
        this.showPreloader = true
        this.test = await this.getTest(id)
      } catch (e) {
        this.setAlert({
          title: 'Помилка',
          text: 'Не вдалось отримати дані про тест...',
          isSuccess: false,
        })
      } finally {
        this.showPreloader = false
      }
    },
  },
  data() {
    return {
      editingLevel: {},
      showAddQuestion: false,
      showPreloader: false,
      addQuestionTopic: {},
      test: {},
      questionShowInfoID: 0,
      taskTypes: {
        SIMPLE_CHOICE: 'Простий вибір',
        MULTIPLE_CHOICE: 'Множинний вибір',
        SHORT_ANSWER: 'Коротка відповідь',
        NUMERICAL: 'Послідовність',
      },
    }
  },
  created() {
    this.loadTest()
  },
}
</script>

<style lang="less" scoped>
.app-test-develop {
  .header {
    display: grid;
    grid-template-columns: 1fr auto;
    grid-gap: 20px;

    align-items: center;

    .title {
      .text {
        font-size: 1.5em;
        font-weight: 400;
      }

      .change {
        color: var(--color-font-dark);
        margin-top: 5px;

        cursor: pointer;
        user-select: none;
      }
    }
  }

  .question-full-info {
    margin: 20px 0;
  }

  .questions {
    margin-top: 20px;

    background: var(--color-bg-dark);
    box-shadow: 0px 0px 20px rgba(0, 0, 0, .2);
    border-radius: 10px;

    padding: 30px;

    .title {
      font-size: 1.2em;
    }

    .no-questions {
      font-size: 1.4em;
      text-align: center;
      margin: 50px;
      color: var(--color-font-dark);
    }

    .list {
      margin-top: 20px;

      .row {
        &.header-row {
          color: var(--color-font-dark);
        }

        &.question-row {
          cursor: pointer;
          padding: 0px;
          background: transparent;
          border-radius: 5px;
          transition: all .3s;

          &.detailed {
            background: var(--color-accent-green);
            color: #fff;
            padding: 15px;
            border-radius: 5px;
          }
        }

        display: grid;
        grid-template-columns: 70px 1fr 150px;
        grid-gap: 30px;
        margin-bottom: 20px;

        @media screen and (max-width: 600px) {
          grid-template-columns: 1fr;
          grid-gap: 10px;

          .question {
            font-size: 1.3em;
          }
        }
      }
    }
  }
}
</style>
