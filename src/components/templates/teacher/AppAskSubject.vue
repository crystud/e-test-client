<template>
  <app-modal-window :show="show">
    <div class="title">Оберіть предмет</div>

    <div class="content">
      subjects list...
    </div>
  </app-modal-window>
</template>

<script>
import { mapActions } from 'vuex'

import AppModalWindow from '@/components/ui/AppModalWindow.vue'

export default {
  components: {
    AppModalWindow,
  },
  props: {
    show: {
      type: Boolean,
      required: true,
      default: () => false,
    },
    collegeID: {
      type: Number,
      required: true,
      default: () => 0,
    },
  },
  methods: {
    ...mapActions({
      getTeacherSubjects: 'studies/getAll',
    }),
  },
  created() {
    this.getTeacherSubjects(this.collegeID)
  },
}
</script>

<style>

</style>
