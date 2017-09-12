var gulp = require('gulp');
var webserver = require('gulp-webserver');
var sass = require('gulp-sass');
var autoprefixer = require('gulp-autoprefixer');
var imagemin = require('gulp-imagemin');
var watch = require('gulp-watch');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var jade = require('gulp-jade');


var config = {
   scss: {
      main:'./app/scss/main.scss',
      watch: './app/scss/**/*.*',
      output: './dist/css',
   },

   jade:{
      watch: './app/*.jade',
      output: './dist'
   },

   js:{
     main: './app/js/main.js',
     watch: './app/js/**/*.js',
     output: './dist/js'
   }
}


gulp.task('templates', function() {
  gulp.src('./app/**/*.jade')
    .pipe(jade({
      pretty: true
    }))
    .pipe(gulp.dest('./dist'))
});


gulp.task('js', function () {
  gulp.src('./app/js/**/*.js')
  .pipe(gulp.dest('./dist/js'))
});


gulp.task('concatenar', ['js'], function () {
  gulp.src('./app/js/*.js')
  .pipe(concat('main.js'))
  //.pipe(uglify()) // minificado de js
  .pipe(gulp.dest('./dist/js'))
});



gulp.task('images', function(){
   gulp.src('./app/img/*.{png,jpg,gif,jpeg,svg}')
   .pipe(imagemin({
        interlaced: true,
        progressive: true,
        optimizationLevel: 2,
        svgoPlugins: [{removeViewBox: true}]
      }))
      .pipe(gulp.dest('./dist/img'));
});



gulp.task('server', function(){
   gulp.src('./dist')
      .pipe(webserver({
         host:'0.0.0.0',
         port: 8000,
         livereload: true
      }));

});


gulp.task('sass', function(){
  gulp.src(config.scss.main)
  .pipe(sass({
    outputStyle: 'nested',
    // outputStyle: 'compressed' // versión minificada del css, utilizar cuando el proyecto esta terminado
    sourceComments: true
  }))
  .pipe(autoprefixer({
    versions:['last 2 browsers']
  }))
  .pipe(gulp.dest(config.scss.output))
});


gulp.task('copy', function () {
    gulp.src('./app/lib' + '/**' + '/*.*')
      .pipe(gulp.dest('./dist/lib'));
});


gulp.task('fonts', function(){
   gulp.src('./app/fonts' + '/**' + '/*.*')
    .pipe(watch('./app/fonts/**/*.*'))
    .pipe(gulp.dest('./dist/fonts'));

});


gulp.task('watch', function(){
  gulp.watch(config.scss.watch, ['sass']);
  gulp.watch(['./app/**/*.jade'], ['templates']);
  gulp.watch(['./app/img'], ['images']);
  gulp.watch(['./app/fonts'], ['fonts']);
  gulp.watch(['./app/lib'], ['copy']);
  gulp.watch(['./app/js/**/*.js'], ['concatenar']);
});


gulp.task('wisegrowth', ['server', 'sass', 'concatenar', 'templates', 'fonts', 'images', 'watch', 'copy']);
