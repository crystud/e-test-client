<template>
  <div class="app-group-student">
    <div class="data">
      <div
        class="name"
        @click="viewProfile"
      >
        {{student.user.lastName}} {{student.user.firstName}} {{student.user.patronymic}}
      </div>

      <div class="last-visit">{{student.user.email}}</div>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  methods: {
    ...mapActions({
      setAlert: 'alert/set',
    }),
    viewProfile() {
      const { student: { user: { id } = {} } = {} } = this

      if (!id) {
        this.setAlert({
          title: 'Помилка',
          text: 'Не вдалось оприділити ID студента',
          show: true,
          isSuccess: false,
        })

        return
      }

      this.$router.push({
        name: 'studentOverview',
        params: { id },
      })
    },
  },
  props: {
    student: {
      type: Object,
      required: true,
      default: () => {},
    },
  },
}
</script>

<style lang="less" scoped>
.app-group-student {
  .data {
    .name {
      color: var(--color-font-main);
      cursor: pointer;

      font-size: 1.1em;
      margin-bottom: 5px;

      &:hover {
        text-decoration: underline;
      }
    }

    .last-visit {
      color: var(--color-font-dark);
    }
  }

  @media screen and (max-width: 1000px) {
    grid-template-columns: 70px 1fr;
  }
}
</style>
