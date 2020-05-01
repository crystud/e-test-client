<template>
  <div class="app-warn-passing">
    <app-preloader :show="showPreloader"></app-preloader>

    <app-modal-window
      :show="show && !alert.show"
      :noPaddings="true"
    >
      <div class="title">Ви впевнені, що хочете пройти тест?</div>

      <div
        class="content"
        v-if="ticket.id"
      >
        <div class="test">
          <div class="name">{{ticket.test.title}}</div>
          <div class="description">{{ticket.test.description}}</div>
        </div>
      </div>

      <div class="btns">
        <button
          class="leave"
          @click="$emit('cancel')"
        >Скасувати</button>

        <button
          class="pass"
          @click="pass"
        >Почати</button>
      </div>
    </app-modal-window>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'

import AppPreloader from '@/components/ui/AppPreloader.vue'
import AppModalWindow from '@/components/ui/AppModalWindow.vue'

export default {
  components: {
    AppPreloader,
    AppModalWindow,
  },
  props: {
    show: {
      type: Boolean,
      required: true,
    },
    ticket: {
      type: Object,
      required: true,
    },
  },
  computed: {
    ...mapGetters({
      alert: 'alert/alert',
    }),
  },
  methods: {
    ...mapActions({
      setAlert: 'alert/set',
      useTicket: 'tickets/use',
    }),
    async pass() {
      const {
        ticket,
        ticket: { test: { id: testID } },
      } = this

      try {
        this.showPreloader = true

        const { attempts: [attemptID] } = await this.useTicket(ticket.id)

        this.$router.push({
          name: 'testPass',
          params: {
            attemptID,
            testID,
          },
        })
      } catch (e) {
        this.setAlert({
          title: 'Помилка',
          text: 'Не вдалось отримати дані про квиток',
          isSuccess: false,
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
}
</script>

<style lang="less" scoped>
.app-warn-passing {
  .title,
  .content {
    width: 100vw;
    max-width: 500px;
    padding: 20px;
  }

  .title {
    font-size: 1.3em;
    color: var(--color-font-main);

    text-align: center;
    border-bottom: 1px solid var(--color-bg-main);
  }

  .content {
    text-align: center;

    .test {
      .name {
        color: var(--color-font-main);
        font-size: 1.3em;
        margin-bottom: 10px;
      }

      .description {
        color: var(--color-font-dark);
      }
    }
  }

  .btns {
    display: grid;
    grid-template-columns: 1fr 1fr;
    border-top: 1px solid var(--color-bg-main);

    button {
      background: transparent;
      border: 0;
      padding: 20px;
      font-size: 1em;
      cursor: pointer;
      transition: none;

      &:hover {
        background: var(--color-bg-main);
      }

      &.leave {
        color: var(--color-accent-red);
      }

      &.pass {
        color: var(--color-accent-green);
      }
    }
  }
}
</style>
