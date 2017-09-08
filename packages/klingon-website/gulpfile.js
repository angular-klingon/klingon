var gulp = require('gulp');
var sass = require('gulp-sass');
var browserSync = require('browser-sync').create();
var cleanCSS = require('gulp-clean-css');
var rename = require("gulp-rename");
var htmlmin = require('gulp-htmlmin');
var clean = require('gulp-clean');

gulp.task('clean', function() {
    return gulp.src('dist', { read: false })
        .pipe(clean());
});

// Compiles SCSS files from /scss into /css
gulp.task('sass', function() {
    return gulp.src('src/scss/klingon.scss')
        .pipe(sass())
        .pipe(gulp.dest('dist/css'))
        .pipe(browserSync.reload({
            stream: true
        }))
});

// Minify html
gulp.task('minify-html', function() {
    return gulp.src('src/*.html')
        .pipe(htmlmin({ collapseWhitespace: true }))
        .pipe(gulp.dest('dist'));
});

// Minify compiled CSS
gulp.task('minify-css', ['sass'], function() {
    return gulp.src('dist/css/klingon.css')
        .pipe(cleanCSS({
            compatibility: 'ie8'
        }))
        .pipe(rename({
            suffix: '.min'
        }))
        .pipe(gulp.dest('dist/css'))
        .pipe(browserSync.reload({
            stream: true
        }))
});

// Copy vendor files from /node_modules into /dist/vendor
// NOTE: requires `npm install` before running!
gulp.task('copy', function() {
    gulp.src('src/img/**/*')
        .pipe(gulp.dest('dist/img'));

    gulp.src('src/manifest.json')
        .pipe(gulp.dest('dist/'));

    gulp.src([
            'node_modules/bootstrap/dist/css/bootstrap.min.css'
        ])
        .pipe(gulp.dest('dist/vendor/bootstrap'));

})

// Default task
gulp.task('default', ['sass', 'minify-html', 'minify-css', 'copy']);

// Configure the browserSync task
gulp.task('browserSync', function() {
    browserSync.init({
        server: {
            baseDir: ''
        },
    })
})

// Dev task with browserSync
gulp.task('dev', ['browserSync', 'sass', 'minify-css'], function() {
    gulp.watch('src/scss/*.scss', ['sass']);
    gulp.watch('src/css/*.css', ['minify-css']);
    // Reloads the browser whenever HTML files change
    gulp.watch('src/*.html', browserSync.reload);
});