<template>
  <div class="group-view">
    <app-filters
      :show="showFilters"
      @close="showFilters = false"
    ></app-filters>

    <div class="header">
      <div class="name">П-42</div>

      <router-link
        :to="{ name: 'groups' }"
        class="select-other"
      >Обрати іншу групу...</router-link>
    </div>

    <div class="content">
      <div class="students">
        <div class="title">Студенти в групі</div>

        <div class="list">
          <app-group-student
            v-for="i in 14"
            v-bind:key="i"
            :id="i"
            class="app-group-student"
          ></app-group-student>
        </div>

        <div class="save-section">
          <app-button
            appereance="neutral"
            class="save"
          >Зберегти зміни</app-button>

          <div class="changes">
            <span class="additions">+ 4</span>
            <span class="removals">− 4</span>
          </div>
        </div>
      </div>

      <div class="selection">
        <div class="search-section">
          <div
            class="filters"
            @click="showFilters = true"
          >
            <font-awesome-icon icon="filter"></font-awesome-icon>
          </div>

          <app-search-bar class="search-bar"></app-search-bar>
        </div>

        <div class="results">
          <div class="title">Знайдено 25 студентів</div>

          <div class="list">
            <app-search-student
              v-for="i in 10"
              v-bind:key="i"
              :isSelected="true"
            ></app-search-student>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import AppGroupStudent from '@/components/templates/admin/AppGroupStudent.vue'
import AppSearchStudent from '@/components/templates/admin/AppSearchStudent.vue'
import AppFilters from '@/components/templates/admin/AppFilters.vue'
import AppSearchBar from '@/components/ui/AppSearchBar.vue'
import AppButton from '@/components/ui/AppButton.vue'

export default {
  components: {
    AppGroupStudent,
    AppSearchStudent,
    AppSearchBar,
    AppButton,
    AppFilters,
  },
  data() {
    return {
      showFilters: false,
    }
  },
}
</script>

<style lang="less" scoped>
.group-view {
  .header {
    display: flex;
    justify-content: space-between;
    align-items: center;

    margin-bottom: 20px;

    .name {
      font-size: 2em;
      font-weight: 300;
    }

    .select-other {
      color: var(--color-font-dark) !important;

      &:hover {
        text-decoration: underline !important;
      }
    }
  }

  .content {
    display: grid;
    grid-template-columns: 350px 1fr;
    grid-gap: 20px;

    .students {
      background: var(--color-bg-dark);
      border-radius: 10px;

      max-height: 80vh;
      overflow: auto;
      position: relative;

      .title {
        color: var(--color-font-dark);
        font-size: 1.1em;
        padding: 20px 20px 5px;
      }

      .list {
        margin-top: 10px;
        padding: 0 20px;

        .app-group-student {
          margin-bottom: 15px;
        }
      }

      .save-section {
        background: var(--color-bg-dark);
        padding: 20px;
        border-radius: 10px;
        box-shadow: 0px -10px 10px rgba(0, 0, 0, 0.2);

        position: sticky;
        bottom: 0;
        left: 0;
        z-index: 200;

        width: 100%;

        display: grid;
        grid-template-columns: 1fr 100px;
        grid-gap: 10px;

        .save {
          background: #2047C9;
        }

        .changes {
          display: flex;
          justify-content: center;
          align-items: center;

          font-size: 1.4em;

          .additions {
            color: #1AD9A5;
            margin-right: 10px;
          }

          .removals {
            color: var(--color-accent-red);
          }
        }
      }
    }

    .selection {
      .search-section {
        display: grid;
        grid-template-columns: 50px 1fr;
        grid-gap: 10px;

        .search-bar {
          background: var(--color-bg-dark);
        }

        .filters {
          color: var(--color-font-dark);
          cursor: pointer;

          height: 100%;

          background: var(--color-bg-dark);
          border-radius: 10px;

          display: flex;
          justify-content: center;
          align-items: center;
        }
      }

      .results {
        background: var(--color-bg-dark);
        padding: 20px;
        border-radius: 10px;

        margin-top: 20px;

        .title {
          color: var(--color-font-dark);
        }

        .list {
          margin-top: 15px;

          display: grid;
          grid-template-columns: 1fr 1fr;
          grid-gap: 10px;
        }

        @media screen and (max-width: 1450px) {
          .list {
            grid-template-columns: 1fr;
          }
        }

        @media screen and (max-width: 1000px) {
          .list {
            grid-template-columns: 1fr 1fr;
          }
        }

        @media screen and (max-width: 900px) {
          .list {
            grid-template-columns: 1fr;
          }
        }
      }
    }

    @media screen and (max-width: 1200px) {
      grid-template-columns: 1fr;
    }
  }
}
</style>
