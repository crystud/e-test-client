<template>
  <div class="app-importing-test">
    <div class="markup">
      <div class="leftbar">
        <div
          class="test-info"
          :class="{
            active: currentQuestion === null,
          }"
          @click="currentQuestion = null"
        >
          Інформація про тест
        </div>

        <div class="subtitle questions-subtitle">Список запитань</div>

        <div class="questions">
          <div
            class="question"
            v-for="({ question }, index) in questions"
            :key="index"
            :class="{
              active: currentQuestion === index,
            }"
            @click="currentQuestion = index"
            :title="question"
          >
            {{index+1}}. {{question.substring(0, 25)}}{{question.length > 30 ? '...' : ''}}
          </div>
        </div>

        <button class="publish-test">
          Імпортувати тест...
        </button>
      </div>

      <div class="right-side">
        <app-question-info-edit
          v-if="currentQuestion !== null"
          :index="currentQuestion || 0"
          :questions="questions"
        ></app-question-info-edit>

        <app-test-info-edit
          :test="test"
          v-if="currentQuestion === null"
        ></app-test-info-edit>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex'

import AppTestInfoEdit from '@/components/templates/teacher/AppTestInfoEdit.vue'
import AppQuestionInfoEdit from '@/components/templates/teacher/AppQuestionInfoEdit.vue'

export default {
  data() {
    return {
      test: {},
      questions: [],
      currentQuestion: null,
    }
  },
  methods: {
    ...mapActions({
      setAlert: 'alert/set',
    }),
  },
  created() {
    const {
      $route: {
        params: { file },
      },
    } = this

    if (!file) {
      return this.setAlert({
        title: 'Помилка',
        text: 'Файл не вказано...',
        show: true,
        isSuccess: false,
      })
    }

    try {
      const parsedFile = JSON.parse(file)

      this.test = parsedFile
      this.questions = parsedFile.questions
    } catch (e) {
      this.setAlert({
        title: 'Помилка',
        text: 'Не вдалось отримати інформацію з файлу...',
        isSuccess: false,
        show: true,
      })
    }

    return false
  },
  components: {
    AppTestInfoEdit,
    AppQuestionInfoEdit,
  },
}
</script>

<style lang="less" scoped>
.app-importing-test {
  .markup {
    display: grid;
    grid-template-columns: 300px 1fr;
    grid-gap: 20px;
    align-items: flex-start;

    .app-card {
      padding: 15px;
    }

    .leftbar {
      background: var(--color-bg-dark);
      border-radius: 7px;
      color: var(--color-font-main);
      user-select: none;

      .subtitle {
        color: var(--color-font-main);
        padding: 5px 15px 10px;
        font-size: .95em;
      }

      .questions-subtitle {
        margin-top: 30px;
        border-bottom: 2px solid var(--color-bg-main);
        padding: 0 15px 15px;
      }

      .questions {
        max-height: 63vh;
        overflow: auto;
      }

      .test-info,
      .question {
        padding: 15px;
        color: var(--color-font-dark);
        border-bottom: 1px solid var(--color-bg-main);
        cursor: pointer;
        position: relative;

        transition: all .3s;

        &.active,
        &:hover {
          color: var(--color-accent-green);
        }

        &::before {
          content: "";
          display: block;

          width: 3px;
          height: 0px;

          background: var(--color-accent-green);
          border-radius: 10px;

          position: absolute;
          top: 0;
          left: 0;
          bottom: 0;
          margin: auto;

          transition: all .3s;
        }

        &.active::before {
          height: 20px;
          max-height: 70%;
        }
      }

      .publish-test {
        width: 100%;
        padding: 15px;
        color: var(--color-accent-green);
        cursor: pointer;
        background: var(--color-bg-dark);
        border: 0;
        font-size: 1em;
        border-radius: 5px;
      }
    }
  }
}
</style>
