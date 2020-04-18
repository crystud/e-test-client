<template>
  <app-user-card class="subjects-info">
    <div class="title">Українська мова (за професiйним спрямуванням)</div>

    <div class="tests">
      <div class="row header-title">
        <div class="name">Назва</div>
        <div class="result">Результат</div>
        <div class="permission">Доступ</div>
      </div>

      <div
        class="row cursor-pointer"
        v-for="({ name, result, permission }, index) in tests"
        v-bind:key="index"
        @click="$router.push({ name: 'testPreview', params: { id: index } })"
      >
        <div class="name">{{name}}</div>

        <div
          class="result"
          :class="getResultClasses(result)"
        >
          <span v-if="result !== null">
            {{result}}%
          </span>

          <span v-else-if="result === null">-</span>
        </div>

        <div
          class="permission"
          :class="{
            'closed': !permission,
            'opened': permission,
          }"
        >{{permission ? 'Відкритий' : 'Закритий'}}</div>
      </div>
    </div>
  </app-user-card>
</template>

<script>
import AppUserCard from './AppUserCard.vue'

export default {
  name: 'AppStudentSubjects',
  components: {
    AppUserCard,
  },
  methods: {
    getResultClasses(result) {
      return result !== null ? {
        bad: result < 60,
        warning: result >= 60 && result <= 70,
        good: result > 70,
      } : {
        neutral: true,
      }
    },
  },
  data() {
    return {
      tests: [
        { name: 'Проміжний контроль 1', result: 93, permission: false },
        { name: 'Проміжний контроль 2', result: null, permission: true },
        { name: 'Проміжний контроль 3', result: null, permission: true },
        { name: 'Проміжний контроль 4', result: null, permission: false },
        { name: 'Проміжний контроль 5', result: null, permission: false },
      ],
    }
  },
}
</script>

<style lang="less" scoped>
.subjects-info {
  margin-bottom: 20px;

  .title {
    font-size: 1.5em;
    font-weight: 300;
  }

  .tests {
    margin-top: 20px;

    .row {
      display: grid;
      grid-template-columns: 1fr 100px 100px;

      padding: 7px 0;

      &.cursor-pointer {
        cursor: pointer;

        &:hover {
          .name {
            text-decoration: underline;
          }
        }
      }

      &.header-title {
        color: var(--color-font-dark);
      }

      .result {
        &.bad { color: #E01616 }
        &.warning { color: #FC7136 }
        &.good { color: #1ED6BA }
        &.neutral { color: var(--color-font-dark) }
      }

      .permission {
        &.closed {
          color: #E01616;
        }

        &.opened {
          color: #1ED6BA;
        }
      }

      @media screen and (max-width: 500px) {
        grid-template-columns: 1fr;
        grid-gap: 10px;

        margin-bottom: 20px;
        padding: 20px 0;
        border-bottom: 1px solid var(--color-bg-main);

        .name {
          font-size: 1.3em;
        }

        &:last-child {
          border-bottom: 0;
        }
      }
    }
  }
}
</style>
