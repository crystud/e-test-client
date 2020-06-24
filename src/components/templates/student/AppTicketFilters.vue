<template>
  <div class="app-invites-filters">
    <app-checkbox
      :checked="onlyUnused"
      @change="isSelected => {
        onlyUnused = isSelected
        emitCurrentState()
      }"
      label="Тільки невикористані"
      class="app-checkbox"
    ></app-checkbox>

    <app-checkbox
      :checked="onlyIsNotOutstanding"
      @change="isSelected => {
        onlyIsNotOutstanding = isSelected
        emitCurrentState()
      }"
      label="Тільки непрострочені"
      class="app-checkbox"
    ></app-checkbox>
  </div>
</template>

<script>
import AppCheckbox from '@/components/ui/AppCheckbox.vue'

export default {
  data() {
    return {
      onlyUnused: false,
      onlyIsNotOutstanding: false,
    }
  },
  methods: {
    emitCurrentState() {
      const { onlyUnused, onlyIsNotOutstanding } = this

      return this.$emit('updateState', {
        onlyUnused,
        onlyIsNotOutstanding,
      })
    },
  },
  components: {
    AppCheckbox,
  },
}
</script>

<style lang="less" scoped>
.app-invites-filters {
  .app-checkbox {
    display: inline-block;
    margin-right: 15px;
  }
}
</style>
