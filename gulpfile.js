// gulpfile.js

var gulp = require('gulp');
var jshint = require('gulp-jshint');
var karma = require('gulp-karma');

var testFiles;
require('./.karma.js')({set: function (config) { testFiles = config['files']; }});

var exec = require('child_process').exec;

/**
 * Lint source code and specs
 */
gulp.task('lint', function () {

    return gulp.src(['./straw-ios.js', './straw-ios-spec.js'])

        .pipe(jshint())

        .pipe(jshint.reporter('default'));

});


/**
 * Run test using karma and output code coverage
 */
gulp.task('test', ['lint'], function () {

    return gulp.src(testFiles).pipe(karma({

        configFile: '.karma.js',
        action: 'start'

    })).on('error', function (err) {

        throw err;

    });

});


gulp.task('doc', function (cb) {
    exec('jsduck --config=.jsduck.json', function (err, stdout, stderr) {
        console.log(stdout);
        console.log(stderr);
        cb(err);
    });
});


gulp.task('doc-release', function (cb) {
    exec('jsduck --config=.jsduck.release.json', function (err, stdout, stderr) {
        console.log(stdout);
        console.log(stderr);
        cb(err);
    });
});


gulp.task('default', ['lint', 'test']);
