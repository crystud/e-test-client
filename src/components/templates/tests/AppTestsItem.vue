<template>
  <div
    class="app-tests-item"
    @click="go"
  >
    <div class="title">Title</div>

    <div class="description">
      Lorem ipsum dolor sit amet consectetur adipisicing elit. Eveniet, deserunt.
    </div>

    <div class="data">
      <div
        class="item"
        v-for="i in 3"
        v-bind:key="i"
      >
        <div class="property">Макс. оцінка</div>
        <div class="value">5</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'AppTestsItem',
  methods: {
    go() {
      this.$router.push({
        name: 'testPreview',
        params: {
          id: 1,
        },
      })
    },
  },
}
</script>

<style lang="less" scoped>
.app-tests-item {
  background: var(--color-bg-dark);

  padding: 20px;
  border-radius: 10px;

  cursor: pointer;

  position: relative;

  &::before {
    content: "";

    display: block;
    width: 3px;
    height: 25%;

    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;

    margin: auto;

    background: #1CDE69;
    border-radius: 10px;
  }

  .title {
    font-size: 1.5em;
    color: var(--color-font-main);
  }

  .description {
    color: var(--color-font-dark);
    margin: 10px 0 20px;
    font-weight: 100;
  }

  .data {
    font-size: 1.1em;
    font-weight: 100;
    color: var(--color-font-main);

    .item {
      display: grid;
      grid-template-columns: 130px 1fr;

      margin-bottom: 10px;

      .property {
        color: var(--color-font-dark);
      }

      .value {
        font-weight: 400;
        color: var(--color-font-main);
      }
    }
  }
}
</style>
