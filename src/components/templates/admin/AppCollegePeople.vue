<template>
  <app-card class="app-college-people">
    <div class="title">Вчителі</div>

    <div class="data-list">
      <app-data-list
        :data="[
          ['Наразі у вас', '39 вчителів'],
          ['Останній імпорт', '21.03.2020 13:47'],
        ]"
      ></app-data-list>
    </div>

    <app-button
      class="import-btn"
      appearance="neutral"
    >Імпортувати вчителів</app-button>
  </app-card>
</template>

<script>
import AppCard from '../../ui/AppCard.vue'
import AppButton from '../../ui/AppButton.vue'
import AppDataList from '../../ui/AppDataList.vue'

export default {
  name: 'AppCollegePeople',
  components: {
    AppCard,
    AppButton,
    AppDataList,
  },
}
</script>

<style lang="less" scoped>
.app-college-people {
  padding: 20px;
  font-weight: 300;

  .title {
    font-size: 1.1em;
    color: var(--color-font-main);
  }

  .data-list {
    margin: 20px 0;

    .item {
      display: grid;
      grid-template-columns: 150px auto;
      grid-gap: 15px;

      margin-bottom: 10px;

      .property {
        color: var(--color-font-dark);
      }

      .value {
        color: var(--color-font-main);
      }
    }
  }

  .import-btn {
    width: 100%;
    margin-top: 10px;
  }
}
</style>
