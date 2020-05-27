<template>
  <div class="app-questions-bank">
    <app-preloader :show="showPreloader"></app-preloader>

    <div>
      <app-create-topic
        :show="showCreateTopic"
        :subject="createTopicSubject"
        @close="
          showCreateTopic = false
          createTopicSubject = {}
        "
        @created="
          loadSubjects()
          showCreateTopic = false
          createTopicSubject = {}
        "
      ></app-create-topic>

      <div class="list">
        <app-question-bank-subject
          v-for="(subject, index) in subjects"
          :key="index"
          :subject="subject"
          :isOpened="openedIndex === index"
          @click="openedIndex = index"
          @createTopic="
            createTopicSubject = subject.subject
            showCreateTopic = true
          "
        ></app-question-bank-subject>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex'

import AppCreateTopic from '@/components/templates/teacher/AppCreateTopic.vue'
import AppQuestionBankSubject from '@/components/templates/teacher/AppQuestionBankSubject.vue'

import AppPreloader from '@/components/ui/AppPreloader.vue'

export default {
  components: {
    AppCreateTopic,
    AppPreloader,
    AppQuestionBankSubject,
  },
  data() {
    return {
      showCreateTopic: false,
      showPreloader: false,
      openedIndex: null,
      subjects: [],
      createTopicSubject: {},
    }
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
          title: 'Помилка',
          text: 'Не вдалось отримати інформацію про предмет...',
          isSuccess: false,
          show: true,
        })
      } finally {
        this.showPreloader = false
      }
    },
  },
  created() {
    this.loadSubjects()
  },
}
</script>

<style lang="less" scoped>
.app-questions-bank {
  .header {
    display: flex;
    justify-content: flex-end;
    margin-bottom: 30px;
  }

  .list {
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-gap: 20px;
    align-items: flex-start;
  }

  @media screen and (max-width: 650px) {
    .list {
      grid-template-columns: 1fr;
    }
  }

  @media screen and (max-width: 450px) {
    .search {
      grid-template-columns: 1fr;

      button {
        border: 0;
        border-bottom: 1px solid var(--color-bg-main) !important;
        padding: 20px !important;
      }
    }
  }
}
</style>
