<template>
  <div class="app-create-topic">
    <app-preloader :show="showPreloader"></app-preloader>

    <app-modal-window
      :show="show && !alert.show"
      :noPaddings="true"
    >
      <div class="title">Створення теми</div>

      <div class="content">
        <div class="text">Створення теми для предмету "{{subject.name}}"</div>

        <app-input
          appearance="secondary"
          class="app-input"
          placeholder="Назва теми"
          :value="name"
          @change="newVal => name = newVal"
        ></app-input>
      </div>

      <div class="btns">
        <button
          class="leave"
          @click="$emit('close')"
        >Скасувати</button>

        <button
          class="create"
          @click="create"
        >Створити тему</button>
      </div>
    </app-modal-window>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'

import AppModalWindow from '@/components/ui/AppModalWindow.vue'
import AppPreloader from '@/components/ui/AppPreloader.vue'
import AppInput from '@/components/ui/AppInput.vue'

export default {
  components: {
    AppModalWindow,
    AppPreloader,
    AppInput,
  },
  props: {
    show: {
      type: Boolean,
      required: true,
      default: () => false,
    },
    subject: {
      type: Object,
      required: true,
      default: () => {},
    },
  },
  data() {
    return {
      name: '',
      showPreloader: false,
    }
  },
  computed: {
    ...mapGetters({
      alert: 'alert/alert',
    }),
  },
  methods: {
    ...mapActions({
      createTopic: 'topics/create',
      setAlert: 'alert/set',
    }),
    async create() {
      const { name, subject: { id } } = this

      if (!name) {
        this.setAlert({
          title: 'Вкажіть назву',
          text: '',
          delay: 1000,
          show: true,
          isSuccess: false,
        })

        return
      }

      if (!id) {
        this.setAlert({
          title: 'Помилка',
          text: 'Не вдалось оприділити ID предмету',
          delay: 1000,
          show: true,
          isSuccess: false,
        })

        return
      }

      try {
        this.showPreloader = true

        await this.createTopic({
          name,
          subject: id,
        })

        this.name = ''

        this.setAlert({
          title: 'Тему створено',
          isSuccess: true,
          show: true,
          delay: 1500,
        })

        setTimeout(this.$emit('created'), 1400)
      } catch (e) {
        this.setAlert({
          title: 'Помилка',
          text: 'Нам не вдалось створити тему. Спробуйте пізніше...',
          isSuccess: false,
          show: true,
          delay: 1500,
        })
      } finally {
        this.showPreloader = false
      }
    },
  },
}
</script>

<style lang="less" scoped>
.app-create-topic {
  .title,
  .content {
    max-width: 500px;
    width: 100vw;
  }

  .title {
    padding: 20px;
    font-size: 1.3em;
    font-weight: 400;
    border-bottom: 1px solid var(--color-bg-main);
  }

  .content {
    padding: 20px;

    .text {
      color: var(--color-font-dark);
      margin-bottom: 20px;
    }

    .app-input {
      background: var(--color-bg-main);
    }
  }

  .btns {
    display: grid;
    grid-template-columns: 1fr 1fr;
    border-top: 1px solid var(--color-bg-main);

    margin-top: 20px;

    button {
      padding: 20px;
      font-size: 1em;
      background: transparent;
      border: 0;
      cursor: pointer;

      &:hover {
        background: var(--color-bg-main);
      }

      &.leave {
        color: var(--color-accent-red);
      }

      &.create {
        color: var(--color-accent-green);
      }
    }
  }
}
</style>
