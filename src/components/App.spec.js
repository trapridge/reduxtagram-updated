import React from 'react'
import { shallow, mount } from 'enzyme'

import App from './App'

const ChildElement = () => <div>{"I'm a child"}</div>
const minProps = {
  login: jest.fn(),
  logout: jest.fn(),
  userData: { foo: 'bar' },
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
      afterEach(() => {
        minProps.logout.mockClear()
      })

      it('should call logout', () => {
        const wrapper = shallow(<App {...minProps} />)
        const logoutButton = wrapper.find('.logout-button')
        logoutButton.prop('onClick')()
        expect(minProps.logout).toBeCalled()
      })

      it('should fail to call logout if button is not there', () => {
        const wrapper = shallow(<App {...minProps} userData={{}} />)
        const logoutButton = wrapper.find('.logout-button')
        expect(logoutButton).not.toBePresent()
        expect(minProps.logout).not.toBeCalled()
      })
    })
  })
})
