<template>
  <div class="app-warn-passing">
    <app-preloader :show="showPreloader"></app-preloader>

    <app-modal-window
      :show="Boolean(ticket && ticketInfo.id && !alert.show)"
      :noPaddings="true"
    >
      <div
        v-if="ticketInfo.id"
        class="sections"
        :class="{
          'showing-attempts-list': attempts.length,
        }"
      >
        <div
          class="attempts-list"
          v-if="attempts.length"
        >
          <div class="title">Ваші спроби проходження</div>

          <div
            v-for="({
              active,
              startTime,
              endTime,
              maxEndTime,
              id: attemptID,
              result,
            }, index) in attempts"
            v-bind:key="index"
            class="attempt"
          >
            <div class="start-time">
              <div v-if="endTime">{{countPassingTime(startTime, endTime)}}</div>
            </div>

            <div
              v-if="result.id"
              class="see-result"
              @click="$router.push({
                name: 'testResults',
                params: {
                  resultID: result.id,
                },
              })"
            >Результат {{result.percent}}%</div>

            <div v-if="active">
              <div class="is-active active">Активна</div>

              <div
                class="time-until-closed"
                :class="{
                  'is-closed': countTimeUntilClosed(maxEndTime).isClosed,
                }"
              >
                {{countTimeUntilClosed(maxEndTime).text}}
              </div>

              <div
                v-if="!countTimeUntilClosed(maxEndTime).isClosed"
                @click="$router.push({
                  name: 'testPass',
                  params: {
                    attemptID,
                  },
                })"
                class="continue"
              >Продовжити проходження</div>
            </div>
          </div>
        </div>

        <div class="content">
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
              v-if="ticketInfo.outstanding && !ticketInfo.used"
              class="denied"
            >Прострочений</span>
          </div>
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
    attempts() {
      return this.ticketInfo.attempts || []
    },
  },
  methods: {
    ...mapActions({
      setAlert: 'alert/set',
      useTicket: 'tickets/use',
      loadTicket: 'tickets/getByID',
    }),
    countTimeUntilClosed(closeTime, current) {
      const currentTime = current || new Date()
      const difference = new Date(closeTime).getTime() - currentTime.getTime()

      const timeLeft = Math.round(difference / 1000)

      const days = Math.floor(timeLeft / 86400)
      const hours = Math.floor((timeLeft - (days * 86400)) / 3600)
      const minutes = Math.floor((timeLeft - (days * 86400) - (hours * 3600)) / 60)
      const seconds = timeLeft % 60

      return {
        time: {
          days,
          hours,
          minutes,
          seconds,
        },
        isClosed: timeLeft < 0,
        text:
          this.isClosed
            ? 'Доступ закрито'
            : `Доступ закриється через ${days} дн. ${hours} год. ${minutes} хв.`,
      }
    },
    countPassingTime(startTime, endTime) {
      const difference = new Date(endTime).getTime() - new Date(startTime).getTime()

      const timeLeft = Math.round(difference / 1000)

      const hours = Math.floor(timeLeft / 3600)
      const minutes = Math.floor((timeLeft - (hours * 3600)) / 60)
      const seconds = timeLeft % 60

      const hoursText = hours > 0 ? `${hours} год. ` : ''

      return `${hoursText}${minutes} хв. ${seconds} сек.`
    },
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
  .sections {
    max-width: 850px;

    display: grid;
    grid-gap: 10px;

    &.showing-attempts-list {
      grid-template-columns: 2fr 3fr;
    }

    .attempts-list {
      max-height: 70vh;
      overflow-y: auto;

      border-right: 1px solid var(--color-bg-main);

      .title {
        padding: 15px 10px;
        color: var(--color-font-dark);
      }

      .attempt {
        padding: 20px 30px;
        border-top: 1px solid var(--color-bg-main);

        .start-time {
          font-size: 1.1em;
          font-weight: bold;
          margin-bottom: 10px;
        }

        .see-result {
          color: var(--color-font-dark);
          cursor: pointer;
          user-select: none;

          &:hover {
            text-decoration: underline;
          }
        }

        .is-active {
          color: var(--color-accent-green);
        }

        .time-until-closed {
          margin-top: 10px;
          color: var(--color-font-dark);
        }

        .continue {
          display: inline-block;
          padding: 5px 10px;
          border-radius: 5px;
          cursor: pointer;
          user-select: none;
          margin-top: 15px;
          color: var(--color-accent-green);
          background: var(--color-bg-main);
        }
      }
    }
  }

  .content {
    padding: 35px;

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
