<template>
  <app-card class="specialty">
    <div class="title">Фізкультура</div>

    <app-data-list
      :data="[
        ['Студентів вивчає', '150'],
      ]"
    ></app-data-list>
  </app-card>
</template>

<script>
import AppCard from '../../ui/AppCard.vue'
import AppDataList from '../../ui/AppDataList.vue'

export default {
  name: 'AppSpecialty',
  components: {
    AppCard,
    AppDataList,
  },
}
</script>

<style lang="less" scoped>
.specialty {
  padding: 30px;
  font-weight: 100;

  position: relative;

  &::before {
    content: "";

    display: block;
    width: 4px;
    height: 20%;
    border-radius: 10px;

    position: absolute;
    bottom: 0;
    left: 0;
    top: 0;

    margin: auto;

    background: #1ED6BA;
  }

  .title {
    font-size: 1.3em;
    color: var(--color-font-main);
  }
}
</style>
