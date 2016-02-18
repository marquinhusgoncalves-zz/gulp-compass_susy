var gulp = require('gulp'),
    jade = require('gulp-jade'),
    compass = require('gulp-compass'),
    autoprefix = require('gulp-autoprefixer'),
    nanocss = require('gulp-cssnano'),
    imagemin = require('gulp-imagemin'),
    rename = require('gulp-rename'),
    notify = require("gulp-notify");

gulp.task('jade', function () {
    return gulp.src('jade/**/*.jade')
        .pipe(jade({
            pretty: true
        }))
        .pipe(gulp.dest('./'))
        .pipe(notify({ message: 'Jade task complete' }));
});

gulp.task('styles', function() {
  gulp.src('./scss/*.scss')
  .pipe(compass({
    css: 'css',
    sass: 'scss',
    image: 'images',
    require: ['susy', 'modular-scale'],
  }))
  .pipe(autoprefix('last 2 version'))
  .pipe(gulp.dest('./css'))
  .pipe(rename({suffix: '.min'}))
  .pipe(nanocss())
  .pipe(gulp.dest('css'))
  .pipe(notify({ message: 'Styles task complete' }));
});

gulp.task('images', function() {
  return gulp.src('images/*')
    .pipe(imagemin({ optimizationLevel: 3, progressive: true, interlaced: true }))
    .pipe(gulp.dest('img/'))
    .pipe(notify({ message: 'Images task complete' }));
});

// Rerun the task when a file changes
gulp.task('watch', function() {
  gulp.watch('jade/*.jade', ['jade'])
  gulp.watch('scss/*.scss', ['styles'])
  gulp.watch('images/*', ['images']);
});

gulp.task('default', function() {
    gulp.start(['jade', 'styles', 'images', 'watch']);
});