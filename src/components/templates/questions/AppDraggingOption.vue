<template>
  <div class="app-single-option">
    <div class="title">Логічна послідовність</div>

    <div
      class="no-options"
      v-if="!chain.length"
    >Послідовність не вказана...</div>

    <div class="list">
      <div
        class="option"
        v-for="(option, index) in chain"
        :key="index"
      >
        <div class="number">{{index + 1}}</div>

        <div class="text">{{option}}</div>

        <button
          class="remove"
          @click="
            chain.splice(index, 1)
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
        placeholder="Текст елементу послідовності..."
        v-model="optionValue"
        v-on:keyup="({ keyCode }) => (keyCode === 13 ? addOption() : null)"
      >

      <button
        title="Додати елемент в послідовність"
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
      chain: [],
      optionValue: '',
    }
  },
  methods: {
    ...mapActions({
      setAlert: 'alert/set',
    }),
    emitCurrentState() {
      const { chain } = this

      const state = {}

      state.questions = chain.map((question, position) => ({
        question,
        position,
        correct: false,
      }))

      this.$emit('change', state)
    },
    addOption() {
      const { optionValue } = this

      if (!optionValue) {
        return this.setAlert({
          title: 'Заповніть елемент послідовності',
          text: '',
          isSuccess: false,
          show: true,
          delay: 1000,
        })
      }

      if (this.chain.includes(optionValue)) {
        return this.setAlert({
          title: 'Такий елемент вже існує',
          text: '',
          isSuccess: false,
          show: true,
          delay: 1000,
        })
      }

      this.chain.push(optionValue)
      this.emitCurrentState()

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
      grid-template-columns: 40px 1fr auto;

      align-items: center;

      .number {
        color: var(--color-font-main);
        border-right: 1px solid var(--color-bg-light);
        height: 100%;

        display: flex;
        align-items: center;
        justify-content: center;

        font-size: 1.4em;
      }

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
    border-radius: 5px;
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
