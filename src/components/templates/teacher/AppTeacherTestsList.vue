<template>
  <div class="app-teacher-tests-list">
    <div class="header">
      <span class="title">{{title}}</span>

      <span
        class="total"
        v-show="totalCount"
      >{{totalCount}} тестів</span>
    </div>

    <div class="content">
      <router-link
        v-for="({ name, questionsCount }, index) in tests"
        :key="index"
        :to="{ name: 'createTest' }"
        class="test"
      >
        <div class="name">{{name}}</div>
        <div class="questions-count">{{questionsCount}} запитань</div>
      </router-link>
    </div>

    <button class="see-all">Переглянути всі</button>
  </div>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      required: true,
      default: () => '',
    },
    tests: {
      type: Array,
      required: true,
      default: () => [],
    },
    totalCount: {
      type: Number,
      required: false,
      default: () => null,
    },
  },
}
</script>

<style lang="less" scoped>
.app-teacher-tests-list {
  background: var(--color-bg-dark);
  border-radius: 10px;

  .paddings {
    padding: 20px;
  }

  .header {
    display: flex;
    justify-content: space-between;

    border-bottom: 1px solid var(--color-bg-main);

    .paddings();

    .total {
      color: var(--color-font-dark);
    }
  }

  .content {
    .test {
      font-weight: 100;
      padding: 15px 20px;
      cursor: pointer;
      display: block;

      .name {
        font-size: 1.3em;
      }

      .questions-count {
        color: var(--color-font-dark);
        margin-top: 5px;
      }

      &:hover {
        .name {
          color: #1ED6BA;
        }
      }
    }
  }

  .see-all {
    border: 0;

    width: 100%;
    border-top: 1px solid var(--color-bg-main);
    background: transparent;
    color: var(--color-font-dark);
    cursor: pointer;
    font-size: 1em;

    .paddings();

    &:hover {
      color: var(--color-font-main);
    }
  }
}
</style>
