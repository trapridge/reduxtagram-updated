import React from 'react'
import { shallow, mount } from 'enzyme'

import App from './App'

const ChildElement = () => <div>{"I'm a child"}</div>
const minProps = {
  login: jest.fn(),
  logout: jest.fn(),
  children: []
}

describe('Comments', () => {
  describe('RENDERING', () => {
    it('renders without crashing', () => {
      shallow(<App {...minProps} />)
    })

    it('renders a child with cloned props', () => {
      const wrapper = mount(
        <App {...minProps}>
          <ChildElement test={1} />
        </App>
      )

      expect(wrapper.children().last().getNode().props.login).toEqual(
        minProps.login
      )
      expect(wrapper.children().last().getNode().props.logout).toEqual(
        minProps.logout
      )
    })
  })

  describe('INTERACTION', () => {
    describe('clicking login buttons', () => {
      const wrapper = shallow(<App {...minProps} />)

      beforeEach(() => {
        wrapper.find('button').forEach(button => {
          const className = button.getNode().props.className
          if (className.includes('login')) {
            button.prop('onClick')()
          }
        })
      })

      it('should call login with provider name', () => {
        expect(minProps.login).toBeCalledWith('github')
        expect(minProps.login).toBeCalledWith('google')
        expect(minProps.login).toBeCalledWith('twitter')
      })
    })

    describe('clicking logout button', () => {
      const wrapper = shallow(<App {...minProps} />)

      beforeEach(() => {
        wrapper.find('.logout-button').prop('onClick')()
      })

      it('should call logout', () => {
        expect(minProps.logout).toBeCalled()
      })
    })
  })
})
