<template>
  <div class="wrap">
    <app-ticket-filters
      @updateState="updateFiltersState"
      :filters="filters"
      class="invites-filters"
    ></app-ticket-filters>

    <app-user-card class="subjects-info">
      <app-preloader :show="showPreloader"></app-preloader>

      <app-warn-passing
        :ticket="passingTicket"
        @cancel="passingTicket = 0"
      ></app-warn-passing>

      <div class="header">
        <div class="title">Дозволи на проходження</div>

        <div
          v-if="student.id"
          class="current-group"
        >
          {{student.group.name}}
        </div>
      </div>

      <div class="tests">
        <div class="row header-title">
          <div class="name">Назва</div>
          <div class="attempts">Макс. к-сть спроб</div>
          <div class="permission">Дозвіл</div>
        </div>

        <div
          class="no-items"
          v-if="!tickets.length"
        >
          Дозволів немає
        </div>

        <div
          class="row cursor-pointer"
          v-for="(ticket, index) in tickets"
          :key="index"
          @click="passingTicket = ticket.id"
        >
          <div class="name">{{ticket.permission.test.name}}</div>

          <div class="attempts">
            <span class="count-of-use">Макс. к-сть спроб:</span>
            {{ticket.permission.maxCountOfUse ||  'Без обмежень'}}
          </div>

          <div
            class="permission"
            :class="{
              opened: !ticket.used && !ticket.unstarted,
              outstanding: ticket.outstanding && !ticket.unstarted,
              closed: ticket.used && !ticket.unstarted,
              unstarted: ticket.unstarted,
            }"
          >
            <span v-if="ticket.unstarted">Очікується час доступу</span>
            <span v-else-if="ticket.used">Використаний</span>
            <span v-else-if="!ticket.outstanding && !ticket.used">Невикористаний</span>
            <span v-else-if="ticket.outstanding && !ticket.used">Прострочений</span>
          </div>
        </div>
      </div>
    </app-user-card>
  </div>
</template>

<script>
import { mapActions } from 'vuex'

import AppPreloader from '@/components/ui/AppPreloader.vue'

import AppWarnPassing from '@/components/templates/student/AppWarnPassing.vue'
import AppTicketFilters from '@/components/templates/student/AppTicketFilters.vue'
import AppUserCard from '@/components/templates/student/AppUserCard.vue'

export default {
  methods: {
    ...mapActions({
      setAlert: 'alert/set',
      getTickets: 'student/getTickets',
    }),
    updateFiltersState(newState) {
      this.filters = newState

      this.loadTickets()
    },
    async loadTickets() {
      try {
        this.showPreloader = true

        const {
          student: { id: studentID },
          $route: { params },
          filters,
        } = this

        this.tickets = await this.getTickets({
          student: studentID || params.id,
          filters,
        })
      } catch (e) {
        const text = e?.response.data.message || 'Не вдалось завантажити дозволи...'

        this.setAlert({
          title: 'Помилка',
          text,
          delay: 2000,
          show: true,
          isSuccess: false,
        })
      } finally {
        this.showPreloader = false
      }
    },
  },
  watch: {
    student() {
      this.loadTickets()
    },
    studentID() {
      this.loadTickets()
    },
  },
  data() {
    return {
      showPreloader: false,
      passingTicket: 0,
      tickets: [],
      filters: {
        onlyIsNotOutstanding: true,
        onlyUnused: true,
      },
    }
  },
  created() {
    this.loadTickets()
  },
  props: {
    student: {
      type: Object,
      required: true,
    },
    studentID: {
      type: Number,
      required: true,
    },
  },
  components: {
    AppUserCard,
    AppPreloader,
    AppWarnPassing,
    AppTicketFilters,
  },
}
</script>

<style lang="less" scoped>
.wrap {
  background: transparent;
}

.invites-filters {
  margin-bottom: 20px;
}

.subjects-info {
  margin-bottom: 20px;

  .header {
    display: grid;
    grid-template-columns: 1fr auto;
    grid-gap: 20px;
    align-items: center;

    .title {
      font-size: 1.5em;
      font-weight: 300;

      margin-bottom: 5px;
    }

    select {
      background: var(--color-bg-main);
    }

    .current-group {
      color: var(--color-font-dark);
      font-size: 1.1em;
    }
  }

  .tests {
    margin-top: 20px;

    .no-items {
      margin: 20px 0;
      font-size: 1.2em;
    }

    .row {
      display: grid;
      grid-template-columns: 1fr 150px 1fr;

      padding: 7px 0;

      &.cursor-pointer {
        cursor: pointer;

        &:hover {
          .name {
            text-decoration: underline;
          }
        }
      }

      .count-of-use {
        display: none;
      }

      &.header-title {
        color: var(--color-font-dark);
      }

      .permission {
        &.opened {
          color: var(--color-accent-green);
        }

        &.closed,
        &.outstanding {
          color: var(--color-accent-red);
        }

        &.unstarted {
          color: var(--color-accent-orange);
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

        .count-of-use {
          display: inline;
        }

        &:last-child {
          border-bottom: 0;
        }
      }
    }
  }
}
</style>
