<template>
  <div class="app-ticket-detail-info">
    <app-preloader :show="showPreloader"></app-preloader>

    <app-fade-card :show="Boolean(ticketID && ticket.id)">
      <div class="header">
        <div>
          <div class="student">
            {{student.lastName}} {{student.firstName}} {{student.patronymic}}
          </div>

          <div
            class="is-used"
            :class="{
              used: ticket.used,
            }"
          >
            <span v-if="ticket.used">Використаний</span>
            <span v-else>Невикористаний</span>
          </div>
        </div>

        <div
          class="close"
          @click="$emit('close')"
        >
          <font-awesome-icon icon="times"></font-awesome-icon>
        </div>
      </div>

      <div class="attempts">
        <div class="title">Спроби</div>

        <div class="list">
          <div class="no-attempts">Спроб немає</div>

          {{ticket.attempts}}
        </div>
      </div>
    </app-fade-card>
  </div>
</template>

<script>
import { mapActions } from 'vuex'

import AppPreloader from '@/components/ui/AppPreloader.vue'
import AppFadeCard from '@/components/ui/AppFadeCard.vue'

export default {
  data() {
    return {
      showPreloader: false,
      ticket: {},
    }
  },
  computed: {
    student() {
      const { ticket: { student } } = this

      return student ? student.user : {}
    },
  },
  methods: {
    ...mapActions({
      loadTicket: 'tickets/getByID',
      setAlert: 'alert/set',
    }),
    async checkState() {
      const { ticketID } = this

      if (ticketID) {
        try {
          this.showPreloader = true

          this.ticket = await this.loadTicket(ticketID)
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
  },
  watch: {
    ticketID() {
      this.checkState()
    },
  },
  props: {
    ticketID: {
      type: Number,
      required: true,
    },
  },
  components: {
    AppPreloader,
    AppFadeCard,
  },
}
</script>

<style lang="less" scoped>
.app-ticket-detail-info {
  .header {
    display: grid;
    grid-template-columns: 1fr auto;
    grid-gap: 20px;

    align-items: center;

    margin-bottom: 20px;

    .student {
      font-size: 1.3em;
      font-weight: bold;
    }

    .is-used {
      margin-top: 5px;
      color: var(--color-accent-red);

      &.used {
        color: var(--color-accent-green);
      }
    }

    .close {
      font-size: 1.5em;
      color: var(--color-accent-red);
      cursor: pointer;
    }
  }

  .attempts {
    margin-top: 20px;

    .title {
      font-size: 1.5em;
      font-weight: 100;
    }

    .list {
      margin-top: 10px;

      .no-attempts {
        color: var(--color-font-dark);
        margin: 30px 0;
        font-size: 1.2em;
      }
    }
  }
}
</style>
