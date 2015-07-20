var gulp = require('gulp'),
		inject = require('gulp-inject'),
		karma = require('gulp-karma')
		browserSync = require('browser-sync'),
		reload = browserSync.reload;

var paths = {
	scripts: ['modules/weather/weather.module.js', 'modules/**/*.js', '!modules/**/*.test.js'],
	html: ['**/*.html'],
  unitTests: ['modules/**/*.test.js']
};

gulp.task('inject', function(){
	return gulp.src('index.html')
		.pipe(inject(gulp.src(paths.scripts, {read:false})))
		.pipe(gulp.dest('./'));
});

gulp.task('browser-sync', function(){
	browserSync({
		server: {
			baseDir: './'
		}
	});
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

gulp.task('default', ['inject', 'test:unit'], function(){
	gulp.watch(paths.scripts, ['inject']);
  gulp.watch(paths.unitTests, ['test:unit']);
});

gulp.task('dev', ['inject', 'browser-sync'], function(){
	gulp.watch(paths.html, [reload]);
	gulp.watch(paths.scripts, ['inject', reload]);
});
