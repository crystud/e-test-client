<template>
  <div class="app-created-invites">
    <app-preloader :show="showPreloader"></app-preloader>

    <app-ask-group
      :show="Boolean(createInvites.show && !createInvites.group.id)"
      @close="createInvites = {
        show: false,
        group: {},
      }"
      @selected="({ id: groupID }) => $router.push({
        name: 'invites',
        params: { groupID },
      })"
    ></app-ask-group>

    <app-invite-detail-info
      :info="showMore"
      @close="showMore = {}"
    ></app-invite-detail-info>

    <app-invites-filters
      @updateState="updateFiltersState"
      class="invites-filters"
    ></app-invites-filters>

    <div class="sections">
      <div class="list-wrap">
        <div class="title">
          Останні 25 запрошень
        </div>

        <div class="list">
          <div class="row header-row">
            <div class="fullname">ПІБ</div>
            <div class="group">Група</div>
            <div class="status">Статус</div>
            <div class="detail">Детальніше</div>
          </div>

          <div
            v-for="({ usedAt, student: { user, group } }, index) in invites"
            v-bind:key="index"
            class="data-row row"
          >
            <div
              class="fullname"
              @click="$router.push({
                name: 'studentOverview',
                params: { id: user.id },
              })"
            >
              {{user.lastName}} {{user.firstName}} {{user.patronymic}}
            </div>

            <div class="group">{{group.name || '-'}}</div>
            <div
              class="status"
              :class="{
                used: usedAt !== null,
              }"
            >
              <font-awesome-icon
                v-if="usedAt !== null"
                icon="check"
              ></font-awesome-icon>

              <font-awesome-icon
                v-else
                icon="user-clock"
              ></font-awesome-icon>
            </div>

            <div
              class="detail"
              @click="showMore = invites[index]"
            >Детальніше...</div>
          </div>
        </div>

        <div
          v-if="lastFetchCount === limit"
          class="fetch-more"
        >
          <app-button
            appearance="neutral"
            class="load-more-btn"
            @click="
              page += 1
              fetchInvites()
            "
          >Показати більше</app-button>
        </div>
      </div>

      <div class="data-cards">
        <app-button
          appearance="neutral"
          class="create-invites-btn"
          @click="createInvites.show = true"
        >
          Створити запрошення
        </app-button>

        <app-card
          v-if="overview.usedCount !== undefined"
          class="app-card"
        >
          <div class="header">
            Загальні дані
          </div>

          <div class="body">
            <app-circle-chart
              :progress="Math.round((overview.usedCount / overview.createdCount) * 100)"
              :radius="60"
              label="використ."
              class="circle-chart"
            ></app-circle-chart>

            <app-data-list
              :data="[
                ['Створено', overview.createdCount],
                ['Використано', overview.usedCount],
              ]"
              class="data"
            ></app-data-list>
          </div>
        </app-card>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

import AppPreloader from '@/components/ui/AppPreloader.vue'
import AppDataList from '@/components/ui/AppDataList.vue'
import AppCard from '@/components/ui/AppCard.vue'
import AppCircleChart from '@/components/ui/AppCircleChart.vue'
import AppButton from '@/components/ui/AppButton.vue'

import AppInviteDetailInfo from '@/components/templates/admin/AppInviteDetailInfo.vue'
import AppInvitesFilters from '@/components/templates/admin/AppInvitesFilters.vue'
import AppAskGroup from '@/components/templates/teacher/AppAskGroup.vue'

export default {
  data() {
    return {
      showPreloader: false,
      createInvites: {
        show: false,
        group: {},
      },
      progress: 0,
      showMore: {},
      filters: {},
      page: 0,
      limit: 25,
      invites: [],
      lastFetchCount: 0,
    }
  },
  methods: {
    ...mapActions({
      getInvites: 'invites/get',
      getInvitesOverview: 'invites/getOverview',
      setAlert: 'alert/set',
    }),
    updateFiltersState(newState) {
      this.filters = newState

      this.invites = []
      this.page = 0

      this.fetchInvites()
    },
    async fetchInvites() {
      try {
        const { filters, limit, page } = this

        this.showPreloader = true

        const invites = await this.getInvites({
          ...filters,
          limit,
          offset: page * limit,
        })

        await this.getInvitesOverview()

        this.lastFetchCount = invites.length
        this.invites = [...this.invites, ...invites]
      } catch (e) {
        const text = e?.response.data.message || 'Не вдалось отримати список запрошень'

        this.setAlert({
          title: 'Помилка',
          text,
          show: true,
          isSuccess: false,
        })
      } finally {
        this.showPreloader = false
      }
    },
  },
  created() {
    this.fetchInvites()
  },
  computed: {
    ...mapGetters({
      overview: 'invites/overview',
    }),
  },
  components: {
    AppInviteDetailInfo,
    AppInvitesFilters,
    AppCircleChart,
    AppPreloader,
    AppAskGroup,
    AppDataList,
    AppButton,
    AppCard,
  },
}
</script>

<style lang="less" scoped>
.app-created-invites {
  .create-invites-btn {
    width: 100%;
    margin-bottom: 20px;

    background: var(--color-accent-green);
    color: #fff;
  }

  .invites-filters {
    margin-bottom: 20px;
  }

  .fetch-more {
    text-align: center;
    margin-top: 40px;

    .load-more-btn {
      padding: 10px 20px;
      background: var(--color-bg-main);
    }
  }

  .sections {
    display: grid;
    grid-template-columns: 5fr 3fr;
    grid-gap: 20px;

    align-items: flex-start;

    .list-wrap {
      padding: 20px;
      border-radius: 10px;
      background: var(--color-bg-dark);

      .title {
        color: var(--color-font-dark);
        margin-bottom: 15px;
      }

      .list {
        .row {
          display: grid;
          grid-template-columns: 3fr 1fr 1fr 2fr;
          grid-gap: 15px;
          margin-bottom: 15px;

          &.data-row {
            .fullname {
              cursor: pointer;

              &:hover {
                text-decoration: underline;
              }
            }
          }

          .group {
            color: var(--color-font-dark);
          }

          .status {
            color: var(--color-accent-orange);

            &.used {
              color: var(--color-accent-green);
            }
          }

          .detail {
            color: var(--color-accent-green);
            cursor: pointer;
          }

          &.header-row {
            &, * {
              color: var(--color-font-dark);
            }
          }

          @media screen and (max-width: 500px) {
            grid-template-columns: 1fr;
            border-bottom: 1px solid var(--color-bg-main);
            padding-bottom: 20px;

            .fullname {
              font-size: 1.4em;
              font-weight: bold;
            }
          }
        }
      }
    }

    .data-cards {
      .app-card {
        border-radius: 10px;
        margin-bottom: 20px;

        .header, .body {
          padding: 20px;
        }

        .header {
          border-bottom: 1px solid var(--color-bg-main);
          color: var(--color-font-dark);
        }

        .body {
          display: grid;
          grid-template-columns: auto 1fr;
          grid-gap: 10px;

          align-items: center;
        }

        .data {
          margin: 0;
        }
      }
    }

    @media screen and (max-width: 1200px) {
      grid-template-columns: 1fr;

      .data-cards {
        display: grid;
        grid-template-columns: 1fr;
        grid-gap: 20px;

        .app-card {
          margin: 0;
        }

        .body {
          text-align: center;
          grid-template-columns: 1fr 1fr;
        }

        .data {
          margin: 0 auto;
        }
      }
    }

    @media screen and (max-width: 700px) {
      .data-cards {
        grid-template-columns: 1fr;
      }
    }
  }
}
</style>
