<template>
  <div
    class="app-speciality-item"
    :class="{ selected }"
    @click="$emit('click')"
  >
    <app-preloader :show="showPreloader"></app-preloader>

    <div class="info">
      <div class="data">
        <div class="name">{{speciality.name}}</div>
        <div class="groups-count">Груп в спеціальності: {{speciality.groups.length}}</div>
      </div>

      <div class="toggle">
        <font-awesome-icon
          icon="chevron-down"
        ></font-awesome-icon>
      </div>
    </div>

    <app-fade-card :show="selected">
      <div class="groups">
        <div
          v-for="(group, index) in (info.groups || [])"
          :key="index"
          class="group"
          @click="$emit('selected', group)"
        >
          {{group.name}}
        </div>
      </div>
    </app-fade-card>
  </div>
</template>

<script>
import { mapActions } from 'vuex'

import AppFadeCard from '@/components/ui/AppFadeCard.vue'
import AppPreloader from '@/components/ui/AppPreloader.vue'

export default {
  data() {
    return {
      info: {},
      showPreloader: false,
    }
  },
  methods: {
    ...mapActions({
      getSpeciality: 'specialities/getByID',
      setAlert: 'alert/set',
    }),
    async loadDetailedInfo() {
      const { speciality: { id } } = this

      if (!id) {
        this.setAlert({
          title: 'Помилка',
          text: 'Не вдалось оприділити ID спеціальності...',
          isSuccess: false,
        })

        return
      }

      try {
        this.showPreloader = true

        this.info = await this.getSpeciality(id)
      } catch (e) {
        const text = e?.response.data.message || 'Не вдалось отримати інформацію про спеціальність...'

        this.setAlert({
          title: 'Помилка',
          text,
          isSuccess: false,
        })
      } finally {
        this.showPreloader = false
      }
    },
  },
  watch: {
    selected() {
      const { selected } = this

      if (selected) {
        this.loadDetailedInfo()
      }
    },
  },
  components: {
    AppFadeCard,
    AppPreloader,
  },
  props: {
    speciality: {
      type: Object,
      required: true,
    },
    selected: {
      type: Boolean,
      required: true,
    },
  },
}
</script>

<style lang="less" scoped>
.app-speciality-item {
  padding: 20px;
  cursor: pointer;

  .info {
    display: grid;
    grid-template-columns: 1fr 40px;
    grid-gap: 20px;

    .data {
      .name {
        font-size: 1.3em;
      }

      .groups-count {
        margin-top: 5px;
        color: var(--color-font-dark);
      }
    }

    .toggle {
      display: flex;
      justify-content: center;
      align-items: center;

      font-size: 1.2em;
      color: var(--color-font-dark);
      transform: rotate(0deg);

      transition: all .3s;
    }
  }

  .groups {
    margin-top: 0px;

    .group {
      display: inline-block;
      margin: 0 10px 10px 0;
      padding: 5px 10px;
      border-radius: 5px;
      cursor: pointer;
      background: var(--color-bg-main);
      transition: none;

      &:hover {
        background: var(--color-accent-green);
      }
    }
  }

  &.selected {
    cursor: default;

    .toggle {
      color: var(--color-font-main);
      transform: rotate(180deg);
    }

    .groups {
      margin-top: 20px;
    }
  }
}
</style>
