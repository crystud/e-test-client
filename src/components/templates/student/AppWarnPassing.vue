<template>
  <div class="app-warn-passing">
    <app-preloader :show="showPreloader"></app-preloader>

    <app-modal-window
      :show="Boolean(ticket && ticketInfo.id && !alert.show)"
      :noPaddings="true"
    >
      <div
        v-if="ticketInfo.id"
        class="content"
      >
        <div class="header">
          <div class="name">{{ticketInfo.createAt}}</div>
          <div class="created-at">Дозвіл створено {{getNormalDate(ticketInfo.createAt)}}</div>
        </div>

        <app-data-list
          class="app-data-list"
          :data="[
            ['Початок доступу', getNormalDate(ticketInfo.permission.startTime)],
            ['Кінець доступу', getNormalDate(ticketInfo.permission.endTime)],
            ['Макс. к-сть спроб', ticketInfo.permission.maxCountOfUse || 'Безмежна'],
          ]"
        ></app-data-list>

        <div class="access-status">
          <span>Статус: </span>

          <span
            v-if="ticketInfo.used"
            class="denied"
          >Використаний</span>

          <span
            v-if="!ticketInfo.used"
            class="granted"
          >Невикористаний</span>

          <span
            v-if="ticketInfo.outstanding"
            class="denined"
          >Прострочений</span>
        </div>
      </div>

      <div class="btns">
        <button
          class="leave"
          @click="$emit('cancel')"
        >Скасувати</button>

        <button
          class="pass"
          @click="pass"
        >Почати</button>
      </div>
    </app-modal-window>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'

import AppPreloader from '@/components/ui/AppPreloader.vue'
import AppModalWindow from '@/components/ui/AppModalWindow.vue'
import AppDataList from '@/components/ui/AppDataList.vue'

export default {
  computed: {
    ...mapGetters({
      alert: 'alert/alert',
    }),
  },
  methods: {
    ...mapActions({
      setAlert: 'alert/set',
      useTicket: 'tickets/use',
      loadTicket: 'tickets/getByID',
    }),
    getNormalDate(time) {
      if (!time) return ''

      const date = new Date(time)

      const datetime = `${date.getDate()}/${date.getMonth()}/${date.getFullYear()}`
      const daytime = `${date.getHours()}:${date.getMinutes()}`

      return `${datetime} ${daytime}`
    },
    async checkState() {
      const { ticket } = this

      if (ticket) {
        try {
          this.showPreloader = true

          this.ticketInfo = await this.loadTicket(ticket)
        } catch (e) {
          this.setAlert({
            title: 'Помилка',
            text: 'Не вдалось отримати інформацію про квиток',
            show: true,
            isSuccess: false,
          })
        } finally {
          this.showPreloader = false
        }
      }
    },
    async pass() {
      const { ticket } = this

      try {
        this.showPreloader = true

        const attemptData = await this.useTicket(ticket)

        localStorage.setItem('attempt', JSON.stringify(attemptData))

        this.$router.push({
          name: 'testPass',
          params: {
            attemptID: attemptData.id,
          },
        })
      } catch (e) {
        this.setAlert({
          title: 'Помилка',
          text: 'Не вдалось отримати дані про квиток',
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
      ticketInfo: {},
    }
  },
  watch: {
    ticket() {
      this.checkState()
    },
  },
  props: {
    ticket: {
      type: Number,
      required: true,
    },
  },
  components: {
    AppPreloader,
    AppDataList,
    AppModalWindow,
  },
}
</script>

<style lang="less" scoped>
.app-warn-passing {
  .content {
    width: 100vw;
    max-width: 500px;
    padding: 35px;
  }

  .content {
    .header {
      margin-bottom: 20px;

      .name {
        font-size: 1.3em;
        font-weight: bold;
      }

      .created-at {
        color: var(--color-font-dark);
        margin-top: 5px;
      }
    }

    .access-status {
      margin-top: 20px;
      color: var(--color-font-dark);

      .granted { color: var(--color-accent-green) }
      .denied { color: var(--color-accent-red) }
    }
  }

  .btns {
    display: grid;
    grid-template-columns: auto auto;
    grid-gap: 10px;
    justify-content: flex-end;

    border-top: 1px solid var(--color-bg-main);
    padding: 20px;

    button {
      border: 0;
      padding: 13px 30px;
      border-radius: 5px;
      font-size: 1em;
      cursor: pointer;

      &.leave {
        background: var(--color-bg-main);
        color: var(--color-accent-red);
      }

      &.pass {
        background: var(--color-accent-green);
        color: #fff;
      }
    }

    @media screen and (max-width: 400px) {
      grid-template-columns: 1fr;
      justify-content: center;
    }
  }
}
</style>
