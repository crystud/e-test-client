<template>
  <div>
    <app-preloader :show="showPreloader"></app-preloader>

    <app-modal-window
      class="app-test-create-level"
      :show="show && !alert.show && !showPreloader"
      :noPaddings="true"
    >
      <div class="title">
        <span>Створення рівня до тесту</span>
      </div>

      <div class="content">
        <app-input
          placeholder="Назва рівня"
          appearance="secondary"
          class="app-input"
          @change="newVal => level.title = newVal"
        ></app-input>

        <app-input
          placeholder="Складність (від 1 до +∞)"
          appearance="secondary"
          class="app-input"
          @change="newVal => level.difficulty = newVal"
        ></app-input>

        <app-input
          placeholder="К-сть питань (від 0 до +∞)"
          appearance="secondary"
          class="app-input"
          @change="newVal => level.questionsCount = newVal"
        ></app-input>
      </div>

      <div class="btns">
        <button
          class="close"
          @click="$emit('close')"
        >Скасувати</button>

        <button
          class="create"
          @click="create"
        >Створити</button>
      </div>
    </app-modal-window>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'

import AppModalWindow from '@/components/ui/AppModalWindow.vue'
import AppInput from '@/components/ui/AppInput.vue'
import AppPreloader from '@/components/ui/AppPreloader.vue'

export default {
  components: {
    AppModalWindow,
    AppInput,
    AppPreloader,
  },
  data() {
    return {
      showPreloader: false,
      level: {
        title: '',
        difficulty: 0,
        questionsCount: 0,
      },
    }
  },
  computed: {
    ...mapGetters({
      alert: 'alert/alert',
    }),
  },
  methods: {
    ...mapActions({
      createLevel: 'levels/create',
      setAlert: 'alert/set',
    }),
    async create() {
      try {
        const {
          level: {
            title,
            questionsCount,
            difficulty,
          },
          testID,
        } = this

        const countOfTask = parseInt(questionsCount, 10)
        const difficult = parseInt(difficulty, 10)

        if (!title) {
          return this.setAlert({
            title: 'Назва повинна бути вказана',
            delay: 2500,
            isSuccess: false,
            show: true,
          })
        }

        if (difficult < 1) {
          return this.setAlert({
            title: 'Складніть повинна бути від 0 до +∞',
            delay: 2500,
            isSuccess: false,
            show: true,
          })
        }

        if (countOfTask < 0) {
          return this.setAlert({
            title: 'К-сть питань повинна бути від 0 до +∞',
            delay: 2500,
            isSuccess: false,
            show: true,
          })
        }

        this.showPreloader = true

        await this.createLevel({
          title,
          difficult,
          countOfTask,
          test: testID,
        })

        this.setAlert({
          title: 'Рівень створено',
          delay: 1500,
          isSuccess: true,
          show: true,
        })

        setTimeout(() => {
          this.$emit('created')
          this.$emit('close')
        }, 1500)
      } catch (e) {
        this.setAlert({
          title: 'Помилка',
          text: 'Нам не вдалось створити рівень... Спробуйте пізніше',
          delay: 2000,
          show: true,
          isSuccess: false,
        })
      } finally {
        this.showPreloader = false
      }

      return false
    },
  },
  props: {
    show: {
      type: Boolean,
      required: true,
      default: () => false,
    },
    testID: {
      type: Number,
      required: true,
      default: () => 0,
    },
  },
}
</script>

<style lang="less" scoped>
.app-test-create-level {
  .content {
    width: 100vw;
    max-width: 400px;
  }

  .title {
    padding: 20px 20px 20px 0;

    span {
      display: inline-block;
      background: var(--color-accent-green);
      border-radius: 0 10px 10px 0;
      padding: 20px;

      font-size: 1.3em;
    }
  }

  .content {
    padding: 20px;

    .app-input {
      margin-bottom: 20px;
      background: var(--color-bg-main);
    }
  }

  .btns {
    display: grid;
    grid-template-columns: 1fr 1fr;

    border-top: 1px solid var(--color-bg-main);

    button {
      padding: 20px;
      font-size: 1em;
      border: 0;
      background: transparent;
      cursor: pointer;

      &:hover {
        background: var(--color-bg-main);
      }

      &.close {
        color: var(--color-accent-red);
      }

      &.create {
        color: var(--color-accent-green);
      }
    }
  }
}
</style>
