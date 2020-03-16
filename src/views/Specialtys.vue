<template>
  <div class="app-specialtys">
    <app-sync-specialtys
      :show="showSync"
      @close="showSync = false"
    ></app-sync-specialtys>

    <div class="header">
      <div class="title">Спеціальності</div>

      <app-create-button @click="showSync = true">Синхронізувати спеціальності</app-create-button>
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
import AppSyncSpecialtys from '@/components/templates/admin/AppSyncSpecialtys.vue'

export default {
  data() {
    return {
      showSync: false,
    }
  },
  name: 'specialtys',
  components: {
    AppCreateButton,
    AppSpecialty,
    AppSyncSpecialtys,
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

    @media screen and (max-width: 400px) {
      flex-direction: column;
      justify-items: center;

      .title {
        margin-bottom: 10px;
      }
    }
  }

  .list {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    grid-gap: 20px;

    margin-top: 20px;
  }

  @small: ~"screen and (max-width: 650px)";
  @medium: ~"screen and (max-width: 1300px)";

  @media @medium {
    .list {
      grid-template-columns: 1fr 1fr;
    }
  }

  @media @small {
    .list {
      grid-template-columns: 1fr;
    }
  }
}
</style>
