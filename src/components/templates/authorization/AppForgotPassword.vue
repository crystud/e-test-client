<template>
  <div class="forgot-password">
    <h2>Відновлення паролю</h2>

    <app-input
      type="text"
      placeholder="E-mail"
      appearance="bottom-border-highlight"
      class="app-form-field"
    ></app-input>

    <div class="instructions">
      Ми надішлемо Вам електронний лист із
      подальшими інструкціями щодо відновлення.
    </div>

    <app-button
      class="submit-btn"
      @click="$router.push('/restore')"
    >Надіслати</app-button>
  </div>
</template>

<script>
import AppInput from '@/components/ui/AppInput.vue'
import AppButton from '@/components/ui/AppButton.vue'

export default {
  name: 'authorization',
  components: {
    AppInput,
    AppButton,
  },
}
</script>

<style lang="less" scoped>
.forgot-password {
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;

  h2 {
    color: #fff;
    margin-bottom: 30px;
    font-weight: 300;
    text-align: center;
  }

  .app-form-field {
    margin-bottom: 20px;

    input {
      color: #fff !important;
    }
  }

  .submit-btn {
    display: inline-block;
    margin: 0 auto;
  }

  .instructions {
    margin-bottom: 20px;
    color: #5C6976;
    opacity: .65;
  }
}
</style>
