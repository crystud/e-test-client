<template>
  <app-user-card class="app-student-activity">
    <div class="title">Активність тестування</div>

    <app-data-list
      class="data"
      :data="data"
    ></app-data-list>

    <div
      v-if="fullIsOpened !== null"
      class="check-full"
      @click="$emit('setFullHistory', !fullIsOpened)"
    >{{ getHistoryText() }}</div>
  </app-user-card>
</template>

<script>
import AppUserCard from './AppUserCard.vue'
import AppDataList from '../../ui/AppDataList.vue'

export default {
  name: 'AppStudentActivity',
  components: {
    AppUserCard,
    AppDataList,
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

<style lang="less" scoped>
.app-student-activity {
  font-weight: 300;

  .title {
    font-size: 1.5em;
    margin-bottom: 20px;
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
