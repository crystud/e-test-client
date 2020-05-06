<template>
  <app-user-card class="subjects-info">
    <app-preloader :show="showPreloader"></app-preloader>

    <div class="title">Результати</div>

    <div class="tests" v-if="results.length">
      <div class="row header-title">
        <div class="name">Назва тесту</div>
        <div class="permission">Результат</div>
      </div>

      <div
        class="row cursor-pointer"
        v-for="(result, index) in results"
        :key="index"
        @click="$router.push({
          params: { id },
          name: 'testResults',
        })"
      >
        <div class="name">{{result}}</div>

        <div
          class="permission result-score"
          :class="getResultClasses(result.persents)"
        >Результат: {{result.persents}}%</div>
      </div>
    </div>
  </app-user-card>
</template>

<script>
import { mapActions } from 'vuex'

import AppPreloader from '@/components/ui/AppPreloader.vue'

import AppUserCard from './AppUserCard.vue'

export default {
  name: 'AppStudentSubjects',
  components: {
    AppUserCard,
    AppPreloader,
  },
  methods: {
    ...mapActions({
      getUserResults: 'user/getResults',
    }),
    getResultClasses(result) {
      return result !== null ? {
        bad: result < 60,
        warning: result >= 60 && result <= 70,
        good: result > 70,
      } : {
        neutral: true,
      }
    },
    async loadResults() {
      this.showPreloader = false

      this.results = await this.getUserResults() || []

      this.showPreloader = false
    },
  },
  data() {
    return {
      showPreloader: false,
      results: [],
    }
  },
  async created() {
    await this.loadResults()

    this.showPreloader = false
  },
}
</script>

<style lang="less" scoped>
.subjects-info {
  margin-bottom: 20px;

  .title {
    font-size: 1.5em;
    font-weight: 300;
  }

  .tests {
    margin-top: 20px;

    .row {
      display: grid;
      grid-template-columns: 1fr 150px;

      padding: 7px 0;

      &.cursor-pointer {
        cursor: pointer;

        &:hover {
          .name {
            text-decoration: underline;
          }
        }
      }

      &.header-title {
        color: var(--color-font-dark);
      }

      @media screen and (max-width: 500px) {
        grid-template-columns: 1fr;
        grid-gap: 10px;

        margin-bottom: 20px;
        padding: 20px 0;
        border-bottom: 1px solid var(--color-bg-main);

        .name {
          font-size: 1.3em;
        }

        &:last-child {
          border-bottom: 0;
        }
      }
    }
  }

  .result-score {
    &.bad { color: #E01616 }
    &.warning { color: #FC7136 }
    &.good { color: #1ED6BA }
    &.neutral { color: var(--color-font-dark) }
  }
}
</style>
