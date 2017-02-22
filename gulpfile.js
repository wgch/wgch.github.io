'use strict';

var gulp        = require('gulp'),
	sass        = require('gulp-sass'),
	rename        = require('gulp-rename'),
	browserSync = require('browser-sync'),
    nunjucksRender = require('gulp-nunjucks-render'),
	reload      = function () {
		browserSync.reload();
	};

// Nunjucks compiling
gulp.task('nunjucks', function() {
    // Gets .html and .nunjucks files in pages
    return gulp.src('templates/index.html')
    // Renders template with nunjucks
    .pipe(nunjucksRender({
        path: ['./templates']
    }))
    // output files in app folder
    .pipe(gulp.dest('./'))
});

// Sass stuff
gulp.task('sass', function () {
	gulp.src('./assets/sass/*.scss')
		.pipe(sass({outputStyle: 'compressed'}))
		.pipe(rename({extname: '.min.css'}))
		.pipe(gulp.dest('./assets/css'));
});

// Static Server + watching scss/html files
gulp.task('serve', ['sass', 'nunjucks'], function() {
	browserSync.init({
		server: "./"
	});

	gulp.watch("./assets/sass/*", ['sass', reload]);
	gulp.watch("./templates/**/*", ['nunjucks', reload]);
});

// Default task
gulp.task('default', ['serve']);
