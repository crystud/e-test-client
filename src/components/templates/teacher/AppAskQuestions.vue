<template>
  <div class="app-ask-questions">
    <app-preloader :show="showPreloader"></app-preloader>

    <app-modal-window
      :show="Boolean(show && !alert.show)"
      :noPaddings="true"
    >
      <div class="title">Виберіть питання до тесту</div>

      <div class="content">
        <div class="list">
          <div
            v-for="({ question, type, id }, index) in questions"
            :key="index"
            class="question"
            :class="{
              selected: selected.includes(id) || alreadyAdded.includes(id),
            }"
            @click="toggleSelected(id)"
          >
            <div class="is-selected">
              <font-awesome-icon icon="check"></font-awesome-icon>
            </div>

            <div>
              <div class="ask">{{question}}</div>
              <div class="type">{{taskTypes[type]}}</div>
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
import { mapActions, mapGetters } from 'vuex'

import AppPreloader from '@/components/ui/AppPreloader.vue'
import AppModalWindow from '@/components/ui/AppModalWindow.vue'

export default {
  components: {
    AppPreloader,
    AppModalWindow,
  },
  computed: {
    ...mapGetters({
      alert: 'alert/alert',
    }),
    questions() {
      return this.topicInfo.tasks || []
    },
  },
  methods: {
    ...mapActions({
      loadTopic: 'topics/getByID',
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
      const { selected, testID } = this

      if (!selected.length) {
        return
      }

      try {
        this.showPreloader = true

        await this.addQuestionsToTest({
          questionsIDs: selected,
          testID,
        })

        this.setAlert({
          title: 'Питання занесено',
          isSuccess: true,
          delay: 1500,
          show: true,
        })

        setTimeout(() => this.$emit('added'))
      } catch (e) {
        const text = e?.response.data.message || 'Не вдалось занести питання в тест...'

        this.setAlert({
          title: 'Помилка',
          text,
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
      selected: [],
      taskTypes: {
        1: 'Простий вибір',
        2: 'Множинний вибір',
        3: 'Коротка відповідь',
        4: 'Послідовність',
      },
    }
  },
  props: {
    show: {
      type: Boolean,
      required: true,
    },
    testID: {
      type: Number,
      required: true,
    },
    topic: {
      type: Object,
      required: true,
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
        this.selected = []

        this.topicInfo = await this.loadTopic(id)

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
        color: var(--color-font-dark);
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
