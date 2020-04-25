<template>
  <div
    class="app-group"
    @click="go"
  >
    <div class="name">{{name}}</div>

    <div class="additional">
      <app-data-list
        class="data-list"
        :data="getData()"
      ></app-data-list>
    </div>
  </div>
</template>

<script>
import AppDataList from '../../ui/AppDataList.vue'

export default {
  props: {
    id: {
      type: Number,
      required: true,
      default: () => 0,
    },
    name: {
      type: String,
      required: true,
    },
    studentsCount: {
      type: Number,
      required: false,
      default: () => null,
    },
    educationStart: {
      type: String,
      required: false,
      default: () => '',
    },
    educationEnd: {
      type: String,
      required: false,
      default: () => '',
    },
  },
  components: {
    AppDataList,
  },
  methods: {
    getData() {
      const { studentsCount, educationStart, educationEnd } = this

      const data = []

      if (studentsCount) {
        data.push(['Студентів', studentsCount])
      }

      if (educationStart) {
        const educationStartDate = new Date(educationStart)
        const educationStartString = `${educationStartDate.getDate()}/${educationStartDate.getMonth() + 1}/${educationStartDate.getFullYear()}`

        data.push(['Початок навчання', educationStartString])
      }

      if (educationEnd) {
        const educationEndDate = new Date(educationEnd)
        const educationEndString = `${educationEndDate.getDate()}/${educationEndDate.getMonth() + 1}/${educationEndDate.getFullYear()}`

        data.push(['Кінець навчання', educationEndString])
      }

      return data
    },
    go() {
      const { id } = this

      if (id) {
        this.$router.push({
          name: 'group',
          params: { id },
        })
      }
    },
  },
}
</script>

<style lang="less" scoped>
.app-group {
  display: grid;
  grid-template-columns: auto 150px;
  justify-content: center;
  align-items: center;
  grid-gap: 30px;

  background: var(--color-bg-dark);
  border-radius: 10px;
  padding: 20px;

  cursor: pointer;

  position: relative;

  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    margin: auto;

    width: 3px;
    height: 40px;
    background: #1ED6BA;
    border-radius: 10px;
  }

  .name {
    font-size: 1.8em;
    font-weight: 400;
  }

  @media screen and (max-width: 1100px) {
    grid-template-columns: 1fr;
    justify-content: flex-start;
    grid-gap: 10px;

    .data-list {
      margin: 0;
    }
  }
}
</style>
