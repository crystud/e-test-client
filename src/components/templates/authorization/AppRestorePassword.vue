<template>
  <div class="forgot-password">
    <h2>Скидання паролю</h2>

    <div class="user-info">
      <div class="profile-picture">
        <img
          src="https://www.thispersondoesnotexist.com/image"
          alt=""
        >
      </div>

      <div class="name">
        This person doesn't exist
      </div>

      <div class="college">
        Політехнічний коледж
      </div>
    </div>

    <app-input
      type="password"
      placeholder="Новий пароль"
      appearance="bottom-border-highlight"
      class="app-form-field"
    ></app-input>

    <app-input
      type="password"
      placeholder="Повторіть новий пароль"
      appearance="bottom-border-highlight"
      class="app-form-field"
    ></app-input>

    <app-button class="submit-btn">Скинути пароль</app-button>
  </div>
</template>

<script>
import AppInput from '@/components/ui/AppInput.vue'
import AppButton from '@/components/ui/AppButton.vue'

export default {
  name: 'authorization',
  components: {
    AppInput,
    AppButton,
  },
}
</script>

<style lang="less" scoped>
.forgot-password {
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

  .submit-btn {
    display: inline-block;
    margin: 0 auto;
  }

  .user-info {
    margin-bottom: 30px;

    .profile-picture {
      width: 95px;
      height: 95px;
      overflow: hidden;
      display: flex;
      margin: 0 auto 15px;
      border-radius: 50%;
      border: 2px solid rgba(255, 255, 255, 0.5);

      img {
        width: 100%;
        margin: auto;
      }
    }

    .name {
      color: #fff;
      text-align: center;
      padding: 0 30px;
      font-size: 1.25em;
    }

    .college {
      text-align: center;
      margin-top: 10px;
      color: #404243;
    }
  }
}
</style>
