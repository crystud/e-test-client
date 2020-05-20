<template>
  <div class="app-create-permission">
    <app-preloader :show="showPreloader"></app-preloader>

    <app-modal-window
      :show="show && !alert.show"
      :noPaddings="true"
    >
      <div class="title">Створення дозволу</div>

      <div class="content">
        <div class="tip">В списку тільки ваші публічні тести</div>

        <app-select
          :values="
            testsList
            .filter((test) => test.isPublic)
            .map((test) => ({ value: test.id, label: test.title }))"
          label="Оберіть тест"
          :sideBorder="true"
          @change="({ value }) => testID = value"
        ></app-select>

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
import AppPreloader from '@/components/ui/AppPreloader.vue'
import AppSelect from '@/components/ui/AppSelect.vue'

export default {
  data() {
    return {
      showPreloader: false,
      testsList: [],
      testID: null,
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
      getOwnTests: 'teacher/getOwnTests',
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
        studyID,
        group: { id },
      } = this

      const end = this.toISOString(endDate, endTime)
      const start = this.toISOString(startDate, startTime)

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

      try {
        this.showPreloader = true

        await this.createPermission({
          startTime: start,
          endTime: end,
          testId: testID,
          study: studyID,
          groups: [id],
        })

        this.showPreloader = false

        this.setAlert({
          title: 'Дозвіл створено',
          isSuccess: true,
          show: true,
        })

        setTimeout(() => this.$emit('done'), 1500)
      } catch (e) {
        this.setAlert({
          title: 'Помилка',
          text: 'Не вдалось створити дозвіл...',
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
    AppPreloader,
    AppSelect,
  },
  computed: {
    ...mapGetters({
      self: 'user/self',
      alert: 'alert/alert',
    }),
  },
  watch: {
    async show() {
      const { show } = this

      if (show) {
        this.showPreloader = true

        this.testsList = await this.getOwnTests()

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
    studyID: {
      type: Number,
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

    .app-select {
      background: var(--color-bg-main);
      border-radius: 10px;
      margin-bottom: 20px;
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
