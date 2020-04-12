<template>
  <div
    class="app-edbo-data"
    v-show="show"
  >
    <app-preloader :show="showPreloader"></app-preloader>

    <app-alert
      :isSuccess="alert.isSuccess"
      :title="alert.title"
      :show="alert.show"
      :text="alert.text"
      :delay="alert.delay"
      @close="alert.show = false"
    ></app-alert>

    <div class="title">Дані ЄДЕБО</div>

    <div class="data">
      <app-data-list
        class="list"
        :data="getVisibleData()"
      ></app-data-list>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex'

import AppDataList from '../../ui/AppDataList.vue'
import AppPreloader from '../../ui/AppPreloader.vue'
import AppAlert from '../../ui/AppAlert.vue'

export default {
  components: {
    AppDataList,
    AppPreloader,
    AppAlert,
  },
  props: {
    show: {
      type: Boolean,
      required: true,
      default: () => false,
    },
    collegeID: {
      type: Number,
      required: true,
      default: () => null,
    },
  },
  data() {
    return {
      showPreloader: false,
      data: {},
      alert: {
        title: '',
        text: '',
        isSuccess: false,
        delay: 3000,
        show: false,
      },
    }
  },
  watch: {
    async show() {
      const { show, collegeID } = this

      if (show && collegeID) {
        this.showPreloader = true

        this.getData(collegeID).then((data) => {
          this.showPreloader = false
          this.data = data

          this.$emit('data', data)
        }).catch(() => {
          this.showPreloader = false

          this.alert = {
            title: 'Помилка...',
            text: 'Нам не вдалось отримати дані про ваш НЗ з ЄДЕБЕО...',
            isSuccess: false,
            delay: 3000,
            show: true,
          }
        })
      }
    },
  },
  methods: {
    ...mapActions({
      getData: 'edbo/getData',
    }),
    getVisibleData() {
      const {
        data: {
          university_short_name: name,
          university_name: fullName,
          university_director_fio: director,
          university_site: website,
          university_email: email,
          university_phone: phone,
          university_address: address,
          koatuu_name: location,
          university_type_name: type,
          education_type_name: look,
        },
      } = this

      const visibleData = []

      if (fullName || name) {
        visibleData.push(['Назва коледжу', fullName || name])
      }

      if (director) {
        visibleData.push(['Директор', director])
      }

      if (email) {
        visibleData.push(['E-mail', email])
      }

      if (website) {
        visibleData.push(['Веб-сайт', website])
      }

      if (phone) {
        visibleData.push(['Телефон', phone])
      }

      if (address) {
        visibleData.push(['Адреса', address])
      }

      if (location) {
        visibleData.push(['Місцезнаходження', location])
      }

      if (type) {
        visibleData.push(['Тип закладу', type])
      }

      if (look) {
        visibleData.push(['Вид закладу', look])
      }

      return visibleData
    },
  },
}
</script>

<style lang="less" scoped>
.app-edbo-data {
  .title {
    font-size: 1.2em;
    color: var(--color-font-dark);

    margin-bottom: 10px;
  }

  .data {
    border: 1px solid var(--color-bg-main);
    border-left: 0;
    border-right: 0;

    .list {
      margin: 15px 0;
    }
  }
}
</style>
