/* global browser */

class Page {
  constructor() {
    this.title = 'My Page'
  }

  open(path) {
    // browser.url('/' + path)
    browser.url('http://the-internet.herokuapp.com/' + path)
  }
}

export default Page
