"use strict";

var gulp = require('gulp');
var connect = require('gulp-connect'); // runs a local server
var open = require('gulp-open'); // open a url in web browser
var browserify = require('browserify'); // bundle js
var reactify = require('reactify'); // transform react jsx to js
var source = require('vinyl-source-stream'); // use conventional text stream with help
var concat = require('gulp-concat'); // concatenates files
var lint = require('gulp-eslint'); // lint js files, including jsx files
var open = require('gulp-open');
var os = require('os');

var config ={
    port: 9006,
    devBaseUrl: 'http://localhost',
    paths: {
        html: './src/*.html',
        js: './src/**/*.js',
        css: [
            'node_modules/bootstrap/dist/css/bootstrap.min.css',
            'node_modules/bootstrap/dist/css/bootstrap-theme.min.css',
            'node_modules/toastr/toastr.css'
        ],
        dist: './dist',
        mainJs: './src/main.js'
    }
}

var browser = os.platform() === 'linux' ? 'google-chrome' : (
    os.platform() === 'darwin' ? 'google chrome' : (
    os.platform() === 'win32' ? 'chrome' : 'firefox'));

 //   gulp.src('./package.json').pipe(open({app: 'chrome'}));

gulp.task('connect', function() {
    connect.server({
        root: ['dist'],
        port: config.port,
        base: config.devBaseUrl,
        livereload: true
    });
});

/*
gulp.task('browser', function(){
    gulp.src('dist/index.html')
    .pipe(open({app: browser}));
  });
*/
gulp.task('open', ['connect'], function(){
    gulp.src('dist/index.html')
    .pipe(open({uri: config.devBaseUrl + ':' + config.port + '/', app: 'chrome'}));
});

gulp.task('html', function(){
    gulp.src(config.paths.html)
    .pipe(gulp.dest(config.paths.dist))
    .pipe(connect.reload());

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

gulp.task('css', function(){
    gulp.src(config.paths.css)
    .pipe(concat('bundle.css'))
    .pipe(gulp.dest(config.paths.dist + '/css'))
});

gulp.task('lint', function(){
   return gulp.src(config.paths.js)
   .pipe(lint({config: 'eslint.config.json'}))
   .pipe(lint.format());

});

gulp.task('watch',function(){
    gulp.watch(config.paths.html, ['html']);
    gulp.watch(config.paths.js, ['js','lint']);

});

gulp.task('default', ['html','js','css','lint','open', 'watch']);


