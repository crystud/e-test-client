<template>
  <div
    class="app-user-card"
    @click="$emit('click')"
  >
    <slot></slot>
  </div>
</template>

<style scoped>
.app-user-card {
  background: var(--color-bg-dark);
  color: var(--color-font-main);

  border-radius: 10px;
  padding: 30px;
}
</style>
