/// <reference path="typings/gulp/gulp.d.ts" />

var gulp = require('gulp');
var del = require('del');
var typescript = require('gulp-typescript');

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

gulp.task('default', ['build_server']);