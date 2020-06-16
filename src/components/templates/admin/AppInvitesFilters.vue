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
      :checked="onlyOwn"
      @change="isSelected => {
        onlyOwn = isSelected
        emitCurrentState()
      }"
      label="Тільки створені мною"
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
      onlyOwn: false,
    }
  },
  methods: {
    emitCurrentState() {
      const { onlyUnused, onlyOwn } = this

      return this.$emit('updateState', {
        onlyUnused,
        onlyOwn,
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
