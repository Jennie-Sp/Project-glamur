const { src, dest, parallel, series, watch } = require('gulp');
const browserSync  = require('browser-sync').create();
const concat       = require('gulp-concat');
const uglify       = require('gulp-uglify-es').default;
const sass         = require('gulp-sass');
const autoprefixer = require('gulp-autoprefixer');
const cleanCSS     = require('gulp-clean-css');
const imagemin     = require('gulp-imagemin');
const newer        = require('gulp-newer');


function browsersync () {
    browserSync.init({
        server: { baseDir: 'dist/' },
        notify: false,
        online: true
    })
}

function scripts () {
    return src([
        'app/js/app.js',
    ])
    .pipe(concat('app.min.js'))
    .pipe(uglify())
    .pipe(dest('dist/js/'))
    .pipe(browserSync.stream())
}

function styles() {
    return src ('app/sass/main.sass')
    .pipe(eval('sass')())
    .pipe(concat('app.min.css'))
    .pipe(autoprefixer( { overrideBrowserslist: ['last 10 versions'],  grid: true }))
    .pipe(cleanCSS(( { level: { 1: {specialComments: 0 } } /*, format: 'beautify'*/ }  )))
    .pipe(dest('dist/css/'))
    .pipe(browserSync.stream())
}

function images () {
    return src('app/images/**/*')
    .pipe(newer('dist/images/'))
    .pipe(imagemin())
    .pipe(dest('dist/images/'))
}

function buildcopy () {
    return src('app/**/*.html', { base: 'app' })
    .pipe(dest('dist'));
}

function htmlreload(){
    return src([
        'app/**/*.html'
    ], { base: 'app' })
        .pipe(dest('dist'));
}

function startwatch() {
    watch('app/sass/**/*', styles);
    watch('app/**/*.js', scripts);
    watch('app/**/*.html').on('change', series(htmlreload, browserSync.reload));
    watch('app/images/src/**/*', images);
}


exports.browsersync = browsersync;
exports.startwatch  = startwatch;
exports.htmlreload  = htmlreload;
exports.scripts     = scripts;
exports.styles      = styles;
exports.images      = images;
exports.buildcopy   = buildcopy;

exports.build       = series(images, buildcopy)
exports.develop     = series(styles, scripts, parallel(browsersync, startwatch))
exports.default     = series(styles, scripts, images, buildcopy, parallel(browsersync, startwatch))