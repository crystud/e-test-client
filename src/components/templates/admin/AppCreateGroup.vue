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
          Щоб створити групу вам потрібно вказати спеціальність, номер та роки навчання.
        </div>

        <app-data-list
          class="data-list"
          :data="[
            ['Наразі у вас', '18 груп'],
            ['Останню групу створено', '28.02.2020 13:45'],
          ]"
        ></app-data-list>

        <app-datepicker
          class="form-input"
          placeholder="Початок навчання"
          @change="newVal => educationStart = newVal"
        ></app-datepicker>

        <app-datepicker
          class="form-input"
          placeholder="Кінець навчання"
          @change="newVal => educationFinish = newVal"
        ></app-datepicker>

        <div class="details">
          <app-select
            class="app-select"
            :hidePlaceholder="true"
            label="Спеціальність"
            :values="[
              { label: 'Інженерія програмного забезпечення (П)', value: 1 },
              { label: 'Маркетинг (МД)', value: 2 },
              { label: 'Модельєри (МК)', value: 3 },
              { label: 'Автоматизація (А)', value: 4 },
            ]"
          ></app-select>

          <app-input
            placeholder="Номер групи"
            appearance="secondary"
            class="app-input form-input"
            type="number"
          ></app-input>
        </div>

        <div class="btns">
          <app-button
            appearance="neutral"
            class="close-btn"
            @click="$emit('close')"
          >Закрити</app-button>

          <app-button
            appearance="primary"
            class="sync-btn"
          >Створити групу</app-button>
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
import AppDatepicker from '../../ui/AppDatepicker.vue'
import AppSelect from '../../ui/AppSelect.vue'

export default {
  name: 'AppSyncSpecialtys',
  components: {
    AppModalWindow,
    AppDataList,
    AppSelect,
    AppButton,
    AppInput,
    AppDatepicker,
  },
  data() {
    return {
      educationStart: {},
      educationFinish: {},
    }
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

      .app-input,
      .app-select {
        background: var(--color-bg-main);
        border-radius: 10px;
      }

      .title {
        font-size: 1.3em;
        color: var(--color-font-main);
        border-bottom: 1px solid var(--color-bg-light);
      }

      .form-input {
        margin: 15px 0;
      }

      .content {
        text-align: left;

        .text {
          color: var(--color-font-dark);
        }

        .data-list {
          margin: 30px 0;
        }

        .details {
          display: grid;
          grid-gap: 10px;
          grid-template-columns: 3fr 1fr;
          align-items: center;

          @media screen and (max-width: 500px) {
            grid-template-columns: 1fr;
            grid-gap: 0;
            margin-top: 40px;
          }
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
