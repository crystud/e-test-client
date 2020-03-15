<template>
  <div class="app-specialtys">
    <div class="header">
      <div class="title">Пари</div>

      <app-create-button>Створити пару</app-create-button>
    </div>

    <div class="list">
      <app-class
        v-for="i in 15"
        v-bind:key="i"
      ></app-class>
    </div>
  </div>
</template>

<script>
import AppCreateButton from '@/components/templates/admin/AppCreateButton.vue'
import AppClass from '@/components/templates/admin/AppClass.vue'

export default {
  name: 'classes',
  components: {
    AppCreateButton,
    AppClass,
  },
}
</script>

<style lang="less" scoped>
.app-specialtys {
  .header {
    display: flex;
    justify-content: space-between;
    align-items: center;

    font-weight: 100;

    .title {
      font-size: 1.6em;
      color: var(--color-font-main);
    }
  }

  .list {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    grid-gap: 20px;

    margin-top: 20px;
  }
}
</style>
