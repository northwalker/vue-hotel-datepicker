module.exports = {
  css: { extract: false },
  publicPath: process.env.NODE_ENV === 'production'
    ? '/vue-hotel-datepicker/' // project name
    : '/'
}
