<template>
  <div class="college-request">
    <app-alert
      :isSuccess="alert.isSuccess"
      :title="alert.title"
      :show="alert.show"
      :text="alert.text"
      :delay="alert.delay"
      @close="alert.show = false"
    ></app-alert>

    <div class="request-form">
      <h1>Створення навчального закладу</h1>

      <app-edbo-colleges
        :show="showColleges"
        :query="query"
        @close="showColleges = false"
        @selected="selected"
      ></app-edbo-colleges>

      <div v-show="!collegeID">
        <app-input
          placeholder="Назва вашого навчального закладу..."
          appearance="secondary"
          @change="value => query = value"
          class="name"
        ></app-input>

        <div class="submit-btn mt">
          <app-button
            class="app-button"
            appearance="neutral"
            @click="showColleges = true"
          >
            <font-awesome-icon icon="search"></font-awesome-icon>
            <span class="text">Шукати</span>
          </app-button>
        </div>
      </div>

      <div v-show="collegeID">
        <div
          class="back-to-search"
          @click="collegeID = 0; showEdboData = false"
        >
          <font-awesome-icon icon="chevron-left"></font-awesome-icon>
          <span class="text">Назад до пошуку</span>
        </div>

        <app-edbo-data
          :show="showEdboData"
          :collegeID="collegeID"
          @data="data => edboData = data"
          class="edbo-data"
        ></app-edbo-data>

        <app-text-area
          placeholder="Додаткова інформація про навчальний заклад (опціонально)"
          class="additional-info"
          @change="value => additional = value"
        ></app-text-area>

        <div class="submit-btn">
          <app-button
            class="app-button"
            appearance="neutral"
            @click="sendRequest"
          >Надіслати</app-button>
        </div>
      </div>
    </div>

    <div class="tips">
      <app-tip-card class="header-tip">
        Навіщо мені цей процес?
      </app-tip-card>

      <app-tip-card>
        Після процесу реєстрації НЗ ви
        зможете занести учнів або студентів,
        що навчаються, використовуючи базу ЄДЕБО.
      </app-tip-card>

      <app-tip-card>
        Під час створення навчального закладу
        вам потрібно вказати його назву, після
        чого обрати Ваш навчальний заклад, зі
        списку, що буде отримано від ЄДЕБО.
      </app-tip-card>

      <app-tip-card>
        Після відправлення форми, вам
        потрібно буде підтвердити, що
        саме ви являєтесь адміністрацією
        даного коледжу через лист, що буде
        надіслано вам на електронну пошту
        вашого НЗ.
      </app-tip-card>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex'

import AppEdboData from '@/components/templates/admin/AppEdboData.vue'
import AppTipCard from '@/components/templates/admin/AppTipCard.vue'
import AppInput from '@/components/ui/AppInput.vue'
import AppTextArea from '@/components/ui/AppTextArea.vue'
import AppButton from '@/components/ui/AppButton.vue'
import AppEdboColleges from '../../components/templates/admin/AppEdboColleges.vue'
import AppAlert from '../../components/ui/AppAlert.vue'

export default {
  components: {
    AppTipCard,
    AppInput,
    AppAlert,
    AppEdboColleges,
    AppEdboData,
    AppTextArea,
    AppButton,
  },
  data() {
    return {
      query: '',
      showColleges: false,
      showEdboData: false,
      collegeID: 0,
      edboData: {},
      additional: '',
      alert: {
        title: '',
        text: '',
        delay: 3000,
        isSuccess: false,
        show: false,
      },
    }
  },
  methods: {
    ...mapActions({
      sendCollegeRequest: 'college/sendRequest',
    }),
    sendRequest() {
      const {
        additional,
        edboData: {
          university_short_name: name,
          university_email: email,
          region_name_u: region,
          koatuu_name_u: city,
          university_address_u: street,
          university_site: site,
          university_id: EDBO,
        },
      } = this

      const address = `${region}, ${city}, ${street}`

      if (!address) {
        this.alert = {
          title: 'Помилка...',
          isSuccess: false,
          text: 'Адресу навчального закладу не було розпінано. Продовжувати неможливо.',
          show: true,
        }

        return
      }

      if (!name) {
        this.alert = {
          title: 'Помилка...',
          isSuccess: false,
          text: 'Назву не було розпінано. Продовжувати неможливо.',
          show: true,
        }

        return
      }

      if (!email) {
        this.alert = {
          title: 'Помилка...',
          isSuccess: false,
          text: 'E-mail навчального закладу не було розпінано. Продовжувати неможливо.',
          show: true,
        }

        return
      }

      if (!site) {
        this.alert = {
          title: 'Помилка...',
          isSuccess: false,
          text: 'Веб-сайт навчального закладу не було розпінано. Продовжувати неможливо.',
          show: true,
        }

        return
      }

      if (!EDBO) {
        this.alert = {
          title: 'Помилка...',
          isSuccess: false,
          text: 'Код навчального закладу у ЄДЕБО не було розпізнано. Продовжувати неможливо.',
          show: true,
        }

        return
      }

      this.showPreloader = true

      this.sendCollegeRequest({
        address,
        email,
        name,
        site,
        EDBO,
        additional,
      }).then(() => {
        this.alert = {
          title: 'Заявку надіслано!',
          text: 'Вітаємо! Заявку на приєднання до "CRYSTUD E-test enviroment" було надіслано. Очікуйте. Вашу заявку буде розглянуто',
          isSuccess: true,
          delay: 5000,
          show: true,
        }
      }).catch(() => {
        this.alert = {
          title: 'Помилка...',
          text: 'Не вдалось надіслати заявку на приєднання до "CRYSTUD E-test enviroment"',
          isSuccess: false,
          delay: 3000,
          show: true,
        }
      }).finally(() => {
        this.showPreloader = false
      })
    },
    selected(id) {
      this.showColleges = false
      this.showEdboData = true

      this.collegeID = id
    },
  },
}
</script>

<style lang="less" scoped>
.college-request {
  display: grid;
  grid-template-columns: 5fr 3fr;
  grid-gap: 20px;

  .mt {
    margin-top: 20px;

    .text {
      margin-left: 10px;
    }
  }

  .request-form {
    background: var(--color-bg-dark);
    color: #fff;
    padding: 20px;

    border-radius: 10px;

    h1 {
      margin-bottom: 30px;
      font-weight: 100;
      font-size: 1.5em;

      color: var(--color-font-main);
    }

    .back-to-search {
      cursor: pointer;
      display: flex;
      align-items: center;

      .text {
        margin-left: 10px;
      }

      &:hover {
        text-decoration: underline;
      }
    }

    .name {
      background: var(--color-bg-main);
    }

    .edbo-data {
      margin: 20px 0;
    }

    .additional-info {
      margin-bottom: 20px;
    }

    .submit-btn {
      display: flex;
      justify-content: flex-end;

      .app-button {
        background: #1BC388;
        color: #fff;
      }
    }
  }

  .tips {
    .tip {
      margin-bottom: 15px;
    }

    .header-tip {
      font-weight: 400;
      font-size: 1.2em;
    }
  }

  @media screen and (max-width: 730px) {
    grid-template-columns: 1fr;
  }
}
</style>
