<template>
  <div class="app-student">
    <div class="student-info">
      <app-student-personal-info></app-student-personal-info>

      <app-student-activity
        :data="studentActivity"
        :fullIsOpened="fullIsOpened"
        @setFullHistory="setFullHistory"
      ></app-student-activity>
    </div>

    <div v-show="fullIsOpened">
      <app-student-tests-history></app-student-tests-history>
    </div>

    <div
      v-show="!fullIsOpened"
      class="sections"
    >
      <div>
        <app-student-subjects
          v-for="i in 3"
          v-bind:key="i"
        ></app-student-subjects>
      </div>

      <app-student-messages
        :messages="exampleMessages"
      ></app-student-messages>
    </div>
  </div>
</template>

<script>
import AppStudentPersonalInfo from '@/components/templates/student/AppStudentPersonalInfo.vue'
import AppStudentActivity from '@/components/templates/student/AppStudentActivity.vue'
import AppStudentSubjects from '@/components/templates/student/AppStudentSubjects.vue'
import AppStudentTestsHistory from '@/components/templates/student/AppStudentTestsHistory.vue'
import AppStudentMessages from '@/components/templates/student/AppStudentMessages.vue'

export default {
  name: 'AppStudent',
  components: {
    AppStudentPersonalInfo,
    AppStudentActivity,
    AppStudentSubjects,
    AppStudentTestsHistory,
    AppStudentMessages,
  },
  methods: {
    setFullHistory(isOpened) {
      this.fullIsOpened = isOpened
    },
  },
  data() {
    return {
      fullIsOpened: false,
      studentActivity: [
        ['Останній тест пройдено', '03.03.2020 (87%)'],
        ['Середній результат', '78%'],
        ['Середній час проходження', '13 хвилин 16 секунд'],
      ],
      exampleMessages: [
        {
          sender: 'Юрочко Ольга Михайлівна',
          time: '03.02.2020 16:45',
          message: `
            Ви пройшли тест, но ще не здали
            мій предмет без перездач.
            Побачимось на наступних тестах.
          `,
        },
        {
          sender: 'Смиковчук Тетяна Володимирівна',
          time: '03.02.2020 16:45',
          message: `
            Проміжний контроль по темах 5-6 до
            завтра тренуєтесь, завтра з 10.00
            до 12.00 здаєте в системі (пароль доступу скину)
            Дотримуємось академічної доброчесності.і з контролями
            ВСЕ
          `,
        },
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
  }

  .sections {
    display: grid;
    grid-template-columns: 2fr 1fr;
    grid-gap: 20px;
  }

  .mobile {
    grid-template-columns: 1fr;
  }

  @media screen and (max-width: 1150px) and (min-width: 1000px) {
    .student-info {
      .mobile();
    }
  }

  @media screen and (max-width: 980px) {
    .student-info,
    .sections {
      .mobile();
    }
  }
}
</style>
