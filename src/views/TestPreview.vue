<template>
  <div class="app-test-preview">
    <app-test-header
      @onStart="startTest"
      :showStart="true"
    ></app-test-header>

    <div class="test-stats">
      <div class="section">
        <div>
          <div class="title">Загальна статистика</div>

          <div class="data">
            <div
              class="item"
              v-for="i in 3"
              v-bind:key="i"
            >
              <div class="property">Пройдено разів</div>
              <div class="value">49</div>
            </div>
          </div>
        </div>
      </div>

      <div class="section">
        <div>
          <div class="title">Тест</div>

          <div class="data">
            <div class="item">
              <div class="property">К-сть запитань</div>
              <div class="value">30</div>
            </div>

            <div class="item">
              <div class="property">Макс. оцінка</div>
              <div class="value">12</div>
            </div>

            <div class="item">
              <div class="property">Мін. оцінка</div>
              <div class="value">4</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import AppTestHeader from '@/components/templates/tests/AppTestHeader.vue'

export default {
  name: 'TestPreview',
  components: {
    AppTestHeader,
  },
  methods: {
    startTest() {
      this.$router.push({
        name: 'testPass',
        params: {
          id: 1,
        },
      })
    },
  },
}
</script>

<style lang="less" scoped>
.app-test-preview {
  .test-stats {
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-template-rows: minmax(150px, auto);

    grid-gap: 20px;

    margin-top: 20px;

    font-size: 1.1em;

    @media screen and (max-width: 680px) {
      grid-template-columns: 1fr;
    }

    .section {
      display: flex;
      justify-content: center;
      align-items: center;

      background: var(--color-bg-dark);
      color: var(--color-font-main);
      border-radius: 10px;

      padding: 30px;

      .title {
        font-size: 1.6em;
        margin-bottom: 20px;
        font-weight: 200;
      }

      .data {
        .item {
          display: grid;
          grid-template-columns: 160px 1fr;

          margin-bottom: 10px;

          .property {
            color: var(--color-font-dark);
            font-weight: 300;
          }

          .value {
            color: var(--color-font-main);
            font-weight: 400;
          }
        }
      }
    }
  }
}
</style>
