<template>
  <div @click="$emit('change', !checked)">
    <div
      class="app-checkbox"
      :class="{
        'is-checked': checked,
      }"
    >
      <div class="check">
        <font-awesome-icon
          icon="check"
          class="icon"
        ></font-awesome-icon>
      </div>

      <div
        class="label"
        v-if="label"
      >{{label}}</div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    checked: {
      type: Boolean,
      required: false,
      default: () => false,
    },
    label: {
      required: false,
      default: () => null,
    },
  },
}
</script>

<style lang="less" scoped>
.app-checkbox {
  padding: 5px 10px;
  background: var(--color-bg-dark);
  border-radius: 5px;
  cursor: pointer;

  display: grid;
  grid-template-columns: 30px auto;
  grid-gap: 10px;
  align-items: center;

  user-select: none;

  .check, .label {
    transition: all .1s;
  }

  &.is-checked {
    .label,
    .check {
      color: var(--color-accent-green);
    }

    .check {
      opacity: 1;
      transform: scale(1);
    }
  }

  .check {
    width: 30px;
    height: 30px;

    display: flex;
    justify-content: center;
    align-items: center;

    opacity: 0.3;
  }

  .label {
    color: var(--color-font-dark);
  }
}
</style>
