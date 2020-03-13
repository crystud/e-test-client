<template>
  <app-modal-window :show="show">
    <div class="app-finish-warning">
      <div class="title">Ви впевнені?</div>

      <div class="text">
        Ця дія безповоротня.
        Натиснувши "так" ви більше не зможете внести зміни у свої відповіді.
      </div>

      <div class="btns">
        <app-button
          appearance="primary"
          @click="$emit('continue')"
        >Закрити</app-button>

        <app-button
          appearance="secondary"
          @click="$emit('finish')"
        >Завершити</app-button>
      </div>
    </div>
  </app-modal-window>
</template>

<script>
import AppModalWindow from '@/components/ui/AppModalWindow.vue'
import AppButton from '@/components/ui/AppButton.vue'

export default {
  name: 'AppFinishWarning',
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
.app-finish-warning {
  text-align: center;

  color: var(--color-font-main);

  .title {
    width: 80%;
    font-size: 1.5em;
    margin: 0 auto 20px;
  }

  .text {
    width: 60%;
    margin: 0 auto 30px;
  }

  .btns {
    button {
      margin: 10px;
    }
  }
}
</style>
