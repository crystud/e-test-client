<template>
  <div
    class="header"
    :class="{
      'minimized': isMinimized,
    }"
  >
    <button
      class="minimize-btn"
      @click="isMinimized = !isMinimized"
      v-if="showMinimize"
    >
      <font-awesome-icon
        icon="angle-down"
        class="icon"
      ></font-awesome-icon>
    </button>

    <div class="content">
      <div class="maximized" v-if="!isMinimized">
        <div class="title">Назва тесту</div>

        <div class="description">
          дуже дуже дуже довгий опис тесту, який повинен
          буде доволі довгим, щоб було видно як воно буде
          виглядати в реальній ситуації, коли вчитель
          тикне цілу книжку сюди, описуючи, що знаходиться
          в цьому тесті.
        </div>

        <div class="questions">25 запитань</div>

        <div
          v-if="showStart"
          class="start-btn"
        >
          <div class="btn-wrap">
            <span class="access-denied">Доступ до тесту закрито</span>

            <button
              @click="$emit('onStart')"
              class="submit-start"
            >
              <font-awesome-icon
                icon="play"
                class="icon"
              ></font-awesome-icon>
            </button>
          </div>
        </div>
      </div>

      <div class="minimized" v-if="isMinimized">
        <div class="title">Назва тесту</div>
        <div class="questions">25 запитань</div>
      </div>
    </div>

    <div class="line"></div>
  </div>
</template>

<script>
export default {
  name: 'AppTestHeader',
  props: {
    showStart: {
      type: Boolean,
      default: () => false,
    },
    showMinimize: {
      type: Boolean,
      default: () => false,
    },
  },
  data() {
    return {
      isMinimized: false,
    }
  },
}
</script>

<style lang="less" scoped>
.header {
  background: var(--color-bg-dark);
  color: var(--color-font-main);

  border-radius: 10px;
  padding: 30px;

  position: relative;

  .minimize-btn {
    font-size: 1.7em;

    position: absolute;
    top: 20px;
    right: 20px;

    width: 40px;
    height: 40px;
    border-radius: 50%;
    border: 0;

    background: transparent;
    color: var(--color-font-main);
    cursor: pointer;

    .icon {
      transform: rotate(180deg);
      transition: all .3s;
    }
  }

  .content {
    .title,
    .description,
    .questions {
      max-width: 70%;
      text-align: center;

      margin: 0 auto;
    }

    .title {
      font-size: 1.7em;
      font-weight: 400;

      margin-bottom: 10px;
    }

    .description {
      color: var(--color-font-dark);
      margin: 15px auto;
      font-size: 17px;
      font-weight: 300;
    }

    .start-btn {
      display: flex;
      justify-content: flex-end;

      .submit-start {
        font-size: 1em;
        border: 0;

        width: 40px;
        height: 40px;

        cursor: pointer;

        background: linear-gradient(45deg, #22D667, #25D6C2);
        border-radius: 50%;

        margin-left: 20px;
        color: #fff;
      }

      .access-denied {
        color: var(--color-accent-red);
      }
    }
  }


  .line {
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;

    margin: auto;

    width: 20%;
    height: 5px;

    background: #1ED6BA;
    border-radius: 10px;
  }

  &.minimized {
    padding: 20px;

    .line {
      width: 3px;
      height: 80%;
      max-height: 40px;

      top: 0;
      bottom :0;
      left: 0;
      right: auto;
    }

    .minimize-btn {
      .icon {
        transform: rotate(0deg);
      }
    }

    .content,
    .title,
    .questions {
      text-align: left;
      margin: 0;
    }

    .questions {
      color: var(--color-font-dark);
      font-weight: 300;
    }

    .content {
      .minimized {
        display: flex;
        flex-direction: column;
      }
    }
  }
}
</style>
