/**
 * This is the main gulp module.
 * Tasks are defined here.
 * @module gulpfile
 */

/** Import module dependencies. */
import gulp from 'gulp'

/** Import private tasks */
import { stylelint, eslint } from './tasks/linters'
import { styles, scripts } from './tasks/assets'
import { watch } from './tasks/watcher'
import { notifications } from './tasks/notifications'
import { browserSyncInit } from './tasks/browsersync'

/** Individual tasks, can be used from CLI. */
gulp.task(stylelint)
gulp.task(eslint)
gulp.task(styles)
gulp.task(scripts)
gulp.task(watch)

/** Linting bundle. */
const linting = gulp.series(stylelint, eslint)

/** Gulp config for this task. */
linting.description = 'Do a check on every style and script file and report linting errors'

/** Assets bundle. */
const assets = gulp.parallel(styles, scripts)

/** Gulp config for this task. */
assets.description = 'Builds assets with different parameters depending on the environment'

/** Build bundle. */
const build = gulp.parallel(browserSyncInit, gulp.series(assets, linting, notifications, watch))

/** Gulp config for this task. */
build.description = 'Builds the site with automatic parameters depending on the environment'

export { build, linting, assets }

/** Default task */
export default build
