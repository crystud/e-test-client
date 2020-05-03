<template>
  <div class="authorization">
    <div class="auth">
      <div class="form">
        <router-view></router-view>
      </div>

      <div class="features">
        <div>
          <h2>CRYSTUD</h2>

          <div class="list">
            <div
              class="feature"
              v-for="feature in features"
              v-bind:key="feature.title"
            >
              <div class="icon-wrap">
                <font-awesome-icon
                  :icon="feature.icon"
                  class="icon"
                ></font-awesome-icon>
              </div>

              <div class="title">{{feature.title}}</div>

              <p class="description">
                {{feature.description}}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'AuthIndex',
  data() {
    return {
      features: [
        { icon: 'chart-bar', title: 'Статистика', description: 'Успіх навчання у вигляді графіків' },
        { icon: 'shield-alt', title: 'Безпека', description: 'Надійних захист профілів користувачів' },
        { icon: 'graduation-cap', title: 'Оцінки', description: 'Студенти завжди знають свої оцінки та статистику' },
      ],
    }
  },
}
</script>

<style lang="less" scoped>
@small: ~"screen and (max-width: 799px)";
@medium: ~"screen and (max-width: 1000px)";
@large: ~"screen and (min-width: 1400px)";

.authorization {
  display: flex;
  justify-content: center;
  align-items: center;

  height: 100vh;
  width: 100vw;

  @media @small {
    height: auto;
  }

  .auth {
    width: 1100px;
    max-height: 95%;
    overflow: auto;
    display: grid;
    grid-template-columns: 3fr 5fr;
    overflow-x: visible;

    box-shadow: 0px 0px 25px rgba(0, 0, 0, 0.4);

    @media @small {
      grid-template-columns: 1fr;
      margin: 0;
      max-height: initial;
    }

    .form, .features {
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .form {
      background: #111417;
      border-radius: 10px 0 0 10px;
      padding: 40px 40px;

      @media @small {
        border-radius: 0;
      }
    }

    .features {
      background: linear-gradient(45deg, #1BC388, #0C6993);
      border-radius: 0 10px 10px 0;
      padding: 40px 50px;

      @media @small {
        border-radius: 0;
      }

      h2 {
        color: #fff;
        text-align: center;
        margin-bottom: 30px;
        font-size: 35px;
        font-weight: 400;
      }

      .list {
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        grid-gap: 60px;

        @media @small {
          grid-template-columns: 1fr;
        }

        .feature {
          text-align: center;

          .icon-wrap {
            width: 60px;
            height: 60px;
            margin: auto;

            display: flex;
            align-items: center;
            justify-content: center;

            .icon {
              font-size: 2em;
              color: #E2E2E2;
            }
          }

          .title {
            margin: 10px 0;
            font-size: 1.3em;
            font-weight: 300;
            color: #fff;
          }

          .description {
            margin: 0;
            font-weight: 300;
            color: rgba(255, 255, 255, 0.67);
          }
        }
      }
    }
  }
}
</style>
