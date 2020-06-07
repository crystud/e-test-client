<template>
  <app-modal-window
    class="app-entire-invites-list"
    :noPaddings="true"
    :show="show"
  >
    <div class="content">
      <div class="header">
        <div class="title">Список запрошень</div>

        <div
          class="close"
          @click="$emit('close')"
        >
          <font-awesome-icon icon="times"></font-awesome-icon>
        </div>
      </div>

      <div class="list">
        <div class="row header-row">
          <div>Прізвище</div>
          <div>Ім'я</div>
          <div>Ім'я по-батькові</div>
          <div>Номер залікової книги</div>
        </div>

        <div
          v-for="({ lastName, firstName, patronymic, scoringBook }, index) in list"
          v-bind:key="index"
          class="row"
        >
          <div>{{lastName}}</div>
          <div>{{firstName}}</div>
          <div>{{patronymic}}</div>
          <div>{{scoringBook}}</div>
        </div>
      </div>
    </div>
  </app-modal-window>
</template>

<script>
import AppModalWindow from '@/components/ui/AppModalWindow.vue'

export default {
  props: {
    show: {
      type: Boolean,
      required: true,
    },
    list: {
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
    max-width: 700px;
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

  .list {
    padding: 20px;

    .row {
      display: grid;
      grid-template-columns: repeat(4, 1fr);
      grid-gap: 20px;
      align-items: center;

      margin-bottom: 10px;

      &.header-row {
        color: var(--color-font-dark);
      }
    }
  }
}
</style>
