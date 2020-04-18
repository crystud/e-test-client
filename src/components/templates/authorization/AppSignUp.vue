<template>
  <div class="sign-in">
    <h2>Реєстрація</h2>

    <app-preloader :show="showPreloader"></app-preloader>

    <app-alert
      :isSuccess="alert.isSuccess"
      :title="alert.title"
      :text="alert.text"
      :show="alert.show"
      :delay="alert.delay"
      @close="() => alert.show = false"
    ></app-alert>

    <app-input
      type="text"
      placeholder="Ім'я"
      :value="firstName"
      @change="newVal => firstName = newVal"
      appearance="bottom-border-highlight"
      class="app-form-field"
    ></app-input>

    <app-input
      type="text"
      placeholder="Прізвище"
      :value="lastName"
      @change="newVal => lastName = newVal"
      appearance="bottom-border-highlight"
      class="app-form-field"
    ></app-input>

    <app-input
      type="text"
      placeholder="По-батькові"
      :value="patronymic"
      @change="newVal => patronymic = newVal"
      appearance="bottom-border-highlight"
      class="app-form-field"
    ></app-input>

    <app-input
      type="text"
      placeholder="E-mail"
      :value="email"
      @change="newVal => email = newVal"
      appearance="bottom-border-highlight"
      class="app-form-field"
    ></app-input>

    <app-input
      type="password"
      placeholder="Пароль"
      :value="password"
      @change="newVal => password = newVal"
      appearance="bottom-border-highlight"
      class="app-form-field"
    ></app-input>

    <app-input
      type="password"
      placeholder="Повторіть пароль"
      :value="verifyPassword"
      @change="newVal => verifyPassword = newVal"
      appearance="bottom-border-highlight"
      class="app-form-field"
    ></app-input>

    <div class="login-btn">
      <app-button
        @click="validateSignUp"
      >Зареєструватися</app-button>
    </div>

    <div class="divider">
      <div class="line"></div>
      <div class="text">або</div>
      <div class="line"></div>
    </div>

    <router-link
      class="section-link"
      to="/"
    >Увійти в систему</router-link>
  </div>
</template>

<script>
import { mapActions } from 'vuex'

import AppInput from '@/components/ui/AppInput.vue'
import AppButton from '@/components/ui/AppButton.vue'
import AppAlert from '@/components/ui/AppAlert.vue'
import AppPreloader from '@/components/ui/AppPreloader.vue'

export default {
  name: 'authorization',
  components: {
    AppInput,
    AppButton,
    AppAlert,
    AppPreloader,
  },
  methods: {
    ...mapActions({
      signUp: 'auth/signUp',
    }),
    validateSignUp() {
      const {
        firstName,
        lastName,
        patronymic,
        email,
        password,
        verifyPassword,
      } = this

      if (!firstName || !lastName || !patronymic) {
        this.alert = {
          title: 'Валідація...',
          text: 'Кожне поле ПІБ повинно бути заповнено.',
          isSuccess: false,
          show: true,
        }

        return false
      }

      const emailCheck = email.split('@')

      if (emailCheck.length <= 1) {
        this.alert = {
          title: 'E-mail адреса',
          text: 'Перевірте валідність вашої E-mail адреси',
          isSuccess: false,
          show: true,
        }

        return false
      }

      if (emailCheck[1].split('.').length <= 1) {
        this.alert = {
          title: 'E-mail адреса',
          text: 'Перевірте валідність вашої E-mail адреси',
          isSuccess: false,
          show: true,
        }

        return false
      }

      if (password.length < 7) {
        this.alert = {
          title: 'Довжина паролю',
          text: 'Довжина паролю повинна бути мінімум 7 символів.',
          isSuccess: false,
          show: true,
        }

        return false
      }

      if (password !== verifyPassword) {
        this.alert = {
          title: 'Пароль',
          text: 'Паролі не співпадають. Перевірте їх, будь ласка, ще раз',
          isSuccess: false,
          show: true,
        }

        return false
      }

      this.showPreloader = true

      return this.signUp({
        firstName,
        lastName,
        patronymic,
        email,
        password,
      }).then(() => {
        this.$router.push({ name: 'homeUser' })

        this.alert = {
          title: 'Все чудово!',
          text: 'Вас було успішно зареєстровано. Через 1.5 вас буде перенаправлено на ваш профіль.',
          delay: 1500,
          isSuccess: true,
          show: true,
        }

        setTimeout(() => {
          this.$router.push({ name: 'homeUser' })
        }, 1500)
      }).catch(() => {
        this.alert = {
          title: 'Помилка...',
          text: 'Вас не вдалось зареєструвати...',
          show: true,
          isSuccess: false,
        }
      }).finally(() => {
        this.showPreloader = false
      })
    },
  },
  data() {
    return {
      firstName: '',
      lastName: '',
      patronymic: '',
      email: '',
      password: '',
      verifyPassword: '',
      showPreloader: false,
      alert: {
        title: '',
        text: '',
        isSuccess: false,
        show: false,
        delay: 1500,
      },
    }
  },
}
</script>

<style lang="less" scoped>
.sign-in {
  width: 100%;

  .center {
    display: flex;
    flex-direction: column;
    justify-content: center;
  }

  .center();

  h2 {
    color: #fff;
    margin-bottom: 30px;
    font-weight: 300;
    text-align: center;
  }

  .app-form-field {
    margin-bottom: 20px;

    input {
      color: #fff !important;
    }
  }

  .login-btn {
    width: 100%;

    .center();
  }

  .divider {
    display: grid;
    grid-template-columns: 1fr 50px 1fr;
    align-items: center;

    margin: 31px 0;
    color: #fff;

    .line {
      height: 2px;
      background: #242B33;
      border-radius: 2px;
    }

    .text {
      text-align: center;
      color: #363A3E;
    }
  }

  .section-link {
    display: inline-block;
    margin: 0 auto;
    color: #FC7136 !important;
  }
}
</style>
