<template>
  <div class="app-ask-subject">
    <app-preloader :show="showPreloader"></app-preloader>

    <app-modal-window
      :show="show && !showPreloader && !alert.show"
      :noPaddings="true"
    >
      <div class="title">Оберіть групу</div>

      <div class="content">
        <div
          v-if="!groups.length"
          class="no-subjects"
        >Жодної групи не знайдено...</div>

        <div class="list">
          <div
            v-for="(group, index) in groups"
            :key="index"
            class="subject"
            @click="$emit('selected', group)"
          >
            <div class="name">{{group.name}}</div>

            <div class="additional">
              {{group.students.length}} студентів
            </div>
          </div>
        </div>
      </div>

      <router-link
        class="leave"
        :to="{ name: 'homeUser' }"
      >Перейти до домівки</router-link>
    </app-modal-window>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'

import AppModalWindow from '@/components/ui/AppModalWindow.vue'
import AppPreloader from '@/components/ui/AppPreloader.vue'

export default {
  components: {
    AppModalWindow,
    AppPreloader,
  },
  props: {
    show: {
      type: Boolean,
      required: true,
      default: () => false,
    },
    groupsList: {
      type: Array,
      required: true,
      default: () => [],
    },
  },
  computed: {
    ...mapGetters({
      groups: 'groups/list',
      alert: 'alert/alert',
    }),
  },
  data() {
    return {
      showPreloader: false,
    }
  },
  methods: {
    ...mapActions({
      getGroupsByIDs: 'groups/get',
    }),
    async checkCurrentState() {
      const { show, groupsList } = this

      if (show) {
        this.showPreloader = true

        await this.getGroupsByIDs(groupsList)

        this.showPreloader = false
      }
    },
  },
  watch: {
    async show() {
      this.checkCurrentState()
    },
  },
  created() {
    this.checkCurrentState()
  },
}
</script>

<style lang="less" scoped>
.app-ask-subject {
  .title, .content {
    width: 100vw;
    max-width: 500px;
  }

  .title {
    font-size: 1.3em;
    border-bottom: 1px solid var(--color-bg-main);
    padding: 20px;
  }

  .content {
    .no-subjects {
      font-size: 1.3em;
      color: var(--color-font-dark);
      text-align: center;
      margin: 40px 20px;
    }

    .subject {
      padding: 20px;
      cursor: pointer;
      user-select: none;

      &:hover {
        background: var(--color-bg-main);
      }

      .name {
        font-size: 1.3em;
        margin-bottom: 5px;
        font-weight: 400;
      }

      .additional {
        color: var(--color-font-dark);
      }
    }
  }

  .leave {
    width: 100%;
    padding: 20px;
    font-size: 1em;
    display: block;
    text-align: center;

    border: 0;
    border-top: 1px solid var(--color-bg-main);
    background: transparent;
    color: var(--color-font-dark) !important;
    cursor: pointer;

    &:hover {
      background: var(--color-bg-main);
    }
  }
}
</style>
