<template>
  <app-modal-window
    :show="show"
    :noPaddings="true"
    class="app-desicion-modal"
  >
    <div class="header">
      <div class="name">Коломийський політехнічний коледж</div>
      <div class="date">Подано 26.06.2020 16:45</div>
    </div>

    <div class="content">
      <div class="text">Верифікувати навчальний заклад?</div>

      <div class="btns">
        <app-button
          appearance="secondary"
          @click="$emit('close')"
        >Ні</app-button>

        <app-button
          appearance="primary"
          @click="$emit('close')"
        >Так</app-button>
      </div>
    </div>
  </app-modal-window>
</template>

<script>
import AppModalWindow from '../../ui/AppModalWindow.vue'
import AppButton from '../../ui/AppButton.vue'

export default {
  components: {
    AppModalWindow,
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
.app-desicion-modal {
  .header {
    border-bottom: 1px solid var(--color-bg-main);
    padding: 20px 40px;

    .name {
      font-size: 1.4em;
      margin-bottom: 5px;
      color: var(--color-font-main);
    }

    .date {
      color: var(--color-font-dark);
    }
  }

  .content {
    padding: 40px 20px;

    .text {
      font-size: 1.3em;
      color: var(--color-font-main);
    }

    .btns {
      margin: 20px auto 0;

      width: 200px;

      display: grid;
      grid-template-columns: 1fr 1fr;
      grid-gap: 10px;
    }
  }
}
</style>
