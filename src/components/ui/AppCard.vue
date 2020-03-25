<template>
<div
  class="app-card"
  @click="$emit('click')"
>
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
  color: var(--color-font-main);
}
</style>
