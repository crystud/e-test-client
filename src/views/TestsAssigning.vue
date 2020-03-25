<template>
  <div class="tests-assigning">
    <div class="header">
      <h1>Тести для спеціальності "{{$route.params.specialtyID}}"</h1>

      <app-select
        class="entry-select"
        :values="entryYears"
        label="Набір"
        :hidePlaceholder="true"
        :sideBorder="true"
      ></app-select>
    </div>

    <div class="list">
      <app-tests-item
        v-for="i in 6"
        v-bind:key="i"
      ></app-tests-item>
    </div>

    <app-button
     appearance="brand"
     class="add-test-btn"
     @click="showAssigning = true"
    >Додати тест</app-button>

    <app-tests-assigning
      :show="showAssigning"
      @close="showAssigning = false"
    ></app-tests-assigning>
  </div>
</template>

<script>
import AppSelect from '@/components/ui/AppSelect.vue'
import AppButton from '@/components/ui/AppButton.vue'
import AppTestsItem from '@/components/templates/tests/AppTestsItem.vue'
import AppTestsAssigning from '@/components/templates/admin/AppTestsAssigning.vue'

export default {
  name: 'TestsAssigning',
  components: {
    AppSelect,
    AppTestsItem,
    AppButton,
    AppTestsAssigning,
  },
  data() {
    return {
      showAssigning: false,
      entryYears: [
        { label: '01.09.2019', value: 1 },
        { label: '01.09.2018', value: 2 },
        { label: '01.09.2017', value: 3 },
      ],
    }
  },
}
</script>

<style lang="less" scoped>
.tests-assigning {
  .header {
    background: var(--color-bg-dark);
    border-radius: 10px;
    padding: 15px;

    display: grid;
    grid-template-columns: 1fr 250px;
    align-items: center;

    @media screen and (max-width: 500px) {
      grid-template-columns: 1fr;
      grid-gap: 20px;
    }

    h1 {
      font-weight: 100;
      font-size: 1.5em;
    }

    .entry-select {
      background: var(--color-bg-main);
      border-radius: 10px;
      padding: 10px 15px;
    }
  }

  .list {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    grid-gap: 20px;

    margin-top: 20px;

    @media screen and (max-width: 750px) {
      grid-template-columns: 1fr 1fr;
    }

    @media screen and (max-width: 550px) {
      grid-template-columns: 1fr;
    }
  }

  .add-test-btn {
    position: fixed;
    bottom: 30px;
    right: 30px;

    z-index: 45;
    box-shadow: 0px 0px 15px rgba(0, 0, 0, .3);

    transform: scale(1);
    transition: all .15s;

    &:hover {
      transform: scale(1.05);
    }
  }
}
</style>
