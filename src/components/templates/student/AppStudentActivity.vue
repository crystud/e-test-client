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

    <div
      v-if="fullIsOpened !== null"
      class="check-full"
      @click="$emit('setFullHistory', !fullIsOpened)"
    >{{ getHistoryText() }}</div>
  </app-user-card>
</template>

<script>
import AppUserCard from './AppUserCard.vue'

export default {
  name: 'AppStudentActivity',
  components: {
    AppUserCard,
  },
  methods: {
    getHistoryText() {
      return this.fullIsOpened
        ? 'Приховати історію проходження тестів'
        : 'Переглянути історію проходження тестів'
    },
  },
  props: {
    data: {
      type: Array,
      required: true,
      default: () => [],
    },
    fullIsOpened: {
      type: Boolean,
      required: false,
      default: () => null,
    },
  },
}
</script>

<style lang="less">
.app-student-activity {
  font-weight: 300;

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

  .check-full {
    user-select: none;
    margin-top: 20px;
    color: var(--color-font-main);
    cursor: pointer;
    font-weight: 400;

    &:hover {
      text-decoration: underline;
    }
  }
}
</style>
