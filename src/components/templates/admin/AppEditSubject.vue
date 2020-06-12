<template>
  <app-fade-card
    class="app-edit-subject"
    :show="show"
  >
    <app-preloader :show="showPreloader"></app-preloader>

    <div class="content">
      <div class="users">
        <div class="search">
          <div class="tip">Пошук по користувачам</div>

          <app-input
            appearance="secondary"
            placeholder="Ім'я"
            class="app-input"
            @change="value => searchData.firstName = value"
          ></app-input>

          <app-input
            appearance="secondary"
            placeholder="Прізвище"
            class="app-input"
            @change="value => searchData.lastName = value"
          ></app-input>

          <app-input
            appearance="secondary"
            placeholder="По-батькові"
            class="app-input"
            @change="value => searchData.patronymic = value"
          ></app-input>

          <app-button
            appearance="primary"
            class="submit-search"
            @click="searchUsers"
          >Шукати</app-button>
        </div>

        <div class="label">Користувачі</div>

        <div
          class="no-items"
          v-if="!users.length && searchHasDone"
        >Користувачів з такими даними не знайдено</div>

        <div
          class="no-items"
          v-if="!searchHasDone"
        >Виконайте пошук</div>

        <div class="list">
          <div
            v-for="(user, index) in users"
            :key="index"
            @mouseover="mouseOn = `users-${index}`"
            @mouseleave="mouseOn = null"
          >
            <div
              class="user"
              :class="{
                'is-attached': isAttached(user.id),
              }"
            >
              <div class="name">{{user.lastName}} {{user.firstName}} {{user.patronymic}}</div>

              <app-fade-card
                v-if="!isAttached(user.id)"
                :show="mouseOn === `users-${index}`"
                class="attach-to-subject"
                @click="createTeacher(user.id)"
              >Додати до предмету</app-fade-card>
            </div>
          </div>
        </div>
      </div>

      <div class="active-teachers">
        <div class="label">Викладачі предмету</div>

        <div
          class="no-items"
          v-if="!teachers.length"
        >Вчителів у предмета немає</div>

        <app-fade-card
          :show="Boolean(teachers.length)"
        >
          <div class="list">
            <div
              v-for="({ user }, index) in teachers"
              :key="index"
              @mouseover="mouseOn = `teachers-${index}`"
              @mouseleave="mouseOn = null"
            >
              <div class="user">
                <div class="name">{{user.lastName}} {{user.firstName}} {{user.patronymic}}</div>

                <app-fade-card
                  :show="mouseOn === `teachers-${index}`"
                  class="remove"
                >Деактивувати в предметі</app-fade-card>
              </div>
            </div>
          </div>
        </app-fade-card>
      </div>

      <div class="subject">
        <div class="label">Інформація про предмет</div>

        <app-data-list
          :data="[
            ['Назва предмету', subject.name],
            ['К-сть вчителів', teachers.length],
            ['Тем у предметі', topics.length],
          ]"
        ></app-data-list>
      </div>
    </div>

    <div class="btns">
      <app-button
        appearance="neutral"
        @click="$emit('close')"
      >Приховати</app-button>
    </div>
  </app-fade-card>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

import AppFadeCard from '@/components/ui/AppFadeCard.vue'
import AppDataList from '@/components/ui/AppDataList.vue'
import AppButton from '@/components/ui/AppButton.vue'
import AppInput from '@/components/ui/AppInput.vue'
import AppPreloader from '@/components/ui/AppPreloader.vue'

