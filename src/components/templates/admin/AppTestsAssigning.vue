<template>
  <app-modal-window :show="show" :noPaddings="true">
    <div class="app-tests-assigning">
      <div class="header">Тести для додавання</div>

      <div class="content">
        <div class="tip">
          Вкажіть тести, які повинні відображатись у студентів
          спеціальності “Інженерія програмного забезпечення”
          набору 01.09.2016
        </div>

        <app-search-bar></app-search-bar>

        <div class="tests-list">
          <div class="row title-row">
            <div class="name">Назва тесту, Автор</div>
            <div class="created">Створено / Додати</div>
          </div>

          <div class="row">
            <div class="name">Covid-2019, Боженька</div>

            <div class="created">
              <div class="date">29.12.2019</div>

              <div class="action">
                <app-button appearance="neutral" class="list-btn add">
                  <font-awesome-icon icon="folder-plus"></font-awesome-icon>
                  <span class="text">Додати</span>
                </app-button>
              </div>
            </div>
          </div>

          <div class="row">
            <div class="name">Тест з чогось там, Смиковчук Т.В.</div>

            <div class="created">
              <div class="date">09.02.2020</div>

              <div class="action">
                <app-button appearance="neutral" class="list-btn add">
                  <font-awesome-icon icon="folder-plus"></font-awesome-icon>
                  <span class="text">Додати</span>
                </app-button>
              </div>
            </div>
          </div>

          <div class="row">
            <div class="name">Групова динаміка (3 курс), Юрочко О.М.</div>

            <div class="created">
              <div class="date">
                <div class="text">
                  09.02.2020
                </div>

                <div class="icon">
                  <font-awesome-icon
                    icon="check"
                  ></font-awesome-icon>
                </div>
              </div>

              <div class="action">
                <app-button appearance="neutral" class="list-btn remove">
                  <font-awesome-icon icon="folder-minus"></font-awesome-icon>
                  <span class="text">Вилучити</span>
                </app-button>
              </div>
            </div>
          </div>
        </div>

        <div class="btns">
          <app-button
            appearance="brand"
            class="app-button"
            @click="$emit('close')"
          >Додати</app-button>

          <app-button
            appearance="neutral"
            class="app-button"
            @click="$emit('close')"
          >Закрити</app-button>
        </div>
      </div>
    </div>
  </app-modal-window>
</template>

<script>
import AppSearchBar from '@/components/ui/AppSearchBar.vue'
import AppModalWindow from '../../ui/AppModalWindow.vue'
import AppButton from '../../ui/AppButton.vue'

export default {
  props: {
    show: {
      type: Boolean,
      required: true,
      default: () => false,
    },
  },
  components: {
    AppModalWindow,
    AppSearchBar,
    AppButton,
  },
}
</script>

<style lang="less" scoped>
.app-tests-assigning {
  max-height: 95vh;
  overflow: auto;
  max-width: 700px;

  background: var(--color-bg-dark);
  border-radius: 15px;

  .header,
  .content {
    padding: 30px;
    border-bottom: 1px solid var(--color-bg-main);

    @media screen and (max-width: 350px) {
      padding: 15px;
    }
  }

  .header {
    font-size: 1.5em;
    color: var(--color-font-main);
  }

  .content {
    text-align: left;

    .tip {
      color: var(--color-font-dark);
      margin-bottom: 33px;
    }

    .tests-list {
      margin-top: 40px;

      .row {
        display: grid;
        grid-template-columns: 1fr 200px;
        margin-bottom: 10px;
        align-items: center;
        min-height: 40px;

        color: var(--color-font-main);

        .date {
          display: flex;

          .icon {
            margin-left: 10px;
            color: #1ED6BA;
          }
        }

        .action {
          position: absolute;
          right: -100%;
          top: 0;
          bottom: 0;

          display: flex;
          align-items: center;

          transition: all .25s;
        }

        &:hover {
          .action {
            right: 0%;
          }
        }

        &.title-row {
          color: var(--color-font-dark);
        }

        .created {
          text-align: right;
          color: var(--color-font-dark);
          position: relative;
          overflow: hidden;

          display: flex;
          align-items: center;
          justify-content: flex-end;

          height: 100%;

          .list-btn {
            padding: 0 20px;
            height: 40px;
            max-height: 50px;

            .text {
              margin-left: 10px;
            }

            &.add {
              color: #1ED6BA;
            }

            &.remove {
              color: #E01616;
            }
          }
        }

        @media screen and (max-width: 350px) {
          .created {
            flex-wrap: wrap;
          }
        }

        @media screen and (max-width: 650px) {
          grid-template-columns: 1fr;
          grid-gap: 0;
          margin-bottom: 30px;

          border-bottom: 1px solid fadeout(#000, 80%);

          .name {
            font-size: 1.2em;
          }

          .created {
            justify-content: flex-start;

            padding: 15px 0;
          }

          .date, .action {
            margin: 10px 0;
          }

          .date {
            margin-right: 15px;
          }

          .action {
            position: relative;
            top: 0;
            left: 0;
          }
        }
      }
    }

    .btns {
      display: flex;
      justify-content: flex-end;

      margin-top: 20px;

      .app-button {
        margin-left: 12px;
      }

      @media screen and (max-width: 400px) {
        flex-direction: column;

        .app-button {
          width: 100%;
          margin: 0;
        }

        .app-button:first-child {
          margin: 0 0 20px;
        }
      }
    }
  }
}
</style>
