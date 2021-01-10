<template>
  <app-modal-window
    :show="Boolean(file.name)"
    :noPaddings="true"
    class="app-avatar-detail-info"
  >
    <div class="header">
      Інформація про зображення профілю ({{file.name}})
    </div>

    <div class="content">
      <div
        class="image"
        v-if="image"
      >
        <img
          :src="image"
          :alt="file.name"
        />
      </div>

      <div class="info">
        <div
          class="is-student-attached"
          v-if="file.name"
        >
          <span
            class="student-attached"
            v-if="attachedStudent.scoringBook"
          >
            {{attachedStudentName}}
          </span>

          <span
            v-else
            class="student-not-attached"
          >
            <font-awesome-icon
              icon="exclamation-triangle"
            ></font-awesome-icon>
            Студента із заліковою книгою {{filenameScoringBook}} не знайдено у списку
          </span>
        </div>

        <app-data-list
          class="data-list"
          :data="[
            ['Назва', file.name],
            ['Розмір', `${Math.round(file.size / 1000)} кб`],
            ['Остання модифікація', $moment(file.lastModified).format('Do MMMM YYYY, HH:mm')],
            ['Номер залікової книги', attachedStudent.scoringBook || '-'],
          ]"
        ></app-data-list>
      </div>
    </div>

    <div class="btns">
      <button
        class="close"
        @click="$emit('close')"
      >Закрити</button>
    </div>
  </app-modal-window>
</template>

<script>
import AppModalWindow from '@/components/ui/AppModalWindow.vue'
import AppDataList from '@/components/ui/AppDataList.vue'

export default {
  data() {
    return {
      image: null,
    }
  },
  computed: {
    attachedStudentName() {
      const { attachedStudent: { lastName, firstName, patronymic } = {} } = this

      if (!lastName || !firstName) {
        return ''
      }

      return `${lastName} ${firstName} ${patronymic}`
    },
    filenameScoringBook() {
      const { file } = this

      if (!file.name) {
        return ''
      }

      const [scoringBook] = file.name.split('.')

      return scoringBook
    },
  },
  props: {
    file: {
      type: [File, Object],
      required: true,
    },
    invites: {
      type: Array,
      required: true,
    },
    attachedStudent: {
      type: Object,
      required: true,
    },
  },
  watch: {
    file() {
      const { file } = this

      if (!file.name) {
        return
      }

      const fileReader = new FileReader()

      fileReader.onload = () => {
        this.image = fileReader.result
      }

      fileReader.readAsDataURL(file)
    },
  },
  components: {
    AppModalWindow,
    AppDataList,
  },
}
</script>

<style lang="less" scoped>
.app-avatar-detail-info {
  .header,
  .content,
  .btns {
    max-width: 450px;
    width: 100vw;

    padding: 15px 20px;
  }

  .header {
    border-bottom: 1px solid var(--color-bg-main);
    font-size: 1.2em;
    font-weight: bold;
  }

  .content {
    display: grid;
    grid-template-columns: auto 1fr;
    grid-gap: 20px;

    align-items: flex-start;
    justify-content: center;

    .image {
      img {
        max-width: 200px;
        border-radius: 10px;
      }
    }

    .info {
      .is-student-attached {
        margin-bottom: 10px;

        .student-attached {
          font-size: 1.2em;
          font-weight: bold;
        }

        .student-not-attached {
          color: var(--color-accent-orange);
        }
      }

      .data-list {
        margin: 0;
      }
    }
  }

  .btns {
    padding: 0 auto;

    button {
      width: 100%;
      font-size: 1em;

      border: 0;
      background: var(--color-bg-main);
      border-radius: 5px;

      color: var(--color-font-dark);
      padding: 10px;
      cursor: pointer;
    }
  }
}
</style>
