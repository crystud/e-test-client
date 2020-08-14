<template>
  <div class="app-test-info-edit">
    <h2>Інформація про тест</h2>

    <app-input
      appearance="secondary"
      placeholder="Назва тесту"
      :value="test.name"
      class="app-input"
    ></app-input>

    <app-input
      appearance="secondary"
      placeholder="К-сть запитань за сесію"
      :value="parseInt(test.countOfTasks, 10)"
      class="app-input"
    ></app-input>

    <app-select
      :values="subjects.map(({ subject: { name }, id }) => ({ label: name, value: id }))"
      class="app-input app-select"
      :sideBorder="true"
      @change="({ value }) => test.subject = value"
      label="Предмет..."
    ></app-select>

    <div class="pass-time">
      <div class="title">Час на проходження</div>

      <div class="controls">
        <app-input
          appearance="secondary"
          placeholder="Годин"
          class="app-input"
        ></app-input>

        <app-input
          appearance="secondary"
          placeholder="Хвилин"
          class="app-input"
          :value="parseInt(test.duration, 10)"
        ></app-input>
      </div>
    </div>
  </div>
</template>

<script>
import AppInput from '@/components/ui/AppInput.vue'
import AppSelect from '@/components/ui/AppSelect.vue'

export default {
  data() {
    return {
      subjects: [],
    }
  },
  props: {
    test: {
      type: Object,
      required: true,
    },
  },
  components: {
    AppInput,
    AppSelect,
  },
}
</script>

<style lang="less" scoped>
.app-test-info-edit {
  background: var(--color-bg-dark);
  color: var(--color-font-main);

  padding: 20px;
  border-radius: 7px;

  h2 {
    margin-bottom: 20px;
  }

  .app-input {
    background: var(--color-bg-main);
    margin-bottom: 20px;
  }

  .app-select {
    border-radius: 10px;
  }

  .pass-time {
    .title {
      color: var(--color-font-dark);
      margin-bottom: 10px;
    }

    .controls {
      display: grid;
      grid-template-columns: 1fr 1fr;
      grid-gap: 10px;
    }
  }
}
</style>
