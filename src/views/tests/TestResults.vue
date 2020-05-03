<template>
  <div class="app-test-results">
    <app-test-header
      :showMinimize="true"
    ></app-test-header>

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
            <div class="name">Студент Студентович</div>
            <div class="last-visit">Не в мережі</div>
          </div>
        </div>
      </div>

      <div class="results-list">
        <div
          v-for="([ label, value ], index) in results"
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
        v-for="i in 7"
        v-bind:key="i"
        :isRight="Math.random() > 0.5"
      ></app-student-answer>
    </div>
  </div>
</template>

<script>
import AppTestHeader from '@/components/templates/tests/AppTestHeader.vue'
import AppStudentAnswer from '@/components/templates/tests/AppStudentAnswer.vue'

export default {
  name: 'AppTestResults',
  data() {
    return {
      results: [
        ['Оцінка', 12],
        ['Час', '12:35'],
        ['Вірних', 3],
        ['Невірних', 3],
        ['Вирішено', '50%'],
      ],
    }
  },
  components: {
    AppTestHeader,
    AppStudentAnswer,
  },
}
</script>

<style lang="less" scoped>
@extrasmall: ~"screen and (max-width: 430px)";
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
          color: var(--color-font-dark);
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
    grid-template-columns: repeat(5, 1fr);
    grid-gap: 20px;

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
