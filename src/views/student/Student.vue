<template>
  <div class="app-student">
    <app-preloader :show="showPreloader"></app-preloader>

    <div class="student-info">
      <app-student-personal-info
        :user="user"
        :data="[
          ['E-mail', user.email],
        ]"
      ></app-student-personal-info>

      <app-student-activity :data="studentActivity"></app-student-activity>
    </div>

    <div class="sections">
      <div>
        <app-student-subjects v-if="user.roles.includes('user')"></app-student-subjects>

        <app-student-results v-if="user.roles.includes('user')" ></app-student-results>
      </div>

      <app-student-messages :messages="exampleMessages"></app-student-messages>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

import AppStudentPersonalInfo from '@/components/templates/student/AppStudentPersonalInfo.vue'
import AppStudentActivity from '@/components/templates/student/AppStudentActivity.vue'
import AppStudentSubjects from '@/components/templates/student/AppStudentSubjects.vue'
import AppStudentResults from '@/components/templates/student/AppStudentResults.vue'
import AppStudentMessages from '@/components/templates/student/AppStudentMessages.vue'
import AppPreloader from '@/components/ui/AppPreloader.vue'

export default {
  name: 'AppStudent',
  components: {
    AppStudentPersonalInfo,
    AppStudentActivity,
    AppStudentSubjects,
    AppStudentMessages,
    AppPreloader,
    AppStudentResults,
  },
  computed: {
    ...mapGetters({
      self: 'user/info',
    }),
  },
  methods: {
    ...mapActions({
      getUser: 'user/getUser',
    }),
  },
  data() {
    return {
      user: {},
      showPreloader: false,
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
  async created() {
    const {
      $route: {
        params: { id: userID },
      },
    } = this

    this.showPreloader = true

    if (!userID) {
      this.user = this.self

      document.title = 'Ваш профіль -  CRYSTUD'
    } else {
      this.user = await this.getUser(userID)

      const { user } = this

      document.title = `${user.lastName} ${user.firstName} ${user.patronymic} - CRYSTUD`
    }

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

    align-items: flex-start;
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
