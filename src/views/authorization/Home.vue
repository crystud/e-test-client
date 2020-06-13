<template>
  <app-screen>
    <app-preloader :show="showPreloader"></app-preloader>

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

          <div class="name">{{user.lastName}} {{user.firstName}} {{user.patronymic}}</div>
        </div>

        <div class="roles">
          <div
              v-for="(role, index) in user.roles"
              :key="index"
              class="role"
              :class="[`role-${role}`]"
          >{{ localization.role[role] }}</div>
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
          <div v-if="(user.roles || []).includes('student')">
            <div class="divider">Студент</div>

            <app-home-link
              v-for="student in studentGroups"
              :key="student.id"
              role="student"
              link="studentHome"
              :params="{ id: student.id }"
            >Домівка ({{student.group.name}})</app-home-link>
          </div>

          <div v-if="(user.roles || []).includes('teacher')">
            <div class="divider">Вчитель</div>

            <app-home-link role="teacher" link="homeTeacher">Домівка вчителя</app-home-link>
            <app-home-link role="teacher" link="TeacherOwnTests">Мої тести</app-home-link>
            <app-home-link role="teacher" link="questionsBank">Банк питань</app-home-link>
            <app-home-link role="teacher" link="permissions">Дозволи на проходження</app-home-link>
          </div>

          <div v-if="(user.roles || []).includes('admin')">
            <div class="divider">Адміністратор</div>

            <app-home-link role="admin" link="statsCollege">Статистика нагрузки</app-home-link>
            <app-home-link role="admin" link="createdInvites">Запрошення</app-home-link>
            <app-home-link role="admin" link="groups">Групи</app-home-link>
            <app-home-link role="admin" link="specialtys">Спеціальності</app-home-link>
            <app-home-link role="admin" link="subjects">Предмети</app-home-link>
            <app-home-link role="admin" link="students">Студенти</app-home-link>
          </div>
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
          {{user.lastName}} {{user.firstName}} {{user.patronymic}}
        </span>
      </div>
    </div>

    <div class="content">
      <app-create-test
        :show="showCreateTest"
        @close="showCreateTest = false"
        @created="showCreateTest = false"
      ></app-create-test>

      <app-student-active-tests></app-student-active-tests>

      <div class="global-header">
        <div class="page-title">
          <font-awesome-icon
            icon="map-marker-alt"
            class="icon"
          ></font-awesome-icon>

          <span class="text">{{$route.meta.title}}</span>
        </div>

        <button
          v-if="(user.roles || []).includes('teacher')"
          @click="showCreateTest = true"
          class="create-test"
        >Створити тест</button>

        <div
          class="settings-icon"
          @click="settingsOpen = true"
        >
          <font-awesome-icon
            icon="user-cog"
          ></font-awesome-icon>
        </div>

        <button
          @click="exit"
          class="logout"
        >Вихід</button>
      </div>

      <div class="max-width-container">
        <router-view></router-view>
      </div>
    </div>
  </app-screen>
</template>

<script>
import { mapGetters } from 'vuex'

import AppScreen from '@/components/ui/AppScreen.vue'
import AppHomeLink from '@/components/ui/AppHomeLink.vue'
import AppPreloader from '@/components/ui/AppPreloader.vue'
import AppCreateTest from '@/components/templates/teacher/AppCreateTest.vue'
import AppStudentActiveTests from '@/components/templates/student/AppStudentActiveTests.vue'

import AppSettings from '@/components/templates/settings/AppSettings.vue'

export default {
  data() {
    return {
      isConfirmed: false,
      sidebar: {
        opened: false,
      },
      showCreateTest: false,
      showPreloader: false,
      settingsOpen: false,
      localization: {
        role: {
          user: 'Користувач',
          student: 'Студент',
          admin: 'Адміністратор',
          teacher: 'Викладач',
        },
      },
    }
  },
  computed: {
    ...mapGetters({
      user: 'user/info',
      studentGroups: 'student/studentGroups',
    }),
  },
  methods: {
    exit() {
      localStorage.removeItem('accessToken')
      localStorage.removeItem('refreshToken')

      this.$router.push({ name: 'signIn' })
    },
  },
  components: {
    AppScreen,
    AppHomeLink,
    AppPreloader,
    AppSettings,
    AppCreateTest,
    AppStudentActiveTests,
  },
}
</script>

<style lang="less" scoped>
@small: ~"screen and (max-width: 799px)";
@medium: ~"screen and (max-width: 1000px)";
@large: ~"screen and (min-width: 1001px)";

.global-header {
  width: 100%;
  background: var(--color-bg-dark);
  padding: 20px;

  display: grid;
  grid-template-columns: 1fr repeat(3, auto);
  grid-template-areas: 'pagename settings createTest logout';

  justify-content: space-between;
  align-items: center;
  grid-gap: 20px;

  border-left: 1px solid var(--color-bg-main);

  position: sticky;
  top: 0;
  left: 0;
  z-index: 105;

  box-shadow: 0px 5px 10px rgba(0, 0, 0, 0.2);

  .page-title {
    font-weight: 400;
    grid-area: pagename;

    .text {
      color: var(--color-font-main);
      margin-left: 10px;
      font-size: 1.3em;
    }

    .icon {
      color: var(--color-font-dark);
    }
  }

  .settings-icon {
    cursor: pointer;
    grid-area: settings;

    color: var(--color-font-dark);
    font-size: 1.5em;
  }

  .create-test {
    padding: 10px 15px;
    background: var(--color-accent-green);
    border: 0;
    border-radius: 5px;
    color: #fafafa;
    cursor: pointer;
    font-size: 1em;
    grid-area: createTest;
  }

  .logout {
    color: var(--color-font-main);
    background: transparent;
    border: 0;
    font-size: 1em;
    cursor: pointer;
    grid-area: logout;

    &:hover {
      text-decoration: underline;
    }
  }

  @media screen and (max-width: 700px) {
    grid-template-areas: 'pagename pagename pagename' 'settings createTest logout';
    grid-template-columns: 30px auto 80px;

    justify-content: flex-start;
  }
}

.app-screen {
  display: grid;

  height: 100vh;

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
    font-weight: 300;
    color: var(--color-font-dark);
  }

  .sidebar {
    grid-area: name;
    background: var(--color-bg-dark);

    max-height: 100vh;
    overflow: auto;

    position: relative;

    .header {
      height: 15px;
      color: var(--color-font-gray);
      font-size: 30px;
      margin: 20px 0 0 20px;
      display: none;
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
        font-size: 1.3em;
        font-weight: 400;
        text-align: center;
      }
    }

    .roles {
      margin: 15px auto 7px;
      padding: 0 20px;

      max-width: 80%;
      text-align: center;

      .role {
        display: inline-block;
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
    position: relative;

    max-height: 100vh;
    overflow-y: auto;

    .max-width-container {
      max-width: 1320px;
      width: 100%;
      margin: 0 auto;
      padding: 30px 30px 20px;

      @media @small {
        padding: 20px;
      }
    }
  }
}
</style>
