<template>
  <div class="app-students">
    <app-preloader :show="showPreloader"></app-preloader>

    <div class="search-bar">
      <input
        type="text"
        placeholder="Прізвище"
        v-model="lastName"
        v-on:keyup="({ keyCode }) => keyCode === 13 ? search() : null"
      />

      <input
        type="text"
        placeholder="Ім'я"
        class="border-left"
        v-model="firstName"
        v-on:keyup="({ keyCode }) => keyCode === 13 ? search() : null"
      />

      <input
        type="text"
        placeholder="Ім'я по-батькові"
        class="border-left"
        v-model="patronymic"
        v-on:keyup="({ keyCode }) => keyCode === 13 ? search() : null"
      />

      <app-button
        appearance="neutral"
        class="btn"
        @click="search"
      >
        <font-awesome-icon
          icon="search"
        ></font-awesome-icon>
      </app-button>
    </div>

    <div
      v-if="searchLaunched && !searchResults.length"
      class="search-tip no-results"
    >Нікого не знайдено</div>

    <div
      class="search-tip"
      v-if="!searchLaunched"
    >Вкажіть дані та натисніть " <font-awesome-icon icon="search"></font-awesome-icon> "</div>

    <div
      class="students"
      v-if="searchLaunched"
    >
      <app-user-item
        v-for="(user, index) in searchResults"
        v-bind:key="index"
        :user="user"
        class="user"
      ></app-user-item>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'

import AppButton from '@/components/ui/AppButton.vue'
import AppPreloader from '@/components/ui/AppPreloader.vue'
import AppUserItem from '@/components/templates/admin/AppUserItem.vue'

export default {
  computed: {
    ...mapGetters({
      searchResults: 'user/searchResults',
    }),
  },
  methods: {
    ...mapActions({
      searchUsers: 'user/search',
      setAlert: 'alert/set',
    }),
    async search() {
      try {
        this.showPreloader = true

        const {
          firstName,
          lastName,
          patronymic,
        } = this

        if (!firstName && !lastName && !patronymic) {
          this.setAlert({
            title: 'Вкажіть дані для пошуку',
            isSuccess: false,
            show: true,
          })

          return
        }

        this.searchLaunched = true

        await this.searchUsers({
          roles: 'student',
          firstName,
          lastName,
          patronymic,
        })
      } catch (e) {
        this.setAlert({
          title: 'Помилка',
          text: 'Не вдалося виконати пошук',
          show: true,
          isSuccess: false,
        })
      } finally {
        this.showPreloader = false
      }
    },
  },
  data() {
    return {
      showPreloader: false,
      firstName: '',
      lastName: '',
      patronymic: '',
      searchLaunched: false,
    }
  },
  components: {
    AppButton,
    AppUserItem,
    AppPreloader,
  },
}
</script>

<style lang="less" scoped>
.app-students {
  .search-bar {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr 80px;

    background: var(--color-bg-dark);
    border-radius: 10px;

    input {
      background: transparent;
      border: 0;
      font-size: 1em;
      font-weight: 100;

      padding: 20px;

      color: var(--color-font-main);

      &::placeholder {
        color: var(--color-font-dark);
        font: 1em 'Exo 2', 'Lato', Arial;
      }
    }

    .border-left {
      border-left: 1px solid var(--color-bg-light);
    }

    .btn {
      .border-left();
    }

    .btn {
      background: transparent;
      padding: 0;
      color: var(--color-font-dark);
      border-radius: 0;
    }
  }

  .search-tip {
    text-align: center;
    margin: 80px 0;
    font-size: 1.5em;
    color: var(--color-font-dark);
  }

  .students {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    grid-gap: 20px;

    margin-top: 20px;

    .user {
      background: var(--color-bg-dark) !important;
    }
  }

  @media screen and (max-width: 1500px) {
    .students {
      grid-template-columns: 1fr 1fr;
    }
  }

  @media screen and (max-width: 1200px) {
    .students {
      grid-template-columns: 1fr 1fr;
    }
  }

  @media screen and (max-width: 1000px) {
    .students {
      grid-template-columns: 1fr 1fr;
    }
  }

  @media screen and (max-width: 650px) {
    .students {
      grid-template-columns: 1fr;
    }
  }

  @media screen and (max-width: 750px) {
    .search-bar {
      grid-template-columns: 1fr;

      .borderTop {
        border-top: 1px solid var(--color-bg-light);
      }

      .select, .btn {
        border-left: 0;
        padding: 20px;
      }

      .border-left {
        border-left: 0;
      }

      .btn, .select {
        .borderTop();
      }
    }
  }
}
</style>
