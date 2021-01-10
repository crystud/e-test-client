<template>
  <div>
    <app-create-speciality
      :show="showCreateSpeciality"
      @close="showCreateSpeciality = false"
      @created="checkSpecialties"
    ></app-create-speciality>

    <app-preloader :show="showPreloader"></app-preloader>

    <app-modal-window
      :show="
        show
        && !showPreloader
        && !showCreateSpeciality"
      :noPaddings="true"
    >
      <div class="app-ask-speciality">
        <div class="title">Оберіть спеціальність</div>

        <div class="list">
          <div
            v-for="(speciality, index) in specialities"
            :key="index"
            class="speciality"
            @click="$emit('selected', speciality)"
          >
            <div class="name">{{speciality.name}}</div>
            <div class="code">Код: {{speciality.code}}</div>
          </div>
        </div>

        <div
          v-if="!specialities.length"
          class="no-specialities"
        >
          <div class="text">У вас наразі немає спеціальностей...</div>
          <span @click="showCreateSpeciality = true">Створити спеціальність</span>
        </div>

        <div class="btns">
          <div
            class="leave"
            @click="$router.push({ name: 'specialtys' })"
          >Перейти до спеціальностей</div>

          <div
            class="create"
            @click="showCreateSpeciality = true"
          >Створити спеціальність</div>
        </div>
      </div>
    </app-modal-window>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'

import AppModalWindow from '@/components/ui/AppModalWindow.vue'
import AppPreloader from '@/components/ui/AppPreloader.vue'
import AppCreateSpeciality from '@/components/templates/admin/AppCreateSpecialty.vue'

export default {
  components: {
    AppModalWindow,
    AppPreloader,
    AppCreateSpeciality,
  },
  methods: {
    ...mapActions({
      getSpecialties: 'specialities/get',
    }),
    checkSpecialties() {
      const { show } = this

      if (!show) return

      this.showPreloader = true

      this.getSpecialties().then(() => {
        this.showPreloader = false
      })
    },
  },
  computed: {
    ...mapGetters({
      specialities: 'specialities/list',
    }),
  },
  watch: {
    show() {
      this.checkSpecialties()
    },
  },
  props: {
    show: {
      type: Boolean,
      required: true,
      default: () => false,
    },
  },
  created() {
    this.checkSpecialties()
  },
  data() {
    return {
      showPreloader: false,
      showCreateSpeciality: false,
    }
  },
}
</script>

<style lang="less" scoped>
.app-ask-speciality {
  width: 500px;

  .title {
    padding: 20px;
  }

  .clickable {
    cursor: pointer;
    user-select: none;
  }

  .list {
    max-height: 65vh;
    overflow-y: auto;

    .speciality {
      padding: 20px;
      transition: none;

      .clickable();

      &:hover {
        background: var(--color-bg-main);
      }

      .name {
        color: var(--color-font-main);
        font-size: 1.3em;
      }

      .code {
        color: var(--color-font-dark);
        margin-top: 5px;
      }
    }
  }

  .no-specialities {
    text-align: center;
    margin: 40px;

    .text {
      font-size: 1.3em;
      color: var(--color-font-dark);
    }

    span {
      color: var(--color-accent-green);

      display: block;
      margin-top: 10px;
      cursor: pointer;

      &:hover {
        text-decoration: underline;
      }
    }
  }

  .btns {
    display: grid;
    grid-template-columns: 1fr 1fr;

    div {
      padding: 20px;
      border-top: 1px solid var(--color-bg-main);
      text-align: center;

      transition: none;

      .clickable();

      &:hover {
        background: rgba(0, 0, 0, .2);
      }

      &.leave {
        color: var(--color-font-dark);
      }

      &.create {
        color: var(--color-accent-green);
      }
    }
  }

  @media screen and (max-width: 500px) {
    width: 100%;
  }
}
</style>
