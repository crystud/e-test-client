<template>
  <app-card class="specialty">
    <div class="title">Інженерія програмного забезпечення</div>

    <app-data-list
      :data="[
        ['Скорочена назва', 'П'],
        ['Студентів', '169'],
      ]"
    ></app-data-list>

    <router-link
      :to="{
        name: 'assigning',
        params: {
          specialtyID: 1,
        },
      }"
      class="study-plan"
    >Навчальний план</router-link>
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
  font-weight: 300;

  position: relative;

  &::before {
    content: "";

    display: block;
    width: 20%;
    height: 3px;
    border-radius: 10px;

    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    margin: auto;

    background: #1ED6BA;
  }

  .title {
    font-size: 1.3em;
    color: var(--color-font-main);
  }

  .study-plan {
    padding-left: 15px;
    position: relative;

    color: var(--color-font-main);

    &::before {
      content: "";

      display: block;
      width: 2px;
      height: 130%;

      border-radius: 10px;

      position: absolute;
      top: 0;
      left: 0;
      bottom: 0;
      margin: auto;

      background: #42E694;
    }

    &:hover {
      color: var(--color-font-dark) !important;
    }
  }
}
</style>
