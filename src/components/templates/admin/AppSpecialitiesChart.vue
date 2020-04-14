<template>
  <div class="app-specialities-chart">
    <div class="title">Заповненість по спеціальностям</div>

    <div class="list">
      <div class="header row">
        <div>Заповненість</div>
        <div>Спеціальність</div>
        <div>Студентів</div>
        <div>Денна</div>
        <div>Заочна</div>
        <div>% від усіх</div>
      </div>

      <div
        class="row"
        v-for="({ daytime, parttime, name }, index) in list"
        v-bind:key="index"
      >
        <div>
          <div class="filling-bar">
            <div
              :style="{
                'width': getPercentage(daytime + parttime) + '%',
              }"
            ></div>
          </div>
        </div>
        <div>{{name}}</div>
        <div>{{daytime + parttime}}</div>
        <div>{{daytime}}</div>
        <div>{{parttime}}</div>
        <div>{{ Math.round(getPercentage(daytime + parttime)) }}%</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      list: [
        { name: 'Автоматизація', daytime: 53, parttime: 41 },
        { name: 'Бухгалтери', daytime: 24, parttime: 12 },
        { name: 'Маркетинг', daytime: 63, parttime: 53 },
        { name: 'Економісти', daytime: 43, parttime: 23 },
        { name: 'Модельєри', daytime: 12, parttime: 52 },
        { name: 'Програмісти', daytime: 152, parttime: 64 },
        { name: 'Механіки', daytime: 73, parttime: 42 },
      ],
    }
  },
  methods: {
    getPercentage(studentsCount) {
      const { list } = this

      let total = 0

      list.forEach(({ parttime, daytime }) => {
        total += parttime + daytime
      })

      return (studentsCount / total) * 100
    },
  },
}
</script>

<style lang="less" scoped>
.app-specialities-chart {
  background: var(--color-bg-dark);
  color: var(--color-font-main);

  padding: 30px;
  border-radius: 10px;
  font-size: 1.1em;

  .title {
    font-size: 1.5em;
  }

  .list {
    margin-top: 25px;

    .row {
      &.header {
        margin-bottom: 20px;
        color: var(--color-font-dark);
      }

      display: grid;
      grid-template-columns: 1fr 150px 100px 100px 100px 100px;
      grid-gap: 20px;
      align-items: center;

      margin-bottom: 15px;

      .filling-bar {
        width: 100%;
        height: 3px;
        border-radius: 10px;
        overflow: hidden;

        background: var(--color-bg-main);

        div {
          background: #1ED6BA;
          width: 30%;
          height: 100%;
        }
      }
    }
  }
}
</style>
