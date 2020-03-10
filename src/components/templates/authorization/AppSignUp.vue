<template>
  <div class="sign-in">
    <h2>Реєстрація</h2>

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
      @change="newVal => firstName = newVal"
      appearance="bottom-border-highlight"
      class="app-form-field"
    ></app-input>

    <app-input
      type="text"
      placeholder="Прізвище"
      @change="newVal => lastName = newVal"
      appearance="bottom-border-highlight"
      class="app-form-field"
    ></app-input>

    <app-input
      type="text"
      placeholder="По-батькові"
      @change="newVal => patronymic = newVal"
      appearance="bottom-border-highlight"
      class="app-form-field"
    ></app-input>

    <app-input
      type="text"
      placeholder="E-mail"
      @change="newVal => email = newVal"
      appearance="bottom-border-highlight"
      class="app-form-field"
    ></app-input>

    <app-input
      type="password"
      placeholder="Пароль"
      @change="newVal => password = newVal"
      appearance="bottom-border-highlight"
      class="app-form-field"
    ></app-input>

    <app-input
      type="password"
      placeholder="Повторіть пароль"
      @change="newVal => verifyPassword = newVal"
      appearance="bottom-border-highlight"
      class="app-form-field"
    ></app-input>

    <div class="login-btn">
      <app-button @click="validate(mutate)">Зареєструватися</app-button>
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
import AppInput from '@/components/ui/AppInput.vue'
import AppButton from '@/components/ui/AppButton.vue'
import AppAlert from '@/components/ui/AppAlert.vue'

export default {
  name: 'authorization',
  components: {
    AppInput,
    AppButton,
    AppAlert,
  },
  data() {
    return {
      firstName: '',
      lastName: '',
      patronymic: '',
      email: '',
      password: '',
      verifyPassword: '',
      showConfirmEmail: false,
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
    font-weight: 100;
    text-align: center;
  }

  .app-form-field {
    margin-bottom: 20px;
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
