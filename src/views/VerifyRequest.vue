<template>
  <div class="verify-request">
    <div class="header card">
      <div class="name">Коломийський політехнічний коледж</div>
      <div class="date">Надіслано 26 червня 2020 о 17:45</div>
    </div>

    <div class="requester-info card">
      <div class="title">Основна інформація</div>

      <app-data-list
        :data="[
          ['Директор', 'Ляшеник Андрій Васильович'],
          ['Отримано від', 'Ляшеник Андрій Васильович'],
          ['Веб-сайт', 'kpk-lp.com.ua'],
          ['Код закладу', '428'],
          ['E-mail', 'polynet100@gmail.com'],
        ]"
      ></app-data-list>

      <div class="additional">
        <div class="label">Додатково</div>

        <div>
          Lorem ipsum dolor sit amet
          consectetur adipisicing elit.
          Libero nobis dolorem, quae minima
          facere quos? Quos hic eius omnis
          impedit aspernatur cupiditate fugiat.
          Inventore voluptate deserunt velit,
          fuga est obcaecati.
        </div>
      </div>

      <div class="desicion-btn">
        <app-button
          appearance="brand"
          @click="showDecisionModal = true"
        >Винести рішення</app-button>
      </div>
    </div>

    <div class="attached-files card">
      <div class="title">Прикріплені файли</div>

      <div
        class="file"
        v-for="(file, index) in attachedFiles"
        v-bind:key="index"
      >
        <div class="icon">
          <font-awesome-icon icon="file"></font-awesome-icon>
        </div>

        <div class="name">{{file}}</div>
      </div>
    </div>

    <app-desicion-modal
      :show="showDecisionModal"
      @close="showDecisionModal = false"
    ></app-desicion-modal>
  </div>
</template>

<script>
import AppDataList from '../components/ui/AppDataList.vue'
import AppButton from '../components/ui/AppButton.vue'
import AppDesicionModal from '../components/templates/superadmin/AppDesicionModal.vue'

export default {
  components: {
    AppDataList,
    AppButton,
    AppDesicionModal,
  },
  data() {
    return {
      showDecisionModal: false,
      attachedFiles: [
        'Основні документи.pdf',
        'Чорна бухгалтерія.pdf',
        'Куди йдуть нб.txt',
      ],
    }
  },
}
</script>

<style lang="less" scoped>
.verify-request {
  display: grid;

  grid-template-areas: 'header header' 'requester attached';
  grid-template-columns: 2fr 1fr;
  grid-gap: 15px;

  @media screen and (max-width: 700px) {
    grid-template-columns: 1fr;
    grid-template-areas: 'header' 'requester' 'attached';
  }

  .card {
    background: var(--color-bg-dark);
    padding: 25px;
    border-radius: 10px;

    .title {
      font-size: 1.3em;
    }
  }

  .header {
    grid-area: header;

    .name {
      font-size: 1.5em;
      color: var(--color-font-main);
    }

    .date {
      margin-top: 5px;
      color: var(--color-font-dark);
    }
  }

  .requester-info {
    grid-area: requester;

    .additional {
      .label {
        color: var(--color-font-dark);
        margin-bottom: 5px;
      }
    }

    .desicion-btn {
      display: flex;
      justify-content: flex-end;

      margin-top: 40px;
    }
  }

  .attached-files {
    grid-area: attached;

    .file {
      margin-top: 15px;
      background: var(--color-bg-main);
      padding: 15px;
      border-radius: 10px;

      display: grid;
      grid-template-columns: auto 1fr;

      position: relative;

      &::before {
        content: "";

        display: block;
        width: 2px;
        height: 30%;

        background: #1ED6BA;
        border-radius: 5px;

        position: absolute;
        top: 0;
        left: 0;
        bottom: 0;
        margin: auto;
      }

      .icon {
        text-align: center;
        color: var(--color-font-dark);

        margin-right: 10px;
      }
    }
  }
}
</style>
