<template>
  <div class="app-test-information">
    <h1>Інформація про тест</h1>

    <app-input
      placeholder="Назва тесту"
      appearance="secondary"
      class="name"
    ></app-input>

    <app-text-area
      placeholder="Опис тесту (наприклад: ”Тест включає в себе загальні поняття)"
      class="description"
    ></app-text-area>
  </div>
</template>

<script>
import AppInput from '../../ui/AppInput.vue'
import AppTextArea from '../../ui/AppTextArea.vue'

export default {
  components: {
    AppInput,
    AppTextArea,
  },
}
</script>

<style lang="less" scoped>
.app-test-information {
  h1 {
    font-weight: 100;
    font-size: 1.5em;

    margin-bottom: 15px;
  }

  .name {
    background: var(--color-bg-main);
    margin-bottom: 15px;
  }

  .description {
    height: 150px;
    max-height: 250px;
  }
}
</style>
