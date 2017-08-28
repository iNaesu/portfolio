var gulp = require('gulp');
var babel = require('gulp-babel');

gulp.task('babel', function() {
  return gulp.src('assets/js/index.js')
    .pipe(babel({presets: ['env']}))
    .pipe(gulp.dest('dist/'));
});

gulp.task('watch', function() {
  return gulp.watch('assets/js/index.js', ['babel']);
});
