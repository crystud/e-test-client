<template>
  <div class="sign-in">
    <h2>Реєстрація</h2>

    <app-preloader :show="showPreloader"></app-preloader>

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

    <label
      for="profilePicture"
      class="select-profile-picture"
    >
      <input
        type="file"
        id="profilePicture"
        accept="image/png,image/jpg"
        @change="({ target: { files: [ image ] } }) => setImage({ image })"
      >

      <div class="content">
        <div
          v-if="!avatar.value"
          class="icon"
        >
          <font-awesome-icon icon="image"></font-awesome-icon>
        </div>

        <div
          v-if="avatar.value"
          class="selected-image"
        >
          <img :src="`data:image/jpg;base64,${avatar.value}`">
        </div>

        <div class="text">
          <span v-if="!avatar.name">Обрати зображення профілю...</span>
          <span v-else>{{avatar.name}}</span>
        </div>
      </div>
    </label>

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
import AppPreloader from '@/components/ui/AppPreloader.vue'

export default {
  components: {
    AppInput,
    AppButton,
    AppPreloader,
  },
  methods: {
    ...mapActions({
      signUp: 'auth/signUp',
      setAlert: 'alert/set',
    }),
    setImage({ image }) {
      const reader = new FileReader()

      reader.onload = () => {
        const { result = '' } = reader

        const [, base64] = result.split('base64,')

        if (!base64) {
          this.setAlert({
            title: 'Помилка',
            text: 'Не вдалось обробити фото',
            delay: 1500,
            show: true,
            isSuccess: false,
          })

          return
        }

        console.log(image)

        this.avatar = {
          name: image.name,
          value: base64,
        }
      }

      reader.onerror = () => {
        this.setAlert({
          title: 'Помилка',
          text: 'Не вдалось обробити фото',
          delay: 1500,
          show: true,
          isSuccess: false,
        })
      }

      reader.readAsDataURL(image)
    },
    validateSignUp() {
      const {
        firstName,
        lastName,
        patronymic,
        email,
        avatar: { value: avatar },
        password,
        verifyPassword,
      } = this

      if (!avatar) {
        return this.setAlert({
          title: 'Валідація...',
          text: 'Ви повинні вказати зображення профілю',
          isSuccess: false,
          show: true,
        })
      }

      if (!firstName || !lastName || !patronymic) {
        return this.setAlert({
          title: 'Валідація...',
          text: 'Кожне поле ПІБ повинно бути заповнено.',
          isSuccess: false,
          show: true,
        })
      }

      const emailCheck = email.split('@')

      if (emailCheck.length <= 1) {
        return this.setAlert({
          title: 'E-mail адреса',
          text: 'Перевірте валідність вашої E-mail адреси',
          isSuccess: false,
          show: true,
        })
      }

      if (emailCheck[1].split('.').length <= 1) {
        return this.setAlert({
          title: 'E-mail адреса',
          text: 'Перевірте валідність вашої E-mail адреси',
          isSuccess: false,
          show: true,
        })
      }

      if (password.length < 7) {
        return this.setAlert({
          title: 'Довжина паролю',
          text: 'Довжина паролю повинна бути мінімум 7 символів.',
          isSuccess: false,
          show: true,
        })
      }

      if (password !== verifyPassword) {
        return this.setAlert({
          title: 'Пароль',
          text: 'Паролі не співпадають. Перевірте їх, будь ласка, ще раз',
          isSuccess: false,
          show: true,
        })
      }

      this.showPreloader = true

      return this.signUp({
        firstName,
        lastName,
        patronymic,
        email,
        password,
        avatar,
      }).then(() => {
        this.$router.push({ name: 'homeUser' })

        this.setAlert({
          title: 'Все чудово!',
          text: 'Вас було успішно зареєстровано',
          delay: 1000,
          isSuccess: true,
          show: true,
        })

        setTimeout(async () => {
          await this.redirectToHome({
            $router: this.$router,
          })
        }, 1000)
      }).catch(() => {
        this.setAlert({
          title: 'Помилка...',
          text: 'Вас не вдалось зареєструвати...',
          show: true,
          isSuccess: false,
        })
      }).finally(() => {
        this.showPreloader = false
      })
    },
  },
  data() {
    return {
      avatar: {
        name: '',
        value: null,
      },
      firstName: '',
      lastName: '',
      patronymic: '',
      email: '',
      password: '',
      verifyPassword: '',
      showPreloader: false,
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

  .select-profile-picture {
    width: 100%;
    border-radius: 5px;
    background: var(--color-bg-main);
    margin: 10px 0 30px;

    overflow: hidden;

    cursor: pointer;

    input {
      display: none;
    }

    .content {
      display: grid;
      grid-template-columns: auto 1fr;
      align-items: center;

      .selected-image {
        img {
          max-width: 70px;
          display: block;
        }
      }

      .icon, .text {
        padding: 15px;
      }

      .text {
        color: #55636e;
        transition: all .15s;
      }
    }

    &:hover {
      .text {
        color: #fff;
      }
    }
  }

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
