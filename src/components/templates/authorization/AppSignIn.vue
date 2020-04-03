<template>
  <div class="sign-in">
    <h2>Вхід</h2>

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
      placeholder="E-mail"
      @change="newVal => email = newVal"
      appearance="bottom-border-highlight"
      class="app-form-field"
    ></app-input>

    <app-input
      type="password"
      @change="newVal => password = newVal"
      placeholder="Пароль"
      appearance="bottom-border-highlight"
      class="app-form-field"
    ></app-input>

    <div class="login-btn">
      <app-button @click="setAccessToken">Увійти</app-button>
    </div>

    <router-link
      class="forgot-password-link"
      to="/forgot"
    >Забули пaроль?</router-link>

    <div class="divider">
      <div class="line"></div>
      <div class="text">або</div>
      <div class="line"></div>
    </div>

    <router-link
      class="section-link"
      to="/join"
    >Створити профіль</router-link>
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
      email: '',
      password: '',
      alert: {
        text: '',
        title: '',
        isSuccess: false,
        show: false,
      },
    }
  },
  methods: {
    setAccessToken() {
      localStorage.setItem('accessToken', '123')

      this.$router.push({ name: 'homeUser' })
    },
  },
}
</script>

<style lang="less" scoped>
.sign-in {
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;

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
    text-align: center;
    margin-bottom: 30px;
  }

  .forgot-password-link,
  .section-link {
    display: inline-block;
  }

  .forgot-password-link {
    margin: 20px auto;
    color: #55636e !important;
  }

  .divider {
    display: grid;
    grid-template-columns: 1fr 50px 1fr;
    align-items: center;

    margin: 31px 0;
    margin-top: 0;
    color: #fff;

    .line {
      height: 2px;
      background: #242B33;
      border-radius: 2px;
    }

    .text {
      text-align: center;
      color: #55636e;
    }
  }

  .section-link {
    color: #FC7136 !important;
    margin: 0 auto;
  }
}
</style>
