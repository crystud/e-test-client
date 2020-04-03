<template>
  <div class="app-college">
    <div class="current-college-info">
      <app-college-basic-info></app-college-basic-info>

      <app-last-visitors class="last-visitors"></app-last-visitors>
    </div>

    <div class="college-people-info">
      <app-college-people class="section"></app-college-people>
      <app-college-people class="section"></app-college-people>
    </div>
  </div>
</template>

<script>
import AppCollegeBasicInfo from '@/components/templates/admin/AppCollegeBasicInfo.vue'
import AppCollegePeople from '@/components/templates/admin/AppCollegePeople.vue'
import AppLastVisitors from '@/components/templates/admin/AppLastVisitors.vue'

export default {
  name: 'AppCollege',
  components: {
    AppCollegeBasicInfo,
    AppCollegePeople,
    AppLastVisitors,
  },
}
</script>

<style lang="less" scoped>
.app-college {
  display: grid;
  grid-template-columns: 5fr 2fr;
  grid-gap: 20px;

  @media screen and (max-width: 1150px) {
    grid-template-columns: 1fr;
  }

  .current-college-info {
    .last-visitors {
      margin-top: 20px;
    }
  }

  .college-people-info {
    .section {
      margin-bottom: 20px;
    }
  }
}
</style>
