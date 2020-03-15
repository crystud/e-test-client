<template>
  <div class="data-list">
    <div
      v-for="([label, value], index) in data"
      v-bind:key="index"

      class="item"
    >
      <div class="property">{{label}}</div>
      <div class="value">{{value}}</div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'AppDataList',
  props: {
    data: {
      type: Array,
      required: true,
      default: () => [],
    },
  },
}
</script>

<style lang="less" scoped>
.data-list {
  margin: 25px 0;

  .item {
    margin-bottom: 10px;
    display: grid;

    grid-template-columns: minmax(100px, auto) 1fr;
    grid-gap: 15px;

    .property {
      color: var(--color-font-dark);
    }

    .value {
      color: var(--color-font-main);
    }
  }
}
</style>
