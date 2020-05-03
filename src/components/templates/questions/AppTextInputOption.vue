<template>
  <div class="app-single-option">
    <div class="title">Відповідь: {{optionValue}}</div>

    <div class="add-option-form">
      <input
        type="text"
        placeholder="Текст варіанту відповіді..."
        v-model="optionValue"
        @change="emitCurrentState"
      >

      <div
        class="ignore-case"
        @click="ignoreCase = !ignoreCase"
      >
        Ігнорувати регістр:
        <span
          :class="{
            'ignore': ignoreCase,
          }"
        >{{ignoreCase ? 'Так' : 'Ні'}}</span>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  data() {
    return {
      optionValue: '',
      ignoreCase: true,
    }
  },
  methods: {
    ...mapActions({
      setAlert: 'alert/set',
    }),
    emitCurrentState() {
      const {
        optionValue: question,
        ignoreCase,
      } = this

      this.$emit('change', {
        questions: [{ question, correct: true }],
        ignoreCase,
      })
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

      return false
    },
  },
}
</script>

<style lang="less" scoped>
.app-single-option {
  .title {
    color: var(--color-font-dark);
  }

  .add-option-form {
    margin-top: 10px;

    input {
      width: 100%;
      box-shadow: 0px 0px 15px rgba(0, 0, 0, 0.3);

      padding: 15px;
      font-size: 1em;
      background: var(--color-bg-main);
      border: 0;
      border-radius: 5px;

      color: var(--color-font-main);

      &::placeholder {
        color: var(--color-font-dark);
      }
    }
  }

  .ignore-case {
    margin: 20px 0;
    font-size: 1.2em;
    user-select: none;
    cursor: pointer;

    color: var(--color-font-dark);

    span {
      color: var(--color-accent-red);

      &.ignore {
        color: var(--color-accent-green);
      }
    }
  }
}
</style>
