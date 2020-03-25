<template>
  <div class="app-student-messages">
    <div class="card header">Повідомлення для вас</div>

    <div
      v-if="!messages || messages.length === 0"
      class="no-message"
    >
      Повідомлень немає
    </div>

    <div
      class="card message"
      v-for="({ message, sender, time }, index) in messages"
      v-bind:key="index"
    >
      <div class="sender">
        <div class="name">{{message}}</div>
        <div class="sendtime">Надіслано {{time}}</div>
      </div>

      <div class="content">
        {{sender}}
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    messages: {
      type: Array,
      required: true,
      default: () => [],
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
    padding: 15px;
  }

  .no-message {
    font-size: 1.2em;
    color: var(--color-font-dark);

    text-align: center;
    margin: 30px 0;
  }

  .card {
    background: var(--color-bg-dark);
    border-radius: 10px;

    margin-bottom: 10px;

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

        background: #1ED6BA;
        border-radius: 10px;
      }
    }

    .sender {
      border-bottom: 1px solid var(--color-bg-main);

      .name {
        font-size: 1.3em;
      }

      .sendtime {
        color: var(--color-font-dark);
        font-size: .9em;
      }
    }
  }
}
</style>
