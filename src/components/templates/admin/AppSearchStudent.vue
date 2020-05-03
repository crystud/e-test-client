<template>
  <div
    class="app-search-student"
    :class="{
      'selected': isSelected,
      'unselected': !isSelected,
    }"
  >
    <div class="image">
      <img
        src="https://www.thispersondoesnotexist.com/image"
        alt="student profile image from search results"
      />
    </div>

    <div class="data">
      <div class="name">{{user.lastName}} {{user.firstName}} {{user.patronymic}}</div>
      <div class="last-visit">E-mail: {{user.email}}</div>
    </div>

    <div
      class="toggle-btn"
      @click="$emit('addStudent')"
      v-if="!isSelected"
    >
      <font-awesome-icon
        :icon="isSelected ? 'user-times' : 'user-plus'"
        class="icon"
      ></font-awesome-icon>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    isSelected: {
      type: Boolean,
      required: true,
      default: () => false,
    },
    user: {
      type: Object,
      required: true,
      default: () => {},
    },
  },
}
</script>

<style lang="less" scoped>
.app-search-student {
  display: grid;
  grid-template-columns: 80px 1fr;
  grid-gap: 10px;
  align-items: center;

  background: var(--color-bg-main);
  border-radius: 10px;

  position: relative;

  .image {
    width: 80px;
    height: 80px;
    overflow: hidden;
    border-radius: 10px;

    img {
      width: 100%;
    }
  }

  .data {
    .name {
      font-size: 1.2em;
      margin-bottom: 5px;
    }

    .last-visit {
      color: var(--color-font-dark);
    }
  }

  &.selected {
    .toggle-btn {
      background: #DD3223;
    }
  }

  &.unselected {
    .toggle-btn {
      background: #1ED6BA;
    }
  }

  .toggle-btn {
    position: absolute;
    bottom: 0;
    right: 0;

    width: 50px;
    height: 50px;

    border-radius: 50px 0 10px 0;
    cursor: pointer;

    .icon {
      margin-left: 20px;
      margin-top: 20px;
    }

    &, .icon {
      transition: all .2s;
    }

    &:hover {
      width: 60px;
      height: 60px;

      .icon {
        margin-left: 25px;
        margin-top: 25px;
      }
    }
  }

  @media screen and (max-width: 600px) {
    grid-template-columns: 1fr;
    padding: 30px;
    text-align: center;

    .image {
      width: 100%;
      height: 100%;
      max-width: 150px;
      max-height: 150px;

      margin: 0 auto;
    }
  }
}
</style>
