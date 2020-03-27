<template>
  <div class="app-questions-list">
    <div class="title">Запитання</div>

    <div
      class="list"
      :class="{
        'has-selected': active !== null,
      }"
    >
      <div
        v-for="i in 20"
        v-bind:key="i"
        class="question"
        :class="{
          'active': i === active,
        }"
        @click="active = i"
      >
        Запитання №{{i}}
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      active: null,
    }
  },
}
</script>

<style lang="less" scoped>
.app-questions-list {
  max-height: 95vh;
  overflow: auto;

  .title,
  .question {
    padding: 15px 18px;
    border-bottom: 1px solid var(--color-bg-main);
  }

  .title {
    font-size: 1.15em;
    font-weight: 400;
  }

  .list {
    .question {
      color: var(--color-font-main);
      cursor: pointer;

      position: relative;

      &.active {
        color: var(--color-font-main) !important;

        &::before {
          content: "";

          position: absolute;
          top: 0;
          left: 0;
          bottom: 0;

          margin: auto;

          height: 40%;
          max-height: 50px;
          width: 3px;

          background: #1AD879;
          border-radius: 10px;
        }
      }

      transition: all .3s;
    }

    &.has-selected {
      .question {
        color: var(--color-font-dark);
      }
    }
  }
}
</style>
