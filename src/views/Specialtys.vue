<template>
  <div class="app-specialtys">
    <div class="header">
      <div class="title">Спеціальності</div>

      <app-create-button>Додати спеціальність</app-create-button>
    </div>

    <div class="list">
      <app-specialty
        v-for="i in 15"
        v-bind:key="i"
      ></app-specialty>
    </div>
  </div>
</template>

<script>
import AppCreateButton from '@/components/templates/admin/AppCreateButton.vue'
import AppSpecialty from '@/components/templates/admin/AppSpecialty.vue'

export default {
  name: 'specialtys',
  components: {
    AppCreateButton,
    AppSpecialty,
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
