<template>
  <div>
    <app-create-speciality
      :show="showCreateSpeciality"
      :college="college"
      @close="showCreateSpeciality = false"
      @created="checkSpecialties"
    ></app-create-speciality>

    <app-preloader :show="showPreloader"></app-preloader>

    <app-modal-window
      :show="show && !showPreloader && !showCreateSpeciality"
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

        <div class="btns">
          <div
            class="close"
            @click="$router.push({ name: 'specialtys' })"
          >Перейти спеціальностей</div>

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
      const { college: { id: collegeID }, show } = this

      if (!show) return

      this.showPreloader = true

      this.getSpecialties(collegeID).then(() => {
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
    college: {
      type: Number,
      required: true,
      default: () => null,
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
    max-height: 70vh;
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
    }
  }

  @media screen and (max-width: 500px) {
    width: 100%;
  }
}
</style>
