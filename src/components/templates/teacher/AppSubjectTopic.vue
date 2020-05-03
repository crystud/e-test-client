<template>
  <div
    class="app-subject-topic"
    :class="{
      confirmed: topic.confirmed,
    }"
    @click="visit"
  >
    <div class="name">{{topic.name}}</div>

    <app-data-list
      class="data-list"
      :data="[
        ['Підтверджена', topic.confirmed ? 'Так' : 'Ні'],
      ]"
    ></app-data-list>
  </div>
</template>

<script>
import AppDataList from '@/components/ui/AppDataList.vue'
import { mapActions } from 'vuex'

export default {
  components: {
    AppDataList,
  },
  props: {
    topic: {
      type: Object,
      required: true,
      default: () => {},
    },
  },
  methods: {
    ...mapActions({
      setAlert: 'alert/set',
    }),
    visit() {
      const { topic: { id } } = this

      if (!id) {
        return this.setAlert({
          title: 'Помилка',
          text: 'Не вдалось оприділити ID теми...',
          isSuccess: false,
          delay: 1500,
          show: true,
        })
      }

      return this.$router.push({
        name: 'topic',
        params: { id },
      })
    },
  },
}
</script>

<style lang="less" scoped>
.app-subject-topic {
  background: var(--color-bg-dark);
  padding: 25px;
  border-radius: 10px;
  box-shadow: 0px 0px 15px rgba(0, 0, 0, 0.3);
  position: relative;
  cursor: pointer;

  .name {
    font-size: 1.4em;
    margin-bottom: 20px;
  }

  .data-list {
    margin: 0;
  }

  &::before {
    content: "";
    width: 60px;
    height: 3px;
    border-radius: 10px;

    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    margin: auto;

    background: var(--color-accent-red);
  }

  &.confirmed::before {
    background: var(--color-accent-green);
  }
}
</style>
