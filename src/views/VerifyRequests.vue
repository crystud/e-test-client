<template>
  <div class="verify-requests">
    <app-search-bar class="search"></app-search-bar>

    <div class="list">
      <app-verify-candidate
        v-for="i in 15"
        v-bind:key="i"
      ></app-verify-candidate>
    </div>
  </div>
</template>

<script>
import AppSearchBar from '../components/ui/AppSearchBar.vue'
import AppVerifyCandidate from '../components/templates/superadmin/AppVerifyCandidate.vue'

export default {
  components: {
    AppSearchBar,
    AppVerifyCandidate,
  },
}
</script>

<style lang="less" scoped>
.verify-requests {
  .search {
    background: var(--color-bg-dark);
    border-radius: 10px;
  }

  .list {
    margin-top: 20px;

    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-gap: 20px;
  }

  @media screen and (max-width: 550px) {
    .list {
      grid-template-columns: 1fr;
    }
  }
}
</style>
