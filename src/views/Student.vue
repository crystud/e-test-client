<template>
  <div class="app-student">
    <div class="student-info">
      <app-student-personal-info></app-student-personal-info>

      <app-student-activity
        :data="studentActivity"
      ></app-student-activity>
    </div>

    <app-student-subjects
      v-for="i in 3"
      v-bind:key="i"
    ></app-student-subjects>
  </div>
</template>

<script>
import AppStudentPersonalInfo from '@/components/templates/student/AppStudentPersonalInfo.vue'
import AppStudentActivity from '@/components/templates/student/AppStudentActivity.vue'
import AppStudentSubjects from '@/components/templates/student/AppStudentSubjects.vue'

export default {
  name: 'AppStudent',
  components: {
    AppStudentPersonalInfo,
    AppStudentActivity,
    AppStudentSubjects,
  },
  data() {
    return {
      studentActivity: [
        ['Останній тест пройдено', '03.03.2020 (87%)'],
        ['Середній результат', '78%'],
        ['Середній час проходження', '13 хвилин 16 секунд'],
      ],
    }
  },
}
</script>

<style lang="less" scoped>
.app-student {
  .student-info {
    display: grid;
    grid-template-columns: 5fr 4fr;
    grid-gap: 20px;

    margin-bottom: 20px;

    @media screen and (max-width: 880px) {
      grid-template-columns: 1fr;
    }
  }
}
</style>
