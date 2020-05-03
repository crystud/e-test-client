<template>
  <div class="app-student-tests-history">
    <div class="title">Історія проходження тестів</div>

    <div class="list">
      <app-student-test-result
        v-for="i in 5"
        v-bind:key="i"
      ></app-student-test-result>
    </div>
  </div>
</template>

<script>
import AppStudentTestResult from './AppStudentTestResult.vue'

export default {
  name: 'AppStudentTestsHistory',
  components: {
    AppStudentTestResult,
  },
}
</script>

<style lang="less" scoped>
.app-student-tests-history {
  font-weight: 300;

  .title {
    font-size: 1.5em;
    margin-bottom: 20px;
  }
}
</style>
