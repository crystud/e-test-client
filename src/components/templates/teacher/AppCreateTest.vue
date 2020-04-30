<template>
  <div class="app-create-test">
    <app-preloader :show="showPreloader"></app-preloader>

    <app-modal-window
      :show="show && !alert.show"
      :noPaddings="true"
    >
      <div class="content">
        <div class="title">
          <span>Створення тесту</span>
        </div>

        <div class="form">
          <app-input
            appearance="secondary"
            placeholder="Назва тесту"
            class="app-input"
            @change="newVal => test.title = newVal"
          ></app-input>

          <app-text-area
            placeholder="Опис тесту"
            @change="newVal => test.description = newVal"
          ></app-text-area>

          <app-select
            :values="subjects.map(({ name, id }) => ({ label: name, value: id }))"
            class="app-select"
            :sideBorder="true"
            @change="({ value }) => test.subject = value"
          ></app-select>

          <div class="btns">
            <app-button
              appearance="neutral"
              @click="$emit('close')"
            >Закрити</app-button>

            <app-button
              appearance="primary"
              @click="create"
            >Створити тест</app-button>
          </div>
        </div>
      </div>
    </app-modal-window>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'

import AppModalWindow from '@/components/ui/AppModalWindow.vue'
import AppPreloader from '@/components/ui/AppPreloader.vue'
import AppInput from '@/components/ui/AppInput.vue'
import AppTextArea from '@/components/ui/AppTextArea.vue'
import AppButton from '@/components/ui/AppButton.vue'
import AppSelect from '@/components/ui/AppSelect.vue'

export default {
  components: {
    AppPreloader,
    AppModalWindow,
    AppInput,
    AppTextArea,
    AppButton,
    AppSelect,
  },
  computed: {
    ...mapGetters({
      subjects: 'subjects/subjects',
      alert: 'alert/alert',
    }),
  },
  methods: {
    ...mapActions({
      getSubjects: 'subjects/fetch',
      setAlert: 'alert/set',
      createTest: 'tests/create',
    }),
    async create() {
      try {
        this.showPreloader = true

        const {
          test,
          test: {
            title,
            description,
            subject,
          },
        } = this

        if (!title || !description || !subject) {
          this.setAlert({
            title: 'Помилка',
            text: 'Усі поля повинні бути заповнені',
            isSuccess: false,
            delay: 3000,
            show: true,
          })
        }

        const create = await this.createTest({
          ...test,
          isPublic: false,
        })

        if (create.id) {
          this.showPreloader = false

          this.setAlert({
            title: 'Тест створено',
            text: 'Тепер ви можете внести в нього інформацію!',
            isSuccess: true,
            delay: 1500,
            show: true,
          })

          setTimeout(() => {
            this.$emit('created')
          }, 1500)
        }
      } catch (e) {
        this.setAlert({
          title: 'Неочікувана помилка',
          text: 'Перевірте, чи усі поля було заповнено або спробуйте пізніше',
          isSuccess: false,
          show: true,
        })
      } finally {
        this.showPreloader = false
      }
    },
  },
  data() {
    return {
      showPreloader: false,
      test: {
        title: '',
        description: '',
        subject: null,
      },
    }
  },
  props: {
    show: {
      type: Boolean,
      required: true,
      default: () => false,
    },
  },
  async created() {
    try {
      this.showPreloader = true

      await this.getSubjects()
    } catch (e) {
      this.setAlert({
        title: 'Помилка',
        text: 'Не вдалось прогрузити предмети... Спробуйте пізніше',
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
.app-create-test {
  .content {
    max-width: 500px;
    width: 100vw;

    .title {
      padding: 30px 0;
      font-size: 1.4em;
      font-weight: 800;

      span {
        display: inline-block;
        background: var(--color-accent-green);
        border-radius: 0 15px 15px 0;
        color: #fff;

        padding: 10px 30px;
      }
    }

    .form {
      padding: 30px;
      padding-top: 0;

      .app-input {
        margin-bottom: 20px;
      }

      .app-select {
        margin: 20px 0;
        border-radius: 10px;
      }

      .app-select,
      .app-input {
        background: var(--color-bg-main);
      }

      .btns {
        margin-top: 20px;
        display: grid;
        grid-template-columns: 1fr 1fr;
        grid-gap: 20px;
      }
    }
  }
}
</style>
