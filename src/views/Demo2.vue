<template>
  <div id="demo2" class="demo2">
    <div>
      <button class="btn" @click="toggle">toggle modal</button>
      <VueHotelDatepickerModal
        :active="active"
        @apply="applyDate"
        @cancel="applyDate"
      />
    </div>
  </div>
</template>

<script>
import VueHotelDatepickerModal from './components/VueHotelDatepickerModal.vue'

export default {
  name: 'Demo2',
  components: {
    VueHotelDatepickerModal
  },
  data () {
    return {
      active: false
    }
  },
  methods: {
    toggle () {
      this.active = !this.active
    },
    applyDate (result) {
      // console.log(result)
      this.active = false
    }
  }
}
</script>

<style lang="scss">
</style>
