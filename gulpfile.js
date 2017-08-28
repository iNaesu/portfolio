var gulp = require('gulp');
var babel = require('gulp-babel');

gulp.task('babel', function() {
  return gulp.src('src/js/index.js')
    .pipe(babel({presets: ['env']}))
    .pipe(gulp.dest('dist/js'));
});

gulp.task('watch', function() {
  return gulp.watch('src/js/index.js', ['babel']);
});
