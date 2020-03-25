<template>
  <div class="app-warning-card">
    <div class="icon">
      <font-awesome-icon
        icon="info-circle"
      ></font-awesome-icon>
    </div>

    <div class="text">
      <slot></slot>
    </div>
  </div>
</template>

<style lang="less" scoped>
.app-warning-card {
  background: #D59F26;
  color: #fff;

  padding: 20px;
  border-radius: 15px;

  display: grid;
  grid-template-columns: 40px 1fr;
  grid-gap: 10px;
  align-items: center;

  .icon {
    font-size: 1.7em;
    margin: auto;
  }

  .text {
    font-weight: 400;
  }
}
</style>
