import React from 'react'
import { shallow } from 'enzyme'
import Photo from './Photo'

const minProps = {
  post: { dispay_src: '' },
  id: '',
  incrementLikes: () => {}
}

describe('rendering',() => {
  it('renders without crashing', () => {
    shallow(<Photo {...minProps} />)
  })

  it('renders without crashing', () => {
    shallow(<Photo {...minProps} />)
  })
})

describe('interaction',() => {
  
})