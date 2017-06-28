/* global browser */

export default class GithubLoginPopupPage {
  get userInput() {
    return browser.element('#login_field')
  }
  get passwordInput() {
    return browser.element('#password')
  }
  get loginButton() {
    return browser.element('input[name=commit]')
  }
  get error() {
    return browser.element('#js-flash-container')
  }

  login(identifier = 'trapridge-test-account', password = 'fail') {
    this.userInput.waitForExist(20000)
    this.userInput.setValue(identifier)
    this.passwordInput.setValue(password)
    this.loginButton.click()
  }
}
