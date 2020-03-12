<template>
  <div class="app-question">
    <app-image
      src="https://one.kr.ua/images/16x9/%D0%BC%D0%B5%D0%BC_.png"
      alt="question image"
      :width="200"
      :height="200"
      v-if="Math.random() > 0.5"
      class="image"
    ></app-image>

    <div class="content">
      <div class="title">Запитання</div>

      <div class="text">
        Lorem ipsum dolor sit amet consectetur, adipisicing elit.
        Non tempora et voluptatibus distinctio architecto expedita
        cum iste magnam. Temporibus alias, assumenda officia totam
        a nisi eum molestiae quis deleniti id?
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

    .title {
      font-size: .95em;
      color: var(--color-font-dark);
    }

    .text {
      font-size: 1.1em;
      margin-top: 5px;
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
