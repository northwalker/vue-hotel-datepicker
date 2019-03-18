import { shallowMount } from '@vue/test-utils'
import App from '@/App.vue'

describe('App.vue', () => {
  it('renders header when passed', () => {
    const wrapper = shallowMount(App, {})
    expect(wrapper.text()).toMatch('Vue Hotel Datepicker')
  })
})
