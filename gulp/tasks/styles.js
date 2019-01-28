const gulp = require('gulp');
const sass = require('gulp-sass');
const sassGlob = require('gulp-sass-glob');
const sourcemaps = require('gulp-sourcemaps');
const postcss = require('gulp-postcss');
const autoprefixer = require('autoprefixer');
const pxtorem = require('postcss-pxtorem');
const cssnano = require('cssnano');

const log = require('fancy-log');
const colors = require('ansi-colors');
const config = require('../config');

const processors = [
  pxtorem({
    rootValue: 16,
    unitPrecision: 5,
    propList: ['*'],
    selectorBlackList: [],
    replace: true,
    mediaQuery: false,
    minPixelValue: 0
  }),
  autoprefixer({
    browsers: ['last 4 version'],
    cascade: false
  }),
  cssnano({
    preset: ['default', {
      normalizeWhitespace: config.production
    }]
  })
];

function styles() {
  return gulp.src(config.src.styles + 'main.scss')
  .pipe(sourcemaps.init())
  .pipe(sassGlob())
  .pipe(sass({
    outputStyle: config.production ? 'compressed' : 'expanded',
  }))
  .on('error', (err) => {
    log(colors.red(err.name), 'in', `${err.relativePath}(${err.line}:${err.column})`);
    log('Error message:', err.messageOriginal);
    log('Fix the error to process', colors.bgred('styles'));
  })
  .pipe(postcss(processors))
  .pipe(sourcemaps.write())
  .pipe(gulp.dest(config.dest.styles));
}

gulp.task('styles', styles);

