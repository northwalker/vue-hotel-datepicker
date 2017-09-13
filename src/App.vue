<template>
  <div id="app">
    <div class="container">
      <section class="banner">
        <div class="title">
          <h1>Vue Hotel Datepicker</h1>
        </div>
        <div class="subTitle">
          <h3>A vue.js date range picker for hotel and more. </h3>
        </div>
        <div class="links">
          <div class="linkDownloadWrapper">
            <a class="linkDownload" href="https://github.com/northwalker/vue-hotel-datepicker/archive/v1.0.0.zip">Download .zip</a>
            <a class="linkDownload" href="https://github.com/northwalker/vue-hotel-datepicker/archive/v1.0.0.tar.gz">Download .tar.gz</a>
          </div>
          <div class="linkTextWrapper">
            <a class="linkText" target="_blank" href="https://github.com/northwalker/vue-hotel-datepicker">View on Github</a>
            <a class="linkText" target="_blank" href="https://github.com/northwalker/vue-hotel-datepicker/issues">Report issue</a>
          </div>
        </div>
      </section>
      <section class="content" id="demo">
        <div class="demoContainer">
          <div>
            <h2>Demo</h2>
          </div>
          <div class="demoDatepicker">
            <p>Demo 1: Default simple range datepicker with an predafined input</p>
            <HotelDatePicker :ref="dpkr1.datePickerId" :active="dpkr1.active" :datePickerId="dpkr1.datePickerId" :placeholder="dpkr1.placeholder" :selectForward="dpkr1.selectForward" :separator="dpkr1.separator" :showTopbar="dpkr1.showTopbar" :hoveringTooltip="dpkr1.hoveringTooltip" />
          </div>
          <div class="demoDatepicker">
            <p>Demo 2: Default hotel style range datepicker with a predefined value in the input </p>
            <HotelDatePicker :ref="dpkr2.datePickerId" :datePickerId="dpkr2.datePickerId" :placeholder="dpkr2.placeholder" />
          </div>
          <div class="demoDatepicker">
            <p>Demo 3: Default hotel style range datepicker setting with an empty input</p>
            <HotelDatePicker :ref="dpkr3.datePickerId" :datePickerId="dpkr3.datePickerId" :placeholder="dpkr3.placeholder" />
          </div>
          <div class="demoDatepicker">
            <p>Demo 4: Custom format:
              <span class="parameter">{{dpkr4.format}}</span>
            </p>
            <HotelDatePicker :ref="dpkr4.datePickerId" :datePickerId="dpkr4.datePickerId" :placeholder="dpkr4.placeholder" :autoClose="autoClose" :separator="separator" :format="dpkr4.format" />
          </div>
          <div class="demoDatepicker">
            <p>Demo 5: Start of week:
              <span class="parameter">{{dpkr5.startOfWeek}}</span>
            </p>
            <HotelDatePicker :ref="dpkr5.datePickerId" :datePickerId="dpkr5.datePickerId" :placeholder="dpkr5.placeholder" :autoClose="autoClose" :separator="separator" :startOfWeek="dpkr5.startOfWeek" />
          </div>
          <div class="demoDatepicker">
            <p>Demo 6: Mininum number of nights:
              <span class="parameter">7</span>
            </p>
            <HotelDatePicker :ref="dpkr6.datePickerId" :datePickerId="dpkr6.datePickerId" :placeholder="dpkr6.placeholder" :autoClose="autoClose" :separator="separator" :minNights="dpkr6.minNights" />
          </div>
          <div class="demoDatepicker">
            <p>Demo 7: Maximum number of nights:
              <span class="parameter">5</span>
            </p>
            <HotelDatePicker :ref="dpkr7.datePickerId" :datePickerId="dpkr7.datePickerId" :placeholder="dpkr7.placeholder" :autoClose="autoClose" :separator="separator" :maxNights="dpkr7.maxNights" />
          </div>
          <div class="demoDatepicker">
            <p> Demo 8:Range between
              <span class="parameter">4</span> and
              <span class="parameter">8</span> nights</p>
            <HotelDatePicker :ref="dpkr8.datePickerId" :datePickerId="dpkr8.datePickerId" :placeholder="dpkr8.placeholder" :autoClose="autoClose" :separator="separator" :minNights="dpkr8.minNights" :maxNights="dpkr8.maxNights" />
          </div>
          <div class="demoDatepicker">
            <p>Demo 9: Don't allow ranges before custom date:
              <span class="parameter"> {{dpkr9.startDate}} </span>
            </p>
            <HotelDatePicker :ref="dpkr9.datePickerId" :datePickerId="dpkr9.datePickerId" :placeholder="dpkr9.placeholder" :startDate="dpkr9.startDate" :autoClose="autoClose" :separator="separator" />
          </div>
          <div class="demoDatepicker">
            <p>Demo 10: Don't allow ranges after custom date:
              <span class="parameter"> {{dpkr10.endDate}} </span>
            </p>
            <HotelDatePicker :ref="dpkr10.datePickerId" :datePickerId="dpkr10.datePickerId" :placeholder="dpkr10.placeholder" :endDate="dpkr10.endDate" :autoClose="autoClose" :separator="separator" />
          </div>
          <div class="demoDatepicker">
            <p>Demo 11: Don't allow selections in both directions (first click = first date, second click = second date)</p>
            <HotelDatePicker :ref="dpkr11.datePickerId" :datePickerId="dpkr11.datePickerId" :placeholder="dpkr11.placeholder" :selectForward="dpkr11.selectForward" :autoClose="autoClose" :separator="separator" />
          </div>
          <div class="demoDatepicker">
            <p>
              Deom 12: Disable some dates:
              <span class="parameter">
                {{dpkr12.disabledDates}}
              </span>
            </p>
            <HotelDatePicker :ref="dpkr12.datePickerId" :datePickerId="dpkr12.datePickerId" :placeholder="dpkr12.placeholder" :autoClose="autoClose" :separator="separator" :disabledDates="dpkr12.disabledDates" />
          </div>
          <div class="demoDatepicker">
            <p>Demo :13 Disable some dates but allow the checkout in those dates. </p>
            <HotelDatePicker :ref="dpkr13.datePickerId" :datePickerId="dpkr13.datePickerId" :placeholder="dpkr13.placeholder" :autoClose="autoClose" :separator="separator" :disabledDates="dpkr13.disabledDates" :enableCheckout="dpkr13.enableCheckout" />
          </div>
          <div class="demoDatepicker">
            <p>Demo 14: Don't close the datepicker after selection</p>
            <HotelDatePicker :ref="dpkr14.datePickerId" :datePickerId="dpkr14.datePickerId" :placeholder="dpkr14.placeholder" :autoClose="dpkr14.autoClose" />
          </div>
          <div class="demoDatepicker">
            <p>Demo 15: Use datepicker in another language (繁體中文)</p>
            <HotelDatePicker :ref="dpkr15.datePickerId" :datePickerId="dpkr15.datePickerId" :placeholder="dpkr15.placeholder" :autoClose="autoClose" :separator="separator" :i18n="dpkr15.i18n" />
          </div>
          <div class="demoDatepicker">
            <p>Demo 16: Trigger by other click event</p>
            <p v-if="dpkr16.value">Your selected date range: {{dpkr16.value}}</p>
            <HotelDatePicker :ref="dpkr16.datePickerId" :datePickerId="dpkr16.datePickerId" :placeholder="dpkr16.placeholder" :autoClose="dpkr16.autoClose" :separator="separator" v-on:updateDateRange="updateDateRange" />
            <a class="btn" @click="toggle(dpkr16.datePickerId)"> Click me! </a>
          </div>
        </div>
      </section>
      <section class="footer"></section>
    </div>
  </div>
