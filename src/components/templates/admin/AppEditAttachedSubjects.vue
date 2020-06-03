<template>
  <div class="app-edit-attached-subjects">
    <app-preloader :show="showPreloader"></app-preloader>

    <div
      class="speciality"
      v-if="specialityInfo.id"
    >
      <div class="info">
        <div>
          <div class="name">{{specialityInfo.name}}</div>
          <div class="subjects-count">Закріплено предметів: {{specialityInfo.subjects.length}}</div>
        </div>

        <div
          class="close"
          @click="$emit('close')"
        >
          <font-awesome-icon icon="times"></font-awesome-icon>
        </div>
      </div>

      <div class="sections">
        <div class="section global-subjects">
          <div class="title">Предмети в системі</div>

          <div
            v-if="!subjectsList.length"
            class="no-subjects"
          >В системі не створено жодної спеціальності</div>

          <div class="list">
            <div
              v-for="(subject, index) in subjectsList"
              v-bind:key="index"
              class="subject"
            >
              <div class="name">{{subject.name}}</div>

              <app-data-list
                class="app-data-list"
                :data="[
                  ['Вчителів', subject.teachers.length],
                  ['Спеціальностей прикріплено', subject.specialties.length],
                ]"
              ></app-data-list>

              <div
                class="attach-subject"
                @click="attachSubject(subject.id)"
              >Прикріпити предмет до спеціальності</div>
            </div>
          </div>
        </div>

        <div class="section college-subjects">
          <div class="title">Закріплені предмети ({{specialityInfo.subjects.length}})</div>

          <div
            v-if="!specialityInfo.subjects.length"
            class="no-subjects"
          >До спеціальності не прикрілено предметів</div>

          <div class="list">
            <div
              v-for="(subject, index) in specialityInfo.subjects"
              v-bind:key="index"
              class="subject"
            >
              <div class="name">{{subject.name}}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'

import AppDataList from '@/components/ui/AppDataList.vue'
import AppPreloader from '@/components/ui/AppPreloader.vue'

export default {
  methods: {
    ...mapActions({
      getSubjects: 'subjects/fetch',
      attachSubjectAction: 'specialities/attachSubject',
      setAlert: 'alert/set',
      getSpeciality: 'specialities/getByID',
    }),
    async updateSpeciality() {
      const { speciality: { id } } = this

      if (id) {
        try {
          this.showPreloader = true

          this.updatedSpeciality = await this.getSpeciality(id)
        } catch (e) {
          this.setAlert({
            title: 'Помилка',
            text: 'Не вдалось отримати оновлену інформацію про спеціальність',
            show: true,
            isSuccess: false,
          })
        } finally {
          this.showPreloader = false
        }
      }
    },
    async attachSubject(subject) {
      try {
        const { specialityInfo: { id: speciality } = {} } = this

        this.showPreloader = true

        await this.attachSubjectAction({ speciality, subject })
        await this.updateSpeciality()
      } catch (e) {
        this.setAlert({
          title: 'Помилка',
          text: 'Не вдалось прикріпити предмет до спеціальності',
          show: true,
          isSuccess: false,
        })
      } finally {
        this.showPreloader = false
      }
    },
    async loadSubjects() {
      try {
        this.showPreloader = true

        await this.getSubjects()
      } catch (e) {
        this.setAlert({
          title: 'Помилка',
          text: 'Не вдалось отримати список предметів',
          show: true,
          isSuccess: false,
        })
      } finally {
        this.showPreloader = false
      }
    },
  },
  data() {
    return {
      showPreloader: false,
      updatedSpeciality: null,
    }
  },
  watch: {
    show() {
      const { show } = this

      if (show) this.loadSubjects()
    },
  },
  computed: {
    ...mapGetters({
      subjects: 'subjects/subjects',
    }),
    subjectsList() {
      const { subjects, specialityInfo } = this

      const specialitySubjects = specialityInfo.subjects.map(({ id }) => id)

      return subjects.filter(({ id: subjectID }) => !specialitySubjects.includes(subjectID))
    },
    specialityInfo() {
      const { speciality, updatedSpeciality } = this

      return updatedSpeciality || speciality
    },
  },
  props: {
    show: {
      type: Boolean,
      required: true,
    },
    speciality: {
      type: Object,
      required: true,
    },
  },
  components: {
    AppPreloader,
    AppDataList,
  },
}
</script>

<style lang="less" scoped>
.app-edit-attached-subjects {
  .speciality {
    padding: 30px;
    background: var(--color-bg-dark);
    border-radius: 10px;

    .info {
      display: grid;
      grid-template-columns: 1fr auto;
      margin-bottom: 20px;
      align-items: flex-start;

      .name {
        font-size: 1.3em;
        font-weight: bold;
        color: var(--color-font-main);
      }

      .subjects-count {
        margin-top: 5px;
        color: var(--color-font-dark);
      }

      .close {
        font-size: 1.3em;
        cursor: pointer;
        color: var(--color-accent-red);
      }
    }

    .sections {
      display: grid;
      grid-template-columns: 1fr 1fr;
      grid-gap: 30px;

      grid-template-areas: 'global-subjects college-subjects';

      .global-subjects { grid-area: global-subjects }

      .section {
        .title {
          color: var(--color-font-dark);
          margin-bottom: 20px;
        }

        .list {
          display: grid;
          grid-template-columns: 1fr 1fr;
          grid-gap: 10px;

          @media screen and (max-width: 1650px) {
            grid-template-columns: 1fr;
          }

          .subject {
            background: var(--color-bg-main);
            padding: 15px;
            border-radius: 10px;

            .name {
              font-size: 1.2em;
              margin-bottom: 10px;
            }

            .app-data-list {
              margin: 0;
            }

            .attach-subject {
              color: var(--color-accent-green);
              cursor: pointer;
              margin-top: 20px;

              &:hover {
                text-decoration: underline;
              }
            }
          }
        }

        .no-subjects {
          font-size: 1.3em;
          font-weight: 400;
          color: var(--color-font-dark);
        }
      }

      .college-subjects {
        grid-area: college-subjects;

        .list .subject .name {
          margin: 0;
        }
      }

      @media screen and (max-width: 850px) {
        grid-template-columns: 1fr;
        grid-template-areas: 'global-subjects' 'college-subjects';
      }
    }
  }
}
</style>
