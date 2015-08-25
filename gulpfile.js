/// <reference path="typings/gulp/gulp.d.ts" />

//require('typescript-require');

var gulp = require('gulp');
var del = require('del');

var typescript = require('gulp-typescript');
var mocha = require('gulp-mocha');

gulp.task('clean', function(done) {
	del([
		"Out"
	], done);
});

gulp.task('build_server', ['clean'], function() {
	var tsResult = 
		gulp.src("Server/**/*.ts")
		.pipe(typescript({ 
			module: 'commonjs', 
			target: 'ES5',
			removeComments: true
		}));
	
	return tsResult.js.pipe(gulp.dest('Out/Server'));
});

gulp.task('test_server', ['build_server'], function() {
	gulp.src('Out/Server/test/**/*.js', { read: false })
		.pipe(mocha());
});

gulp.task('default', ['build_server']);