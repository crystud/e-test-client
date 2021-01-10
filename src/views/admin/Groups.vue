<template>
  <div class="groups-view">
    <app-preloader :show="showPreloader"></app-preloader>

    <app-ask-speciality
      :show="!editingSpeciality.id"
      @selected="specialitySelected"
    ></app-ask-speciality>

    <div v-if="editingSpeciality.id">
      <app-create-group
        :show="showCreateGroup"
        :speciality="editingSpeciality"
        @close="showCreateGroup = false"
        @done="
          showCreateGroup = false
          updateGroups()
        "
      ></app-create-group>

      <div class="header">
        <div class="title">
          <div class="pagename">Список груп спеціальності</div>

          <div
            class="college"
            v-show="editingSpeciality.id"
          >
            <span
              @click="editingSpeciality = {}"
            >{{editingSpeciality.name}}</span>
          </div>
        </div>

        <app-create-button
          @click="showCreateGroup = true"
        >Створити групу</app-create-button>
      </div>

      <div class="selection">
        <div
          v-if="!groups.length"
          class="no-groups"
        >
          <div>
            У даній спеціальності покищо немає
            груп, але ви можете завжди
          </div>

          <span @click="showCreateGroup = true">Створити групу</span>
        </div>

        <div class="list">
          <app-group
            v-for="(group, index) in groups"
            v-bind:key="index"
            :id="group.id"
            :name="group.name"
            :startYear="group.startYear"
            :course="group.course"
          ></app-group>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex'

import AppGroup from '../../components/templates/admin/AppGroup.vue'
import AppCreateButton from '../../components/templates/admin/AppCreateButton.vue'
import AppCreateGroup from '../../components/templates/admin/AppCreateGroup.vue'
import AppAskSpeciality from '../../components/templates/admin/AppAskSpeciality.vue'
import AppPreloader from '../../components/ui/AppPreloader.vue'

export default {
  components: {
    AppCreateButton,
    AppGroup,
    AppCreateGroup,
    AppAskSpeciality,
    AppPreloader,
  },
  data() {
    return {
      showCreateGroup: false,
      showPreloader: false,
      editingSpeciality: {},
      groups: [],
    }
  },
  methods: {
    ...mapActions({
      getSpeciality: 'specialities/getByID',
    }),
    specialitySelected(speciality) {
      this.editingSpeciality = speciality

      this.updateGroups()
    },
    async updateGroups() {
      const { editingSpeciality: { id } } = this

      this.showPreloader = true

      const { groups = [] } = await this.getSpeciality(id) || {}

      this.groups = groups

      this.showPreloader = false
    },
  },
}
</script>

<style lang="less" scoped>
.groups-view {
  .header {
    display: flex;
    justify-content: space-between;
    align-items: center;

    border-bottom: 1px solid var(--color-bg-light);
    padding-bottom: 15px;

    font-weight: 300;

    .title {
      .pagename {
        font-size: 1.6em;
        color: var(--color-font-main);
      }

      .college {
        margin-top: 10px;
        color: var(--color-font-dark);

        span {
          cursor: pointer;
          user-select: none;

          &:hover {
            color: var(--color-accent-green);
          }
        }
      }
    }

    @media screen and (max-width: 500px) {
      flex-direction: column;
      align-items: flex-start;

      .title {
        margin-bottom: 10px;
      }
    }
  }

  .selection {
    margin-top: 20px;

    .no-groups {
      width: 40%;
      margin: 70px auto;
      text-align: center;

      div {
        font-size: 1.2em;
        margin-bottom: 20px;
        color: var(--color-font-dark);
      }

      span {
        color: var(--color-accent-green);
        cursor: pointer;
        font-size: 1.1em;

        &:hover {
          text-decoration: underline;
        }
      }
    }

    .list {
      margin-top: 20px;

      display: grid;
      grid-template-columns: repeat(3, 1fr);
      grid-gap: 20px;

      @media screen and (max-width: 1200px) {
        grid-template-columns: 1fr 1fr;
      }

      @media screen and (max-width: 1000px) {
        grid-template-columns: repeat(3, 1fr);
      }

      @media screen and (max-width: 900px) {
        grid-template-columns: 1fr 1fr;
      }

      @media screen and (max-width: 520px) {
        grid-template-columns: 1fr;
      }
    }
  }
}
</style>
