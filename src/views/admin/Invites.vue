<template>
  <div class="app-invites">
    <app-preloader :show="showPreloader"></app-preloader>

    <app-entire-invites-list
      :show="showEntireInvitesList"
      :list="getExampleValues()"
      @close="showEntireInvitesList = false"
    ></app-entire-invites-list>

    <div class="sections">
      <div class="action-area">
        <label
          v-if="!file.name"
          for="file"
          class="drop-file-area"
          :class="{
            'file-is-over': isFileOver,
          }"
        >
          <div
            class="front-block"
            @dragover.prevent
            @drop.prevent="processFile"
            @dragover.capture="isFileOver = true"
            @dragleave.capture="isFileOver = false"
          ></div>

          <div class="content">
            <div class="icon">
              <font-awesome-icon
                icon="file-excel"
                class="file-icon"
              ></font-awesome-icon>

              <font-awesome-icon
                icon="file-upload"
                class="drop-icon"
              ></font-awesome-icon>
            </div>

            <div class="text">
              <span v-if="!isFileOver">
                Оберіть або перетягніть сюди файл з експортом студентів
              </span>
              <span v-else>Відпустіть файл</span>
            </div>
          </div>
        </label>

        <div
          v-if="file.name"
          class="mini-ui"
        >
          <div class="tip">
            Для того, щоб ми зрозуміли які поля за що відповідають,
            перетягніть, будь ласка, значення одного з рядків на своє місце
          </div>

          <div class="count">Елементів у імпорті: <span>{{data.length}}</span></div>

          <div class="tags">
            <div
              v-for="(value, index) in data[0]"
              v-bind:key="index"
              class="tag-wrap"
            >
              <div
                v-if="!fieldNames.some(({ name }) => name === index)"
                class="tag example"
                :title="index"
                :draggable="true"
                @dragstart="(ev) => dragStart(ev, index)"
                @dragover.stop
              >
                {{value}}
              </div>
            </div>
          </div>

          <div class="dragover-area">
            <div class="tip">Перетягуйте сюди</div>

            <div class="tags">
              <div
                v-for="(value, index) in fieldNames"
                v-bind:key="index"
                class="tag"
                :class="{
                  'has-value': value.name,
                }"
                @dragover.prevent
                @drop.prevent="(ev) => drop(ev, index)"
              >
                <span v-if="value.name">
                  <span class="text">{{value.name}}</span>

                  <span
                    class="icon"
                    @click="fieldNames[index].name = null"
                  >
                    <font-awesome-icon
                      icon="times"
                    ></font-awesome-icon>
                  </span>
                </span>

                <span v-else>
                  {{value.label}}
                </span>
              </div>
            </div>
          </div>
        </div>

        <div
          v-if="data.length"
          class="created-invites"
        >
          <div class="header">
            <div class="invites-title">Список запрошень, які буде створено</div>

            <div
              class="check-all"
              @click="showEntireInvitesList = true"
            >Переглянути цілий список</div>
          </div>

          <div class="list">
            <div class="row header-row">
              <div class="field">Прізвище</div>
              <div class="field">Ім'я</div>
              <div class="field">Ім’я по-батькові</div>
              <div class="field">Номер залікової книги</div>
            </div>

            <div
              v-for="({ lastName, firstName, patronymic, scoringBook }, index) in
                getExampleValues({ length: 10 })"
              v-bind:key="index"
              class="row"
            >
              <div class="field">{{lastName}}</div>
              <div class="field">{{firstName}}</div>
              <div class="field">{{patronymic}}</div>
              <div class="field">{{scoringBook}}</div>
            </div>
          </div>
        </div>
      </div>

      <div class="group-info">
        <div class="title">Група</div>

        <app-data-list
          v-if="group.id"
          :data="[
            ['Назва', group.name],
            ['Спеціальність', `[${group.speciality.code}] ${group.speciality.name}`],
            ['Курс', group.course],
            ['Початок навчання', `${group.startYear} р.`],
          ]"
        ></app-data-list>
      </div>
    </div>

    <input
      type="file"
      id="file"
      accept="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
      class="file-input"
      @change="processFileInput"
    >
  </div>
</template>

<script>
import { mapActions } from 'vuex'
import xlsxParser from 'xlsx-parse-json'

import AppPreloader from '@/components/ui/AppPreloader.vue'
import AppDataList from '@/components/ui/AppDataList.vue'
import AppEntireInvitesList from '@/components/templates/admin/AppEntireInvitesList.vue'

