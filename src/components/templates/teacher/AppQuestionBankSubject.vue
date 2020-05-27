<template>
  <div
    class="app-teacher-attached-subject"
    :class="{
      opened: isOpened,
    }"
    @click="$emit('click')"
  >
    <app-preloader :show="showPreloader"></app-preloader>

    <div class="header">
      <div class="info">
        <div class="name">{{subject.subject.name}}</div>
        <div class="tests-count">{TOPICS_COUNT} тем</div>
      </div>

      <div class="side-tools">
        <button
          class="create-test"
          @click="$emit('createTopic')"
        >
          Створити тему
        </button>

        <div class="expand-icon">
          <font-awesome-icon icon="chevron-down"></font-awesome-icon>
        </div>
      </div>
    </div>

    <app-fade-card :show="isOpened">
      <div class="content">
        <div
          v-if="!topics.length"
          class="no-items"
        >
          В цьому предметі ще немає тем. Але ви завжди можете створити першу
          <span
            class="create"
            @click="$emit('createTopic')"
          >Створити тему</span>
        </div>

        <div v-if="topics.length">
          <div class="label">В цьому предметі є {TOPICS_COUNT} тем</div>

          <div class="tests">
            <div
              v-for="({ id, name }, index) in topics"
              :key="index"
              class="test"
              @click="$router.push({
                name: 'topic',
                params: { id },
              })"
            >
              <div class="name">
                №{{id}} | {{name}}
              </div>
            </div>
          </div>
        </div>
      </div>
    </app-fade-card>
  </div>
</template>

<script>
import { mapActions } from 'vuex'

import AppFadeCard from '@/components/ui/AppFadeCard.vue'
import AppPreloader from '@/components/ui/AppPreloader.vue'

export default {
  data() {
    return {
      showPreloader: false,
      info: {},
    }
  },
  computed: {
    topics() {
      return this.info.topics || []
    },
  },
  methods: {
    ...mapActions({
      getSubject: 'subjects/getByID',
      setAlert: 'alert/set',
    }),
    async loadSubject() {
      const { subject: { subject } } = this

      try {
        this.showPreloader = true

        this.info = await this.getSubject(subject.id)
      } catch (e) {
        this.setAlert({
          title: 'Помилка',
          text: 'Не вдалось отримати список тем в предметі',
          show: true,
          isSuccess: false,
        })
      } finally {
        this.showPreloader = false
      }
    },
  },
  watch: {
    isOpened() {
      const { isOpened } = this

      if (isOpened) {
        this.loadSubject()
      }
    },
  },
  props: {
    isOpened: {
      type: Boolean,
      required: true,
    },
    subject: {
      type: Object,
      required: true,
    },
  },
  components: {
    AppFadeCard,
    AppPreloader,
  },
}
</script>

<style lang="less" scoped>
.app-teacher-attached-subject {
  border-radius: 10px;
  background: var(--color-bg-dark);
  box-shadow: 0px 0px 25px rgba(0, 0, 0, 0);
  color: var(--color-font-main);
  cursor: pointer;

  user-select: none;

  position: relative;
  padding-bottom: 3px;

  &:after {
    content: "";
    position: absolute;
    left: 0;
    right: 0;
    bottom: 0;
    margin: auto;

    width: 70px;
    height: 3px;
    background: var(--color-accent-green);

    border-radius: 10px;
  }

  .header {
    display: grid;
    grid-template-columns: 1fr auto;
    grid-gap: 20px;

    align-items: center;
    overflow: hidden;

    padding: 30px 20px 35px;
    border-bottom: 1px solid transparent;
    transition: all .3s;

    .info {
      .name {
        font-size: 1.2em;
        margin-bottom: 5px;
      }

      .tests-count {
        color: var(--color-font-dark);
      }
    }

    .side-tools {
      display: flex;
      height: auto;

      .expand-icon {
        display: flex;
        align-items: center;
        justify-content: center;

        margin-right: 0;

        width: 40px;
        height: 40px;

        font-size: 1.2em;
        color: var(--color-font-dark);
        cursor: pointer;
        user-select: none;

        transform: rotate(0deg);
        transition: all .3s;
      }

      .create-test {
        opacity: 0;
        visibility: hidden;

        padding: 10px 15px;
        color: var(--color-font-main);
        background: var(--color-accent-green);
        border-radius: 5px;
        border: 0;
        font-size: 1em;
        cursor: pointer;

        transition: all .3s;
        transform: scale(0.9);
      }
    }
  }

  .content {
    padding: 20px;

    .no-items {
      max-width: 60%;
      margin: 30px auto;
      color: var(--color-font-dark);
      text-align: center;
      font-size: 1em;
      line-height: 1.5em;

      .create {
        color: var(--color-accent-green);
        cursor: pointer;

        &:hover {
          text-decoration: underline;
        }
      }
    }

    .label {
      color: var(--color-font-dark);
      margin-bottom: 15px;
    }

    .tests {
      .test {
        cursor: pointer;
        user-select: none;
        margin-bottom: 5px;

        &:hover {
          text-decoration: underline;
        }
      }
    }
  }

  &.opened {
    cursor: default;
    box-shadow: 0px 0px 25px rgba(0, 0, 0, 0.07);

    .header {
      border-bottom-color: var(--color-bg-main);
      padding: 30px 20px 25px;

      .expand-icon {
        opacity: 0;
        visibility: hidden;
        margin-right: -40px;
        transform: rotate(180deg);
      }

      .create-test {
        transform: scale(1);
        margin-bottom: 0px;
        opacity: 1;
        visibility: visible;
      }
    }
  }
}
</style>
