<template>
  <app-user-card class="subjects-info">
    <app-preloader :show="showPreloader"></app-preloader>

    <app-warn-passing
      :show="showWarnPassing"
      :ticket="passingTicket"
      @cancel="
        passingTicket = {}
        showWarnPassing = false
      "
    ></app-warn-passing>

    <div class="title">Дозволи на проходження</div>

    <div class="tests">
      <div class="row header-title">
        <div class="name">Назва</div>
        <div class="permission">Дозвіл</div>
      </div>

      <div
        class="row cursor-pointer"
        v-for="(ticket, index) in tickets"
        :key="index"
        @click="
          showWarnPassing = true
          passingTicket = ticket
        "
      >
        <div class="name">{{ticket.title}}</div>

        <div
          class="permission"
          :class="{
            'closed': ticket.used,
            'opened': !ticket.used,
          }"
        >{{ticket.used ? 'Використаний' : 'Невикористаний'}}</div>
      </div>
    </div>
  </app-user-card>
</template>

<script>
import { mapActions } from 'vuex'

import AppPreloader from '@/components/ui/AppPreloader.vue'

import AppWarnPassing from './AppWarnPassing.vue'
import AppUserCard from './AppUserCard.vue'

export default {
  name: 'AppStudentSubjects',
  components: {
    AppUserCard,
    AppPreloader,
    AppWarnPassing,
  },
  methods: {
    ...mapActions({
      setAlert: 'alert/set',
      getTickets: 'student/getTickets',
    }),
    async loadTickets() {
      try {
        this.showPreloader = true

        this.tickets = await this.getTickets()
      } catch (e) {
        this.setAlert({
          title: 'Помилка',
          text: 'Не вдалось завантажити дозволи...',
          delay: 2000,
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
      showWarnPassing: false,
      passingTicket: {},
      tickets: [],
    }
  },
  async created() {
    await this.loadTickets()

    this.showPreloader = false
  },
}
</script>

<style lang="less" scoped>
.subjects-info {
  margin-bottom: 20px;

  .title {
    font-size: 1.5em;
    font-weight: 300;
  }

  .tests {
    margin-top: 20px;

    .row {
      display: grid;
      grid-template-columns: 1fr 100px 100px;

      padding: 7px 0;

      &.cursor-pointer {
        cursor: pointer;

        &:hover {
          .name {
            text-decoration: underline;
          }
        }
      }

      &.header-title {
        color: var(--color-font-dark);
      }

      .result {
        &.bad { color: #E01616 }
        &.warning { color: #FC7136 }
        &.good { color: #1ED6BA }
        &.neutral { color: var(--color-font-dark) }
      }

      .permission {
        &.closed {
          color: #E01616;
        }

        &.opened {
          color: #1ED6BA;
        }
      }

      @media screen and (max-width: 500px) {
        grid-template-columns: 1fr;
        grid-gap: 10px;

        margin-bottom: 20px;
        padding: 20px 0;
        border-bottom: 1px solid var(--color-bg-main);

        .name {
          font-size: 1.3em;
        }

        &:last-child {
          border-bottom: 0;
        }
      }
    }
  }
}
</style>
