<template>
  <div class="app-ask-college">
    <app-preloader :show="showPreloader"></app-preloader>

    <app-modal-window
      :show="show && fetched"
      :noPaddings="true"
      class="modal"
    >
      <div class="content">
        <div class="title">Оберіть навчальний заклад для редагування</div>

        <div class="list">
          <div class="subtitle">К-сть коледжів, які ви можете редагувати - {{colleges.length}}</div>

          <div class="colleges">
            <div
              v-for="(college, index) in colleges"
              v-bind:key="index"
              class="college"
              @click="$emit('selected', college)"
            >
              <div class="name">{{college.name}}</div>
              <div class="email">{{college.email}}</div>
            </div>
          </div>
        </div>
      </div>
    </app-modal-window>
  </div>
</template>

<script>
import { mapActions } from 'vuex'

import AppModalWindow from '../../ui/AppModalWindow.vue'
import AppPreloader from '../../ui/AppPreloader.vue'

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
  },
  data() {
    return {
      fetched: false,
      showPreloader: true,
      colleges: [],
    }
  },
  methods: {
    ...mapActions({
      getEditableColleges: 'college/editable',
    }),
  },
  created() {
    this.getEditableColleges().then((data) => {
      this.showPreloader = false

      if (data.length === 1) {
        this.$emit('selected', data[0])
      } else {
        this.fetched = true
        this.colleges = data
      }
    }).catch(() => {
      this.showPreloader = false
    })
  },
}
</script>

<style lang="less" scoped>
.app-ask-college {
  .title {
    padding: 20px;
    text-align: center;
    font-size: 1.2em;
    color: var(--color-font-main);
    border-bottom: 1px solid var(--color-bg-main);
  }

  .list {
    text-align: left;

    .subtitle,
    .college {
      padding: 10px 20px;
    }

    .subtitle {
      color: var(--color-font-dark);
    }

    .colleges {
      max-height: 60vh;
      overflow-y: auto;

      .college {
        padding: 20px;
        cursor: pointer;
        transition: none;

        &:hover {
          background: var(--color-bg-main);
        }

        .name {
          font-size: 1.2em;
          color: var(--color-font-main);
        }

        .email {
          margin-top: 5px;
          color: var(--color-font-dark);
        }
      }
    }
  }
}
</style>
