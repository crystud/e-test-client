<template>
  <div class="app-permissions">
    <app-preloader :show="showPreloader"></app-preloader>

    <app-ask-study
      :show="Boolean(showCreatePermission && !showSelectGroup)"
      @selected="studySelected"
    ></app-ask-study>

    <app-ask-group
      :show="Boolean(showSelectGroup && !group.id)"
      :groupsList="groupsList"
      @selected="selectedGroup => group = selectedGroup"
    ></app-ask-group>

    <app-create-permission
      :show="Boolean(group.id && showCreatePermission)"
      :group="group"
      :studyID="studyID"
      @done="
        showCreatePermission = false
        showSelectGroup = false
        studyID = 0
        group = {}
        subject = {}
        groupsList = []
        loadPermissions()
      "
      @cancel="
        showCreatePermission = false
        showSelectGroup = false
        studyID = 0
        group = {}
        subject = {}
        groupsList = []
      "
    ></app-create-permission>

    <div class="header">
      <div class="title">Дозволи на проходження тестів</div>

      <app-button
        appearance="primary"
        @click="showCreatePermission = true"
      >Створити дозвіл</app-button>
    </div>

    <div class="content">
      <div class="title">Ви надали {{grantedPermissions.length}} дозволів</div>

      {{grantedPermissions}}

      <div class="list">
        <div class="row header-row">
          <div class="test">Назва тесту</div>
          <div class="created">Час створення</div>
          <div class="start">Початок активності</div>
          <div class="end">Кінець активності</div>
          <div class="members">К-сть груп</div>
        </div>

        <div
          v-for="(permission, index) in grantedPermissions"
          :key="index"
          class="row"
        >
          <div class="test">-</div>
          <div class="created">{{getNormalDate(permission.createAt)}}</div>
          <div class="start">{{getNormalDate(permission.startTime)}}</div>
          <div class="end">{{getNormalDate(permission.endTime)}}</div>
          <div class="members">{{permission.groups.length}}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex'

import AppPreloader from '@/components/ui/AppPreloader.vue'
import AppButton from '@/components/ui/AppButton.vue'

import AppAskStudy from '@/components/templates/teacher/AppAskStudy.vue'
import AppAskGroup from '@/components/templates/teacher/AppAskGroup.vue'
import AppCreatePermission from '@/components/templates/teacher/AppCreatePermission.vue'

export default {
  data() {
    return {
      showCreatePermission: false,
      showSelectGroup: false,
      showPreloader: false,
      subject: {},
      group: {},
      groupsList: [],
      studyID: 0,
      grantedPermissions: [],
    }
  },
  methods: {
    ...mapActions({
      getGroups: 'specialities/getGroups',
      getSelfPermissions: 'user/getPermissions',
    }),
    getNormalDate(time) {
      if (!time) return ''

      const date = new Date(time)

      const datetime = `${date.getDate()}/${date.getMonth()}/${date.getFullYear()}`
      const daytime = `${date.getHours()}:${date.getMinutes()}`

      return `${datetime} ${daytime}`
    },
    async loadPermissions() {
      this.showPreloader = true

      this.grantedPermissions = await this.getSelfPermissions()

      this.showPreloader = false
    },
    async studySelected({ specialties, id }) {
      this.showPreloader = true

      const groups = await this.getGroups(specialties.map(({ id: specialityID }) => specialityID))

      this.showSelectGroup = true
      this.showPreloader = false
      this.studyID = id
      this.groupsList = groups
    },
  },
  components: {
    AppButton,
    AppAskStudy,
    AppAskGroup,
    AppPreloader,
    AppCreatePermission,
  },
  async created() {
    await this.loadPermissions()
  },
}
</script>

<style lang="less" scoped>
.app-permissions {
  .header {
    display: grid;
    grid-template-columns: 1fr auto;
    grid-gap: 20px;

    align-items: center;

    .title {
      font-size: 1.5em;
      font-weight: 400;
    }
  }

  .content {
    margin-top: 30px;
    padding: 30px;

    background: var(--color-bg-dark);
    box-shadow: 0px 0px 15px rgba(0, 0, 0, 0.3);
    border-radius: 10px;
    color: var(--color-font-main);

    .title {
      font-size: 1.1em;
      color: var(--color-font-dark);
    }

    .list {
      margin-top: 20px;

      .row {
        display: grid;
        grid-template-columns: 1fr 200px 200px 200px 70px;
        grid-gap: 20px;

        align-items: center;

        margin-bottom: 15px;
        color: var(--color-font-main);

        &.header-row {
          color: var(--color-font-dark);
          padding-bottom: 15px;
          border-bottom: 1px solid var(--color-bg-main);
        }
      }
    }
  }
}
</style>