</template>

<script>
import fecha from 'fecha';
import HotelDatePicker from './HotelDatePicker.vue';
const i18nEnData = {
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
const i18nTWData = {
  selected: 'Your stay:',
  night: 'Night',
  nights: 'Nights',
  button: '關閉',
  'check-in': 'Check-in',
  'check-out': 'Check-Out',
  'day-names': ['日', '一', '二', '三', '四', '五', '六'],
  'month-names': ['一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月', '十二月'],
  'error-more': '日期範圍需要多於一晚',
  'error-more-plural': 'Date range should not be more than %d nights',
  'error-less': 'Date range should not be less than 1 night',
  'error-less-plural': 'Date range should not be less than %d nights',
  'info-more': 'Please select a date range longer than 1 night',
  'info-more-plural': 'Please select a date range longer than %d nights',
  'info-range': 'Please select a date range between %d and %d nights',
  'info-default': '請選擇一個日期範圍'
};
export default {
  name: 'DateRangePicker',
  components: {
    HotelDatePicker
  },
  props: {
  },
  data() {
    return {
      autoClose: false,         // common setting
      separator: ' ~ ',         // common setting
      selectForward: false,     // common setting
      hoveringTooltip() {       // common setting
        // Overwrite default boolean
        // Not working when value is false (boolean)
        return false;
      },
      dpkr1: {
        value: '',
        datePickerId: 'datePickerId01',
        placeholder: 'DatePicker example 01',
        selectForward: false,
        separator: ' ~ ',
        showTopbar: false,
        hoveringTooltip() {
          // Overwrite default boolean
          // Not working when value is false (boolean)
          return false;
        }
      },
      dpkr2: {
        value: '',
        datePickerId: 'datePickerId02',
        placeholder: 'DatePicker example 02',
      },
      dpkr3: {
        value: '',
        datePickerId: 'datePickerId03',
        placeholder: 'DatePicker example 03',
      },
      dpkr4: {
        value: '',
        datePickerId: 'datePickerId04',
        placeholder: 'DatePicker example 04',
        format: 'DD-MM-YYYY'
      },
      dpkr5: {
        value: '',
        datePickerId: 'datePickerId05',
        placeholder: 'DatePicker example 05',
        startOfWeek: 'monday'
      },
      dpkr6: {
        value: '',
        datePickerId: 'datePickerId06',
        placeholder: 'DatePicker example 06',
        minNights: 7
      },
      dpkr7: {
        value: '',
        datePickerId: 'datePickerId07',
        placeholder: 'DatePicker example 07',
        maxNights: 5
      },
      dpkr8: {
        value: '',
        datePickerId: 'datePickerId08',
        placeholder: 'DatePicker example 08',
        minNights: 4,
        maxNights: 8
      },
      dpkr9: {
        value: '',
        datePickerId: 'datePickerId09',
        placeholder: 'DatePicker example 09',
        startDate: fecha.format(new Date(new Date().getTime() + 5 * 24 * 60 * 60 * 1000), 'YYYY-MM-DD')
      },
      dpkr10: {
        value: '',
        datePickerId: 'datePickerId10',
        placeholder: 'DatePicker example 10',
        endDate: fecha.format(new Date(new Date().getTime() + 25 * 24 * 60 * 60 * 1000), 'YYYY-MM-DD')
      },
      dpkr11: {
        value: '',
        datePickerId: 'datePickerId11',
        placeholder: 'DatePicker example 11',
        selectForward: true
      },
      dpkr12: {
        value: '',
        datePickerId: 'datePickerId12',
        placeholder: 'DatePicker example 12',
        disabledDates: [
          fecha.format(new Date(new Date().getTime() + 7 * 24 * 60 * 60 * 1000), 'YYYY-MM-DD'),
          fecha.format(new Date(new Date().getTime() + 9 * 24 * 60 * 60 * 1000), 'YYYY-MM-DD'),
          fecha.format(new Date(new Date().getTime() + 12 * 24 * 60 * 60 * 1000), 'YYYY-MM-DD'),
          fecha.format(new Date(new Date().getTime() + 15 * 24 * 60 * 60 * 1000), 'YYYY-MM-DD'),
          fecha.format(new Date(new Date().getTime() + 16 * 24 * 60 * 60 * 1000), 'YYYY-MM-DD')
        ]
      },
      dpkr13: {
        value: '',
        datePickerId: 'datePickerId13',
        placeholder: 'DatePicker example 13',
        disabledDates: [
          fecha.format(new Date(new Date().getTime() + 7 * 24 * 60 * 60 * 1000), 'YYYY-MM-DD'),
          fecha.format(new Date(new Date().getTime() + 9 * 24 * 60 * 60 * 1000), 'YYYY-MM-DD'),
          fecha.format(new Date(new Date().getTime() + 12 * 24 * 60 * 60 * 1000), 'YYYY-MM-DD'),
          fecha.format(new Date(new Date().getTime() + 15 * 24 * 60 * 60 * 1000), 'YYYY-MM-DD'),
          fecha.format(new Date(new Date().getTime() + 16 * 24 * 60 * 60 * 1000), 'YYYY-MM-DD')
        ],
        enableCheckout: true
      },
      dpkr14: {
        value: '',
        datePickerId: 'datePickerId14',
        placeholder: 'DatePicker example 14',
        autoClose: false
      },
      dpkr15: {
        value: '',
        datePickerId: 'datePickerId15',
        placeholder: 'DatePicker example 15',
        autoClose: false,
        i18n: i18nTWData
      },
      dpkr16: {
        value: '',
        datePickerId: 'datePickerId16',
        placeholder: 'DatePicker example 16',
        autoClose: true
      }
    }
  },
  watch: {
  },
  computed: {
  },
  methods: {
    toggle(datePickerId) {
      console.log('toggle', datePickerId)
      this.$refs[datePickerId].toggle();
    },
    getValue(datePickerId) {
      return this.$refs[datePickerId].getValue();
    },
    setValue(datePickerId, val) {
      this.$refs[this.datePickerId].setValue(val);
    },
    open(datePickerId, sinceDate, untilDate) {
      this.$refs[datePickerId].open();
      if (sinceDate && untilDate) {
        this.$refs[datePickerId].setRange(sinceDate, untilDate);
      }
    },
    close(datePickerId) {
      this.$refs[datePickerId].close();
    },
    getDatePicker(datePickerId) {
      const hdpkr = this.$refs[datePickerId].getDatePicker();
      // console.log(hdpkr);
    },
    setRange(datePickerId, d1, d2) {
      this.$refs[datePickerId].setRange(d1, d2);
    },
    hideDateInput(dpkr) {
      const hdpkrInput = document.querySelector(`#${dpkr.datePickerId}`);
      if (hdpkrInput && hdpkrInput.style)
        hdpkrInput.style.display = 'none';
    },
    updateDateRange: function(newDateRange, datePickerId) {
      Object.keys(this.$data).map(key => {
        if (typeof (this.$data[key]) === 'object')
          if (this.$data[key].datePickerId === datePickerId)
            this.$data[key].value = newDateRange;
      })
    }
  },
  mounted() {
    // this.hideDateInput();

    // Demo example 1
    const demo1_d1 = new Date(); // tomorrow
    const demo1_d2 = new Date(new Date().getTime() + 5 * 24 * 60 * 60 * 1000); // 5 day after today
    this.setRange(this.dpkr1.datePickerId, demo1_d1, demo1_d2);

    // Demo example 2
    const demo2_d1 = new Date(new Date().getTime() + 24 * 60 * 60 * 1000); // tomorrow
    const demo2_d2 = new Date(new Date().getTime() + 5 * 24 * 60 * 60 * 1000); // 5 day after tomorrow
    this.setRange(this.dpkr2.datePickerId, demo2_d1, demo2_d2);

    // Demo example 16
    const dpkr16Element = document.querySelector(`#${this.dpkr16.datePickerId}`);
    if (dpkr16Element)
      dpkr16Element.style.display = 'none';
  }

}
</script>

<style lang="scss">
* {
  box-sizing: border-box;
}

html,
body {
  margin: 0;
  padding: 0;
  font-family: Helvetica, Arial, sans-serif;
  font-size: 16px
}

#app {
  .container {
    margin: 0 auto; //
    // width: 560px;
    @media (min-width: 320px) {
      width: 300px;
    }
    @media (min-width: 480px) {
      width: 460px;
    }
    @media (min-width: 481px) and (max-width: 1023px) {
      width: calc(100vw - 80px);
    }
    @media (min-width: 1024px) {
      width: 960px;
    }
    .banner {
      // * {
      //   border: 1px solid black;
      // }
      padding-top: 30px;
      padding-bottom: 30px;
      margin-bottom: 30px;
      border-bottom: 1px solid #9A9A9A;

      .title {
        h1 {
          font-size: 40px;
          color: #484c55;
        }
      }
      .subTitle {
        h3 {
          font-size: 24px;
          color: #484c55;
        }
      }
      .links {
        .linkDownloadWrapper {
          > a {
            margin-right: 20px;
          }
        }
        .linkDownload {
          display: inline-block;
          min-width: 160px;
          padding: 16px;
          font-size: 18px;
          text-align: center;
          text-decoration: none;
          vertical-align: middle;
          color: #007BFF;
          border: 1px solid #007BFF;
          border-radius: 6px;
          background-color: transparent;
          outline: none;
          transition: .3s ease;
          &:hover {
            cursor: pointer;
            color: #FFFFFF;
            background-color: #007BFF;
          }
        }
        .linkTextWrapper {
          margin: 30px 0 0;
        }
        a.linkText {
          margin-top: 20px;
          margin-right: 20px;
          font-size: 16px;
          text-decoration: none;
          color: #9A9A9A;
          transition: .3s ease;
          &:hover {
            cursor: pointer;
            color: #007BFF;
          }
        }
      }
    }

    .demoContainer {
      margin-bottom: 270px;
      .demoDatepicker {
        margin: 40px 20px;
        .p {
          line-height: 20px;
        }
        .btn {
          display: block;
          width: 120px;
          padding: 8px 12px;
          font-size: 16px;
          line-height: 20px;
          text-align: center;
          color: #FFFFFF;
          background-color: #007BFF;
          border-color: #007BFF;
          border-radius: 8px;
          transition: .15s;
          cursor: pointer;
        }
        .parameter {
          border-radius: 3px;
          padding: 3px;
          background-color: #E5E5E5;
          color: #007BFF;
          font-size: 14px
        }
        input:focus {
          border-color: #007BFF
        }
      } //
      // input {
      //   font-size: 13px;
      //   width: 240px;
      //   margin: 0;
      //   line-height: normal;
      //   box-sizing: border-box;
      //   padding: 10px 20px;
      //   border: 1px solid #DCDCDC;
      //   &::placeholder {
      //     color: #E5E5E5;
      //   }
      // }
    }

    .footer {
      height: 10px;
      background-color: #FFF;
    }
  }
}
</style>
