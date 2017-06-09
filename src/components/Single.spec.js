import React from 'react'
import { shallow } from 'enzyme'

import Single from './Single'
import Comments from './Comments'
import Photo from './Photo'

const minProps = { 
  params: { postId: 'a' }, 
  posts: { a: { display_src: ''} },
  comments: { a: { user: 'a', text: 'b'} },
  loadPost: jest.fn(),
  startCommentsSync: jest.fn(),
  stopCommentsSync: jest.fn(),

  // needed by children
  id: 'a',

  // needed by Photo
  incrementLikes: () => {},

  // needed by Comments
  userData: { user: ''},
  incrementComments: () => {},  
  decrementComments: () => {},
  addComment: () => {},
  removeComment: () => {}
}

describe('Single', () => {
  describe('RENDERING', () => {
    it('renders without crashing', () => {
      shallow(<Single {...minProps} />)
    })

    it('renders a Photo', () => {
      const wrapper = shallow(<Single {...minProps} />)
      
      expect(wrapper.find('.single-photo')).toContainReact(
        <Photo 
          id={minProps.id} 
          post={minProps.posts.a} 
          incrementLikes={minProps.incrementLikes} />
      ) 
    })

    it('renders a Comments', () => {
      const wrapper = shallow(<Single {...minProps} />)
       
      expect(wrapper.find('.single-photo')).toContainReact(
        <Comments 
          id={minProps.id}
          userData={minProps.userData}
          comments={minProps.comments}
          addComment={minProps.addComment}
          removeComment={minProps.removeComment}
          incrementComments={minProps.incrementComments} 
          decrementComments={minProps.decrementComments} />
      ) 
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
