/* global browser */

import LoginPage from './LoginPage'

const loginPage = new LoginPage()

// describe('DuckDuckGo search', function() {
//   it('searches for WebdriverIO', function() {
//     console.log('this sucks')
//     browser.url('https://duckduckgo.com/')
//     browser.setValue('#search_form_input_homepage', 'WebdriverIO')
//     browser.click('#search_button_homepage')
//     var title = browser.getTitle()
//     console.log('Title is: ' + title)
//     // outputs: "Title is: WebdriverIO (Software) at DuckDuckGo"
//   })
// })

describe('login form', () => {
  it('should deny access with wrong creds', () => {
    console.log('this is a test')
    loginPage.open()
    loginPage.username.setValue('foo')
    loginPage.password.setValue('bar')
    loginPage.submit()

    expect(loginPage.flash.getText()).toContain('Your username is invalid!')
  })

  it('should allow access with correct creds', () => {
    loginPage.open()
    loginPage.username.setValue('tomsmith')
    loginPage.password.setValue('SuperSecretPassword!')
    loginPage.submit()
    
    expect(loginPage.flash.getText()).toContain('You logged into a secure area!'
    )
  })
})
