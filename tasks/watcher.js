/**
 * This module manages watcher tasks.
 * It does not work in production mode.
 * @module notifications
 */

import gulp from 'gulp'
import { getStyles, getScripts, getTemplates, getImages, isProd } from '../gulpconfig'
import { stylelint, eslint } from './linters'
import { styles, scripts } from './assets'
import { reload } from './browsersync'

/**
 * Watches every asset type (styles, scripts, templates, images).
 * On every event for each type, will reload the browser.
 * For static assets, will also rebuild them.
 * @param {function} done - Callback to signal a finished async task.
 */
function watch (done) {
  if (!isProd) {
    gulp.watch(getStyles.all, gulp.series(styles, stylelint, reload))
    gulp.watch(getScripts.all, gulp.series(scripts, eslint, reload))
    gulp.watch(getTemplates.all, gulp.series(reload))
    gulp.watch(getImages.all, gulp.series(reload))
  } else done()
}

/** Gulp config for this task. */
watch.description = 'Watch project files and launch according build functions'

export { watch }
