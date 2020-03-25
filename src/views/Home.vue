<template>
  <app-screen>
    <app-preloader :show="false"></app-preloader>

    <app-settings
      :show="settingsOpen"
      @close="settingsOpen = false"
    ></app-settings>

    <div class="sidebar">
      <div
        class="desktop-sidebar"
        :class="{
          'mobile-opened': sidebar.opened,
        }"
      >
        <div
          class="settings-icon"
          @click="settingsOpen = true"
        >
          <font-awesome-icon
            icon="user-cog"
          ></font-awesome-icon>
        </div>

        <div class="header">
          <font-awesome-icon
            icon="times"
            @click="sidebar.opened = false"
          />
        </div>

        <div class="user">
          <div class="avatar">
            <img
              src="https://www.thispersondoesnotexist.com/image"
              alt="profile image"
            />
          </div>

          <div class="name">Random person</div>
        </div>


        <div class="roles">
          <div
              v-for="(role, index) in roles"
              :key="index"
              class="role"
              :class="[`role-${role}`]"
          >{{ localization.role[role] }}</div>
        </div>

        <div class="logout">
          <button
            @click="exit"
            class="btn"
          >Вихід</button>
        </div>

        <div class="stats">
          <div class="item">
            <div class="icon">
              <font-awesome-icon icon="chart-line" />
            </div>

            <div class="status">
              <font-awesome-icon icon="check" />
            </div>

            <div class="value">
              <div class="number">-</div>
              <div class="title">Рейтинг</div>
            </div>
          </div>

          <div class="line"></div>

          <div class="item">
            <div class="icon">
              <font-awesome-icon icon="home" />
            </div>

            <div class="status">
              <font-awesome-icon icon="times" />
            </div>

            <div class="value">
              <div class="number">
                0
              </div>

              <div class="title">Пропусків</div>
            </div>
          </div>
        </div>

        <div class="menu" @click="sidebar.opened = false">
          <div class="divider">Загальне</div>

          <app-home-link role="user" link="homeUser">Домівка</app-home-link>
          <app-home-link role="student" link="tests">Тести</app-home-link>

          <!-- ====== -->

          <div class="divider">Вчитель</div>

          <app-home-link role="teacher" link="createTest">Створити тест</app-home-link>

          <!-- ====== -->

          <div class="divider">Адміністратор</div>

          <app-home-link role="admin" link="request">Заявка</app-home-link>
          <app-home-link role="admin" link="college">Навчальний заклад</app-home-link>
          <app-home-link role="admin" link="specialtys">Спеціальності</app-home-link>
          <app-home-link role="admin" link="classes">Пари</app-home-link>
          <app-home-link role="admin" link="subjects">Предмети</app-home-link>
          <app-home-link role="admin" link="students">Студенти</app-home-link>
        </div>
      </div>

      <div class="mobile-sidebar">
        <span
          class="expand-icon"
          @click="sidebar.opened = true"
        >
          <font-awesome-icon
            icon="bars"
          ></font-awesome-icon>
        </span>

        <span class="username">
          Студент студентович
        </span>
      </div>
    </div>

    <div class="content">
      <app-confirm-email
        :show="false"
        :showSend="true"
      ></app-confirm-email>

      <router-view></router-view>
    </div>
  </app-screen>
</template>

<script>
import AppScreen from '@/components/ui/AppScreen.vue'
import AppHomeLink from '@/components/ui/AppHomeLink.vue'
import AppPreloader from '@/components/ui/AppPreloader.vue'

import AppConfirmEmail from '@/components/templates/authorization/AppConfirmEmail.vue'
import AppSettings from '../components/templates/settings/AppSettings.vue'

export default {
  name: 'Home.vue',
  data() {
    return {
      isConfirmed: false,
      sidebar: {
        opened: false,
      },
      settingsOpen: false,
      roles: ['student', 'teacher', 'admin', 'superadmin'],
      localization: {
        role: {
          user: 'Користувач',
          student: 'Студент',
          admin: 'Адміністратор',
          teacher: 'Викладач',
          superadmin: 'Root',
        },
      },
    }
  },
  methods: {
    exit() {
      localStorage.removeItem('accessToken')

      this.$router.push({ name: 'signIn' })
    },
  },
  components: {
    AppScreen,
    AppHomeLink,
    AppConfirmEmail,
    AppPreloader,
    AppSettings,
  },
}
</script>

