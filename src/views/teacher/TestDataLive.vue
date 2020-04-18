<template>
  <div class="test-data-live">
    <div class="header">
      <h1>Назва тесту</h1>

      <div class="description">Опис тесту, він довгий, і дуже дуже дуже дуже довгий</div>
    </div>

    <div class="data-cards">
      <div
        class="card"
        v-for="([label, value], index) in headerCards"
        v-bind:key="index"
      >
        <div class="value">{{value}}</div>
        <div class="label">{{label}}</div>
      </div>

      <div
        class="card manage-permission opened"
        @click="showManagePermission = true"
      >
        <div class="value">Відкритий</div>
        <div class="label">Доступ</div>
      </div>
    </div>

    <div class="sections">
      <div class="current card">
        <app-live-test></app-live-test>
      </div>

      <app-test-history class="history card"></app-test-history>
    </div>

    <app-manage-test-permission
      :show="showManagePermission"
      @close="showManagePermission = false"
    ></app-manage-test-permission>
  </div>
</template>

<script>
import AppLiveTest from '@/components/templates/teacher/AppLiveTest.vue'
import AppTestHistory from '@/components/templates/teacher/AppTestHistory.vue'
import AppManageTestPermission from '@/components/templates/teacher/AppManageTestPermission.vue'

export default {
  components: {
    AppLiveTest,
    AppTestHistory,
    AppManageTestPermission,
  },
  data() {
    return {
      showManagePermission: false,
      headerCards: [
        ['Проходять', '34'],
        ['Пройшли', '16'],
        ['Сер. успішність', '64%'],
      ],
    }
  },
}
</script>

<style lang="less" scoped>
.test-data-live {
  color: var(--color-font-main);

  .header {
    background: var(--color-bg-dark);
    padding: 25px;
    border-radius: 10px;

    .header {
      font-size: 1.3em;
      font-weight: 400;
    }

    .description {
      color: var(--color-font-dark);
      margin-top: 5px;
    }
  }

  .data-cards {
    margin: 20px 0;
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    grid-gap: 20px;;

    .card {
      position: relative;

      padding: 30px;
      background: var(--color-bg-dark);
      border-radius: 10px;

      text-align: center;

      &::before {
        content: "";

        position: absolute;
        bottom: 0;
        left: 0;
        right: 0;
        margin: auto;

        width: 20%;
        height: 2px;
        max-width: 80px;

        background: #22D582;
        border-radius: 10px;
      }

      .value {
        color: var(--color-font-main);
        font-size: 2.5em;
      }

      .label {
        color: var(--color-font-dark);
        font-size: 1.2em;
        margin-top: 10px;
      }

      &.manage-permission {
        cursor: pointer;

        .value {
          font-size: 1.75em;
        }

        &.opened {
          .value {
            color: #1AD9A5;
          }
        }

        &.closed {
          .value {
            color: var(--color-accent-red);
          }
        }
      }
    }

    @media screen and (max-width: 900px) {
      grid-template-columns: 1fr 1fr;
    }

    @media screen and (max-width: 600px) {
      grid-template-columns: 1fr;
    }
  }

  .sections {
    margin-top: 20px;

    display: grid;
    grid-template-columns: 1fr 350px;
    grid-gap: 20px;
    grid-template-areas: 'current history';
    align-items: flex-start;

    .history {
      grid-area: history;

      h2 {
        font-weight: 300;
        margin-bottom: 10px;
      }

      .result {
        background: var(--color-bg-main);
        margin-bottom: 10px;
      }
    }

    .current {
      grid-area: current;
    }

    .card {
      background: var(--color-bg-dark);
      border-radius: 10px;
    }

    @media screen and (max-width: 1200px) {
      grid-template-columns: 1fr;
      grid-template-areas: 'current' 'history';
    }
  }
}
</style>
