<template>
  <div class="app-group-student">
    <div
      class="image"
      @click="viewProfile"
    >
      <img
        src="https://www.thispersondoesnotexist.com/image"
        alt="student profile image"
      >
    </div>

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
        name: 'student',
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
  display: grid;
  grid-template-columns: 70px 1fr;
  grid-gap: 10px;
  align-items: center;

  position: relative;

  .image {
    width: 70px;
    height: 70px;
    border-radius: 10px;
    overflow: hidden;
    position: relative;
    z-index: 120;
    cursor: pointer;

    img {
      width: 100%;
    }
  }

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
