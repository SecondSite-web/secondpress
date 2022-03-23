// "use strict";
// Gulpfile Taskrunner | by SecondSite
// Read the README.md for a list of the functions available
// Load plugins
const autoprefixer = require("autoprefixer"),
    cleanCSS = require("gulp-clean-css"), // CSSNANO tested faster, not in use
    del = require("del"),
    gulp = require("gulp"),
    newer = require('gulp-newer'),
    cache = require('gulp-cache'),
    header = require("gulp-header"),
    merge = require("merge-stream"),
    plumber = require("gulp-plumber"),
    rename = require("gulp-rename"),
    sass = require("gulp-sass")(require('sass')),
    cssnano = require('cssnano'),
    postcss = require('gulp-postcss'),
    terser = require('gulp-terser-js'), // in use, tested better compression than Uglify
    uglify = require("gulp-uglify"), // Error rates higher than Terser
    concat = require('gulp-concat'),
    deporder = require('gulp-deporder'),
    stripdebug = require('gulp-strip-debug'),
    strip = require('gulp-strip-comments'),
    zip = require('gulp-zip'),
    pkg = require('./package.json'),
    pipeline = require('readable-stream').pipeline;
    sass.compiler = require('node-sass'); // node-sass compiler
// Javascript files to be concatenated and minified into admin.js, admin.min,js and map for backend facing pages
const adminScripts = [
    "./src/js-compile/**/*"
];
const banner = ['/*!\n',
    'Theme Name: <%= pkg.name %>\n',
    'Theme URI: <%= pkg.homepage %>\n',
    'Author: <%= pkg.author %>\n',
    'Author URI: <%= pkg.homepage %>/\n',
    'Description: <%= pkg.description %>\n',
    'Version: <%= pkg.version %>\n',
    'License: <%= pkg.license %>\n',
    'License URI: (https://github.com/SecondSite-web/<%= pkg.name %>/blob/master/LICENSE)\n',
    'Text Domain: <%= pkg.name %>\n',
    'Tags: custom-background, custom-logo, custom-menu, featured-images, threaded-comments, translation-ready\n',
    'This theme, like WordPress, is licensed under the GPL.\n',
    'Use it to make something cool, have fun, and share what you have learned.\n',
    '<%= pkg.name %> is based on Underscores https://underscores.me/, (C) 2012-2020 Automattic, Inc. \n',
    'This theme is built with Bootstrap\n',
    ' */\n',
    '\n',
].join('');

function clean()
{
    return del([
        './css/',
        './js/',
    ]);
}
// My wordpress styles.css file written from package.json
function css_header() {
    return gulp
        .src("./src/scss/_theme/style.scss")
        .pipe(header(banner, {
            pkg: pkg
        }))
        .pipe(sass.sync().on('error', sass.logError))
        .pipe(gulp.dest('./'))
}
// Bring third party dependencies from node_modules into vendor directory - part of 'gulp vendor' command
function modules()
{
    var animate = gulp.src('./node_modules/animate.css/animate.min.css')
            .pipe(gulp.dest('./css')),
        bootstrapJS = gulp.src('./node_modules/bootstrap/dist/js/**/*')
            .pipe(gulp.dest('./vendor/bootstrap/js')),
        bootstrapSCSS = gulp.src('./node_modules/bootstrap/scss/**/*')
            .pipe(gulp.dest('./vendor/bootstrap/scss')),
        jquery = gulp.src('./node_modules/jquery/dist/*')
            .pipe(gulp.dest('./vendor/jquery')),
        fa_fonts = gulp.src('./node_modules/@fortawesome/fontawesome-free/webfonts/**/*')
            .pipe(gulp.dest('./webfonts')),
        fa_elements = gulp.src('./node_modules/@fortawesome/fontawesome-free/scss/*')
            .pipe(gulp.dest('./vendor/fontawesome/scss'));
    return merge(animate, bootstrapJS, bootstrapSCSS, jquery, fa_fonts, fa_elements);
}
// writes font end css from scss - `gulp watch`
function compileCss()
{
    return mincss('./src/scss/style.scss', './css/');
}

