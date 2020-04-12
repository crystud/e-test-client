<template>
  <div
    class="datepicker"
    :class="[
      (selectedDate ? 'selected' : 'unselected'),
      (isActive ? 'active' : 'unactive')
    ]"
  >
    <div @click="isActive = true" class="unactive-section" v-if="!isActive">
      <div class="data">
        <div v-if="placeholder" class="placeholder">{{placeholder}}</div>
        <div class="value">{{selectedTimeString || '--/--/----'}}</div>
      </div>

      <div class="icon">
        <font-awesome-icon icon="calendar-alt"></font-awesome-icon>
      </div>
    </div>

    <div class="active-section" v-if="isActive">
      <div class="header">
        <div class="controls">
          <div class="icon" @click="moveMonth(-1)">
            <font-awesome-icon icon="angle-left"></font-awesome-icon>
          </div>

          <div class="icon" @click="moveYear(-1)">
            <font-awesome-icon icon="angle-double-left"></font-awesome-icon>
          </div>
        </div>

        <div class="datetime">
          {{months[currentMonth]}} {{currentYear}}
        </div>

        <div class="controls">
          <div class="icon" @click="moveYear(1)">
            <font-awesome-icon icon="angle-double-right"></font-awesome-icon>
          </div>

          <div class="icon" @click="moveMonth(1)">
            <font-awesome-icon icon="angle-right"></font-awesome-icon>
          </div>
        </div>
      </div>

      <div class="calendar-section">
        <div
          v-if="placeholder"
          class="placeholder"
        >{{placeholder}}</div>

        <div class="calendar">
          <div
            class="header-day"
            v-for="([full, short]) in days"
            v-bind:key="full"
            :title="full"
          >
            {{short}}
          </div>

          <div
            v-for="i in (daysInMonth + offset)"
            v-bind:key="i"
            @click="() => setDate(i)"
          >
            <div
              class="day"
              :class="evaluateDayClasses(i)"
              v-if="i - offset > 0"
            >{{(i - offset)}}</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'AppDatepickerCustom',
  props: {
    placeholder: {
      type: String,
      required: false,
    },
    defaultTime: {
      type: String,
      required: false,
    },
  },
  data() {
    return {
      isActive: false,
      selected: false,
      selectedDate: null,
      offset: 0,
      currentMonth: 0,
      currentDate: 0,
      currentYear: 0,
      daysInMonth: 31,
      selectedTimeString: null,
      currentTime: new Date(),
      months: [
        'Січень',
        'Лютий',
        'Березень',
        'Квітень',
        'Травень',
        'Червень',
        'Липень',
        'Серпень',
        'Вересень',
        'Жовтень',
        'Листопад',
        'Грудень',
      ],
      days: [
        ['Неділя', 'нд'],
        ['Понеділок', 'пн'],
        ['Вівторок', 'вт'],
        ['Середа', 'ср'],
        ['Четвер', 'чт'],
        ['П\'ятниця', 'пт'],
        ['Субота', 'сб'],
      ],
    }
  },
  methods: {
    evaluateDayClasses(noOffsetDate) {
      const {
        currentTime,
        currentMonth: month,
        currentYear: year,
        offset,
      } = this
      const time = new Date(year, month, noOffsetDate - offset)
      const currentDateString = this.getTimeStringOnTime(currentTime)
      const timeDateString = this.getTimeStringOnTime(time)
      const currentDay = currentDateString === timeDateString ? 'current-day' : ''
      const selectedDate = this.selectedDate === (noOffsetDate - offset) ? 'selected-day' : ''
      return [
        currentDay,
        selectedDate,
      ]
    },
    getTimeStringOnTime(time) {
      return `${time.getFullYear()}-${time.getMonth()}-${time.getDate()}`
    },
    setDate(noOffsetDate) {
      const { offset, currentYear, currentMonth } = this
      this.selectedDate = noOffsetDate - offset
      const month = (currentMonth + 1) < 10 ? `0${(currentMonth + 1)}` : (currentMonth + 1)
      const date = (this.selectedDate + 1) < 10 ? `0${this.selectedDate}` : this.selectedDate
      this.selectedTimeString = `${currentYear}-${month}-${date}`
      this.isActive = false
      this.calculate()
    },
    moveMonth(side) {
      const { currentMonth, currentYear } = this
      const date = new Date(currentYear, (currentMonth + side))
      this.currentMonth = date.getMonth()
      this.currentYear = date.getFullYear()
      this.currentDate = date
      this.calculate()
    },
    moveYear(side) {
      const { currentMonth, currentYear } = this
      const date = new Date(currentYear + side, currentMonth)
      this.currentMonth = date.getMonth()
      this.currentYear = date.getFullYear()
      this.currentDate = date
      this.calculate()
    },
    calculate() {
      const { currentDate } = this
      this.currentMonth = currentDate.getMonth()
      this.currentYear = currentDate.getFullYear()
      this.daysInMonth = new Date(this.currentYear, this.currentMonth + 1, 0).getDate()
      this.offset = new Date(this.currentYear, this.currentMonth + 1, 1).getDay()
      if (this.selectedDate > this.daysInMonth) {
        this.isActive = true
        this.selectedDate = null
        return
      }
      const { currentMonth, currentYear: year } = this
      const month = (currentMonth + 1) < 10 ? `0${(currentMonth + 1)}` : (currentMonth + 1)
      const date = (this.selectedDate + 1) < 10 ? `0${this.selectedDate}` : this.selectedDate
      if (year && month && date) {
        this.$emit('change', `${year}-${month}-${date}`)
      }
    },
  },
  created() {
    const { defaultTime } = this
    const currentDate = defaultTime ? new Date(defaultTime) : new Date()
    if (defaultTime) {
      this.currentYear = currentDate.getFullYear()
      this.currentMonth = currentDate.getMonth()
      this.selectedDate = currentDate.getDate()
      const { currentMonth, currentYear } = this
      const month = (currentMonth + 1) < 10 ? `0${(currentMonth + 1)}` : (currentMonth + 1)
      const date = this.selectedDate < 10 ? `0${this.selectedDate}` : this.selectedDate
      this.selectedTimeString = `${currentYear}-${month}-${date}`
      return
    }
    this.currentDate = currentDate
    this.calculate()
  },
}
</script>

