<template>
  <div class="app-test-results">
    <app-preloader :show="showPreloader"></app-preloader>

    <template v-if="result.id">
      <div class="results-wrap">
        <div class="student-info">
          <div class="wrap">
            <div class="profile-image">
              <img
                src="https://www.thispersondoesnotexist.com/image"
                alt="student's profile image"
              />
            </div>

            <div class="info">
              <div class="name">{{self.lastName}} {{self.firstName}}</div>
              <div class="last-visit">В мережі</div>
            </div>
          </div>
        </div>

        <div class="results-list">
          <div
            v-for="([ label, value ], index) in [
              ['Оцінка (%)', `${result.percent}`],
              ['Час', getPassingTime(result.attempt.startTime, result.attempt.endTime)],
              ['Вірних', '-'],
              ['Невірних', '-'],
            ]"
            v-bind:key="index"
            class="item"
          >
            <div class="value">{{value}}</div>
            <div class="label">{{label}}</div>
          </div>
        </div>
      </div>

      <div class="answers-list">
        <app-student-answer
          v-for="(answer, index) in result.resultTasks"
          v-bind:key="index"
          :answer="answer"
        ></app-student-answer>
      </div>
    </template>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'

import AppStudentAnswer from '@/components/templates/tests/AppStudentAnswer.vue'
import AppPreloader from '@/components/ui/AppPreloader.vue'

export default {
  computed: {
    ...mapGetters({
      self: 'user/info',
    }),
  },
  methods: {
    ...mapActions({
      getResults: 'results/getByID',
      setAlert: 'alert/set',
    }),
    getPassingTime(startTime, endTime) {
      const difference = new Date(endTime).getTime() - new Date(startTime).getTime()
      const differenceInSeconds = Math.round(difference / 1000)

      const hours = Math.floor(differenceInSeconds / 3600)
      const minutes = Math.floor((differenceInSeconds - (hours * 3600)) / 60)
      const seconds = differenceInSeconds % 60

      const hoursText = hours > 0 ? `${hours} год. ` : ''

      return `${hoursText}${minutes} хв. ${seconds} сек.`
    },
    async loadResults() {
      const { params: { resultID: rawResultID } } = this.$route

      const resultID = Number(rawResultID)

      if (!resultID) {
        this.setAlert({
          title: 'Помилка',
          text: 'Не вдалось оприділити ID спроби...',
          isSuccess: false,
          show: true,
        })

        return
      }

      try {
        this.showPreloader = true

        this.result = await this.getResults(resultID)
      } catch (e) {
        this.setAlert({
          title: 'Помилка',
          text: 'Не вдалось отримати результати...',
          show: true,
          isSuccess: false,
        })
      } finally {
        this.showPreloader = false
      }
    },
  },
  created() {
    this.loadResults()
  },
  data() {
    return {
      showPreloader: false,
      result: {},
    }
  },
  components: {
    AppPreloader,
    AppStudentAnswer,
  },
}
</script>

<style lang="less" scoped>
@small: ~"screen and (max-width: 1050px)";
@medium: ~"screen and (max-width: 1200px)";
@large: ~"screen and (min-width: 1250px)";

.app-test-results {
  .results-wrap {
    margin: 20px 0;

    display: grid;
    grid-template-columns: 300px 1fr;
    grid-gap: 15px;

    .student-info {
      display: flex;
      align-items: center;
      justify-content: center;

      background: var(--color-bg-dark);
      border-radius: 10px;
      padding: 20px;

      .wrap {
        display: grid;
        grid-template-columns: 50px 1fr;
        grid-gap: 10px;

        align-items: center;

        .name {
          font-size: 1.1em;
          color: var(--color-font-main);
        }

        .last-visit {
          color: var(--color-accent-green);
          margin-top: 5px;
        }

        .profile-image {
          width: 50px;
          height: 50px;
          overflow: hidden;
          border-radius: 50%;

          img {
            width: 100%;
          }
        }
      }
    }

    @media screen and (max-width: 800px) {
      grid-template-columns: 1fr;

      .student-info {
        padding: 30px;

        .wrap {
          grid-gap: 20px;
        }
      }
    }
  }

  .results-list {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    grid-gap: 20px;

    justify-content: space-between;

    background: var(--color-bg-dark);
    border-radius: 10px;
    padding: 15px 0;

    justify-content: center;

    @media @medium {
      grid-template-columns: 1fr 1fr 1fr;
    }

    @media @small {
      grid-template-columns: 1fr 1fr;
    }

    .item {
      width: 100%;
      text-align: center;

      font-size: 1.2em;
      font-weight: 300;

      .label {
        color: var(--color-font-dark);
      }

      .value {
        color: var(--color-font-main);
        font-size: 1.3em;
      }
    }
  }

  .answers-list {
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-gap: 20px;

    @media @small {
      grid-template-columns: 1fr;
    }
  }
}
</style>
