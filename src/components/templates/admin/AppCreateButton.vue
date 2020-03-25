<template>
  <div
    class="btn"
    @click="$emit('click')"
  >
    <div class="text">
      <slot></slot>
    </div>

    <div class="icon">
      <font-awesome-icon
        icon="plus"
        class="element"
      ></font-awesome-icon>
    </div>
  </div>
</template>

<style lang="less" scoped>
.btn {
  display: flex;
  align-items: center;

  font-weight: 100;

  cursor: pointer;

  .icon {
    font-size: 1.15em;

    border-radius: 50%;
    background: #1ED6BA;
    color: #fff;

    width: 40px;
    height: 40px;


    display: flex;

    .element {
      margin: auto;
    }
  }

  .text {
    margin-right: 10px;
    color: var(--color-font-main);
  }
}
</style>
