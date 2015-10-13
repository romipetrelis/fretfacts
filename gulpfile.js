'use strict'

var gulp = require('gulp'),
  mocha = require('gulp-mocha'),
  gutil = require('gulp-util');

gulp.task('mocha', function(){
  return gulp.src(
    ['test/*.js'],
    {read:false}).pipe(mocha({reporter:'list'})).on('error', gutil.log);
});

gulp.task('watch-mocha', function(){
  gulp.run('mocha'); // run the 'mocha' task on initial invocation of this task
  gulp.watch(['./**/*.js', 'test/**/*.js'], ['mocha']); // setup a file watcher, which will run the 'mocha' task as tests change
});

gulp.task('default', ['watch-mocha']); // set the default task(s)
