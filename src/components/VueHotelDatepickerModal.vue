<template>
  <div v-if="active" class="date-range-picker-modal" @click="cancel">
    <div class="date-range-picker-modal-wrapper">
      <div class="date-range-picker-modal-container" @click.stop>
        <div class="date-range-picker-modal-header">
          <a class="close" @click="cancel">
            <IconClose />
          </a>
        </div>
        <div class="date-range-picker">
          <div class="calendar-container">
            <div class="left">
              <div class="calendar-month start">
                <a :class="disabledPreviousArrow(startDate)" class="previous-arrow offset-2" @click="updateCalendar(-2)">
                  <IconArrowBack class="arrow" />
                </a>
                <a :class="disabledPreviousArrow(startDate)" class="previous-arrow offset-1" @click="updateCalendar(-1)">
                  <IconArrowBack class="arrow"/>
                </a>
                <div class="display-month">
                  {{ monthList[startDate.getMonth()] }} {{ startDate.getFullYear() }}
                </div>
                <a class="next-arrow offset-1" @click="updateCalendar(1)">
                  <IconArrowForward class="arrow" />
                </a>
              </div>
              <div class="calendar-week">
                <div v-for="(wItem, index) in weekList" :key="index" class="week-date">
                  {{ wItem }}
                </div>
              </div>
              <div class="calendar-date">
                <div v-for="(week, wIndex) in startMonthAry" :key="wIndex" class="week">
                  <div v-for="(startDay, dIndex) in week" :key="dIndex" :class="disabledDay(startDay)" class="day" @click="dayOnClick(startDay)">
                    <span v-if="startDay">
                      {{ startDay.getDate() }}
                    </span>
                  </div>
                </div>
              </div>
            </div>
            <div class="right">
              <div class="calendar-month end">
                <a class="next-arrow" @click="updateCalendar(2)">
                  <IconArrowForward class="arrow" />
                </a>
                <div class="display-month">
                  {{ monthList[endDate.getMonth()] }} {{ endDate.getFullYear() }}
                </div>
              </div>
              <div class="calendar-week">
                <div v-for="(wItem, index) in weekList" :key="index" class="week-date">
                  {{ wItem }}
                </div>
              </div>
              <div class="calendar-date">
                <div v-for="(week, wIndex) in endMonthAry" :key="wIndex" class="week">
                  <div v-for="(endDay, dIndex) in week" :key="dIndex" :class="disabledDay(endDay)" class="day" @click="dayOnClick(endDay)">
                    <span v-if="endDay">
                      {{ endDay.getDate() }}
                    </span>
                  </div>
                </div>
              </div>
            </div>
            <div class="bottom">
              <div class="panel">
                <div class="info">
                  <div v-if="selectStartDate" class="from">
                    <div class="text">
                      FROM
                    </div>
                    <div :class="{'selected': selectStartDate}" class="date">
                      {{ displaySelectDate(selectStartDate) }}
                    </div>
                  </div>
                  <div v-if="selectStartDate && selectEndDate" class="from-to-arrow">
                    ~
                  </div>
                  <div v-if="selectEndDate" class="to">
                    <div class="text">
                      TO
                    </div>
                    <div :class="{'selected': selectEndDate}" class="date">
                      {{ displaySelectDate(selectEndDate) }}
                    </div>
                  </div>
                </div>
                <div class="ctrl">
                  <a class="cancel" @click="cancel">
                    Cancel
                  </a>
                  <a class="apply" @click="apply">
                    Apply
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import IconClose from '@/components/icon/IconClose'
import IconArrowBack from '@/components/icon/IconArrowBack'
import IconArrowForward from '@/components/icon/IconArrowForward'
export default {
  name: 'VueHotelDatepicker',
  components: {
    IconClose,
    IconArrowBack,
    IconArrowForward
  },
  directives: {},
  props: {
    active: {
      type: Boolean,
      default: false
    },
    start: {
      type: String,
      default: ''
    },
    end: {
      type: String,
      default: ''
    },
    weekList: {
      type: Array,
      default: () => ['Sun.', 'Mon.', 'Tue.', 'Wen.', 'Thu.', 'Fri.', 'Sat.']
    },
    monthList: {
      type: Array,
      default: () => ['Jan.', 'Feb.', 'Mar.', 'Apr.', 'May.', 'Jun.', 'Jul.', 'Aug.', 'Sep.', 'Oct', 'Nov.', 'Dec.']
    }
  },
  data () {
    return {
      showPreviousMonthDate: false,
      startDate: new Date(),
      endDate: new Date(),
      selectStartDate: undefined,
      selectEndDate: undefined,
      startMonthAry: [],
      endMonthAry: [],
      clickCount: 0
    }
  },
  computed: {},
  watch: {
    active () {
      this.clickCount = 0
    },
    start (newValue) {
      if (newValue === '') {
        this.startDate = new Date()
        this.endDate = new Date()
        this.selectStartDate = undefined
        this.selectEndDate = undefined
      }
    }
  },
  created () {
    this.updateCalendar()
    if (this.start && this.end) {
      this.selectStartDate = new Date(this.start)
      this.selectEndDate = new Date(this.end)
      // this.apply()
    }
  },
  mounted () {},
  updated () {
  },
  methods: {
    apply () {
      const dateResult = {
        start: this.displaySelectDate(this.selectStartDate),
        end: this.displaySelectDate(this.selectEndDate)
      }
      this.$emit('apply', dateResult)
    },
    cancel () {
      this.$emit('cancel')
    },
    displaySelectDate (datetime) {
      if (datetime) {
        const y = datetime.getFullYear()
        const m = datetime.getMonth() + 1 > 9 ? datetime.getMonth() + 1 : `0${datetime.getMonth() + 1}`
        const d = datetime.getDate()
        return `${y}/${m}/${d}`
      } else {
        return null
      }
    },
    updateCalendar (offset = 0) {
      if (!this.startDate) {
        const now = new Date()
        this.startDate = new Date(now.getFullYear(), now.getMonth())
      }

      this.startDate.setMonth(this.startDate.getMonth() + offset)
      this.endDate = new Date(this.startDate.getFullYear(), this.startDate.getMonth() + 1)

      this.startMonthAry = []
      this.endMonthAry = []
      this.startMonthAry = this.generateCalendar(this.startDate.getFullYear(), this.startDate.getMonth())
      this.endMonthAry = this.generateCalendar(this.endDate.getFullYear(), this.endDate.getMonth())
    },
    generateCalendar (calculateYear = new Date().getFullYear(), calculateMonth = new Date().getMonth(), config = {}) {
      const showPreviousMonthDate = config.showPreviousMonthDate || false
      const showNextMonthDate = config.showNextMonthDate || false
      const baseDateTime = new Date(calculateYear, calculateMonth, 1, 0, 0, 0)
      let countTime = new Date(calculateYear, calculateMonth, 1, 0, 0, 0)
      let tempMonthAry = []
      let tempWeekAry = []
      let nextMonth = false
      let completed = false
      while (!nextMonth || (nextMonth && !completed)) {
        let day = countTime.getDay()
        let date = countTime.getDate()
        let month = countTime.getMonth()
        // check next month
        if (month !== calculateMonth) {
          nextMonth = true
          if (day === 6 || (date === 1 && day === 0)) {
            completed = true
          }
        }
        // Set date
        if (!nextMonth) {
          tempWeekAry[day] = new Date(countTime.getTime()) // date obj
        } else {
          tempWeekAry[day] = showNextMonthDate ? new Date(countTime.getTime()) : false
        }
        // check previous
        if (countTime.getTime() === baseDateTime.getTime() && day !== 0) {
          // Fill previous
          let previousDay = day
          let previousCountTime = new Date(countTime.getTime())
          previousCountTime.setDate(previousCountTime.getDate())
          if (showPreviousMonthDate) {
            while (previousDay !== 0) {
              // let previousDate = previousDateTime.getDate()
              let previousDateTime = new Date(previousCountTime.getTime())
              previousDay = previousDateTime.getDay()
              tempWeekAry[previousDay] = previousDateTime // date obj
              previousCountTime.setDate(previousCountTime.getDate() - 1)
            }
          }
        }
        // check new week
        if ((countTime.getTime() === baseDateTime.getTime() && tempWeekAry.length === 7) ||
            (countTime.getTime() > baseDateTime && day === 6)) {
          // Next week
          tempMonthAry.push(tempWeekAry)
          tempWeekAry = []
        }
        // calculate next day
        countTime.setDate(countTime.getDate() + 1)
      }

      return tempMonthAry
    },
    disabledPreviousArrow (datetime) {
      const now = new Date()
      const today = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 0, 0, 0)
      if (datetime &&
          datetime.getFullYear() === today.getFullYear() &&
          datetime.getMonth() === today.getMonth()) {
        return 'disabled'
      }
    },
    disabledDay (datetime) {
      const classList = []
      const now = new Date()
      const today = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 0, 0, 0)

      if (datetime) {
        if (datetime.getTime() < today.getTime()) {
          classList.push('disabled')
        } else if (this.selectStartDate && this.selectStartDate.getTime() === datetime.getTime()) {
          classList.push('start-date')
        } else if (this.selectEndDate && this.selectEndDate.getTime() === datetime.getTime()) {
          classList.push('end-date')
        } else if (this.selectStartDate && this.selectEndDate &&
                   datetime.getTime() > this.selectStartDate.getTime() &&
                   datetime.getTime() < this.selectEndDate.getTime()) {
          classList.push('in-date-range')
        }
      }

      return classList
    },
    dayOnClick (datetime) {
      if (datetime) {
        if (!this.selectStartDate) {
          this.selectStartDate = datetime
        } else if (!this.selectEndDate) {
          if (this.selectStartDate && datetime.getTime() < this.selectStartDate.getTime()) {
            this.selectEndDate = this.selectStartDate
            this.selectStartDate = datetime
          } else {
            this.selectEndDate = datetime
          }
        } else if (datetime.getTime() < this.selectStartDate.getTime()) {
          this.selectStartDate = datetime
        } else if (datetime.getTime() > this.selectEndDate.getTime()) {
          this.selectEndDate = datetime
        } else if (datetime.getTime() > this.selectStartDate.getTime() &&
                  datetime.getTime() < this.selectEndDate.getTime()) {
          if (this.clickCount % 2 === 0) {
            this.selectStartDate = datetime
          } else {
            this.selectEndDate = datetime
          }
          this.clickCount++
        }
      }
    }
  }
}
</script>
<style lang="scss" scoped>
@keyframes fade-modal {
  0% {
    // transform: translateY(33px);
    opacity: 0;
  }
  100% {
    // transform: translateY(0);
    opacity: 1;
  }
}
* {
  box-sizing: border-box;
}
.date-range-picker-modal {
  animation: fade-modal 0.2s 0s 1 ease-in;
  position: fixed;
  z-index: 90;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(255, 255, 255, .85);
  display: table;
  &-wrapper {
    z-index: 1;
    display: table-cell;
    vertical-align: middle;
  }
  &-container {
    width: 648px;
    max-height: 90%;
    margin: 0 auto;
    border-radius: 12px;
    background-color: #ffffff;
    box-shadow: 0 2px 30px 0 rgba(0, 0, 0, 0.27);
  }
  &-header {
    height: 48px;
    width: 100%;
    position: relative;
    display: none; // default
    .close {
      position: absolute;
      top: 24px;
      right: 24px;
      font-size: 24px;
      color: #9b9b9b;
      cursor: pointer;
    }
  }
}

