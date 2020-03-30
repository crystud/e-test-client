<template>
  <div
    class="app-verify-candidate"
    @click="go"
  >
    <div class="name">Коломийський політехнічний коледж</div>

    <app-data-list
      :data="[
        ['Директор', 'Ляшеник Андрій Васильович'],
        ['Заявку подано', '26 червня 2020 о 17:45'],
        ['Файлів прикріплено', '3'],
      ]"
      class="list"
    ></app-data-list>
  </div>
</template>

<script>
import AppDataList from '../../ui/AppDataList.vue'

export default {
  components: {
    AppDataList,
  },
  methods: {
    go() {
      this.$router.push({
        name: 'verifyRequest',
        params: {
          requestID: 1,
        },
      })
    },
  },
}
</script>

<style lang="less" scoped>
.app-verify-candidate {
  padding: 25px;
  background: var(--color-bg-dark);
  border-radius: 10px;

  cursor: pointer;

  position: relative;

  &::before {
    content: "";

    display: block;

    height: 2px;
    width: 30%;
    max-width: 60px;

    margin: auto;

    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;

    background: #1ED6BA;
  }

  .name {
    font-size: 1.3em;
  }

  .list {
    margin: 15px 0 0;
  }
}
</style>
