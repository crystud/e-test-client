<template>
  <app-modal-window
    class="app-entire-invites-list"
    :noPaddings="true"
    :show="show"
  >
    <div class="content">
      <div class="header">
        <div class="title">Список запрошень ({{list.length}})</div>

        <div
          class="close"
          @click="$emit('close')"
        >
          <font-awesome-icon icon="times"></font-awesome-icon>
        </div>
      </div>

      <div
        v-if="nonHandleableStudents.length"
        class="unhandleable-students"
      >
        <div class="icon">
          <font-awesome-icon icon="exclamation-triangle"></font-awesome-icon>
        </div>

        <div class="text">
          В імпорті знаходяться {{nonHandleableStudents.length}} зображень профілів,
          яким не було оприділено власника. Якщо ви створите запрошення - вони будуть
          проігноровані</div>
      </div>

      <div class="list">
        <div
          v-for="({ lastName, firstName, patronymic, scoringBook }, index) in list"
          v-bind:key="index"
          class="student"
        >
          <div class="image">
            <img :src="generatedAvatars[scoringBook] || require('@/assets/no_user.png')" />
          </div>

          <div class="name">
            {{lastName}} {{firstName}} {{patronymic}}
          </div>

          <div class="scoring-book">Залікова книга: {{scoringBook}}</div>
        </div>
      </div>
    </div>
  </app-modal-window>
</template>

<script>
import AppModalWindow from '@/components/ui/AppModalWindow.vue'

export default {
  data() {
    return {
      generatedAvatars: {},
    }
  },
  watch: {
    avatars() {
      const { avatars } = this

      avatars.forEach((file) => {
        const fileReader = new FileReader()

        fileReader.onload = () => {
          const [scoringBook] = file.name.split('.')

          this.generatedAvatars[scoringBook] = fileReader.result

          this.$emit('setGeneratedAvatars', this.generatedAvatars)
        }

        fileReader.readAsDataURL(file)
      })
    },
  },
  props: {
    show: {
      type: Boolean,
      required: true,
    },
    list: {
      type: Array,
      required: true,
    },
    avatars: {
      type: [Array, FileList],
      required: true,
    },
    nonHandleableStudents: {
      type: Array,
      required: true,
    },
  },
  components: {
    AppModalWindow,
  },
}
</script>

<style lang="less" scoped>
.app-entire-invites-list {
  .content,
  .header {
    max-width: 800px;
    width: 100vw;
  }

  .header {
    display: grid;
    grid-template-columns: 1fr auto;
    grid-gap: 20px;

    align-items: center;

    border-bottom: 1px solid var(--color-bg-main);
    padding: 20px;

    .title {
      font-size: 1.3em;
    }

    .close {
      font-size: 1.5em;
      cursor: pointer;
      color: var(--color-accent-red);
    }
  }

  .unhandleable-students {
    margin: 20px 20px 0 20px;
    padding: 20px;

    border-radius: 10px;
    background: var(--color-accent-red);
    box-shadow: 0px 0px 10px rgba(0, 0, 0, .2);
    color: #fff;

    display: grid;
    grid-template-columns: auto 1fr;
    grid-gap: 15px;

    align-items: center;

    .icon {
      font-size: 1.4em;
    }
  }

  .list {
    padding: 20px;

    display: grid;
    grid-template-columns: repeat(3, 1fr);
    grid-gap: 20px;

    .student {
      background: var(--color-bg-main);
      border-radius: 10px;
      padding: 20px 15px;
      text-align: center;

      .image {
        text-align: center;
        margin-bottom: 10px;

        img {
          max-width: 80%;
          max-height: 150px;
          border-radius: 10px;
        }
      }

      .name {
        font-size: 1.1em;
        font-weight: 400;
        color: var(--color-font-main);
      }

      .scoring-book {
        color: var(--color-font-dark);
        margin-top: 10px;
      }
    }
  }
}
</style>
