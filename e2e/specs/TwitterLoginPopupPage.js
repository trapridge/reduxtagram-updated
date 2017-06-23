/* global browser */

export default class GithubLoginPopupPage {
  get userInput() {
    return browser.element('#username_or_email')
  }
  get passwordInput() {
    return browser.element('#password')
  }
  get loginButton() {
    return browser.element('#allow')
  }
  get error() {
    return browser.element('#message-drawer .message-text')
  }

  login(identifier = 'foo', password = 'bar') {
    this.userInput.waitForExist(20000)
    this.userInput.setValue(identifier)
    this.passwordInput.setValue(password)
    this.loginButton.click()
    this.error.waitForExist(20000)
  }
}
