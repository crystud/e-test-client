<template>
  <div class="app-create-permission">
    <app-preloader :show="showPreloader"></app-preloader>

    <app-modal-window
      :show="show && !alert.show"
      :noPaddings="true"
    >
      <div class="title">Створення дозволу</div>

      <div class="content">
        <div class="tip">Оберіть тест, до якого потрібно надати доступ</div>

        <select
          class="test-select"
          placeholder="12"
          v-model="testID"
        >
          <optgroup
            v-for="(subject, index) in subjectsList"
            v-bind:key="index"
            :label="subject.subject.name"
          >
            <option
              v-if="!subject.tests.length"
              disabled
            >Тестів у предметі немає...</option>

            <option
              v-for="(test, testIndex) in subject.tests"
              v-bind:key="testIndex"
              :value="test.id"
            >{{test.name}}</option>
          </optgroup>
        </select>

        <app-permission-create-test-info
          :testID="testID || 0"
          @filledStateUpdate="value => testFilled = value"
        ></app-permission-create-test-info>

        <div class="count-of-attempts">
          <div class="tip">Максимальна к-сть спроб (0 для безмежної кількості)</div>

          <app-input
            appearance="secondary"
            placeholder="Макс. к-сть спроб"
            type="number"
            @change="value => maxAttempts = value"
            :value="maxAttempts"
            class="app-input"
          ></app-input>
        </div>

        <div class="time start">
          <div class="label">Початок часу доступу</div>

          <div class="form">
            <input
              type="date"
              v-model="start.date"
            >

            <input
              type="time"
              v-model="start.time"
            >
          </div>
        </div>

        <div class="time start">
          <div class="label">Кінець часу доступу</div>

          <div class="form">
            <input
              type="date"
              v-model="end.date"
            >

            <input
              type="time"
              v-model="end.time"
            >
          </div>
        </div>
      </div>

      <div class="btns">
        <button
          class="leave"
          @click="$emit('cancel')"
        >Скасувати</button>

        <button
          class="grant-permission"
          @click="grantAccess"
        >Надати доступ</button>
      </div>
    </app-modal-window>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

import AppModalWindow from '@/components/ui/AppModalWindow.vue'
import AppInput from '@/components/ui/AppInput.vue'
import AppPreloader from '@/components/ui/AppPreloader.vue'
import AppPermissionCreateTestInfo from '@/components/templates/teacher/AppPermissionCreateTestInfo.vue'

export default {
  data() {
    return {
      showPreloader: false,
      subjectsList: [],
      testID: null,
      testFilled: 0,
      maxAttempts: 1,
      start: {
        time: '',
        date: '',
      },
      end: {
        time: '',
        date: '',
      },
    }
  },
  methods: {
    ...mapActions({
      getSubjects: 'teacher/getSubjects',
      setAlert: 'alert/set',
      createPermission: 'permissions/create',
    }),
    toISOString(date, time) {
      const [hours, minutes] = time.split(':')
      const [year, month, day] = date.split('-')

      const dateObject = new Date(Date.UTC(year, month - 1, day, hours, minutes))

      return dateObject.toISOString()
    },
    async grantAccess() {
      const {
        start: {
          time: startTime,
          date: startDate,
        },
        end: {
          time: endTime,
          date: endDate,
        },
        testID,
        maxAttempts,
        testFilled,
        group: { id: group },
      } = this

      const end = this.toISOString(endDate, endTime)
      const start = this.toISOString(startDate, startTime)

      if (testFilled < 100) {
        this.setAlert({
          title: 'Створення неможливе',
          text: 'В тесті недостатньо запитань',
          show: true,
          isSuccess: false,
        })

        return
      }

      if (!testID) {
        this.setAlert({
          title: 'Вкажіть тест',
          isSuccess: false,
          show: true,
        })

        return
      }

      if (!start || !end) {
        this.setAlert({
          title: 'Вкажіть дати',
          isSuccess: false,
          show: true,
        })

        return
      }

      if (!group) {
        this.setAlert({
          title: 'Помилка',
          text: 'Не вдалось оприділити групу...',
          isSuccess: false,
          show: true,
        })

        return
      }

      try {
        this.showPreloader = true

        await this.createPermission({
          startTime: start,
          endTime: end,
          maxCountOfUse: parseInt(maxAttempts, 10),
          test: testID,
          group,
        })

        this.showPreloader = false

        this.setAlert({
          title: 'Дозвіл створено',
          isSuccess: true,
          show: true,
        })

        setTimeout(() => this.$emit('done'), 1500)
      } catch (e) {
        const text = e?.response.data.message || 'Не вдалось створити дозвіл...'

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
  components: {
    AppModalWindow,
    AppInput,
    AppPreloader,
    AppPermissionCreateTestInfo,
  },
  computed: {
    ...mapGetters({
      alert: 'alert/alert',
    }),
  },
  watch: {
    async show() {
      const { show } = this

      if (show) {
        this.showPreloader = true

        this.subjectsList = await this.getSubjects()

        this.showPreloader = false
      }
    },
  },
  props: {
    show: {
      type: Boolean,
      required: true,
    },
    group: {
      type: Object,
      required: true,
    },
  },
}
</script>

<style lang="less" scoped>
.app-create-permission {
  .title,
  .content,
  .btns {
    width: 100vw;
    max-width: 500px;
  }

  .title,
  .content {
    padding: 20px;
  }

  .title {
    border-bottom: 1px solid var(--color-bg-main);
    box-shadow: 0px 5px 15px rgba(0, 0, 0, 0.3);

    text-align: center;
    font-size: 1.2em;
  }

  .content {
    .tip {
      color: var(--color-font-dark);
      margin-bottom: 10px;
    }

    .test-select {
      width: 100%;
      background: var(--color-bg-main);
      border: 1px solid var(--color-bg-main);
      border-radius: 0;
      color: var(--color-font-main);
      padding: 10px;
      font-size: 1em;
      margin-bottom: 20px;
    }

    .count-of-attempts {
      margin-bottom: 20px;

      .app-input {
        background: var(--color-bg-main);
      }
    }

    .time {
      margin-bottom: 20px;

      .label {
        color: var(--color-font-dark);
        margin-bottom: 10px;
      }

      .form {
        display: grid;
        grid-template-columns: 2fr 1fr;
        grid-gap: 10px;

        input {
          background: var(--color-bg-main);
          color: var(--color-font-main);
          border-radius: 10px;
          font-size: 1em;
          border: 0;
          padding: 10px;
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
      padding: 15px 20px;
      font-size: 1em;
      cursor: pointer;
      transition: none;

      &:hover {
        background: var(--color-bg-main);
      }

      &.leave {
        color: var(--color-accent-red);
      }

      &.grant-permission {
        color: var(--color-accent-green);
      }
    }
  }
}
</style>
