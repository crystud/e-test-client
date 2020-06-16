<template>
  <div class="app-permission">
    <app-preloader :show="showPreloader"></app-preloader>

    <div
      class="page"
      v-if="permission.id"
    >
      <app-card class="app-card group">
        <div class="label">Група</div>
        <div class="value">П-42</div>
      </app-card>

      <app-card class="app-card expires-in">
        <div class="label">Тип вибору результату</div>
        <div class="value">{{resultSelectingMethods[permission.resultSelectingMethod] || '-'}}</div>
      </app-card>

      <app-card class="test-info">
        <div class="title">Інформація про тест</div>

        <app-data-list
          :data="[
            ['Назва тесту', permission.test.name],
            ['К-сть запитань', permission.test.countOfTasks],
            ['Час проходження', `${permission.test.duration} хв.`],
            ['Предмет', permission.teacher.subject.name],
          ]"
        ></app-data-list>
      </app-card>

      <app-card class="app-card access-time">
        <app-data-list
          class="app-data-list"
          :data="[
            ['Від', $moment(permission.startTime).format('Do MMMM YYYY, HH:mm')],
            ['До', $moment(permission.endTime).format('Do MMMM YYYY, HH:mm')],
          ]"
        ></app-data-list>
      </app-card>

      <app-card class="tickets">
        <app-ticket-detail-info
          :ticketID="detailInfoTicketID"
          @close="detailInfoTicketID = 0"
        ></app-ticket-detail-info>

        <app-fade-card :show="!Boolean(detailInfoTicketID)">
          <div class="header">
            <h1>Активність проходження</h1>
          </div>

          <div class="list">
            <div class="row header-row">
              <div class="student">Студент</div>
              <div class="avg">Результат</div>
              <div class="count-of-passes">К-сть проходжень</div>
            </div>

            <div
              class="row"
              v-for="({
                id,
                student: { user },
                attemptsCount,
                average,
              }, index) in permission.tickets"
              v-bind:key="index"
            >
              <div class="student">{{user.lastName}} {{user.firstName}} {{user.patronymic}}</div>
              <div class="avg">{{average ? `${average}%` : '-'}}</div>
              <div class="count-of-passes">{{attemptsCount}}</div>

              <div
                class="more-info"
                @click="detailInfoTicketID = id"
              >
                <font-awesome-icon
                  icon="info-circle"
                ></font-awesome-icon>
              </div>
            </div>
          </div>
        </app-fade-card>
      </app-card>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex'

import AppTicketDetailInfo from '@/components/templates/teacher/AppTicketDetailInfo.vue'

import AppPreloader from '@/components/ui/AppPreloader.vue'
import AppCard from '@/components/ui/AppCard.vue'
import AppDataList from '@/components/ui/AppDataList.vue'
import AppFadeCard from '@/components/ui/AppFadeCard.vue'

export default {
  data() {
    return {
      showPreloader: false,
      detailInfoTicketID: 0,
      permission: {},
      resultSelectingMethods: [
        { name: 'Останній результат', value: 'LAST_RESULT' },
        { name: 'Найкращий результат', value: 'BEST_RESULT' },
        { name: 'Середній результат', value: 'AVG_RESULT' },
      ],
    }
  },
  methods: {
    ...mapActions({
      getPermission: 'permissions/getByID',
      setAlert: 'alert/set',
    }),
    async loadPermission() {
      try {
        const { params: { permissionID } } = this.$route

        this.showPreloader = true

        this.permission = await this.getPermission(permissionID)
      } catch (e) {
        const text = e?.response.data.message || 'Не вдалось отримати інформацію про дозвіл'

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
  created() {
    this.loadPermission()
  },
  components: {
    AppTicketDetailInfo,
    AppPreloader,
    AppDataList,
    AppFadeCard,
    AppCard,
  },
}
</script>

<style lang="less" scoped>
.app-permission {
  .page {
    display: grid;
    grid-template-columns: 1fr 3fr 2fr;
    grid-template-areas: 'group accessTime expires' 'tickets tickets test-info';
    grid-gap: 20px;

    .app-card, .tickets {
      box-shadow: 0px 0px 15px rgba(0, 0, 0, 0.15);
    }

    .app-card {
      display: flex;
      flex-direction: column;
      justify-content: center;
      padding: 20px 30px;

      .label {
        font-size: 1.2em;
        color: var(--color-font-dark);
        margin-bottom: 5px;
      }

      .value {
        font-size: 1.5em;
        color: var(--color-font-main);
      }
    }

    .access-time {
      grid-area: accessTime;
      font-size: 1.3em;

      .app-data-list {
        margin: 10px 0 0;
      }
    }

    .group { grid-area: group }
    .expires-in { grid-area: expires }

    .test-info {
      grid-area: test-info;
      padding: 30px;
    }

    .tickets {
      grid-area: tickets;
      padding: 30px;

      .header {
        display: grid;
        grid-template-columns: 1fr auto;
        grid-gap: 20px;
        align-items: center;
        margin-bottom: 30px;

        h1 {
          font-weight: 100;
          font-size: 1.7em;
        }

        @keyframes liveAnimation {
          0%, 100% {
            background: var(--color-accent-green);
            transform: scale(1.03);
          }

          50% {
            background: var(--color-accent-blue);
            transform: scale(1);
          }
        }
      }
    }

    .tickets, .test-info {
      display: flex;
      flex-direction: column;
      justify-content: flex-start;

      .title {
        font-size: 1.3em;
      }
    }

    .list {
      margin-top: 20px;

      .row {
        display: grid;
        grid-template-columns: 1fr 150px 150px 30px;
        grid-gap: 20px;

        margin-bottom: 10px;

        color: var(--color-font-main);

        &.header-row {
          color: var(--color-font-dark);
        }

        .more-info {
          color: var(--color-font-dark);
          cursor: pointer;

          transition: all .3s;

          &:hover {
            color: var(--color-font-main);
          }
        }
      }
    }

    @media screen and (max-width: 800px) {
      grid-template-columns: 1fr;
      grid-template-areas: 'group' 'expires' 'accessTime' 'test-info' 'tickets';

      .app-card {
        padding: 30px;
      }
    }

    @media screen and (max-width: 700px) {
      .list {
        .row {
          grid-template-columns: 1fr;
          grid-gap: 10px;
          margin-bottom: 30px;

          .student {
            font-size: 1.3em;
            font-weight: bold;
          }
        }
      }
    }
  }
}
</style>
