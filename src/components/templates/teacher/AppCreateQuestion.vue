<template>
  <div class="app-create-question">
    <app-preloader :show="showPreloader"></app-preloader>

    <app-modal-window
      :show="show && !alert.show"
      :noPaddings="true"
    >
      <div class="title">Створення запитання для теми</div>

      <div
        class="content"
        v-if="show"
      >
        <app-data-list
          :data="[
            ['Тема', topic.name],
            ['Створив', `${topic.creator.firstName} ${topic.creator.lastName}`],
          ]"
        ></app-data-list>

        <app-input
          appearance="secondary"
          class="app-input"
          placeholder="Запитання..."
          @change="newTitle => title = newTitle"
        ></app-input>

        <app-text-area
          placeholder="Опис запитання (не обов'язково)"
          class="app-text-area"
          @change="value => description = value"
        ></app-text-area>

        <app-select
          :values="[
            { label: '1 варіант відповіді', value: 'single_choice' },
            { label: 'Декілька варіантів', value: 'multy_choice' },
            { label: 'Ввести значення', value: 'text_input' },
            { label: 'Встановити відповідність', value: 'numbering' },
          ]"
          label="Тип запитання"
          class="app-select"
          :sideBorder="true"
          @change="({ value }) => type = value"
        ></app-select>

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
    </app-modal-window>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

import AppPreloader from '@/components/ui/AppPreloader.vue'
import AppModalWindow from '@/components/ui/AppModalWindow.vue'
import AppDataList from '@/components/ui/AppDataList.vue'
import AppInput from '@/components/ui/AppInput.vue'
import AppSelect from '@/components/ui/AppSelect.vue'
import AppTextArea from '@/components/ui/AppTextArea.vue'

import AppSingleOption from '@/components/templates/questions/AppSingleOption.vue'
import AppMultiOption from '@/components/templates/questions/AppMultiOption.vue'
import AppTextInputOption from '@/components/templates/questions/AppTextInputOption.vue'
import AppDraggingOption from '@/components/templates/questions/AppDraggingOption.vue'

export default {
  components: {
    AppPreloader,
    AppModalWindow,
    AppDataList,
    AppInput,
    AppSelect,
    AppTextArea,
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
      description: '',
      optionsState: {
        questions: [],
      },
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
        description,
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
          description,
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
    width: 100vw;
    max-width: 600px;
    padding: 20px;
  }

  .title {
    font-size: 1.2em;
    text-align: center;
    border-bottom: 1px solid var(--color-bg-main);
  }

  .content {
    overflow-y: auto;
    max-height: 60vh;

    .app-input,
    .app-select,
    .app-text-area {
      background: var(--color-bg-main);
      margin-bottom: 20px;
      border-radius: 10px;
    }
  }

  .btns {
    display: grid;
    grid-template-columns: 1fr 1fr;

    border-top: 1px solid var(--color-bg-main);

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
