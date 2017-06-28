/* global browser */

export default class Page {
  get header() {
    return browser.element('h1 a')
  }
  get githubLogin() {
    return browser.element('button.github-login-button')
  }
  get googleLogin() {
    return browser.element('button.google-login-button')
  }
  get twitterLogin() {
    return browser.element('button.twitter-login-button')
  }
  get logoutButton() {
    return browser.element('button.logout-button')
  }

  open(path = '') {
    browser.url(`/${path}`)
  }

  login(provider) {
    switch (provider) {
      case 'github': {
        this.githubLogin.click()
        break
      }
      case 'google': {
        this.googleLogin.click()
        break
      }
      case 'twitter': {
        this.twitterLogin.click()
        break
      }
    }
  }

  logout() {
    this.logoutButton.click()
  }
}
