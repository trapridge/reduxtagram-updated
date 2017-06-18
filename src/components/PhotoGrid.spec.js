import React from 'react'
import { shallow } from 'enzyme'

import PhotoGrid from './PhotoGrid'

const minProps = {
  posts: {},
  loadPosts: jest.fn(),

  // needed by children
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
          a: { id: 'a', post: {} },
          b: { id: 'a', post: {} },
          c: { id: 'a', post: {} }
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
    describe('componentWillMount', () => {
      const wrapper = shallow(<PhotoGrid {...minProps} />)

      beforeEach(() => {
        wrapper.instance().componentWillMount()
      })

      it('should call loadPosts', () => {
        expect(minProps.loadPosts).toBeCalled()
      })
    })
  })
})
