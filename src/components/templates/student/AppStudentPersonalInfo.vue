<template>
  <app-user-card class="app-student-info">
    <div class="profile-image">
      <img
        src="https://www.thispersondoesnotexist.com/image"
        alt="student profile image"
      />
    </div>

    <div class="info">
      <div class="name">Прізвищевич Студент Студентович</div>
      <div class="last-visit">Остання активність: 37 хвилин тому</div>

      <div class="additional">
        <div class="item">
          <div class="property">Номер залiкової книжки</div>
          <div class="value">1212</div>
        </div>

        <div class="item">
          <div class="property">Номер за списком факультету</div>
          <div class="value">12</div>
        </div>
      </div>
    </div>
  </app-user-card>
</template>

<script>
import AppUserCard from './AppUserCard.vue'

export default {
  name: 'AppStudentPersonalInfo',
  components: {
    AppUserCard,
  },
}
</script>

<style lang="less" scoped>
@profile-image-size: 150px;

.app-student-info {
  display: grid;
  grid-template-columns: @profile-image-size 1fr;
  grid-gap: 20px;
  align-items: center;

  .profile-image {
    width: @profile-image-size;
    height: @profile-image-size;
    overflow: hidden;
    border-radius: 50%;

    img {
      width: 100%;
    }
  }

  .info {
    font-weight: 100;

    .name {
      font-size: 1.3em;
    }

    .last-visit {
      color: var(--color-font-dark);
      margin-top: 5px;
    }

    .additional {
      margin-top: 20px;
      font-weight: 100;

      .item {
        margin-bottom: 10px;
        display: grid;
        align-items: center;

        grid-template-columns: 1fr 100px;

        .property {
          color: var(--color-font-dark);
        }

        .value {
          color: var(--color-font-main);
        }
      }
    }
  }
}
</style>