export default {
  methods: {
    ...mapActions({
      getGroup: 'groups/getByID',
      setAlert: 'alert/set',
    }),
    getExampleValues({ length } = {}) {
      const { data, fieldNames } = this

      const [fullname, scoringBook] = fieldNames

      const list = []

      for (let i = 0; i < (length || data.length); i += 1) {
        const item = data[i]

        let firstName
        let lastName
        let patronymic

        if (fullname.name) {
          const name = item[fullname.name];

          [lastName, firstName, patronymic] = name.split(' ')
        } else {
          firstName = '-'
          lastName = '-'
          patronymic = '-'
        }

        list.push({
          lastName,
          firstName,
          patronymic,
          scoringBook: scoringBook.name ? item[scoringBook.name] : '-',
        })
      }

      return list
    },
    drop(event, fieldIndex) {
      this.fieldNames[fieldIndex].name = event.dataTransfer.getData('field')
    },
    dragStart(event, fieldName) {
      const { target } = event

      event.dataTransfer.setData('field', fieldName)

      setTimeout(() => {
        target.style.display = 'none'
      }, 0)
    },
    processFileInput(event) {
      const [file] = event.target.files

      this.handleFile(file)
    },
    processFile(event) {
      const [file] = event.dataTransfer.files

      this.handleFile(file)
    },
    handleFile(file) {
      if (!file) {
        this.setAlert({
          title: 'Файл не оприділено',
          show: true,
          isSuccess: false,
        })

        return
      }

      const { type } = file

      if (type !== 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet') {
        this.setAlert({
          title: 'Невідповідний формат',
          text: 'Тільки файли excel',
          show: true,
          delay: 2000,
          isSuccess: false,
        })

        return
      }

      this.showPreloader = true

      xlsxParser
        .onFileSelection(file)
        .then((data) => {
          const [dataArray] = Object.values(data)

          this.data = dataArray
          this.file = file

          this.showPreloader = false
        })
    },
    async loadGroupInfo() {
      try {
        const {
          params: { groupID: groupIDRaw },
        } = this.$route

        const groupID = Number(groupIDRaw)

        if (!groupID) {
          this.setAlert({
            title: 'Помилка',
            text: 'Не вдалось оприділити ID групи',
            isSuccess: false,
            show: true,
          })
        }

        this.showPreloader = true

        const group = await this.getGroup(groupID)

        this.group = group
      } catch (e) {
        this.setAlert({
          title: 'Помилка',
          text: 'Не вдалось отримати інформацію про групу',
          isSuccess: false,
          show: true,
        })
      } finally {
        this.showPreloader = false
      }
    },
  },
  data() {
    return {
      showEntireInvitesList: false,
      showPreloader: false,
      isFileOver: false,
      group: {},
      file: {},
      data: [],
      fieldNames: [
        { label: 'ПІБ', param: 'fullname', name: null },
        { label: 'Номер залікової книги', param: 'scoringBook', name: null },
      ],
    }
  },
  created() {
    this.loadGroupInfo()
  },
  components: {
    AppEntireInvitesList,
    AppPreloader,
    AppDataList,
  },
}
</script>

<style lang="less" scoped>
.app-invites {
  .sections {
    display: grid;
    grid-template-columns: 1fr 300px;
    grid-gap: 20px;

    align-items: flex-start;

    .group-info {
      padding: 20px;
    }

    .action-area,
    .group-info {
      background: var(--color-bg-dark);
      border-radius: 10px;

      .title {
        font-size: 1.5em;
        font-weight: 500;
      }
    }

    .action-area {
      .created-invites {
        border-top: 1px solid var(--color-bg-main);
        padding: 25px;

        .header {
          display: grid;
          grid-template-columns: 1fr auto;
          grid-gap: 20px;
          align-items: center;

          .invites-title {
            font-size: 1.5em;
            margin-bottom: 20px;
          }

          .check-all {
            padding: 10px;
            color: var(--color-accent-orange);
            cursor: pointer;

            &:hover {
              text-decoration: underline;
            }
          }
        }

        .list {
          .row {
            display: grid;
            grid-template-columns: repeat(3, 1fr) 2fr;
            grid-gap: 20px;
            margin-bottom: 10px;

            &.header-row {
              color: var(--color-font-dark);
            }
          }
        }
      }

      .drop-file-area {
        display: block;
        position: relative;

        text-align: center;
        padding: 100px 0;
        margin: 0 auto;

        cursor: pointer;

        .front-block {
          position: absolute;
          top: 0;
          left: 0;

          width: 100%;
          height: 100%;

          background: transparent;
          border-radius: 10px;
        }

        .icon {
          font-size: 2em;

          .drop-icon {
            display: none;
          }
        }

        .text {
          max-width: 300px;
          margin: 10px auto 0;
        }

        .icon,
        .text {
          color: var(--color-font-dark);
        }

        &.file-is-over {
          .icon {
            color: var(--color-accent-green);

            .file-icon {
              display: none;
            }

            .drop-icon {
              display: inline-block;
            }
          }
        }
      }

      .mini-ui {
        padding: 25px;

        .tip {
          margin-bottom: 10px;
          color: var(--color-font-dark);
        }

        .count {
          color: var(--color-accent-green);
          font-weight: 400;
          margin: 10px 0 20px;
        }

        .tags {
          .tag-wrap {
            display: inline-block;
          }

          .tag {
            user-select: none;
            display: inline-block;
            padding: 10px 15px;
            color: var(--color-font-dark);
            background: var(--color-bg-main);
            border-radius: 5px;
            margin: 0 10px 10px 0;

            &.example {
              color: var(--color-accent-green);
              cursor: move;
            }

            &.has-value {
              background: var(--color-accent-green);
              color: #fff;

              .icon {
                display: inline-block;
                height: 30px;
                width: 30px;

                line-height: 30px;
                margin-left: 10px;
                font-size: 16px;

                text-align: center;

                background: var(--color-accent-red);
                color: #fff;

                border-radius: 50px;
                cursor: pointer;
              }
            }
          }
        }

        .dragover-area {
          margin-top: 10px;
        }
      }
    }
  }

  .file-input {
    display: none;
  }
}
</style>
