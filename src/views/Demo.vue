<template>
  <div id="demo" class="demo">
    <h2>Demo</h2>
    <div class="demo-example">
      <p>1. Default simple range datepicker without any config</p>
      <VueHotelDatepicker />
    </div>
    <div class="demo-example">
      <p>2. Default range datepicker with selected start date <code>{{ displayDateText(testStartDate) }}</code> and end date <code>{{ displayDateText(testEndDate) }}</code></p>
      <VueHotelDatepicker :startDate="testStartDate" :endDate="testEndDate" />
    </div>
    <div class="demo-example">
      <p>3. a mobile version of range datepicker with selected start date <code>{{ displayDateText(testStartDate) }}</code> and end date <code>{{ displayDateText(testEndDate) }}</code></p>
      <VueHotelDatepicker :startDate="testStartDate" :endDate="testEndDate" :mobile="'mobile'" />
    </div>
    <div class="demo-example">
      <p>4. Default range datepicker with limited date range min date <code>{{ displayDateText(testMinDate) }}</code> and max date <code>{{ displayDateText(testMaxDate) }} </code> </p>
      <VueHotelDatepicker :minDate="testMinDate" :maxDate="testMaxDate" />
    </div>
    <div class="demo-example">
      <p>5. Customized format <code>MM/DD/YYYY</code> and seperator <code>-</code></p>
      <VueHotelDatepicker :format="'MM/DD/YYYY'" :seperator="' - '"  :startDate="testStartDate" :endDate="testEndDate" />
    </div>
    <div class="demo-example">
      <p>6. Mininum number of nights: <code>7</code></p>
      <VueHotelDatepicker :minNight="7" />
    </div>
    <div class="demo-example">
      <p>7. Maximum number of nights: <code>5</code></p>
      <VueHotelDatepicker :maxNight="5" />
    </div>
    <div class="demo-example">
      <p>8. Range between <code>4</code> and <code>8</code> nights</p>
      <VueHotelDatepicker :minNight="4" :maxNight="8" />
    </div>
    <div class="demo-example">
      <p>9. Disallow to select end date before start date</p>
      <VueHotelDatepicker :selectForward="false"/>
    </div>
    <div class="demo-example">
      <p>
        10. Disable some dates
        <span v-for="(date, index) in disabledDates" :key="index">
          <code>{{ date }}</code>
          <span v-if="index !== disabledDates.length - 1">, </span>
        </span>
      </p>
      <VueHotelDatepicker :disabledDates="disabledDates"/>
    </div>
    <div class="demo-example">
      <p>11. Use datepicker in another language (ex: 繁體中文)</p>
      <VueHotelDatepicker
        :fromText="'從'" :toText="'到'"
        :resetText="'重設'" :confirmText="'確認'"
        :weekList="['週一', '週二', '週三', '週四', '週五', '週六', '週日']"
        :monthList="['一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月', '十二月']"
      />
    </div>
  </div>
</template>

<script>
import VueHotelDatepicker from '@/components/VueHotelDatepicker.vue'

export default {
  name: 'Demo',
  components: {
    VueHotelDatepicker
  },
  data () {
    return {
      testStartDate: undefined,
      testEndDate: undefined,
      testMinDate: undefined,
      testMaxDate: undefined,
      disabledDates: []
    }
  },
  created () {
    const now = new Date()
    const nextMonOffset = 7 + Math.abs((1 - now.getDay()))
    this.testStartDate = new Date(now.getFullYear(), now.getMonth(), now.getDate() + nextMonOffset, 0, 0, 0)
    this.testEndDate = new Date(now.getFullYear(), now.getMonth(), now.getDate() + nextMonOffset + 5, 0, 0, 0)
    this.testMinDate = new Date(now.getFullYear(), now.getMonth() + 1, 1, 0, 0, 0)
    this.testMaxDate = new Date(now.getFullYear(), now.getMonth() + 1, 21, 0, 0, 0)

    const disableDate1 = now.getTime() + (1000 * 60 * 60 * 24 * 7)
    const disableDate2 = now.getTime() + (1000 * 60 * 60 * 24 * 8)
    const disableDate3 = now.getTime() + (1000 * 60 * 60 * 24 * 13)
    const disableDate4 = now.getTime() + (1000 * 60 * 60 * 24 * 16)
    const disableDate5 = now.getTime() + (1000 * 60 * 60 * 24 * 21)
    this.disabledDates = [
      this.displayDateText(new Date(disableDate1)),
      this.displayDateText(new Date(disableDate2)),
      this.displayDateText(new Date(disableDate3)),
      this.displayDateText(new Date(disableDate4)),
      this.displayDateText(new Date(disableDate5))
    ]
  },
  methods: {
    displayDateText (datetime) {
      if (datetime) {
        datetime = typeof (datetime) === 'string' ? new Date(datetime) : datetime
        const yyyy = datetime.getFullYear()
        const mm = datetime.getMonth() + 1 > 9 ? datetime.getMonth() + 1 : `0${datetime.getMonth() + 1}`
        const dd = datetime.getDate() > 9 ? datetime.getDate() : `0${datetime.getDate()}`
        const displayStr = (this.format || 'YYYY/MM/DD').replace('YYYY', yyyy).replace('MM', mm).replace('DD', dd)
        return displayStr
      } else {
        return null
      }
    }
  }
}
</script>

<style lang="scss">
.demo {
  margin-bottom: 200px;
  &-example {
    margin-bottom: 60px;
  }
  code {
    padding: 4px;
    color: #0088ff;
    font-weight: 700;
    background-color: #ececec;
    border-radius: 4px;
  }
}
</style>
