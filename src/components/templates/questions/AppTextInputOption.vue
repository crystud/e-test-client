<template>
  <div class="app-single-option">
    <div class="title">Відповідь: {{answer}}</div>

    <div class="add-option-form">
      <app-input
        type="text"
        placeholder="Текст короткої відповіді..."
        appearance="secondary"
        class="app-input"
        @change="value => {
          answer = value
          emitCurrentState()
        }"
      ></app-input>
    </div>
  </div>
</template>

<script>
import AppInput from '@/components/ui/AppInput.vue'

export default {
  components: {
    AppInput,
  },
  data() {
    return {
      answer: '',
    }
  },
  methods: {
    emitCurrentState() {
      const {
        answer: question,
      } = this

      let ready = true
      let error

      if (question.length <= 0) {
        ready = false
        error = 'Довжина відповіді мін. 1 символ'
      }

      this.$emit('change', {
        questions: [{
          question,
          correct: true,
        }],
        isReadyToBeCreated: { ready, error },
      })
    },
  },
  created() {
    this.emitCurrentState()
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

    display: grid;
    grid-template-columns: 1fr auto;
    align-items: center;
    grid-gap: 10px;

    .app-input {
      background: var(--color-bg-main);
      padding: 5px;
      font-size: 1.1em;
    }
  }
}
</style>
