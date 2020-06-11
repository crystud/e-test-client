<template>
  <div class="app-invite-join">
    <app-preloader :show="showPreloader"></app-preloader>

    <div
      class="title"
      :class="{
        'invite-found': Boolean(invite.id),
      }"
    >{{$route.meta.title}}</div>

    <app-fade-card
      :show="!Boolean(invite.id)"
      class="code-form"
    >
      <app-input
        class="code-input"
        appearance="secondary"
        placeholder="Вставте свій код сюди"
        :isOkay="true"
        @paste="verifyCode"
        @change="value => code = value"
      ></app-input>

      <app-button
        appearance="neutral"
        class="check-code"
        @click="verifyCode"
      >Далі</app-button>
    </app-fade-card>

    <app-fade-card :show="Boolean(invite.id)">
      <div
        v-if="invite.id"
        class="fill-data"
      >
        <div class="student">
          {{invite.student.user.lastName}}
          {{invite.student.user.firstName}}
          {{invite.student.user.patronymic}}
        </div>

        <div class="created-at">
          Запрошення створено {{$moment(invite.createAt).format('Do MMMM YYYY, hh:mm')}}
        </div>

        <app-data-list
          :data="[
            ['Група', invite.student.group.name || '-'],
            ['Рік початку навчання', invite.student.group.startYear || '-'],
            ['Залікова книга', invite.student.scoringBook || '-'],
          ]"
        ></app-data-list>

        <div class="data">
          <app-input
            appearance="secondary"
            placeholder="Ваш E-mail"
            class="app-input email"
            @change="value => joinInfo.email = value"
            :isOkay="isEmailOkay"
          ></app-input>

          <app-input
            appearance="secondary"
            placeholder="Пароль"
            type="password"
            class="app-input password"
            @change="value => joinInfo.password = value"
            :isOkay="joinInfo.password.length >= 7"
          ></app-input>

          <app-input
            appearance="secondary"
            placeholder="Перевірка паролю"
            type="password"
            class="app-input r-password"
            @change="value => joinInfo.repeatPassword = value"
            :isOkay="joinInfo.password.length > 0 && joinInfo.password === joinInfo.repeatPassword"
          ></app-input>

          <app-button
            @click="join"
            class="join-btn"
            :class="{
              'is-active': isOkayToSignUp,
            }"
          >Приєднатись</app-button>
        </div>
      </div>
    </app-fade-card>

    <router-link
      :to="{ name: 'signIn' }"
      class="back-to-login"
    >Повернутись до входу</router-link>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'

import AppInput from '@/components/ui/AppInput.vue'
import AppButton from '@/components/ui/AppButton.vue'
import AppFadeCard from '@/components/ui/AppFadeCard.vue'
import AppDataList from '@/components/ui/AppDataList.vue'
import AppPreloader from '@/components/ui/AppPreloader.vue'

export default {
  methods: {
    ...mapActions({
      getInviteByCode: 'invites/getByCode',
      activate: 'invites/activate',
      setAlert: 'alert/set',
    }),
    async join() {
      const {
        isEmailOkay,
        code,
        joinInfo: {
          email,
          password,
          repeatPassword,
        },
      } = this

      if (!isEmailOkay) {
        this.setAlert({
          title: 'Невалідний E-mail',
          show: true,
          isSuccess: false,
          delay: 1500,
        })

        return
      }

      if (password.length < 7) {
        this.setAlert({
          title: 'мін. 7 символів у паролі',
          show: true,
          isSuccess: false,
          delay: 1500,
        })

        return
      }

      if (password !== repeatPassword) {
        this.setAlert({
          title: 'Перевірка паролю не співпадає з паролем',
          show: true,
          isSuccess: false,
          delay: 1500,
        })

        return
      }

      try {
        this.showPreloader = true

        await this.activate({ email, password, code })

        this.$router.push({
          name: 'homeUser',
        })
      } catch (e) {
        this.setAlert({
          title: 'Помилка',
          text: 'Не вдалось виконати запит...',
          show: true,
          isSuccess: false,
        })
      } finally {
        this.showPreloader = false
      }
    },
    async verifyCode(event = { target: {} }) {
      setTimeout(async () => {
        const { code: codeRaw } = this

        const code = event.target.value || codeRaw

        if (code.length !== 14) {
          this.setAlert({
            title: 'Інвайт-код повинен бути довжиною 14 символів',
            show: true,
            isSuccess: false,
            delay: 2000,
          })

          return
        }

        if (code.length !== 14) {
          return
        }

        try {
          this.showPreloader = true

          await this.getInviteByCode(code)
        } catch (e) {
          this.setAlert({
            title: 'Помилка',
            text: 'Не вдалось знайти запрошення з таким кодом...',
            delay: 2500,
            show: true,
            isSuccess: false,
          })
        } finally {
          this.showPreloader = false
        }
      }, 0)
    },
  },
  data() {
    return {
      code: '',
      showPreloader: false,
      joinInfo: {
        email: '',
        password: '',
        repeatPassword: '',
      },
    }
  },
  computed: {
    ...mapGetters({
      invite: 'invites/invite',
    }),
    isOkayToSignUp() {
      const { joinInfo } = this

      return joinInfo.email
        && joinInfo.password.length > 0
        && joinInfo.repeatPassword === joinInfo.password
    },
    isEmailOkay() {
      const { joinInfo } = this

      return joinInfo.email.split('@').length > 1
        && joinInfo.email.split('@')[1].split('.').length > 1
    },
  },
  components: {
    AppPreloader,
    AppDataList,
    AppFadeCard,
    AppButton,
    AppInput,
  },
}
</script>

<style lang="less" scoped>
.app-invite-join {
  .title {
    font-size: 1.3em;
    font-weight: bold;

    margin-bottom: 20px;
    padding-bottom: 20px;

    border-bottom: 1px solid #1e2329;

    transition: all .3s;

    &.invite-found {
      color: var(--color-font-dark);
      font-weight: 100;
    }
  }

  .back-to-login {
    text-align: center;
    display: block;
    margin-top: 40px;
    color: var(--color-accent-orange) !important;
  }

  .code-form {
    display: grid;
    grid-template-columns: 1fr auto;
    grid-gap: 10px;

    .check-code {
      background: var(--color-accent-green);
    }
  }

  .fill-data {
    .student {
      font-size: 1.3em;
      font-weight: bold;
    }

    .created-at {
      margin-top: 5px;
      color: var(--color-accent-green);
    }

    .app-input {
      margin-bottom: 15px;
    }

    .join-btn {
      margin-top: 20px;
      width: 100%;

      background: var(--color-bg-main);
      color: var(--color-font-dark);
      cursor: default;

      &.is-active {
        background: var(--color-accent-green);
        color: #fff;
        cursor: pointer;
      }
    }
  }
}
</style>
