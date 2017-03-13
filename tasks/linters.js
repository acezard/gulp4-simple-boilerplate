/**
 * This module manages project linting and ensures coding standards are respected.
 * @module linters
 */

import gulp from 'gulp'
import { getStyles, getScripts, isProd } from '../gulpconfig'
import cache from 'gulp-cached'
import gulpStylelint from 'gulp-stylelint'
import gulpEslint from 'gulp-eslint'

/**
 * Using the .stylelintrc config file, this task checks every style file and reports linting errors.
 * Uses a custom stylelint config. See https://github.com/stylelint/stylelint.
 * @param {function} done - Callback to signal a finished async task.
 */
function stylelint (done) {
  if (!isProd) {
    return gulp.src(getStyles.all)
      .pipe(cache('gulpStylelint'))
      .pipe(gulpStylelint({
        reporters: [{formatter: 'string', console: true}],
        syntax: 'scss',
        failAfterError: false,
        configFile: './.stylelintrc'
      }))
  } else done()
}

/** Gulp config for this task. */
stylelint.description = 'Linter report for sass files based on a custom Stylelint config'
stylelint.displayName = 'lint:styles'

/**
 * Using the .eslintrc config file, this task checks every script file and reports linting errors.
 * Uses Javascript Standard Style config. See http://standardjs.com/rules.html.
 * @param {function} done - Callback to signal a finished async task.
 */
function eslint (done) {
  if (!isProd) {
    return gulp.src(getScripts.all)
      .pipe(gulpEslint({
        configFile: '.eslintrc'
      }))
      .pipe(gulpEslint.format())
  } else done()
}

/** Gulp config for this task. */
eslint.description = 'Linter report for javascript files based on Javascript Standard Style'
eslint.displayName = 'lint:javascript'

export { stylelint, eslint }
