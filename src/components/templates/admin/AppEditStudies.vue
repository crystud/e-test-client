<template>
  <div class="app-edit-studies">
    <app-preloader :show="showPreloader"></app-preloader>

    <app-modal-window
      :show="show && !alert.show"
      :noPaddings="true"
    >
      <div class="title">Предмети спеціальності</div>

      <div class="content">
        <div class="sections">
          <div
            class="current"
            :style="{
              left: `${current.left}px`,
              width: `${current.width}px`,
            }"
          ></div>

          <div class="blocks">
            <div
              :class="{ selected: currentSection === 0 }"
              @click="(ev) => this.setCurrentSection(ev, 0)"
            >Предмети спеціальності</div>

            <div
              :class="{ selected: currentSection === 1 }"
              @click="(ev) => this.setCurrentSection(ev, 1)"
            >Предмети в коледжі</div>
          </div>
        </div>

        <div
          class="no-results"
          v-if="!studies.college.length && currentSection === 1"
        >
          В коледжі немає пар
        </div>

        <div
          class="no-results"
          v-if="!studies.speciality.length && currentSection === 0"
        >
          Спеціальності не присвоєно пар
        </div>

        <div class="list">
          <div
            v-for="(study, index) in sectionStudies()"
            :key="index"
            @click="addStudy(study.id)"
            class="study"
            :class="{
              selected: [...speciality.studies, ...addedStudies].includes(study.id),
            }"
          >
            <div class="icon">
              <font-awesome-icon icon="check"></font-awesome-icon>
            </div>

            <div class="info">
              <div class="name">{{study.subjectName}}</div>

              <div class="additional">
                {{study.teachers.length}} вчителів, {{study.specialties.length}} спеціальностей
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="btns">
        <button
          class="leave"
          @click="$emit('close')"
        >Закрити</button>
      </div>
    </app-modal-window>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'

import AppPreloader from '@/components/ui/AppPreloader.vue'
import AppModalWindow from '@/components/ui/AppModalWindow.vue'

export default {
  computed: {
    ...mapGetters({
      alert: 'alert/alert',
    }),
  },
  methods: {
    ...mapActions({
      getStudiesByIDs: 'studies/getByIDs',
      getCollege: 'college/getByID',
      assignStudy: 'specialities/assignStudy',
      setAlert: 'alert/set',
    }),
    sectionStudies() {
      const { currentSection, studies } = this

      if (currentSection === 1) {
        return studies.college
      }

      return studies.speciality
    },
    async addStudy(study) {
      try {
        const {
          speciality: { id: speciality, studies },
          addedStudies,
        } = this

        if ([...studies, ...addedStudies].includes(study)) {
          return
        }

        this.showPreloader = true

        await this.assignStudy({
          study,
          speciality,
        })

        this.addedStudies.push(study)

        this.setAlert({
          title: 'Предмет додано',
          delay: 1500,
          show: true,
          isSuccess: true,
        })

        await this.loadStudies()
      } catch (e) {
        this.setAlert({
          title: 'Помилка',
          text: 'Не вдалось додати предмет в спеціальність',
          delay: 1500,
          show: true,
          isSuccess: false,
        })

        return
      } finally {
        this.showPreloader = false
      }
    },
    setCurrentSection(ev, section) {
      this.currentSection = section

      const {
        target: {
          clientWidth: width,
          offsetLeft: left,
        },
      } = ev

      this.current = { width, left }
    },
    async loadStudies() {
      const {
        show,
        addedStudies,
        speciality: { studies, college },
      } = this

      if (show && studies) {
        this.showPreloader = true

        const { studies: collegeStudies } = await this.getCollege(college)

        this.studies.speciality = await this.getStudiesByIDs([...studies, ...addedStudies])
        this.studies.college = await this.getStudiesByIDs(collegeStudies)

        this.showPreloader = false
      }
    },
  },
  data() {
    return {
      showPreloader: false,
      currentSection: 0,
      current: {
        width: 0,
        left: 0,
      },
      addedStudies: [],
      studies: {
        speciality: [],
        college: [],
      },
    }
  },
  watch: {
    async show() {
      this.loadStudies()
    },
  },
  components: {
    AppPreloader,
    AppModalWindow,
  },
  props: {
    show: {
      type: Boolean,
      required: true,
      default: () => false,
    },
    speciality: {
      type: Object,
      required: true,
      default: () => {},
    },
  },
}
</script>

<style lang="less" scoped>
.app-edit-studies {
  .title,
  .content,
  .btns {
    width: 100vw;
    max-width: 500px;
  }

  .title {
    border-bottom: 1px solid var(--color-bg-main);

    text-align: center;
    font-size: 1.3em;
    padding: 20px;
  }

  .content {
    .no-results {
      text-align: center;
      margin: 70px 40px;
      font-size: 1.3em;
      color: var(--color-font-dark);
    }

    .sections {
      box-shadow: 0px 5px 15px rgba(0, 0, 0, 0.2);
      user-select: none;

      position: relative;

      .current {
        width: 50%;
        height: 3px;
        border-radius: 10px;

        background: var(--color-accent-green);

        position: absolute;
        top: 0;
        left: 0;

        transition: all .3s;
      }

      .blocks {
        display: grid;
        grid-template-columns: 1fr 1fr;

        div {
          padding: 20px;
          cursor: pointer;
          text-align: center;
          color: var(--color-font-dark);

          transition: all .3s;

          &.selected {
            color: var(--color-font-main);
          }
        }
      }
    }

    .list {
      max-height: 60vh;
      overflow-y: auto;
      margin: 20px 0;

      .study {
        padding: 20px;

        display: grid;
        grid-template-columns: auto 1fr;
        grid-gap: 20px;

        align-items: center;
        cursor: pointer;

        transition: none;

        &:hover {
          background: var(--color-bg-main);
        }

        &.selected {
          .icon {
            color: var(--color-accent-green)
          }
        }

        .icon {
          font-size: 1.3em;
          color: var(--color-font-dark);

          text-align: center;
        }

        .name {
          font-size: 1.2em;
          font-weight: 400;
          margin-bottom: 5px;
        }

        .additional {
          color: var(--color-font-dark);
        }
      }
    }
  }

  .btns {
    border-top: 1px solid var(--color-bg-main);
    box-shadow: 0px -5px 15px rgba(0, 0, 0, 0.2);

    button {
      width: 100%;

      font-size: 1em;
      background: transparent;
      border: 0;
      padding: 20px;
      cursor: pointer;
      transition: none;

      &:hover {
        background: var(--color-bg-main);
      }

      &.leave {
        color: var(--color-font-dark);
      }
    }
  }
}
</style>
