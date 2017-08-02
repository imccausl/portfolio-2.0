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
const ghPages = require('gulp-gh-pages');
const gulpIf = require('gulp-if');
const rename = require('gulp-rename');

const SASS_PATH = 'dev/scss/app.scss';

gulp.task('sass', ()=>{
  return gulp.src(SASS_PATH)
    .pipe(sass())
    .pipe(gulp.dest('dev/css/'));
});

gulp.task('browserSync', ()=>{
  browserSync.init({
    server: {
      baseDir: './dev',
      index: 'index.html'
    },
  });
});

gulp.task('build:serve', ()=>{
  browserSync.init({
    server: {
      baseDir: './dist',
      index: 'index.html'
    }
  });
});

gulp.task('webpack', ()=>{
  return gulp.src('dev/js/app.js')
    .pipe(gulpWebpack( mywpConfig, webpack ))
    .pipe(gulp.dest('dev/js/'));
});

gulp.task('useref', ()=>{
  return gulp.src('dev/index.html')
    .pipe(useref())
    .pipe(gulp.dest('dev/'));
});

gulp.task('useref:build', ()=>{
  return gulp.src('dev/index.html')
    .pipe(useref())
    .pipe(gulpIf('*.js', uglify()))
    .pipe(gulpIf('*.css', cssnano()))
    .pipe(gulp.dest('dist/'));
});

gulp.task('fonts', ()=>{
  return gulp.src('dev/fonts/**/*')
    .pipe(gulp.dest('dist/fonts'));
});

gulp.task('images', ()=>{
  return gulp.src('dev/img/**/*')
    .pipe(gulp.dest('dist/img'));
});

gulp.task('build:moveCNAME', ()=>{
  return gulp.src('dev/CNAME')
    .pipe(gulp.dest('dist/'));
});

gulp.task('files', ()=>{
  return gulp.src('dev/files/**/*')
    .pipe(gulp.dest('dist/files'));
});

gulp.task('moveBundle', ()=>{
  return gulp.src('dev/js/bundle.js')
    .pipe(gulp.dest('dist/js'));
});

gulp.task('routes', ()=>{
  return gulp.src('dev/routes/**/*')
    .pipe(gulp.dest('dist/routes'));
});

gulp.task('setToIndex', ()=>{
  return gulp.src('dist/app.html')
    .pipe(rename('index.html'))
    .pipe(gulp.dest('dist/'));
});

gulp.task('removeAppHTML', ()=>{
  return del('dist/app.html');
})

gulp.task('clean:dist', ()=>{
  return del.sync('dist');
});

gulp.task('watch', ['webpack', 'browserSync', 'sass'], ()=>{
  gulp.watch(SASS_PATH, ['sass']);
  gulp.watch('dev/*.html', browserSync.reload);
  gulp.watch(['dev/js/**/*.js', '!dev/js/bundle.js'], ['webpack']);
  gulp.watch('dev/js/bundle.js', browserSync.reload);
  gulp.watch('dev/**/*', ['useref']);
});

gulp.task('build', (callback) => {
  runSequence('clean:dist',
    ['webpack', 'sass', 'fonts', 'images', 'routes', 'files', 'setToIndex'], 'useref:build', 'removeAppHTML', 'moveBundle', 'build:moveCNAME',
    callback
  );
});

gulp.task('build:run', (callback)=>{
  runSquence('build', 'build:serve', callback);
});

gulp.task('default', (callback) => {
  runSequence(['webpack', 'sass'], 'useref', 'watch',
    callback
  );
});

gulp.task('deploy', () => {
  let timestap = new Date();

  return gulp.src('./dist/**/*')
    .pipe(ghPages(
      {
        origin: "upstream",
        branch: "master"
      }
    ));
});