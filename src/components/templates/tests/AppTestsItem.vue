<template>
  <div
    class="app-tests-item"
    @click="go"
  >
    <div class="title">{{test.name}}</div>

    <app-data-list
      class="data-list"
      :data="[
        ['Створив', `${test.creator.user.firstName} ${test.creator.user.lastName}` || '-'],
      ]"
    ></app-data-list>
  </div>
</template>

<script>
import { mapActions } from 'vuex'

import AppDataList from '@/components/ui/AppDataList.vue'

export default {
  name: 'AppTestsItem',
  components: {
    AppDataList,
  },
  props: {
    test: {
      type: Object,
      required: true,
      default: () => {},
    },
  },
  methods: {
    ...mapActions({
      setAlert: 'alert/set',
    }),
    go() {
      const { test: { id } } = this

      if (!id) {
        return this.setAlert({
          title: 'ID тесту не оприділено...',
          text: 'Нам не вдалось оприділити ID тесту. Спробуйте пізніше',
          isSuccess: false,
          show: true,
        })
      }

      return this.$router.push({
        name: 'testDevelop',
        params: { id },
      })
    },
  },
}
</script>

<style lang="less" scoped>
.app-tests-item {
  background: var(--color-bg-dark);
  box-shadow: 0px 0px 30px rgba(0, 0, 0, 0.2);

  padding: 20px;
  border-radius: 10px;

  cursor: pointer;

  position: relative;

  &::before {
    content: "";

    display: block;
    width: 70px;
    height: 3px;

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
    font-weight: 300;
  }

  .data-list {
    margin-bottom: 0;
  }
}
</style>