<style lang="less" scoped>
@small: ~"screen and (max-width: 799px)";
@medium: ~"screen and (max-width: 1000px)";
@large: ~"screen and (min-width: 1001px)";

.app-screen {
  display: grid;

  height: 100vh;

  grid-template-rows: 1fr;
  grid-template-columns: 360px 1fr;
  grid-template-areas: 'name .';

  .mobile-sidebar {
    display: none;
    grid-template-columns: 70px 1fr 70px;
    align-items: center;

    height: 100%;

    .expand-icon {
      margin: 0 25px;
      color: var(--color-font-dark);
      font-size: 1.5rem;
    }

    .username {
      text-align: center;
      color: var(--color-font-main);
    }
  }

  .divider {
    padding: 10px;
    padding-left: 45px;
    font-size: 1.1em;
    font-weight: 100;
    color: var(--color-font-dark);
  }

  .sidebar {
    grid-area: name;
    background: var(--color-bg-dark);

    max-height: 100vh;
    overflow: auto;

    position: relative;

    .settings-icon {
      position: absolute;
      top: 15px;
      right: 15px;

      cursor: pointer;

      color: var(--color-font-dark);
      font-size: 1.5em;
    }

    .header {
      height: 15px;
      color: var(--color-font-gray);
      font-size: 30px;
      margin: 20px 0 0 20px;
      display: none;
    }

    .logout {
      display: flex;
      justify-content: center;
      width: 100%;

      margin: 10px 0;

      .btn {
        background: transparent;
        border: 0;
        cursor: pointer;
        color: var(--color-font-dark);
        font-size: 1em;
        margin: 10px 0;

        &:hover {
          text-decoration: underline;
        }
      }
    }

    .user {
      margin-top: 30px;
      display: flex;
      flex-direction: column;
      align-items: center;

      .avatar {
        height: 130px;
        width: 130px;
        background: var(--color-bg-main);
        border-radius: 50%;

        display: flex;
        overflow: hidden;

        img {
          width: 100%;
          margin: auto;
        }
      }

      .name {
        margin-top: 20px;
        color: var(--color-font-main);
        font-size: 17px;
        font-weight: 600;
      }
    }

    .roles {
      display: flex;
      justify-content: center;
      flex-wrap: wrap;
      margin: 7px 0;
      padding: 0 20px;

      .role {
        margin: 0 8px 5px;
        font-size: 17px;
      }

      .role-user {
        color: var(--color-accent-green);
      }

      .role-student {
        color: var(--color-accent-orange);
      }

      .role-teacher {
        color: #0EEAA6;
      }

      .role-admin {
        color: var(--color-accent-blue);
      }

      .role-superadmin {
        color: #6660ED;
      }
    }

    .stats {
      display: flex;
      margin-top: 25px;
      justify-content: center;
      align-items: center;
      padding: 0 45px;

      .item {
        display: flex;
        align-items: center;
        margin: 0 30px;

        .icon {
          height: 18px;
          width: 18px;
          color: var(--color-font-gray);
        }

        .status {
          margin-left: 5px;
          color: var(--color-accent-orange);
        }

        .value {
          margin-left: 7px;

          .number {
            color: var(--color-font-main);
            font-size: 16px;
            text-align: center;
          }

          .title {
            color: var(--color-font-gray);
            font-size: 14px;
          }
        }
      }

      .line {
        height: 45px;
        width: 1px;
        background: var(--color-font-gray);
      }
    }

    .menu {
      margin-top: 20px;
    }
  }

  @media @medium {
    grid-template-columns: 1fr;
    grid-template-rows: 70px 1fr;
    grid-template-areas: 'name' '.';

    .desktop-sidebar {
      position: fixed;
      top: 0;
      left: -100%;
      z-index: 1003;

      width: 100vw;
      height: 100vh;
      overflow: auto;

      transition: left .3s, background .3s .1s;

      @color: var(--color-bg-main);

      &.mobile-opened {
        background-color: var(--color-bg-dark);
        opacity: 1;
        left: 0;
      }

      .header {
        display: block;
      }
    }

    .mobile-sidebar {
      display: grid;
    }
  }

  .content {
    padding: 20px 45px 70px;
    position: relative;

    max-height: 100vh;
    overflow: auto;

    @media @small {
      padding: 10px;
    }
  }
}
</style>
