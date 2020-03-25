<template>
  <div
    class="app-select"
    :class="{
      'side-border': sideBorder,
      'is-okay': value,
      'is-bad': !value,
    }"
    @mouseleave="isFocused = false"
  >
    <div class="body">
      <div
        @click="focus"
        class="focus-area"
      >
        <div
          v-if="label && value && !isFocused && !hidePlaceholder"
          class="label"
        >{{label}}</div>

        <div
          v-if="value && !isFocused"
          class="value"
          :title="value.label"
        >{{sliceText(value.label)}}</div>
      </div>

      <div
        v-show="!value || isFocused"
        class="filter"
      >
        <input
          type="text"
          :placeholder="label || 'Фільтр...'"
          ref="filter"
          v-model="filter"
          @click="isFocused = true"
          @blur="isFocused = false"
        />
      </div>

      <div class="icon">
        <font-awesome-icon
          icon="angle-down"
        ></font-awesome-icon>
      </div>
    </div>

    <div
      class="options"
      :class="{
        'hidden': !isFocused,
      }"
    >
      <div
        class="option highlight"
        @click="reset"
      >
        Не обрано
      </div>

      <div
        v-for="({ value: optionValue, label }, i) in values"
        v-bind:key="i"
        class="option"
        v-show="filterItem(label)"
        @click="value = { value: optionValue, label }; isFocused = false"
      >
        {{label}}
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'AppSelect',
  data() {
    return {
      value: null,
      filter: '',
      isFocused: false,
    }
  },
  methods: {
    sliceText(words) {
      const sliceLength = 25

      if (words.length < sliceLength) return words

      return `${words.substring(0, sliceLength)}...`
    },
    reset() {
      this.filter = ''
      this.value = null
      this.isFocused = false
    },
    focus() {
      this.$refs.filter.focus()
      this.isFocused = true
    },
    filterItem(label) {
      const { filter } = this

      if (!filter) return true

      const labelWords = label.split(' ') || []
      const filterWords = filter.split(' ') || []

      for (let i = 0; i < labelWords.length; i += 1) {
        for (let j = 0; j < filterWords.length; j += 1) {
          const filterWord = filterWords[j].toLowerCase()
          const labelWord = labelWords[i].substring(0, filterWord.length).toLowerCase()

          if (!filterWord) break

          if (labelWord === filterWord) {
            return true
          }
        }
      }

      return false
    },
  },
  props: {
    values: {
      type: Array,
      required: true,
      default: () => [],
    },
    label: {
      type: String,
      required: false,
      default: () => null,
    },
    sideBorder: {
      type: Boolean,
      required: false,
      default: () => false,
    },
    hidePlaceholder: {
      type: Boolean,
      required: false,
      default: () => false,
    },
  },
}
</script>

<style lang="less" scoped>
.app-select {
  width: 100%;

  padding: 10px;
  position: relative;

  &.is-okay::before {
    background: #22D582;
  }

  &.is-bad::before {
    background: #D52222;
  }

  &.side-border::before {
    content: "";

    display: block;

    width: 2px;
    height: 40%;

    max-height: 60px;

    border-radius: 10px;

    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    margin: auto;
  }

  .focus-area {
    cursor: pointer;
  }

  .body {
    display: flex;
    flex-direction: column;
    justify-content: center;

    z-index: 0;

    height: 100%;

    position: relative;

    .icon {
      position: absolute;
      top: 0;
      right: 0;
      bottom: 0;
      margin: auto;

      display: flex;
      align-items: center;
    }

    .label {
      color: var(--color-font-dark);
      font-size: 0.9em;
      font-weight: 100;

      margin-bottom: 5px;
    }

    .value {
      color: var(--color-font-main);
      font-weight: 100;
    }

    .filter {
      input {
        width: 100%;

        font-size: 1em;
        font-family: 'Exo 2', 'Lato', Tahoma, Arial;

        border: 0;
        background: transparent;
        color: var(--color-font-main);

        &::placeholder {
          color: var(--color-font-dark);
          font-weight: 100;
        }
      }
    }
  }

  .options {
    max-height: 250px;

    position: absolute;
    top: 100%;
    left: 0;

    z-index: 125;

    background: var(--color-bg-dark);
    border: 1px solid var(--color-bg-light);
    border-radius: 0;

    width: 100%;

    overflow: auto;

    border-top: 2px solid var(--color-bg-main);

    visibility: visible;
    opacity: 1;

    transition: all .1s;

    .option {
      padding: 15px;
      border-bottom: 1px solid var(--color-bg-main);
      cursor: pointer;

      color: var(--color-font-main);

      &.highlight {
        color: var(--color-font-dark);
        padding: 10px 15px;

        font-weight: 100;
      }

      &:hover {
        background: linear-gradient(45deg, #1BC388, #0C6993);
        color: #fff;
      }
    }

    &.hidden {
      visibility: hidden;
      opacity: 0;
    }
  }
}
</style>