.calendar {
  &-container{
    position: relative;
    width: 648px;
    margin: 0 auto;
    padding: 24px;
    border-radius: 12px;
    text-align: left;
    background-color: #ffffff;
    user-select: none;
  }
  &-month {
    position: relative;
    height: 32px;
    margin-bottom: 16px;
    .next-arrow,
    .previous-arrow {
      width: 20px;
      height: 20px;
      cursor: pointer;
      // border: solid 1px #0088FF;
      &.disabled {
        // cursor: not-allowed;
        display: none!important;
      }
    }
    .previous-arrow {
      position: absolute;
      top: 6px;
      left: 0;
    }
    .next-arrow {
      position: absolute;
      top: 6px;
      right: 0;
    }
    .previous-arrow.offset-1 {
      display: none;
    }
    .next-arrow.offset-1 {
      display: none;
    }
    .display-month {
      font-size: 20px;
      font-weight: 500;
      line-height: 1.6;
      text-align: center;
      color: #505050;
    }
  }
  &-week {
    width: 100%;
    height: 32px;
    .week-date {
      float: left;
      display: inline-block;
      font-size: 12px;
      font-weight: 500;
      width: calc(100% / 7);
      height: 20px;
      color: #7d7d7d;
      text-align: center;
      line-height: 20px;
    }
  }
  &-date {
    min-height: 240px;
  }
}
.left,
.right {
  display: inline-block;
  vertical-align: top;
  width: 280px;
}
.left {
  margin-right: 40px;
}
.week {
  display: block;
  width: 100%;
  height: 40px;
  .day {
    float: left;
    position: relative;
    display: inline-block;
    width: 40px;
    height: 40px;
    font-size: 16px;
    font-weight: 700;
    line-height: 40px;
    color: #7d7d7d;
    // border: solid 1px #0088FF;
    background-color: transparent;
    text-align: center;
    cursor: pointer;
    transition: background-color .4s cubic-bezier(0.165, 0.84, 0.44, 1);
    &::before,
    &::after{
      content: '';
      position: absolute;
      width: 0px;
      height: 100%;
      left: 0;
      background-color: transparent;
      opacity: 0;
      transition: opacity .4s cubic-bezier(0.165, 0.84, 0.44, 1),
                  background-color .4s cubic-bezier(0.165, 0.84, 0.44, 1),
                  width .4s cubic-bezier(0.165, 0.84, 0.44, 1);
    }
    &::after{
      left: auto;
      right: 0;
    }
    &.disabled {
      color: #ececec;
      pointer-events: none;
    }
    &.in-date-range {
      background-color: #B2D7FF;
    }
    &.start-date {
      position: relative;
      background-color: #B2D7FF;
      // transition: all .2s ease;
      &::before {
        // content: '';
        // position: absolute;
        // width: 4px;
        // height: 100%;
        // left: 0;
        width: 4px;
        background-color: #0088FF;
        opacity: 1;
      }
    }
    &.end-date {
      position: relative;
      background-color: #B2D7FF;
      // transition: all .2s ease;
      &::after {
        // content: '';
        // position: absolute;
        // width: 4px;
        // height: 100%;
        width: 4px;
        background-color: #0088FF;
        opacity: 1;
        transition: opacity .2s cubic-bezier(0.165, 0.84, 0.44, 1),
                    background-color .2s cubic-bezier(0.165, 0.84, 0.44, 1),
                    width .2s cubic-bezier(0.165, 0.84, 0.44, 1);
      }
    }
  }
}
.bottom {
  display: block;
  width: 100%;
  min-height: 48px;
  // border: solid 1px #ececec;
}
.panel {
  position: relative;
  min-height: 48px;
  .info,
  .ctrl {
    display: inline-block;
    vertical-align: top;
    height: 48px;
  }
  .info {
    text-align: left;
    .from-to-arrow {
      height: 26px;
      color: #7d7d7d;
    }
    .from, .to, .from-to-arrow {
      display: inline-block;
      vertical-align: bottom;
      .text {
        margin-bottom: 8px;
        font-size: 12px;
        line-height: 18px;
        font-weight: 500;
        color: #7d7d7d;
      }
      .date {
        line-height: 26px;
        font-size: 16px;
        font-weight: 700;
        color: #9b9b9b;
        &.selected {
          color: #505050;
        }
      }
    }
  }
  .ctrl {
    > a {
      font-size: 16px;
      font-weight: 700;
      line-height: 1.63;
      cursor: pointer;
    }
    .cancel {
      position: absolute;
      bottom: 0;
      right: 108px;
      color: #9b9b9b;
    }
    .apply {
      position: absolute;
      bottom: 0;
      right: 0;
      padding: 0 8px;
      color: #0088FF;
    }
  }
}
// @media only screen and (min-width: 1440px) {}
// @media only screen and (min-width: 1024px) and (max-width: 1439.98px) {}
// @media only screen and (min-width: 768px) and (max-width: 1023.98px) {}
@media only screen and (max-width: 767.98px) {
  .date-range-picker-modal {
    &-container {
      width: 100%;
      height: 100%;
      max-height: 100%;
      border-radius: 0;
      box-shadow: none;
    }
    &-header {
      display: block;
    }
  }

  .calendar {
    &-container{
      position: relative;
      width: 100%;
      min-width: 320px;
    }
    &-month {
      .previous-arrow.offset-2 {
        display: none;
      }
      .previous-arrow.offset-1 {
        display: inline-block;
      }
      .next-arrow.offset-1 {
        display: inline-block;
      }
    }
  }

  .left {
    width: 100%;
    margin-right: 0;
  }
  .right {
    display: none;
  }

  .week {

    .day {
      // width: 40px;
      width: calc(100% / 7);
      &.start-date {
        color: #ffffff;
        border-left: none;
        // background-color: #B2D7FF;
        background-color: #0088FF;
        transition: all .2s ease;
      }
      &.end-date {
        color: #ffffff;
        border-right: none;
        // background-color: #B2D7FF;
        background-color: #0088FF;
        transition: all .2s ease;
      }
    }
  }

  .panel {
    .info,
    .ctrl {
      display: block;
    }
    .info {
      .from-to-arrow {
        margin: 0;
      }
    }
    .ctrl {
      height: 48px;
      .cancel {
        position: absolute;
        bottom: 0;
        left: 0;
      }
    }
  }
}
</style>
