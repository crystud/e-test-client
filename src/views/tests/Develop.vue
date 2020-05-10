<template>
  <div class="app-test-develop">
    <app-preloader :show="showPreloader"></app-preloader>

    <app-ask-subject
      :show="showAddQuestion"
      @selected="subject => addQuestionSubject = subject"
    ></app-ask-subject>

    <app-ask-topic
      :show="Boolean(addQuestionSubject.id && !addQuestionTopic.id)"
      @selected="topic => {
        addQuestionTopic = topic
        showAddQuestion = false
      }"
      :subjectID="addQuestionSubject.id || 0"
    ></app-ask-topic>

    <app-ask-questions
      :show="Boolean(addQuestionSubject.id && addQuestionTopic.id)"
      :topic="addQuestionTopic"
      :levelID="editingLevel.id || 0"
      @cancel="cancelQuestionAdding"
      @added="cancelQuestionAdding"
      :alreadyAdded="questions.map(({ id }) => id)"
    ></app-ask-questions>

    <div class="header">
      <div class="title">
        <div class="text">{Назва теста}</div>
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
          <div class="question">Запитання</div>
          <div class="type">Тип</div>
        </div>

        <div
          v-for="(question, index) in questions"
          :key="index"
          class="row"
        >
          <div class="question">{{question.ask}}</div>
          <div class="type">{{taskTypes[question.type]}}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex'

import AppAskSubject from '@/components/templates/teacher/AppAskSubject.vue'
import AppAskTopic from '@/components/templates/teacher/AppAskTopic.vue'
import AppAskQuestions from '@/components/templates/teacher/AppAskQuestions.vue'

import AppButton from '@/components/ui/AppButton.vue'
import AppPreloader from '@/components/ui/AppPreloader.vue'

export default {
  components: {
    AppButton,
    AppPreloader,
    AppAskSubject,
    AppAskTopic,
    AppAskQuestions,
  },
  methods: {
    ...mapActions({
      loadQuestions: 'questions/getByIDs',
      setAlert: 'alert/set',
    }),
    cancelQuestionAdding() {
      this.addQuestionSubject = {}
      this.addQuestionTopic = {}
      this.showAddQuestion = false
    },
  },
  data() {
    return {
      editingLevel: {},
      showAddQuestion: false,
      showPreloader: false,
      addQuestionSubject: {},
      addQuestionTopic: {},
      questions: [],
      taskTypes: {
        single_choice: 'Один варіант',
        multy_choice: 'Декілька варіантів',
        text_input: 'Ввести значення',
        numbering: 'Визначити послідовність',
      },
    }
  },
  async created() {
    // const { $route: { params: { testID } } } = this
    // this.questions = await this.loadQuestions()
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

  .questions {
    margin-top: 20px;

    background: var(--color-bg-dark);
    box-shadow: 0px 0px 20px rgba(0, 0, 0, .3);
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

        display: grid;
        grid-template-columns: 1fr 150px;
        margin-bottom: 20px;
      }
    }
  }
}
</style>
