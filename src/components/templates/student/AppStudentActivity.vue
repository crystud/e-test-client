<template>
  <app-user-card class="app-student-activity">
    <div class="title">Активність тестування</div>

    <app-data-list
      class="data"
      :data="data"
    ></app-data-list>
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
.app-student-activity {
  font-weight: 300;

  .title {
    font-size: 1.5em;
    margin-bottom: 20px;
  }
}
</style>
