<template>
  <app-modal-window
    :show="show"
    class="modal"
    :noPaddings="true"
  >
    <div class="app-create-class">
      <div class="title">Створення пари</div>

      <div class="content">
        <div class="text">
          Щоб створити пару вам потрібно обрати вчителя
          та предмет, котрий він буде проводити. Якщо
          вчителя або предмету немає у списку, тоді його
          потрібно створити.
        </div>

        <app-data-list
          class="data-list"
          :data="[
            ['Наразі у вас', '18 предметів'],
            ['Останню пару створено', '28.02.2020 13:45'],
          ]"
        ></app-data-list>

        <app-select
          label="Предмет"
          :sideBorder="true"
          :values="[
            { id: 1, label: 'Предмет предметович №1' },
            { id: 2, label: 'Предмет предметович №2' },
            { id: 3, label: 'Предмет предметович №3' },
            { id: 4, label: 'Предмет предметович №4' },
          ]"
          class="form-input"
        ></app-select>

        <app-select
          label="Вчитель"
          :sideBorder="true"
          :values="[
            { id: 1, label: 'Вчитель вчительович №1' },
            { id: 2, label: 'Вчитель вчительович №2' },
            { id: 3, label: 'Вчитель вчительович №3' },
            { id: 4, label: 'Вчитель вчительович №4' },
          ]"
          class="form-input"
        ></app-select>

        <div class="btns">
          <app-button
            appearance="neutral"
            @click="$emit('close')"
          >Закрити</app-button>

          <app-button appearance="primary">Створити пару</app-button>
        </div>
      </div>
    </div>
  </app-modal-window>
</template>

<script>
import AppModalWindow from '../../ui/AppModalWindow.vue'
import AppDataList from '../../ui/AppDataList.vue'
import AppButton from '../../ui/AppButton.vue'
import AppSelect from '../../ui/AppSelect.vue'

export default {
  name: 'AppSyncSpecialtys',
  components: {
    AppModalWindow,
    AppDataList,
    AppButton,
    AppSelect,
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

    .app-create-class {
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

        .data-list {
          margin: 40px 0;
        }

        .form-input {
          margin: 20px 0;
          background: var(--color-bg-main);
          border-radius: 5px;
          font-size: 1.2em;
          padding: 15px;
        }

        .btns {
          display: grid;
          grid-template-columns: 1fr 1fr;
          grid-gap: 20px;

          margin-top: 40px;

          @media screen and (max-width: 450px) {
            grid-template-columns: 1fr;
          }
        }
      }
    }
  }
}
</style>
