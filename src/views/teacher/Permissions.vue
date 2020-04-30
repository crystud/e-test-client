<template>
  <div class="app-permissions">
    <div class="header">
      <div class="title">Дозволи на проходження тестів</div>

      <app-button
        appearance="primary"
        @click="showCreatePermission = true"
      >Створити дозвіл</app-button>
    </div>

    <div class="content">
      <div class="title">Ви надали 0 дозволів</div>

      <div class="list">
        <div class="row header-row">
          <div class="test">Назва тесту</div>
          <div class="created">Час створення</div>
          <div class="start">Початок активності</div>
          <div class="end">Кінець активності</div>
        </div>

        <div
          v-for="i in 7"
          :key="i"
          class="row"
        >
          <div class="test">Назва тесту</div>
          <div class="created">Час створення</div>
          <div class="start">Початок активності</div>
          <div class="end">Кінець активності</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import AppButton from '@/components/ui/AppButton.vue'

export default {
  data() {
    return {
      showCreatePermission: false,
    }
  },
  components: {
    AppButton,
  },
}
</script>

<style lang="less" scoped>
.app-permissions {
  .header {
    display: grid;
    grid-template-columns: 1fr auto;
    grid-gap: 20px;

    align-items: center;

    .title {
      font-size: 1.5em;
      font-weight: 400;
    }
  }

  .content {
    margin-top: 30px;
    padding: 30px;

    background: var(--color-bg-dark);
    box-shadow: 0px 0px 15px rgba(0, 0, 0, 0.3);
    border-radius: 10px;
    color: var(--color-font-main);

    .title {
      font-size: 1.1em;
      color: var(--color-font-dark);
    }

    .list {
      margin-top: 20px;

      .row {
        display: grid;
        grid-template-columns: 1fr 200px 200px 200px;
        grid-gap: 20px;

        margin-bottom: 15px;
        color: var(--color-font-main);

        &.header-row {
          color: var(--color-font-dark);
          padding-bottom: 15px;
          border-bottom: 1px solid var(--color-bg-main);
        }
      }
    }
  }
}
</style>
