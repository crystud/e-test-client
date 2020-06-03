<template>
  <div class="app-specialtys">
    <app-preloader :show="showPreloader"></app-preloader>

    <app-sync-specialtys
      :show="showSync"
      @close="showSync = false"
    ></app-sync-specialtys>

    <app-create-specialty
      :show="showCreate"
      @close="showCreate = false"
      @created="specialtyCreated"
    ></app-create-specialty>

    <div class="header">
      <div class="title">
        <div class="value">Спеціальності</div>
      </div>

      <div>
        <app-button
          appearance="neutral"
          class="create-btn"
          @click="showCreate = true"
        >Створити спеціальність</app-button>

        <!-- <app-button
          appearance="primary"
          @click="showSync = true"
        >Синхронізувати</app-button> -->
      </div>
    </div>

    <app-edit-attached-subjects
      :speciality="editAttachedSubjects"
      :show="Boolean(editAttachedSubjects.id)"
      @close="editAttachedSubjects = {}"
    ></app-edit-attached-subjects>

    <app-specialities-chart
      v-if="specialities.length"
      class="specialities-chart"
      :specialities="specialities"
    ></app-specialities-chart>

    <div
      v-show="!specialities.length"
      class="no-result"
    >Спеціальностей не знайдено...</div>

    <div class="list">
      <app-specialty
        v-for="(speciality, i) in specialities"
        v-bind:key="i"
        :specialty="speciality"
        @editAttachedSubjects="editAttachedSubjects = speciality"
      ></app-specialty>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'

import AppButton from '@/components/ui/AppButton.vue'
import AppPreloader from '@/components/ui/AppPreloader.vue'
import AppSpecialty from '@/components/templates/admin/AppSpecialty.vue'
import AppSyncSpecialtys from '@/components/templates/admin/AppSyncSpecialtys.vue'
import AppSpecialitiesChart from '@/components/templates/admin/AppSpecialitiesChart.vue'
import AppCreateSpecialty from '@/components/templates/admin/AppCreateSpecialty.vue'
import AppEditAttachedSubjects from '@/components/templates/admin/AppEditAttachedSubjects.vue'

export default {
  data() {
    return {
      showSync: false,
      showCreate: false,
      editingCollege: {},
      showAskCollege: true,
      showPreloader: false,
      editAttachedSubjects: {},
    }
  },
  computed: {
    ...mapGetters({
      specialities: 'specialities/list',
    }),
  },
  methods: {
    ...mapActions({
      getSpecialties: 'specialities/get',
      setAlert: 'alert/set',
    }),
    specialtyCreated() {
      this.showPreloader = true

      this.getSpecialties().finally(() => {
        this.showPreloader = false
      })
    },
    async fetchSpecialities() {
      try {
        this.showPreloader = true

        await this.getSpecialties()
      } catch (e) {
        this.setAlert({
          title: 'Не вдалось отримати спеціальності...',
          delay: 1500,
          show: true,
          isSuccess: false,
        })
      } finally {
        this.showPreloader = false
      }
    },
  },
  created() {
    this.fetchSpecialities()
  },
  components: {
    AppButton,
    AppSpecialty,
    AppSyncSpecialtys,
    AppEditAttachedSubjects,
    AppSpecialitiesChart,
    AppCreateSpecialty,
    AppPreloader,
  },
}
</script>

<style lang="less" scoped>
.app-specialtys {
  .header {
    display: flex;
    justify-content: space-between;
    align-items: center;

    font-weight: 300;

    .title {
      .value {
        font-size: 1.6em;
        color: var(--color-font-main);
      }

      .subtitle {
        color: var(--color-font-dark);
        cursor: pointer;
        font-size: 1.3em;
        margin-top: 5px;
      }
    }

    .create-btn {
      margin: 0 10px 10px 0;
    }

    @media screen and (max-width: 800px) {
      flex-direction: column;
      align-items: flex-start;

      .title {
        margin-bottom: 10px;
      }
    }
  }

  .specialities-chart {
    margin-top: 20px;
  }

  .no-result {
    font-size: 1.7em;
    text-align: center;
    margin: 60px 0;
  }

  .list {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    grid-gap: 20px;

    margin-top: 20px;
  }

  @small: ~"screen and (max-width: 650px)";
  @medium: ~"screen and (max-width: 1300px)";

  @media @medium {
    .list {
      grid-template-columns: 1fr 1fr;
    }
  }

  @media @small {
    .list {
      grid-template-columns: 1fr;
    }
  }
}
</style>
