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

        <div class="property">
          <div class="name">Мова</div>
          <div class="value">
            <select>
              <option value="1">Українська</option>
              <option value="1">English</option>
              <option value="1">Deutsch</option>
            </select>
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
  computed: {
    ...mapGetters({
      darkTheme: 'theme/isDarkTheme',
    }),
  },
  methods: {
    ...mapActions({
      setTheme: 'theme/setCurrentTheme',
    }),
  },
}
</script>

<style lang="less" scoped>
.modal {
  z-index: 2005;

  .app-settings {
    font-weight: 100;
    padding: 20px;

    .title {
      font-size: 1.6em;

      margin-bottom: 20px;
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

    .footer {
      display: flex;
      align-items: center;

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
