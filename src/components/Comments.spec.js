import React from 'react'
import { shallow, mount } from 'enzyme'

import Comments from './Comments'

const minProps = {
  id: 'postId',
  comments: { postId: { commentId: { user: '', text: '' } } },
  userData: { user: '' },
  incrementComments: jest.fn(),
  decrementComments: jest.fn(),
  addComment: jest.fn(),
  removeComment: jest.fn()
}

describe('Comments', () => {
  describe('RENDERING', () => {
    it('renders without crashing', () => {
      shallow(<Comments {...minProps} />)
    })

    it('renders comments', () => {
      const wrapper = shallow(<Comments {...minProps} userData={{}} />)

      wrapper.find('.comments').children().forEach(node => {
        expect(node).toHaveClassName('comment')
      })
    })

    it('renders comment-form if user is logged in', () => {
      const wrapper = shallow(<Comments {...minProps} />)

      expect(wrapper.find('.comments').children().last()).toHaveClassName(
        'comment-form'
      )
    })

    it('does not render comment-form if user is not logged in', () => {
      const wrapper = shallow(<Comments {...minProps} userData={{}} />)

      expect(wrapper.find('.comments').children().last()).not.toHaveClassName(
        'comment-form'
      )
    })
  })

  describe('INTERACTION', () => {
    describe('submitting comment form', () => {
      // mount to make refs work
      const wrapper = mount(<Comments {...minProps} />)

      const mockEvent = { preventDefault: () => {} }
      beforeEach(() => {
        wrapper.find('.comment-form').prop('onSubmit')(mockEvent, minProps.id)
      })

      it('should call addComment', () => {
        expect(minProps.addComment).toBeCalledWith(minProps.id, '', '')
      })

      it('should call incrementComments', () => {
        expect(minProps.incrementComments).toBeCalledWith(minProps.id)
      })
    })

    describe('clicking remove button', () => {
      const wrapper = shallow(<Comments {...minProps} />)

      beforeEach(() => {
        wrapper.find('.remove-comment').at(0).prop('onClick')(
          'postId',
          minProps.id
        )
      })

      it('should call removeComment', () => {
        expect(minProps.removeComment).toBeCalledWith('commentId', minProps.id)
      })

      it('should call decrementComments', () => {
        expect(minProps.decrementComments).toBeCalledWith(minProps.id)
      })
    })
  })
})
