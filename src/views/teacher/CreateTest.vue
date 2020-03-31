<template>
  <div class="create-test">
    <app-test-information
      class="card paddings test-information"
    ></app-test-information>

    <app-question-info
      class="card paddings question-info"
    ></app-question-info>

    <div class="card save-section">
      <app-button
        appearance="neutral"
      >Скасувати зміни</app-button>

      <app-button
        appearance="neutral"
        class="save-btn"
      >Зберегти тест</app-button>
    </div>

    <app-questions-list
      class="card questions-list"
    ></app-questions-list>
  </div>
</template>

<script>
import AppButton from '@/components/ui/AppButton.vue'
import AppQuestionsList from '@/components/templates/teacher/AppQuestionsList.vue'
import AppTestInformation from '@/components/templates/teacher/AppTestInformation.vue'
import AppQuestionInfo from '@/components/templates/teacher/AppQuestionInfo.vue'

export default {
  components: {
    AppButton,
    AppQuestionsList,
    AppTestInformation,
    AppQuestionInfo,
  },
}
</script>

<style lang="less" scoped>
.create-test {
  min-height: 100%;

  display: grid;
  grid-template-areas:
    'test-info questions-list'
    'question-info questions-list'
    'save-section questions-list';

  grid-template-rows: auto auto 45px;
  grid-template-columns: 1fr 250px;
  grid-gap: 20px;

  .card {
    background: var(--color-bg-dark);
    border-radius: 10px;;

    &.paddings {
      padding: 25px;
    }
  }

  .test-information {
    grid-area: test-info;
  }

  .question-info {
    grid-area: question-info;
  }

  .save-section {
    grid-area: save-section;

    display: flex;
    justify-content: flex-end;
    align-items: flex-end;

    background: transparent;

    .save-btn {
      background: #2047C9;
      margin-left: 20px;
      color: #fff;
    }
  }

  .questions-list {
    grid-area: questions-list;
  }

  @media screen and (max-width: 1050px) {
    .save-section {
      display: grid;
      grid-template-columns: 1fr;
      grid-gap: 10px;

      button {
        padding: 20px;
        font-size: 1.1em;
        font-weight: 400;
      }

      .save-btn {
        margin: 0;
      }
    }
  }

  @media screen and (max-width: 650px) {
    grid-template-rows: auto;
    grid-template-columns: 1fr;
    grid-template-areas: 'questions-list' 'test-info' 'question-info' 'save-section';

    .questions-list {
      max-height: 300px;
    }
  }
}
</style>
