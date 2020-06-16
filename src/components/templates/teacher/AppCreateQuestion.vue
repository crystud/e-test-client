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

        <div class="test-info">
          <app-input
            appearance="secondary"
            class="app-input"
            placeholder="Текст запитання..."
            @change="newTitle => title = newTitle"
          ></app-input>

          <label
            class="attach-image"
            for="attachImage"
          >
            <input
              type="file"
              accept="image/jpg,image/png,image/gif,image/jpeg"
              id="attachImage"
              @change="setAttachedImage"
            >

            <font-awesome-icon
              icon="image"
              v-if="!attachedFile.name"
            ></font-awesome-icon>

            <div
              class="attached-filename"
              v-if="attachedFile.name"
            >
              {{attachedFile.name}}
            </div>
          </label>

          <div
            class="remove-image"
            @click="attachedFile = {}"
            v-if="attachedFile.name"
          >
            <font-awesome-icon icon="times"></font-awesome-icon>
          </div>
        </div>
      </div>

      <div class="answers-list">
        <app-single-option
          v-if="type === 'SIMPLE_CHOICE'"
          @change="options => optionsState = options"
        ></app-single-option>

        <app-multi-option
          v-if="type === 'MULTIPLE_CHOICE'"
          @change="options => optionsState = options"
        ></app-multi-option>

        <app-text-input-option
          v-if="type === 'SHORT_ANSWER'"
          @change="options => optionsState = options"
        ></app-text-input-option>

        <app-dragging-option
          v-if="type === 'NUMERICAL'"
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
      attachedFile: {},
      types: [
        { label: 'Простий вибір', value: 'SIMPLE_CHOICE' },
        { label: 'Множинний вибір', value: 'MULTIPLE_CHOICE' },
        { label: 'Коротка відповідь', value: 'SHORT_ANSWER' },
        { label: 'Послідовність', value: 'NUMERICAL' },
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
    setAttachedImage({ target: { files: [image] } }) {
      const reader = new FileReader()

      reader.onload = () => {
        const { result } = reader

        const data = result.split('base64,')[1]

        this.attachedFile = {
          name: image.name,
          data,
        }
      }

      reader.onerror = () => {
        this.setAlert({
          title: 'Помилка',
          text: 'Не вдалось обробити фото',
          show: true,
          isSuccess: false,
        })
      }

      reader.readAsDataURL(image)
    },
    async create() {
      const {
        optionsState: {
          questions,
          isReadyToBeCreated: {
            ready,
            error,
          } = {},
        },
        topic: { id: topic },
        title: question,
        type,
        attachedFile: { data: image = '' },
      } = this

      if (!type) {
        return this.setAlert({
          title: 'Оберіть тип, та задайте варіанти відповіді',
          show: true,
          delay: 1500,
          isSuccess: false,
        })
      }

      if (!question) {
        return this.setAlert({
          title: 'Вкажіть текст запитання',
          show: true,
          delay: 1500,
          isSuccess: false,
        })
      }

      if (!ready) {
        return this.setAlert({
          title: 'Помилка',
          text: error,
          show: true,
          delay: 1500,
          isSuccess: false,
        })
      }

      if (type === 'MULTIPLE_CHOICE' && questions.length <= 1) {
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

        const payload = {
          topic,
          question,
          type,
        }

        if (image) payload.image = image

        const { id: test } = await this.createQuestion(payload) || {}

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
        const text = e?.response.data.message || 'Створити запитання не вдалось'

        return this.setAlert({
          title: 'Помилка',
          text,
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
      border-radius: 10px;
    }
  }

  .remove-image {
    padding: 15px;
    background: var(--color-bg-main);
    border-radius: 10px;
    cursor: pointer;
    color: var(--color-accent-red);
  }

  .test-info {
    display: grid;
    grid-template-columns: 1fr auto auto;
    grid-gap: 10px;
    align-items: center;

    margin: 20px 0 30px;

    .attach-image {
      padding: 20px;
      border-radius: 10px;
      color: var(--color-font-dark);
      height: 100%;
      cursor: pointer;

      svg {
        font-size: 1.3em;
      }

      &:hover,
      .attached-filename {
        color: var(--color-accent-green);
      }

      input {
        display: none;
      }
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
