<template>
  <div class="app-specialities-sync">
    <div class="header">
      <div class="pagename">Синхронізація спеціальностей</div>

      <div class="deltas">
        <div class="negative">- 2</div>
        <div class="positive">+ 3</div>
      </div>
    </div>

    <div class="specialties">
      <app-syncing-specialty
        v-for="i in 4"
        :key="i"
      ></app-syncing-specialty>
    </div>
  </div>
</template>

<script>
import AppSyncingSpecialty from '@/components/templates/admin/AppSyncingSpecialty.vue'

export default {
  components: {
    AppSyncingSpecialty,
  },
}
</script>

<style lang="less" scoped>
.app-specialities-sync {
  .header {
    display: grid;
    grid-template-columns: 1fr auto;

    align-items: center;

    margin-bottom: 20px;

    .pagename {
      font-size: 1.5em;
      font-weight: bold;
    }

    .deltas {
      display: grid;
      grid-template-columns: 1fr 1fr;

      .positive,
      .negative {
        padding: 10px 20px;
        font-size: 1.2em;
      }

      .positive {
        background: #1ED6BA;
        border-radius: 0 10px 10px 0;
      }

      .negative {
        background: #E3204D;
        border-radius: 10px 0 0 10px;
      }
    }
  }

  .specialties {
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-gap: 20px;
  }
}
</style>
