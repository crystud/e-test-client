<template>
  <div class="app-student">
    <div class="student-info">
      <app-student-personal-info
        class="drop-shadow"
        :user="user"
        :data="[
          ['E-mail', user.email || 'Невідомо'],
        ]"
      ></app-student-personal-info>

      <app-teacher-activity
        class="drop-shadow"
        :data="activity"
      ></app-teacher-activity>
    </div>

    <div class="sections">
      <div class="tests">
        <!-- <app-teacher-tests-list
          class="teacher-tests drop-shadow"
          title="Ваші тести"
          :tests="teacherTests.filter((_, index) => (index <= 2))"
          :totalCount="teacherTests.length"
        ></app-teacher-tests-list> -->

        tests list...
      </div>

      <app-student-messages
        title="Ваші оголошення"
        :showCreateMessage="true"
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
// import AppTeacherTestsList from '@/components/templates/teacher/AppTeacherTestsList.vue'

export default {
  name: 'AppStudent',
  components: {
    AppStudentPersonalInfo,
    AppTeacherActivity,
    AppStudentMessages,
    // AppTeacherTestsList,
  },
  methods: {
    ...mapActions({
      getUser: 'user/getUser',
      getTeacherTests: 'teacher/getOwnTests',
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
      teacherTests: [],
      activity: [
        ['У авторській розробці', '5 тестів'],
        ['Створено питань', '37'],
        ['Предметів викладаєте', '3'],
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
      this.teacherTests = await this.getTeacherTests()

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
