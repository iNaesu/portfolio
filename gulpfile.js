var gulp = require('gulp');
var babel = require('gulp-babel');
var eslint = require('gulp-eslint');

/* JS Linting */
gulp.task('lint', function() {
  return gulp.src('src/js/index.js')
    .pipe(eslint())
    .pipe(eslint.format())
    .pipe(eslint.failAfterError());
});

/* Babel - ES6 to ES5 */
gulp.task('babel', function() {
  return gulp.src('src/js/index.js')
    .pipe(babel({presets: ['env']}))
    .pipe(gulp.dest('dist/js'));
});

gulp.task('watch', function() {
  return gulp.watch('src/js/index.js', ['lint', 'babel']);
});
