var gulp = require('gulp');
var webpack = require("webpack")
var gutil = require('gulp-util');
var connect = require('gulp-connect');
var plumber = require('gulp-plumber');
var react = require('gulp-react');
var concat = require('gulp-concat');
var sourcemaps = require('gulp-sourcemaps');
var merge = require('event-stream').merge;

gulp.task('build', ['copy', 'react', 'webpack']);

gulp.task('webpack', function (callback) {
  var webpackConfig = require("./webpack.config.js");
  webpack(webpackConfig, function(err, stats) {
    if (err) throw new gutil.PluginError("execWebpack", err);
    gutil.log("[execWebpack]", stats.toString({colors: true}));
  });
  connect.reload();
  callback();
});

gulp.task('react', function() {
  gulp.src('./src/main/jsx/**/*.jsx')
    .pipe(sourcemaps.init())
    .pipe(plumber())
    .pipe(react())
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('./dist/scripts/'))
    .pipe(connect.reload());
});

gulp.task('copy', function () {
  merge(
    gulp.src('./src/main/www/**/*').pipe(gulp.dest('./dist/'))
  ).pipe(connect.reload());
});

gulp.task('watch', function () {
  gulp.watch('./src/main/**/*.jsx', ['webpack', 'react']);
  gulp.watch('./src/main/www/**/*', ['copy']);
  gulp.watch('./dist/scripts/*-bundled.js', function(changedFile) {
    gulp.src(changedFile.path).pipe(connect.reload());
  });
});

gulp.task('serve', function(){
  connect.server({
    root: './dist',
    livereload: true
  });
});
gulp.task('default', ['build', 'react', 'watch', 'serve']);

