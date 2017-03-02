import gulp from 'gulp'
import paths from '../paths'
import cache from 'gulp-cached'
import gulpStylelint from 'gulp-stylelint'
import gulpEslint from 'gulp-eslint'
import isProd from '../environment'

function stylelint(done) {
  if (isProd) done()

  if (!isProd) {
    return gulp.src(paths.styles.all)
      .pipe(cache('gulpStylelint'))
      .pipe(gulpStylelint({
        reporters: [{formatter: 'string', console: true}],
        syntax: 'scss',
        failAfterError: false,
        configFile: './.stylelintrc'
      }))
  }
}

stylelint.description = 'Linter report for sass files based on a custom Stylelint config'
stylelint.displayName = 'lint:styles'

function eslint(done) {
  if (isProd) done()

  if (!isProd) {
    return gulp.src(paths.scripts.all)
      .pipe(gulpEslint({
        configFile: '.eslintrc'
      }))
      .pipe(gulpEslint.format())
  }
}

eslint.description = 'Linter report for javascript files based on Javascript Standard Style'
eslint.displayName = 'lint:javascript'

export { stylelint, eslint }