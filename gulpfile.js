const gulp = require('gulp');
const babel = require('gulp-babel');
const eslint = require('gulp-eslint');
const child = require('child_process');
const gutil = require('gulp-util');
const browserSync = require('browser-sync').create();
const ghPages = require('gulp-gh-pages');
const siteRoot = '_site/';

/** Default task:
 *    - lint & compile js
 *    - build jekyll site
 *    - serve site using BrowserSync
 */
gulp.task('default', ['js-watch', 'jekyll', 'serve']);

/* JS Linting */
gulp.task('js-lint', () => {
  return gulp.src('src/js/index.js')
    .pipe(eslint())
    .pipe(eslint.format())
    .pipe(eslint.failAfterError());
});

/* Compile ES6 to ES5 */
gulp.task('js-build', () => {
  return gulp.src('src/js/index.js')
    .pipe(babel({presets: ['env']}))
    .pipe(gulp.dest('dist/js'));
});

gulp.task('js-watch', () => {
  return gulp.watch('src/js/index.js', ['js-lint', 'js-build']);
});

/* Build jekyll */
gulp.task('jekyll', () => {
  const jekyll = child.spawn('jekyll', [
    'build',
    '--watch'
  ]);

  const jekyllLogger = (buffer) => {
    buffer.toString()
      .split(/\n/)
      .forEach((message) => gutil.log('Jekyll: ' + message));
  };

  jekyll.stdout.on('data', jekyllLogger);
  jekyll.stderr.on('data', jekyllLogger);
});

/* Livereload using BrowserSync */
gulp.task('serve', () => {
  browserSync.init({
    files: [siteRoot + '**'],
    port: 4000,
    server: {
      baseDir: siteRoot
    }
  });
});

/* Deploy to gh-pages repo */
gulp.task('deploy', () => {
  const options = {
    'remoteUrl': 'git@github.com:iNaesu/portfolio-gh-pages.git'
  };
  return gulp.src(siteRoot + '**/*')
    .pipe(ghPages(options));
})
