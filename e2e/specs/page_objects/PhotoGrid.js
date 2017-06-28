/* global browser */

import Page from './Page'

export default class PhotoGrid extends Page {
  get firstPostImageLink() {
    return browser.element('figure:first-of-type .grid-photo-wrap a')
  }
  get firstPostCommentsLink() {
    return browser.element('figure:first-of-type .control-buttons a')
  }

  open() {
    super.open()
  }
}
