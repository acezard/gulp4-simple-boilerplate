import paths from '../paths'
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
import isProd from '../environment'

function styles() {
  return gulp.src(paths.styles.main)
    .pipe(gulpif(!isProd, sourcemaps.init()))
    .pipe(gulpsass().on('error', gulpsass.logError))
    .pipe(autoprefixer({ browsers: ['> 1%', 'iOS 7'] }))
    .pipe(gulpif(!isProd, sourcemaps.write()))
    .pipe(gulpif(isProd, cssnano()))
    .pipe(gulp.dest(paths.styles.dest))
    .pipe(size({ showFiles: true }))
}

styles.description = 'Build sass files'
styles.displayName = 'assets:styles'

function scripts(done) {
  const bundler = browserify(paths.scripts.main, {
    debug: true,
    paths: [
      './node_modules'
    ]
  }).transform(babel.configure({
    presets: [
      "babel-preset-es2015"
    ].map(require.resolve),
    plugins: [
      "babel-plugin-transform-class-properties"
    ].map(require.resolve)
  }))

  bundler.bundle()
    .on('error', function (err) {
      console.error(err);
      this.emit('end')
    })
    .pipe(source('script.js'))
    .pipe(buffer())
    .pipe(gulpif(!isProd, sourcemaps.init({ loadMaps: true })))
    .pipe(gulpif(!isProd, sourcemaps.write('./')))
    .pipe(gulpif(isProd, uglify()))
    .pipe(gulp.dest(paths.scripts.dest))
    .pipe(size({
      showFiles: true
    }))

  done()
}

scripts.description = 'Build javascript files'
scripts.displayName = 'assets:scripts'

export { styles, scripts }
