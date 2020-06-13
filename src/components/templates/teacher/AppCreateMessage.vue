<template>
  <div class="app-create-message">
    <app-preloader :show="showPreloader"></app-preloader>

    <app-ask-group
      @selected="groupsSelected"
      @close="showSelectGroups = false"
      :show="showSelectGroups"
      :multiple="true"
      :alreadySelected="receivers"
    ></app-ask-group>

    <div class="header">
      Створення повідомлення
    </div>

    <div class="content">
      <div class="message-enter">
        <textarea
          v-model="message"
          placeholder="Ваше повідомлення"
        ></textarea>

        <div
          class="bottom-line"
          :class="{
            display: message.length > 0,
          }"
        ></div>
      </div>

      <div
        class="select-groups"
        @click="showSelectGroups = true"
        v-if="!receivers.length"
      >Обрати групи-отримувачі</div>

      <div
        class="receivers"
        v-if="receivers.length"
      >
        <div class="list">
          <div
            v-for="(receiver, index) in receivers"
            :key="receiver.id"
            class="receiver"
          >
            <div class="name">{{receiver.name}}</div>

            <div class="remove">
              <font-awesome-icon
                icon="times-circle"
                @click="receivers.splice(index, 1)"
              ></font-awesome-icon>
            </div>
          </div>
        </div>

        <div
          class="change"
          @click="showSelectGroups = true"
        >Змінити...</div>
      </div>

      <div class="btns">
        <app-button
          appearance="neutral"
          class="close"
          @click="$emit('close')"
        >Скасувати</app-button>

        <app-button
          appearance="neutral"
          class="send-message"
          :class="{
            'is-active': receivers.length && message,
          }"
          @click="send"
        >Надіслати повідомлення</app-button>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex'

import AppAskGroup from '@/components/templates/teacher/AppAskGroup.vue'
import AppButton from '@/components/ui/AppButton.vue'
import AppPreloader from '@/components/ui/AppPreloader.vue'

export default {
  methods: {
    ...mapActions({
      sendMessage: 'messages/send',
      setAlert: 'alert/set',
    }),
    async send() {
      const {
        message: messageText,
        receivers,
      } = this

      const groups = receivers.map(({ id }) => id)

      try {
        this.showPreloader = true

        await this.sendMessage({ groups, messageText })

        this.setAlert({
          title: 'Оголошення надіслано',
          show: true,
          isSuccess: true,
          delay: 1000,
        })

        this.$emit('sent')

        this.receivers = []
        this.message = ''
      } catch (e) {
        const text = e?.response.data.message

        this.setAlert({
          title: 'Помилка',
          text,
          delay: 2000,
          show: true,
          isSuccess: false,
        })
      } finally {
        this.showPreloader = false
      }
    },
    groupsSelected(groups) {
      if (!groups.length) return

      this.showSelectGroups = false

      this.receivers = groups
    },
  },
  data() {
    return {
      message: '',
      receivers: [],
      showSelectGroups: false,
      showPreloader: false,
    }
  },
  components: {
    AppPreloader,
    AppAskGroup,
    AppButton,
  },
}
</script>

<style lang="less" scoped>
.app-create-message {
  background: var(--color-bg-dark);
  border-radius: 10px;

  .header, .content {
    padding: 20px;
  }

  .header {
    border-bottom: 1px solid var(--color-bg-main);
    font-size: 1.2em;
    color: var(--color-font-dark);
  }

  .content {
    .label {
      color: var(--color-font-dark);
      margin-bottom: 5px;
    }

    .message-enter {
      position: relative;

      textarea {
        padding: 20px;
        width: 100%;
        min-height: 100px;

        color: var(--color-font-main);
        font-size: 1em;

        background: var(--color-bg-main);
        border-radius: 10px;
        border: 0;

        &::placeholder {
          color: var(--color-font-dark);
        }
      }

      .bottom-line {
        content: "";

        display: block;
        width: 0%;
        height: 3px;

        background: var(--color-accent-green);
        border-radius: 10px;

        position: absolute;
        left: 0;
        right: 0;
        bottom: 5px;
        margin: auto;

        transition: all .3s;
      }

      .display {
        width: 100px;
      }

      textarea:focus ~ .bottom-line {
        .display();
      }
    }
  }

  .receivers {
    margin: 15px 0;
    user-select: none;

    .list, .change {
      display: inline-block;
    }

    .list {
      .receiver {
        display: inline-block;
        margin: 0 10px 10px 0;
        background: var(--color-bg-main);
        border-radius: 5px;
        padding: 10px 15px;

        .name, .remove {
          display: inline-block;
        }

        .name {
          color: var(--color-accent-green);
        }

        .remove {
          color: var(--color-accent-red);
          cursor: pointer;
          margin-left: 10px;
        }
      }
    }

    .change {
      color: var(--color-accent-orange);
      cursor: pointer;
      margin-left: 20px;
    }
  }

  .select-groups {
    padding: 15px 25px;
    border-radius: 5px;
    margin: 20px 0 40px;

    display: inline-block;

    cursor: pointer;

    background: var(--color-bg-main);
    color: var(--color-font-dark);

    &:hover {
      color: var(--color-accent-green);
    }
  }

  .btns {
    display: grid;
    grid-template-columns: auto auto;
    grid-gap: 10px;
    justify-content: flex-end;

    .close, .send-message {
      background: var(--color-bg-main);
    }

    .close {
      color: var(--color-accent-red);
    }

    .send-message {
      color: var(--color-font-dark);
      cursor: not-allowed;

      transform: scale(1);

      &.is-active {
        transform: inherit;
        cursor: pointer;
        color: var(--color-accent-green);
      }
    }
  }
}
</style>
