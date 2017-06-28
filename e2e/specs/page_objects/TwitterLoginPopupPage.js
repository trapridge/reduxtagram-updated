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

  login(identifier = 'tr_test_account', password = 'fail', error = true) {
    this.userInput.waitForExist(20000)
    this.userInput.setValue(identifier)
    this.passwordInput.setValue(password)
    this.loginButton.click()
    if (error) {
      this.error.waitForExist(20000)
    }
  }
}