<style lang="less" scoped>
.datepicker {
  width: 100%;
  background: rgba(0,0,0,.05);
  box-shadow: 0px 0px 20px rgba(0, 0, 0, 0.3);

  border-bottom: 2px solid rgba(0, 0, 0, 0);
  border-radius: 10px;

  min-width: 200px;

  .active-section {
    .header {
      padding: 15px;
      display: flex;
      justify-content: center;
      align-items: center;
      border-bottom: 1px solid var(--color-bg-main);

      .controls {
        display: flex;
        user-select: none;

        .icon {
          display: flex;
          justify-content: center;
          align-items: center;
          width: 35px;
          height: 35px;
          margin: 0 10px;
          font-size: 1.2em;
          color: var(--color-font-dark);
          cursor: pointer;
          border-radius: 50%;
          transform: scale(1);
          transition: all .15s;

          &:hover {
            background: var(--color-bg-main);
            transform: scale(1.2);
          }
        }
      }

      .datetime {
        margin: 0 20px;
        font-size: 1.4em;
        width: 160px;
        text-align: center;
        color: var(--color-font-main);
      }

      @media screen and (max-width: 450px) {
        .datetime {
          font-size: 1em;
          width: auto;
        }
      }

      @media screen and (max-width: 380px) {
        .datetime {
          margin: 20px 0;
          font-size: 1.2em;
        }

        & {
          flex-direction: column;
        }
      }
    }

    .calendar-section {
      padding: 15px;

      .placeholder {
        text-align: center;
        font-size: 1.1em;
        color: var(--color-font-dark);
      }

      .calendar {
        display: grid;
        grid-template-columns: repeat(7, 1fr);
        margin-top: 10px;

        .day {
          background: rgba(0, 0, 0, 0.13);
          border-radius: 50%;
          cursor: pointer;
          transition: all .3s;

          &.current-day {
            border: 2px solid #00ff87;
          }

          &.selected-day {
            background: #3242d5;
            box-shadow: 0px 0px 15px rgba(0, 0, 0, 0.4);
            color: #fff;
          }
        }

        .day,
        .header-day {
          display: flex;
          justify-content: center;
          align-items: center;
          margin: 0 auto 10px;
          width: 40px;
          height: 40px;
          color: var(--color-font-main);
        }

        @media screen and (max-width: 450px) {
          .header-day {
            display: none;
          }

          .day {
            width: 100%;
            height: 70px;
            font-size: 1.3em;
            border-radius: 10px;
          }

          grid-template-columns: repeat(3, 1fr);
          grid-gap: 20px;
        }

        @media screen and (max-width: 380px) {
          grid-template-columns: 1fr 1fr;
        }

        @media screen and (max-width: 300px) {
          grid-template-columns: 1fr;
          grid-gap: 10px;

          .day {
            margin: 0;
          }
        }
      }
    }
  }

  .unactive-section {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 10px 15px;

    .data {
      .placeholder {
        font-size: 0.93em;
        color: var(--color-font-dark);
      }

      .value {
        font-size: 1.2em;
        color: var(--color-font-main);
        margin-top: 5px;
      }
    }

    .icon {
      font-size: 1.2em;
      color: #424e58;
    }
  }

  &.unactive {
    cursor: pointer;
  }

  &.unselected {
    border-color: #c72929;
  }

  &.selected {
    border-color: #3242d5;
  }

  transition: all .3s;
}
</style>
