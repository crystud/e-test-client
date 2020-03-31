<template>
  <div class="app-tests">
    <h1>Тести</h1>

    <div class="list">
      <app-tests-item
        v-for="(i) in [1,2,3,4,5]"
        v-bind:key="i"
      ></app-tests-item>
    </div>
  </div>
</template>

<script>
import AppTestsItem from '@/components/templates/tests/AppTestsItem.vue'

export default {
  name: 'Tests',
  components: {
    AppTestsItem,
  },
}
</script>

<style lang="less" scoped>
@small: ~"screen and (max-width: 680px)";
@medium: ~"screen and (max-width: 1000px)";
@large: ~"screen and (min-width: 1250px)";

.app-tests {
  h1 {
    font-weight: 300;
    margin-bottom: 20px;
    color: var(--color-font-main);
  }

  .list {
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-gap: 30px;
  }

  @media @small {
    .list {
      grid-template-columns: 1fr;
    }
  }

  @media @large {
    .list {
      grid-template-columns: repeat(3, 1fr);
    }
  }
}
</style>
