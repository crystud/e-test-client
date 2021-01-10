<template>
  <app-modal-window
    :show="show"
    class="modal"
  >
    <div class="app-settings">
      <div class="title">Налаштування</div>

      <div class="list">
        <div class="property">
          <div class="name">Темна тема</div>
          <div class="value">
            <app-switch
              :isOn="darkTheme"
              @switch="setTheme"
            ></app-switch>
          </div>
        </div>
      </div>

      <div class="footer">
        <span>Зміни зберігаються автоматично</span>

        <app-button
          appearance="neutral"
          @click="$emit('close')"
        >
          Закрити
        </app-button>
      </div>
    </div>
  </app-modal-window>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

import AppModalWindow from '@/components/ui/AppModalWindow.vue'
import AppButton from '@/components/ui/AppButton.vue'
import AppSwitch from '@/components/ui/AppSwitch.vue'

export default {
  name: 'AppSettings',
  components: {
    AppButton,
    AppModalWindow,
    AppSwitch,
  },
  props: {
    show: {
      type: Boolean,
      required: true,
      default: () => false,
    },
  },
  data() {
    return {
      currentLanguage: localStorage.getItem('lang'),
      languages: [
        ['Українська', 'ua'],
        ['English', 'en'],
        ['Deutsch', 'de'],
      ],
    }
  },
  computed: {
    ...mapGetters({
      darkTheme: 'theme/isDarkTheme',
    }),
  },
  methods: {
    ...mapActions({
      setTheme: 'theme/setCurrentTheme',
    }),
    handleLanguageChange(ev) {
      const { target: { value } } = ev || {}

      localStorage.setItem('lang', value)
    },
    go() {
      this.$emit('close')

      const name = 'activity'

      if (this.$route.name !== name) {
        this.$router.push({ name })
      }
    },
  },
}
</script>

<style lang="less" scoped>
.modal {
  z-index: 2005;

  .app-settings {
    font-weight: 300;
    width: 80vw;
    max-width: 400px;

    .title {
      font-size: 1.6em;

      margin-bottom: 50px;
      color: var(--color-font-main);
    }

    .list {
      font-size: 1.1em;

      margin-bottom: 40px;

      .property {
        display: grid;
        grid-template-columns: 100px 1fr;
        grid-gap: 10px;

        align-items: center;

        margin-bottom: 20px;

        .name {
          color: var(--color-font-dark);
          text-align: left;
        }

        .value {
          display: flex;
          justify-content: flex-end;

          color: var(--color-font-main);
        }
      }
    }

    .visit-activity {
      color: var(--color-accent-orange);
      text-align: center;
      margin-bottom: 30px;
      cursor: pointer;

      &:hover {
        text-decoration: underline;
      }
    }

    .footer {
      display: flex;
      align-items: center;
      justify-content: space-between;

      span {
        display: inline-block;
        margin-right: 40px;
        width: 150px;
        color: var(--color-font-dark);
      }
    }

    @media screen and (max-width: 500px) {
      .title {
        margin-bottom: 30px;
      }

      .list .property {
        grid-template-columns: 1fr;
        margin-bottom: 20px;

        .name, .value {
          text-align: center;
          justify-content: center;
        }
      }

      .footer {
        flex-direction: column;

        span {
          margin: 0 0 20px;
        }
      }
    }
  }
}
</style>
