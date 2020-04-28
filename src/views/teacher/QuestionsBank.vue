<template>
  <div class="app-questions-bank">
    <app-preloader :show="showPreloader"></app-preloader>

    <app-ask-subject
      :show="!subject.id"
      @selected="
        selectedSubject => {
          subject = selectedSubject
          getTopicsList(selectedSubject.topics)
        }
      "
    ></app-ask-subject>

    <div v-if="subject.id">
      <app-create-topic
        :show="showCreateTopic"
        :subject="subject"
        @close="showCreateTopic = false"
        @created="
          refreshSubject()
          showCreateTopic = false
        "
      ></app-create-topic>

      <div class="header">
        <div class="title">Теми із запитаннями до предмету "{{ subject.name }}"</div>

        <app-button
          appearance="primary"
          @click="showCreateTopic = true"
        >Створити тему</app-button>
      </div>

      <div class="search">
        <button
          @click="search.confirmed = !search.confirmed"
          class="is-verified"
          :class="{
            'verified': search.confirmed,
            'not-verified': !search.confirmed,
          }"
        >
          {{search.confirmed ? 'Підтверджені' : 'Непідтверджені'}}
        </button>

        <app-search-bar
          class="bar"
          @search="searchTopics"
        ></app-search-bar>
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
import { mapActions, mapGetters } from 'vuex'

import AppAskSubject from '@/components/templates/teacher/AppAskSubject.vue'
import AppSubjectTopic from '@/components/templates/teacher/AppSubjectTopic.vue'
import AppCreateTopic from '@/components/templates/teacher/AppCreateTopic.vue'
import AppButton from '@/components/ui/AppButton.vue'
import AppPreloader from '@/components/ui/AppPreloader.vue'
import AppSearchBar from '@/components/ui/AppSearchBar.vue'

export default {
  components: {
    AppAskSubject,
    AppButton,
    AppSubjectTopic,
    AppCreateTopic,
    AppPreloader,
    AppSearchBar,
  },
  data() {
    return {
      subject: {},
      showCreateTopic: false,
      showPreloader: false,
      search: {
        words: '',
        confirmed: true,
      },
    }
  },
  computed: {
    ...mapGetters({
      topics: 'topics/searchResults',
    }),
  },
  methods: {
    ...mapActions({
      getTopics: 'topics/getByIDs',
      getSubject: 'subjects/getByID',
      setAlert: 'alert/set',
      searchTopicsAction: 'topics/search',
    }),
    async searchTopics(name) {
      const { search: { confirmed } } = this

      this.showPreloader = true

      this.searchTopicsAction({
        name,
        confirmed,
      })

      this.showPreloader = false
    },
    async getTopicsList(topics) {
      try {
        this.showPreloader = true

        await this.getTopics(topics)
      } catch (e) {
        this.setAlert({
          title: 'Помилка',
          text: 'Нам не вдалось отримати список тем...',
          delay: 1500,
          show: true,
          isSuccess: false,
        })
      } finally {
        this.showPreloader = false
      }
    },
    async refreshSubject() {
      const { subject: { id } } = this

      if (!id) return

      this.showPreloader = true

      const subject = await this.getSubject(id)

      await this.getTopics(subject.topics)

      this.showPreloader = false
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

    justify-content: space-between;
    align-items: center;

    .title {
      font-size: 1.5em;
      font-weight: 400;
    }
  }

  .search {
    display: grid;
    grid-template-columns: auto 1fr;

    border-radius: 10px;
    overflow: hidden;

    margin: 20px 0;

    .is-verified,
    .bar {
      background: var(--color-bg-dark);
    }

    .is-verified {
      padding: 10px 20px;
      font-size: 1em;
      border: 0;
      border-right: 1px solid var(--color-bg-main);
      cursor: pointer;

      &.verified {
        color: var(--color-accent-green);
      }

      &.not-verified {
        color: var(--color-accent-red);
      }
    }

    .bar {
      border-radius: 0;
    }
  }

  .list {
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-gap: 20px;
  }
}
</style>
