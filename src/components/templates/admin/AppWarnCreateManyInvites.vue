<template>
  <div>
    <app-preloader :show="showPreloader"></app-preloader>

    <app-modal-window
      :show="Boolean(show && !alert.show)"
      class="app-warn-create-many-invites"
    >
      <div class="content">
        <div class="header">
          Увага, прочитайте уважно
        </div>

        <div class="wrap">
          <div class="text">
            <p>
              Після того, як ви натисните кнопку "Створити запрошення",
              буде створено {{list.length}} запрошень в групу {{group.name}}.
            </p>

            <p>
              Уважно перегляньте <span @click="$emit('showFullList')" class="full-list">
              повний список запрошень</span>, чи ви створюєте запрошення саме для потрібної групи,
              та чи немає помилок</p>
          </div>
        </div>

        <div class="btns">
          <app-button
            appearance="neutral"
            class="leave"
            @click="$emit('close')"
          >Закрити</app-button>

          <app-button
            appearance="neutral"
            class="create"
            @click="createInvites"
          >Створити</app-button>
        </div>
      </div>
    </app-modal-window>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'

import AppModalWindow from '@/components/ui/AppModalWindow.vue'
import AppButton from '@/components/ui/AppButton.vue'
import AppPreloader from '@/components/ui/AppPreloader.vue'

export default {
  methods: {
    ...mapActions({
      createManyInvites: 'invites/createMany',
      setAlert: 'alert/set',
    }),
    async createInvites() {
      const {
        list: invites,
        group: { id: group },
      } = this

      try {
        this.showPreloader = true

        await this.createManyInvites({ invites, group })

        this.setAlert({
          title: 'Запрошення створені',
          show: true,
          delay: 2000,
          isSuccess: true,
        })

        this.$emit('invitesCreated')
      } catch (e) {
        this.setAlert({
          title: 'Помилка',
          text: 'Не вдалось створити запрошення. Перевірте правильність даних',
          isSuccess: false,
          delay: 3000,
          show: true,
        })
      } finally {
        this.showPreloader = false
      }
    },
  },
  data() {
    return {
      showPreloader: false,
    }
  },
  computed: {
    ...mapGetters({
      alert: 'alert/alert',
    }),
  },
  props: {
    show: {
      type: Boolean,
      required: true,
    },
    group: {
      type: Object,
      required: true,
    },
    list: {
      type: Array,
      required: true,
    },
  },
  components: {
    AppModalWindow,
    AppPreloader,
    AppButton,
  },
}
</script>

<style lang="less" scoped>
.app-warn-create-many-invites {
  .content {
    width: 100vw;
    max-width: 500px;

    .header {
      text-align: center;
      margin-bottom: 20px;
      font-size: 1.3em;
      color: var(--color-accent-orange);
    }

    .text {
      p {
        margin-bottom: 10px;
        color: var(--color-font-dark);
      }

      span {
        color: var(--color-accent-blue);
        cursor: pointer;

        &:hover {
          text-decoration: underline;
        }
      }
    }

    .btns {
      margin-top: 30px;

      display: grid;
      grid-template-columns: 1fr 1fr;
      grid-gap: 20px;

      .create {
        background: var(--color-accent-green);
        color: #fff;
      }

      .leave {
        color: var(--color-font-dark);
        background: var(--color-bg-main);
      }
    }
  }
}
</style>
