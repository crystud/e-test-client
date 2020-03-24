<template>
  <div class="app-search-bar">
    <input
      type="text"
      :placeholder="placeholder || 'Пошук...'"
      v-model="query"
    >

    <button
      @click="$emit('search', query)"
    >
      <font-awesome-icon
        icon="search"
      ></font-awesome-icon>
    </button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      query: '',
    }
  },
  props: {
    placeholder: {
      type: String,
      required: false,
    },
  },
}
</script>

<style lang="less" scoped>
.app-search-bar {
  border-radius: 10px;
  background: var(--color-bg-main);

  display: grid;
  grid-template-columns: 1fr 60px;

  font-weight: 100;

  input, button {
    padding: 15px;
    font-size: 1em;
    border: 0;

    background: transparent;
    color: #fff;
  }

  input {
    &::placeholder {
      color: var(--color-font-dark);

      font-weight: 100;
      font-family: 'Lato', Tahoma, Arial;
    }
  }

  button {
    border-left: 1px solid var(--color-font-dark);
  }
}
</style>
