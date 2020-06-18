<template>
  <div class="app-ask-import-subject">
    <app-preloader :show="showPreloader"></app-preloader>

    <app-modal-window :show="show">
      <div class="content">
        <div class="title">Імпортувати тему?</div>

        <div class="text">
          При імпортуванні теми всі її запитання
          будуть занесені до тесту "{{test.name}}". Продовжити?
        </div>

        <div class="btns">
          <app-button
            appearance="neutral"
            class="cancel"
            @click="$emit('cancel')"
          >Скасувати</app-button>

          <app-button
            appearance="neutral"
            class="insert"
            @click="insert"
          >Імпортувати</app-button>
        </div>
      </div>
    </app-modal-window>
  </div>
</template>

<script>
import { mapActions } from 'vuex'

import AppPreloader from '@/components/ui/AppPreloader.vue'
import AppModalWindow from '@/components/ui/AppModalWindow.vue'
import AppButton from '@/components/ui/AppButton.vue'

export default {
  data() {
    return {
      showPreloader: false,
    }
  },
  methods: {
    ...mapActions({
      insertTopicToTest: 'questions/addTopicToTest',
      setAlert: 'alert/set',
    }),
    async insert() {
      const {
        subject: { id: topic },
        test: { id: test },
      } = this

      this.showPreloader = true

      try {
        await this.insertTopicToTest({ topic, test })

        this.setAlert({
          title: 'Тему імпортовано',
          show: true,
          isSuccess: true,
          delay: 1000,
        })

        this.$emit('created')
      } catch (e) {
        const text = e?.response.data.message || 'Не вдалось імпортувати тему'

        this.setAlert({
          title: 'Помилка',
          text,
          show: true,
          isSuccess: false,
          delay: 1500,
        })
      } finally {
        this.showPreloader = false
      }
    },
  },
  components: {
    AppModalWindow,
    AppPreloader,
    AppButton,
  },
  props: {
    show: {
      type: Boolean,
      required: true,
    },
    test: {
      type: Object,
      required: true,
    },
    subject: {
      type: Object,
      required: true,
    },
  },
}
</script>

<style lang="less" scoped>
.app-ask-import-subject {
  .content {
    max-width: 450px;
    text-align: center;

    .title {
      font-size: 1.4em;
      font-weight: bold;
    }

    .text {
      margin: 20px 0;
      color: var(--color-font-dark);
    }

    .btns {
      margin-top: 30px;

      .cancel, .insert {
        margin: 10px;
        background: var(--color-bg-main);
      }

      .cancel {
        color: var(--color-accent-red);
      }

      .insert {
        color: var(--color-accent-green);
      }
    }
  }
}
</style>
