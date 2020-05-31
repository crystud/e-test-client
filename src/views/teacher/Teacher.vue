<template>
  <div class="app-student">
    <app-create-test
      :show="showCreateTest"
      :subject="createTestSubject"
      @close="
        showCreateTest = false
        createTestSubject = {}
      "
      @created="({ id }) => $router.push({
        name: 'testDevelop',
        params: { id },
      })"
    ></app-create-test>

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
        <app-teacher-attached-subject
          v-for="(subject, index) in subjects"
          v-bind:key="index"
          :subject="subject"
          :isOpened="openedIndex === index"
          class="teaching-subject"
          @click="openedIndex = index"
          @create="
            createTestSubject = subject
            showCreateTest = true
          "
        ></app-teacher-attached-subject>
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
import AppTeacherAttachedSubject from '@/components/templates/teacher/AppTeacherAttachedSubject.vue'
import AppCreateTest from '@/components/templates/teacher/AppCreateTest.vue'

export default {
  methods: {
    ...mapActions({
      getUser: 'user/getUser',
      getTeacherSubjects: 'teacher/getSubjects',
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
      showCreateTest: false,
      createTestSubject: {},
      fullIsOpened: false,
      openedIndex: null,
      subjects: [],
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
      this.subjects = await this.getTeacherSubjects()

      document.title = 'Ваш профіль -  CRYSTUD'
    } else {
      this.user = await this.getUser(userID)
    }

    const { user } = this

    document.title = `${user.lastName} ${user.firstName} ${user.patronymic} - CRYSTUD`

    this.showPreloader = false
  },
  components: {
    AppTeacherAttachedSubject,
    AppStudentPersonalInfo,
    AppTeacherActivity,
    AppStudentMessages,
    AppCreateTest,
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

  .teaching-subject {
    margin-bottom: 10px;
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
