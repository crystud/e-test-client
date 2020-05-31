<template>
  <div class="app-test-info">
    <app-preloader :show="showPreloader"></app-preloader>

    <app-fade-card :show="Boolean(test.id)">
      <div class="wrap">
        <div class="name">{{test.name}}</div>

        <div class="fill">
          <div class="label">
            Тест заповнено на {{filled}}%
          </div>

          <div class="bar">
            <div
              class="value"
              :style="{
                width: `${filled}%`
              }"
            ></div>
          </div>
        </div>

        <div
          class="status"
          :class="{
            allowed: filled >= 100,
            denied: filled < 100,
          }"
        >
          <span v-if="filled < 100">В тесті недостатньо питань</span>
          <span v-else>Тест заповнено достатньо</span>
        </div>
      </div>
    </app-fade-card>
  </div>
</template>

<script>
import { mapActions } from 'vuex'

import AppFadeCard from '@/components/ui/AppFadeCard.vue'
import AppPreloader from '@/components/ui/AppPreloader.vue'

export default {
  data() {
    return {
      showPreloader: false,
      test: {},
    }
  },
  computed: {
    filled() {
      const { test } = this

      if (!test.id) {
        return 0
      }

      const filled = (test.tasks.length / test.countOfTasks) * 100

      return filled >= 100 ? 100 : filled.toFixed(3)
    },
  },
  methods: {
    ...mapActions({
      getTest: 'tests/getTestByID',
      setAlert: 'alert/set',
    }),
    sendState() {
      const { filled } = this

      this.$emit('filledStateUpdate', filled)
    },
    async loadTest() {
      try {
        const { testID } = this

        this.showPreloader = true

        this.test = await this.getTest(testID) || {}

        this.sendState()
      } catch (e) {
        this.setAlert({
          title: 'Помилка',
          text: 'Не вдалось отримати інформацію про тест...',
          isSuccess: false,
          show: true,
        })
      } finally {
        this.showPreloader = false
      }
    },
  },
  watch: {
    testID() {
      const { testID } = this

      if (testID) {
        this.loadTest(testID)
      } else {
        this.test = {}
      }
    },
  },
  props: {
    testID: {
      type: Number,
      required: true,
    },
  },
  components: {
    AppFadeCard,
    AppPreloader,
  },
  created() {
    this.sendState()
  },
}
</script>

<style lang="less" scoped>
.app-test-info {
  .wrap {
    background: var(--color-bg-main);
    border-radius: 10px;
    padding: 25px;

    margin: 10px 0 20px;

    .name {
      font-size: 1.2em;
      font-weight: bold;
      margin-bottom: 10px;
    }

    .fill {
      margin-bottom: 10px;

      .label {
        color: var(--color-font-dark);
      }

      .bar {
        width: 100%;
        height: 7px;
        overflow: hidden;

        margin-top: 10px;

        background: var(--color-bg-dark);

        &, .value {
          border-radius: 10px;
        }

        .value {
          background: var(--color-accent-green);
          height: 100%;
          transition: all .3s;
        }
      }
    }

    .status {
      margin-top: 15px;

      &.allowed { color: var(--color-accent-green) }
      &.denied { color: var(--color-accent-red) }
    }
  }
}
</style>
