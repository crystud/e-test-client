<template>
  <div class="app-ask-subject">
    <app-preloader :show="showPreloader"></app-preloader>

    <app-modal-window
      :show="show && !showPreloader && !alert.show"
      :noPaddings="true"
    >
      <div class="title">Оберіть тему</div>

      <div class="content">
        <div class="search-bar">
          <input
            type="text"
            placeholder="Пошук тем..."
            v-model="search.words"
          >

          <button
            @click="search.confirmed = search.confirmed ? 0 : 1"
            class="type"
            :class="{ confirmed: search.confirmed }"
          >
            <font-awesome-icon
              icon="check"
              class="icon"
            ></font-awesome-icon>
          </button>

          <button
            @click="searchTopics"
            class="search"
          >
            <font-awesome-icon icon="search"></font-awesome-icon>
          </button>
        </div>

        <div
          class="search-type"
          :class="{ confirmed: search.confirmed }"
        >Пошук верифікованих тем: <span>{{search.confirmed ? 'Так' : 'Ні'}}</span></div>

        <div
          class="no-topics"
          v-if="search.searched && !topics.length"
        >Тем не знайдено</div>

        <div
          class="no-topics"
          v-if="!search.searched"
        >Шукайте теми через пошук</div>

        <div class="list">
          <div
            v-for="(topic, index) in topics"
            :key="index"
            class="topic"
            @click="$emit('selected', topic)"
          >
            <div class="name">{{topic.name}}</div>

            <div
              class="is-verified"
              :class="{
                'verified': topic.confirmed,
                'not-verified': !topic.confirmed,
              }"
            >
              {{topic.confirmed ? 'Верифікована тема' : 'Неверифікована тема'}}
            </div>
          </div>
        </div>
      </div>

      <button
        class="cancel"
        @click="$emit('cancel')"
      >
        Скасувати
      </button>
    </app-modal-window>
  </div>
</template>

<script>
import { mapActions, mapGetters, mapMutations } from 'vuex'

import AppModalWindow from '@/components/ui/AppModalWindow.vue'
import AppPreloader from '@/components/ui/AppPreloader.vue'

export default {
  components: {
    AppModalWindow,
    AppPreloader,
  },
  props: {
    show: {
      type: Boolean,
      required: true,
      default: () => false,
    },
    subjectID: {
      type: Number,
      required: true,
      default: () => 0,
    },
  },
  computed: {
    ...mapGetters({
      topics: 'topics/searchResults',
      alert: 'alert/alert',
    }),
  },
  data() {
    return {
      showPreloader: false,
      search: {
        words: '',
        confirmed: 1,
        searched: false,
      },
    }
  },
  watch: {
    show() {
      this.setSearchResults([])
    },
  },
  methods: {
    ...mapActions({
      setAlert: 'alert/set',
      searchTopicsAction: 'topics/search',
    }),
    ...mapMutations({
      setSearchResults: 'topics/setSearchResults',
    }),
    async searchTopics() {
      const {
        search: { confirmed },
        search: { words: name },
        subjectID: subject,
      } = this

      try {
        this.search.words = name
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
  },
}
</script>

<style lang="less" scoped>
.app-ask-subject {
  .title, .content {
    width: 100vw;
    max-width: 500px;
  }

  .title {
    font-size: 1.3em;
    border-bottom: 1px solid var(--color-bg-main);
    padding: 20px;
  }

  .search-type {
    margin: 15px;
    color: var(--color-font-dark);

    span {
      color: var(--color-accent-red);
    }

    &.confirmed {
      span {
        color: var(--color-accent-green);
      }
    }
  }

  .search-bar {
    width: 100%;
    display: grid;
    grid-template-columns: 1fr 70px 70px;
    border-bottom: 1px solid var(--color-bg-main);

    input {
      width: 100%;
      height: 100%;

      color: var(--color-font-main);

      &::placeholder {
        color: var(--color-font-dark);
      }
    }

    input,
    button {
      padding: 15px;
      font-size: 1em;
      border: 0;
      background: transparent;
    }

    button {
      cursor: pointer;
    }

    .type {
      color: var(--color-accent-red);

      &.confirmed {
        color: var(--color-accent-green);
      }
    }

    .search {
      color: var(--color-font-main);
    }

    .search,
    .type {
      border-left: 1px solid var(--color-bg-main);
    }
  }

  .content {
    max-height: 60vh;
    overflow-y: auto;

    .no-topics {
      font-size: 1.3em;
      color: var(--color-font-dark);
      text-align: center;
      margin: 40px 20px;
    }

    .topic {
      padding: 20px;
      cursor: pointer;
      user-select: none;

      &:hover {
        background: var(--color-bg-main);
      }

      .name {
        font-size: 1.3em;
        margin-bottom: 5px;
      }

      .is-verified {
        &.not-verified {
          color: var(--color-accent-red);
        }

        &.verified {
          color: var(--color-accent-green);
        }
      }
    }
  }

  .cancel {
    width: 100%;
    padding: 20px;
    font-size: 1em;

    border: 0;
    border-top: 1px solid var(--color-bg-main);
    background: transparent;
    color: var(--color-accent-red);
    cursor: pointer;

    &:hover {
      background: var(--color-bg-main);
    }
  }
}
</style>
