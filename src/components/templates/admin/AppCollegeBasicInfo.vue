<template>
  <app-card class="app-college-basic-info">
    <div class="name">Коломийський політехнічний коледж</div>
    <div class="verificated">Верифіковано 12.01.2020 о 17:39</div>
  </app-card>
</template>

<script>
import AppCard from '../../ui/AppCard.vue'

export default {
  name: 'AppCollegeBasicInfo.vue',
  components: {
    AppCard,
  },
}
</script>

<style lang="less" scoped>
.app-college-basic-info {
  padding: 20px;
  font-weight: 100;

  .name {
    font-size: 1.5em;
    margin-bottom: 5px;
    color: var(--color-font-main);
  }

  .verificated {
    color: #1AD9A5;
  }

  .not-verificated {
    color: var(--color-font-dark);
  }
}
</style>
