<template>
  <div
    class="app-input"
    :class="[
      appearance,
      (newValue ? 'is-okay' : 'is-bad'),
    ]"
  >
    <input
      :type="type"
      class="main-input"
      ref="appInput"
      :value="value"
      :placeholder="placeholder"
      v-on:blur="focused = false"
      v-on:focus="focused = true"
      v-on:change="$emit('change', $event.target.value)"
      v-on:keyup="$emit('change', $event.target.value)"
    />
  </div>
</template>

<script>
export default {
  name: 'AppInput',
  props: {
    placeholder: {
      required: false,
      default: () => '',
    },
    autofocus: {
      type: Boolean,
      required: false,
      default: () => false,
    },
    appearance: {
      required: false,
      default: () => 'border-bottom-highlight',
    },
    type: {
      required: false,
      default: () => 'text',
    },
    value: {
      required: false,
      default: () => '',
    },
  },
  data() {
    return {
      focused: false,
      newValue: '',
    }
  },
  methods: {
    focus() {
      this.$refs.appInput.focus()
    },
  },
}
</script>

<style lang="less" scoped>
.app-input {
  position: relative;
  border-radius: 15px;

  .main-input {
    font: 1em 'Lato', Tahoma, Arial;

    &::placeholder {
      font-weight: 300;
      color: var(--color-font-dark);
    }
  }

  &.bottom-border-highlight {
    .main-input {
      width: 100%;
      display: inline-block;

      padding: 20px 10px;
      cursor: text;

      border: 0;
      border-bottom: 2px solid #2A3138;
      background: transparent;

      color: var(--color-font-main);
    }
  }

  &.primary {
    background: var(--color-bg-main);

    .main-input {
      padding: 20px 10px;
      cursor: text;
    }

    .main-input {
      width: 100%;
      display: inline-block;

      border: 1px solid transparent;
      border-radius: 15px;
      overflow: hidden;

      background: rgba(0, 0, 0, 0);

      color: var(--color-font-main);

      transition: all .3s;
    }

    &.is-okay {
      .main-input {
        border-color: #22D582;
      }
    }

    &.is-bad {
      .main-input {
        border-color: #D52222;
      }
    }
  }

  // # SECONDARY

  &.secondary {
    background: var(--color-bg-dark);
    border-radius: 10px;
    position: relative;

    &::before {
      content: "";

      position: absolute;
      top: 0;
      left: 0;
      bottom: 0;

      margin: auto;

      height: 35%;
      width: 2px;
      max-height: 60px;

      background: #1ED6BA;
      border-radius: 10px;
    }

    .main-input {
      width: 100%;
      display: inline-block;

      padding: 15px;
      cursor: text;

      border: 1px solid transparent;
      border-radius: 5px;

      background: transparent;

      color: var(--color-font-main);

      transition: all .3s;
    }
  }
}
</style>
