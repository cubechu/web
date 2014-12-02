var gulp = require('gulp'),
    minifycss = require('gulp-minify-css'),
    jshint = require('gulp-jshint'),
    uglify = require('gulp-uglify'),
    rename = require('gulp-rename'),
    concat = require('gulp-concat'),
    livereload = require('gulp-livereload'),
    del = require('del');

gulp.task('styles', function () {
    return gulp.src('client/css/*.css')
        .pipe(concat('main.css'))
        .pipe(gulp.dest('client/css/'))
        .pipe(rename({suffix: '.min'}))
        .pipe(minifycss())
        .pipe(gulp.dest('client/css/'));
});

gulp.task('scripts', function() {
  return gulp.src('client/js/default/index.js')
    .pipe(rename({ suffix: '.min' }))
    .pipe(uglify({mangle: false}))
    .pipe(gulp.dest('client/js/default/'));
});

gulp.task('clean', function(cb) {
    del(['client/css/main.css', 'client/css/main.min.css', 'client/js/default/index.min.js'], cb);
});

gulp.task('default', ['clean'], function() {
    gulp.start('styles', 'scripts');
});

gulp.task('watch', function() {
  gulp.watch('client/css/*.css', ['styles']);
  gulp.watch('client/js/default/index.js', ['scripts']);
  livereload.listen();
  gulp.watch(['client/**']).on('change', livereload.changed);
});