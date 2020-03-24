<template>
  <div
    class="app-input"
    :class="[
      appearance,
      (value ? 'is-okay' : 'is-bad'),
    ]"
  >
    <input
      :type="type"
      class="main-input"
      ref="appInput"
      v-model="value"
      v-on:blur="focused = false"
      v-on:focus="focused = true"
      v-on:change="$emit('change', $event.target.value)"
      v-on:keyup="$emit('change', $event.target.value)"
    />

    <div
      v-if="placeholder"
      @click="focus"
      class="placeholder"
      :class="{
        'hidden': focused || value,
      }"
    >
      {{placeholder}}
    </div>
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
    appearance: {
      required: false,
      default: () => 'border-bottom-highlight',
    },
    type: {
      required: false,
      default: () => 'text',
    },
  },
  data() {
    return {
      focused: false,
      value: '',
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

  .main-input {
    font: 1em 'Exo 2', 'Lato', Tahoma, Arial;
  }

  &.bottom-border-highlight {
    .main-input,
    .placeholder {
      padding: 20px 10px;
      cursor: text;
    }

    .main-input {
      width: 100%;
      display: inline-block;

      border: 0;
      border-bottom: 2px solid #2A3138;
      background: rgba(0, 0, 0, 0);

      color: var(--color-font-dark);
    }

    .placeholder {
      position: absolute;
      top: 0;
      left: 0;

      display: flex;
      align-items: center;

      width: 100%;
      height: 100%;

      font-weight: 100;

      color: var(--color-font-dark);

      &.hidden {
        padding-top: 0;
        top: -15px;
        font-size: .9em;

        opacity: .8;
      }

      transition: all .22s;
    }
  }

  &.primary {
    background: var(--color-bg-main);

    .main-input,
    .placeholder {
      padding: 30px 10px 10px;
      cursor: text;
    }

    .main-input {
      width: 100%;
      display: inline-block;

      border: 1px solid transparent;
      border-radius: 5px;

      background: rgba(0, 0, 0, 0);

      color: var(--color-font-main);

      transition: all .3s;
    }

    .placeholder {
      position: absolute;
      top: -10px;
      left: 0;

      width: 100%;
      height: 100%;

      font-weight: 100;

      color: var(--color-font-dark);

      &.hidden {
        padding-top: 0;
        top: 10px;
        font-size: .9em;
      }

      transition: all .22s;
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
    .main-input,
    .placeholder {
      padding: 30px 10px 10px;
      cursor: text;
    }

    .main-input {
      width: 100%;
      display: inline-block;

      border: 1px solid transparent;
      border-radius: 5px;

      background: rgba(0, 0, 0, 0);

      color: var(--color-font-main);

      transition: all .3s;
    }

    .placeholder {
      position: absolute;
      top: -10px;
      left: 0;

      width: 100%;
      height: 100%;

      font-weight: 100;

      color: var(--color-font-dark);

      &.hidden {
        padding-top: 0;
        top: 10px;
        font-size: .9em;
      }

      transition: all .22s;
    }
  }
}
</style>