export default {
  data() {
    return {
      mouseOn: null,
      showPreloader: false,
      searchHasDone: false,
      updatedSubject: null,
      searchData: {
        firstName: '',
        lastName: '',
        patronymic: '',
        isNotInRoles: ['student'],
      },
    }
  },
  watch: {
    subject() {
      this.updatedSubject = null
    },
  },
  computed: {
    ...mapGetters({
      users: 'user/searchResults',
      self: 'user/info',
    }),
    subjectData() {
      const { subject, updatedSubject } = this

      return updatedSubject || subject
    },
    teachers() {
      const { subjectData } = this

      return subjectData.teachers || []
    },
    topics() {
      const { subjectData } = this

      return subjectData.topics || []
    },
  },
  methods: {
    ...mapActions({
      search: 'user/search',
      setAlert: 'alert/set',
      createTeacherAction: 'teacher/create',
      getSubject: 'subjects/getByID',
      refreshUserToken: 'auth/refresh',
    }),
    isAttached(userID) {
      const { teachers } = this

      for (let i = 0; i < teachers.length; i += 1) {
        if (teachers[i].user.id === userID) {
          return true
        }
      }

      return false
    },
    async createTeacher(user) {
      const {
        subject: { id: subject },
        self: { id: currentUserID },
      } = this

      const respondFailure = () => {
        this.setAlert({
          title: 'Помилка',
          text: 'Не вдалось прикріпити користувача до предмету...',
          isSuccess: false,
          show: true,
          delay: 2000,
        })
      }

      if (!user || !subject) {
        respondFailure()

        return
      }

      this.showPreloader = true

      try {
        await this.createTeacherAction({ user, subject })

        if (currentUserID === user) {
          await this.refreshUserToken()
        }

        this.updatedSubject = await this.getSubject(subject)

        this.setAlert({
          title: 'Користувача прикріплено',
          isSuccess: true,
          show: true,
        })
      } catch (e) {
        respondFailure()
      } finally {
        this.showPreloader = false
      }
    },
    async searchUsers() {
      const { searchData } = this

      this.showPreloader = true

      try {
        await this.search(searchData)

        this.searchHasDone = true
      } catch (e) {
        const text = e?.response.data.message || 'Не вдалось виконати пошук...'

        this.setAlert({
          title: 'Помилка',
          text,
          show: true,
          isSuccess: false,
          delay: 2000,
        })
      } finally {
        this.showPreloader = false
      }
    },
  },
  components: {
    AppPreloader,
    AppFadeCard,
    AppDataList,
    AppButton,
    AppInput,
  },
  props: {
    show: {
      type: Boolean,
      required: true,
    },
    subject: {
      type: Object,
      required: true,
    },
  },
}
</script>

<style lang="less" scoped>
.app-edit-subject {
  background: var(--color-bg-dark);
  box-shadow: 0px 0px 15px rgba(0, 0, 0, 0.2);
  border-radius: 10px;
  padding: 30px;

  .content {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    grid-template-areas: 'users activeTeachers subject';
    grid-gap: 20px;
  }

  .label {
    font-size: 1.2em;
    color: var(--color-font-dark);
  }

  .users {
    grid-area: users;

    .search {
      margin: 20px 0;

      .tip {
        color: var(--color-font-dark);
      }

      .app-input {
        background: var(--color-bg-main);
        margin: 15px 0;
      }

      .submit-search {
        width: 100%;
      }
    }
  }

  .list {
    .user {
      padding: 5px 0;
      margin: 10px 0;

      &.is-attached {
        border-left: 2px solid var(--color-accent-green);
        padding: 5px 0 5px 10px;
      }

      .name {
        font-size: 1.1em;
        margin-bottom: 5px;
      }

      .remove {
        color: var(--color-accent-red);
      }

      .attach-to-subject {
        color: var(--color-accent-green);
      }

      .remove,
      .attach-to-subject {
        cursor: pointer;

        &:hover {
          text-decoration: underline;
        }
      }
    }
  }

  .active-teachers {
    grid-area: activeTeachers;
  }

  .no-items {
    margin: 20px 0;
    border-left: 2px solid var(--color-accent-green);
    padding: 5px 0 5px 10px;
  }

  .subject {
    grid-area: subject;
  }

  .btns {
    margin-top: 20px;

    display: flex;
    justify-content: flex-end;
  }

  @media screen and (max-width: 1150px) {
    grid-template-areas: 'users activeTeachers' 'subject subject';
    grid-template-columns: 1fr 1fr;
  }

  @media screen and (max-width: 700px) {
    grid-template-areas: 'users' 'activeTeachers' 'subject';
    grid-template-columns: 1fr;
  }
}
</style>
