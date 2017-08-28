var gulp = require('gulp');
var babel = require('gulp-babel');
var eslint = require('gulp-eslint');
var shell = require('gulp-shell');
var browserSync = require('browser-sync');

/* JS Linting */
gulp.task('js-lint', function() {
  return gulp.src('src/js/index.js')
    .pipe(eslint())
    .pipe(eslint.format())
    .pipe(eslint.failAfterError());
});

/* Compile ES6 to ES5 */
gulp.task('js-build', function() {
  return gulp.src('src/js/index.js')
    .pipe(babel({presets: ['env']}))
    .pipe(gulp.dest('dist/js'));
});

/* Build jekyll site. Jekyll builds site into '_site/' */
gulp.task('jekyll-build', shell.task(['jekyll build --watch']));

/** Serve site:
 * 1. Rebuild site using jekyll on any file change
 * 2. Re-serve site using browser sync on any change in '_site'
 */
gulp.task('serve', function() {
  browserSync.init({
    server: {baseDir: '_site/'}
  });
  gulp.watch('_site/**/*.*').on('change', browserSync.reload);
});

gulp.task('js-watch', function() {
  return gulp.watch('src/js/index.js', ['js-lint', 'js-build']);
});

gulp.task('default', ['js-watch', 'jekyll-build', 'serve']);
