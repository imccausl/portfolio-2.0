const gulp = require('gulp');
const sass = require('gulp-sass');
const browserSync = require('browser-sync');
const useref = require('gulp-useref');
const uglify = require('gulp-uglify');
const cssnano = require('gulp-cssnano');
const del = require('del');
const runSequence = require('run-sequence');

const SASS_PATH = 'dev/scss/**/*.scss';

gulp.task('sass', ()=>{
  return gulp.src(SASS_PATH)
    .pipe(sass())
    .pipe(gulp.dest('dev/css'))
    .pipe(browserSync.reload({
      stream: true
    }));
});

gulp.task('browserSync', ()=>{
  browserSync.init({
    server: {
      baseDir: 'dev'
    },
  });
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

gulp.task('watch', ['browserSync', 'sass'], ()=>{
  gulp.watch(SASS_PATH, ['sass']);
  gulp.watch('dev/*.html', browserSync.reload);
  gulp.watch('dev/js/**/*.js', browserSync.reload);
});

gulp.task('build', (callback) => {
  runSequence('clean:dist',
    ['sass', 'useref', 'fonts'],
    callback
  );
});

gulp.task('default', (callback) => {
  runSequence(['sass', 'browserSync', 'watch'],
    callback
  );
})