<template>
  <div
    class="app-tests-item"
    @click="go"
  >
    <div class="title">Title</div>

    <div class="description">
      Lorem ipsum dolor sit amet consectetur adipisicing elit. Eveniet, deserunt.
    </div>

    <app-data-list
      :data="[
        ['Предмет', 'Програмування'],
        ['Створено', '12.02.2020'],
      ]"
    ></app-data-list>
  </div>
</template>

<script>
import AppDataList from '@/components/ui/AppDataList.vue'

export default {
  name: 'AppTestsItem',
  components: {
    AppDataList,
  },
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
    width: 70px;
    height: 2px;

    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;

    margin: auto;

    background: #1ED6BA;
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
