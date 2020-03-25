<template>
  <div class="app-edbo-data">
    <div class="title">Дані ЄДЕБО</div>

    <div class="data">
      <app-data-list
        class="list"
        :data="[
          ['Назва коледжу', 'Коломийський ПК НУ “Львівська політехніка”'],
          ['Директор', 'Ляшеник Андрій Васильович'],
          ['E-mail', 'polynet100@gmail.com'],
          ['Веб-сайт', 'kpk-lp.com.ua'],
          ['Код закладу', '428'],
          ['Ідентифікаційний код', '20544802'],
        ]"
      ></app-data-list>
    </div>
  </div>
</template>

<script>
import AppDataList from '../../ui/AppDataList.vue'

export default {
  components: {
    AppDataList,
  },
}
</script>

<style lang="less" scoped>
.app-edbo-data {
  .title {
    font-size: 1.2em;
    color: var(--color-font-dark);

    margin-bottom: 10px;
  }

  .data {
    border: 1px solid var(--color-bg-main);
    border-left: 0;
    border-right: 0;

    .list {
      margin: 15px 0;
    }
  }
}
</style>
