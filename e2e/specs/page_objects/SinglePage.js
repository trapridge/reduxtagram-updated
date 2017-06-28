/* global browser */

import Page from './Page'

export default class SinglePage extends Page {
  open(id) {
    super.open(`view/${id}`)
  }
}
