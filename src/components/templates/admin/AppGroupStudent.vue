<template>
  <div class="app-group-student">
    <div class="image">
      <img
        src="https://www.thispersondoesnotexist.com/image"
        alt="student profile image"
      >
    </div>

    <div class="data">
      <div class="name">{{student.lastName}} {{student.firstName}} {{student.patronymic}}</div>
      <div class="last-visit">{{student.email}}</div>
    </div>

    <div class="more">
      <font-awesome-icon
        icon="ellipsis-v"
      ></font-awesome-icon>
    </div>

    <div class="additional-actions">
      <div
        v-if="student.id"
        class="action view-profile"
        @click="viewProfile"
      >
        <font-awesome-icon
          icon="address-card"
        ></font-awesome-icon>
      </div>

      <!-- <div class="action remove-user">
        <font-awesome-icon
          icon="user-times"
        ></font-awesome-icon>
      </div> -->
    </div>
  </div>
</template>

<script>
export default {
  props: {
    student: {
      type: Object,
      required: true,
      default: () => {},
    },
  },
  methods: {
    viewProfile() {
      const { student: { id } } = this

      if (id) {
        this.$router.push({
          name: 'student',
          params: { id },
        })
      }
    },
  },
}
</script>

<style lang="less" scoped>
.app-group-student {
  display: grid;
  grid-template-columns: 70px 1fr 15px;
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

    img {
      width: 100%;
    }
  }

  .data {
    .name {
      font-size: 1.1em;
      color: var(--color-font-main);
      margin-bottom: 5px;
    }

    .last-visit {
      color: var(--color-font-dark);
    }
  }

  .more {
    text-align: right;
    color: var(--color-font-dark);
  }

  .hidden {
    opacity: 0;
    visibility: hidden;
  }

  .showed {
    opacity: 1;
    visibility: visible;
  }

  .transition {
    transition: all .3s;
  }

  .data,
  .more {
    position: relative;
    z-index: 100;
    left: 0;

    .showed();
    .transition();
  }

  .additional-actions {
    position: absolute;
    left: 40px;

    display: flex;
    justify-content: center;
    align-items: center;

    width: calc(100% - 40px);
    height: 100%;

    .hidden();
    .transition();

    .action {
      font-size: 1.5em;
      margin: 0 10px;
      cursor: pointer;

      &.view-profile {
        color: var(--color-font-dark);
      }

      &.remove-user {
        color: var(--color-accent-red);
      }
    }
  }

  @media screen and (max-width: 1000px) {
    grid-template-columns: 70px 1fr auto;

    .additional-actions {
      position: relative;
      left: -20px;
      width: auto;

      .showed();
    }

    .more {
      display: none;
    }
  }

  @media screen and (min-width: 1000px) {
    &:hover {
      .data,
      .more {
        left: -20px;

        .hidden();
      }

      .additional-actions {
        left: 20px;

        .showed();
      }
    }
  }
}
</style>
