var gulp = require('gulp'),
    minifycss = require('gulp-minify-css'),
    jshint = require('gulp-jshint'),
    uglify = require('gulp-uglify'),
    rename = require('gulp-rename'),
    concat = require('gulp-concat'),
    livereload = require('gulp-livereload'),
    browserify = require('gulp-browserify'),
    del = require('del');

gulp.task('styles', function () {
    return gulp.src('client/css/*.css')
        .pipe(concat('main.css'))
        .pipe(gulp.dest('client/css/'))
        .pipe(rename({suffix: '.min'}))
        .pipe(minifycss())
        .pipe(gulp.dest('client/css/'));
});

gulp.task('browserify', function () {
    gulp.src(['client/js/default/default.js'])
        .pipe(browserify({
            insertGlobals: false,
            debug: false
        }))
        .pipe(rename({ suffix: '.min' }))
        //.pipe(uglify({mangle: false}))
        .pipe(gulp.dest('client/js/default/'))
});

gulp.task('clean', function (cb) {
    del(['client/css/main.css', 'client/css/main.min.css', 'client/js/default/default.min.js'], cb);
});

gulp.task('default', ['clean'], function () {
    gulp.start('styles', 'browserify');
});

gulp.task('watch', function () {
    gulp.watch('client/css/*.css', ['styles']);
    gulp.watch('client/js/**/*.js', ['browserify']);
    livereload.listen();
    gulp.watch(['client/**']).on('change', livereload.changed);
});