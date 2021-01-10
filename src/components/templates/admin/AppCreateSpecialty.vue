<template>
  <div>
    <app-alert
      :title="alert.title"
      :text="alert.text"
      :delay="alert.delay"
      :show="alert.show"
      :isSuccess="alert.isSuccess"
      @close="alert.show = false"
    ></app-alert>

    <app-preloader :show="showPreloader"></app-preloader>

    <app-modal-window
      :show="show && !alert.show && !showPreloader"
      :noPaddings="true"
      class="app-create-specialty"
    >
      <div class="title">Створити спеціальність</div>

      <div class="content">
        <app-input
          appearance="secondary"
          type="text"
          placeholder="Назва спеціальності..."
          @change="val => name = val"
          :value="name"
          class="app-input"
        ></app-input>

        <app-input
          appearance="secondary"
          type="text"
          placeholder="Символ спеціальності..."
          @change="val => symbol = val"
          :value="symbol"
          class="app-input"
        ></app-input>

        <app-input
          appearance="secondary"
          type="number"
          placeholder="К-сть років навчання..."
          @change="val => yearOfStudy = val"
          :value="yearOfStudy"
          class="app-input"
        ></app-input>

        <app-input
          appearance="secondary"
          type="number"
          placeholder="Код спеціальності..."
          @change="val => code = val"
          :value="code"
          class="app-input"
        ></app-input>

        <div class="btns">
          <app-button
            appearance="neutral"
            @click="$emit('close')"
          >Закрити</app-button>

          <app-button
            appearance="primary"
            @click="create"
          >Створити спеціальність</app-button>
        </div>
      </div>
    </app-modal-window>
  </div>
</template>

<script>
import { mapActions } from 'vuex'

import AppModalWindow from '../../ui/AppModalWindow.vue'
import AppInput from '../../ui/AppInput.vue'
import AppButton from '../../ui/AppButton.vue'
import AppAlert from '../../ui/AppAlert.vue'
import AppPreloader from '../../ui/AppPreloader.vue'

export default {
  props: {
    show: {
      type: Boolean,
      required: true,
    },
  },
  data() {
    return {
      name: '',
      symbol: '',
      yearOfStudy: '',
      code: '',
      showPreloader: false,
      alert: {
        title: '',
        text: '',
        delay: 1500,
        isSuccess: false,
        show: false,
      },
    }
  },
  components: {
    AppModalWindow,
    AppInput,
    AppButton,
    AppPreloader,
    AppAlert,
  },
  methods: {
    ...mapActions({
      createSpecialty: 'specialities/create',
    }),
    create() {
      const {
        name,
        symbol,
        yearOfStudy,
        code,
      } = this

      if (!name || !symbol || !yearOfStudy || !code) {
        this.alert = {
          title: 'Помилка...',
          text: 'Всі поля форми повинні бути заповнені.',
          delay: 2500,
          show: true,
          isSuccess: false,
        }

        return
      }

      this.showPreloader = true

      this.createSpecialty({
        name,
        symbol,
        yearOfStudy: Number(yearOfStudy),
        code: Number(code),
      }).then(() => {
        this.alert = {
          title: 'Спеціальність створено',
          text: '',
          delay: 1000,
          show: true,
          isSuccess: true,
        }

        setTimeout(() => {
          this.$emit('created')
          this.$emit('close')
        }, 1300)
      }).catch(() => {
        this.alert = {
          title: 'Перевірте свої дані',
          text: 'На жаль, нам не вдалось створити спеціальність...',
          delay: 2000,
          show: true,
          isSuccess: false,
        }
      }).finally(() => {
        this.showPreloader = false
      })
    },
  },
}
</script>

<style lang="less" scoped>
.app-create-specialty {
  .title, .content {
    max-width: 600px;
  }

  .title {
    padding: 30px;
    border-bottom: 1px solid var(--color-bg-main);
    font-size: 1.3em;
  }

  .content {
    padding: 30px;

    .subtitle {
      color: var(--color-font-dark);
      margin-bottom: 20px;
    }

    .app-input {
      margin-bottom: 20px;
      background: var(--color-bg-main);
    }

    .btns {
      display: grid;
      grid-template-columns: 1fr 1fr;
      grid-gap: 15px;
    }
  }
}
</style>
