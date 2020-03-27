<template>
  <div class="app-test-history">
    <div class="title">Історія</div>

    <div class="list">
      <div
        class="student"
        v-for="i in 7"
        v-bind:key="i"
      >
        <div class="info">
          <div class="name">Студент студентович</div>
          <div class="time">14 хв. тому</div>
        </div>

        <div class="result">
          <div class="text">{{(Math.random() * 100).toFixed(2)}}%</div>
        </div>
      </div>
    </div>

    <div class="load-more">
      <app-button
        appearance="neutral"
        class="app-button"
      >Більше</app-button>
    </div>
  </div>
</template>

<script>
import AppButton from '../../ui/AppButton.vue'

export default {
  components: {
    AppButton,
  },
}
</script>

<style lang="less" scoped>
.app-test-history {
  color: var(--color-font-main);

  .title {
    padding: 20px;
    font-size: 1.15em;
    border-bottom: 1px solid var(--color-bg-main);
  }

  .student {
    border-bottom: 1px solid var(--color-bg-main);
    padding: 20px;

    display: grid;
    grid-template-columns: 1fr 90px;
    align-items: center;

    &:last-child {
      border-bottom: 0;
    }

    .info {
      .name {
        font-size: 1.1em;
      }

      .time {
        color: var(--color-font-dark);
        margin-top: 5px;
      }
    }

    .result {
      display: flex;
      justify-content: center;

      .text {
        padding: 10px;
        border-radius: 10px;
        background: var(--color-bg-main);
      }
    }
  }

  .load-more {
    padding: 20px;
    display: flex;
    justify-content: center;

    .app-button {
      background: var(--color-bg-main);
      width: 50%;
      transition: none;

      &:hover {
        background: var(--color-bg-light);
      }
    }
  }
}
</style>
