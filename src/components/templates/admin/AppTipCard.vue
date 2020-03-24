<template>
  <div class="tip">
    <slot></slot>
  </div>
</template>

<style lang="less" scoped>
.tip {
  font-size: 15px;
  color: var(--color-font-main);

  background: var(--color-bg-dark);
  padding: 20px;
  border-radius: 10px;

  position: relative;

  &::before {
    content: "";

    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;

    margin: auto;

    height: 3px;
    background: #1ED6BA;
    border-radius: 5px;

    width: 20%;
    max-width: 80px;
  }
}
</style>
