<template>
  <div class="app-tests">
    <app-preloader :show="showPreloader"></app-preloader>

    <app-create-test
      :show="showCreateTest"
      @close="showCreateTest = false"
      @created="
        loadTests()
        showCreateTest = false
      "
    ></app-create-test>

    <div
      class="header"
      v-if="false"
    >
      <h1>Тести</h1>

      <app-create-button @click="showCreateTest = true">Створити тест</app-create-button>
    </div>

    <div class="list">
      <app-tests-item
        v-for="(test, index) in tests"
        :key="index"
        :test="test"
      ></app-tests-item>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex'

import AppTestsItem from '@/components/templates/tests/AppTestsItem.vue'
import AppCreateButton from '@/components/templates/admin/AppCreateButton.vue'
import AppCreateTest from '@/components/templates/teacher/AppCreateTest.vue'
import AppPreloader from '@/components/ui/AppPreloader.vue'

export default {
  name: 'Tests',
  components: {
    AppTestsItem,
    AppCreateButton,
    AppPreloader,
    AppCreateTest,
  },
  methods: {
    ...mapActions({
      setAlert: 'alert/set',
      getOwnTests: 'user/getOwnTests',
    }),
    async loadTests() {
      try {
        this.showPreloader = true

        this.tests = await this.getOwnTests()
      } catch (e) {
        this.setAlert({
          title: 'Неочікувана помилка',
          text: 'Сталась неочікувана помилка. Спробуйте пізніше...',
          show: true,
          isSuccess: false,
        })
      } finally {
        this.showPreloader = false
      }
    },
  },
  data() {
    return {
      showCreateTest: false,
      showPreloader: false,
      tests: [],
    }
  },
  async created() {
    await this.loadTests()
  },
}
</script>

<style lang="less" scoped>
@small: ~"screen and (max-width: 680px)";
@medium: ~"screen and (max-width: 1000px)";
@large: ~"screen and (min-width: 1450px)";

.app-tests {
  .header {
    margin-bottom: 20px;

    display: grid;
    grid-template-columns: auto auto;
    justify-content: space-between;

    h1 {
      font-weight: 300;
      color: var(--color-font-main);
    }
  }

  .list {
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-gap: 20px;
  }

  @media screen and (max-width: 1550px) {
    .list {
      grid-template-columns: repeat(2, 1fr);
    }
  }

  @media @small {
    .list {
      grid-template-columns: 1fr;
      grid-gap: 10px;
    }
  }
}
</style>
