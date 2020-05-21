<template>
  <div class="app-single-option">
    <div class="title">Відповідь: {{optionValue}}</div>

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

      <label
        for="attach-image"
        class="attach-image"
      >
        <input
          type="file"
          accept="image/png,image/jpg,image/gif"
          id="attach-image"
          @change="({ target: { files: [ image ] } }) => {
            setImage(image)
            emitCurrentState(image)
          }"
        >

        <span
          class="icon"
          v-if="!image || !image.name"
        >
          <font-awesome-icon icon="image"></font-awesome-icon>
        </span>

        <span
          class="filename"
          v-if="image && image.name"
        >
          {{image.name}}
        </span>
      </label>
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
      image: {},
    }
  },
  methods: {
    emitCurrentState() {
      const { answer: question } = this

      let ready = true
      let error

      if (question.length <= 0) {
        ready = false
        error = 'Довжина відповіді мін. 1 символ'
      }

      this.$emit('change', {
        questions: [{ question, correct: true }],
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

    .attach-image {
      color: var(--color-font-dark);
      padding: 15px;
      border-radius: 10px;
      cursor: pointer;

      .icon {
        font-size: 1.3em;
      }

      .filename {
        color: var(--color-accent-green);
      }

      &:hover {
        color: var(--color-accent-green);
      }

      input {
        display: none;
      }
    }
  }
}
</style>
