<template>
  <div
    class="app-user-card"
    @click="$emit('click')"
  >
    <slot></slot>
  </div>
</template>

<style scoped lang="less">
.app-user-card {
  background: var(--color-bg-dark);
  color: var(--color-font-main);

  border-radius: 10px;
  padding: 30px;

  @media screen and (max-width: 550px) {
    padding: 25px 20px;
  }
}
</style>
