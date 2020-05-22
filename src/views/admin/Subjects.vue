<template>
  <div class="app-specialtys">
    <app-alert
      :title="alert.title"
      :text="alert.text"
      :delay="alert.delay"
      :isSuccess="alert.isSuccess"
      :show="alert.show"
      @close="alert.show = false"
    ></app-alert>

    <app-preloader :show="showPreloader"></app-preloader>

    <app-edit-subject
      :show="Boolean(editingSubject.id)"
      :subject="editingSubject"
      @close="editingSubject = {}"
    ></app-edit-subject>

    <app-create-subject
      :show="showCreateSubject"
      @close="showCreateSubject = false"
      @created="created"
    ></app-create-subject>

    <app-fade-card
      class="header"
      :show="!editingSubject.id"
    >
      <app-create-button @click="showCreateSubject = true">Створити предмет</app-create-button>
    </app-fade-card>

    <div
      v-if="!subjects.length"
      class="no-result"
    >Предметів не знайдено...</div>

    <div class="list">
      <app-subject
        v-for="(subject, index) in subjects"
        v-bind:key="index"
        @click="editingSubject = subject"
        :name="subject.name"
        :teachers="subject.teachers.length"
        class="subject"
        :class="{
          selected: editingSubject.id === subject.id,
          faded: editingSubject.id && editingSubject.id !== subject.id,
        }"
      ></app-subject>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'

import AppCreateButton from '@/components/templates/admin/AppCreateButton.vue'
import AppCreateSubject from '@/components/templates/admin/AppCreateSubject.vue'
import AppSubject from '@/components/templates/admin/AppSubject.vue'
import AppEditSubject from '@/components/templates/admin/AppEditSubject.vue'
import AppAlert from '@/components/ui/AppAlert.vue'
import AppPreloader from '@/components/ui/AppPreloader.vue'

import AppFadeCard from '@/components/ui/AppFadeCard.vue'

export default {
  name: 'subjects',
  data() {
    return {
      showCreateSubject: false,
      showPreloader: false,
      editingSubject: {},
      alert: {
        title: '',
        text: '',
        show: false,
        delay: 2000,
        isSuccess: false,
      },
    }
  },
  components: {
    AppCreateButton,
    AppCreateSubject,
    AppEditSubject,
    AppSubject,
    AppAlert,
    AppPreloader,
    AppFadeCard,
  },
  computed: {
    ...mapGetters({
      subjects: 'subjects/subjects',
    }),
  },
  methods: {
    ...mapActions({
      getSubjects: 'subjects/fetch',
    }),
    created({ success }) {
      if (success) {
        this.getSubjects()

        this.alert = {
          title: 'Чудово!',
          text: 'Предмет було створено.',
          isSuccess: true,
        }
      } else {
        this.alert = {
          title: 'Помилка...',
          text: 'На жаль, нам не вдалося створити цей предмет...',
          isSuccess: false,
        }
      }

      this.alert.show = true
      this.alert.delay = 2000

      this.showCreateSubject = false
    },
  },
  async created() {
    this.showPreloader = true

    await this.getSubjects()

    this.showPreloader = false
  },
}
</script>

<style lang="less" scoped>
.app-specialtys {
  .header {
    display: flex;
    justify-content: flex-end;

    font-weight: 300;

    border-bottom: 1px solid var(--color-bg-light);

    padding-bottom: 25px;
    margin-bottom: 25px;

    .title {
      font-size: 1.6em;
      color: var(--color-font-main);
    }

    @media screen and (max-width: 400px) {
      flex-direction: column;
      justify-items: center;

      .title {
        margin-bottom: 10px;
      }
    }
  }

  .no-result {
    text-align: center;
    margin: 40px 0;
    font-size: 2em;
    color: var(--color-font-dark);
  }

  .list {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    grid-gap: 20px;

    margin-top: 20px;

    .subject {
      cursor: pointer;
      opacity: 1;

      transform: scale(1);
      transition: all .15s;

      &.selected {
        transform: scale(1.1);
      }

      &.faded {
        opacity: .5;
      }
    }
  }

  @small: ~"screen and (max-width: 650px)";
  @medium: ~"screen and (max-width: 1300px)";

  @media @medium {
    .list {
      grid-template-columns: 1fr 1fr;
    }
  }

  @media @small {
    .list {
      grid-template-columns: 1fr;
    }
  }
}
</style>
