import { describe, it, expect } from 'vitest'

import { mount } from '@vue/test-utils'
import FitxButton from './fitx-button.vue'

describe('FitxButton', () => {
  it('renders properly', () => {
    const wrapper = mount(FitxButton, { props: { msg: 'Hello FitX' } })
    expect(wrapper.text()).toContain('Hello FitX')
  })
})
