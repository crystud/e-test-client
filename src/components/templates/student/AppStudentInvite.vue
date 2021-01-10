<template>
  <app-user-card class="app-student-activity">
    <div class="title">Інвайт студента</div>

    <app-data-list
      class="data"
      :data="[
        ['Код', data.code],
        ['Дата створення', $moment(data.createAt).utc(true).format('Do MMMM YYYY, HH:mm')],
        ['Створив', `${data.creator.lastName} ${data.creator.firstName} ${data.creator.patronymic}`]
      ]"
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
      type: Object,
      required: true,
      default: () => ({
        code: '',
        creator: {},
      }),
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
