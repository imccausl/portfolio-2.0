const gulp = require('gulp');
const sass = require('gulp-sass');
const watchSass = require('gulp-watch-sass');
const browserSync = require('browser-sync');
const useref = require('gulp-useref');
const uglify = require('gulp-uglify');
const cssnano = require('gulp-cssnano');
const del = require('del');
const runSequence = require('run-sequence');
const webpack = require('webpack-stream');
const webpackVersion = require('webpack');
const webpackConfig = require('./webpack.config');
const concat = require('gulp-concat');
const ghPages = require('gulp-gh-pages');
const gulpIf = require('gulp-if');
const rename = require('gulp-rename');

const SASS_PATH = './dev/scss/app.scss';

gulp.task('sass', () =>
  gulp
    .src(SASS_PATH)
    .pipe(sass())
    .pipe(gulp.dest('dev/css/')));

gulp.task('browserSync', () => {
  browserSync.init({
    server: {
      baseDir: './dev',
      index: 'index.html',
    },
  });
});

gulp.task('build:serve', () => {
  browserSync.init({
    server: {
      baseDir: './dist',
      index: 'index.html',
    },
  });
});

gulp.task('webpack', () =>
  gulp
    .src('dev/js/app.js')
    .pipe(webpack(webpackConfig, webpackVersion))
    .pipe(gulp.dest('dev')));

gulp.task('useref', () =>
  gulp
    .src('dev/index.html') // index.html created by webpack from index.ejs, then run through useref
    .pipe(useref())
    .pipe(gulp.dest('dev')));

gulp.task('useref:build', () =>
  gulp
    .src('dev/index.html')
    .pipe(useref())
    .pipe(gulpIf('*.js', uglify()))
    .pipe(gulpIf('*.css', cssnano()))
    .pipe(gulp.dest('dist/')));

gulp.task('fonts', () => gulp.src('dev/fonts/**/*').pipe(gulp.dest('dist/fonts')));

gulp.task('images', () => gulp.src('dev/img/**/*').pipe(gulp.dest('dist/img')));

gulp.task('build:moveCNAME', () => gulp.src('dev/CNAME').pipe(gulp.dest('dist/')));

gulp.task('files', () => gulp.src('dev/files/**/*').pipe(gulp.dest('dist/files')));

gulp.task('moveBundle', () => gulp.src('dev/js/bundle.js').pipe(gulp.dest('dist/js')));

gulp.task('routes', () => gulp.src('dev/routes/**/*').pipe(gulp.dest('dist/routes')));

gulp.task('setToIndex:build', () =>
  gulp
    .src('dist/root.html')
    .pipe(rename('index.html'))
    .pipe(gulp.dest('dist/')));

gulp.task('setToIndex', () =>
  gulp
    .src('dev/root.html')
    .pipe(rename('index.html'))
    .pipe(gulp.dest('dev/')));

gulp.task('removeAppHTML', () => del('dist/root.html'));

gulp.task('clean:dist', () => del.sync('dist'));

gulp.task('sass:watch', () => {
  watchSass('dev/scss/*.scss')
    .pipe(sass())
    .pipe(gulp.dest('./dev/css/'));
});

gulp.task('watch', () => {
  gulp.watch('dev/scss/*.scss', ['sass']);
  gulp.watch('dev/*.html', browserSync.reload);
  gulp.watch(['dev/js/**/*.js', 'dev/*.ejs', '!dev/js/bundle.js'], ['webpack']);
  gulp.watch('dev/js/bundle.js', browserSync.reload);
  gulp.watch('dev/**/*', ['useref'], browserSync.reload);
});

gulp.task('build', callback => {
  runSequence(
    'clean:dist',
    ['webpack', 'sass', 'fonts', 'images', 'routes', 'files', 'setToIndex:build'],
    'useref:build',
    'removeAppHTML',
    'moveBundle',
    'build:moveCNAME',
    callback,
  );
});

gulp.task('build:run', callback => {
  runSequence('build', 'build:serve', callback);
});

gulp.task('default', callback => {
  runSequence(['webpack', 'sass'], 'useref', 'browserSync', 'watch', callback);
});

gulp.task('deploy', () =>
  gulp.src('./dist/**/*').pipe(ghPages({
    origin: 'upstream',
    branch: 'master',
  })));
