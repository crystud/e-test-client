<template>
  <div class="group-view">
    <app-preloader :show="showPreloader"></app-preloader>

    <app-create-student
      :user="createStudentInfo"
      :group="group"
      :show="Boolean(createStudentInfo.id)"
      @created="studentCreated"
    ></app-create-student>

    <div class="header">
      <div class="name">{{group.name}}</div>

      <router-link
        :to="{ name: 'groups' }"
        class="select-other"
      >Обрати іншу групу...</router-link>
    </div>

    <div class="content">
      <div class="students">
        <div class="title">Студенти в групі</div>

        <div class="list">
          <div
            class="no-result"
            v-if="group.students.length === 0"
          >
            В групі немає студентів...
          </div>

          <app-group-student
            v-for="(student, index) in group.students"
            :key="index"
            :student="student"
            class="app-group-student"
          ></app-group-student>
        </div>

        <div
          class="save-section"
          v-show="false"
        >
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
          <div class="search-fields">
            <input
              type="text"
              placeholder="Прізвище"
              v-model="lastName"
            />

            <input
              type="text"
              placeholder="Ім'я"
              v-model="firstName"
            />

            <input
              type="text"
              placeholder="По-батькові"
              v-model="patronymic"
            />

            <button @click="search">
              <font-awesome-icon icon="search"></font-awesome-icon>
            </button>
          </div>
        </div>

        <div class="results">
          <div
            class="search-tip no-results"
            v-show="searchLaunched && filteredStudents.length === 0"
          >Нікого не знайдено...</div>

          <div
            class="search-tip"
            v-show="!searchLaunched"
          >Введіть пошуковий запит</div>

          <div v-show="searchLaunched && filteredStudents.length">
            <div class="title">Знайдено {{filteredStudents.length}} осіб</div>

            <div class="list">
              <app-search-student
                v-for="(user, index) in filteredStudents"
                :key="index"
                :user="user"
                :isSelected="group.students.includes(user.id)"
                @addStudent="createStudentInfo = user"
              ></app-search-student>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

import AppGroupStudent from '@/components/templates/admin/AppGroupStudent.vue'
import AppSearchStudent from '@/components/templates/admin/AppSearchStudent.vue'
import AppButton from '@/components/ui/AppButton.vue'
import AppPreloader from '@/components/ui/AppPreloader.vue'
import AppCreateStudent from '@/components/templates/admin/AppCreateStudent.vue'

export default {
  data() {
    return {
      showPreloader: false,
      firstName: '',
      lastName: '',
      patronymic: '',
      searchLaunched: false,
      createStudentInfo: {},
    }
  },
  computed: {
    ...mapGetters({
      group: 'groups/group',
      results: 'user/searchResults',
    }),
    filteredStudents() {
      const {
        group: { students = [] } = {},
        results = [],
      } = this

      const studentsIDs = students.map(({ user }) => user.id)

      return results.filter(({ id }) => !studentsIDs.includes(id))
    },
  },
  methods: {
    ...mapActions({
      getGroupByID: 'groups/getByID',
      searchUsers: 'user/search',
      setAlert: 'alert/set',
    }),
    async studentCreated() {
      const delay = 1500

      this.createStudentInfo = {}

      this.setAlert({
        title: 'Студента створено',
        isSuccess: true,
        show: true,
        delay,
      })

      setTimeout(() => {
        this.loadGroup()
      }, delay)
    },
    async loadGroup() {
      try {
        const {
          params: { id: groupID },
        } = this.$route

        this.showPreloader = true

        await this.getGroupByID(groupID)
      } catch (e) {
        this.setAlert({
          title: 'Помилка',
          text: 'Нам не вдалось отримати інформацію про групу',
          delay: 2000,
          isSuccess: false,
          show: true,
        })
      } finally {
        this.showPreloader = false
      }
    },
    async search() {
      const { firstName, lastName, patronymic } = this

      const searchData = {
        isNotInRoles: 'teacher',
      }

      if (firstName) searchData.firstName = firstName
      if (lastName) searchData.lastName = lastName
      if (patronymic) searchData.patronymic = patronymic

      this.showPreloader = true

      try {
        await this.searchUsers(searchData)
      } catch (e) {
        this.setAlert({
          title: 'Помилка',
          text: 'Не вдалось виконати пошук',
          show: true,
          isSuccess: false,
        })
      } finally {
        this.showPreloader = false
        this.searchLaunched = true
      }
    },
  },
  async created() {
    await this.loadGroup()
  },
  components: {
    AppGroupStudent,
    AppSearchStudent,
    AppButton,
    AppPreloader,
    AppCreateStudent,
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

  .search-tip {
    font-size: 1.3em;
    text-align: center;
    margin: 20px 0;
    color: var(--color-font-dark);
  }

  .no-results {
    color: var(--color-accent-red);
  }

  .content {
    display: grid;
    grid-template-columns: 350px 1fr;
    grid-gap: 20px;

    .no-result {
      text-align: center;
      font-size: 1.3em;
      color: var(--color-font-dark);

      margin: 40px 20px;
    }

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
        height: 100%;

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
        .search-fields {
          display: grid;
          grid-template-columns: 1fr 1fr 1fr 50px;
          grid-gap: 10px;

          input {
            background: var(--color-bg-dark);
            padding: 20px 10px;
            border: 0;
            border-radius: 10px;
            font-size: 1em;

            color: var(--color-font-main);

            &::placeholder {
              color: var(--color-font-dark);
            }
          }

          button {
            color: var(--color-font-dark);
            cursor: pointer;

            height: 100%;

            background: var(--color-bg-dark);
            border-radius: 10px;
            border: 0;
            padding: 20px 10px;
            font-size: 1em;

            display: flex;
            justify-content: center;
            align-items: center;

            &:hover {
              color: var(--color-font-main);
            }
          }

          @media screen and (max-width: 1450px) {
            grid-template-columns: 1fr 1fr;
          }

          @media screen and (max-width: 450px) {
            grid-template-columns: 1fr;
          }
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
