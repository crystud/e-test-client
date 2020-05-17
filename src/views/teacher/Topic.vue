<template>
  <div class="app-topic">
    <app-preloader :show="showPreloader"></app-preloader>

    <div v-if="topic.id">
      <div class="header">
        <div class="title">
          <div class="main">
            <span v-if="showCreateQuestion">Створення запитання для теми "{{topic.name}}"</span>

            <span v-else>Список запитань до теми "{{topic.name}}"</span>
          </div>
        </div>

        <app-button
          v-show="!showCreateQuestion"
          appearance="primary"
          @click="showCreateQuestion = true"
        >Створити запитання</app-button>
      </div>

      <div class="content">
        <div
          class="no-questions"
          v-if="!questions.length && !showCreateQuestion"
        >
          <div class="no-results">В даній темі покищо немає запитань...</div>

          <div
            class="create-question"
            @click="showCreateQuestion = true"
          >Створити запитання</div>
        </div>

        <app-create-question
          :show="showCreateQuestion"
          :topic="topic"
          @close="showCreateQuestion = false"
          @created="
            loadTopic()
            showCreateQuestion = false
          "
        ></app-create-question>

        <div
          class="table"
          v-if="questions.length && !showCreateQuestion"
        >
          <div class="row header-row">
            <div class="col">Запитання</div>
            <div class="col">Тип</div>
          </div>

          <div
            class="row"
            v-for="(task, index) in questions"
            :key="index"
          >
            <div class="col title">{{task.ask}}</div>
            <div class="col type">{{taskTypes[task.type] || '-'}}</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex'

import AppButton from '@/components/ui/AppButton.vue'
import AppPreloader from '@/components/ui/AppPreloader.vue'

import AppCreateQuestion from '@/components/templates/teacher/AppCreateQuestion.vue'

export default {
  components: {
    AppButton,
    AppPreloader,
    AppCreateQuestion,
  },
  methods: {
    ...mapActions({
      getTopic: 'topics/getByID',
      setAlert: 'alert/set',
    }),
    async loadTopic() {
      const { $route: { params: { id } } } = this

      if (!id) {
        return this.setAlert({
          title: 'Помилка',
          text: 'Не вдалось оприділити ID теми... Спробуйте пізніше',
          delay: 1500,
          show: true,
          isSuccess: false,
        })
      }

      this.showPreloader = true

      const topic = await this.getTopic(id) || {}

      this.topic = topic
      this.questions = topic.tasks

      this.showPreloader = false

      return false
    },
  },
  data() {
    return {
      topic: {},
      questions: [],
      showPreloader: false,
      showCreateQuestion: false,
      taskTypes: {
        single_choice: 'Простий вибір',
        multy_choice: 'Декілька варіантів',
        text_input: 'Коротка відповідь',
        numbering: 'Визначити послідовність',
      },
    }
  },
  async created() {
    await this.loadTopic()
  },
}
</script>

<style lang="less" scoped>
.app-topic {
  .darkBlock {
    box-shadow: 0px 0px 15px rgba(0, 0, 0, 0.3);
    background: var(--color-bg-dark);
    color: var(--color-font-main);

    padding: 30px;
    border-radius: 10px;
  }

  .header {
    display: grid;
    grid-template-columns: auto auto;

    justify-content: space-between;
    align-items: center;
    grid-gap: 20px;

    .darkBlock();

    .title {
      .main {
        font-size: 1.4em;

        margin-bottom: 5px;
      }

      .verificated {
        color: var(--color-accent-red);

        &.confirmed {
          color: var(--color-accent-green);
        }
      }

      .creator {
        margin-top: 10px;

        .label {
          color: var(--color-font-dark);
        }
      }
    }
  }

  .content {
    margin-top: 20px;

    .darkBlock();

    .no-questions {
      text-align: center;
      margin: 50px;

      .no-results {
        color: var(--color-font-dark);
        font-size: 1.3em;
      }

      .create-question {
        margin-top: 20px;
        font-size: 1.2em;
        color: var(--color-accent-green);
        cursor: pointer;
        user-select: none;

        &:hover {
          text-decoration: underline;
        }
      }
    }

    .table {
      .row {
        display: grid;
        grid-template-columns: 1fr 200px;

        margin-bottom: 15px;

        color: var(--color-font-main);

        &.header-row {
          color: var(--color-font-dark);
          border-bottom: 1px solid var(--color-bg-main);
          padding-bottom: 20px;
        }
      }
    }
  }

  @media screen and (max-width: 650px) {
    .header {
      grid-template-columns: 1fr;
    }

    .table .row {
      grid-template-columns: 1fr !important;

      .title {
        font-size: 1.2em;
      }

      .type {
        margin-top: 10px;
        color: var(--color-font-dark);
      }
    }
  }
}
</style>
