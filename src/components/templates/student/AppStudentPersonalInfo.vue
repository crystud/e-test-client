<template>
  <app-user-card class="app-student-info">
    <div class="profile-image">
      <img
        :src="require('@/assets/no_user.png')"
        alt="student profile image"
      />
    </div>

    <div class="info">
      <div class="basic-info">
        <div class="name">{{user.lastName}} {{user.firstName}} {{user.patronymic}}</div>
        <!-- <div class="last-visit">Остання активність: 37 хвилин тому</div> -->
      </div>

      <app-data-list
        v-if="data.length"
        class="additional"
        :data="data"
      ></app-data-list>

      <div
        v-if="user.students && $route.name !== 'homeTeacher'"
        class="student-groups"
      >
        <div
          v-for="student in user.students"
          :key="student.id"
          class="group"
          :class="{
            selected: selectedStudent.id === student.id,
          }"
          @click="selectedStudent.id === student.id ? null : $emit('changeStudent', student)"
        >
          {{student.group.name}}
        </div>
      </div>
    </div>
  </app-user-card>
</template>

<script>
import AppUserCard from './AppUserCard.vue'
import AppDataList from '../../ui/AppDataList.vue'

export default {
  name: 'AppStudentPersonalInfo',
  components: {
    AppUserCard,
    AppDataList,
  },
  props: {
    data: {
      type: Array,
      required: false,
      default: () => [],
    },
    user: {
      type: Object,
      required: true,
      default: () => {},
    },
    selectedStudent: {
      type: Object,
      required: false,
      default: () => {},
    },
  },
}
</script>

<style lang="less" scoped>
@profile-image-size: 150px;

.app-student-info {
  display: grid;
  grid-template-columns: @profile-image-size 1fr;
  grid-gap: 20px;
  align-items: center;

  .student-groups {
    margin-top: 20px;

    .group {
      display: inline-block;
      border-radius: 5px;
      padding: 5px 10px;
      margin: 0 10px 10px 0;

      cursor: pointer;

      background: var(--color-bg-main);
      color: var(--color-font-main);

      &.selected {
        background: var(--color-accent-green);
        color: #fff;
        cursor: default;
      }
    }
  }

  .mobile {
    grid-template-columns: 1fr;

    .profile-image {
      margin: 0 auto;
    }

    .basic-info {
      text-align: center;
    }
  }

  @media screen and (max-width: 550px) {
    .mobile();
  }

  .profile-image {
    width: @profile-image-size;
    height: @profile-image-size;
    overflow: hidden;
    border-radius: 50%;

    img {
      width: 100%;
    }
  }

  .info {
    font-weight: 300;

    .name {
      font-size: 1.3em;
    }

    .last-visit {
      color: var(--color-font-dark);
      margin-top: 5px;
    }

    .additional {
      margin-top: 20px;
      margin-bottom: 0;
      font-weight: 300;

      .item {
        margin-bottom: 10px;
        display: grid;
        align-items: center;

        grid-template-columns: 1fr 100px;

        .property {
          color: var(--color-font-dark);
        }

        .value {
          color: var(--color-font-main);
        }
      }
    }
  }
}
</style>
