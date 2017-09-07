# vue-hotel-datepicker
A [Vue.js](https://vuejs.org/) date range picker component for hotels and multi-purpose. Vue hotel datepicker provide date range selecting, minimum and maximum night limitation, custom methods for date restriction, custom date formating and localization support, This repository wrapped up and inspired from a pure javascript [Hotel Datepicker](https://github.com/benitolopez/hotel-datepicker) by @benitolopez.

## Demo

##### Github page: 

> [https://northwalker.github.io/vue-hotel-datepicker/](https://northwalker.github.io/vue-hotel-datepicker/)

##### Live image: 
> ![vue-hotel-picker demo picture](https://raw.githubusercontent.com/northwalker/vue-hotel-datepicker/master/demo_vue_hotel_picker.png)


##### Running in development environment:

1. clone from github repository 

```bash
git clone https://github.com/northwalker/vue-hotel-datepicker.git
```
2. npm install
```bash
npm install or yarn install   
```
3. run script
```bash
npm run dev or yarn run dev
```

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
  <VueHotelDatepicker :ref="datepickerId" :datepickerId="datepickerId" :placeholder="placeholder" />
</template>

<script>
import VueHotelDatepicker from 'vue-hotel-datepicker'

export default {
  name: 'App'
  components: {
    VueHotelDatepicker,
  },
  data(){
    return {
      datepickerId: 'datepicker-demo-id-01',
      placeholder: 'placeholder demo 01'
    }
  }

}
</ script>

```


##### Via static javascript file

Download this repo and copy file ```/dist/vue-hotel-datepicker.min.js``` to ```/<your-component-folder-path>/```, and add below code to your html file. 
```html
<script type="text/javascript" src="/<your-component-folder-path>/vue-hotel-datepicker.min.js"></script>
```


## Props/Options

### datepickerId

- Type: `String`
- Default: `'datepickerId-' + new Date().getTime().toString()` 
  - simulate random id in default

### placeholder

- Type: `String`
- Default: `Check-in ~ Check-out`

The input placeholder text

### format

- Type: `String`
- Default: `YYYY-MM-DD`

The date format string.

### infoFormat

- Type: `String`
- Default: `YYYY-MM-DD`

The date format string in the info box. If not set, it uses the `format` option.

### separator

- Type: `String`
- Default: ` - ` 

The separator string used between date strings.

### startOfWeek

- Type: `String`
- Default: `sunday`

Default start week: `sunday` or `monday`.

### startDate

- Type: `Date` or `String`
- Default: `new Date()`

The start view date. All the dates before this date will be disabled.

### endDate

- Type: `Date` or `String` or `Boolean`
- Default: `false`

The end view date. All the dates after this date will be disabled.

### minNights

- Type: `Number`
- Default: `1`

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

An array of strings in this format: `YYYY-MM-DD`. All the dates passed to the list will be disabled.

### enableCheckout

- Type: `Boolean`
- Default: `false`

If `true`, allows the checkout on a disabled date. But with a criteria. Let's say we have these disabled dates: `03 April 2020` and `04 April 2020`. With this option enabled, an user can still select the first date (`03 April 2020`) for the checkout. But not `04 April 2020`.

### container

- Type: `Element`
- Default: `''`

An element for putting the datepicker. If not set, the datepicker will be appended to the parent of the input.

### animationSpeed

- Type: `String`
- Default: `.5s`

The duration (in seconds) of the animation (open/close datepicker).

### hoveringTooltip

- Type: `Boolean` or `Function`
- Default: `true`

Shows a tooltip when hovering a date. It can be a custom function:

```js
hoveringTooltip: function(nights, startTime, hoverTime) {
    return nights;
}
```

### showTopbar

- Type: `Boolean`
- Default: `true`

Show/hide the toolbar.

### autoClose

- Type: `Boolean`
- Default: `true`

Close the datepicker after the selection of the second date.

### i18n

- Type: `Object`

Default:

```js
i18n: {
    selected: 'Your stay:',
    night: 'Night',
    nights: 'Nights',
    button: 'Close',
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
}
```

## Methods

### getValue()

This function is called when the picker gets the date range string from the input.

### setValue()

This function is called when the picker sets the input value.

## API

### open()

Opens the datepicker.

### close()

Closes the datepicker.

### getDatePicker()

Gets the datepicker DOM element.

### setRange(d1, d2)

Sets the date range value.

### clear()

Clears the datepicker value.

### getNights()

Gets the number of nights selected. Returns `0` otherwise.


## Events

### updateDateRange
When a new date is selected, ```VueHotelDatepicker``` will emit an event ```updateDateRange```, passing the new date range string and datepicker id to parent component.

### cancelUpdateDateRange
when a cancellation button click or occurred, ```VueHotelDatepicker``` will emit an event ```cancelUpdateDateRange```, passing datepicker id to notify parent component.


## Credits
This componend was originally built as a Vue wrapper component for the [Hotel Datepicker](https://github.com/benitolopez/hotel-datepicker) by @benitolopez. It diverted from the original implementation though, implementing extra features.

## License
[MIT](http://opensource.org/licenses/MIT) Copyright (c) 2017 [Northwalker](https://northwalker.github.io)
