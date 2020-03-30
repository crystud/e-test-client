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
    },
  },
}
</script>

<style lang="less" scoped>
.data-list {
  margin: 25px 0;

  .item {
    margin-bottom: 10px;
    display: flex;
    flex-wrap: wrap;
    align-items: center;

    grid-gap: 15px;

    .property {
      color: var(--color-font-dark);
      margin-right: 10px;
    }

    .value {
      color: var(--color-font-main);
    }
  }
}
</style>
