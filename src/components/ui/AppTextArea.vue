<template>
  <textarea
    :placeholder="placeholder"
    v-on:keyup="$emit('change', $event.target.value)"
  ></textarea>
</template>

<script>
export default {
  props: {
    placeholder: {
      type: String,
      required: false,
      default: () => '',
    },
  },
}
</script>

<style lang="less" scoped>
textarea {
  width: 100%;
  min-height: 100px;

  resize: vertical;

  border-radius: 10px;
  background: var(--color-bg-main);
  border: 0;

  padding: 15px;

  font: 100 1em 'Lato', Tahoma, Arial;

  color: var(--color-font-main);

  &::placeholder {
    color: var(--color-font-dark);
  }
}
</style>
