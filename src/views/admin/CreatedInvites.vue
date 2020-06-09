<template>
  <div class="app-created-invites">
    <app-preloader :show="showPreloader"></app-preloader>

    <app-invite-detail-info
      :info="showMore"
      @close="showMore = {}"
    ></app-invite-detail-info>

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
            class="row"
          >
            <div class="fullname">
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
      </div>

      <div class="data-cards">
        <app-card class="app-card">
          <div class="header">
            Загальні дані
          </div>

          <div class="body">
            <app-circle-chart
              :progress="47"
              :radius="60"
              label="використ."
              class="circle-chart"
            ></app-circle-chart>

            <app-data-list
              :data="[
                ['Створено', 673],
                ['Використано', 464],
              ]"
              class="data"
            ></app-data-list>
          </div>
        </app-card>

        <app-card class="app-card">
          <div class="header">
            Підтведжено E-mail
          </div>

          <div class="body">
            <app-circle-chart
              :progress="73"
              :radius="60"
              label="підтверд."
              class="circle-chart"
            ></app-circle-chart>

            <app-data-list
              :data="[
                ['Підтверджено', 473],
                ['Очікують', 253],
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

import AppInviteDetailInfo from '@/components/templates/admin/AppInviteDetailInfo.vue'

export default {
  data() {
    return {
      showPreloader: false,
      progress: 0,
      showMore: {},
    }
  },
  methods: {
    ...mapActions({
      getInvites: 'invites/get',
      setAlert: 'alert/set',
    }),
    async fetchInvites() {
      try {
        this.showPreloader = true

        await this.getInvites()
      } catch (e) {
        this.setAlert({
          title: 'Помилка',
          text: 'Не вдалось отримати список запрошень',
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
      invites: 'invites/list',
    }),
  },
  components: {
    AppInviteDetailInfo,
    AppCircleChart,
    AppPreloader,
    AppDataList,
    AppCard,
  },
}
</script>

<style lang="less" scoped>
.app-created-invites {
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
      }
    }

    @media screen and (max-width: 1200px) {
      grid-template-columns: 1fr;

      .data-cards {
        display: grid;
        grid-template-columns: 1fr 1fr;
        grid-gap: 20px;

        .app-card {
          margin: 0;
        }

        .body {
          text-align: center;
          grid-template-columns: 1fr !important;
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
