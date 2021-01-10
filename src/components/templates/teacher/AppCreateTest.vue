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
            @change="newVal => test.name = newVal"
          ></app-input>

          <app-input
            appearance="secondary"
            placeholder="К-сть запитань"
            class="app-input"
            @change="newVal => test.countOfTasks = newVal"
          ></app-input>

          <app-select
            v-if="!subject"
            :values="subjects.map(({ subject: { name }, id }) => ({ label: name, value: id }))"
            class="app-select"
            :sideBorder="true"
            @change="({ value }) => test.subject = value"
            label="Предмет..."
          ></app-select>

          <div
            v-if="subject && subject.subject"
            class="selected-subject"
          >
            <div class="label">Предмет</div>
            <div class="name">{{subject.subject.name}}</div>
          </div>

          <div class="duration">
            <div class="label">Час на проходження</div>

            <div class="inputs">
              <app-input
                placeholder="Годин"
                type="number"
                appearance="secondary"
                class="field"
                @change="val => duration.hours = val"
                :value="duration.hours"
              ></app-input>

              <app-input
                placeholder="Хвилин"
                type="number"
                appearance="secondary"
                class="field"
                @change="val => duration.minutes = val"
                :value="duration.minutes"
              ></app-input>
            </div>
          </div>

          <div class="import-test">
            <div class="or">або</div>

            <label
              for="importFile"
              class="btn"
            >
              <font-awesome-icon
                icon="file"
                class="icon"
              ></font-awesome-icon>

              Імпортувати з файлу...
            </label>

            <input
              type="file"
              id="importFile"
              accept=".json"
              @change="importTestChanged"
            />
          </div>

          <div class="btns">
            <app-button
              appearance="neutral"
              class="cancel"
              @click="$emit('close')"
            >Закрити</app-button>

            <app-button
              appearance="neutral"
              class="create"
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
import AppButton from '@/components/ui/AppButton.vue'
import AppSelect from '@/components/ui/AppSelect.vue'

export default {
  components: {
    AppPreloader,
    AppModalWindow,
    AppInput,
    AppButton,
    AppSelect,
  },
  computed: {
    ...mapGetters({
      alert: 'alert/alert',
    }),
  },
  methods: {
    ...mapActions({
      getSubjects: 'teacher/getSubjects',
      setAlert: 'alert/set',
      createTest: 'tests/create',
    }),
    async importTestChanged({ target = {} }) {
      const { files: [file] = [] } = target

      if (!file) {
        this.setAlert({
          title: 'Помилка',
          text: 'Файл не оприділено',
          show: true,
          isSuccess: false,
        })

        return
      }

      const fileReader = new FileReader()

      fileReader.onload = () => {
        const { result } = fileReader

        this.$router.push({
          name: 'importing-test',
          params: { file: result },
        })

        this.$emit('close')
      }

      fileReader.onerror = () => {
        this.setAlert({
          title: 'Не вдалось обробити файл...',
          show: true,
          isSuccess: false,
        })

        this.$emit('close')
      }

      fileReader.readAsText(file)
    },
    async create() {
      try {
        this.showPreloader = true

        const {
          test: {
            name,
            subject,
            countOfTasks,
          },
          duration: {
            minutes = 0,
            hours = 0,
          },
          subject: { id: preSelectedTeacher = null } = {},
        } = this

        if (!name || (!subject && !preSelectedTeacher) || !countOfTasks) {
          this.setAlert({
            title: 'Помилка',
            text: 'Усі поля повинні бути заповнені',
            isSuccess: false,
            delay: 2000,
            show: true,
          })

          return
        }

        if (!minutes && !hours) {
          this.setAlert({
            title: 'Заповніть час проходження',
            isSuccess: false,
            delay: 1500,
            show: true,
          })

          return
        }

        const duration = parseInt((hours * 60) + minutes, 10)

        const create = await this.createTest({
          name,
          countOfTasks,
          duration,
          teacher: preSelectedTeacher || Number(subject),
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

          this.$emit('created', create)
        }
      } catch (e) {
        const text = e?.response.data.message || 'Перевірте, чи усі поля було заповнено або спробуйте пізніше'

        this.setAlert({
          title: 'Помилка',
          text,
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
      subjects: [],
      test: {
        name: '',
        subject: null,
        countOfTasks: 0,
      },
      duration: {
        hours: '',
        minutes: '',
      },
    }
  },
  props: {
    show: {
      type: Boolean,
      required: true,
      default: () => false,
    },
    subject: {
      type: Object,
      default: () => {},
      required: false,
    },
  },
  async created() {
    try {
      this.showPreloader = true

      const subjects = await this.getSubjects()

      this.subjects = subjects
    } catch (e) {
      const text = e?.response.data.message || 'Не вдалось прогрузити предмети... Спробуйте пізніше'

      this.setAlert({
        title: 'Помилка',
        text,
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

    .import-test {
      margin-bottom: 40px;

      .or {
        width: 100%;

        display: grid;
        grid-template-columns: 1fr auto 1fr;
        align-items: center;
        grid-gap: 10px;

        color: var(--color-font-dark);

        &::before,
        &::after {
          content: "";

          width: 100%;
          height: 2px;
          background: var(--color-bg-main);
        }
      }

      label {
        display: block;

        width: 100%;
        padding: 15px;
        margin: 20px 0;
        border-radius: 10px;
        text-align: center;
        cursor: pointer;

        background: var(--color-bg-main);

        &, .icon {
          color: var(--color-font-dark);
          transition: all .3s ease-in-out;
        }

        .icon {
          margin-right: -20px;

          visibility: hidden;
          opacity: 0;
        }

        &:hover {
          &, .icon {
            color: var(--color-accent-green);
          }

          .icon {
            margin-right: 5px;
            opacity: 1;
            visibility: visible;
          }
        }
      }

      input {
        display: none;
      }
    }

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

    .label {
      color: var(--color-font-dark);
    }

    .duration {
      margin: 10px 0;

      .inputs {
        margin-top: 10px;
        display: grid;
        grid-template-columns: repeat(2, 1fr);
        grid-gap: 10px;
      }
    }

    .selected-subject {
      margin: 20px 0;

      .name {
        margin-top: 5px;
        font-size: 1.1em;
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

        .cancel, .create {
          background: var(--color-bg-main);
        }

        .cancel {
          color: var(--color-font-dark);
        }

        .create {
          color: var(--color-accent-green);
        }
      }
    }
  }
}
</style>
