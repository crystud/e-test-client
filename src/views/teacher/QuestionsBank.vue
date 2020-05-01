<template>
  <div class="app-questions-bank">
    <app-preloader :show="showPreloader"></app-preloader>

    <app-ask-subject
      :show="!subject.id"
      @selected="selectedSubject => subject = selectedSubject"
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
          @click="search.confirmed = search.confirmed === 1 ? 0 : 1"
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

      <div
        class="search-tip"
        v-show="!search.searched || search.searched && !topics.length"
      >
        <div
          v-if="!search.searched"
        >Введіть пошуковий запит та натисність шукати</div>

        <div
          v-if="search.searched && !topics.length"
        >За вашим запитом нічого не знайдено...</div>
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
        confirmed: 1,
        searched: false,
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
      setAlert: 'alert/set',
      searchTopicsAction: 'topics/search',
    }),
    async searchTopics(name) {
      const {
        search: { confirmed },
        subject: { id: subject },
      } = this

      try {
        this.search.words = name
        this.search.searched = true

        this.showPreloader = true

        await this.searchTopicsAction({
          name,
          confirmed,
          subject,
        })
      } catch (e) {
        this.setAlert({
          title: 'Помилка',
          text: 'Нам не вдалось здійснити пошук... Спробуйте пізніше',
          isSuccess: false,
          show: true,
          delay: 1000,
        })
      } finally {
        this.showPreloader = false
        this.search.searched = true
      }
    },
    async refreshSubject() {
      const {
        subject: { id },
        search: {
          confirmed,
          words: name,
        },
      } = this

      if (!id) return

      this.showPreloader = true
      this.search.searched = true

      await this.searchTopicsAction({
        confirmed,
        name,
        subject: id,
      })

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
    grid-gap: 20px;

    justify-content: space-between;
    align-items: center;

    .title {
      font-size: 1.5em;
      font-weight: 400;
    }

    @media screen and (max-width: 500px) {
      grid-template-columns: 1fr;
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
