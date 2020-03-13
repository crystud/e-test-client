<template>
  <app-user-card class="app-student-activity">
    <div class="title">Активність тестування</div>

    <div class="data">
      <div
        class="item"
        v-for="([name, value], index) in data"
        v-bind:key="index"
      >
        <div class="name">{{name}}</div>
        <div class="value">{{value}}</div>
      </div>
    </div>
  </app-user-card>
</template>

<script>
import AppUserCard from './AppUserCard.vue'

export default {
  name: 'AppStudentActivity',
  components: {
    AppUserCard,
  },
  props: {
    data: {
      type: Array,
      required: true,
      default: () => [],
    },
  },
}
</script>

<style lang="less">
.app-student-activity {
  font-weight: 100;

  .title {
    font-size: 1.5em;
    margin-bottom: 20px;
  }

  .data {
    .item {
      display: grid;
      grid-template-columns: 1fr 1fr;
      grid-gap: 20px;

      margin-bottom: 10px;
      align-items: center;

      .name {
        color: var(--color-font-dark);
      }

      .value {
        color: var(--color-font-main);
      }
    }
  }
}
</style>
