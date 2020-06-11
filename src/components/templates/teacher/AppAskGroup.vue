<template>
  <div class="app-ask-subject">
    <app-preloader :show="showPreloader"></app-preloader>

    <app-modal-window
      :show="show && !showPreloader && !alert.show"
      :noPaddings="true"
    >
      <div class="title">Оберіть групу</div>

      <div class="content">
        <div
          v-if="!specialities.length"
          class="no-subjects"
        >Жодної спеціальності не знайдено...</div>

        <div class="list">
          <app-speciality-item
            v-for="(speciality, index) in specialities"
            :key="index"
            :speciality="speciality"
            :selected="selectedSpeciality === index"
            @click="selectedSpeciality !== index ? selectedSpeciality = index : false"
            @selected="group => $emit('selected', group)"
          ></app-speciality-item>
        </div>
      </div>

      <div
        class="leave"
        @click="$emit('close')"
      >Скасувати</div>
    </app-modal-window>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'

import AppModalWindow from '@/components/ui/AppModalWindow.vue'
import AppPreloader from '@/components/ui/AppPreloader.vue'
import AppSpecialityItem from '@/components/templates/teacher/AppSpecialityItem.vue'

export default {
  components: {
    AppSpecialityItem,
    AppModalWindow,
    AppPreloader,
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
      alert: 'alert/alert',
    }),
  },
  data() {
    return {
      showPreloader: false,
      selectedSpeciality: null,
      specialities: [],
    }
  },
  methods: {
    ...mapActions({
      getSpecialities: 'specialities/get',
      setAlert: 'alert/set',
    }),
    async checkCurrentState() {
      const { show } = this

      this.selectedSpeciality = null

      if (show) {
        try {
          this.showPreloader = true
          this.specialities = await this.getSpecialities()
        } catch (e) {
          const text = e?.response.data.message || 'Не вдалось отримати список спеціальностей'

          this.setAlert({
            title: 'Помилка',
            text,
            delay: 2000,
            isSuccess: false,
          })
        } finally {
          this.showPreloader = false
        }
      }
    },
  },
  watch: {
    async show() {
      this.checkCurrentState()
    },
  },
  created() {
    this.checkCurrentState()
  },
}
</script>

<style lang="less" scoped>
.app-ask-subject {
  .title, .content {
    width: 100vw;
    max-width: 500px;
  }

  .title {
    font-size: 1.3em;
    border-bottom: 1px solid var(--color-bg-main);
    padding: 20px;
  }

  .content {
    .no-subjects {
      font-size: 1.3em;
      color: var(--color-font-dark);
      text-align: center;
      margin: 40px 20px;
    }

    .subject {
      padding: 20px;
      cursor: pointer;
      user-select: none;

      &:hover {
        background: var(--color-bg-main);
      }

      .name {
        font-size: 1.3em;
        margin-bottom: 5px;
        font-weight: 400;
      }

      .additional {
        color: var(--color-font-dark);
      }
    }
  }

  .leave {
    width: 100%;
    padding: 20px;
    font-size: 1em;
    display: block;
    text-align: center;

    border: 0;
    border-top: 1px solid var(--color-bg-main);
    background: transparent;
    color: var(--color-accent-red);
    cursor: pointer;

    &:hover {
      background: var(--color-bg-main);
    }
  }
}
</style>
