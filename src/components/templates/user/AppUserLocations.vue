<template>
  <div class="app-user-locations">
    <div
      v-for="([location, times], index) in data"
      v-bind:key="index"
      class="row"
    >
      <div class="highlight">{{times}}</div>
      <div class="text">{{location}}</div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      data: [
        ['Kolomyia, UA', 127],
        ['Zalupa #1', 85],
        ['Zalupa #2', 73],
        ['Zalupa #3', 62],
      ],
    }
  },
}
</script>

<style lang="less" scoped>
.app-user-locations {
  width: 100%;

  .row {
    display: grid;
    grid-template-columns: auto 1fr;
    grid-gap: 10px;
    align-items: center;
    padding: 15px;

    .highlight {
      background: #1ED6BA;
      color: #fff;
      padding: 5px 10px;
      border-radius: 5px;
    }

    .text {
      color: var(--color-font-main);
    }
  }
}
</style>
