<template>
  <div
    class="app-student-messages"
    v-if="!initiate"
  >
    <app-preloader :show="showPreloader"></app-preloader>

    <div class="card header create-message">
      <span class="text">
        Оголошення для {{$route.name === 'studentOverview' ? 'студента' : 'вас'}}
      </span>
    </div>

    <div
      v-if="!messages || messages.length === 0"
      class="no-message"
    >
      Повідомлень немає
    </div>

    <div
      class="card message"
      v-for="({
        messageText,
        sender,
        time,
        groups,
        createAt,
      }, index) in messages"
      v-bind:key="index"
    >
      <div class="sender">
        <div class="name">{{sender.lastName}} {{sender.firstName}} {{sender.patronymic}}</div>
        <div class="sendtime">Надіслано {{$moment(createAt).format('Do MMMM YYYY, hh:mm')}}</div>
      </div>

      <div class="content">
        {{messageText}}
      </div>

      <div class="receivers">
        <div class="label">Отримувачі:</div>

        <div class="list">
          <div
            v-for="receiver in groups"
            :key="receiver.id"
            class="receiver"
          >{{receiver.name}}</div>
        </div>
      </div>
    </div>

    <div
      v-if="lastFetchedCount >= limit"
      class="show-more"
      @click="fetchMessages"
    >
      <span class="text">Показати ще</span>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'

import AppPreloader from '@/components/ui/AppPreloader.vue'

export default {
  computed: {
    ...mapGetters({
      lastFetchedCount: 'messages/lastFetchedCount',
      messages: 'messages/messages',
      limit: 'messages/limit',
    }),
  },
  methods: {
    ...mapActions({
      loadMoreMessages: 'messages/getByStudentID',
      setAlert: 'alert/set',
    }),
    async fetchMessages() {
      const {
        initiate,
        student: { id: studentID },
        $route: { params },
      } = this

      try {
        this.showPreloader = true

        await this.loadMoreMessages({
          initiate,
          studentID: studentID || params.id,
        })

        this.initiate = false
      } catch (e) {
        const text = e?.response.data.message || 'Не вдалось отримати список повідомлень'

        this.setAlert({
          title: 'Помилка',
          text,
          show: true,
          delay: 2000,
          isSuccess: false,
        })
      } finally {
        this.showPreloader = false
      }
    },
    refreshMessages() {
      this.initiate = true

      this.fetchMessages()
    },
  },
  watch: {
    student() {
      this.refreshMessages()
    },
    studentID() {
      this.refreshMessages()
    },
  },
  data() {
    return {
      showPreloader: false,
      initiate: true,
    }
  },
  created() {
    this.fetchMessages()
  },
  components: {
    AppPreloader,
  },
  props: {
    student: {
      type: Object,
      required: true,
    },
    studentID: {
      type: Number,
      required: true,
    },
  },
}
</script>

<style lang="less" scoped>
.app-student-messages {
  color: var(--color-font-main);

  .header {
    font-weight: 400;
    font-size: 1.2em;
  }

  .header,
  .sender,
  .content {
    padding: 18px;
  }

  .no-message {
    font-size: 1.2em;
    color: var(--color-font-dark);

    text-align: center;
    margin: 30px 0;
  }

  .receivers {
    padding: 20px;
    border-top: 1px solid var(--color-bg-main);

    .label, .list {
      display: inline-block;
    }

    .label {
      color: var(--color-font-dark);
      margin-right: 10px;
    }

    .list {
      .receiver {
        display: inline-block;
        margin: 10px 10px 0 0;
        color: var(--color-accent-green);
        padding: 5px 10px;
        background: var(--color-bg-main);
        border-radius: 5px;
      }
    }
  }

  .card {
    box-shadow: 0px 0px 20px rgba(0, 0, 0, .2);
    background: var(--color-bg-dark);
    border-radius: 10px;

    margin-bottom: 15px;

    &.message {
      position: relative;

      &::before {
        content: "";

        position: absolute;
        bottom: 0;
        left: 0;
        right: 0;
        margin: auto;

        width: 20%;
        max-width: 60px;
        height: 3px;

        background: var(--color-accent-green);
        border-radius: 10px;
      }
    }

    .sender {
      border-bottom: 1px solid var(--color-bg-main);

      .name {
        font-size: 1.15em;
        margin-bottom: 5px;
      }

      .sendtime {
        color: var(--color-font-dark);
        font-size: .9em;
      }
    }
  }

  .show-more {
    background: var(--color-bg-dark);
    border-radius: 10px;
    padding: 15px;
    text-align: center;
    cursor: pointer;

    position: relative;

    &::after {
      content: "";
      position: absolute;
      bottom: 0;
      left: 0;

      width: 100%;
      height: 0%;

      background: var(--color-accent-green);
      border-radius: 10px;

      z-index: 100;
      transition: all .3s;
    }

    .text {
      position: relative;
      z-index: 102;
      color: var(--color-accent-green);

      transition: all .3s;
    }

    &:hover {
      .text {
        color: var(--color-font-main);
      }

      &::after {
        height: 100%;
      }
    }
  }
}
</style>
