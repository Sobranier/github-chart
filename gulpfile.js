var gulp = require('gulp');
var sass = require('gulp-sass');
var watch = require('gulp-watch');
var rename = require('gulp-rename');
var jshint = require('gulp-jshint');
var uglify = require('gulp-uglify');
var minifyCSS = require('gulp-minify-css');
var runSquence = require('run-sequence');
var clean = require('gulp-clean');

/**
 *  jshint 暂时保留
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
        .pipe(gulp.dest('build'));
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
        .pipe(gulp.dest('build'));
});

gulp.task('clean', function () {
    return gulp.src('build', {read: false})
        .pipe(clean({force: true}));
});

gulp.task('static', function () {
    return gulp.src(['./assets/jquery.js', './dev/manifest.json', './assets/icon-128.png', './assets/icon-48.png'])
        .pipe(gulp.dest('build'));
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
    runSquence('clean', 'static', 'sass', 'jshint', 'compress');
});


/**
 *  develop task
 */
gulp.task('dev', function () {
    runSquence('default', 'watch');
})

