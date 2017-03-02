import gulp from 'gulp'
import paths from '../paths'
import { stylelint, eslint } from './linters'
import { styles, scripts } from './assets'
import isProd from '../environment'

/** Watcher, only works in dev environment */
function watch(done) {
  if (!isProd) {
    gulp.watch(paths.styles.all, gulp.series(styles, stylelint))
    gulp.watch(paths.scripts.all, gulp.series(scripts, eslint))
  } else done()
}

watch.description = 'Watch project files and launch according build functions'

export { watch }