<template>
  <app-modal-window
    :show="show"
    class="modal"
    :noPaddings="true"
  >
    <div class="app-create-subject">
      <div class="title">Створення предмету</div>

      <div class="content">
        <div class="text">
          Щоб створити предмет вам потрібно вказати тільки назву предмету.
        </div>

        <app-data-list
          class="data-list"
          :data="[
            ['Наразі у вас', '18 предметів'],
            ['Останній предмет створено', '28.02.2020 13:45'],
          ]"
        ></app-data-list>

        <app-input
          placeholder="Назва предмету"
          appearance="primary"
        ></app-input>

        <div class="btns">
          <app-button
            appearance="neutral"
            class="close-btn"
            @click="$emit('close')"
          >Закрити</app-button>

          <app-button
            appearance="primary"
            class="sync-btn"
          >Синхронізувати зараз</app-button>
        </div>
      </div>
    </div>
  </app-modal-window>
</template>

<script>
import AppModalWindow from '../../ui/AppModalWindow.vue'
import AppDataList from '../../ui/AppDataList.vue'
import AppButton from '../../ui/AppButton.vue'
import AppInput from '../../ui/AppInput.vue'

export default {
  name: 'AppSyncSpecialtys',
  components: {
    AppModalWindow,
    AppDataList,
    AppButton,
    AppInput,
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
.modal {
  .body {
    padding: 0 !important;

    .app-create-subject {
      font-weight: 100;
      max-width: 600px;

      .title, .content {
        padding: 20px 30px;
      }

      .title {
        font-size: 1.3em;
        color: var(--color-font-main);
        border-bottom: 1px solid var(--color-bg-light);
      }

      .content {
        text-align: left;

        .text {
          color: var(--color-font-dark);
        }

        .subject-input {
          margin: 20px 0;
        }

        .data-list {
          margin: 30px 0;
        }

        .btns {
          display: grid;
          grid-template-columns: 1fr 1fr;
          grid-gap: 20px;

          margin-top: 30px;

          @media screen and (max-width: 450px) {
            grid-template-columns: 1fr;
          }
        }
      }
    }
  }
}
</style>
