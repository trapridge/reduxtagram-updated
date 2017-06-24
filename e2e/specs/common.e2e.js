/* global browser */

import Page from './Page'
import GithubLoginPopupPage from './GithubLoginPopupPage'
import GoogleLoginPopupPage from './GoogleLoginPopupPage'
import TwitterLoginPopupPage from './TwitterLoginPopupPage'
import credentials from '../credentials'

const page = new Page()

describe('common', () => {
  beforeEach(() => {
    page.open()
  })

  it('display correct header', () => {
    expect(page.header.getText()).toContain('Reduxtagram')
  })

  describe('authentication', () => {
    describe('github', () => {
      it('should deny access with wrong creds', () => {
        const sourceWindowID = browser.getTabIds()[0]
        page.login('github')

        const popupWindowID = getPopUpId(browser.getTabIds(), sourceWindowID)
        browser.switchTab(popupWindowID)

        const loginPopup = new GithubLoginPopupPage()
        loginPopup.login()

        expect(loginPopup.error.getText()).toContain(
          'Incorrect username or password.'
        )
        browser.close()
      })

      it('should grant access with correct creds', () => {
        const sourceWindowID = browser.getTabIds()[0]
        page.login('github')

        const popupWindowID = getPopUpId(browser.getTabIds(), sourceWindowID)
        browser.switchTab(popupWindowID)

        const loginPopup = new GithubLoginPopupPage()
        const { identifier, password } = credentials.github
        loginPopup.login(identifier, password)

        browser.switchTab(sourceWindowID)
        page.logoutButton.waitForExist(20000)
        expect(page.logoutButton.getText()).toContain(
          'Log out'
        )
        page.logoutButton.click()
      })
    })

    describe('google', () => {
      it('should deny access with wrong creds', () => {
        const sourceWindowID = browser.getTabIds()[0]
        page.login('google')

        const popupWindowID = getPopUpId(browser.getTabIds(), sourceWindowID)
        browser.switchTab(popupWindowID)

        const loginPopup = new GoogleLoginPopupPage()
        loginPopup.login()

        expect(loginPopup.error.getText()).toContain(
          'Wrong password. Try again.'
        )
        browser.close()
      })

      it('should grant access with correct creds', () => {
        const sourceWindowID = browser.getTabIds()[0]
        page.login('google')

        const popupWindowID = getPopUpId(browser.getTabIds(), sourceWindowID)
        browser.switchTab(popupWindowID)

        const loginPopup = new GoogleLoginPopupPage()
        const { identifier, password } = credentials.google
        loginPopup.login(identifier, password, false)

        browser.switchTab(sourceWindowID)
        page.logoutButton.waitForExist(20000)
        expect(page.logoutButton.getText()).toContain(
          'Log out'
        )
        page.logoutButton.click()
      })
    })

    describe('twitter', () => {
      it('should deny access with wrong creds', () => {
        const sourceWindowID = browser.getTabIds()[0]
        page.login('twitter')

        const popupWindowID = getPopUpId(browser.getTabIds(), sourceWindowID)
        browser.switchTab(popupWindowID)

        const loginPopup = new TwitterLoginPopupPage()
        loginPopup.login()

        expect(loginPopup.error.getText()).toContain(
          'The username and password that you entered did not match our ' +
            'records. Please double-check and try again.'
        )
        browser.close()
      })

      it('should grant access with correct creds', () => {
        const sourceWindowID = browser.getTabIds()[0]
        page.login('twitter')

        const popupWindowID = getPopUpId(browser.getTabIds(), sourceWindowID)
        browser.switchTab(popupWindowID)

        const loginPopup = new TwitterLoginPopupPage()
        const { identifier, password } = credentials.twitter
        loginPopup.login(identifier, password, false)

        browser.switchTab(sourceWindowID)
        page.logoutButton.waitForExist(20000)
        expect(page.logoutButton.getText()).toContain(
          'Log out'
        )
        page.logoutButton.click()
      })
    })
  })
})

const getPopUpId = (ids, not) => ids.filter(id => id !== not)[0]
