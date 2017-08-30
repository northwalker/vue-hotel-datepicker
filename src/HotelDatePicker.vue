<template>
  <div>
    <div class="datepicker_container">
      <input class="datepicker__input" type="text" :id="datePickerId" :placeholder="placeholder" />
    </div>
  </div>
</template>

<script>
import Datepicker from '../vendor/hotel-datepicker.js';

const defaultDatei18n = {
  selected: 'Your stay:',
  night: 'Night',
  nights: 'Nights',
  button: 'Close',
  'check-in': 'Check-in',
  'check-out': 'Check-Out',
  'day-names': ['Sun', 'Mon', 'Tue', 'Wed', 'Thur', 'Fri', 'Sat'],
  'month-names': ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
  'error-more': 'Date range should not be more than 1 night',
  'error-more-plural': 'Date range should not be more than %d nights',
  'error-less': 'Date range should not be less than 1 night',
  'error-less-plural': 'Date range should not be less than %d nights',
  'info-more': 'Please select a date range longer than 1 night',
  'info-more-plural': 'Please select a date range longer than %d nights',
  'info-range': 'Please select a date range between %d and %d nights',
  'info-default': 'Please select a date range'
};

export default {
  name: 'HotelDatePicker',
  components: {
  },
  props: {
    datePickerId: {
      type: String,
      default: '1'
    },
    placeholder: {
      type: String,
      default: 'Check-in ~ Check-out'
    },
    format: {
      type: String,
      default: 'YYYY-MM-DD'
    },
    infoFormat: {
      type: String,
      default: 'YYYY-MM-DD'
    },
    separator: {
      type: String,
      default: ' - '
    },
    startOfWeek: {
      type: String,
      default: 'sunday'
    },
    startDate: {
      type: [Date, String],
      default: function() {
        return new Date()
      }
    },
    endDate: {
      type: [Date, String, Boolean]
    },
    minNights: {
      type: Number,
      default: 1
    },
    maxNights: {
      type: Number,
      default: 0
    },
    selectForward: {
      type: Boolean,
      default: false
    },
    disabledDates: {
      type: Array,
      default: function() { return [] }
    },
    enableCheckout: {
      type: Boolean,
      default: false
    },
    container: {
      type: String,
      default: ''
    },
    animationSpeed: {
      type: String,
      default: '.5s'
    },
    hoveringTooltip: {
      type: [Boolean, Function],
      default: true
    },
    showTopbar: {
      type: Boolean,
      default: true
    },
    autoClose: {
      type: Boolean,
      default: true
    },
    i18n: {
      type: Object,
      default: () => defaultDatei18n
    }
  },
  data() {
    return {
      inputValue: '',
      hdpkr: {}
    }
  },
  computed: {},
  watch: {
    'hdpkr.isOpen': {
      handler(newVal, oldVal) {
        if (!this.hdpkr.isOpen && this.hdpkr.changed) {
          const date = document.querySelector(`#${this.datePickerId}`).value;
          this.$emit('updateDateRange', date);
        }
        else if (!this.hdpkr.isOpen && !this.hdpkr.changed) {
          this.$emit('cancelUpdateDateRange');
        }
      }
    }
  },
  methods: {
    getValue() {
      return this.hdpkr.getValue();
    },
    setValue(val) {
      this.hdpkr.setValue(val);
    },
    toggle() {
      if (this.hdpkr.isOpen)
        this.close();
      else
        this.open();
    },
    open: function() {
      setTimeout(() => {
        this.hdpkr.open();
      }, 0)
    },
    close() {
      setTimeout(() => {
        this.hdpkr.close();
      }, 0)
    },
    clear() {
      // Clears the datepicker value.
      setTimeout(() => {
        this.hdpkr.clear();
      }, 100)
    },
    setRange(d1, d2) {
      // Sets the date range value.
      this.hdpkr.setRange(d1, d2);
    },
    getDatePicker() {
      // Gets the datepicker DOM element.
      return this.hdpkr.getDatePicker();
    },
    getNights() {
      // Gets the number of nights selected. Returns 0 otherwise.
      return this.hdpkr.getNights();
    },
    updateDateRange(e) {
      const newDate = document.querySelector(`#${this.datePickerId}`).value;
      // console.log('HotelDatepicker updateDateRange', newDate, e);
      this.$emit('updateDateRange', newDate);
    }
  },
  mounted: function() {

    // const containerElement = document.querySelector(this.container);
    // console.log('containerElement', containerElement)

    const hdpkrId = document.querySelector(`#${this.datePickerId}`);
    const hdpkrOptions = {
      datePickerId: this.datePickerId,
      format: this.format,
      infoFormat: this.infoFormat,
      separator: this.separator,
      startOfWeek: this.startOfWeek,
      startDate: this.startDate,
      endDate: this.endDate,
      minNights: this.minNights,
      maxNights: this.maxNights,
      selectForward: this.selectForward,
      disabledDates: this.disabledDates,
      enableCheckout: this.enableCheckout,
      container: this.container,
      animationSpeed: this.animationSpeed,
      hoveringTooltip: this.hoveringTooltip,
      showTopbar: this.showTopbar,
      autoClose: this.autoClose,
      i18n: this.i18n,
    }
    this.hdpkr = new Datepicker(hdpkrId, hdpkrOptions);
    // console.log(this.hdpkr)
    if (!this.showTopbar) {
      // showTopbar is not implement from hotel datepicker now...
      const hdpkr_topbar = document.querySelector('.datepicker__topbar');
      hdpkr_topbar.style.display = 'none';
    }
  }
}
</script>

