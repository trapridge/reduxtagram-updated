import React from 'react'
import { shallow } from 'enzyme'

import PhotoGrid from './PhotoGrid'

const minProps = { 
  posts: {}, 
  loadPosts: jest.fn(),
  incrementLikes: () => {}
}

describe('PhotoGrid', () => {
  describe('RENDERING', () => {
    it('renders without crashing', () => {
      shallow(<PhotoGrid {...minProps} />)
    })

    it('renders a list of Photo tags', () => {
      const props = { 
        ...minProps, 
        posts: {  
          a: { id: 'a', post: {}, incrementLikes: () => {} }, 
          b: { id: 'a', post: {}, incrementLikes: () => {} }, 
          c: { id: 'a', post: {}, incrementLikes: () => {} }
        } 
      }
      const wrapper = shallow(<PhotoGrid {...props} />)

      expect(wrapper.find('.photo-grid').children().length).toBe(3)
      wrapper.find('.photo-grid').children().forEach(node => {
        expect(node).toHaveTagName('Photo')
      })
    })
  })

  describe('INTERACTION', () => {
    describe('componentDidMount', () => {
      const wrapper = shallow(<PhotoGrid {...minProps} />)
      
      beforeEach(() => {
        wrapper.instance().componentDidMount()
      })

      it('should call loadPosts', () => {
        expect(minProps.loadPosts).toBeCalled()
      })
    })
  })
})
