<template>
  <div class="groups-view">
    <app-create-group
      :show="showCreateGroup"
      @close="showCreateGroup = false"
    ></app-create-group>

    <div class="header">
      <div class="title">Групи</div>

      <app-create-button
        @click="showCreateGroup = true"
      >Створити групу</app-create-button>
    </div>

    <div class="selection">
      <div class="title">Набір 01.09.2020</div>

      <div class="list">
        <app-group
          v-for="i in 15"
          v-bind:key="i"
          :id="i"
          name="П-42"
          :studentsCount="14"
          selection="01.09.2016"
        ></app-group>
      </div>
    </div>
  </div>
</template>

<script>
import AppGroup from '../../components/templates/admin/AppGroup.vue'
import AppCreateButton from '../../components/templates/admin/AppCreateButton.vue'
import AppCreateGroup from '../../components/templates/admin/AppCreateGroup.vue'

export default {
  components: {
    AppCreateButton,
    AppGroup,
    AppCreateGroup,
  },
  data() {
    return {
      showCreateGroup: false,
    }
  },
}
</script>

<style lang="less" scoped>
.groups-view {
  .header {
    display: flex;
    justify-content: space-between;
    align-items: center;

    font-weight: 100;

    .title {
      font-size: 1.6em;
      color: var(--color-font-main);
    }

    @media screen and (max-width: 500px) {
      flex-direction: column;
      justify-items: center;

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
