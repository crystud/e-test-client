<template>
  <div class="app-test-develop">
    <app-test-ask-level
      :testID="parseInt($route.params.id)"
      :show="!editingLevel"
      @selected="level => editingLevel = level"
    ></app-test-ask-level>

    Ви редагуєте: {{editingLevel}}
  </div>
</template>

<script>
import AppTestAskLevel from '@/components/templates/tests/AppTestAskLevel.vue'

export default {
  components: {
    AppTestAskLevel,
  },
  data() {
    return {
      editingLevel: null,
    }
  },
}
</script>

<style>

</style>
