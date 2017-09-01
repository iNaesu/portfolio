const gulp = require('gulp');
const babel = require('gulp-babel');
const eslint = require('gulp-eslint');
const child = require('child_process');
const gutil = require('gulp-util');
const browserSync = require('browser-sync').create();
const ghPages = require('gulp-gh-pages');
const siteRoot = '_site/';

/* fetch command line arguments */
const args = (argList => {

  let args = {}, a, opt, thisOpt, curOpt;
  for (a = 0; a < argList.length; a++) {
    thisOpt = argList[a].trim();
    opt = thisOpt.replace(/^\-+/, '');

    if (opt === thisOpt) {
      // argument value
      if (curOpt) args[curOpt] = opt;
      curOpt = null;
    }
    else {
      // argument name
      curOpt = opt;
      args[curOpt] = true;
    }
  }

  return args;
})(process.argv);

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
  const commitMsg = args.msg;
  if (!commitMsg) {
    console.error('[gulp-gh-pages] Error: No commit message');
    console.error('[gulp-gh-pages] Usage: gulp deploy --msg "commit message"');
    return;
  }
  const options = {
    'remoteUrl': 'git@github.com:iNaesu/portfolio-gh-pages.git',
    'message': commitMsg
  };
  return gulp.src(siteRoot + '**/*')
    .pipe(ghPages(options));
})
