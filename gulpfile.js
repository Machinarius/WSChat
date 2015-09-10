/// <reference path="typings/gulp/gulp.d.ts" />

//require('typescript-require');

require('source-map-support').install();

var gulp = require('gulp');
var del = require('del');

var typescript = require('gulp-typescript');
var mocha = require('gulp-mocha');
var sourcemaps = require('gulp-sourcemaps');

gulp.task('clean', function(done) {
	del([
		"Out"
	], done);
});

gulp.task('build_server', ['clean'], function() {
	gulp.src('Server/**/*.json')
		.pipe(gulp.dest('Out/Server'));
	
	var tsResult = 
		gulp.src(["**/*.ts", "!node_modules/**"])
		.pipe(sourcemaps.init())
		.pipe(typescript({ 
			module: 'commonjs', 
			target: 'ES5',
			removeComments: true
		}));
	
	return tsResult.js
		.pipe(sourcemaps.write())
		.pipe(gulp.dest('Out'));
});

gulp.task('test_server', ['build_server'], function() {
	gulp.src('Out/Server/test/**/*.js', { read: false })
		.pipe(mocha());
});

gulp.task('default', ['test_server']);