// gulpfile.js

var gulp = require('gulp');
var jshint = require('gulp-jshint');
var karma = require('gulp-karma');

var testFiles;
require('./.karma.js')({set: function (config) { testFiles = config['files']; }});

gulp.task('lint', function () {

    return gulp.src(['./straw-ios.js', './straw-ios-spec.js'])

        .pipe(jshint())

        .pipe(jshint.reporter('default'));

});

gulp.task('test', function () {

    return gulp.src(testFiles).pipe(karma({

        configFile: '.karma.js',
        action: 'start'

    })).on('error', function (err) {

        throw err;

    });

});

gulp.task('default', ['lint', 'test']);
