const jshint = require('gulp-jshint');
const uglyfly = require('gulp-uglyfly');
const clean = require('gulp-clean');
const gulp   = require('gulp');

gulp.task('clean', function(){
	return pipe('src/remap.min.js')
		.pipe(clean());
})


gulp.task('jshint', function(){
	return gulp.src('src/remap.js')
			.pipe(jshint())
			.pipe(jshint.reporter('default'))
			.pipe('src/');
});

gulp.task('uglyfly' , function(){
	return gulp.src('src/remap.js')
			.pipe(uglyfly())
			.pipe(gulp.dest('min/'));
});

gulp.task('default' , [ 'jshint' , 'uglyfly'] );