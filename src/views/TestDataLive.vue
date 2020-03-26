<template>
  <div class="test-data-live">
    <div class="header">
      <h1>Назва тесту</h1>

      <div class="description">Опис тесту, він довгий, і дуже дуже дуже дуже довгий</div>
    </div>

    <div class="sections">
      <div class="history card">
        <h2>Історія</h2>

        <app-student-test-result
          v-for="i in 5"
          v-bind:key="i"
          class="result"
        ></app-student-test-result>
      </div>

      <app-live-test class="current card"></app-live-test>
    </div>
  </div>
</template>

<script>
import AppStudentTestResult from '@/components/templates/student/AppStudentTestResult.vue'
import AppLiveTest from '@/components/templates/teacher/AppLiveTest.vue'

export default {
  components: {
    AppStudentTestResult,
    AppLiveTest,
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

  .sections {
    margin-top: 20px;

    display: grid;
    grid-template-columns: 1fr 250px;
    grid-gap: 20px;
    grid-template-areas: 'history current';

    .history {
      padding: 25px;
      grid-area: history;

      h2 {
        font-weight: 100;
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
      border-radius: 10px;;
    }

    @media screen and (max-width: 1200px) {
      grid-template-columns: 1fr;
      grid-template-areas: 'current' 'history';
    }
  }
}
</style>
