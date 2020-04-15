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
        <div class="column">
          <div class="filling-bar">
            <div
              :style="{
                'width': getPercentage(daytime + parttime) + '%',
              }"
            ></div>
          </div>
        </div>

        <div  class="column">
          <div class="label">Спеціальність</div>
          <div class="value">{{name}}</div>
        </div>

        <div  class="column">
          <div class="label">Студентів</div>
          <div class="value">{{daytime + parttime}}</div>
        </div>

        <div  class="column">
          <div class="label">Денна</div>
          <div class="value">{{daytime}}</div>
        </div>

        <div  class="column">
          <div class="label">Заочна</div>
          <div class="value">{{parttime}}</div>
        </div>

        <div  class="column">
          <div class="label">% від усіх</div>
          <div class="value">{{ Math.round(getPercentage(daytime + parttime)) }}%</div>
        </div>
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

      .label {
        display: none;
        color: var(--color-font-dark);

        margin-right: 15px;
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

      @media screen and (max-width: 1300px) {
        grid-template-columns: 1fr;
        grid-gap: 10px;

        margin-bottom: 40px;
        padding-bottom: 20px;

        border-bottom: 1px solid var(--color-bg-main);

        .filling-bar {
          margin-bottom: 15px;
        }

        .column {
          display: flex;

          .label {
            display: block;
          }
        }
      }

      @media screen and (max-width: 400px) {
        .column {
          display: block;

          .label {
            margin-bottom: 5px;
            margin-right: 0;
          }

          .value {
            margin-bottom: 10px;
          }
        }
      }
    }
  }
}
</style>
