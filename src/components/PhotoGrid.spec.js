import React from 'react'
import { shallow } from 'enzyme'

import PhotoGrid from './PhotoGrid'
import Photo from './Photo'

const minProps = { 
  posts: {}, 
  loadPosts: () => {}, 
  incrementLikes: () => {}  // action creator for Photo
}

describe('PhotoGrid', () => {
  describe('RENDERING', () => {

    it('renders without crashing', () => {
      shallow(<PhotoGrid {...minProps} />)
    })

    it('renders a list of Photos', () => {
      const props = { 
        ...minProps, 
        posts: {  a: {}, b: {}, c: {} } 
      }
      const wrapper = shallow(<PhotoGrid {...props} />)

      expect(wrapper.find('.photo-grid').children().first())
        .toContainReact(<Photo id={''} post={{}} incrementLikes={() => {}} />)
      expect(wrapper.find('.photo-grid').children().length).toBe(3)
    })

  })

  describe('INTERACTION', () => {
    
  })

})