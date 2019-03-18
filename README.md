
<!-- <a href="https://www.npmjs.com/package/nw-vhd-test"><img src="https://img.shields.io/npm/v/nw-vhd-test.svg" alt="Version"></a> -->
<a href="https://www.npmjs.com/package/nw-vhd-test"><img src="https://img.shields.io/npm/l/nw-vhd-test.svg" alt="License"></a>
<a href="https://npmcharts.com/compare/nw-vhd-test?minimal=true"><img src="https://img.shields.io/npm/dm/nw-vhd-test.svg" alt="Downloads"></a>
<a href="https://standardjs.com"><img src="https://img.shields.io/badge/code_style-standard-brightgreen.svg" alt="Code Style"></a>

# vue-hotel-datepicker

A pure [Vue.js](https://vuejs.org/) date range picker component without any other dependencies for hotels date range selection and multi-purpose. Vue hotel datepicker provide date range selecting, minimum and maximum night limitation, custom methods for date restriction, custom date formating and localization support.

## Demo

### Live demo(Github page)
  > [https://northwalker.github.io/vue-hotel-datepicker/](https://northwalker.github.io/vue-hotel-datepicker/)

### Figure preview
  > ![vue-hotel-datepicker demo picture](https://raw.githubusercontent.com/northwalker/vue-hotel-datepicker/master/demo_vue_hotel_picker.png)


### Previous version
  > v1.0.0: [Document](https://github.com/northwalker/vue-hotel-datepicker/tree/v1.0.0)

## Installation / Usage

##### Usage of vue componet
Use ```npm``` or ```yarn``` install and add dependence
```bash
npm install https://github.com/northwalker/vue-hotel-datepicker.git
```
or
```bash
yarn add https://github.com/northwalker/vue-hotel-datepicker.git
```

import component

```vue
<template>
  <VueHotelDatepicker />
</template>

<script>
import VueHotelDatepicker from 'vue-hotel-datepicker'

export default {
  name: 'App'
  components: {
    VueHotelDatepicker
  }
  //
  // ... skip
  //
}
</script>

```

##### Via static javascript file
Download this repo and copy file ```/lib/vue-hotel-datepicker.umd.min.js``` to ```/<your-lib-folder-path>/```, and add below code to your html file.
```html
<script type="text/javascript" src="/<your-lib-folder-path>/vue-hotel-datepicker.umd.min.js"></script>
```

## Props/Options

### placeholder
 - Type: `String`
 - Default: `Select a date range`

The input placeholder text

### format

 - Type: `String`
 - Default: `YYYY-MM-DD`

The date format string.

### separator

 - Type: `String`
 - Default: ` ~ `

The separator string used between date strings.

### startDate

 - Type: `Date` or `String`
 - Default: `undefined`

The start date of given date range.

### endDate

 - Type: `Date` or `String`
 - Default: `undefined`

The end date of given date range.

### minDate

 - Type: `Date` or `String`
 - Default: today

The start view date. All the dates before this date will be disabled.

### maxDate

 - Type: `Date` or `String` or `Boolean`
 - Default: `false`

The end view date. All the dates after this date will be disabled.

### minNights

 - Type: `Number`
 - Default: `0`

Minimum nights required to select a range of dates.

### maxNights

 - Type: `Number`
 - Default: `0`

Maximum nights required to select a range of dates.

### selectForward

 - Type: `Boolean`
 - Default: `false`

If `true`, the selection of the second date must be after the first date. If `false`, you can select a range of dates in both directions.

### disabledDates

 - Type: `Array`
 - Default: `[]`

An array of strings by props format value, default `YYYY-MM-DD` (as same as default `format`). All the dates passed to the list can not be selected as a start and end date.

### weekList
 - Type: `Array`
 - Default: `['Sun.', 'Mon.', 'Tue.', 'Wen.', 'Thu.', 'Fri.', 'Sat.']`

A array of strings for week text.

### monthList
 - Type: `Array`
 - Default: `['Jan.', 'Feb.', 'Mar.', 'Apr.', 'May.', 'Jun.', 'Jul.', 'Aug.', 'Sep.', 'Oct', 'Nov.', 'Dec.']`

A array of strings for month text.

### fromText
 - Type: `String`
 - Default: `From`

Text of label "From".

### toText
 - Type: `String`
 - Default: `To`

Text of label "To".

### resetText
 - Type: `String`
 - Default: `Reset`

Text of button "Reset"

### confirmText
 - Type: `String`
 - Default: `Confirm`

Text of button "Confirm"

## Events

### update
When a new date is selected, ```VueHotelDatepicker``` will emit an event ```update```, passing the new date range object to parent component.

### close
when a cancellation button click or occurred, ```VueHotelDatepicker``` will emit an event ```close``` to notify parent component.

### reset
when a reset button click or occurred, ```VueHotelDatepicker``` will emit an event ```reset``` to notify parent component.

## License
[MIT License](http://opensource.org/licenses/MIT)

Copyright &copy; 2019 [Northwalker](https://northwalker.github.io)