<style lang="scss">
@import '../vendor/hotel-datepicker.css';


// ///////////////////////////////////////////////
// Overwrite and customize datepicker style
// ///////////////////////////////////////////////
.datepicker {
  * {
    box-sizing: border-box;
  } // font-size: 16px;
  // line-height: 16px;
  border-radius: 0px;
  &__input {
    outline: none;
  }
  &__inner {}
  &__week {
    &-days {
      height: 32px; // background-color: #7D7C7D;
    }
    &-name {
      font-size: 12px;
      text-transform: uppercase;
    }
  }
  &__month {
    &-name {
      font-size: 16px;
      text-transform: initial;
    }
    &-caption {
      height: 40px; // background-color: #7D7C7D;
    }
  }
  &__month-day {
    &--valid {
      color: #393332;
      &:hover {
        background-color: #009EDE;
      }
    }
    &--today {
      background-color: #FFFFFF; // border: 1px solid #009EDE;
      box-shadow: 0px 0px 0px 1px #009EDE inset; //
      // color: #393332;
      &.datepicker__month-day--invalid {
        color: #e8ebf4;
        box-shadow: 0px 0px 0px 1px #e8ebf4 inset;
      }
    }
    &--selected {
      // background-color: rgba(0, 158, 222, 0.5);
      background-color: #C8EAF8; // color: #FFFFFF;
      color: #393332;
    }
    &--hovering {
      // background-color: rgba(0, 158, 222, 0.2) !important;
      background-color: #C8EAF8; // color: #FFFFFF;
      color: #393332;
    }
    &--first-day-selected {
      background-color: #009EDE;
    }
    &--last-day-selected {
      background-color: #009EDE;
    }
  }
  &__month-button {
    background-color: #FFFFFF;
    &:hover {
      background-color: #009EDE;
      color: #FFFFFF;
    }
  }
  &__close-button {
    background-color: #009EDE;
    background-color: #009EDE;
  }
  &__tooltip {
    background-color: rgba(0, 0, 0, 0.7);
    color: #FFFFFF;
    &:after {
      border-top: 4px solid rgba(0, 0, 0, 0.7);
    }
  }
}

@media (max-width: 480px) {

  .datepicker {
    &__month {
      &--month2 {
        display: table;
      }
    }
  }
}

@media (min-width: 768px) {}
</style>
