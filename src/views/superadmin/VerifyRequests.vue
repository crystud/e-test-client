<template>
  <div class="verify-requests">
    <div class="search">
      <div class="additional-switch">
        <div class="label">Верифіковані</div>

        <app-switch
          :isOn="areVerificated"
          class="switch"
          @switch="areVerificated = !areVerificated"
        ></app-switch>
      </div>

      <app-search-bar class="bar"></app-search-bar>
    </div>

    <div class="list">
      <app-verify-candidate
        v-for="i in 15"
        v-bind:key="i"
      ></app-verify-candidate>
    </div>
  </div>
</template>

<script>
import AppSearchBar from '@/components/ui/AppSearchBar.vue'
import AppVerifyCandidate from '@/components/templates/superadmin/AppVerifyCandidate.vue'
import AppSwitch from '@/components/ui/AppSwitch.vue'

export default {
  components: {
    AppSearchBar,
    AppVerifyCandidate,
    AppSwitch,
  },
  data() {
    return {
      areVerificated: false,
    }
  },
}
</script>

<style lang="less" scoped>
.verify-requests {
  .search {
    border-radius: 10px;

    display: flex;
    align-items: center;

    &, .bar {
      background: var(--color-bg-dark);
    }

    .additional-switch {
      padding: 20px;
      border-right: 1px solid var(--color-bg-main);

      .switch {
        margin: 10px auto 0;
      }
    }

    @media screen and (max-width: 400px) {
      flex-direction: column;

      .additional-switch {
        border-right: 0;
        border-bottom: 1px solid var(--color-bg-main);

        text-align: center;
        width: 100%;
      }
    }
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
