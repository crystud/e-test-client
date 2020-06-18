<template>
  <div class="app-test-develop">
    <app-preloader :show="showPreloader"></app-preloader>

    <app-ask-topic
      :show="Boolean(
        (showAddQuestion || showCreateQuestion || showImportEntireSubject)
        && test.subject
        && !addQuestionTopic.id)
      "
      @selected="topic => addQuestionTopic = topic"
      :subjectID="test.subject ? test.subject.id : 0"
      @cancel="
        showAddQuestion = false
        showCreateQuestion = false
        showImportEntireSubject = false
      "
    ></app-ask-topic>

    <app-ask-import-subject
      :show="Boolean(showImportEntireSubject && addQuestionTopic.id)"
      :subject="addQuestionTopic"
      :test="test"
      @created="
        showImportEntireSubject = false
        addQuestionTopic = {}
        loadTest()
      "
      @cancel="
        showImportEntireSubject = false
        addQuestionTopic = {}
      "
    ></app-ask-import-subject>

    <app-ask-questions
      :show="Boolean(showAddQuestion && test.subject && addQuestionTopic.id)"
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

      <div
        class="actions-list"
        :class="{
          active: showQuestionsActionList,
        }"
      >
        <div
          class="header-item"
          @click="showQuestionsActionList = !showQuestionsActionList"
        >
          <span class="text">Добавити запитання</span>

          <span class="icon">
            <font-awesome-icon icon="chevron-down"></font-awesome-icon>
          </span>
        </div>

        <SlideDown
          :active="showQuestionsActionList"
          :duration="300"
        >
          <div
            class="list-item"
            @click="
              showCreateQuestion = true
              showQuestionsActionList = false
              showImportEntireSubject = false
              addQuestionTopic = {}
              questionShowInfoID = 0
            "
          >
            <div class="text">Створити запитання</div>
          </div>

          <div
            class="list-item"
            @click="
              showAddQuestion = true
              showQuestionsActionList = false
              showImportEntireSubject = false
              addQuestionTopic = {}
              questionShowInfoID = 0
            "
          >
            <div class="text">Імпортувати запитання</div>
          </div>

          <div
            class="list-item"
            @click="
              showImportEntireSubject = true
              showAddQuestion = false
              showQuestionsActionList = false
              addQuestionTopic = {}
              questionShowInfoID = 0
            "
          >
            <div class="text">Імпортувати цілу тему</div>
          </div>
        </SlideDown>
      </div>
    </div>

    <app-question-detailed-info
      :questionID="questionShowInfoID"
      class="question-full-info"
      @close="questionShowInfoID = 0"
    ></app-question-detailed-info>

    <div
      v-if="test.id"
      class="inserted-topics"
    >
      <div class="block-title">Імпортовані теми</div>

      <div class="list">
        <div
          v-for="topic in test.topics"
          :key="topic.id"
          class="item"
        >{{topic.name}}</div>
      </div>
    </div>

    <div class="questions">
      <SlideDown :active="Boolean(showCreateQuestion && addQuestionTopic.id)">
        <div class="create-question">
          <div class="section-title">Створення запитання</div>
          <div class="subject-info">Тема: {{addQuestionTopic.name}}</div>
        </div>

        <app-create-question
          :show="Boolean(showCreateQuestion && addQuestionTopic.id)"
          :topic="addQuestionTopic"
          :test="test"
          @close="
            showCreateQuestion = false
            addQuestionTopic = {}
          "
          @created="
            loadTest()
            showCreateQuestion = false
            addQuestionTopic = {}
          "
        ></app-create-question>
      </SlideDown>

      <SlideDown :active="!Boolean(showCreateQuestion && addQuestionTopic.id)">
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
      </SlideDown>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex'

import AppAskTopic from '@/components/templates/teacher/AppAskTopic.vue'
import AppAskQuestions from '@/components/templates/teacher/AppAskQuestions.vue'
import AppQuestionDetailedInfo from '@/components/templates/teacher/AppQuestionDetailedInfo.vue'
import AppCreateQuestion from '@/components/templates/teacher/AppCreateQuestion.vue'
import AppAskImportSubject from '@/components/templates/teacher/AppAskImportSubject.vue'

import AppPreloader from '@/components/ui/AppPreloader.vue'

import SlideDown from 'vue-slide-up-down'

export default {
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
        const text = e?.response.data.message || 'Не вдалось отримати дані про тест...'

        this.setAlert({
          title: 'Помилка',
          text,
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
      showImportEntireSubject: false,
      showPreloader: false,
      addQuestionTopic: {},
      test: {},
      questionShowInfoID: 0,
      showCreateQuestion: false,
      showQuestionsActionList: false,
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
  components: {
    AppAskTopic,
    AppPreloader,
    AppAskQuestions,
    AppCreateQuestion,
    AppAskImportSubject,
    AppQuestionDetailedInfo,
    SlideDown,
  },
}
</script>

<style lang="less" scoped>
.app-test-develop {
  .create-question {
    padding-left: 20px;
    margin-bottom: 20px;

    .section-title {
      font-size: 1.3em;
      font-weight: bold;
    }

    .subject-info {
      color: var(--color-accent-orange);
      margin-top: 5px;
    }
  }

  .inserted-topics {
    background: var(--color-bg-dark);
    border-radius: 10px;
    padding: 20px;

    .block-title {
      font-size: 1.3em;
      color: var(--color-font-dark);
      margin-bottom: 20px;
    }

    .list {
      .item {
        display: inline-block;
        margin: 0 15px 15px 0;

        background: var(--color-bg-main);
        color: var(--color-font-main);
        border-radius: 5px;
        padding: 10px 15px;
      }
    }
  }

  .header {
    display: grid;
    grid-template-columns: 1fr auto;
    grid-gap: 20px;

    align-items: flex-start;


    .actions-list {
      background: var(--color-bg-dark);
      border-radius: 10px;

      user-select: none;
      position: relative;

      transition: all .3s;

      &.active {
        .header-item {
          border-color: var(--color-bg-main);

          .icon {
            transform: rotate(180deg);
          }
        }
      }

      .header-item {
        display: grid;
        grid-template-columns: 1fr auto;
        grid-gap: 20px;

        color: var(--color-font-dark);

        border-bottom: 1px solid transparent;

        transition: all .3s;

        .icon {
          transform: rotate(0deg);
          transition: all .3s;
        }
      }

      .header-item, .list-item {
        padding: 20px;

        cursor: pointer;
      }

      .list-item {
        color: var(--color-font-dark);
        position: relative;

        &:hover {
          color: var(--color-accent-green);

          &::before {
            height: 40%;
          }
        }

        .text {
          position: relative;
          z-index: 105;
        }

        &::before {
          content: "";

          position: absolute;
          top: 0;
          bottom: 0;
          left: 0;
          z-index: 100;
          margin: auto;

          width: 3px;
          height: 0%;
          border-radius: 10px;
          background: var(--color-accent-green);

          transition: all .3s;
        }

        transition: all .3s;
      }
    }

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
