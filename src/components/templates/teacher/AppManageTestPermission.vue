<template>
  <app-modal-window class="modal" :show="show">
    <div class="app-manage-test-permission">
      <div class="content">
        <div class="title">Доступ до "Проміжний контроль 1"</div>
        <div class="permission closed">Закритий</div>

        <app-select
          :values="[
            { value: 1, label: '30 хвилин' },
            { value: 2, label: '1 год' },
            { value: 3, label: '2 год' },
            { value: 4, label: '3 год' },
            { value: 5, label: '4 год' },
          ]"
          :hidePlaceholder="true"
          :sideBorder="true"
          label="Час відкриття доступу"
          class="form-input"
        ></app-select>

        <app-input
          class="form-input"
          placeholder="Пароль"
          appearance="secondary"
        ></app-input>

        <div class="set-btn">
          <app-button
            appearance="neutral"
            class="app-button"
            @click="$emit('close')"
          >Закрити</app-button>

          <app-button
            appearance="primary"
            class="app-button set"
            @click="$emit('close')"
          >Відкрити доступ</app-button>
        </div>
      </div>
    </div>
  </app-modal-window>
</template>

<script>
import AppModalWindow from '../../ui/AppModalWindow.vue'
import AppSelect from '../../ui/AppSelect.vue'
import AppInput from '../../ui/AppInput.vue'
import AppButton from '../../ui/AppButton.vue'

export default {
  components: {
    AppModalWindow,
    AppSelect,
    AppInput,
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

<style lang="less">
.modal {
  .body {
    overflow: visible !important;
  }
}

.app-manage-test-permission {
  color: var(--color-font-main);
  text-align: left;
  margin: 20px;

  display: flex;
  align-items: center;

  .title {
    font-size: 1.4em;
  }

  .permission {
    font-size: 1.15em;
    margin: 5px 0 20px;

    &.opened {
      color: #1AD9A5;
    }

    &.closed {
      color: var(--color-accent-red);
    }
  }

  .form-input {
    border-radius: 5px;
    background: var(--color-bg-main) !important;
    margin-bottom: 15px;
  }

  .set-btn {
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-gap: 10px;

    .set.app-button {
      background: #159D6D;
    }
  }

  @media screen and (max-width: 550px) {
    margin: 0;

    .set-btn {
      grid-template-columns: 1fr;
    }
  }
}
</style>
