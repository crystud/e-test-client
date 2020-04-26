<template>
  <div>
    <app-preloader :show="showPreloader"></app-preloader>

    <app-test-create-level
      :show="showCreateLevel && !showPreloader"
      :testID="test.id"
      @close="showCreateLevel = false"
      @created="
        loadTestInfo()
      "
    ></app-test-create-level>

    <app-modal-window
      :show="show && !alert.show && !showCreateLevel"
      :noPaddings="true"
    >
      <div class="app-test-ask-level">
        <div class="title">
          <span class="text">Оберіть рівень для заповнення</span>

          <div class="count">{{test.levels.length || 0}} рівнів</div>
        </div>

        <div class="levels-list-wrap">
          <div
            class="no-levels"
            v-if="test.levels.length === 0"
          >В тесті ще немає рівнів</div>

          <div
            class="list"
            v-if="test.levels.length"
          >
            <div
              v-for="(level, index) in levelsList"
              :key="index"
              class="level"
              @click="$emit('selected', level)"
            >
              <div class="name">{{level.title}}</div>

              <div class="additional">
                <span class="questions-count">К-сть питань: {{level.countOfTask}}</span>
                <span class="difficulty">Складність: {{level.difficult}}</span>
              </div>
            </div>
          </div>
        </div>

        <div class="btns">
          <button
            class="leave"
            @click="$router.push({ name: 'TeacherOwnTests' })"
          >Назад до тестів</button>

          <button
            class="create"
            @click="showCreateLevel = true"
          >Створити рівень</button>
        </div>
      </div>
    </app-modal-window>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'

import AppModalWindow from '@/components/ui/AppModalWindow.vue'
import AppPreloader from '@/components/ui/AppPreloader.vue'
import AppTestCreateLevel from '@/components/templates/teacher/AppTestCreateLevel.vue'

export default {
  components: {
    AppModalWindow,
    AppPreloader,
    AppTestCreateLevel,
  },
  props: {
    show: {
      type: Boolean,
      required: true,
      default: () => false,
    },
    testID: {
      type: Number,
      required: true,
      default: () => 0,
    },
  },
  data() {
    return {
      showPreloader: false,
      showCreateLevel: false,
      levelsList: [],
    }
  },
  computed: {
    ...mapGetters({
      alert: 'alert/alert',
      test: 'tests/test',
    }),
  },
  methods: {
    ...mapActions({
      getTestByID: 'tests/getTestByID',
      setAlert: 'alert/set',
      getLevelsByIDs: 'levels/getByIDs',
    }),
    async loadTestInfo() {
      try {
        const { testID } = this

        this.showPreloader = true

        await this.getTestByID(testID)

        const { test: { levels } } = this

        this.levelsList = await this.getLevelsByIDs(levels)
      } catch (e) {
        this.setAlert({
          title: 'Помилка',
          text: 'Нам не вдалось отримати дані про тест',
          delay: 2000,
          show: true,
          isSuccess: false,
        })
      } finally {
        this.showPreloader = false
      }
    },
  },
  async created() {
    await this.loadTestInfo()
  },
}
</script>

<style lang="less" scoped>
.app-test-ask-level {
  width: 100%;
  max-width: 500px;

  .title {
    padding: 30px 0;
    display: grid;
    grid-gap: 20px;
    grid-template-columns: auto auto;
    align-items: center;
    justify-content: space-between;

    .text {
      display: inline-block;
      padding: 10px 20px;
      font-size: 1.3em;
      background: var(--color-accent-green);
      border-radius: 0 10px 10px 0;
    }

    .count {
      color: var(--color-font-dark);

      text-align: right;
      padding-right: 20px;
    }
  }

  .levels-list-wrap {
    max-height: 60vh;
    overflow-y: auto;

    .no-levels {
      margin: 30px;
      color: var(--color-font-dark);
      text-align: center;
      font-size: 1.4em;
    }

    .level {
      padding: 20px;
      transition: none;
      cursor: pointer;

      &:hover {
        background: var(--color-bg-main);
      }

      .name {
        font-size: 1.2em;
        margin-bottom: 5px;
      }

      .additional {
        color: var(--color-font-dark);

        span:first-child {
          margin-right: 10px;
        }
      }
    }
  }

  .btns {
    display: grid;
    grid-template-columns: 1fr 1fr;
    border-top: 1px solid var(--color-bg-main);

    margin-top: 60px;

    button {
      padding: 20px;
      background: transparent;
      border: 0;
      font-size: 1em;
      cursor: pointer;

      &:hover {
        background: var(--color-bg-main);
      }

      &.leave {
        color: var(--color-font-dark);
      }

      &.create  {
        color: var(--color-accent-green);
      }
    }
  }
}
</style>
