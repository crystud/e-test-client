<template>
  <div class="app-single-option">
    <div class="title">Варіанти відповідей</div>

    <div
      class="no-options"
      v-if="!options.length"
    >Варіантів відповіді немає...</div>

    <div class="list">
      <div
        class="option"
        v-for="(option, index) in options"
        :key="index"
      >
        <div class="text">{{option}}</div>

        <button
          class="is-right-switch"
          @click="
            toggleRightOption(index)
            emitCurrentState()
          "
        >
          <div
            class="wrong"
            v-if="!rightOptions.includes(index)"
          >Невірна відповідь</div>

          <div
            class="right"
            v-if="rightOptions.includes(index)"
          >Вірна відповідь</div>
        </button>

        <button
          class="remove"
          @click="
            options.splice(index, 1)
            emitCurrentState()
          "
        >
          <font-awesome-icon icon="times"></font-awesome-icon>
        </button>
      </div>
    </div>

    <div class="add-option-form">
      <input
        type="text"
        placeholder="Текст варіанту відповіді..."
        v-model="optionValue"
        v-on:keyup="({ keyCode }) => (keyCode === 13 ? addOption() : null)"
      >

      <button
        title="Додати варіант відповіді"
        @click="
          addOption()
          emitCurrentState()
        "
      >
        <font-awesome-icon icon="plus"></font-awesome-icon>
      </button>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  data() {
    return {
      options: [],
      optionValue: '',
      rightOptions: [],
    }
  },
  methods: {
    ...mapActions({
      setAlert: 'alert/set',
    }),
    toggleRightOption(optionIndex) {
      const location = this.rightOptions.indexOf(optionIndex)

      if (location !== -1) {
        this.rightOptions.splice(location, 1)
      } else if (this.rightOptions.length <= this.options.length - 2) {
        this.rightOptions.push(optionIndex)
      }
    },
    emitCurrentState() {
      const { options, rightOptions } = this

      const state = {}

      state.questions = options.map((question, index) => ({
        question,
        correct: rightOptions.includes(index),
      }))

      this.$emit('change', state)
    },
    addOption() {
      const { optionValue } = this

      if (!optionValue) {
        return this.setAlert({
          title: 'Заповніть варіант відповіді',
          text: '',
          isSuccess: false,
          show: true,
          delay: 1000,
        })
      }

      if (this.options.includes(optionValue)) {
        return this.setAlert({
          title: 'Такий варіант відповіді вже існує',
          text: '',
          isSuccess: false,
          show: true,
          delay: 1000,
        })
      }

      this.options.push(optionValue)

      this.optionValue = ''

      return false
    },
  },
}
</script>

<style lang="less" scoped>
.app-single-option {
  .no-options {
    text-align: center;
    margin: 30px;
    color: var(--color-font-dark);
  }

  .title {
    color: var(--color-font-dark);
  }

  .list {
    margin: 20px 0;

    .option {
      background: var(--color-bg-main);
      border-radius: 5px;
      box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.4);
      margin-bottom: 10px;

      display: grid;
      grid-template-columns: 1fr auto 60px;

      align-items: center;

      .text {
        color: var(--color-font-main);
        padding: 15px;
      }

      button {
        padding: 15px;
        height: 100%;
        font-size: 1em;
        border: 0;
        border-left: 1px solid var(--color-bg-light);
        cursor: pointer;
        background: transparent;
      }

      .is-right-switch {
        .right {
          color: var(--color-accent-green);
        }

        .wrong {
          color: var(--color-accent-red);
        }
      }

      .remove {
        color: var(--color-accent-red);
      }
    }
  }

  .add-option-form {
    display: grid;
    grid-template-columns: 1fr 60px;

    overflow: hidden;
    border-radius: 10px;
    box-shadow: 0px 0px 15px rgba(0, 0, 0, 0.3);

    input, button {
      padding: 15px;
      font-size: 1em;
      background: var(--color-bg-main);
      border: 0;
    }

    input {
      color: var(--color-font-main);

      &::placeholder {
        color: var(--color-font-dark);
      }
    }

    button {
      border-left: 1px solid var(--color-bg-light);
      text-align: center;
      cursor: pointer;

      color: var(--color-font-main);

      &:hover {
        background: var(--color-bg-dark);
      }
    }
  }
}
</style>
