<template>
  <div class="verify-requests">
    <app-preloader
      :show="preloader.show"
      :title="preloader.title"
    ></app-preloader>

    <app-college-confirm
      :show="confirm.show"
      :college="confirm.college"
      @verificated="
        confirm = {
          show: false,
          college: {},
        }
        fetch()
      "
      @close="
        confirm = {
          show: false,
          college: {},
        }
      "
    ></app-college-confirm>

    <div class="search">
      <div class="additional-switch">
        <div class="label">Верифіковані</div>

        <app-switch
          :isOn="areVerificated"
          class="switch"
          @switch="
            areVerificated = !areVerificated
            fetch()
          "
        ></app-switch>
      </div>

      <app-search-bar
        class="bar"
        @search="(newSearch) => {
          search = newSearch
          fetch()
        }"
      ></app-search-bar>
    </div>

    <div class="list">
      <app-verify-candidate
        v-for="(college, i) in colleges"
        v-bind:key="i"
        :college="college"
        :isVerificated="college.confirmed"
        @click="
          confirm = {
            college,
            show: true,
          }
        "
      ></app-verify-candidate>
    </div>

    <div
      v-show="!colleges.length"
      class="no-result"
    >Навчальних закладів не знайдено...</div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'

import AppSearchBar from '@/components/ui/AppSearchBar.vue'
import AppVerifyCandidate from '@/components/templates/superadmin/AppVerifyCandidate.vue'
import AppSwitch from '@/components/ui/AppSwitch.vue'
import AppPreloader from '@/components/ui/AppPreloader.vue'
import AppCollegeConfirm from '@/components/templates/superadmin/AppCollegeConfirm.vue'

export default {
  components: {
    AppSearchBar,
    AppVerifyCandidate,
    AppSwitch,
    AppPreloader,
    AppCollegeConfirm,
  },
  methods: {
    ...mapActions({
      fetchColleges: 'college/fetch',
    }),
    fetch() {
      const { areVerificated, search } = this

      this.preloader = {
        show: true,
        title: 'Пігружаємо коледжі...',
      }

      const params = {
        confirmed: areVerificated ? 1 : 0,
      }

      if (search) {
        params.name = search
      }

      this.fetchColleges(params).finally(() => {
        this.preloader = {
          show: false,
          title: '',
        }
      })
    },
  },
  computed: {
    ...mapGetters({
      colleges: 'college/list',
    }),
  },
  data() {
    return {
      areVerificated: false,
      search: '',
      preloader: {
        title: '',
        show: false,
      },
      confirm: {
        college: {},
        show: false,
      },
    }
  },
  async created() {
    this.fetch()
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

  .no-result {
    font-size: 1.5em;
    color: var(--color-font-dark);

    text-align: center;
    margin: 50px 0;
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
