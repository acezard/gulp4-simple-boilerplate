/**
 * This is the config module, used to customize options according to current project.
 * @module gulpconfig
 */

import { argv } from 'yargs'

/**
 * getStyles
 * @namespace
 * @property {string} getStyles.main - The main .scss file, importing all styles
 * @property {string} getStyles.all  - Every .scss file contained in the project 
 * @property {string} getStyles.dest - The destination folder for the compiled .css file
*/
const getStyles = {
  main: '../sites/all/themes/custom/customer/styles/styles.scss',
  all: '../sites/all/themes/custom/customer/styles/**/*.scss',
  dest: '../sites/all/themes/custom/customer/css'
}

/**
 * getScripts
 * @namespace
 * @property {string} getScripts.main - The main .js file, entry point of the application
 * @property {string} getScripts.all  - Every .js source file contained in the project 
 * @property {string} getScripts.dest - The destination folder for the bundled .js file
*/
const getScripts = {
  main: '../sites/all/themes/custom/customer/js/src/app.js',
  all: '../sites/all/themes/custom/customer/js/src/**/*.js',
  dest: '../sites/all/themes/custom/customer/js/'
}

/**
 * getScripts
 * @namespace
 * @property {string} getTemplates.all - Every template file contained in the theme directory
*/
const getTemplates = {
  all: '../sites/all/themes/custom/customer/**/*.php'
}

/**
 * getImages
 * @namespace
 * @property {string} getImages.all - Every image file contained in the theme directory
*/
const getImages = {
  all: '../sites/all/themes/custom/customer/images/**/*'
}

/**
 * The local development server working URL
 * @constant {string}
 */
const devServer = 'd7.loc'

/**
 * When returning true, gulp will enter in production mode.
 * Development mode by default.
 * An environment variable can be used or an argument vector : --prod
 * @constant {boolean}
 */
const isProd = process.env.NODE_ENV === 'PROD' || argv.prod

export {
  getStyles,
  getScripts,
  getTemplates,
  getImages,
  devServer,
  isProd
}
