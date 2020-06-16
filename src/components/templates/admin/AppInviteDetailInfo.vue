<template>
  <app-modal-window
    :show="Boolean(info.id)"
    class="app-invite-detail-info"
    :noPaddings="true"
  >
    <div class="header">
      <div class="text">
        Інформація про запрошення №{{info.id}}
      </div>

      <div
        class="close"
        @click="$emit('close')"
      >
        <font-awesome-icon
          icon="times-circle"
        ></font-awesome-icon>
      </div>
    </div>

    <div
      v-if="info.id"
      class="info"
    >
      <div class="student">
        {{info.student.user.lastName}}
        {{info.student.user.firstName}}
        {{info.student.user.patronymic}}
      </div>

      <div class="used-at">
        <div
          v-if="info.usedAt !== null"
          class="used"
        >Запрошення використано {{$moment(info.usedAt).format('Do MMMM YYYY, HH:mm')}}</div>

        <div
          v-else
          class="awaiting"
        >
          <font-awesome-icon icon="user-clock"></font-awesome-icon>

          <span>Запрошення ще не було використано</span>
        </div>
      </div>

      <app-data-list
        :data="[
          ['Номер залікової книги', info.student.scoringBook],
          ['Група', info.student.group.name || '-'],
          [
            'Створено',
            info.createAt ? $moment(info.createAt).format('Do MMMM YYYY, HH:mm') : '-'
          ],
        ]"
      ></app-data-list>
    </div>

    <div class="code">
      <span class="label">Код запрошення</span>
      <span class="value">{{info.code}}</span>
    </div>
  </app-modal-window>
</template>

<script>
import AppModalWindow from '@/components/ui/AppModalWindow.vue'
import AppDataList from '@/components/ui/AppDataList.vue'

export default {
  props: {
    info: {
      type: Object,
      required: true,
      default: () => {},
    },
  },
  components: {
    AppModalWindow,
    AppDataList,
  },
}
</script>

<style lang="less" scoped>
.app-invite-detail-info {
  .header,
  .info,
  .code {
    padding: 20px;

    max-width: 450px;
    width: 100vw;
  }

  .header {
    display: grid;
    grid-template-columns: 1fr auto;
    grid-gap: 20px;

    align-items: center;

    border-bottom: 1px solid var(--color-bg-main);
    font-size: 1.1em;

    .text {
      color: var(--color-font-dark);
    }

    .close {
      color: var(--color-accent-red);
      cursor: pointer;
    }
  }

  .info {
    .student {
      font-size: 1.3em;
      font-weight: bold;
    }

    .used-at {
      margin-top: 10px;

      .used {
        color: var(--color-accent-green);
      }

      .awaiting {
        color: var(--color-accent-orange);

        span {
          margin-left: 5px;
        }
      }
    }
  }

  .code {
    border-top: 1px solid var(--color-bg-main);

    display: flex;
    justify-content: space-between;

    .label {
      color: var(--color-font-dark);
    }

    .value {
      color: var(--color-accent-green);
      font-weight: bold;
    }
  }
}
</style>
