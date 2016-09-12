var gulp = require('gulp');
var sass = require('gulp-sass');
var watch = require('gulp-watch');
var rename = require('gulp-rename');
var minifyCSS = require('gulp-minify-css');
var runSquence = require('run-sequence');
var clean = require('gulp-clean');
var webpack = require('webpack');

var webpackConfig = require('./webpackConfig.js');

/**
  * js webpack
  */
gulp.task('webpack', function(callback) {
    webpack(webpackConfig, function(err, status) {
        console.log(status.toString())
        callback();
    });
});

/**
 *  sass
 */
gulp.task('sass', function () {
    return gulp.src('./src/*.scss')
        .pipe(sass.sync().on('error', sass.logError))
        .pipe(minifyCSS())
        .pipe(rename(function(path) {
            path.basename += '-min';
        }))
        .pipe(gulp.dest('dest'));
});

gulp.task('clean', function () {
    return gulp.src('./dest', {read: false})
        .pipe(clean({force: true}));
});

gulp.task('static', function () {
    return gulp.src(['./assets/jquery.js', './src/manifest.json', './assets/icon-128.png', './assets/icon-48.png'])
        .pipe(gulp.dest('dest'));
});

/**
 *  watch task
 */
gulp.task('watch', function () {
    watch('./src/*.scss', function () {
        runSquence('sass');
    });
    watch('./src/**/*.js', function () {
        runSquence('webpack');
    });
})


/**
 *  defalut task
 */
gulp.task('default', function (callback) {
    runSquence('clean', 'static', 'sass', 'webpack', callback);
});


/**
 *  develop task
 */
gulp.task('dev', function () {
    runSquence('default', 'watch');
})

