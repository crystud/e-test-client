<template>
  <div class="app-specialtys">
    <app-preloader :show="showPreloader"></app-preloader>

    <app-create-class
      :show="showCreateClass"
      @close="showCreateClass = false"
    ></app-create-class>

    <div class="header">
      <div class="title">Пари</div>

      <app-create-button @click="showCreateClass = true">Створити пару</app-create-button>
    </div>

    {{studies}}

    <div class="list">
      <app-class
        v-for="i in 15"
        v-bind:key="i"
      ></app-class>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

import AppCreateButton from '@/components/templates/admin/AppCreateButton.vue'
import AppClass from '@/components/templates/admin/AppClass.vue'
import AppCreateClass from '@/components/templates/admin/AppCreateClass.vue'
import AppPreloader from '@/components/ui/AppPreloader.vue'

export default {
  name: 'classes',
  components: {
    AppCreateButton,
    AppCreateClass,
    AppPreloader,
    AppClass,
  },
  computed: {
    ...mapGetters({
      studies: 'college/studies',
    }),
  },
  methods: {
    ...mapActions({
      getStudies: 'college/getStudies',
    }),
    collegeSelected(college) {
      this.editingCollege = college

      this.showPreloader = true

      this.getStudies(college.id)

      this.showPreloader = false
    },
  },
  data() {
    return {
      showCreateClass: false,
      showPreloader: false,
      editingCollege: {},
    }
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
      font-size: 1.6em;
      color: var(--color-font-main);
    }

    @media screen and (max-width: 400px) {
      flex-direction: column;
      justify-items: center;

      .title {
        margin-bottom: 10px;
      }
    }
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
