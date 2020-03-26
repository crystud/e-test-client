<template>
  <div class="app-live-test">
    <div class="title">Студенти, що зараз проходять тест</div>

    <div class="list">
      <div
        class="student"
        v-for="i in 10"
        v-bind:key="i"
      >
        <div class="name">Студент студентович</div>

        <div class="current-data">
          <span class="item" title="Правильність відповідей">
            <span class="icon progress">
              <font-awesome-icon icon="check"></font-awesome-icon>
            </span>

            <span class="text">74%</span>
          </span>

          <span class="item" title="Завершено">
            <span class="icon success">
              <font-awesome-icon icon="list-ol"></font-awesome-icon>
            </span>

            <span class="text">40%</span>
          </span>
        </div>

        <div class="progress-bar">
          <div :style="{
            'width': `${Math.random() * 100}%`,
          }"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="less" scoped>
.app-live-test {
  color: var(--color-font-main);

  .border-bottom {
    border-bottom: 1px solid var(--color-bg-main);
  }

  .title {
    padding: 20px;
    .border-bottom();
  }

  .list {
    .student {
      padding: 20px;
      .border-bottom();

      &:last-child {
        border-bottom: none;
      }

      .name {
        font-size: 1.3em;
        font-weight: 100;
      }

      .current-data {
        font-weight: 100;

        margin: 10px 0;

        .item {
          margin-right: 20px;

          .icon {
            margin-right: 5px;

            &.progress {
              color: var(--color-accent-orange);
            }

            &.success {
              color: var(--color-accent-green);
            }
          }

          .text {
            margin-left: 5px;
            color: var(--color-font-main);
          }
        }
      }

      .progress-bar {
        position: relative;

        width: 100%;
        height: 7px;
        overflow: hidden;

        background: var(--color-bg-main);

        &, div {
          border-radius: 10px;
        }

        div {
          position: absolute;
          top: 0;
          left: 0;

          height: 100%;
          background: linear-gradient(45deg, #1BC388, #0C6993);
        }
      }
    }
  }
}
</style>
