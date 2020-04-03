<template>
  <div class="app-user-current-session">
    <div
      v-for="([name, value], index) in data"
      v-bind:key="index"
      class="row"
    >
      <span class="name">{{name}}</span>
      <span class="value">{{value}}</span>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      data: [
        ['IP', '195.95.147.51'],
        ['Локація', 'Kolomyia, UA'],
        ['Опер. сист.', 'Mac OS X'],
        ['Вирішення екрану', '1920х1080'],
      ],
    }
  },
}
</script>

<style lang="less" scoped>
.app-user-current-session {
  width: 100%;

  .row {
    border-bottom: 1px solid var(--color-bg-main);
    padding: 15px;

    .name {
      margin-right: 10px;
      color: var(--color-font-dark);
    }

    .value {
      color: var(--color-font-main);
    }

    @media screen and (max-width: 350px) {
      span {
        display: block;
      }

      .name {
        margin-right: 0;
        margin-bottom: 10px;
      }
    }
  }
}
</style>
