<template>
  <div
    class="app-student-active-tests"
    :class="{
      active: attempt.id && $route.name !== 'testPass',
    }"
    @click="attempt.id ? $router.push({
      name: 'testPass',
      params: {
        attemptID: attempt.id,
      },
    }) : null"
  >
    <div class="label">Поверніться до проходження тесту...</div>

    <div class="time">
      <div class="text">Час до закінчення:</div>
      <div class="value">--:--:--</div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      get attempt() {
        const attempt = localStorage.getItem('attempt')

        return attempt ? JSON.parse(attempt) : {}
      },
    }
  },
  watch: {
    localStorage() {
      console.log('change')
    },
  },
}
</script>

<style lang="less" scoped>
.app-student-active-tests {
  max-width: calc(100vw - 40px);

  position: fixed;
  left: 20px;
  bottom: -50%;
  z-index: 9993;

  background: var(--color-bg-main);
  box-shadow: 0px 0px 20px rgba(0, 0, 0, 0.3);
  border-radius: 10px;
  padding: 20px;

  overflow: hidden;
  cursor: pointer;

  transform: scale(1);
  transition: all .15s;

  &.active {
    bottom: 20px;
  }

  &:hover {
    background: var(--color-bg-dark);
    transform: scale(1.04);
  }

  @keyframes spin {
    0%, 100% {
      width: 0px;
      left: 0%;
    }

    50% {
      width: 100px;
      left: 100%;
    }
  }

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
    margin: auto;

    animation: 2s spin infinite;
  }

  .label {
    font-size: 1.1em;
  }

  .time {
    display: grid;
    grid-template-columns: 1fr auto;

    margin-top: 15px;
    color: var(--color-font-dark);

    .value {
      color: var(--color-font-main);
    }
  }
}
</style>
