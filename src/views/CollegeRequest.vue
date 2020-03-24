<template>
  <div class="college-request">
    <div class="request-form">
      <h1>Створення навчального закладу</h1>

      <app-input
        placeholder="Назва навчального закладу..."
        appearance="secondary"
        class="name"
      ></app-input>

      <app-edbo-data
        class="edbo-data"
      ></app-edbo-data>

      <app-warning-card>
        Вам було надіслано email лист.
        Слідкуйте інструкціям в ньому.
      </app-warning-card>

      <app-text-area
        placeholder="Додаткова інформація про навчальний заклад (опціонально)"
        class="additional-info"
      ></app-text-area>

      <div class="submit-btn">
        <app-button
          class="app-button"
          appearance="neutral"
        >Надіслати</app-button>
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
import AppEdboData from '@/components/templates/admin/AppEdboData.vue'
import AppTipCard from '@/components/templates/admin/AppTipCard.vue'
import AppInput from '@/components/ui/AppInput.vue'
import AppWarningCard from '@/components/ui/AppWarningCard.vue'
import AppTextArea from '@/components/ui/AppTextArea.vue'
import AppButton from '@/components/ui/AppButton.vue'

export default {
  components: {
    AppTipCard,
    AppInput,
    AppEdboData,
    AppWarningCard,
    AppTextArea,
    AppButton,
  },
}
</script>

<style lang="less" scoped>
.college-request {
  display: grid;
  grid-template-columns: 5fr 3fr;
  grid-gap: 20px;

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

    .name {
      background: var(--color-bg-main);
    }

    .edbo-data {
      margin: 20px 0;
    }

    .additional-info {
      margin: 20px 0;
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