// minifies individual js files from ./src/js-single to ./js - `gulp watch`
function jsSingle()
{
    return pagejs('./src/js-single/*.js','./js/');
}
// concatenates and minifies backend JS - `gulp watch`
function jsCompile()
{
    return minjs(adminScripts, './admin.js', './js/');
}
// edit this function to change the way SCSS is minified into css - very important function
function mincss(source, destination)
{
    return gulp
        .src(source)
        .pipe(
            plumber({
                errorHandler: function (err) {
                    console.log(err);
                    this.emit('end');
                }
            })
        )
        // .pipe(sourcemaps.init()) // begins the sourcemap recording
        // records errors in the process and provides feedback
        .pipe(sass.sync({
            // fiber: Fiber,
            outputStyle: "expanded",
            includePaths: "./node_modules"
        }).on('error', sass.logError))
        // autoprefixer for backward compatibility
        .pipe(postcss([autoprefixer({
            overrideBrowserslist: ['last 2 versions'],
            cascade: false
        })]))
        // https://github.com/cssnano/cssnano - tested better than css-minify and clean-css and gulp-cssnano
        // tested far faster than gulp-cssnano
        // .pipe(postcss([cssnano])) // cssnano minifier settings in package.json
        // .pipe(header(banner, {pkg: pkg})) // writes the banner from 'gulfile.js' to the head of minified CSS files
        .pipe(rename({suffix: '.min'})) // adds .min. to minifed files
        // .pipe(sourcemaps.write('/')) // Output source maps.
        .pipe(gulp.dest(destination)); // writes to destination

}
// child function to minify js files
function minjs(input, filename, outputdir)
{
    return pipeline(
        gulp.src(input),
        // sourcemaps.init(), // Begins sourcemap capture
        concat(filename), // Concatenates js files in input list
        // stripdebug(), // Strips all debug rules from js files
        // strip(), // Removes all comments from js files
        // terser(), // Supported fork of uglify.js that minifies js files - https://www.npmjs.com/package/terser
        header(banner, {pkg: pkg}), // writes the banner from 'gulfile.js' to the head of minified JS files
        rename({suffix:'.min'}),
        // sourcemaps.write('./'), // outputs the sourcemap
        gulp.dest(outputdir) // writes the files to destination
    );
}
// As above but writes each files in ./twig/src/pagejs to ./twig/js
function pagejs(input, outputdir)
{
    return pipeline(
        gulp.src(input),
        // sourcemaps.init(),
        // concat(filename),
        // stripdebug(),
        // strip(),
        // terser(),
        rename({suffix:'.min'}),
        header(banner, {pkg: pkg}), // writes the banner from 'gulfile.js' to the head of minified JS files
        // sourcemaps.write('./'),
        gulp.dest(outputdir)
    );
}
// exports the full app into a zip file
function dist()
{
    return gulp.src([
        '**',
        '!**/node_modules/**',
        '!**/tools/**',
        '!/src/**',
        '!**/include/tests/**',
        '!./gitignore',
        '!./composer.json',
        '!./composer.lock',
        '!./gulpfile.js',
        '!./package.json',
        '!./package-lock.json',
        '!./phpstan.neon',
        '!./php_cs.cache'
    ])
        .pipe(zip('helderberg-wellness.zip'))
        .pipe(gulp.dest('./dist'));
}
function zipFile()
{
    return gulp.src(['**',])
        // .pipe(zip('dash-master.zip'))
        .pipe(gulp.dest('../dist'));
}

// Cleans working folders
// Watch files - any file change in a watched folder triggers the related compile function
function watchFiles()
{
      gulp.watch("./src/scss/**/*", compileCss);
      gulp.watch(["./src/js-single/**/*", "!./src/js-single/**/*.min.js"], jsSingle);
      gulp.watch(["./src/js-compile/**/*", "!./src/js-compile/**/*.min.js"], jsCompile);
}

// Define complex tasks
const vendor = gulp.series(clean, modules);
const build = gulp.series(vendor, compileCss, jsCompile, jsSingle, css_header, dist);
const watch = gulp.parallel(watchFiles);

// Export tasks - tasks that can be run by 'gulp ' - eg. 'gulp images'
exports.compileCss = compileCss; // writes client css
exports.jsCompile = jsCompile; // writes admin JS
exports.jsSingle = jsSingle; // writes individual admin JS files
exports.clean = clean; // deletes folders when doing a fresh compile or update
exports.vendor = vendor; // re-writes the ./vendor folder
exports.build = build; // does a full write of all css and js and images and email templates - A full 'gulp watch' cycle
exports.watch = watch; // Watches ./src and ./twig/src for all saved changes and auto compiles css, js, email templates, and images
exports.default = build; // sets - 'gulp' command to run the 'build' function
exports.zipFile = zipFile; // Exports the full file structure to a zip file in ./dist
exports.dist = dist;