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

var execCallback = function (callback) {
    return function (error, stdout, stderr) {
        if (stdout) {
            console.log(stdout);
        }

        if (stderr) {
            console.log(stderr);
        }

        callback(error);
    };
};


gulp.task('doc', function (cb) {
    exec('jsduck --config=.jsduck.json', execCallback(cb));
});


gulp.task('doc-release', function (cb) {
    exec('jsduck --config=.jsduck.release.json', execCallback(cb));
});


gulp.task('default', ['lint', 'test']);
