<template>
  <div class="app-student">
    <div class="student-info">
      <app-student-personal-info
        :user="user"
        :data="[
          ['E-mail', user.email || 'Невідомо'],
          ['Викладаєте у', 'Коломийський політехнічний коледж'],
        ]"
      ></app-student-personal-info>

      <app-teacher-activity :data="activity"></app-teacher-activity>
    </div>

    <div class="sections">
      <div class="tests">
        <app-teacher-tests-list
          class="teacher-tests"
          title="Тести в розробці"
          :tests="[
            { name: 'Математика. Базовий рівень', questionsCount: 16 },
            { name: 'Математика. Середній рівень', questionsCount: 16 },
            { name: 'Математика. Вищий рівень', questionsCount: 16 },
          ]"
          :totalCount="7"
        ></app-teacher-tests-list>

        <app-teacher-tests-list
          class="teacher-tests"
          title="Активні тести"
          :tests="[
            { name: 'Вища математика. Базовий рівень', questionsCount: 32 },
            { name: 'Вища математика. Середній рівень', questionsCount: 32 },
            { name: 'Вища математика. Вищий рівень', questionsCount: 32 },
          ]"
          :totalCount="5"
        ></app-teacher-tests-list>
      </div>

      <app-student-messages
        title="Ваші оголошення"
        :messages="exampleMessages"
      ></app-student-messages>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

import AppStudentPersonalInfo from '@/components/templates/student/AppStudentPersonalInfo.vue'
import AppStudentMessages from '@/components/templates/student/AppStudentMessages.vue'
import AppTeacherActivity from '@/components/templates/teacher/AppTeacherActivity.vue'
import AppTeacherTestsList from '@/components/templates/teacher/AppTeacherTestsList.vue'

export default {
  name: 'AppStudent',
  components: {
    AppStudentPersonalInfo,
    AppTeacherActivity,
    AppStudentMessages,
    AppTeacherTestsList,
  },
  methods: {
    ...mapActions({
      getUser: 'user/getUser',
    }),
    setFullHistory(isOpened) {
      this.fullIsOpened = isOpened
    },
  },
  computed: {
    ...mapGetters({
      self: 'user/info',
    }),
  },
  data() {
    return {
      user: {},
      fullIsOpened: false,
      activity: [
        ['У авторській розробці', '5 тестів'],
        ['Створено питань', '78%'],
        ['Предметів', '6'],
      ],
      exampleMessages: [
        {
          sender: 'Вчитель Вчительович',
          time: '03.02.2020 16:45',
          message: `
            Проходимо тести. Доступ відкрив.
          `,
        },
      ],
    }
  },
  async created() {
    this.showPreloader = true

    const {
      $route: {
        params: { id: userID },
      },
    } = this

    if (!userID) {
      this.user = this.self

      document.title = 'Ваш профіль -  CRYSTUD'
    } else {
      this.user = await this.getUser(userID)
    }

    const { user } = this

    document.title = `${user.lastName} ${user.firstName} ${user.patronymic} - CRYSTUD`

    this.showPreloader = false
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

    .teacher-tests {
      margin-bottom: 20px;
    }
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
