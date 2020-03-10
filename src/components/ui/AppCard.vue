<template>
<div class="app-card">
  <slot></slot>
</div>
</template>

<script>
export default {
  name: 'AppCard',
}
</script>

<style lang="less" scoped>
.app-card {
  background: var(--color-bg-dark);
  border-radius: 8px;
  color: #fff;
}
</style>
