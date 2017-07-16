const gulp = require('gulp');
const sass = require('gulp-sass');
const browserSync = require('browser-sync');
const useref = require('gulp-useref');
const uglify = require('gulp-uglify');
const cssnano = require('gulp-cssnano');
const del = require('del');
const runSequence = require('run-sequence');
const gulpWebpack = require('webpack-stream');
const webpack = require('webpack');
const mywpConfig = require('./webpack.config');
const concat = require('gulp-concat');

const SASS_PATH = 'dev/scss/**/*.scss';

gulp.task('sass', ()=>{
  return gulp.src(SASS_PATH)
    .pipe(sass())
    .pipe(concat('app.css'))
    .pipe(gulp.dest('dev/css'))
    .pipe(browserSync.reload({
      stream: true
    }));
});

gulp.task('browserSync', ()=>{
  browserSync.init({
    server: {
      baseDir: './',
      index: 'dev/index.html'
    },
  });
});

gulp.task('webpack', ()=>{
  return gulp.src('dev/js/app.js')
    .pipe(gulpWebpack( mywpConfig, webpack ))
    .pipe(gulp.dest('dist/js/'));
});

gulp.task('useref', ()=>{
  return gulp.src('dev/*.html')
    .pipe(useref())
    .pipe(gulpIf('*.js', uglify()))
    .pipe(gulpIf('*.css', cssnano()))
    .pipe(gulp.dest('dist'));
});

gulp.task('fonts', ()=>{
  return gulp.src('dev/fonts/**/*')
    .pipe(gulp.dest('dist/fonts'));
})

gulp.task('clean:dist', ()=>{
  return del.sync('dist');
});

gulp.task('watch', ['webpack', 'browserSync', 'sass'], ()=>{
  gulp.watch(SASS_PATH, ['sass']);
  gulp.watch('dev/*.html', browserSync.reload);
  gulp.watch(['dev/js/**/*.js', '!dev/js/bundle.js'], ['webpack']);
  gulp.watch('dev/js/bundle.js', browserSync.reload);
});

gulp.task('build', (callback) => {
  runSequence('clean:dist',
    ['webpack', 'sass', 'useref', 'fonts'],
    callback
  );
});

gulp.task('default', (callback) => {
  runSequence(['webpack', 'sass', 'browserSync', 'watch'],
    callback
  );
})