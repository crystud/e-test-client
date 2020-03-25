<template>
  <div class="app-students">
    <div class="search-bar">
      <input
        type="text"
        placeholder="Пошук студентів..."
      />

      <app-select
        class="select"
        label="Спеціальність"
        :values="values"
      ></app-select>

      <app-button
        appearance="neutral"
        class="btn"
      >
        <font-awesome-icon
          icon="search"
        ></font-awesome-icon>
      </app-button>
    </div>

    <div class="students">
      <app-user-item
        v-for="i in 17"
        v-bind:key="i"
        class="user"
      ></app-user-item>
    </div>
  </div>
</template>

<script>
import AppButton from '@/components/ui/AppButton.vue'
import AppSelect from '@/components/ui/AppSelect.vue'

import AppUserItem from '@/components/templates/admin/AppUserItem.vue'

export default {
  name: 'students',
  components: {
    AppButton,
    AppSelect,
    AppUserItem,
  },
  data() {
    return {
      values: [
        { value: '121', label: 'Інженерія програмного забезпечення' },
        { value: '122', label: 'Модельєри' },
        { value: '123', label: 'Автоматизація' },
      ],
    }
  },
}
</script>

<style lang="less" scoped>
.app-students {
  .search-bar {
    display: grid;
    grid-template-columns: 1fr 250px 80px;

    background: var(--color-bg-dark);
    border-radius: 10px;

    input {
      background: transparent;
      border: 0;
      font-size: 1em;

      padding: 20px;

      color: var(--color-font-main);

      &::placeholder {
        color: var(--color-font-dark);
        font: 1em 'Exo 2', 'Lato', Arial;
      }
    }

    .borderLeft {
      border-left: 1px solid var(--color-bg-light);
    }

    .select, .btn {
      .borderLeft();
    }

    .btn {
      background: transparent;
      padding: 0;
      color: var(--color-font-dark);
      border-radius: 0;
    }
  }

  .students {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    grid-gap: 20px;

    margin-top: 20px;

    .user {
      background: var(--color-bg-dark) !important;
    }
  }

  @media screen and (max-width: 1500px) {
    .students {
      grid-template-columns: 1fr 1fr;
    }
  }

  @media screen and (max-width: 1200px) {
    .students {
      grid-template-columns: 1fr;
    }
  }

  @media screen and (max-width: 1000px) {
    .students {
      grid-template-columns: 1fr 1fr;
    }
  }

  @media screen and (max-width: 650px) {
    .students {
      grid-template-columns: 1fr;
    }
  }

  @media screen and (max-width: 600px) {
    .search-bar {
      grid-template-columns: 1fr;

      .borderTop {
        border-top: 1px solid var(--color-bg-light);
      }

      .select, .btn {
        border-left: 0;
        padding: 20px;
      }

      .btn, .select {
        .borderTop();
      }
    }
  }
}
</style>
