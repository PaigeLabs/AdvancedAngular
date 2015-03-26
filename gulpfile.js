var gulp = require('gulp'),
		inject = require('gulp-inject');

var paths = {
	scripts: ['modules/weather/weather.module.js', 'modules/**/*.js']
};

gulp.task('inject', function(){
	return gulp.src('index.html')
		.pipe(inject(gulp.src(paths.scripts, {read:false})))
		.pipe(gulp.dest('./'));
});

gulp.task('default', ['inject'], function(){
	gulp.watch(paths.scripts, ['inject']);
});