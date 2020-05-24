<template>
  <div class="app-tests">
    <app-preloader :show="showPreloader"></app-preloader>

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

    <div
      class="header"
      v-if="false"
    >
      <h1>Предмети</h1>

      <app-create-button @click="showCreateTest = true">Створити тест</app-create-button>
    </div>

    <div class="list">
      <app-teacher-attached-subject
        v-for="(subject, index) in subjects"
        :key="index"
        :subject="subject"
        :isOpened="openedIndex === index"
        @click="openedIndex = index"
        @create="
          createTestSubject = subject
          showCreateTest = true
        "
      ></app-teacher-attached-subject>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex'

import AppTeacherAttachedSubject from '@/components/templates/teacher/AppTeacherAttachedSubject.vue'
import AppCreateButton from '@/components/templates/admin/AppCreateButton.vue'
import AppCreateTest from '@/components/templates/teacher/AppCreateTest.vue'
import AppPreloader from '@/components/ui/AppPreloader.vue'

export default {
  name: 'Tests',
  components: {
    AppCreateButton,
    AppPreloader,
    AppCreateTest,
    AppTeacherAttachedSubject,
  },
  methods: {
    ...mapActions({
      setAlert: 'alert/set',
      getTeacherSubjects: 'teacher/getSubjects',
    }),
    async loadSubjects() {
      try {
        this.showPreloader = true

        this.subjects = await this.getTeacherSubjects()
      } catch (e) {
        this.setAlert({
          title: 'Неочікувана помилка',
          text: 'Сталась неочікувана помилка. Спробуйте пізніше...',
          show: true,
          isSuccess: false,
        })
      } finally {
        this.showPreloader = false
      }
    },
  },
  data() {
    return {
      showCreateTest: false,
      showPreloader: false,
      createTestSubject: {},
      subjects: [],
      openedIndex: null,
    }
  },
  async created() {
    await this.loadSubjects()
  },
}
</script>

<style lang="less" scoped>
.app-tests {
  .header {
    margin-bottom: 20px;

    display: grid;
    grid-template-columns: auto auto;
    justify-content: space-between;

    h1 {
      font-weight: 300;
      color: var(--color-font-main);
    }
  }

  .list {
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-gap: 20px;
    align-items: flex-start;
  }

  @media screen and (max-width: 1550px) {
    .list {
      grid-template-columns: repeat(2, 1fr);
    }
  }

  @media screen and (max-width: 1200px) {
    .list {
      grid-template-columns: 1fr;
      grid-gap: 10px;
    }
  }
}
</style>
