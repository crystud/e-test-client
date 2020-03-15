<template>
  <app-card class="specialty">
    <div class="title">Інженерія програмного забезпечення</div>

    <div class="data-list">
      <div class="item">
        <div class="property">Скорочена назва</div>
        <div class="value">П</div>
      </div>

      <div class="item">
        <div class="property">Студентів</div>
        <div class="value">163</div>
      </div>
    </div>

    <router-link
      :to="{ name: 'studyPlan' }"
      class="study-plan"
    >Навчальний план</router-link>
  </app-card>
</template>

<script>
import AppCard from '../../ui/AppCard.vue'

export default {
  name: 'AppSpecialty',
  components: {
    AppCard,
  },
}
</script>

<style lang="less" scoped>
.specialty {
  padding: 30px;
  font-weight: 100;

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

  .data-list {
    margin: 25px 0;

    .item {
      margin-bottom: 10px;
      display: grid;

      grid-template-columns: 150px 100px;

      .property {
        color: var(--color-font-dark);
      }

      .value {
        color: var(--color-font-main);
      }
    }
  }

  .study-plan {
    padding-left: 15px;
    position: relative;

    color: var(--color-font-main);

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
      color: var(--color-font-dark) !important;
    }
  }
}
</style>
