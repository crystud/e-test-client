<template>
  <div
    class="app-student"
    v-if="user.id"
  >
    <app-preloader :show="showPreloader"></app-preloader>

    <div class="student-info">
      <app-student-personal-info
        class="drop-shadow"
        :user="user"
        :selectedStudent="student"
        @changeStudent="newStudent => student = newStudent"
        :data="[
          ['E-mail', user.email],
        ]"
      ></app-student-personal-info>

      <app-student-activity
        class="drop-shadow"
        :data="studentActivity"
      ></app-student-activity>
    </div>

    <div class="sections">
      <div>
        <app-student-subjects
          class="drop-shadow"
          :student="student"
          :studentID="parseInt($route.params.id || 0, 10)"
        ></app-student-subjects>
      </div>

      <app-student-messages
        :student="student"
        :studentID="parseInt($route.params.id || 0, 10)"
      ></app-student-messages>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

import AppStudentPersonalInfo from '@/components/templates/student/AppStudentPersonalInfo.vue'
import AppStudentActivity from '@/components/templates/student/AppStudentActivity.vue'
import AppStudentSubjects from '@/components/templates/student/AppStudentSubjects.vue'
import AppStudentMessages from '@/components/templates/student/AppStudentMessages.vue'
import AppPreloader from '@/components/ui/AppPreloader.vue'

export default {
  components: {
    AppStudentPersonalInfo,
    AppStudentActivity,
    AppStudentSubjects,
    AppStudentMessages,
    AppPreloader,
  },
  computed: {
    ...mapGetters({
      self: 'user/info',
    }),
  },
  methods: {
    ...mapActions({
      getUser: 'user/getUser',
      setAlert: 'alert/set',
      redirectToHome: 'auth/redirectToHome',
    }),
  },
  data() {
    return {
      user: {},
      student: {},
      showPreloader: false,
      studentActivity: [
        ['Останній тест пройдено', '03.03.2020 (87%)'],
        ['Середній результат', '78%'],
        ['Середній час проходження', '13 хвилин 16 секунд'],
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

    const { name: routeName } = this.$route

    if (routeName === 'studentHome') {
      this.user = this.self

      document.title = 'Ваш профіль - CRYSTUD'
    } else if (routeName === 'studentOverview') {
      const user = await this.getUser(userID)
      const { students: [defaultStudent = {}] } = user

      this.user = user
      this.student = defaultStudent

      const { user: { lastName, firstName, patronymic } } = this

      document.title = `${lastName} ${firstName} ${patronymic} - CRYSTUD`
    }

    this.showPreloader = false

    return false
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

  .drop-shadow {
    box-shadow: 0px 0px 20px rgba(0, 0, 0, .3);
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
