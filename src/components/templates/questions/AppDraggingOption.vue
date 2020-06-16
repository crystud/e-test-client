<template>
  <div class="app-single-option">
    <div class="title">Послідовність</div>

    <div
      class="no-options"
      v-if="!options.length"
    >Елементів послідовності немає...</div>

    <div class="list">
      <div
        class="option"
        v-for="({ question, correct, image }, index) in options"
        :key="index"
      >
        <div class="option-title">№{{index+1}}</div>

        <input
          type="text"
          v-model="options[index].question"
          placeholder="Текст елемента послідовності"
          @keyup="emitCurrentState"
        >

        <div class="controls">
          <div>
            <label
              :for="`attach-image-${index}`"
              class="attach-image"
            >
              <input
                type="file"
                accept="image/png,image/jpg,image/gif"
                :id="`attach-image-${index}`"
                @change="({ target: { files: [ image ] } }) => {
                  setImage({ image, index })
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

            <div
              class="remove-image"
              @click="options[index].image = ''"
              v-if="image"
            >
              <font-awesome-icon icon="times"></font-awesome-icon>

              <span class="text">Вилучити зображення</span>
            </div>
          </div>

          <button
            class="remove"
            @click="
              options.splice(index, 1)
              emitCurrentState()
            "
          >
            <font-awesome-icon icon="trash"></font-awesome-icon>
            <span>Вилучити</span>
          </button>
        </div>
      </div>
    </div>

    <div class="add-option-form">
      <button
        title="Створити ще один елемент послідовності"
        @click="options.push({ question: '', image: '' })"
      >
        <span>Створити ще один елемент послідовності</span>
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
      options: [1, 2, 3].map(() => ({ question: '', image: '' })),
    }
  },
  methods: {
    ...mapActions({
      setAlert: 'alert/set',
    }),
    emitCurrentState() {
      const { options } = this

      let ready = true
      let error

      if (options.length <= 1) {
        ready = false
        error = 'Мінімум 2 варіанта відповіді'
      }

      const optionsAreNotEmpty = options.filter(({
        question,
        image,
      }) => image.name || question.length !== 0)

      if (optionsAreNotEmpty.length !== options.length) {
        ready = false
        error = 'Заповніть всі варіанти відповіді'
      }

      const state = {
        isReadyToBeCreated: { ready, error },
      }

      state.questions = options.map(({ question, image }) => ({
        question,
        image,
        correct: false,
      }))

      this.$emit('change', state)
    },
    setImage({ image, index }) {
      const reader = new FileReader()

      reader.onload = () => {
        const { result = '' } = reader

        const data = result.split('base64,')[1]

        this.options[index].image = {
          name: image.name,
          data,
        }

        this.emitCurrentState()
      }

      reader.onerror = () => {
        this.setAlert({
          title: 'Помилка',
          text: 'Не вдалось обробити фото',
          delay: 1500,
          show: true,
          isSuccess: false,
        })
      }

      reader.readAsDataURL(image)
    },
  },
  created() {
    this.emitCurrentState()
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

  .remove-image {
    padding: 15px;
    background: var(--color-bg-dark);
    border-radius: 10px;
    cursor: pointer;

    &:hover {
      .text {
        color: var(--color-font-main);
      }
    }

    svg {
      color: var(--color-accent-red);
    }

    .text {
      margin-left: 10px;
      color: var(--color-font-dark);
    }
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

        display: grid;
        grid-template-columns: 1fr auto;

        div {
          display: flex;
          align-items: center;
        }

        .attach-image {
          background: var(--color-bg-dark);
          color: var(--color-font-dark);
          padding: 15px;
          margin: 0 10px;
          border-radius: 10px;
          cursor: pointer;

          .icon {
            font-size: 1.4em;
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
