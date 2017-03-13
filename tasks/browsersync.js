/**
 * This module manages browser syncing. Disabled in production mode.
 * @module browsersync
 */

import browserSync from 'browser-sync'
import { devServer, isProd } from '../gulpconfig'

/**
 * Creates browsersync server and opens a new browser tab.
 * @param {function} done - Callback to signal a finished async task.
 */
function browserSyncInit (done) {
  if (!isProd) {
    browserSync.init({
      proxy: devServer
    })
  } else done()
}

/**
 * Reloads the browser.
 * @param {function} done - Callback to signal a finished async task.
 */
function reload (done) {
  browserSync.reload()

  done()
}

export { browserSyncInit, reload }
