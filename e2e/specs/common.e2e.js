/* global browser */

import Page from './Page'
import GithubLoginPopupPage from './GithubLoginPopupPage'
import GoogleLoginPopupPage from './GoogleLoginPopupPage'

const page = new Page()

describe('common', () => {
  beforeEach(() => {
    page.open()
  }) 

  it('display correct header', () => {
    expect(page.header.getText()).toContain('Reduxtagram')
  })

  describe('authentication', () => {
    afterEach(() => {
      browser.close()
    })

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
      })
    })
  })
})

const getPopUpId = (ids, not) => ids.filter(id => id !== not)[0]
