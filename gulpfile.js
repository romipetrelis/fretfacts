'use strict'

var gulp = require('gulp'),
  mocha = require('gulp-mocha'),
  gutil = require('gulp-util'),
  connect = require('gulp-connect'), // runs a webserver
  open = require('gulp-open'), // opens a url in a browser
  browserify = require('browserify'),
  reactify = require('reactify'), // transform JSX to JS
  source = require('vinyl-source-stream'), // use conventional text streams with Gulp
  lint = require('gulp-eslint'),
  concat = require('gulp-concat'),
  neat = require('node-neat'),
  sass = require('gulp-sass');

var config = {
  port: 9005,
  baseDevUrl: 'http://localhost',
  paths: {
    //css: ['./src/style.css'],
    js: './src/**/*.js',
    test: './test/*.js',
    html: './src/*.html',
    images: '.src/images/*',
    dist: './dist',
    mainJs: './src/main.js',
    sass: {
      src: './src/styles/sass/**/*.{sass,scss}',
      settings: {
        includePaths: neat.includePaths
        //,style: 'compressed',
        //quiet: true
      }
    }
  }
};

gulp.task('connect', function(){
  connect.server({
    root: ['dist'],
    port: config.port,
    base: config.baseDevUrl,
    livereload: true
  });
});

gulp.task('open', ['connect'], function(){
  gulp.src('dist/index.html').pipe(open({uri: config.baseDevUrl + ':' + config.port + '/'}));
});

gulp.task('html', function(){
  gulp.src(config.paths.html).pipe(gulp.dest(config.paths.dist)).pipe(connect.reload());
});

gulp.task('images', function(){
  gulp.src(config.paths.images).pipe(gulp.dest(config.paths.dist + '/images')).pipe(connect.reload());
  //gulp.src('.src/favicon.ico').pipe(gulp.dest(config.paths.dist));
});

gulp.task('mocha', function(){
  return gulp.src(
    [config.paths.test],
    {read:false}).pipe(mocha({reporter:'list'})).on('error', gutil.log);
});

gulp.task('js', function(){
  browserify(config.paths.mainJs)
    .transform(reactify)
    .bundle()
    .on('error', console.error.bind(console))
    .pipe(source('bundle.js'))
    .pipe(gulp.dest(config.paths.dist + '/scripts'))
    .pipe(connect.reload());
});

// gulp.task('css', function(){
//   gulp.src(config.paths.css).pipe(concat('bundle.css')).pipe(gulp.dest(config.paths.dist + '/css'));
// });

gulp.task('sass', function(){
  return gulp.src(config.paths.sass.src)
    .pipe(sass(config.paths.sass.settings))
    .pipe(gulp.dest(config.paths.dist + '/css'))
});

gulp.task('watch', function(){
  gulp.run('mocha'); // run the 'mocha' task on initial invocation of this task
  gulp.watch([config.paths.js, config.paths.test], ['mocha']); // setup a file watcher, which will run the 'mocha' task as files change
  gulp.watch([config.paths.html], ['html']);
  gulp.watch([config.paths.js], ['js','lint']);
  // gulp.watch(config.paths.css, ['css']);
  gulp.watch([config.paths.sass.src], ['sass']);
});

gulp.task('lint', function(){
  gulp.src(config.paths.js)
  .pipe(lint({config: 'eslint.config.json'}))
  .pipe(lint.format());
});

gulp.task('default', ['watch', 'html', 'js', 'sass', 'lint', 'open']); // set the default task(s)
