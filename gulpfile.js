var gulp = require('gulp'),
		inject = require('gulp-inject'),
		karma = require('gulp-karma');

var paths = {
	scripts: ['modules/weather/weather.module.js', 'modules/**/*.js', '!modules/**/*.test.js'],
  unitTests: ['modules/**/*.test.js']
};

gulp.task('inject', function(){
	return gulp.src('index.html')
		.pipe(inject(gulp.src(paths.scripts, {read:false})))
		.pipe(gulp.dest('./'));
});

gulp.task('test:unit', function(){
	return gulp.src('./foobar')
    .pipe(karma({
      configFile: 'karma.conf.js',
      action: 'run'
    }))
    .on('error', function(err) {
      // Make sure failed tests cause gulp to exit non-zero
      console.log(err);
      this.emit('end'); //instead of erroring the stream, end it
    });
});

gulp.task('default', ['inject'], function(){
	gulp.watch(paths.scripts, ['inject']);
});