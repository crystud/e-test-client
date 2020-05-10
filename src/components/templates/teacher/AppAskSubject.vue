<template>
  <div class="app-ask-subject">
    <app-preloader :show="showPreloader"></app-preloader>

    <app-modal-window
      :show="show && !showPreloader && !alert.show"
      :noPaddings="true"
    >
      <div class="title">
        <div class="text">
          Оберіть предмет
        </div>

        <div
          class="refresh"
          @click="checkCurrentState"
        >
          <font-awesome-icon icon="redo"></font-awesome-icon>
        </div>
      </div>

      <div class="content">
        <div
          v-if="!subjects.length"
          class="no-subjects"
        >Вам не призначено жодного предмету...</div>

        <div class="list">
          <div
            v-for="({ subject }, index) in subjects"
            :key="index"
            class="subject"
            @click="$emit('selected', subject)"
          >
            <div class="name">{{subject.name}}</div>
          </div>
        </div>
      </div>

      <router-link
        class="leave"
        :to="{ name: 'homeUser' }"
      >Перейти до домівки</router-link>
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
  },
  computed: {
    ...mapGetters({
      alert: 'alert/alert',
      subjects: 'user/subjects',
    }),
  },
  data() {
    return {
      showPreloader: false,
    }
  },
  methods: {
    ...mapActions({
      getTeacherSubjects: 'user/getSubjects',
    }),
    async checkCurrentState() {
      const { show } = this

      if (show) {
        this.showPreloader = true

        await this.getTeacherSubjects()

        this.showPreloader = false
      }
    },
  },
  watch: {
    async show() {
      this.checkCurrentState()
    },
  },
  created() {
    this.checkCurrentState()
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
    border-bottom: 1px solid var(--color-bg-main);
    padding: 20px;

    display: grid;
    grid-template-columns: 1fr auto;

    .text {
      font-size: 1.3em;
    }

    .refresh {
      font-size: 1.2em;
      color: var(--color-font-dark);
      text-align: center;
      cursor: pointer;

      transform: scale(1);
      transition: all .15s;

      &:hover {
        box-shadow: 0px 0px 10px rgba(0, 0, 0, .3);

        color: var(--color-font-main);
        transform: scale(1.2);
      }
    }
  }

  .content {
    .no-subjects {
      font-size: 1.3em;
      color: var(--color-font-dark);
      text-align: center;
      margin: 40px 20px;
    }

    .subject {
      padding: 20px;
      cursor: pointer;
      user-select: none;

      &:hover {
        background: var(--color-bg-main);
      }

      .name {
        font-size: 1.3em;
        font-weight: 100;
      }

      .confirmed {
        &.is {
          color: var(--color-accent-green);
        }

        &.is-not {
          color: var(--color-accent-red);
        }
      }
    }
  }

  .leave {
    width: 100%;
    padding: 20px;
    font-size: 1em;
    display: block;
    text-align: center;

    border: 0;
    border-top: 1px solid var(--color-bg-main);
    background: transparent;
    color: var(--color-font-dark) !important;
    cursor: pointer;

    &:hover {
      background: var(--color-bg-main);
    }
  }
}
</style>
