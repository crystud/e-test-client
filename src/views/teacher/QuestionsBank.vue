<template>
  <div class="app-questions-bank">
    <app-preloader :show="showPreloader"></app-preloader>

    <app-ask-subject
      :show="!subject.id"
      @selected="subjectSelected"
      @close="$router.push({ name: 'homeTeacher' })"
    ></app-ask-subject>

    <div v-if="subject.id">
      <app-create-topic
        :show="showCreateTopic"
        :subject="subject"
        @close="showCreateTopic = false"
        @created="
          loadSubject()
          showCreateTopic = false
        "
      ></app-create-topic>

      <div class="header">
        <div>
          <div class="title">Теми із запитаннями до предмету "{{ subject.name }}"</div>

          <div
            class="change"
            @click="subject = {}"
          >Змінити предмет</div>
        </div>

        <app-button
          appearance="primary"
          @click="showCreateTopic = true"
        >Створити тему</app-button>
      </div>

      <div class="list">
        <app-subject-topic
          v-for="(topic, index) in (topics || [])"
          :key="index"
          :topic="topic"
        ></app-subject-topic>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex'

import AppAskSubject from '@/components/templates/teacher/AppAskSubject.vue'
import AppSubjectTopic from '@/components/templates/teacher/AppSubjectTopic.vue'
import AppCreateTopic from '@/components/templates/teacher/AppCreateTopic.vue'
import AppButton from '@/components/ui/AppButton.vue'
import AppPreloader from '@/components/ui/AppPreloader.vue'

export default {
  components: {
    AppAskSubject,
    AppButton,
    AppSubjectTopic,
    AppCreateTopic,
    AppPreloader,
  },
  data() {
    return {
      subject: {},
      showCreateTopic: false,
      showPreloader: false,
      topics: [],
    }
  },
  methods: {
    ...mapActions({
      setAlert: 'alert/set',
      getSubject: 'subjects/getByID',
    }),
    async loadSubject() {
      const { id } = this.subject

      if (!id) return

      this.showPreloader = true

      const { topics = [] } = await this.getSubject(id) || {}

      this.topics = topics

      this.showPreloader = false
    },
    async subjectSelected(subject) {
      this.subject = subject
      this.loadSubject()
    },
  },
}
</script>

<style lang="less" scoped>
.app-questions-bank {
  .header {
    margin-bottom: 30px;

    display: grid;
    grid-template-columns: auto auto;
    grid-gap: 20px;

    justify-content: space-between;
    align-items: center;

    .title {
      font-size: 1.5em;
      font-weight: 400;
    }

    .change {
      margin-top: 10px;
      color: var(--color-font-dark);
      cursor: pointer;

      &:hover {
        color: var(--color-font-main);
      }
    }

    @media screen and (max-width: 500px) {
      grid-template-columns: 1fr;
    }
  }

  .search {
    margin: 20px 0;
    background: var(--color-bg-dark);
  }

  .search-tip {
    text-align: center;
    margin: 50px;
    color: var(--color-font-dark);
    font-size: 1.5em;
  }

  .list {
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-gap: 20px;
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
