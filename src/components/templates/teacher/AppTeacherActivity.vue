<template>
  <app-user-card class="app-student-activity">
    <div class="title">Ваша статистика</div>

    <app-data-list
      :data="[
        ['Викладаєте предметів', stats.subjectsCount],
        ['Створили запитань', stats.tasksCount],
        ['Створили тестів', stats.testsCount],
      ]"
    ></app-data-list>
  </app-user-card>
</template>

<script>
import { mapActions } from 'vuex'

import AppUserCard from '../student/AppUserCard.vue'
import AppDataList from '../../ui/AppDataList.vue'

export default {
  data() {
    return {
      stats: {},
    }
  },
  methods: {
    ...mapActions({
      getTeacherStats: 'teacher/getStats',
    }),
    async loadStats() {
      try {
        this.showPreloader = true

        this.stats = await this.getTeacherStats()
      } catch (e) {
        this.setAlert({
          title: 'Помилка',
          text: 'Не вдалось отримати статистику викладача',
          show: true,
          isSuccess: false,
        })
      } finally {
        this.showPreloader = false
      }
    },
  },
  created() {
    this.loadStats()
  },
  components: {
    AppUserCard,
    AppDataList,
  },
  props: {
    teachers: {
      type: Array,
      required: true,
      default: () => [],
    },
  },
}
</script>

<style lang="less" scoped>
.app-student-activity {
  font-weight: 300;

  .title {
    font-size: 1.5em;
    margin-bottom: 20px;
  }

  .data {
    margin-bottom: 0;
  }
}
</style>
