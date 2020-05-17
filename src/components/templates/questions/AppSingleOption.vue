<template>
  <div class="app-single-option">
    <div class="title">Варіанти відповіді</div>

    <div
      class="no-options"
      v-if="!options.length"
    >Варіантів відповіді немає...</div>

    <div class="list">
      <div
        class="option"
        v-for="({ question, correct }, index) in options"
        :key="index"
      >
        <div class="option-title">Варіант відповіді №{{index+1}}</div>

        <input
          type="text"
          v-model="options[index].question"
          placeholder="Текст варіанта відповіді"
        >

        <div class="controls">
          <button
            class="is-right-switch"
            :class="{
              wrong: rightOption !== index,
              right: rightOption === index,
            }"
            @click="
              rightOption = index
              emitCurrentState()
            "
          >
            <span v-if="rightOption !== index">Невірна відповідь</span>
            <span v-else>Вірна відповідь</span>
          </button>

          <button
            class="remove"
            @click="
              options.splice(index, 1)
              emitCurrentState()
            "
          >
            <font-awesome-icon icon="times"></font-awesome-icon>
            <span>Вилучити варіант відповіді</span>
          </button>
        </div>
      </div>
    </div>

    <div class="add-option-form">
      <button
        title="Додати варіант відповіді"
        @click="options.push({ question: '' })"
      >
        <span>Створити ще один варіант відповіді</span>
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
      options: [
        { question: '' },
        { question: '' },
        { question: '' },
        { question: '' },
      ],
      optionValue: '',
      rightOption: null,
    }
  },
  methods: {
    ...mapActions({
      setAlert: 'alert/set',
    }),
    emitCurrentState() {
      const { options, rightOption } = this

      const state = {}

      state.questions = options.map((question, index) => ({
        question,
        correct: index === rightOption,
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
      border: 1px solid rgba(0, 0, 0, 0.05);
      border-radius: 10px;
      margin-bottom: 20px;

      overflow: hidden;

      .option-title {
        padding: 20px;
        font-size: 1.2em;

      }

      .controls {
        padding: 20px;

        display: flex;
        justify-content: space-between;
      }

      input {
        color: var(--color-font-main);
        background: transparent;
        border: 0;
        border-bottom: 1px solid var(--color-bg-light);
        height: 100%;
        width: 100%;
        padding: 15px;
        font-size: 1em;

        &::placeholder {
          color: var(--color-font-dark);
        }
      }

      button {
        padding: 15px 20px;
        height: 100%;
        font-size: 1em;
        border: 0;
        border-radius: 5px;
        cursor: pointer;
        background: var(--color-bg-dark);
      }

      .is-right-switch {
        color: #fff;

        &.right {
          background: var(--color-accent-green);
        }

        &.wrong {
          background: var(--color-accent-red);
        }
      }

      .remove {
        color: var(--color-accent-red);

        span {
          margin-left: 15px;
        }
      }
    }
  }

  .add-option-form {
    button {
      width: 100%;
      padding: 15px;
      border-radius: 10px;
      font-size: 1em;
      background: var(--color-bg-main);
      border: 0;
      text-align: center;
      cursor: pointer;

      color: var(--color-font-dark);

      &:hover {
        color: var(--color-font-main);
      }

      span {
        margin-right: 10px;
      }
    }
  }
}
</style>
