'use strict';

const gulp = require('gulp'),
	rename = require('gulp-rename'),
	// watch = require('gulp-watch'),
	autoprefixer = require('gulp-autoprefixer'),
	sass = require('gulp-sass'),
	// sourcemaps = require('gulp-sourcemaps'),
	cssmin = require('gulp-clean-css'),
	// gIf = require('gulp-if'),
	groupMedia = require('gulp-group-css-media-queries'),
	del = require("del"),
	plumber = require("gulp-plumber"),
	browsersync = require("browser-sync").create();

const paths = {
	src: "./src/css.scss",
	dist: "./",
	watchS: "./src/*.scss",
	watchH: "./src/*.html"
}

gulp.task('clean', function () {
	return del(['./css.css', './index.html', './mobile.html']);
});


gulp.task('styles', function () {
	return gulp.src(paths.src)
		.pipe(plumber())
		.pipe(sass())
		.pipe(groupMedia())
		.pipe(autoprefixer({
			cascade: false,
			grid: true
		}))
		.pipe(gulp.dest(paths.dist))
		// .pipe(plumber.stop())
		// .pipe(debug({
		//     "title": "CSS files"
		// }))
		.pipe(browsersync.reload({stream:true}));
});

gulp.task('index', function () {
	return gulp.src(paths.watchH)
		.pipe(gulp.dest(paths.dist))
		.pipe(browsersync.reload({stream:true}));
});

gulp.task('browserSync', function(done) {
	browsersync.init({
		server: {
			baseDir: "./",
			// index: "index.html"
			index: "mobile.html"
		},
		port: 8080,
		open: true
	});
	done();
});

gulp.task('watch', function () {
	gulp.watch(paths.watchS, gulp.series('styles'));
	gulp.watch(paths.watchH, gulp.series('index'));
});

gulp.task('build', gulp.series("clean",
	gulp.parallel("styles", "index")
));

gulp.task('default', gulp.series('build', gulp.parallel('watch', 'browserSync')));
