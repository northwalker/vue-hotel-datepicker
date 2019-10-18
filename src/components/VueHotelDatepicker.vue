<template>
  <div :class="mobile.toLowerCase()" class="vhd-container">
    <input v-model="value"
           :placeholder="placeholder"
           :class="['vhd-input', {'vhd-input--inline': inlineMode}]"
           type="text" aria-label="vue-hotel-datepicker-input"
           @mousedown.prevent="toggle"
           @focus.prevent="toggle">
    <div v-if="active" :class="['vhd-picker', {'vhd-picker--inline': inlineMode}]">
      <div class="vhd-calendar">
        <div class="vhd-calendar-header">
          <a v-if="!inlineMode" class="close" @click="close">
            <IconClose />
          </a>
          <span class="info">
            <span v-if="selectStartDate" class="from-text">{{ fromText }}</span>
            <span v-if="selectStartDate" class="from-date"> {{ displayDateText(selectStartDate) }} </span>
            <span v-if="selectEndDate" class="to-text">{{ toText }}</span>
            <span v-if="selectEndDate" class="from-date"> {{ displayDateText(selectEndDate) }} </span>
          </span>
        </div>
        <div class="vhd-calendar-left">
          <div class="calendar-month">
            <a :class="disabledPreviousArrow(startMonthDate)" class="previous-arrow offset-2" @click="updateCalendar(-2)">
              <IconArrowBack class="arrow" />
            </a>
            <a :class="disabledPreviousArrow(startMonthDate)" class="previous-arrow offset-1" @click="updateCalendar(-1)">
              <IconArrowBack class="arrow"/>
            </a>
            <div class="calendar-month-title">
              {{ monthList[startMonthDate.getMonth()] }} {{ startMonthDate.getFullYear() }}
            </div>
            <a class="next-arrow offset-1" @click="updateCalendar(1)">
              <IconArrowForward class="arrow" />
            </a>
          </div>
          <div class="calendar-week">
            <div v-for="(wItem, index) in weekList" :key="index" class="calendar-week-item">
              {{ wItem }}
            </div>
          </div>
          <div class="calendar-date">
            <div v-for="(week, wIndex) in startMonthAry" :key="wIndex" class="week">
              <div v-for="(startDay, dIndex) in week"
                   :key="dIndex"
                   :class="dayStatus(startDay)"
                   class="day"
                   @click="dayOnClick(startDay)">
                <span v-if="startDay">
                  {{ startDay.getDate() }}
                </span>
              </div>
            </div>
          </div>
        </div>
        <div class="vhd-calendar-right">
          <div class="calendar-month">
            <a class="next-arrow" @click="updateCalendar(2)">
              <IconArrowForward class="arrow" />
            </a>
            <div class="calendar-month-title">
              {{ monthList[endMonthDate.getMonth()] }} {{ endMonthDate.getFullYear() }}
            </div>
          </div>
          <div class="calendar-week">
            <div v-for="(wItem, index) in weekList" :key="index" class="calendar-week-item">
              {{ wItem }}
            </div>
          </div>
          <div class="calendar-date">
            <div v-for="(week, wIndex) in endMonthAry" :key="wIndex" class="week">
              <div v-for="(endDay, dIndex) in week" :key="dIndex" :class="dayStatus(endDay)" class="day" @click="dayOnClick(endDay)">
                <span v-if="endDay">
                  {{ endDay.getDate() }}
                </span>
              </div>
            </div>
          </div>
        </div>
        <div class="vhd-calendar-footer">
          <div v-if="selectStartDate || selectEndDate" class="reset" @click="reset">{{ resetText }}</div>
          <div v-if="selectStartDate && selectEndDate" class="confirm" @click="confirm">{{ confirmText }}</div>
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
    placeholder: {
      type: String,
      default: 'Select a date range'
    },
    separator: {
      type: String,
      default: '~'
    },
    format: {
      type: String,
      default: 'YYYY/MM/DD'
    },
    startDate: {
      type: [String, Date],
      default: undefined
    },
    endDate: {
      type: [String, Date],
      default: undefined
    },
    minDate: {
      type: [String, Date],
      default: () => new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate(), 0, 0, 0)
    },
    maxDate: {
      type: [String, Date, Boolean],
      default: false
    },
    minNight: {
      type: Number,
      default: undefined
    },
    maxNight: {
      type: Number,
      default: undefined
    },
    selectForward: {
      type: Boolean,
      default: true
    },
    disabledDates: {
      type: Array,
      default: () => []
    },
    weekList: {
      type: Array,
      default: () => ['Sun.', 'Mon.', 'Tue.', 'Wen.', 'Thu.', 'Fri.', 'Sat.']
    },
    monthList: {
      type: Array,
      default: () => ['Jan.', 'Feb.', 'Mar.', 'Apr.', 'May.', 'Jun.', 'Jul.', 'Aug.', 'Sep.', 'Oct', 'Nov.', 'Dec.']
    },
    fromText: {
      type: String,
      default: 'From'
    },
    toText: {
      type: String,
      default: 'To'
    },
    resetText: {
      type: String,
      default: 'Reset'
    },
    confirmText: {
      type: String,
      default: 'Confirm'
    },
    mobile: {
      type: String,
      default: '' // mobile or desktop
    },
    active: {
      type: Boolean,
      default: false
    },
    inlineMode: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      value: '',
      startMonthDate: undefined,
      endMonthDate: undefined,
      selectStartDate: undefined,
      selectEndDate: undefined,
      selectMinDate: undefined,
      selectMaxDate: undefined,
      startMonthAry: [],
      endMonthAry: [],
      clickCount: 0
    }
  },
  computed: {},
  watch: {},
  created () {
    if (this.minDate) {
      const minDateValue = typeof (this.minDate) === 'string' ? this.minDate : this.minDate.getTime()
      this.selectMinDate = new Date(minDateValue)
    }
    if (this.maxDate) {
      const maxDateValue = typeof (this.maxDate) === 'string' ? this.maxDate : this.maxDate.getTime()
      this.selectMaxDate = new Date(maxDateValue)
    }
    if (this.startDate) {
      const startDateValue = typeof (this.startDate) === 'string' ? this.startDate : this.startDate.getTime()
      this.selectStartDate = new Date(startDateValue)
      if (this.selectMinDate && this.selectMinDate.getTime() > this.selectStartDate.getTime()) {
        this.selectMinDate = new Date(startDateValue)
      }
      if (!this.endDate) {
        this.selectEndDate = new Date(this.selectStartDate.getTime() + (24 * 60 * 60 * 1000))
      } else {
        const endDateValue = typeof (this.endDate) === 'string' ? this.endDate : this.endDate.getTime()
        this.selectEndDate = new Date(endDateValue)
      }

      this.updateValue()
    }
    this.updateCalendar() // after setting
  },
  mounted () {},
  methods: {
    toggle (e) {
      if (e.type === 'focus') {
        this.active = true
        return true
      }

      this.active = !this.active
    },
    close () {
      this.active = false
      this.$emit('close')
    },
    reset () {
      this.selectStartDate = undefined
      this.selectEndDate = undefined
      this.value = ''
      this.$emit('reset')
    },
    confirm () {
      if (this.selectStartDate && !this.selectEndDate) {
        this.selectEndDate = new Date(this.selectStartDate.getTime())
        this.selectEndDate.setDate(this.selectStartDate.getDate() + 1)
        this.updateValue()
      }
      if (this.selectStartDate && this.selectEndDate) {
        const dateResult = {
          start: this.displayDateText(this.selectStartDate),
          end: this.displayDateText(this.selectEndDate)
        }
        this.$emit('confirm', dateResult)
        if (!this.inlineMode) {
          this.active = false
        }
      }
    },
    displayDateText (datetime) {
      if (datetime) {
        datetime = typeof (datetime) === 'string' ? new Date(datetime) : datetime
        const yyyy = datetime.getFullYear()
        const mm = datetime.getMonth() + 1 > 9 ? datetime.getMonth() + 1 : `0${datetime.getMonth() + 1}`
        const dd = datetime.getDate() > 9 ? datetime.getDate() : `0${datetime.getDate()}`
        const displayStr = (this.format || 'YYYY/MM/DD').replace('YYYY', yyyy).replace('MM', mm).replace('DD', dd)
        return displayStr
      } else {
        return undefined
      }
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
    updateCalendar (offset = 0) {
      if (!this.startMonthDate) {
        this.startMonthDate = this.selectStartDate
          ? new Date(this.selectStartDate.getTime())
          : new Date(new Date().getFullYear(), new Date().getMonth()) // now
      }

      this.startMonthDate.setMonth(this.startMonthDate.getMonth() + offset)
      this.endMonthDate = new Date(this.startMonthDate.getFullYear(), this.startMonthDate.getMonth() + 1)

      this.startMonthAry = []
      this.endMonthAry = []
      this.startMonthAry = this.generateCalendar(this.startMonthDate.getFullYear(), this.startMonthDate.getMonth())
      this.endMonthAry = this.generateCalendar(this.endMonthDate.getFullYear(), this.endMonthDate.getMonth())
    },
    updateValue () {
      this.value = `${this.displayDateText(this.selectStartDate)} ${this.separator} ${this.displayDateText(this.selectEndDate)}`
    },
    disabledPreviousArrow (monthDatetime) {
      const now = new Date()
      const today = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 0, 0, 0)
      if (monthDatetime && this.selectForward) {
        if (this.selectMinDate) {
          if (monthDatetime.getFullYear() < this.selectMinDate.getFullYear()) {
            return 'disabled'
          }
          if (monthDatetime.getFullYear() === this.selectMinDate.getFullYear() &&
            monthDatetime.getMonth() <= this.selectMinDate.getMonth()) {
            return 'disabled'
          }
        } else {
          if (monthDatetime.getFullYear() === today.getFullYear() && monthDatetime.getMonth() === today.getMonth()) {
            return 'disabled'
          }
        }
      }
    },
    dayStatus (datetime) {
      const classList = []
      if (datetime) {
        const now = new Date()
        // const today = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 0, 0, 0)
        // check status
        if (this.selectMinDate.getTime() > datetime.getTime()) {
          classList.push('disabled')
        } else if (this.selectMaxDate && this.selectMaxDate.getTime() < datetime.getTime()) {
          classList.push('disabled')
        } else if (this.disabledDates.indexOf(this.displayDateText(datetime)) > -1) {
          classList.push('disabled')
          classList.push('forbidden')
        } else if (this.selectStartDate && this.selectStartDate.getTime() > datetime.getTime() && !this.selectForward) {
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
        // check min night and max night
        if (this.selectStartDate && ((Number.isInteger(this.minNight) && this.minNight > 0) ||
            (Number.isInteger(this.maxNight) && this.maxNight > 0))) {
          const night = Math.abs((datetime.getTime() - this.selectStartDate.getTime())) / (1000 * 60 * 60 * 24)
          if (night < this.minNight) {
            classList.push('disabled')
          } else if (night > this.maxNight) {
            classList.push('disabled')
          }
        }
        // check today
        if (now.getFullYear() === datetime.getFullYear() &&
            now.getMonth() === datetime.getMonth() &&
            now.getDate() === datetime.getDate()
        ) {
          classList.push('today')
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
        // check maxNight
        if (this.selectStartDate && this.selectEndDate && this.maxNight) {
          const limitDate = this.selectStartDate.getTime() + this.maxNight * 1000 * 60 * 60 * 24
          if (this.selectEndDate.getTime() > limitDate) {
            this.selectEndDate = new Date(limitDate)
          }
        }
        // check minNight
        if (this.selectStartDate && this.selectEndDate && this.minNight) {
          const limitDate = this.selectStartDate.getTime() + this.minNight * 1000 * 60 * 60 * 24
          if (this.selectEndDate.getTime() < limitDate) {
            this.selectEndDate = new Date(limitDate)
          }
        }
        const dateResult = {
          start: this.displayDateText(this.selectStartDate),
          end: this.displayDateText(this.selectEndDate)
        }
        this.$emit('update', dateResult)

        if (this.selectStartDate && this.selectEndDate) {
          this.updateValue()
        }
      }
    }
  }
}
</script>
<style lang="scss" scoped>
@mixin mobile-vhd() {
  .vhd {
    &-picker {
      width: 300px;
      padding: 8px;
    }
    &-calendar {
      &-header {
        height: 60px;
        > .info {
          display: block;
          width: 100%;
          height: 60px;
          padding-top: 36px;
        }
      }
      &-left {
        width: 100%;
        margin-right: 0;
      }
      &-right {
        display: none;
      }
      .calendar {
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
        &-week {}
        &-date {
          .week {
            .day {
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
        }
      }
    }
  }
}
* {
  box-sizing: border-box;
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
}
svg {
  fill: #7d7d7d;
  @media (hover: hover) {
    &:hover {
      fill: darken(#7d7d7d, 20%)
    }
  }
}
.vhd {
  &-container.mobile {
    @include mobile-vhd();
  }
  &-container {
    display: inline-block;
    position: relative;
  }
  &-input {
    min-width: 300px;
    padding: 8px;
    border: solid 1px #eeeeee;
    color: #505050;
    font-size: 16px;
    line-height: 32px;
    outline: none;
    &::placeholder {
      color: #cccccc;
    }
    &--inline {
      display: none;
    }
  }
  &-picker {
    z-index: 100;
    position: absolute;
    left: 0;
    width: 648px;
    min-height: 420px;
    padding: 24px;
    background-color: #ffffff;
    // border: solid 1px #ececec;
    border-radius: 6px;
    box-shadow: 0 2px 30px 0 rgba(0, 0, 0, 0.27);
    overflow: hidden;
    &--inline {
      position: relative;
      box-shadow: none;
    }
  }
  &-calendar {
    &-header {
      position: relative;
      width: 100%;
      height: 36px;
      > .info {
        display: inline-block;
        width: calc(100% - 24px);
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        .from-text {
          //
        }
        .from-date,
        .to-date {
          margin: 0 8px;
          font-weight: 700;
        }
        .to-text {
          //
        }
      }
      > a.close {
        position: absolute;
        right: 0;
        width: 24px;
        height: 24px;
        cursor: pointer;
      }
    }
    &-footer {
      position: relative;
      width: 100%;
      height: 36px;
      .reset, .confirm {
        position: absolute;
        bottom: 0;
        margin: 8px 0;
        padding: 0 8px;
        font-weight: 500;
        cursor: pointer;
      }
      .reset {
        left: 0;
        color: #7d7d7d;
        @media (hover: hover) {
          &:hover {
            color: darken(#7d7d7d, 20%)
          }
        }
      }
      .confirm {
        right: 0;
        color: #0088ff;
        @media (hover: hover) {
          &:hover {
            color: darken(#0088ff, 20%)
          }
        }
      }
    }
    &-left,
    &-right {
      display: inline-block;
      vertical-align: top;
      width: 280px;
    }
    &-left {
      margin-right: 40px;
    }
    .calendar {
      &-month {
        position: relative;
        height: 32px;
        margin-bottom: 8px;
        .next-arrow,
        .previous-arrow {
          position: absolute;
          top: 0;
          padding-top: 4px;
          // border: solid 1px #0088FF;
          cursor: pointer;
          &.disabled {
            // cursor: not-allowed;
            display: none!important;
          }
        }
        .previous-arrow {
          left: 0;
        }
        .next-arrow {
          right: 0;
        }
        .previous-arrow.offset-1 {
          display: none;
        }
        .next-arrow.offset-1 {
          display: none;
        }
        &-title {
          margin: 8px 0;
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
        &-item {
          float: left;
          display: inline-block;
          font-size: 12px;
          font-weight: 500;
          width: calc(100% / 7);
          height: 20px;
          color: #505050;
          text-align: center;
          line-height: 20px;
        }
      }
      &-date {
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
            font-weight: 500;
            line-height: 40px;
            color: #505050;
            // border: solid 1px #b2d7ff;
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
            &.today {
              border: solid 1px #0088ff;
            }
            &.forbidden {
              // color: #a10903;
              color: #fed9d8;
              cursor: not-allowed;
            }
          }
        }
      }
    }
  }
}

@media only screen and (max-width: 767.98px) {
  .vhd {
    &-container:not(.desktop) {
      @include mobile-vhd();
    }
  }
}
</style>
