<template>
  <div
    class="app-input"
    :class="appearance"
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

      color: #fff;

      font-size: 1em;
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

      opacity: .35;

      color: #fff;

      &.hidden {
        padding-top: 0;
        top: -15px;
        font-size: .9em;

        opacity: .15;
      }

      transition: all .22s;
    }
  }
}
</style>
