/* global browser */

import PhotoGrid from './page_objects/PhotoGrid'

const grid = new PhotoGrid()

describe('common', () => {
  beforeEach(() => {
    grid.open()
  })

  it('display correct header', () => {
    expect(grid.header.getText()).toContain('Reduxtagram')
  })


  describe('basic navigation', () => {
    describe('photo grid page', () => {
      it('should go to post page by clicking image', () => {
        grid.firstPostImageLink.waitForExist(20000)
        const url = grid.firstPostImageLink.getAttribute('href')
        grid.firstPostImageLink.click()
        
        expect(url).toBe(browser.getUrl())
      })

      it('should go to post page by clicking comments', () => {
        grid.firstPostCommentsLink.waitForExist(20000)
        const url = grid.firstPostCommentsLink.getAttribute('href')
        grid.firstPostCommentsLink.click()

        expect(url).toBe(browser.getUrl())
      })
    })

    describe('single photo page', () => {
      // it('should go to post page by clicking image', () => {
      //   grid.firstPostImageLink.waitForExist(20000)
      //   const url = grid.firstPostImageLink.getAttribute('href')
      //   grid.firstPostImageLink.click()
        
      //   expect(url).toBe(browser.getUrl())
      // })
    })
  })
})

const getPopUpId = (ids, not) => ids.filter(id => id !== not)[0]
