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
      <div class="name">Студент студентович</div>
      <div class="last-visit">активний 03.02.2020 14:45</div>
    </div>

    <div class="toggle-btn">
      <font-awesome-icon
        icon="user-times"
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

    .icon {
      margin-left: 20px;
      margin-top: 20px;
    }

    transition: all .3s;
  }
}
</style>
