/**
 * This module manages assets compilation.
 * @module assets
 */

import { getStyles, getScripts, isProd } from '../gulpconfig'
import gulp from 'gulp'
import sourcemaps from 'gulp-sourcemaps'
import autoprefixer from 'gulp-autoprefixer'
import cssnano from 'gulp-cssnano'
import gulpif from 'gulp-if'
import size from 'gulp-size'
import gulpsass from 'gulp-sass'
import source from 'vinyl-source-stream'
import buffer from 'vinyl-buffer'
import browserify from 'browserify'
import babel from 'babelify'
import uglify from 'gulp-uglify'

/**
 * Outputs a single css file from the main sass file of the project.
 * In development mode : sourcemap, no minification.
 * In production mode: no sourcemap, minification.
 * Autoprefixing is enabled in both cases.
 * */
function styles () {
  return gulp.src(getStyles.main)
    .pipe(gulpif(!isProd, sourcemaps.init()))
    .pipe(gulpsass().on('error', gulpsass.logError))
    .pipe(autoprefixer({ browsers: ['> 1%', 'iOS 7'] }))
    .pipe(gulpif(!isProd, sourcemaps.write()))
    .pipe(gulpif(isProd, cssnano()))
    .pipe(gulp.dest(getStyles.dest))
    .pipe(size({ showFiles: true }))
}

/** Gulp params for this task. */
styles.description = 'Build sass files'
styles.displayName = 'assets:styles'

/**
 * Outputs a single bundled js file with browserify from the app entry point of the project.
 * In development mode : sourcemap, no minification.
 * In production mode: no sourcemap, minification.
 * Babel is used in both cases and ES2015 can be used with no further configuration.
 * @param {function} done - Callback to signal a finished async task.
 * */
function scripts (done) {
  const bundler = browserify(getScripts.main, {
    debug: true,
    paths: [
      './node_modules'
    ]
  }).transform(babel.configure({
    presets: [
      'babel-preset-es2015'
    ].map(require.resolve),
    plugins: [
      'babel-plugin-transform-class-properties',
      'babel-plugin-transform-object-rest-spread'
    ].map(require.resolve)
  }))

  bundler.bundle()
    .on('error', err => {
      console.error(err)
      this.emit('end')
    })
    .pipe(source('script.js'))
    .pipe(buffer())
    .pipe(gulpif(!isProd, sourcemaps.init({ loadMaps: true })))
    .pipe(gulpif(!isProd, sourcemaps.write('./')))
    .pipe(gulpif(isProd, uglify()))
    .pipe(gulp.dest(getScripts.dest))
    .pipe(size({
      showFiles: true
    }))

  done()
}

/** Gulp params for this task. */
scripts.description = 'Build javascript files'
scripts.displayName = 'assets:scripts'

export { styles, scripts }
