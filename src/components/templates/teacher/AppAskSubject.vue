<template>
  <div class="app-ask-subject">
    <app-preloader :show="showPreloader"></app-preloader>

    <app-modal-window
      :show="show && !showPreloader && !alert.show"
      :noPaddings="true"
    >
      <div class="title">Оберіть предмет</div>

      <div class="content">
        <div
          v-if="!subjects.length"
          class="no-subjects"
        >Вам не призначено жодного предмету...</div>

        <div class="list">
          <div
            v-for="(subject, index) in subjects"
            :key="index"
            class="subject"
            @click="$emit('selected', subject)"
          >
            <div class="name">{{subject.name}}</div>

            <div
              class="is-verified"
              :class="{
                'verified': subject.confirmed,
                'not-verified': !subject.confirmed,
              }"
            >
              {{subject.confirmed ? 'Верифікований предмет' : 'Неверифікований предмет'}}
            </div>
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
      subjects: 'studies/list',
      alert: 'alert/alert',
    }),
  },
  data() {
    return {
      showPreloader: false,
    }
  },
  methods: {
    ...mapActions({
      getTeacherSubjects: 'studies/getAll',
      fetchSelf: 'user/fetchSelf',
    }),
    async checkCurrentState() {
      const { show } = this

      if (show) {
        this.showPreloader = true

        await this.fetchSelf()
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
    font-size: 1.3em;
    border-bottom: 1px solid var(--color-bg-main);
    padding: 20px;
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
        margin-bottom: 5px;
        font-weight: 400;
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
