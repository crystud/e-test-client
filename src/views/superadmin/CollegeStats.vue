<template>
  <div class="global-stats">
    <div class="page-title">
      Коломийський політехнічний коледж
    </div>

    <div class="header-data-cards">
      <app-data-card
        v-for="([label, value], index) in headerDataCards"
        v-bind:key="index"
      >
        <span slot="value">{{value}}</span>
        <span slot="label">{{label}}</span>
      </app-data-card>
    </div>

    <div class="chart-section">
      <div class="chart">
        <app-chart
          :values="[
            { label: '01.01.20', value: 20 },
            { label: '02.01.20', value: 15 },
            { label: '03.01.20', value: 45 },
            { label: '04.01.20', value: 53 },
            { label: '05.01.20', value: 23 },
            { label: '06.01.20', value: 24 },
            { label: '07.01.20', value: 52 },
            { label: '08.01.20', value: 56 },
            { label: '09.01.20', value: 56 },
            { label: '10.01.20', value: 30 },
            { label: '11.01.20', value: 80 },
            { label: '12.01.20', value: 20 },
            { label: '13.01.20', value: 80 },
          ]"
          :verticalLabels="[
            '100%',
            '75%',
            '50%',
            '25%',
            '0%',
          ]"
          :scrollToEnd="true"
        ></app-chart>
      </div>

      <div class="additional">
        <div class="title">Топ запитів по IP</div>

        <div class="list">
          <div
            v-for="({ ip, times }, index) in ipsRequests"
            v-bind:key="index"
            class="item"
          >
            <span class="ip">{{ip}}</span>
            <span class="times">{{times}} ост. хв.</span>
          </div>
        </div>
      </div>
    </div>

    <div class="footer-data-cards">
      <app-data-card
        v-for="([label, value, isGood], index) in footerDataCards"
        v-bind:key="index"
        :isGoodState="isGood"
      >
        <span slot="value">{{value}}</span>
        <span slot="label">{{label}}</span>
      </app-data-card>
    </div>

    <div class="load-list">
      <div class="title">Топ 10 нагрузка від користувачів НЗ</div>

      <div class="table">
        <div class="row header">
          <div class="name">Ім'я</div>
          <div class="requests">Запитів сьогодні</div>
          <div class="ips">К-сть IP-адрес</div>
          <div class="last-visit">Остання активн.</div>
        </div>

        <div
          v-for="([name, requests, ips, lastVisit], index) in loadData"
          v-bind:key="index"
          class="row"
        >
          <div class="name">{{name}}</div>

          <div class="requests">
            <span class="label">Запитів сьогодні</span>
            <span class="value">{{requests}}</span>
          </div>

          <div class="ips">
            <span class="label">К-сть IP-адрес</span>
            <span class="value">{{ips}}</span>
          </div>

          <div class="last-visit">
            <span class="label">Остання активн.</span>
            <span class="value">{{lastVisit}}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import AppDataCard from '@/components/templates/superadmin/AppDataCard.vue'
import AppChart from '@/components/ui/AppChart.vue'

export default {
  components: {
    AppDataCard,
    AppChart,
  },
  data() {
    return {
      loadData: [
        ['Кіращук Олег Олегович', '1, 224', '3', '3 хв. тому'],
        ['Григорцев Андрій Васильович', '1, 124', '2', '4 хв. тому'],
        ['Гушулей Ярина Орестівна', '934', '2', 'В мережі'],
      ],
      ipsRequests: [
        { ip: '195.95.147.51', times: 334 },
        { ip: '46.175.136.138', times: 124 },
        { ip: '91.230.25.102', times: 112 },
        { ip: '93.170.170.28', times: 103 },
        { ip: '91.230.25.111', times: 53 },
      ],
      headerDataCards: [
        ['Навчальних закладів', '369'],
        ['Вчителів', '13, 243'],
        ['Студентів', '78, 963'],
      ],
      footerDataCards: [
        ['Запитів на хвилину', '83, 937', true],
        ['Авторизацій на хвилину', '389', true],
        ['Невдалих спроб авторизації / хвилину', '1, 937', false],
      ],
    }
  },
}
</script>

<style lang="less" scoped>
.global-stats {
  .brandLine {
    position: relative;

    &::before {
      content: "";

      display: block;
      width: 2px;
      height: 15px;

      background: #1ED6BA;
      border-radius: 10px;

      position: absolute;
      top: 0;
      left: 0;
      bottom: 0;
      margin: auto;
    }
  }

  .page-title {
    font-size: 1.5em;
    background: var(--color-bg-dark);
    border-radius: 10px;
    padding: 20px;
    margin-bottom: 20px;

    .brandLine();

    &::before {
      height: 30px;
    }
  }

  .header-data-cards,
  .footer-data-cards {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    grid-gap: 20px;

    @media screen and (max-width: 600px) {
      grid-template-columns: 1fr;
    }
  }

  .chart-section {
    display: grid;
    grid-template-columns: 1fr 250px;
    grid-gap: 30px;

    background: var(--color-bg-dark);
    border-radius: 10px;

    padding: 20px;

    margin: 20px 0;

    .additional {
      .title {
        color: var(--color-font-main);
        font-size: 1.1em;
      }

      .list {
        margin-top: 10px;

        max-height: 100%;
        overflow: auto;

        display: grid;
        grid-template-columns: 1fr;

        .item {
          margin-bottom: 10px;
          padding: 10px 15px;
          background: var(--color-bg-main);
          border-radius: 10px;

          display: flex;
          justify-content: space-between;

          position: relative;

          .ip {
            color: var(--color-font-main);
          }

          .times {
            color: var(--color-font-dark);
          }

          .brandLine();
        }
      }
    }

    @media screen and (max-width: 900px) {
      grid-template-columns: 1fr;

      .additional .list {
        grid-template-columns: 1fr 1fr;
        grid-gap: 5px 10px;
      }
    }

    @media screen and (max-width: 600px) {
      .additional .list {
        grid-template-columns: 1fr;
      }
    }
  }

  .load-list {
    padding: 30px 20px;
    margin-top: 20px;

    background: var(--color-bg-dark);
    border-radius: 10px;

    .title {
      font-size: 1.2em;
      margin-bottom: 20px;
    }

    .table {
      .row {
        display: grid;
        grid-template-columns: 1fr 150px 150px 150px;

        margin-bottom: 15px;

        &.header {
          color: var(--color-font-dark);
          border-bottom: 1px solid var(--color-bg-main);
          padding-bottom: 10px;
          margin-bottom: 10px;
        }

        .label {
          display: none;
        }

        @media screen and (max-width: 700px) {
          grid-template-columns: 1fr;
          grid-gap: 5px;

          margin-bottom: 30px;

          &.header {
            display: none;
          }

          .label {
            display: inline-block;
            color: var(--color-font-dark);
            margin-right: 15px;
          }

          .name {
            font-size: 1.5em;
            font-weight: 300;
          }
        }
      }
    }
  }
}
</style>
