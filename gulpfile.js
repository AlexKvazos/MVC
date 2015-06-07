var gulp = require('gulp');
var sass = require('gulp-ruby-sass');
var rename = require('gulp-rename');
var minifycss = require('gulp-minify-css');
var del = require('del');
var livereload = require('gulp-livereload');
var eslint = require('gulp-eslint');
var browserify = require('browserify');
var source = require('vinyl-source-stream');
var buffer = require('vinyl-buffer');
var babelify = require('babelify');
var sourcemaps = require('gulp-sourcemaps');
var gutil = require('gulp-util');
var uglify = require('gulp-uglify');
var nodemon = require('gulp-nodemon');

// sass compiler
gulp.task('styles', function() {
  return sass('core/client/scss/index.scss', { style: 'expanded' })
    .pipe(rename({ basename: 'application' }))
    .pipe(minifycss())
    .pipe(gulp.dest('public'));
});


// clean build folder
gulp.task('clean', function(cb) {
  del(['public'], cb);
});


// lint javascript
gulp.task('lint', function() {
  return gulp.src(['core/**/*.js', 'core/**/*.jsx'])
    .pipe(eslint())
    .pipe(eslint.format())
    .pipe(eslint.failOnError());
});


// bundle javascript
gulp.task('bundle', function() {
  var debug = process.env.NODE_ENV && process.env.NODE_ENV.toLowerCase() === 'development';
  var b = browserify({
    entries: 'core/client/js/app.js',
    transform: [babelify]
  });

  if (debug) {
    return b.bundle()
    .pipe(source('application.js'))
    .pipe(buffer())
    .pipe(sourcemaps.init({loadMaps: true}))
    .pipe(uglify({
      mangle: false
      }))
    .on('error', gutil.log)
    .pipe(sourcemaps.write('./'))
    .pipe(gulp.dest('./public'));
  } else {
    return b.bundle()
    .pipe(source('application.js'))
    .pipe(buffer())
    .pipe(uglify())
    .on('error', gutil.log)
    .pipe(gulp.dest('./public'));
  }
});


// copy fonts, images and templates
gulp.task('copy', function() {
  gulp.src('./core/client/img/**/*.{png,gif,jpg,jpeg}')
    .pipe(gulp.dest('./public/img'));
  gulp.src('./core/client/fonts/**/*.{ttf,woff,eof,svg,otf}')
    .pipe(gulp.dest('./public/fonts'));
  gulp.src('./core/client/templates/**/*.{html,hbs}')
    .pipe(gulp.dest('./public/templates'));
});


// main build task
gulp.task('build', ['lint', 'clean'], function() {
  gulp.start('styles');
  gulp.start('bundle');
  gulp.start('copy');
});


// development task
gulp.task('serve', function() {

  livereload.listen();

  nodemon({
    script: './bin/start',
    ext: 'hbs,js',
    ignore: ['public/**/*.js', 'node_modules/**/*.js', 'core/client/**/*.js']
  })
  .on('restart', function() {
    livereload.reload();
  });

  gulp.watch(['public/**/*']).on('change', livereload.changed);

  gulp.watch('core/client/img/**/*', ['copy']);
  gulp.watch('core/client/fonts/**/*', ['copy']);
  gulp.watch('core/client/templates/**/*', ['copy']);

  gulp.watch('core/client/**/*.scss', ['styles']);
  gulp.watch('core/client/**/*.{js,jsx}', ['bundle']);
});
