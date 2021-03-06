# Gulp4 Standard Config
## Installation
Required:
* Node v6 +
* `gulp-cli`

Uninstall global gulp legacy versions
`npm r gulp -g`

Install `gulp-cli`
`npm i gulp-cli -g`

If you want to regenerate the documentation, you must install jsdoc
`npm i jsdoc -g`

Once it's done, you can install all the project dependencies :
`npm i` or `yarn`

## Environment
For production environment, make sure that `NODE_ENV = "prod"`

## Command line
* `npm start` or `gulp`: runs the project. Different implementations if a prod or a dev environment is used
* `npm run prod` or `gulp --prod`: if you don't use environment variable, you can still launch a production build
* `npm run help` or `gulp --tasks`: displays all the available gulp tasks
* `jsdoc . -r -c jsdoc.json`: generates the documentation in `documentation/`

## Files
* `.gulpconfig`: gulp options, only file to be modified
* `.gulfile.babel.js`: gulp main file where tasks are declared and launched
* `jsdoc.json`: jsdoc options
* `.babelrc`: babel preset for es2015 compilation
* `.eslintrc`: extends javascript standard style for scripts linting
* `.stylelintrc`: custom stylelint config for styles linting
* `tasks/*`: individual gulp tasks

## Documentation
Please refer to `documentation/index.html` for the JSDoc output of the gulp config
