<template>
  <div class="app-create-student">
    <app-preloader :show="showPreloader"></app-preloader>

    <app-modal-window
      :show="Boolean(show && !alert.show)"
      :noPaddings="true"
    >
      <div class="title">Створення студента</div>

      <div
        class="content"
        v-if="user.id"
      >
        <div class="student">
          <div class="label">Користувач</div>

          <div class="user">
            <div class="image">
              <img
                :src="require('@/assets/no_user.png')"
                alt="user's image"
              />
            </div>

            <div class="info">
              <div class="name">{{user.lastName}} {{user.firstName}} {{user.patronymic}}</div>
              <div class="email">{{user.email}}</div>
            </div>
          </div>
        </div>

        <div class="group">
          <div class="label">Група</div>

          <div class="markup">
            <div class="name">{{group.name}}</div>

            <div class="info">
              <div class="course">{{group.course}} курс</div>
              <div class="speciality">{{group.speciality.name}}</div>
            </div>
          </div>
        </div>

        <app-input
          appearance="secondary"
          class="scoring-book"
          :autofocus="true"
          placeholder="Номер залікової книжки"
          :value="scoringBook"
          @change="value => scoringBook = value"
        ></app-input>

        <div class="btns">
          <app-button
            class="close"
            appearance="neutral"
            @click="$emit('close')"
          >Скасувати</app-button>

          <app-button
            class="create"
            appearance="neutral"
            @click="create"
          >Створити</app-button>
        </div>
      </div>
    </app-modal-window>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'

import AppPreloader from '@/components/ui/AppPreloader.vue'
import AppModalWindow from '@/components/ui/AppModalWindow.vue'
import AppButton from '@/components/ui/AppButton.vue'
import AppInput from '@/components/ui/AppInput.vue'

export default {
  computed: {
    ...mapGetters({
      alert: 'alert/alert',
    }),
  },
  watch: {
    show() {
      const { show } = this

      if (show) {
        this.scoringBook = ''
      }
    },
  },
  methods: {
    ...mapActions({
      createStudent: 'student/create',
      setAlert: 'alert/set',
    }),
    async create() {
      const {
        scoringBook,
        user: { id: user },
        group: { id: group },
      } = this

      if (!scoringBook) {
        this.setAlert({
          title: 'Заповніть номер залікової книжки',
          text: '',
          show: true,
          isSuccess: false,
        })

        return
      }

      try {
        this.showPreloader = true

        await this.createStudent({
          scoringBook: parseInt(scoringBook, 10),
          user,
          group,
        })

        this.$emit('created')
      } catch (e) {
        const text = e?.response.data.message || 'Не вдалось створити студента'

        this.setAlert({
          title: 'Помилка',
          text,
          show: true,
          isSuccess: false,
        })
      } finally {
        this.showPreloader = false
      }
    },
  },
  props: {
    show: {
      type: Boolean,
      required: true,
    },
    user: {
      type: Object,
      required: true,
    },
    group: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      showPreloader: false,
      scoringBook: '',
    }
  },
  components: {
    AppModalWindow,
    AppPreloader,
    AppButton,
    AppInput,
  },
}
</script>

<style lang="less" scoped>
.app-create-student {
  .title, .content {
    padding: 20px;
  }

  .title {
    font-size: 1.3em;
    font-weight: bold;
    border-bottom: 1px solid var(--color-bg-main);
    color: var(--color-font-main);
  }

  .content {
    .label {
      color: var(--color-font-dark);
    }

    .user {
      display: grid;
      grid-template-columns: auto 1fr;
      grid-gap: 15px;
      background: var(--color-bg-main);
      border-radius: 10px;

      margin: 5px 0 15px;

      align-items: center;

      .image {
        width: 70px;
        height: 70px;
        border-radius: 10px;
        overflow: hidden;
        display: flex;

        img {
          margin: auto;
          width: 100%;
        }
      }

      .info {
        padding: 10px 0;

        .name {
          font-size: 1.1em;
          font-weight: 400;
        }

        .email {
          color: var(--color-accent-orange);
          margin-top: 5px;
        }
      }
    }

    .group {
      .markup {
        margin: 5px 0 10px;

        background: var(--color-bg-main);
        border-radius: 10px;

        display: grid;
        grid-template-columns: auto 1fr;

        align-items: center;

        .name, .info {
          padding: 10px 15px;
        }

        .name {
          font-size: 1.4em;
          font-weight: 400;

          height: 100%;

          color: var(--color-accent-green);

          display: flex;
          justify-content: center;
          align-items: center;
        }

        .info {
          div {
            margin: 5px 0;
            color: var(--color-font-dark);
          }
        }
      }
    }

    .scoring-book {
      width: 100%;
      background: var(--color-bg-main);
      margin: 30px 0;
    }

    .btns {
      margin-top: 25px;

      display: grid;
      grid-template-columns: 1fr 1fr;
      grid-gap: 20px;

      .close {
        color: var(--color-accent-red);
      }

      .create {
        color: var(--color-accent-green);
      }
    }
  }
}
</style>
