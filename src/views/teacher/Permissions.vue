<template>
  <div class="app-permissions">
    <app-preloader :show="showPreloader"></app-preloader>

    <app-ask-group
      :show="Boolean(showCreatePermission && !group.id)"
      @selected="selectedGroup => group = selectedGroup"
      @close="showCreatePermission = false"
    ></app-ask-group>

    <app-create-permission
      :show="Boolean(group.id && showCreatePermission)"
      :group="group"
      @done="
        showCreatePermission = false
        group = {}
        loadPermissions()
      "
      @cancel="
        showCreatePermission = false
        group = {}
      "
    ></app-create-permission>

    <div class="header">
      <div class="info">
        <div class="title">Дозволи на проходження тестів</div>

        <select
          v-model="teaching"
          @change="loadPermissions"
          class="subject-select"
        >
          <option
            v-for="(teacher, index) in subjects"
            v-bind:key="index"
            :value="teacher"
          >{{teacher.subject.name}}</option>
        </select>
      </div>

      <app-button
        appearance="primary"
        @click="
          showCreatePermission = true
          group = {}
        "
      >Створити дозвіл</app-button>
    </div>

    <div class="content">
      <div
        v-if="teaching"
        class="title"
      >
        Ви надали {{grantedPermissions.length}} дозволів з предмету "{{teaching.subject.name}}"
      </div>

      <div class="list">
        <div class="row header-row">
          <div class="test">Назва тесту</div>
          <div class="start">Початок активності</div>
          <div class="end">Кінець активності</div>
          <div class="group">Група</div>
        </div>

        <div
          class="no-permissions"
          v-if="!grantedPermissions.length && teaching"
        >Ви не надали жодного дозволу на проходження з предмету "{{teaching.subject.name}}"</div>

        <router-link
          v-for="(permission, index) in grantedPermissions"
          :key="index"
          class="row permission-row"
          :to="{
            name: 'permissionDetails',
            params: { permissionID: permission.id },
          }"
        >
          <div class="test">{{permission.test.name}}</div>
          <div class="start">{{$moment(permission.startTime).format('Do MMMM YYYY, hh:mm')}}</div>
          <div class="end">{{$moment(permission.endTime).format('Do MMMM YYYY, hh:mm')}}</div>
          <div class="group">{{permission.group.name}}</div>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex'

import AppPreloader from '@/components/ui/AppPreloader.vue'
import AppButton from '@/components/ui/AppButton.vue'

import AppAskGroup from '@/components/templates/teacher/AppAskGroup.vue'
import AppCreatePermission from '@/components/templates/teacher/AppCreatePermission.vue'

export default {
  data() {
    return {
      showCreatePermission: false,
      showPreloader: false,
      group: {},
      subjects: [],
      teaching: null,
      grantedPermissions: [],
    }
  },
  methods: {
    ...mapActions({
      getSelfPermissions: 'teacher/getPermissions',
      getSubjects: 'teacher/getSubjects',
      setAlert: 'alert/set',
    }),
    async loadSubjects() {
      try {
        this.showPreloader = true

        const subjects = await this.getSubjects()
        const teaching = subjects[0] ? subjects[0] : null

        this.subjects = subjects
        this.teaching = teaching
      } catch (e) {
        this.setAlert({
          title: 'Помилка',
          text: 'Не вдалось отримати список предметів...',
        })
      } finally {
        this.showPreloader = false
      }
    },
    async loadPermissions() {
      try {
        this.showPreloader = true

        const { teaching } = this

        this.grantedPermissions = teaching ? await this.getSelfPermissions(teaching.id) : []
      } catch (e) {
        this.setAlert({
          title: 'Помилка',
          text: 'Не вдалось отримати список дозволів...',
        })
      } finally {
        this.showPreloader = false
      }
    },
  },
  components: {
    AppButton,
    AppAskGroup,
    AppPreloader,
    AppCreatePermission,
  },
  async created() {
    await this.loadSubjects()
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

    .subject-select {
      margin-top: 10px;

      padding: 15px 10px;
      border-radius: 5px;
      border: none;
      font-size: 1em;
      background: var(--color-bg-dark);
      color: var(--color-font-main);
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

      .no-permissions {
        text-align: center;
        margin: 70px auto;
        color: var(--color-font-dark);
        font-size: 1.3em;

        position: relative;
        max-width: 500px;

        &::before {
          content: "";
          display: block;
          width: 70px;
          height: 2px;
          background: var(--color-accent-red);

          position: absolute;
          left: 0;
          right: 0;
          bottom: -15px;
          margin: auto;
        }
      }

      .row {
        display: grid;
        grid-template-columns: 1fr 200px 200px 100px;
        grid-gap: 20px;

        align-items: center;

        margin-bottom: 15px;
        color: var(--color-font-main);

        &.header-row {
          color: var(--color-font-dark);
          padding-bottom: 15px;
          border-bottom: 1px solid var(--color-bg-main);
        }

        &.permission-row {
          &:hover {
            text-decoration: underline !important;
          }
        }
      }
    }
  }

  @media screen and (max-width: 700px) {
    .header {
      grid-template-columns: 1fr;
    }

    .content .list .row {
      grid-template-columns: 1fr;
      grid-gap: 10px;

      .test {
        font-size: 1.5em;
        font-weight: 400;
      }
    }
  }
}
</style>
