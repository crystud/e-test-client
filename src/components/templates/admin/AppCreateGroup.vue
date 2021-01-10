<template>
  <app-modal-window
    :show="show"
    class="modal"
    :noPaddings="true"
  >
    <div class="app-create-subject">
      <div class="title">Створення групи</div>

      <div class="content">
        <div class="text">
          Щоб створити групу вам потрібно вказати роки навчання.
        </div>

        <app-data-list
          class="data-list"
          :data="[
            ['Спеціальність', speciality.name],
            ['Років навчання', speciality.yearOfStudy],
            ['Код спеціальності', speciality.code],
          ]"
        ></app-data-list>

        <div class="education-start">
          <span>Початок навчання</span>

          <app-input
            class="form-input"
            placeholder="Початок навчання"
            @change="newVal => educationStart = newVal"
            appearance="secondary"
            :value="educationStart"
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
            @click="create"
          >Створити групу</app-button>
        </div>
      </div>
    </div>
  </app-modal-window>
</template>

<script>
import { mapActions } from 'vuex'

import AppModalWindow from '../../ui/AppModalWindow.vue'
import AppDataList from '../../ui/AppDataList.vue'
import AppButton from '../../ui/AppButton.vue'
import AppInput from '../../ui/AppInput.vue'

export default {
  name: 'AppCreateGroup',
  components: {
    AppModalWindow,
    AppDataList,
    AppButton,
    AppInput,
  },
  data() {
    return {
      educationStart: new Date().getFullYear(),
    }
  },
  methods: {
    ...mapActions({
      createGroup: 'groups/create',
    }),
    create() {
      const {
        educationStart: startYear,
        speciality: { id: speciality },
      } = this

      this.createGroup({ startYear, speciality }).then(() => {
        this.$emit('done', { created: true })
      }).catch(() => {
        this.$emit('done', { created: false })
      })
    },
  },
  props: {
    show: {
      type: Boolean,
      required: true,
      default: () => false,
    },
    speciality: {
      type: Object,
      required: true,
      default: () => null,
    },
  },
}
</script>

<style lang="less" scoped>
.modal {
  .body {
    padding: 0 !important;

    .app-create-subject {
      font-weight: 300;
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

      .education-start {
        margin: 15px 0;
        color: var(--color-font-dark);

        .form-input {
          margin-top: 10px;
        }
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
