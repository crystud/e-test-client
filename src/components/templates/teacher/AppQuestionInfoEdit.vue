<template>
  <div class="app-question-info-edit">
    <h2>Запитання №{{index+1}}</h2>

    <div class="question-text">{{question.question}}</div>

    <app-simple-choice-question
      v-if="question.type === 'SIMPLE_CHOICE'"
      :defaultOptions="question.answers.map(({ correct, answerText: question, image }) => {
        return {
          correct,
          question,
          image: {
            name: image ? 'Назва файлу невідома' : null,
            image,
          },
        }
      })"
      :defaultRightOption="rightOptionIndex"
    ></app-simple-choice-question>

    <div e-else>{{question}}</div>
  </div>
</template>

<script>
import AppSimpleChoiceQuestion from '@/components/templates/questions/AppSingleOption.vue'

export default {
  computed: {
    question() {
      return this.questions[this.index] || {}
    },
    rightOptionIndex() {
      const { answers } = this.question

      console.log(answers)

      let rightOption = null

      for (let i = 0; i < answers.length; i += 1) {
        if (answers[i].correct) {
          rightOption = i
        }
      }

      return rightOption
    },
  },
  props: {
    index: {
      type: Number,
      required: true,
    },
    questions: {
      type: Array,
      required: true,
    },
  },
  components: {
    AppSimpleChoiceQuestion,
  },
}
</script>

<style lang="less" scoped>
.app-question-info-edit {
  padding: 25px;
  background: var(--color-bg-dark);
  border-radius: 7px;

  h2 {
    margin-bottom: 5px;
  }

  .question-text {
    color: var(--color-font-dark);
    margin-bottom: 20px;
  }
}
</style>
