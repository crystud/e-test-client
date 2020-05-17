<template>
  <div
    class="app-create-question"
    v-if="show"
  >
    <app-preloader :show="showPreloader"></app-preloader>

    <div class="content">
      <div class="question-info">
        <app-data-list
          v-if="false"
          :data="[
            ['Питання для теми', topic.name],
            ['Предмет', topic.subject.name],
          ]"
        ></app-data-list>

        <div class="question-type-selector">
          <div class="label">Тип запитання</div>

          <div class="list">
            <div
              v-for="({ label, value }, index) in types"
              v-bind:key="index"
              @click="type = value"
              :class="{
                selected: type === value,
              }"
            >{{label}}</div>
          </div>
        </div>

        <app-input
          appearance="secondary"
          class="app-input"
          placeholder="Текст запитання..."
          @change="newTitle => title = newTitle"
        ></app-input>
      </div>

      <div class="answers-list">
        <app-single-option
          v-if="type === 'single_choice'"
          @change="options => optionsState = options"
        ></app-single-option>

        <app-multi-option
          v-if="type === 'multy_choice'"
          @change="options => optionsState = options"
        ></app-multi-option>

        <app-text-input-option
          v-if="type === 'text_input'"
          @change="options => optionsState = options"
        ></app-text-input-option>

        <app-dragging-option
          v-if="type === 'numbering'"
          @change="options => optionsState = options"
        ></app-dragging-option>
      </div>
    </div>

    <div class="btns">
      <button
        class="leave"
        @click="$emit('close')"
      >Скасувати</button>

      <button
        class="create"
        @click="create"
      >Створити запитання</button>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

import AppPreloader from '@/components/ui/AppPreloader.vue'
import AppDataList from '@/components/ui/AppDataList.vue'
import AppInput from '@/components/ui/AppInput.vue'

import AppSingleOption from '@/components/templates/questions/AppSingleOption.vue'
import AppMultiOption from '@/components/templates/questions/AppMultiOption.vue'
import AppTextInputOption from '@/components/templates/questions/AppTextInputOption.vue'
import AppDraggingOption from '@/components/templates/questions/AppDraggingOption.vue'

export default {
  components: {
    AppPreloader,
    AppDataList,
    AppInput,
    AppSingleOption,
    AppMultiOption,
    AppTextInputOption,
    AppDraggingOption,
  },
  data() {
    return {
      showPreloader: false,
      type: null,
      title: '',
      optionsState: {
        questions: [],
      },
      types: [
        { label: 'Простий вибір', value: 'single_choice' },
        { label: 'Множинний вибір', value: 'multy_choice' },
        { label: 'Коротка відповідь', value: 'text_input' },
        { label: 'Послідовність', value: 'numbering' },
      ],
    }
  },
  computed: {
    ...mapGetters({
      alert: 'alert/alert',
    }),
  },
  methods: {
    ...mapActions({
      setAlert: 'alert/set',
      createQuestion: 'questions/create',
      addAnswers: 'questions/addAnswers',
    }),
    async create() {
      const {
        optionsState: {
          questions,
          ignoreCase = false,
        },
        topic: { id: topic },
        title: ask,
        type,
      } = this

      if (type === 'multy_choice' && questions.length <= 1) {
        return this.setAlert({
          title: 'Варіантів відповідей недостатньо',
          text: 'Створіть ще варіанти відповідей',
          isSuccess: false,
          delay: 1500,
          show: true,
        })
      }

      if (!questions.length) {
        return this.setAlert({
          title: 'Варіантів відповідей немає',
          text: 'Створіть варіанти відповідей',
          isSuccess: false,
          delay: 1500,
          show: true,
        })
      }

      try {
        this.showPreloader = true

        const { id: test } = await this.createQuestion({
          topic,
          ask,
          ignoreCase,
          type,
        }) || {}

        await this.addAnswers({
          questions,
          test,
        })

        this.setAlert({
          title: 'Запитання створено',
          isSuccess: true,
          show: true,
          delay: 1000,
        })

        setTimeout(() => this.$emit('created'))
      } catch (e) {
        return this.setAlert({
          title: 'Помилка',
          text: 'Створити запитання не вдалось',
          delay: 1500,
          show: true,
          isSuccess: false,
        })
      } finally {
        this.showPreloader = false
      }

      return false
    },
  },
  props: {
    topic: {
      type: Object,
      required: true,
      default: () => {},
    },
    show: {
      type: Boolean,
      required: true,
      default: () => false,
    },
  },
}
</script>

<style lang="less" scoped>
.app-create-question {
  .title,
  .content {
    padding: 0 20px;
  }

  .content {
    display: grid;

    .app-input {
      padding: 5px;
      font-size: 1.1em;
    }

    .app-input,
    .app-select {
      background: var(--color-bg-main);
      margin-bottom: 20px;
      border-radius: 10px;
    }
  }

  .question-type-selector {
    margin-bottom: 25px;

    .label {
      font-size: 1.2em;
      font-weight: 100;
      color: var(--color-font-dark);
      margin-bottom: 15px;
    }

    .list {
      div {
        cursor: pointer;
        display: inline-block;
        margin-right: 10px;
        padding: 15px 20px;
        border-radius: 7px;
        background: var(--color-bg-main);
        color: var(--color-font-main);

        transition: none;

        &.selected {
          background: var(--color-accent-green);
          box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.3);
          color: #fff;
        }
      }
    }
  }

  .btns {
    display: grid;
    grid-template-columns: 1fr 1fr;

    border-top: 1px solid var(--color-bg-main);

    margin-top: 40px;

    button {
      background: transparent;
      font-size: 1em;
      border: 0;
      padding: 20px;
      cursor: pointer;
      transition: none;

      &:hover {
        background: var(--color-bg-main);
      }

      &.leave {
        color: var(--color-accent-red);
      }

      &.create {
        color: var(--color-accent-green);
      }
    }
  }
}
</style>
