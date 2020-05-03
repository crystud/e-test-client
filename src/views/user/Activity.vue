<template>
  <div class="activity">
    <div class="header-cards">
      <div class="card user-info">
        <div class="image">
          <img
            src="https://www.thispersondoesnotexist.com/image"
            alt="user profile picture"
          />
        </div>

        <div class="data">
          <div class="name">{{self.firstName}} {{self.lastName}}</div>
          <div class="online">В мережі</div>
        </div>
      </div>

      <div class="card line avg-time">
        <div class="label">Середній час сесії</div>
        <div class="value">16 хв. 27 сек.</div>
      </div>

      <div class="card line base-location">
        <div class="label">Основна локація</div>
        <div class="value">Kolomyia, UA</div>
      </div>
    </div>

    <div class="base-data">
      <div class="section last-sessions">
        <div class="title">Останні 5 сесій</div>

        <div class="card no-padding">
          <app-user-last-sessions></app-user-last-sessions>
        </div>
      </div>

      <div class="section current-session">
        <div class="title">Наявна сесія</div>

        <div class="card line no-padding">
          <app-user-current-session></app-user-current-session>
        </div>
      </div>

      <div class="section most-visited-locations">
        <div class="title">Основні локації</div>

        <div class="card line no-padding">
          <app-user-locations></app-user-locations>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

import AppUserLastSessions from '@/components/templates/user/AppUserLastSessions.vue'
import AppUserCurrentSession from '@/components/templates/user/AppUserCurrentSession.vue'
import AppUserLocations from '@/components/templates/user/AppUserLocations.vue'

export default {
  components: {
    AppUserLastSessions,
    AppUserCurrentSession,
    AppUserLocations,
  },
  computed: {
    ...mapGetters({
      self: 'user/info',
    }),
  },
}
</script>

<style lang="less" scoped>
.activity {
  .card {
    background: var(--color-bg-dark);
    padding: 20px;
    border-radius: 10px;

    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;

    &.no-padding {
      padding: 0;
    }

    .label {
      color: var(--color-font-dark);
    }

    .value {
      font-size: 1.5em;
      margin-top: 5px;
    }

    &.line {
      position: relative;

      &::before {
        content: "";

        display: block;
        width: 40px;
        height: 3px;
        background: #1ED6BA;
        border-radius: 10px;

        position: absolute;
        bottom: 0;
        left: 0;
        right: 0;

        margin: auto;
      }
    }
  }

  .header-cards {
    display: grid;
    grid-template-columns: 4fr 3fr 3fr;
    grid-template-areas: 'userInfo avgTime basicLocation';
    grid-gap: 20px;

    .user-info {
      grid-area: userInfo;
    }

    .avg-time {
      grid-area: avgTime;
    }

    .basic-location {
      grid-area: basicLocation;
    }

    @media screen and (max-width: 700px) {
      grid-template-columns: 1fr;
      grid-template-areas: 'userInfo userInfo' 'avgTime basicLocation';
    }

    @media screen and (max-width: 450px) {
      grid-template-columns: 1fr;
      grid-template-areas: 'userInfo' 'avgTime' 'basicLocation';
    }
  }

  .user-info {
    display: grid;
    grid-template-columns: 70px 1fr;
    grid-gap: 15px;
    align-items: center;

    .image {
      width: 70px;
      height: 70px;
      overflow: hidden;
      border-radius: 50%;

      img {
        width: 100%;
      }
    }

    .data {
      .name {
        font-size: 1.3em;
        margin-bottom: 5px;
      }

      .online {
        color: #1ED6BA;
      }
    }
  }

  .base-data {
    display: grid;
    grid-template-areas: 'lastSessions currentSession' 'lastSessions locations';
    grid-template-columns: 1fr 300px;
    grid-gap: 20px;

    margin-top: 20px;

    .last-sessions {
      grid-area: lastSessions;
    }

    .current-session {
      grid-area: currentSession;
    }

    .most-visited-locations {
      grid-area: locations;
    }

    .section {
      .title {
        margin-bottom: 10px;
        font-weight: 300;
        font-size: 1.3em;
      }
    }

    @media screen and (max-width: 950px) {
      grid-template-areas: 'lastSessions lastSessions' 'currentSession locations';
    }

    @media screen and (max-width: 600px) {
      grid-template-columns: 1fr;
      grid-template-areas: 'lastSessions' 'currentSession' 'locations';
    }
  }
}
</style>
