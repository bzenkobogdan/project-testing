var gulp = require('gulp'),
	react = require('gulp-react'),
	jsdoc = require("gulp-jsdoc");

gulp.task('default', ['build'], function() {
	gulp.watch(['./src/**/**/*.js*', './src/**/*.css','./src/*.html'], ['build']);
});

gulp.task('build', ['html', 'style', 'json', 'react', 'jsdoc']);

gulp.task('html', function() {
	return gulp.src('./src/**/*.html')
		.pipe(gulp.dest('./dist'));
});

gulp.task('style', function() {
	return gulp.src(['./src/styles/*.css'])
		.pipe(gulp.dest('./dist/styles'));
});

gulp.task('json', function() {
	return gulp.src('./src/**/*.json')
		.pipe(gulp.dest('./dist'));
});

gulp.task('react', function() {
	return gulp.src(['./src/**/**/*.jsx','./src/**/**/*.js'])
		.pipe(react())
		.pipe(gulp.dest('./dist/'));
});

gulp.task('jsdoc', function() {
	return gulp.src('./dist/**/**/*.js*')
		.pipe(jsdoc())
		.pipe(gulp.dest('./documentation'))
})
