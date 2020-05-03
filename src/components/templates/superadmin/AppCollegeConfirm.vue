<template>
  <app-modal-window
    :show="show"
    :noPaddings="true"
    class="app-college-confirm"
  >
    <app-preloader
      :show="preloader.show"
      :title="preloader.title"
    ></app-preloader>

    <div class="title">Верифікація коледжу</div>

    <div class="content">
      <div class="name">{{college.name}}</div>

      <app-data-list
        class="data-list"
        :data="[
          ['E-mail', college.email],
          ['Веб-сайт', college.site],
          ['Місцезнаходження', college.address],
        ]"
      ></app-data-list>

      <div class="btns">
        <app-button
          appearance="brand"
          @click="verificate"
        >Верифікувати</app-button>

        <app-button
          appearance="neutral"
          @click="$emit('close')"
        >Закрити</app-button>
      </div>
    </div>
  </app-modal-window>
</template>

<script>
import { mapActions } from 'vuex'

import AppModalWindow from '../../ui/AppModalWindow.vue'
import AppDataList from '../../ui/AppDataList.vue'
import AppButton from '../../ui/AppButton.vue'
import AppPreloader from '../../ui/AppPreloader.vue'

export default {
  props: {
    show: {
      type: Boolean,
      required: true,
      default: () => false,
    },
    college: {
      type: Object,
      required: true,
      default: () => null,
    },
  },
  data() {
    return {
      preloader: {
        title: '',
        show: false,
      },
    }
  },
  methods: {
    ...mapActions({
      verificateCollege: 'college/verificate',
    }),
    verificate() {
      const { college: { id } } = this

      this.preloader = {
        show: true,
        title: 'Верифікуємо...',
      }

      this.verificateCollege(id).finally(() => {
        this.preloader = {
          show: false,
          title: '',
        }

        this.$emit('verificated')
      })
    },
  },
  components: {
    AppModalWindow,
    AppDataList,
    AppButton,
    AppPreloader,
  },
}
</script>

<style lang="less" scoped>
.app-college-confirm {
  text-align: left;

  .title {
    padding: 20px;
    text-align: center;
    border-bottom: 1px solid var(--color-bg-main);
  }

  .content {
    padding: 20px;

    .name {
      font-size: 1.5em;
    }

    .btns {
      display: grid;
      grid-template-columns: 1fr 2fr;
      grid-gap: 20px;
    }
  }
}
</style>
