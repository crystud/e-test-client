<template>
  <div class="app-ask-questions">
    <app-preloader :show="showPreloader"></app-preloader>

    <app-modal-window
      :show="show"
      :noPaddings="true"
    >
      <div class="title">Виберіть питання до тесту</div>

      <div class="content">
        <div class="list">
          <div
            v-for="(question, index) in questions"
            :key="index"
            class="question"
            :class="{
              selected: selected.includes(question.id) || alreadyAdded.includes(question.id),
            }"
            @click="toggleSelected(question.id)"
          >
            <div class="is-selected">
              <font-awesome-icon icon="check"></font-awesome-icon>
            </div>

            <div>
              <div class="ask">{{question.ask}}</div>
              <div class="type">{{taskTypes[question.type]}}</div>
            </div>
          </div>
        </div>
      </div>

      <div class="btns">
        <button
          class="leave"
          @click="$emit('cancel')"
        >Скасувати</button>

        <button
          class="add-questions"
          :class="{
            active: selected.length,
          }"
          @click="addQuestions"
        >{{selected.length ? `Додати ${selected.length} питань` : 'Додати питання'}}</button>
      </div>
    </app-modal-window>
  </div>
</template>

<script>
import { mapActions } from 'vuex'

import AppPreloader from '@/components/ui/AppPreloader.vue'
import AppModalWindow from '@/components/ui/AppModalWindow.vue'

export default {
  components: {
    AppPreloader,
    AppModalWindow,
  },
  methods: {
    ...mapActions({
      loadTopic: 'topics/getByID',
      loadQuestions: 'questions/getByIDs',
      addQuestionsToTest: 'questions/addToTest',
      setAlert: 'alert/set',
    }),
    toggleSelected(questionID) {
      const { selected, alreadyAdded } = this

      const location = selected.indexOf(questionID)

      if (location !== -1) {
        return this.selected.splice(location, 1)
      }

      if (alreadyAdded.includes(questionID)) {
        return false
      }

      return this.selected.push(questionID)
    },
    async addQuestions() {
      const { selected, levelID: level } = this

      if (!selected.length) {
        this.setAlert({
          title: 'Виберіть питання',
          isSuccess: false,
          delay: 1000,
          show: true,
        })

        return
      }

      try {
        this.showPreloader = true

        await this.addQuestionsToTest({
          questionsIDs: selected,
          level,
        })

        this.setAlert({
          title: 'Питання занесено',
          isSuccess: true,
          delay: 1500,
          show: true,
        })

        setTimeout(() => this.$emit('added'))
      } catch (e) {
        this.setAlert({
          title: 'Помилка',
          text: 'Не вдалось занести питання в тест...',
          delay: 1500,
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
      showPreloader: false,
      topicInfo: {},
      questions: [],
      selected: [],
      taskTypes: {
        single_choice: 'Один варіант',
        multy_choice: 'Декілька варіантів',
        text_input: 'Ввести значення',
        numbering: 'Визначити послідовність',
      },
    }
  },
  props: {
    show: {
      type: Boolean,
      required: true,
      default: () => false,
    },
    topic: {
      type: Object,
      required: true,
      default: () => {},
    },
    levelID: {
      type: Number,
      required: true,
      default: () => 0,
    },
    alreadyAdded: {
      type: Array,
      required: false,
      default: () => [],
    },
  },
  watch: {
    async show() {
      const {
        show,
        topic: { id },
      } = this

      if (show && id) {
        this.showPreloader = true

        this.topicInfo = await this.loadTopic(id)
        this.questions = await this.loadQuestions(this.topicInfo.tasks)

        this.showPreloader = false
      }
    },
  },
}
</script>

<style lang="less" scoped>
.app-ask-questions {
  .title,
  .content {
    max-width: 500px;
    width: 100vw;
  }

  .title {
    padding: 20px;
    text-align: center;
    font-size: 1.2em;
    border-bottom: 1px solid var(--color-bg-main);
  }

  .content {
    .list {
      max-height: 60vh;
      overflow-y: auto;

      .question {
        display: grid;
        grid-template-columns: 30px 1fr;
        grid-gap: 20px;
        align-items: center;
        cursor: pointer;
        user-select: none;

        padding: 15px 20px;
        transition: none;

        &:hover {
          background: var(--color-bg-main);
        }

        .is-selected {
          color: var(--color-font-dark);
          font-size: 1.3em;
          text-align: center;
        }

        .ask {
          font-size: 1.2em;
          margin-bottom: 5px;
        }

        .type {
          color: var(--color-font-dark);
        }

        &.selected {
          background: var(--color-bg-main) !important;

          .is-selected {
            color: var(--color-accent-green) !important;
          }
        }
      }
    }
  }

  .btns {
    display: grid;
    grid-template-columns: 1fr 1fr;

    border-top: 1px solid var(--color-bg-main);

    button {
      background: transparent;
      border: 0;
      font-size: 1em;
      padding: 15px;
      cursor: pointer;
      transition: none;

      &:hover {
        background: var(--color-bg-main);
      }

      &.leave {
        color: var(--color-accent-red);
      }

      &.add-questions {
        color: var(--color-accent-dark);
        cursor: default;

        &.active {
          color: var(--color-accent-green);
          cursor: pointer;
        }
      }
    }
  }
}
</style>
