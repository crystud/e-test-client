<template>
  <app-modal-window :show="show">
    <div class="app-filters">
      <div class="title">Фільтри для пошуку</div>

      <app-select
        class="form-input"
        :sideBorder="true"
        label="Набір"
        :values="[
          { label: '09.01.2019', value: 1 },
          { label: '09.01.2018', value: 2 },
          { label: '09.01.2017', value: 3 },
          { label: '09.01.2016', value: 4 },
        ]"
      ></app-select>

      <app-select
        class="form-input"
        :sideBorder="true"
        label="Спеціальність"
        :values="[
          { label: 'Інженерія програмного забезпечення (П)', value: 1 },
          { label: 'Маркетинг (МД)', value: 2 },
          { label: 'Модельєри (МК)', value: 3 },
          { label: 'Автоматизація (А)', value: 4 },
        ]"
      ></app-select>

      <app-select
        class="form-input"
        :sideBorder="true"
        label="Остання активність"
        :values="[
          { label: 'Онлайн', value: 1 },
          { label: 'Останні 30 хв. тому', value: 2 },
          { label: 'Остання 1 год. тому', value: 3 },
          { label: 'В межах 1 дня', value: 4 },
          { label: 'В межах 1 тижня', value: 4 },
        ]"
      ></app-select>

      <div class="btns">
        <app-button
          appearance="neutral"
          @click="$emit('close')"
        >Закрити</app-button>

        <app-button
          appearance="primary"
          @click="$emit('close')"
        >Шукати</app-button>
      </div>
    </div>
  </app-modal-window>
</template>

<script>
import AppModalWindow from '../../ui/AppModalWindow.vue'
import AppSelect from '../../ui/AppSelect.vue'
import AppButton from '../../ui/AppButton.vue'

export default {
  components: {
    AppModalWindow,
    AppSelect,
    AppButton,
  },
  props: {
    show: {
      type: Boolean,
      required: true,
      default: () => false,
    },
  },
}
</script>

<style lang="less" scoped>
.app-filters {
  text-align: left;
  width: 400px;

  .title {
    font-size: 1.6em;
    font-weight: 300;

    margin-bottom: 20px;
  }

  .form-input {
    margin-bottom: 20px;
    background: var(--color-bg-main);
    border-radius: 10px;
  }

  .btns {
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-gap: 20px;
  }
}
</style>
