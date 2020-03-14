<template>
  <app-card class="app-last-visitors">
    <div class="title">Останні 5 відвідувачів з Вашого НЗ</div>

    <div class="list">
      <app-user-item
        v-for="i in 6"
        v-bind:key="i"
        class="user-item"
      ></app-user-item>
    </div>
  </app-card>
</template>

<script>
import AppCard from '@/components/ui/AppCard.vue'
import AppUserItem from '@/components/templates/admin/AppUserItem.vue'

export default {
  name: 'AppLastVisitors',
  components: {
    AppCard,
    AppUserItem,
  },
}
</script>

<style lang="less" scoped>
.app-last-visitors {
  padding: 20px;
  font-weight: 100;

  .title {
    font-size: 1.1em;
  }

  .list {
    margin-top: 20px;
    display: grid;
    grid-template-columns: 1fr;
    grid-gap: 20px;
  }

  @media screen and (max-width: 1150px) {
    .list {
      grid-template-columns: 1fr 1fr;
    }
  }

  @media screen and (max-width: 600px) {
    .list {
      grid-template-columns: 1fr;
    }
  }
}
</style>
