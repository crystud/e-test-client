<template>
  <app-fade-card
    class="app-edit-subject"
    :show="show"
  >
    <div class="content">
      <div class="users">
        <div class="label">Користувачі</div>
      </div>

      <div class="active-teachers">
        <div class="label">Викладачі предмету</div>

        <div
          class="no-items"
          v-if="!teachers.length"
        >Вчителів у предмета немає</div>

        <app-fade-card
          :show="Boolean(teachers.length)"
        >
          <div class="list">
            <div
              v-for="({ user }, index) in teachers"
              :key="index"
              class="user"
              @mouseover="mouseOn = index"
              @mouseleave="mouseOn = null"
            >
              <div class="name">{{user.lastName}} {{user.firstName}} {{user.patronymic}}</div>

              <app-fade-card
                :show="mouseOn === index"
                class="remove"
              >Вилучити</app-fade-card>
            </div>
          </div>
        </app-fade-card>
      </div>

      <div class="subject">
        <div class="label">Інформація про предмет</div>

        <app-data-list
          :data="[
            ['Назва предмету', subject.name],
            ['К-сть вчителів', teachers.length],
            ['Тем у предметі', topics.length],
          ]"
        ></app-data-list>

      </div>
    </div>

    <div class="btns">
      <app-button
        appearance="neutral"
        class="cancel"
        @click="$emit('close')"
      >Скасувати</app-button>

      <app-button
        appearance="neutral"
        class="save"
        @click="$emit('close')"
      >Зберегти зміни</app-button>
    </div>
  </app-fade-card>
</template>

<script>
import AppFadeCard from '@/components/ui/AppFadeCard.vue'
import AppDataList from '@/components/ui/AppDataList.vue'
import AppButton from '@/components/ui/AppButton.vue'

export default {
  data() {
    return {
      mouseOn: null,
    }
  },
  computed: {
    teachers() {
      const { subject } = this

      return subject.teachers || []
    },
    topics() {
      const { subject } = this

      return subject.topics || []
    },
  },
  components: {
    AppFadeCard,
    AppDataList,
    AppButton,
  },
  props: {
    show: {
      type: Boolean,
      required: true,
    },
    subject: {
      type: Object,
      required: true,
    },
  },
}
</script>

<style lang="less" scoped>
.app-edit-subject {
  background: var(--color-bg-dark);
  box-shadow: 0px 0px 15px rgba(0, 0, 0, 0.2);
  border-radius: 10px;
  padding: 30px;

  .content {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    grid-template-areas: 'users activeTeachers subject';
    grid-gap: 20px;
  }

  .label {
    font-size: 1.2em;
    color: var(--color-font-dark);
  }

  .users {
    grid-area: users;
  }

  .active-teachers {
    grid-area: activeTeachers;

    .list {
      .user {
        padding: 15px 0;

        .name {
          font-size: 1.1em;
          margin-bottom: 5px;
        }

        .remove {
          color: var(--color-accent-red);
          cursor: pointer;

          &:hover {
            text-decoration: underline;
          }
        }
      }
    }
  }

  .no-items {
    margin: 20px 0;
    border-left: 2px solid var(--color-accent-green);
    padding: 5px 0 5px 10px;
  }

  .subject {
    grid-area: subject;
  }

  .btns {
    margin-top: 20px;

    display: grid;
    grid-template-columns: auto auto;
    grid-gap: 20px;
    justify-content: flex-end;

    width: 100%;

    .save {
      background: var(--color-accent-green);
    }
  }

  @media screen and (max-width: 1150px) {
    grid-template-areas: 'users activeTeachers' 'subject subject';
    grid-template-columns: 1fr 1fr;
  }

  @media screen and (max-width: 700px) {
    grid-template-areas: 'users' 'activeTeachers' 'subject';
    grid-template-columns: 1fr;

    .btns {
      grid-template-columns: 1fr;
    }
  }
}
</style>
