const gulp = require('gulp');
const eslint = require('gulp-eslint');
const stylelint = require('gulp-stylelint');
const config = require('../config');

function eslintFn() {
  return gulp
    .src(config.src.scripts + '**/*.ts')
    .pipe(eslint())
    .pipe(eslint.format());
}

function stylelintFn(done) {
  return gulp.src(config.src.styles + '**/*.scss').pipe(
    stylelint({
      reporters: [{ formatter: 'string', console: true }],
      failAfterError: false,
    }),
  );
}

function eslintFix() {
  return gulp
    .src(config.src.scripts + '**/*.js')
    .pipe(
      eslint({
        fix: true,
      }),
    )
    .pipe(eslint.format())
    .pipe(gulp.dest(config.src.scripts));
}

gulp.task('eslint-fix', eslintFix);
gulp.task('eslint', eslintFn);
gulp.task('stylelint', stylelintFn);
gulp.task('lint', gulp.parallel('eslint', 'stylelint'));
