<template>
  <div class="app-syncing-specialty">
    <div class="name">Інженерія програмного забезпечення</div>

    <app-data-list
      :data="[
        ['Код', '121'],
        ['Студентів', '121'],
        ['Кваліфікація', 'Молодший спеціаліст'],
      ]"
    ></app-data-list>

    <div class="fill-data">Заповнити додаткові дані…</div>
  </div>
</template>

<script>
import AppDataList from '@/components/ui/AppDataList.vue'

export default {
  components: {
    AppDataList,
  },
  props: {
    specialty: {
      type: Object,
      required: true,
      default: () => {},
    },
  },
}
</script>

<style lang="less" scoped>
.app-syncing-specialty {
  padding: 25px;
  background: var(--color-bg-dark);
  border-radius: 10px;

  .name {
    font-size: 25px;
  }

  .fill-data {
    color: #1ED6BA;
    cursor: pointer;

    &:hover {
      text-decoration: underline;
    }
  }
}
</style>
