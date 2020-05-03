<template>
  <div class="app-question">
    <app-image
      src="https://one.kr.ua/images/16x9/%D0%BC%D0%B5%D0%BC_.png"
      alt="question image"
      :width="200"
      :height="200"
      v-if="false"
      class="image"
    ></app-image>

    <div class="content">
      <div class="title">Запитання</div>

      <div class="text">
        <div class="base">{{question.ask}}</div>

        <div
          class="additional"
          v-if="question.description"
        >Додатково: {{question.description}}</div>
      </div>
    </div>
  </div>
</template>

<script>
import AppImage from '@/components/ui/AppImage.vue'

export default {
  name: 'AppQuestion',
  components: {
    AppImage,
  },
  props: {
    question: {
      type: Object,
      required: true,
    },
  },
}
</script>

<style lang="less" scoped>
.app-question {
  display: flex;
  justify-content: flex-start;

  .image {
    margin-right: 10px;
  }

  .content {
    color: var(--color-font-main);
    background: var(--color-bg-dark);
    border-radius: 10px;
    box-shadow: 0px 0px 20px rgba(0, 0, 0, 0.2);
    padding: 20px;

    width: 100%;

    .title {
      font-size: .95em;
      color: var(--color-font-dark);
    }

    .text {
      margin-top: 15px;
    }

    .base {
      font-size: 1.3em;
    }

    .additional {
      margin-top: 5px;
      color: var(--color-font-dark);
    }
  }

  @media screen and (max-width: 580px) {
    flex-direction: column;

    .image {
      margin: 30px auto 10px;
    }
  }
}
</style>
