var gulp = require('gulp');
var react = require('gulp-react');
var reactify = require('reactify');
var browserify = require('browserify');
var source = require('vinyl-source-stream');
var rename = require('gulp-rename');
var webserver = require('gulp-webserver');

var watching = false;
var handleError = function(err){
  console.error(err.toString());
  if(watching){
    return this.emit('end');
  }
  return process.exit(1);
}

gulp.task('webserver', function() {
  gulp.src('./')
    .pipe(webserver({
      livereload: true,
      fallback: 'examples/index.html',
      open: true
    }));
});

gulp.task('jsx', function(){
  return gulp.src('src/**/*.jsx')
          .pipe(react({harmony: true}))
          .pipe(gulp.dest('lib'));
});

var reactifyES6 = function(file){
  return reactify(file, {es6: true});
};

gulp.task('js', function(){
  var b = browserify({
      standalone: 'Charts'
    });
  b.transform(reactifyES6); // use the reactify transform
  b.add('./charts.js');
  return b.bundle()
    .on('error', handleError)
    .pipe(source('charts.js'))
    .pipe(rename('build.js'))
    .pipe(gulp.dest('dist/'));
});

gulp.task('watch', function(){
  watching = true;
  gulp.watch('src/**/*.jsx', ['jsx', 'js']);
  gulp.watch('./charts.js', ['js']);
  gulp.watch('src/lib/**/*.js', ['js']);

  gulp.start('jsx', 'js', 'webserver');
});

gulp.task('default', function() {
  gulp.start('jsx', 'js');
});
