/** Import module dependencies */
import gulp from 'gulp'
import isProd from './environment'
import paths from './paths'

/** Import private tasks */
import { stylelint, eslint } from './tasks/linters'
import { styles, scripts } from './tasks/assets'
import { watch } from './tasks/watcher'

/** Individual tasks */
gulp.task(stylelint)
gulp.task(eslint)
gulp.task(styles)
gulp.task(scripts)
gulp.task(watch)

/** Bundled tasks */
/** Linting bundle */
const linting = gulp.series(stylelint, eslint)
linting.description = 'Do a check on every style and script file and report linting errors'

/** Assets bundle */
const assets = gulp.parallel(styles, scripts)
assets.description = 'Builds assets with different parameters depending on the environment'

/** Build bundle */
const build = gulp.series(assets, linting, watch)
build.description = 'Builds the site with automatic parameters depending on the environment'

export { build, linting, assets }

/** Default task */
export default build