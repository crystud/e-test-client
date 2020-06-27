<template>
  <div class="app-invites-filters">
    <app-checkbox
      :checked="filtersList.onlyUnused"
      @change="isSelected => {
        filtersList.onlyUnused = isSelected
        emitCurrentState()
      }"
      label="Тільки невикористані"
      class="app-checkbox"
    ></app-checkbox>

    <app-checkbox
      :checked="filtersList.onlyIsNotOutstanding"
      @change="isSelected => {
        filtersList.onlyIsNotOutstanding = isSelected
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
      filtersList: {},
    }
  },
  methods: {
    emitCurrentState() {
      const { filtersList } = this

      return this.$emit('updateState', filtersList)
    },
    setFilters() {
      const { filters } = this

      this.filtersList = filters
    },
  },
  watch: {
    filters() {
      this.setFilters()
    },
  },
  created() {
    this.setFilters()
  },
  props: {
    filters: {
      type: Object,
      required: true,
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
