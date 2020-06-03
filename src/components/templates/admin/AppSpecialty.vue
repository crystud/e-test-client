<template>
  <app-card class="specialty">
    <div class="title">{{specialty.name}}</div>

    <app-data-list
      :data="[
        ['Скорочена назва', specialty.symbol || '-'],
        ['Код', specialty.code],
        ['К-сть груп', specialty.groups ? specialty.groups.length : '-'],
        ['Закріплено предметів', specialty.studies ? specialty.studies.length : '-'],
      ]"
    ></app-data-list>

    <div
      @click="$emit('editAttachedSubjects')"
      class="study-plan"
    >Закріплені предмети ({{specialty.subjects.length}})</div>
  </app-card>
</template>

<script>
import AppCard from '../../ui/AppCard.vue'
import AppDataList from '../../ui/AppDataList.vue'

export default {
  name: 'AppSpecialty',
  components: {
    AppCard,
    AppDataList,
  },
  props: {
    specialty: {
      type: Object,
      required: true,
      default: () => {},
    },
  },
}
</script>

<style lang="less" scoped>
.specialty {
  padding: 30px;
  font-weight: 300;

  position: relative;

  &::before {
    content: "";

    display: block;
    width: 20%;
    height: 3px;
    border-radius: 10px;

    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    margin: auto;

    background: #1ED6BA;
  }

  .title {
    font-size: 1.3em;
    color: var(--color-font-main);
  }

  .study-plan {
    padding-left: 15px;
    position: relative;

    color: var(--color-font-main);
    cursor: pointer;

    &::before {
      content: "";

      display: block;
      width: 2px;
      height: 130%;

      border-radius: 10px;

      position: absolute;
      top: 0;
      left: 0;
      bottom: 0;
      margin: auto;

      background: #42E694;
    }

    &:hover {
      text-decoration: underline;
    }
  }
}
</style>
