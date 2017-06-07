import React from 'react'
import { shallow } from 'enzyme'

import Photo from './Photo'

const minProps = { post: {}, id: '', incrementLikes: () => {} }

describe('Photo', () => {
  describe('RENDERING', () => {

    it('renders without crashing', () => {
      shallow(<Photo {...minProps} />)
    })

    it('renders image', () => {
      const props = { 
        ...minProps, 
        post: { ...minProps.post, display_src: 'foo', caption: 'bar' }
      }
      const wrapper = shallow(<Photo {...props } />)

      expect(wrapper.find('.grid-photo')).toHaveProp('src', 'foo')
      expect(wrapper.find('.grid-photo')).toHaveProp('alt', 'bar')
    })

    it('renders caption', () => {
      const props = { 
        ...minProps, 
        post: { ...minProps.post, caption: 'foo' }
      }
      const wrapper = shallow(<Photo {...props } />)

      expect(wrapper.find('figcaption p')).toHaveText('foo')
    })

    it('renders likes count', () => {
      const props = { 
        ...minProps, 
        post: { ...minProps.post, likes: 'foo' }
      }
      const wrapper = shallow(<Photo {...props } />)

      expect(wrapper.find('.likes')).toIncludeText('foo')
    })

    it('renders comments count', () => {
      const props = { 
        ...minProps, 
        post: { ...minProps.post, comments: 'foo' }
      }
      const wrapper = shallow(<Photo {...props } />)

      expect(wrapper.find('.comment-count')).toIncludeText('foo')
    })

    it('renders link to photo from photo itself', () => {
      const props = { 
        ...minProps, id: 'foo'
      }
      const wrapper = shallow(<Photo {...props } />)

      expect(wrapper.find('.image-link')).toHaveProp('to', '/view/foo')
    })

    it('renders link to photo from comments button', () => {
      const props = { 
        ...minProps, id: 'foo'
      }
      const wrapper = shallow(<Photo {...props } />)

      expect(wrapper.find('Link.button')).toHaveProp('to', '/view/foo')
    })
  })

  describe('INTERACTION', () => {
    describe('clicking likes button', () => {
      
      const props = { ...minProps, incrementLikes: jest.fn(), id: 'foo' }
      const wrapper = shallow(<Photo {...props } />)
      
      beforeEach(() => {
        wrapper.find('.likes').prop('onClick')()   
      })

      it('should call incrementLikes with id', () => {
        expect(props.incrementLikes).toBeCalledWith('foo')
      })
    })
  })

})