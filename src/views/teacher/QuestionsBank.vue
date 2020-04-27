<template>
  <div class="app-questions-bank">
    <app-ask-college
      :show="!college.id"
      @selected="selectedCollege => college = selectedCollege"
    ></app-ask-college>

    <app-ask-subject
      :show="!subject.id && !!college.id"
      :collegeID="college.id"
      @selected="selectedSubject => subject = selectedSubject"
    ></app-ask-subject>

    <div>college: {{college}}</div>
    <div>subject: {{subject}}</div>
  </div>
</template>

<script>
import AppAskSubject from '@/components/templates/teacher/AppAskSubject.vue'
import AppAskCollege from '@/components/templates/admin/AppAskCollege.vue'

export default {
  components: {
    AppAskSubject,
    AppAskCollege,
  },
  data() {
    return {
      subject: {},
      college: {},
    }
  },
}
</script>

<style>

</style>
