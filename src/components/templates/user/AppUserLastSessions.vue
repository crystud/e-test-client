<template>
  <div class="app-user-last-sessions">
    <div class="row header">
      <div class="location">Місцезнаходження</div>
      <div class="time">Час</div>
      <div class="ip">IP-адреса</div>
    </div>

    <div
      v-for="([location, time, ip], index) in list"
      v-bind:key="index"
      class="row"
    >
      <div class="location">{{location}}</div>
      <div class="time">{{time}}</div>
      <div class="ip">{{ip}}</div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      list: [
        ['Kolomyia, UA', '26.03.2020 16:45', '195.95.147.51'],
        ['Spas, UA', '24.03.2020 13:27', '78.25.40.1'],
        ['Gorodenka, UA', '23.02.2020 12:53', '91.230.25.111'],
      ],
    }
  },
}
</script>

<style lang="less" scoped>
.app-user-last-sessions {
  width: 100%;

  .row {
    display: grid;
    grid-template-columns: 1fr 200px 150px;
    padding: 15px 20px;

    &.header {
      color: var(--color-font-dark);
      border-bottom: 1px solid var(--color-bg-main);
    }

    @media screen and (max-width: 600px) {
      grid-template-columns: 1fr;

      .location {
        font-size: 1.3em;
        margin-bottom: 5px;
      }

      .time {
        color: var(--color-font-dark);
        margin-bottom: 5px;
      }

      .ip {
        color: var(--color-accent-orange);
      }
    }
  }
}
</style>
