<template>
  <div class="app-ask-subject">
    <app-preloader :show="showPreloader"></app-preloader>

    <app-modal-window
      :show="show && !showPreloader && !alert.show"
      :noPaddings="true"
    >
      <slide-up-down
        :active="Boolean(multiple && selected.length)"
        :duration="300"
      >
        <div class="selected-groups-list">
          <span class="label">Обрані групи:</span>

          <span
            v-for="(group, index) in selected"
            :key="group.id"
            class="group"
          >
            <span class="name">{{group.name}}</span>

            <font-awesome-icon
              icon="times-circle"
              class="remove-icon"
              @click="selected.splice(index, 1)"
            ></font-awesome-icon>
          </span>
        </div>
      </slide-up-down>

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
            @selected="group => !multiple ? $emit('selected', group) : toggleSelected(group)"
            :selectedGroups="selected"
          ></app-speciality-item>
        </div>
      </div>

      <div
        class="btns"
        :class="{ multiple }"
      >
        <app-button
          appearance="neutral"
          class="leave"
          @click="$emit('close')"
        >Скасувати</app-button>

        <app-button
          v-if="multiple"
          appearance="neutral"
          class="submit-selected"
          :class="{
            'is-active': selected.length !== 0,
          }"
          @click="$emit('selected', selected)"
        >Обрати {{selected.length}} груп</app-button>
      </div>
    </app-modal-window>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'

import SlideUpDown from 'vue-slide-up-down'

import AppModalWindow from '@/components/ui/AppModalWindow.vue'
import AppPreloader from '@/components/ui/AppPreloader.vue'
import AppButton from '@/components/ui/AppButton.vue'

import AppSpecialityItem from '@/components/templates/teacher/AppSpecialityItem.vue'

export default {
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
      selected: [],
    }
  },
  methods: {
    ...mapActions({
      getSpecialities: 'specialities/get',
      setAlert: 'alert/set',
    }),
    toggleSelected(group) {
      let existsIndex

      const exists = this.selected.filter((groupInfo, index) => {
        const condition = groupInfo.id === group.id

        if (condition) {
          existsIndex = index

          return true
        }

        return false
      })

      if (!exists.length) {
        this.selected.push(group)
      } else {
        this.selected.splice(existsIndex, 1)
      }
    },
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
    alreadySelected() {
      this.selected = this.alreadySelected
    },
  },
  created() {
    this.checkCurrentState()
  },
  props: {
    show: {
      type: Boolean,
      required: true,
      default: () => false,
    },
    multiple: {
      type: Boolean,
      required: false,
      default: () => false,
    },
    alreadySelected: {
      type: Array,
      required: false,
      default: () => [],
    },
  },
  components: {
    AppSpecialityItem,
    AppModalWindow,
    SlideUpDown,
    AppPreloader,
    AppButton,
  },
}
</script>

<style lang="less" scoped>
.app-ask-subject {
  .title,
  .content,
  .selected-groups-list {
    width: 100vw;
    max-width: 500px;
  }

  .selected-groups-list {
    background: var(--color-bg-main);
    padding: 20px;

    .label, .group {
      margin-bottom: 10px;
    }

    .label {
      color: var(--color-font-dark);
      margin-right: 10px;
    }

    .group {
      display: inline-block;
      padding: 5px 10px;
      margin: 0 10px 5px 0;
      user-select: none;

      background: var(--color-bg-dark);
      border-radius: 5px;

      .text {
        color: var(--color-accent-green);
      }

      .remove-icon {
        margin-left: 5px;
        cursor: pointer;
        color: var(--color-accent-red);
      }

      transition: all .3s;
    }
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

  .btns {
    display: grid;
    grid-template-columns: 1fr;

    grid-gap: 10px;

    padding: 10px;

    &.multiple {
      grid-template-columns: 1fr 1fr;
    }

    .leave, .submit-selected {
      background: var(--color-bg-main);
      padding: 13px 15px;
    }

    .leave {
      color: var(--color-accent-red);
    }

    .submit-selected {
      color: var(--color-font-dark);
      cursor: no-drop;

      transition: all .3s;

      &.is-active {
        color: var(--color-accent-green);
        cursor: pointer;
      }
    }
  }
}
</style>
