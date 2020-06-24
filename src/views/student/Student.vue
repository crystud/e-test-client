<template>
  <div
    class="app-student"
    v-if="user.id"
  >
    <app-preloader :show="showPreloader"></app-preloader>

    <div
      class="student-info"
      :class="{
        'student-overiew': !student.invite,
      }"
    >
      <app-student-personal-info
        class="drop-shadow"
        :user="user"
        :selectedStudent="student"
        @changeStudent="(student) => loadStudent(student.id)"
        :data="[
          ['E-mail', user.email],
        ]"
      ></app-student-personal-info>

      <app-student-invite
        v-if="student.invite"
        class="drop-shadow"
        :data="student.invite"
      ></app-student-invite>
    </div>

    <div class="sections">
      <div>
        <app-student-subjects
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
import AppStudentInvite from '@/components/templates/student/AppStudentInvite.vue'
import AppStudentSubjects from '@/components/templates/student/AppStudentSubjects.vue'
import AppStudentMessages from '@/components/templates/student/AppStudentMessages.vue'
import AppPreloader from '@/components/ui/AppPreloader.vue'

export default {
  components: {
    AppStudentPersonalInfo,
    AppStudentInvite,
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
      getStudent: 'student/getByID',
    }),
    async loadStudent(studentID = null) {
      const {
        $route: {
          params: { id: userID },
        },
      } = this

      const user = await this.getUser(userID)

      const { students: [defaultStudent = {}] } = user

      const fetchingID = studentID || defaultStudent.id

      this.student = await this.getStudent(fetchingID)
      this.user = user

      const { user: { lastName, firstName, patronymic } } = this

      document.title = `${lastName} ${firstName} ${patronymic} - CRYSTUD`
    },
  },
  data() {
    return {
      user: {},
      student: {},
      showPreloader: false,
    }
  },
  async created() {
    const { $router } = this

    this.showPreloader = true

    const { name: routeName } = this.$route

    if (routeName === 'homeUser'
    && !this.self.roles.includes('student')) {
      return this.redirectToHome({ $router })
    }

    if (routeName === 'studentHome') {
      this.user = this.self

      console.log(this.self, this.user)

      document.title = 'Ваш профіль - CRYSTUD'
    } else if (routeName === 'studentOverview') {
      await this.loadStudent()
    }

    console.log(1)

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

    &.student-overiew {
      grid-template-columns: 1fr;
    }

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
