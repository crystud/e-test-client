<template>
  <div class="home-user">
    <div class="body">
      <div class="icon">
        <font-awesome-icon icon="user-clock"></font-awesome-icon>
      </div>

      <div class="title">У вас немає ролі...</div>

      <div class="text">
        <div class="explanation">
          Наразі створеному вами профілю не було дано якоїсь ролі.
          Очікуйте коли один з адміністраторів навчального закладу
          вкаже вашу роль в системі.
        </div>

        <button
          class="exit"
          @click="exit($router)"
        >Вийти з профілю</button>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  methods: {
    ...mapActions({
      exit: 'auth/exit',
    }),
  },
}
</script>

<style lang="less" scoped>
.home-user {
  display: flex;

  width: 100vw;
  height: 100vh;

  .body {
    position: relative;

    margin: auto;
    max-width: 350px;
    text-align: center;

    background: var(--color-bg-dark);
    color: var(--color-font-main);
    border-radius: 10px;

    box-shadow: 0px 0px 25px rgba(0, 00, 0, 0.13);

    &::before {
      content: "";
      display: block;
      width: 70px;
      height: 3px;

      background: var(--color-accent-green);
      border-radius: 10px;

      position: absolute;
      bottom: 0;
      left: 0;
      right: 0;
      margin: auto;
    }

    .icon {
      font-size: 3em;

      padding: 30px;

      margin-bottom: 20px;
      border-bottom: 1px solid var(--color-bg-main);

      color: var(--color-font-dark);
    }

    .title {
      margin-top: 30px;
      font-size: 1.3em;
      font-weight: bold;
    }

    .text {
      padding: 20px 30px;
      line-height: 1.5em;

      color: var(--color-font-dark);
    }

    .exit {
      background: transparent;
      border: 0;
      color: var(--color-accent-red);
      font-size: 1em;

      margin: 20px 0;
      cursor: pointer;

      &:hover {
        text-decoration: underline;
      }
    }
  }
}
</style>
