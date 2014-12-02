var gulp = require('gulp'),
    minifycss = require('gulp-minify-css'),
    jshint = require('gulp-jshint'),
    uglify = require('gulp-uglify'),
    rename = require('gulp-rename'),
    concat = require('gulp-concat'),
    del = require('del');

gulp.task('styles', function () {
    return gulp.src('client/css/*.css')
        .pipe(concat('main.css'))
        .pipe(gulp.dest('client/css/'))
        .pipe(rename({suffix: '.min'}))
        .pipe(minifycss())
        .pipe(gulp.dest('client/css/'));
});

gulp.task('clean', function(cb) {
    del(['client/css/main.css', 'client/css/main.min.css'], cb);
});

gulp.task('default', ['clean'], function() {
    gulp.start('styles');
});