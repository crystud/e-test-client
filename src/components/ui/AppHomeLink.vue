<template>
<div
  @click="go"
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
import { mapGetters } from 'vuex'

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
  computed: {
    ...mapGetters({
      user: 'user/self',
    }),
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
  }

  .title {
    margin-left: 22px;
    font-size: 16px;
    color: var(--color-font-main);
  }

  &.student-link {
    .icon {
      color: var(--color-accent-orange);
    }

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
      background: var(--color-accent-blue);

      .shadow {
        background: linear-gradient(90deg, var(--color-accent-blue) 0%, rgba(0,0,0,0) 100%);
      }
    }
  }

  &.superadmin-link {
    .icon {
      color: #463FEA !important;
    }

    .line {
      background: #463FEA;

      .shadow {
        background: linear-gradient(90deg, #463FEA 0%, rgba(0,0,0,0) 100%);
      }
    }
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

    &.line-hide {
      transition: all 0s;

      &, .shadow {
        background: transparent;
      }
    }
  }
}
</style>
