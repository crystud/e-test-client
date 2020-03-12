<template>
  <app-card>
    Home user
  </app-card>
</template>

<script>
import AppCard from '@/components/ui/AppCard.vue'

export default {
  name: 'homeUser',
  components: {
    AppCard,
  },
}
</script>

<style scoped lang="less">
.app-card {
  padding: 20px;
}
</style>
