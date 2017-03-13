/**
 * This module manages CLI notifications output
 * @module notifications
 */

import gutil from 'gulp-util'
import { isProd } from '../gulpconfig'

/**
 * Emits a message specifying in which mode the build was used.
 * @param {function} done - Callback to signal a finished async task.
 */
function notifications (done) {
  const envir = isProd ? 'PRODUCTION' : 'DEVELOPMENT'

  gutil.log('-------------------------')
  gutil.log(gutil.colors.magenta(envir), 'BUILD FINISHED')
  gutil.log('-------------------------')

  done()
}

/** Gulp config for this task. */
notifications.description = 'Checks the environment before build'

export { notifications }
