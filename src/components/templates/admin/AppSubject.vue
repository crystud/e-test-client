<template>
  <app-card class="subject">
    <div class="title">{{name}}</div>

    <app-data-list
      :data="[
        ['Вчителів', teachers],
      ]"
      class="data-list"
    ></app-data-list>
  </app-card>
</template>

<script>
import AppCard from '../../ui/AppCard.vue'
import AppDataList from '../../ui/AppDataList.vue'

export default {
  components: {
    AppCard,
    AppDataList,
  },
  props: {
    name: {
      type: String,
      required: true,
      default: () => '',
    },
    teachers: {
      type: Number,
      required: true,
      default: () => 0,
    },
  },
}
</script>

<style lang="less" scoped>
.subject {
  padding: 30px;
  font-weight: 300;

  position: relative;

  &::before {
    content: "";

    display: block;
    width: 4px;
    height: 20%;
    border-radius: 10px;

    position: absolute;
    bottom: 0;
    left: 0;
    top: 0;

    margin: auto;

    background: #1ED6BA;
  }

  .title {
    font-size: 1.3em;
    color: var(--color-font-main);
  }

  .data-list {
    margin: 20px 0 0;
  }
}
</style>
