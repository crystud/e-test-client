<template>
  <div class="app-edbo-colleges">
    <app-preloader :show="showPreloader"></app-preloader>

    <app-alert
      :isSuccess="alert.isSuccess"
      :title="alert.title"
      :show="alert.show"
      :text="alert.text"
      :delay="alert.delay"
      @close="alert.show = false"
    ></app-alert>

    <app-modal-window
      :show="show && fetched"
      :noPaddings="true"
    >
      <div class="title">Навчальні заклади за запитом: "{{query}}"</div>

      <div class="content">
        <div
          class="no-result"
          v-if="fetched && !colleges.length"
        >За вашим запитом не знайдено навчальних закладів...</div>

        <div
          class="list"
          v-if="fetched && colleges.length"
        >
          <div
            class="item"
            v-for="({ id, name }, i) in colleges"
            v-bind:key="i"
            @click="$emit('selected', id)"
          >{{name}}</div>
        </div>
      </div>

      <div class="close">
        <app-button
          appearance="neutral"
          @click="$emit('close')"
        >Закрити</app-button>
      </div>
    </app-modal-window>
  </div>
</template>

<script>
import { mapActions } from 'vuex'

import AppModalWindow from '../../ui/AppModalWindow.vue'
import AppButton from '../../ui/AppButton.vue'
import AppPreloader from '../../ui/AppPreloader.vue'
import AppAlert from '../../ui/AppAlert.vue'

export default {
  components: {
    AppModalWindow,
    AppButton,
    AppPreloader,
    AppAlert,
  },
  data() {
    return {
      colleges: [],
      fetched: false,
      showPreloader: false,
      alert: {
        title: '',
        text: '',
        isSuccess: false,
        delay: 3000,
        show: false,
      },
    }
  },
  methods: {
    ...mapActions({
      search: 'edbo/search',
    }),
  },
  watch: {
    async show() {
      const { query, show } = this

      if (show) {
        this.showPreloader = true

        this.search(query).then((data) => {
          this.showPreloader = false

          this.fetched = true
          this.colleges = data
        }).catch(() => {
          this.fetched = true
          this.colleges = []

          this.alert = {
            title: 'Помилка...',
            text: 'Нам не вдалось отримати дані про ваш НЗ з ЄДЕБЕО...',
            isSuccess: false,
            delay: 3000,
            show: true,
          }
        }).finally(() => {
          this.showPreloader = false
        })

        return
      }

      this.colleges = []
      this.fetched = false
    },
  },
  props: {
    show: {
      type: Boolean,
      required: true,
      default: () => false,
    },
    query: {
      type: String,
      required: true,
      default: () => '',
    },
  },
}
</script>

<style lang="less" scoped>
.app-edbo-colleges {
  .title {
    text-align: center;
    border-bottom: 1px solid var(--color-bg-main);

    font-size: 1.2em;
    font-weight: 400;
  }

  .title,
  .content,
  .close {
    padding: 20px;
  }

  .close {
    border-top: 1px solid var(--color-bg-main);
    padding: 10px;

    text-align: right;
  }

  .content {
    width: 100%;
    max-width: 600px;
    max-height: 70vh;
    overflow-y: auto;

    font-size: 1.1em;

    .no-result {
      font-size: 1.3em;
      text-align: center;
      margin: 30px 0;
    }

    .list {
      text-align: left;

      .item {
        margin-bottom: 15px;
        cursor: pointer;

        &:hover {
          text-decoration: underline;
        }
      }
    }
  }
}
</style>
