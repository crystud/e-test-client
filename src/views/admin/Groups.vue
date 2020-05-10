<template>
  <div class="groups-view">
    <app-preloader :show="showPreloader"></app-preloader>

    <app-ask-speciality
      :show="!editingSpeciality.id"
      :college="editingCollege"
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
          <div class="pagename">Групи</div>

          <div
            class="college"
            v-show="editingCollege.id && editingSpeciality.id"
          >
            <span
              @click="
                editingCollege = {}
                editingSpeciality = {}
              "
            >{{editingCollege.name}}</span>

            <font-awesome-icon
              icon="chevron-right"
              class="icon"
            ></font-awesome-icon>

            <span @click="editingSpeciality = {}">{{editingSpeciality.name}}</span>
          </div>
        </div>

        <app-create-button
          @click="showCreateGroup = true"
        >Створити групу</app-create-button>
      </div>

      <div class="selection">
        <div class="list">
          <app-group
            v-for="(group, index) in groups"
            v-bind:key="index"
            :id="group.id"
            :name="group.name"
            :educationStart="group.startEducation"
            :educationEnd="group.endEducation"
          ></app-group>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

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
  computed: {
    ...mapGetters({
      groups: 'groups/list',
    }),
  },
  data() {
    return {
      showCreateGroup: false,
      showPreloader: false,
      editingSpeciality: {},
    }
  },
  methods: {
    ...mapActions({
      getGroups: 'groups/get',
      getSpeciality: 'specialities/getByID',
    }),
    specialitySelected(speciality) {
      this.editingSpeciality = speciality

      this.showPreloader = true

      this.getGroups(speciality.groups).then(() => {
        this.showPreloader = false
      })
    },
    async updateGroups() {
      const { editingSpeciality: { id } } = this

      this.showPreloader = true

      const { groups } = await this.getSpeciality(id) || {}

      await this.getGroups(groups)

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

    font-weight: 300;

    .title {
      .pagename {
        font-size: 1.6em;
        color: var(--color-font-main);
      }

      .college {
        margin-top: 10px;
        color: var(--color-font-dark);

        .icon {
          margin: 0 10px;
        }

        span {
          cursor: pointer;
          user-select: none;

          &:hover {
            color: var(--color-font-main);
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
