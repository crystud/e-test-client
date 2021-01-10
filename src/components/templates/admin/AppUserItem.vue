<template>
  <app-card
    class="app-user-item"
    @click="go"
  >
    <div class="profile-image">
      <img
        :src="require('@/assets/no_user.png')"
        alt="profile image"
      />
    </div>

    <div class="info">
      <div class="name">{{user.lastName}} {{user.firstName}} {{user.patronymic}}</div>
      <div class="additional">E-mail: {{user.email}}</div>
    </div>

    <div class="last-visit">
      <div class="text">
        <span>в мережі</span>

        <div
          class="circle"
          :class="{
            'active': Math.random() > 0.5,
          }"
        />
      </div>
    </div>
  </app-card>
</template>

<script>
import AppCard from '@/components/ui/AppCard.vue'

export default {
  props: {
    user: {
      type: Object,
      required: true,
    },
  },
  methods: {
    go() {
      const { user: { id } } = this

      this.$router.push({
        name: 'studentOverview',
        params: { id },
      })
    },
  },
  components: {
    AppCard,
  },
}
</script>

<style lang="less">
@profile-image-size: 70px;
@big-profile-image-size: 100px;

.app-user-item {
  display: grid;
  grid-template-columns: @profile-image-size 1fr auto;

  background: var(--color-bg-main) !important;

  cursor: pointer;

  .profile-image {
    width: @profile-image-size;
    height: @profile-image-size;
    overflow: hidden;
    border-radius: 10px;

    display: flex;

    img {
      width: 100%;
      margin: auto;
    }
  }

  .info {
    padding: 10px;

    .name {
      font-size: 1.2em;
      font-weight: 400;
      color: var(--color-font-main);
    }

    .additional {
      font-size: 0.9em;
      margin-top: 5px;
      color: var(--color-font-dark);
    }
  }

  .last-visit {
    padding: 10px;
    font-size: 0.9em;
    text-align: right;

    .text {
      display: flex;
      align-items: center;

      .circle {
        width: 10px;
        height: 10px;
        border-radius: 50%;

        background: var(--color-font-dark);
        margin-left: 5px;

        &.active {
          background: linear-gradient(45deg, #0C6993, #1BC388);
        }
      }
    }
  }

  @media screen and (max-width: 1150px) {
    grid-template-columns: 1fr;
    grid-gap: 0px;

    .profile-image {
      margin: 20px auto 0;

      width: @big-profile-image-size;
      height: @big-profile-image-size;
    }

    .info {
      text-align: center;
      padding: 0;
      margin-top: 10px;
    }

    .last-visit {
      margin: 0 auto 10px;
    }
  }
}
</style>
