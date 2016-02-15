var gulp = require('gulp'),
	compass = require('gulp-compass'),
	rename = require('gulp-rename'),
	autoprefix = require('gulp-autoprefixer'),
  	nanocss = require('gulp-cssnano');

gulp.task('styles', function() {
  gulp.src('./scss/*.scss')
    .pipe(compass({
      css: 'css',
      sass: 'scss',
      image: 'images',
      require: ['susy', 'modular-scale'],
      noCache: true,
    }))
    .pipe(autoprefix('last 2 version'))
    .pipe(gulp.dest('./css'))
    .pipe(rename({suffix: '.min'}))
    .pipe(nanocss())
    .pipe(gulp.dest('css'));
});

// Rerun the task when a file changes
gulp.task('watch', function() {
    gulp.watch('/**/*.scss', ['styles']);
});

  gulp.task('default', ['styles']);