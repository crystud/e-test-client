<template>
  <app-user-card class="subjects-info">
    <app-preloader :show="showPreloader"></app-preloader>

    <app-warn-passing
      :ticket="passingTicket"
      @cancel="passingTicket = 0"
    ></app-warn-passing>

    <div class="header">
      <div class="title">Дозволи на проходження</div>

      <div
        v-if="student"
        class="current-group"
      >
        {{student.group.name}}
      </div>
    </div>

    <select
      v-if="studentGroups.length > 1"
      v-model="groupID"
    >
      <option
        v-for="(student, index) in studentGroups"
        v-bind:key="index"
      >{{student.group.name}}</option>
    </select>

    <div class="tests">
      <div class="row header-title">
        <div class="name">Назва</div>
        <div class="attempts">Макс. к-сть спроб</div>
        <div class="permission">Дозвіл</div>
      </div>

      <div
        class="row cursor-pointer"
        v-for="(ticket, index) in tickets"
        :key="index"
        @click="passingTicket = ticket.id"
      >
        <div class="name">{{ticket.permission.test.name}}</div>

        <div class="attempts">{{ticket.permission.maxCountOfUse ||  'Без обмежень'}}</div>

        <div
          class="permission"
          :class="{
            closed: ticket.used,
            opened: !ticket.used,
            outstanding: ticket.outstanding,
          }"
        >
          <span v-if="ticket.used">Використаний</span>
          <span v-if="!ticket.used">Невикористаний</span>
          <span v-if="ticket.outstanding">Прострочений</span>
        </div>
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
      getStudentGroups: 'student/getGroups',
    }),
    async loadTickets() {
      try {
        this.showPreloader = true

        const studentGroups = await this.getStudentGroups()

        const student = studentGroups[0] ? studentGroups[0] : null

        if (student) {
          this.studentGroups = studentGroups
          this.student = student

          this.tickets = await this.getTickets(student.id)
        }
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
      passingTicket: 0,
      student: null,
      tickets: [],
      studentGroups: [],
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

  .header {
    display: grid;
    grid-template-columns: 1fr auto;
    grid-gap: 20px;
    align-items: center;

    .title {
      font-size: 1.5em;
      font-weight: 300;
    }

    .current-group {
      color: var(--color-font-dark);
      font-size: 1.1em;
    }
  }

  .tests {
    margin-top: 20px;

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
          color: #1ED6BA;
        }

        &.opened,
        &.outstanding {
          color: #E01616;
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
