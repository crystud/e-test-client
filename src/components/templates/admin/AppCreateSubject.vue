<template>
  <app-modal-window
    :show="show"
    class="modal"
    :noPaddings="true"
  >
    <div class="app-create-subject">
      <app-preloader :show="showPreloader"></app-preloader>

      <div class="title">Створення предмету</div>

      <div class="content">
        <div class="text">
          Щоб створити предмет вам потрібно вказати тільки назву предмету.
        </div>

        <app-data-list
          class="data-list"
          :data="[
            ['Наразі у вас', `${subjects.length} предметів`],
          ]"
        ></app-data-list>

        <app-input
          placeholder="Назва предмету"
          appearance="secondary"
          class="app-input"
          :value="name"
          @change="newName => name = newName"
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
            @click="create"
          >Створити предмет</app-button>
        </div>
      </div>
    </div>
  </app-modal-window>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

import AppPreloader from '../../ui/AppPreloader.vue'
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
    AppPreloader,
  },
  computed: {
    ...mapGetters({
      subjects: 'subjects/subjects',
    }),
  },
  data() {
    return {
      name: '',
      showPreloader: false,
    }
  },
  methods: {
    ...mapActions({
      createSubject: 'subjects/create',
    }),
    create() {
      const { name } = this

      if (!name) {
        return
      }

      this.showPreloader = true
      this.name = ''

      this.createSubject({ name }).then(() => {
        this.$emit('created', {
          success: true,
        })
      }).catch(() => {
        this.$emit('created', {
          success: false,
        })
      }).finally(() => {
        this.showPreloader = false
      })
    },
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
      font-weight: 300;
      max-width: 600px;

      .title, .content {
        padding: 20px 30px;
      }

      .app-input {
        background: var(--color-bg-main);
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
