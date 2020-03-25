<template>
<div
  @click="go"
  v-show="isAvailable"
  class="app-home-link"
  :class="`${role}-link`"
>
  <div
    class="line"
    :class="[this.$router.currentRoute.name === this.link  ? '' : 'line-hide']"
  >
    <div class="shadow"></div>
  </div>

  <div class="icon">
    <font-awesome-icon icon="hashtag" />
  </div>

  <div class="title">
    <slot></slot>
  </div>
</div>
</template>

<script>
export default {
  name: 'AppHomeLink',
  methods: {
    go() {
      if (this.$router.currentRoute.name !== this.link) {
        this.$router.push({ name: this.link })
      }
    },
  },
  props: {
    link: {
      type: String,
      require: true,
    },
    role: {
      type: String,
      require: true,
    },
  },
  data() {
    return {
      roles: ['admin', 'student', 'user', 'teacher'],
    }
  },
  computed: {
    isAvailable() {
      return this.roles.includes(this.role)
    },
  },
}
</script>

<style lang="less" scoped>
.app-home-link {
  cursor: pointer;
  height: 70px;
  display: flex;
  align-items: center;

  &:hover {
    .line {
      .shadow {
        width: 30px;
      }
    }
  }

  .icon {
    margin-left: 40px;
    color: var(--color-accent-orange);
  }

  .title {
    margin-left: 22px;
    font-size: 16px;
    color: var(--color-font-main);
  }

  .line {
    position: relative;
    width: 6px;
    height: 100%;
    background: var(--color-accent-orange);

    .shadow {
      position: absolute;
      height: 100%;
      width: 20px;

      transition: all .15s;
    }
  }

  &.user-link,
  &.student-link {
    color: var(--color-accent-yellow);

    .line {
      .shadow {
        background: linear-gradient(90deg, var(--color-accent-orange) 0%, rgba(0,0,0,0) 100%);
      }
    }
  }

  &.teacher-link {
    .icon {
      color: #0EEAA6;
    }

    .line {
      background: var(--color-accent-orange);

      .shadow {
        background: linear-gradient(90deg, #0EEAA6 0%, rgba(0,0,0,0) 100%);
      }
    }
  }

  &.admin-link {
    .icon {
      color: var(--color-accent-blue);
    }

    .line {
      .shadow {
        background: linear-gradient(90deg, var(--color-accent-blue) 0%, rgba(0,0,0,0) 100%);
      }
    }
  }

  .line-hide {
    transition: all 0s;

    &, .shadow {
      background: transparent !important;
    }
  }
}
</style>
