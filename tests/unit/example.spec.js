import { shallowMount } from '@vue/test-utils'
import App from '@/App.vue'
jest.mock('@/views/Demo', () => {})

describe('App.vue', () => {
  it('renders header when passed', () => {
    const wrapper = shallowMount(App, {
      stubs: {
        Demo: true
      }
    })
    expect(wrapper.text()).toMatch('Vue Hotel Datepicker')
  })
})
