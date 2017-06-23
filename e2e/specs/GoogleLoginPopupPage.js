/* global browser */

export default class GoogleLoginPopupPage {
  get userInput() {
    return browser.element('#identifierId')
  }
  get userNext() {
    return browser.element('#identifierNext')
  }
  get passwordInput() {
    return browser.element('#password input')
  }
  get passwordNext() {
    return browser.element('#passwordNext')
  }
  get error() {
    return browser.element('#password > div > div:nth-child(2)')
  }

  login(identifier = 'juuso.ansaharju@gmail.com', password = 'whatever') {
    this.userInput.waitForExist(20000)
    this.userInput.setValue(identifier)
    this.userNext.click()
    this.passwordInput.waitForVisible(20000)
    this.passwordInput.setValue(password)
    this.passwordNext.waitForVisible(20000)
    this.passwordNext.click()
    this.error.waitForVisible(20000)
  }
}
