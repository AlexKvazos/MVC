var gulp = require('gulp');
var minifycss = require('gulp-minify-css');
var del = require('del');
var path = require('path');
var less = require('gulp-less');
var livereload = require('gulp-livereload');
var eslint = require('gulp-eslint');
var browserify = require('browserify');
var source = require('vinyl-source-stream');
var buffer = require('vinyl-buffer');
var concat = require('gulp-concat');
var babelify = require('babelify');
var sourcemaps = require('gulp-sourcemaps');
var gutil = require('gulp-util');
var uglify = require('gulp-uglify');
var nodemon = require('gulp-nodemon');

var debug = false;

// less compiler
gulp.task('less', function() {
  return gulp.src('src/client/less/index.less')
    .pipe(less({
      paths: [ path.join(__dirname, 'src/client/less') ]
    }))
    .pipe(minifycss())
    .pipe(concat('style.css'))
    .pipe(gulp.dest('public'));
});


// clean build folder
gulp.task('clean', function(cb) {
  del(['public'], cb);
});


// lint javascript
gulp.task('lint', function() {
  return gulp.src(['src/**/*.js', 'src/**/*.jsx'])
    .pipe(eslint())
    .pipe(eslint.format())
    .pipe(eslint.failOnError());
});


// bundle javascript
gulp.task('bundle', function() {
  var b = browserify({
    entries: 'src/client/app.js',
    transform: [babelify],
    debug: debug
  });

  if (debug) {
    return b.bundle()
    .pipe(source('application.js'))
    .pipe(buffer())
    .pipe(sourcemaps.init({loadMaps: true}))
    .on('error', gutil.log)
    .pipe(sourcemaps.write('./'))
    .pipe(gulp.dest('./public'));
  } else {
    return b.bundle()
    .pipe(source('application.js'))
    .pipe(buffer())
    .pipe(uglify({
      mangle: false
    }))
    .on('error', gutil.log)
    .pipe(gulp.dest('./public'));
  }
});


// copy fonts, images and templates
gulp.task('copy', function() {
  gulp.src('./src/client/img/**/*.{png,gif,jpg,jpeg,ico}')
    .pipe(gulp.dest('./public/img'));
  gulp.src('./src/client/fonts/**/*.{ttf,woff,eof,svg,otf}')
    .pipe(gulp.dest('./public/fonts'));
  gulp.src('./src/client/templates/**/*.{html,hbs}')
    .pipe(gulp.dest('./public/templates'));
});


// main build task
gulp.task('build', ['lint', 'clean'], function() {
  gulp.start('less');
  gulp.start('bundle');
  gulp.start('copy');
});


// development task
gulp.task('start', function() {

  // bundle with sourcemaps and no compression
  debug = true;

  livereload.listen();

  nodemon({
    script: './bin/start',
    ext: 'hbs,js',
    ignore: ['public/**/*.js', 'node_modules/**/*.js', 'src/client/**/*.js']
  })
  .on('restart', function() {
    livereload.reload();
  });

  gulp.watch(['public/**/*']).on('change', livereload.changed);

  gulp.watch('src/client/img/**/*', ['copy']);
  gulp.watch('src/client/fonts/**/*', ['copy']);
  gulp.watch('src/client/templates/**/*', ['copy']);

  gulp.watch('src/client/**/*.less', ['less']);
  gulp.watch('src/client/**/*.{js,jsx}', ['bundle']);
});
