<template>
  <app-modal-window
    :show="Boolean(info.id)"
    class="app-invite-detail-info"
    :noPaddings="true"
  >
    <div class="header">
      <div class="text">
        Інформація про запрошення №{{info.id}}
      </div>

      <div
        class="close"
        @click="$emit('close')"
      >
        <font-awesome-icon
          icon="times-circle"
        ></font-awesome-icon>
      </div>
    </div>

    <div
      v-if="info.id"
      class="info"
    >
      <div class="avatar-section">
        <div
          v-if="qrCode === null"
          class="avatar section-image"
        >
          <img
            :src="info.student.user.avatar
              ? `data:image/png;base64,${info.student.user.avatar}`
              : require('@/assets/no_user.png')"
          />
        </div>

        <div
          v-if="qrCode"
          class="section-image"
        >
          <img
            :src="qrCode"
            @click="qrCode = null"
          />
        </div>

        <app-button
          appearance="neutral"
          v-if="qrCode === null && !info.usedAt"
          class="generate-qr-code"
          @click="generateQRCode"
        >
          <font-awesome-icon
            class="icon"
            icon="qrcode"
          ></font-awesome-icon>

          <span>Згенерувати QR-код</span>
        </app-button>
      </div>

      <div class="info-section">
        <div class="student">
          {{info.student.user.lastName}}
          {{info.student.user.firstName}}
          {{info.student.user.patronymic}}
        </div>

        <div class="used-at">
          <div
            v-if="info.usedAt !== null"
            class="used"
          >
            Запрошення використано {{$moment(info.usedAt).utc(true).format('Do MMMM YYYY, HH:mm')}}
          </div>

          <div
            v-else
            class="awaiting"
          >
            <font-awesome-icon icon="user-clock"></font-awesome-icon>

            <span>Запрошення ще не було використано</span>
          </div>
        </div>

        <app-data-list
          :data="[
            ['Номер залікової книги', info.student.scoringBook],
            ['Група', info.student.group.name || '-'],
            [
              'Створено',
              info.createAt ? $moment(info.createAt).format('Do MMMM YYYY, HH:mm') : '-'
            ],
          ]"
        ></app-data-list>
      </div>
    </div>

    <div class="code">
      <span class="label">Код запрошення</span>
      <span class="value">{{info.code}}</span>
    </div>
  </app-modal-window>
</template>

<script>
import { mapActions } from 'vuex'
import QRCode from 'qrcode'

import AppModalWindow from '@/components/ui/AppModalWindow.vue'
import AppDataList from '@/components/ui/AppDataList.vue'
import AppButton from '@/components/ui/AppButton.vue'

export default {
  methods: {
    ...mapActions({
      setAlert: 'alert/set',
    }),
    generateQRCode() {
      const { info } = this

      const inviteURL = `${global.window.origin}/join/invite/qrcode/${info.code}`

      QRCode.toDataURL(inviteURL, (err, url) => {
        if (err) {
          return this.setAlert({
            title: 'Не вдалось згенерувати Qr-код',
            show: true,
            isSuccess: false,
          })
        }

        this.qrCode = url

        return false
      })
    },
  },
  data() {
    return {
      qrCode: null,
    }
  },
  watch: {
    info() {
      this.qrCode = null
    },
  },
  props: {
    info: {
      type: Object,
      required: true,
      default: () => {},
    },
  },
  components: {
    AppModalWindow,
    AppDataList,
    AppButton,
  },
}
</script>

<style lang="less" scoped>
.app-invite-detail-info {
  .header,
  .info,
  .code {
    padding: 20px;

    max-width: 550px;
    width: 100%;
  }

  .header {
    display: grid;
    grid-template-columns: 1fr auto;
    grid-gap: 20px;

    align-items: center;

    border-bottom: 1px solid var(--color-bg-main);
    font-size: 1.1em;

    .text {
      color: var(--color-font-dark);
    }

    .close {
      color: var(--color-accent-red);
      cursor: pointer;
    }
  }

  .info {
    display: grid;
    grid-template-columns: auto 1fr;
    grid-gap: 20px;

    @media screen and (max-width: 580px) {
      grid-template-columns: 1fr;

      .avatar-section {
        text-align: center;
      }
    }

    .avatar-section {
      text-align: center;

      .section-image img,
      .generate-qr-code {
        max-width: 200px;
      }

      .section-image img {
        border-radius: 10px;
      }

      .qr-code {
        cursor: pointer;

        img {
          margin-top: 10px;
          width: 100%;
        }
      }

      .generate-qr-code {
        background: var(--color-bg-main);
        border-radius: 5px;
        border: 0;

        cursor: pointer;
        color: var(--color-accent-green);
        font-size: 1em;
        padding: 10px;
        width: 100%;

        margin-top: 10px;

        .icon {
          margin-right: 10px;
        }
      }
    }

    .student {
      font-size: 1.3em;
      font-weight: bold;
    }

    .used-at {
      margin-top: 10px;

      .used {
        color: var(--color-accent-green);
      }

      .awaiting {
        color: var(--color-accent-orange);

        span {
          margin-left: 5px;
        }
      }
    }
  }

  .code {
    border-top: 1px solid var(--color-bg-main);

    display: flex;
    justify-content: space-between;

    .label {
      color: var(--color-font-dark);
    }

    .value {
      color: var(--color-accent-green);
      font-weight: bold;
    }
  }
}
</style>
