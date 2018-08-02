// jshint node:true

var gulp = require('gulp');
var replace = require('gulp-replace');
var concat = require('gulp-concat');
var rename = require('gulp-rename');
var header = require('gulp-header');
var eol = require('gulp-eol');

var context = require('./context.js');
var headerPipes = require('./header-pipes.js');

var BUNDLE_CONFIG_SOURCES = [
    'js/bundles/modules/parts/core.js',
    'js/bundles/modules/parts/data.js',
    'js/bundles/modules/parts/widgets-base.js',
    'js/bundles/modules/parts/widgets-mobile.js',
    'js/bundles/modules/parts/widgets-web.js',
    'js/bundles/modules/parts/viz.js',
    'js/bundles/modules/parts/aspnet.js'
];

gulp.task('bundler-config', function() {
    return gulp.src(BUNDLE_CONFIG_SOURCES)
        .pipe(replace(/[^]*BUNDLER_PARTS.*?$([^]*)^.*?BUNDLER_PARTS_END[^]*/gm, "$1"))
        .pipe(concat('dx.custom.js'))
        .pipe(header('/* Comment lines below for the widgets you don\'t require and run "devextreme-bundler" in this directory, then include dx.custom.js in your project */'))
        .pipe(headerPipes.useStrict())
        .pipe(replace(/require *\( *["']..\/..\//g, 'require("'))
        .pipe(replace(/^[ ]{4}/gm, ''))
        .pipe(replace(/^[\n\r]{2,}/gm, '\n\n'))
        .pipe(eol())
        .pipe(gulp.dest('js/bundles'))
        .pipe(rename('dx.custom.config.js'))
        .pipe(replace(/require *\( *["']..\//g, 'require("devextreme/'))
        .pipe(gulp.dest(context.RESULT_NPM_PATH + '/bundles'));
});

gulp.task('bundler-config-dev', function() {
    return gulp.watch(BUNDLE_CONFIG_SOURCES, ['bundler-config']);
});
