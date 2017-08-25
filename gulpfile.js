var gulp = require('gulp');
var babel = require('gulp-babel');

gulp.task('babel', function() {
  return gulp.src('_site/assets/js/index.js')
    .pipe(babel({presets: ['env']}))
    .pipe(gulp.dest('_site/assets/js/'));
});
