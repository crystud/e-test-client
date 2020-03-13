<template>
  <app-user-card class="subjects-info">
    <div class="title">Українська мова (за професiйним спрямуванням)</div>

    <div class="tests">
      <app-tests-item
        v-for="i in 7"
        v-bind:key="i"
        class="test"
      ></app-tests-item>
    </div>
  </app-user-card>
</template>

<script>
import AppUserCard from './AppUserCard.vue'
import AppTestsItem from '../tests/AppTestsItem.vue'

export default {
  name: 'AppStudentSubjects',
  components: {
    AppTestsItem,
    AppUserCard,
  },
}
</script>

<style lang="less" scoped>
.subjects-info {
  margin-bottom: 20px;

  .title {
    font-size: 1.5em;
    font-weight: 100;
  }

  .tests {
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-gap: 20px;

    margin-top: 20px;

    .test {
      background: var(--color-bg-main);
    }

    @media screen and (max-width: 680px) {
      grid-template-columns: 1fr;
    }
  }
}
</style>
