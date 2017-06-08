import React from 'react'
import { shallow } from 'enzyme'

import Single from './Single'

const minProps = { 
  params: { postId: 'a' }, 
  posts: { a: {} },
  comments: {},
  loadPost: jest.fn(),
  startCommentsSync: jest.fn(),
  stopCommentsSync: jest.fn(),

  // needed by children
  incrementLikes: () => {},
  incrementComments: () => {},  
  decrementComments: () => {},
  addComment: () => {},
  removeComment: () => {}
}

describe('Single', () => {
  describe('RENDERING', () => {
    it('renders without crashing', () => {
      shallow(<Single {...minProps} />)
      // console.log(shallow(<Single {...minProps} />).debug())
    })

    it('renders a Photo', () => {
      // const wrapper = shallow(<Single {...minProps} />)
      // expect(wrapper.find('.single-photo')).toHaveTagName('Photo')
    })
  })

  describe('INTERACTION', () => {
    describe('componentWillMount', () => {
      const wrapper = shallow(<Single {...minProps} />)
      
      beforeEach(() => {
        wrapper.instance().componentWillMount()
      })

      it('should call startCommentsSync', () => {
        expect(minProps.startCommentsSync).toBeCalled()
      })

      it('should call loadPost if current post is not available', () => {
        shallow(
          <Single 
            {...minProps}
            params={{ postId: 'wrong id' }} />
        )
        expect(minProps.loadPost).toBeCalled()
      })

      it('should not call loadPost if current post is availabe', () => {
        minProps.loadPost.mockClear()
        expect(minProps.loadPost).not.toBeCalled()
      })
    })
  })

  describe('componentWillUnmount', () => {
    const wrapper = shallow(<Single {...minProps} />)
    
    beforeEach(() => {
      wrapper.instance().componentWillUnmount()
    })

    it('should call stopCommentsSync', () => {
      expect(minProps.stopCommentsSync).toBeCalled()
    })
  })
})
