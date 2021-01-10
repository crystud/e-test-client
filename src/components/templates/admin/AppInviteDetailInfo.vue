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
        <div class="avatar section-image">
          <img
            :src="info.student.user.avatar
              ? `data:image/png;base64,${info.student.user.avatar}`
              : require('@/assets/no_user.png')"
          />

          <div
            class="qr-code-image"
            :class="{
              show: qrCode.show,
            }"
          >
            <img
              :src="qrCode.data"
              @click="qrCode.show = false"
            />
          </div>
        </div>

        <app-button
          appearance="neutral"
          class="generate-qr-code"
          v-if="!info.usedAt"
          :class="{
            hidden: !Boolean(qrCode.show === false && !info.usedAt),
          }"
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

      QRCode.toDataURL(inviteURL, (err, data) => {
        if (err) {
          return this.setAlert({
            title: 'Не вдалось згенерувати Qr-код',
            show: true,
            isSuccess: false,
          })
        }

        this.qrCode = {
          show: true,
          data,
        }

        return false
      })
    },
  },
  data() {
    return {
      qrCode: {
        show: false,
        data: '',
      },
    }
  },
  watch: {
    info() {
      this.qrCode.show = false
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

      .section-image {
        position: relative;
        border-radius: 10px;
        overflow: hidden;
      }

      .section-image img,
      .generate-qr-code,
      img {
        width: 180px;
        display: block;
      }

      .qr-code-image {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;

        background: rgba(0, 0, 0, 0);

        display: flex;
        justify-content: center;
        align-items: center;

        &, img {
          transition: all .2s;
        }

        img {
          border-radius: 10px;
          max-width: 80%;
          max-height: 80%;
          cursor: pointer;

          opacity: 0;
          transform: scale(.7) rotate(20deg);
        }

        &.show {
          background: rgba(0, 0, 0, .6);

          img {
            opacity: 1;
            transform: scale(1) rotate(0deg);
          }
        }
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
        max-width: 100%;

        margin-top: 10px;
        transition: all .3s;

        .icon {
          margin-right: 10px;
        }

        &.hidden {
          opacity: .7;
          color: var(--color-font-dark);
          cursor: default;
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
