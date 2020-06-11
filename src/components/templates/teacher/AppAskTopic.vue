<template>
  <div class="app-ask-subject">
    <app-preloader :show="showPreloader"></app-preloader>

    <app-modal-window
      :show="show && !showPreloader && !alert.show"
      :noPaddings="true"
    >
      <div class="header">
        <div class="title">Оберіть тему</div>

        <button class="refresh">
          <font-awesome-icon icon="redo"></font-awesome-icon>
        </button>
      </div>

      <div class="content">
        <div
          class="no-topics"
          v-if="!topics.length"
        >Тем в предметі немає...</div>

        <div class="list">
          <div
            v-for="(topic, index) in topics"
            :key="index"
            class="topic"
            @click="$emit('selected', topic)"
          >
            <div class="name">{{topic.name}}</div>
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
import { mapActions, mapGetters } from 'vuex'

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
      alert: 'alert/alert',
    }),
    topics() {
      const { subject: { topics } = {} } = this

      return topics || []
    },
  },
  data() {
    return {
      showPreloader: false,
      subject: {},
      search: {
        words: '',
        confirmed: 1,
        searched: false,
      },
    }
  },
  watch: {
    show() {
      if (this.show) {
        this.loadSubject()
      }
    },
  },
  methods: {
    ...mapActions({
      setAlert: 'alert/set',
      getSubject: 'subjects/getByID',
    }),
    async loadSubject() {
      try {
        const { subjectID } = this

        this.showPreloader = true

        this.subject = await this.getSubject(subjectID)
      } catch (e) {
        const text = e?.response.data.message || 'Нам не вдалось отримати список тем'

        this.setAlert({
          title: 'Помилка',
          text,
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
  .header, .content {
    width: 100vw;
    max-width: 500px;
  }

  .header {
    display: grid;
    grid-template-columns: 1fr auto;
    grid-gap: 20px;
    align-items: center;

    border-bottom: 1px solid var(--color-bg-main);
    padding: 15px;

    .title {
      font-size: 1.3em;
    }

    button {
      background: transparent;
      color: var(--color-font-dark);
      font-size: 1em;
      padding: 10px;
      border: 0;
      cursor: pointer;

      transform: scale(1);
      transition: all .15s;

      &:hover {
        color: var(--color-font-main);
        transform: scale(1.3);
      }
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
