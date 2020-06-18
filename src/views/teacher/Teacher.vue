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
        :teachers="user.teachers"
      ></app-teacher-activity>
    </div>

    <div class="sections">
      <div>
        <app-fade-card
          :show="!showCreateMessage"
          class="tests"
        >
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
        </app-fade-card>

        <app-fade-card :show="showCreateMessage">
          <app-create-message
            @close="showCreateMessage = false"
            @sent="showCreateMessage = false"
          ></app-create-message>
        </app-fade-card>
      </div>

      <app-teacher-messages
        @showCreateMessage="showCreateMessage = true"
        :showingCreateMessage="showCreateMessage"
      ></app-teacher-messages>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

import AppStudentPersonalInfo from '@/components/templates/student/AppStudentPersonalInfo.vue'
import AppTeacherMessages from '@/components/templates/teacher/AppTeacherMessages.vue'

import AppTeacherActivity from '@/components/templates/teacher/AppTeacherActivity.vue'
import AppTeacherAttachedSubject from '@/components/templates/teacher/AppTeacherAttachedSubject.vue'
import AppCreateTest from '@/components/templates/teacher/AppCreateTest.vue'
import AppCreateMessage from '@/components/templates/teacher/AppCreateMessage.vue'

import AppFadeCard from '@/components/ui/AppFadeCard.vue'

export default {
  methods: {
    ...mapActions({
      getUser: 'user/getUser',
      getTeacherSubjects: 'teacher/getSubjects',
      getTeacher: 'teacher/getByID',
      setAlert: 'alert/set',
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
      showCreateMessage: false,
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
    }
  },
  async created() {
    try {
      this.showPreloader = true

      document.title = 'Ваш профіль -  CRYSTUD'

      this.user = await this.getUser(this.self.id)
      this.subjects = await this.getTeacherSubjects()

      const { user } = this

      document.title = `${user.lastName} ${user.firstName} ${user.patronymic} - CRYSTUD`
    } catch (e) {
      const text = e?.response.data.message || 'Не вдалось отримати інформацію про вчителя'

      this.setAlert({
        title: 'Помилка',
        text,
        delay: 1500,
        show: true,
        isSuccess: false,
      })
    } finally {
      this.showPreloader = false
    }
  },
  components: {
    AppTeacherAttachedSubject,
    AppStudentPersonalInfo,
    AppTeacherActivity,
    AppTeacherMessages,
    AppCreateMessage,
    AppCreateTest,
    AppFadeCard,
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
