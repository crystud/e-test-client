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

        <div
          v-if="nonHandleableStudents.length"
          class="non-handleable-students"
        >
          <div class="title">Зображення, що не мають закріпленого студента</div>

          <div class="list">
            <div
              v-for="file in nonHandleableStudents"
              :key="file"
              class="picture"
              @click="$emit('setAvatarDetailInfo', file)"
            >
              {{file}}
            </div>
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
        const text = e?.response.data.message || 'Не вдалось створити запрошення. Перевірте правильність даних'

        this.setAlert({
          title: 'Помилка',
          text,
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
    nonHandleableStudents: {
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

    .non-handleable-students {
      margin: 20px 0;

      .title {
        color: var(--color-font-dark);
        padding-left: 15px;

        position: relative;

        &::before {
          content: "";

          position: absolute;
          top: 0;
          left: 0;
          bottom: 0;
          margin: auto;

          width: 7px;
          height: 7px;
          border-radius: 10px;

          background: var(--color-accent-red);
        }
      }

      .list {
        margin-top: 10px;

        .picture {
          display: inline-block;
          background: var(--color-bg-main);
          border-radius: 5px;
          padding: 10px 15px;
          cursor: pointer;

          position: relative;

          &::before {
            content: "";

            position: absolute;
            bottom: 0;
            left: 0;
            right: 0;
            margin: auto;

            max-width: 70%;
            width: 40px;
            height: 2px;

            background: var(--color-accent-red);
            border-radius: 10px;
          }
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
