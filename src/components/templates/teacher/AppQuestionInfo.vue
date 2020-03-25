<template>
  <div class="app-question-info">
    <h1>Запитання №1</h1>

    <div class="basic">
      <app-input
        appearance="secondary"
        placeholder="Запитання"
        class="context"
      ></app-input>

      <app-select
        :values="[
          { label: 'Один варіант', value: 1 },
          { label: 'Декілька варіантів', value: 2 },
          { label: 'З\'єднати', value: 3 },
        ]"
        label="Тип запитання"
        :hidePlaceholder="true"
        :sideBorder="true"
        class="type"
      ></app-select>

      <div class="file-select">
        <input
          type="file"
          id="attach"
        >

        <label for="attach">Прикріпити фото</label>
      </div>
    </div>

    <div class="options">
      <div class="subtitle">Варіанти відповідей</div>

      <div class="list">
        <div
          v-for="([question, isRight], index) in questions"
          v-bind:key="index"
          class="question"
          :class="{
            'is-right': isRight,
            'is-wrong': !isRight,
          }"
        >
          <div class="subtext">{{isRight ? 'Правильний' : 'Неправильний'}}</div>

          <div class="text">
            <input
              type="text"
              :value="question"
              placeholder="Варіант відповіді..."
            >

            <button>
              <font-awesome-icon
                icon="lightbulb"
                class="is-right-switch"
              ></font-awesome-icon>
            </button>

            <button>
              <font-awesome-icon
                icon="trash"
                class="trash"
              ></font-awesome-icon>
            </button>
          </div>
        </div>

        <div class="question create">
          <font-awesome-icon icon="plus"></font-awesome-icon>

          <span>Додати варіант відповіді</span>
        </div>
      </div>
    </div>

    <app-button
      appearance="secondary"
      class="delete-question"
    >
      <font-awesome-icon icon="trash"></font-awesome-icon>

      <span>Видалити запитання</span>
    </app-button>
  </div>
</template>

<script>
import AppInput from '../../ui/AppInput.vue'
import AppSelect from '../../ui/AppSelect.vue'
import AppButton from '../../ui/AppButton.vue'

export default {
  components: {
    AppInput,
    AppSelect,
    AppButton,
  },
  data() {
    return {
      questions: [
        ['some question 1', false],
        ['some question 2', false],
        ['some question 3', true],
        ['some question 4', false],
      ],
    }
  },
}
</script>

<style lang="less" scoped>
.app-question-info {
  color: var(--color-font-main);

  .sideBorder {
    position: relative;

    &::before {
      content: "";

      position: absolute;
      top: 0;
      left: 0;
      bottom: 0;

      margin: auto;

      width: 2px;
      height: 40%;
      max-height: 40px;

      background: #22D582;
      border-radius: 10px;

      transition: all .3s;
    }
  }

  h1 {
    font-size: 1.15em;
    font-weight: 400;
  }

  .basic {
    display: grid;
    grid-template-columns: 1fr 200px 200px;
    grid-gap: 10px;

    margin-top: 15px;

    .type,
    .context {
      background: var(--color-bg-main);
      border-radius: 10px;
    }

    .file-select {
      background: var(--color-bg-main);
      border-radius: 10px;

      cursor: pointer;

      &:hover::before {
        height: 50%;
      }

      input {
        display: none;
      }

      label {
        display: flex;
        align-items: center;

        padding: 15px;
        width: 100%;
        height: 100%;

        cursor: pointer;
      }

      .sideBorder();
    }
  }

  .options {
    margin-top: 20px;

    .subtitle {
      color: var(--color-font-dark);
    }

    .list {
      display: grid;
      grid-template-columns: 1fr 1fr;
      grid-gap: 10px;

      margin-top: 10px;

      .question {
        background: var(--color-bg-main);
        border-radius: 10px;
        padding: 20px;

        display: grid;

        &.create {
          display: flex;
          cursor: pointer;
          color: var(--color-accent-green);
          font-weight: 400;

          span {
            margin-left: 10px;
          }
        }

        .subtext {
          font-size: .9em;
          color: var(--color-font-dark);
          margin-bottom: 5px;
        }

        .text {
          font-size: 1.05em;

          display: grid;
          grid-template-columns: 1fr 30px 30px;
          align-items: center;

          input, button {
            padding: 0;
            background: transparent;
            border: 0;
            font-size: 1em;
            font-weight: 400;
          }

          input {
            color: var(--color-font-main);

            &::placeholder {
              color: var(--color-font-dark);
            }
          }

          button {
            cursor: pointer;
          }

          .trash {
            color: #E01616;
          }

          @media screen and (max-width: 450px) {
            input {
              grid-area: input;
              margin-bottom: 20px;
            }

            grid-template-columns: 1fr 1fr;
            grid-template-areas: 'input input' '. .';
          }
        }

        .sideBorder();

        &::before {
          transition: all .3s;
        }

        .is-right-switch {
          color: var(--color-accent-green);
        }

        &.is-wrong {
          .is-right-switch {
            color: var(--color-font-dark);
          }

          &::before {
            background: #E01616;
          }
        }
      }
    }
  }

  .delete-question {
    margin-top: 30px;
    padding: 15px 20px;

    span {
      display: inline-block;
      margin-left: 10px;
    }
  }

  @media screen and (max-width: 1200px) {
    .basic {
      grid-template-columns: 1fr;
      grid-gap: 20px;
    }

    .options {
      .list {
        grid-template-columns: 1fr;
      }
    }
  }
}
</style>
