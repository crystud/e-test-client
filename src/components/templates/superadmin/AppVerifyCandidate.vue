<template>
  <div
    class="app-verify-candidate"
    @click="go"
  >
    <div class="name">{{college.name}}</div>

    <app-data-list
      :data="[
        ['E-mail', college.email],
        ['Адреса', college.address],
        ['Веб-сайт', college.site],
        ['ЄДЕБО', college.EDBO],
      ]"
      class="list"
    ></app-data-list>

    <div class="is-verificated">
      <span
        v-if="college.confirmed"
        class="verificated"
      >НЗ верифікований</span>

      <span
        v-if="!college.confirmed"
        class="not-verificated"
      >НЗ не верифікований</span>
    </div>
  </div>
</template>

<script>
import AppDataList from '../../ui/AppDataList.vue'

export default {
  components: {
    AppDataList,
  },
  props: {
    college: {
      type: Object,
      required: true,
      default: () => {},
    },
    isVerificated: {
      type: Boolean,
      required: true,
      default: () => false,
    },
  },
  methods: {
    go() {
      if (!this.college.confirmed) {
        return this.$emit('click')
      }

      return this.$router.push({
        name: 'statsCollege',
        params: {
          collegeID: 1,
        },
      })
    },
  },
}
</script>

<style lang="less" scoped>
.app-verify-candidate {
  padding: 25px;
  background: var(--color-bg-dark);
  border-radius: 10px;

  cursor: pointer;

  position: relative;

  &::before {
    content: "";

    display: block;

    height: 2px;
    width: 30%;
    max-width: 60px;

    margin: auto;

    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;

    background: #1ED6BA;
  }

  .name {
    font-size: 1.3em;
  }

  .list {
    margin: 15px 0 0;
  }

  .is-verificated {
    margin-top: 20px;

    .verificated {
      color: #0EEAA6;
    }

    .not-verificated {
      color: #E01616;
    }
  }
}
</style>
