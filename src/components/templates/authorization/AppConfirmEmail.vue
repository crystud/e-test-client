<template>
  <app-modal-window
    class="app-confirm-email"
    :show="show"
  >
    <div class="confirm">
      <div class="icon">
        <font-awesome-icon
          icon="at"
          class="obj"
        ></font-awesome-icon>
      </div>

      <div class="title">Підтвердьте електронну пошту</div>

      <div class="text">
        Ми надіслали вам лист на Ваш E-mail, в ньому є всі інструкції.
        Наразі Ваш профіль створено, але нам потрібно переконатися,
        що ви надали реальну адресу електронної пошти.
      </div>

      <div class="send-again-btn">
        <app-button
          :class="{
            'neutral': counter.active,
          }"
        >
          <span v-if="counter.active">
            Зачекайте {{counter.time}} секунд, щоб надіслати ще раз
          </span>

          <span v-else-if="!counter.active">
            Надіслати лист ще раз
          </span>
        </app-button>
      </div>

      <div class="logout">
        <div class="or">або</div>

        <app-button
          appearance="link"
          @click="logout"
        >Вийти</app-button>
      </div>
    </div>
  </app-modal-window>
</template>

<script>
import AppModalWindow from '@/components/ui/AppModalWindow.vue'
import AppButton from '@/components/ui/AppButton.vue'

export default {
  name: 'AppConfirmEmail',
  components: {
    AppModalWindow,
    AppButton,
  },
  data() {
    return {
      letterSent: false,
      counter: {
        time: 0,
        active: false,
      },
    }
  },
  methods: {
    validateSend(mutate) {
      const { letterSent } = this

      if (!letterSent) {
        mutate()

        this.counter = {
          time: 60,
          active: true,
        }

        this.letterSent = true

        const counterInterval = setInterval(() => {
          this.counter.time -= 1

          if (this.counter.time <= 0) {
            this.letterSent = false

            this.counter = {
              active: false,
              time: 0,
            }

            clearInterval(counterInterval)
          }
        }, 1000)
      }
    },
    logout() {
      localStorage.removeItem('accessToken')

      this.$router.push({ name: 'SignIn' })
    },
  },
  props: {
    show: {
      type: Boolean,
      required: true,
    },
  },
}
</script>

<style lang="less" scoped>
.app-confirm-email {
  .confirm {
    margin: 30px 0;

    @keyframes gradientSpin {
      0%, 100% {
        background: rgb(26, 223, 173);
      }

      20% {
        background: rgb(190, 17, 212);
      }

      40% {
        background: rgb(159, 216, 27);
      }

      60% {
        background: rgb(126, 20, 197);
      }

      80% {
        background: rgb(30, 223, 165);
      }
    }

    @keyframes scale {
      0%, 100% {
        transform: scale(1);
      }

      50% {
        transform: scale(0.9);
      }
    }

    .icon {
      font-size: 60px;
      margin-bottom: 20px;
      color: var(--color-font-dark);

      width: 100px;
      height: 100px;
      display: flex;


      margin: 0 auto 30px;

      border-radius: 50%;
      background: linear-gradient(360deg, #faa, #f44);

      animation: gradientSpin 7s infinite, scale 2s infinite;

      color: #fff;

      .obj {
        margin: auto;
      }
    }

    .title {
      font-size: 1.4em;
      margin-bottom: 20px;
    }

    .text {
      color: var(--color-font-dark);
    }

    .title, .text {
      max-width: 400px;
    }

    .send-again-btn {
      margin-top: 30px;

      button {
        transition: all .3s;

        &.neutral {
          background: var(--color-bg-light);
          cursor: default;
        }
      }
    }

    .logout {
      .or {
        margin: 20px 0;
        color: var(--color-font-dark);
      }
    }
  }
}
</style>
