<template>
  <app-card class="app-college-people">
    <div class="title">Вчителі</div>

    <div class="data-list">
      <div class="item">
        <div class="property">Наразі у вас</div>
        <div class="value">39 вчителів</div>
      </div>

      <div class="item">
        <div class="property">Останній імпорт</div>
        <div class="value">21.03.2020 13:47</div>
      </div>
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

export default {
  name: 'AppCollegePeople',
  components: {
    AppCard,
    AppButton,
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
