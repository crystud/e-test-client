<template>
  <app-user-card
    class="app-student-test-result"
    @click="go"
  >
    <div class="number">
      <div class="label">спроба</div>
      <div class="text">1</div>
    </div>

    <div class="name">
      <div class="label">Ім'я студента</div>
      <div class="text">Кіращук Олег Олегович</div>
    </div>

    <div class="mark">
      <div class="label">Оцінка</div>
      <div class="text">5 балів</div>
    </div>

    <div class="time">
      <div class="label">Затрачений час</div>
      <div class="text">11 хв 13 сек</div>
    </div>

    <div class="right-answers">
      <div class="label">% прав. відповідей</div>
      <div class="text">98%</div>
    </div>

    <div class="date">
      <div class="label">Дата проходження</div>
      <div class="text">26.02.2020 16:34</div>
    </div>
  </app-user-card>
</template>

<script>
import AppUserCard from './AppUserCard.vue'

export default {
  name: 'AppStudentTestResult',
  components: {
    AppUserCard,
  },
  methods: {
    go() {
      this.$router.push({
        name: 'testResults',
        params: {
          id: 1,
        },
      })
    },
  },
}
</script>

<style lang="less" scoped>
.app-student-test-result {
  position: relative;

  padding: 20px;
  margin-bottom: 10px;

  display: grid;
  grid-template-columns: 70px 3fr 1fr 120px 2fr 2fr;
  grid-gap: 20px;

  cursor: pointer;

  align-items: center;

  &::before {
    content: "";

    display: block;
    width: 3px;
    height: 40%;
    border-radius: 5px;

    position: absolute;
    bottom: 0;
    top: 0;
    left: 0;

    margin: auto;

    background: #1ED580;
  }

  .label {
    font-size: .9em;
    color: var(--color-font-dark);
  }

  .text {
    font-size: 1.1em;
    color: var(--color-font-main);
  }

  .detailed-info {
    font-size: 1.3em;
    color: var(--color-font-dark);
  }

  @media screen and (max-width: 1050px) {
    grid-template-columns: repeat(3, 1fr);
    grid-gap: 20px;

    &::before {
      bottom: 0;
      top: auto;
      right: 0;

      width: 20%;
      height: 5px;
    }
  }

  @media screen and (max-width: 650px) {
    grid-template-columns: 1fr 1fr;
  }

  @media screen and (max-width: 450px) {
    grid-template-columns: 1fr;
  }
}
</style>
