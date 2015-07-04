var gulp = require('gulp'),
    sass = require('gulp-sass'),
    watch = require('gulp-watch'),
    rename = require('gulp-rename'),
    jshint = require('gulp-jshint'),
    uglify = require('gulp-uglify'),
    minifyCSS = require('gulp-minify-css'),
    runSquence = require('run-sequence'),
    del = require('del');

/**
 *  jshint
 */
gulp.task('jshint', function () {
    gulp.src('./dev/*.js')
        .pipe(jshint())
        .pipe(jshint.reporter('default'));
});


/**
 *  js compress
 */
gulp.task('compress', function () {
    gulp.src('./dev/*.js')
        .pipe(uglify())
        .pipe(rename(function(path) {
            path.basename += '-min';
        }))
        .pipe(gulp.dest('GC'));
});


/**
 *  sass
 */
gulp.task('sass', function () {
    gulp.src('./dev/*.scss')
        .pipe(sass.sync().on('error', sass.logError))
        .pipe(minifyCSS())
        .pipe(rename(function(path) {
            path.basename += '-min';
        }))
        .pipe(gulp.dest('GC'));
});


/**
 *  watch task
 */
gulp.task('watch', function () {
    watch('./dev/*.scss', function () {
        runSquence('sass');
    });
    watch('./dev/*.js', function () {
        runSquence('jshint', 'compress');
    });

})


/**
 *  defalut task
 */
gulp.task('default', function () {
    runSquence('sass', 'jshint', 'compress');
});


/**
 *  develop task
 */
gulp.task('dev', function () {
    runSquence('default', 'watch');
})

