var gulp = require('gulp');
var rev = require('gulp-rev');
var sass = require('gulp-sass');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var minifyCss = require('gulp-csso');
var imagemin = require('gulp-imagemin');
var handlebars = require('gulp-compile-handlebars');
var babel = require('gulp-babel');

var fs = require('fs');
var del = require('del');

var handlebarOpts = {
    helpers: {
        assetPath: function (path, context) {
            return context.data.root[path];
        }
    }
};

var files = {
    css: 'app.css',
    js: 'app.js',
    plugin_js: 'plugin.js'
}

var paths = {
    src: 'client/assets',
    dest: 'client/public',
    rev_manifest: 'client/public/rev-manifest.json',
    busting_src_files: 'client/views/cache-busting-template/*.ejs',
    busting_dest: 'client/views/components',

    sass_global: 'client/assets/sass/global/**/_*.scss',
    sass_files: ['client/assets/sass/**/*.scss', '!client/assets/sass/global/**/_*.scss'],

    css_compiled_files: 'client/assets/css/compiled/**/*.css',
    css_concat_files: 'client/assets/css/concat/**/*.css',
    css_mins_files: 'client/assets/css/no-concat/**/*.css',
    css_compiled_dest: 'client/assets/css/compiled',
    css_concat_dest: 'client/assets/css',
    css_dest: 'client/public/css',
    css: 'client/public/css/' + files.css,

    js_files: 'client/assets/js/concat/**/*.js',
    js_mins: 'client/assets/js/no-concat/**/*.js',
    js_src: 'client/assets/js/**',
    js_dest: 'client/public/js',
    js: 'client/public/js/' + files.js,

    plugin_js_files: 'client/assets/js/plugins/**/*.js',
    plugin_js_src: 'client/assets/js/plugins/**',
    plugin_js_dest: 'client/public/js',
    plugin_js: 'client/public/js/' + files.plugin_js,

    img_files: 'client/assets/img/*',
    img_src: 'client/assets/img',
    img_dest: 'client/public/img',

    font_files: 'client/assets/fonts/*',
    font_dest: 'client/public/fonts'
}

/******************************************************************************* Default */
gulp.task('default', ['css', 'js', 'img', 'font']);

/********************************************************************************* Watch */
gulp.task('watch', function () {
    gulp.watch(paths.sass_global, ['css']);
    gulp.watch(paths.sass_files, ['css']);
    gulp.watch(paths.css_concat_files, ['css']);
    gulp.watch(paths.css_mins_files, ['css']);
    gulp.watch(paths.js_files, ['js']);
    gulp.watch(paths.js_mins, ['js']);
    gulp.watch(paths.plugin_js_files, ['js']);
    gulp.watch(paths.img_files, ['img']);
    gulp.watch(paths.font_files, ['font']);
});

gulp.task('watch-css', function () {
    gulp.watch(paths.sass_global, ['css']);
    gulp.watch(paths.sass_files, ['css']);
    gulp.watch(paths.css_concat_files, ['css']);
    gulp.watch(paths.css_mins_files, ['css']);
});

gulp.task('watch-js', function () {
    gulp.watch(paths.js_files, ['js']);
    gulp.watch(paths.js_mins, ['js']);
    gulp.watch(paths.plugin_js_files, ['js']);
});

gulp.task('watch-img', function () {
    gulp.watch(paths.img_files, ['img']);
});

gulp.task('watch-font', function () {
    gulp.watch(paths.font_files, ['font']);
});

/********************************************************************************* Clean  */
gulp.task('clean', ['clean-font', 'clean-img', 'clean-js', 'clean-css', 'clean-css-compiled']);

/********************************************************************************* Font */
gulp.task('clean-font', function () {
    return del(paths.font_dest);
});

gulp.task('font', ['clean-font'], function () {
    return gulp.src(paths.font_files)
        .pipe(gulp.dest(paths.font_dest));
});

/********************************************************************************* Img */
gulp.task('img', ['clean-img'], function () {
    return gulp.src(paths.img_files)
    .pipe(imagemin({ optimizarionLevel: 5 }))
    .pipe(gulp.dest(paths.img_dest));
});

gulp.task('clean-img', function () {
    return del(paths.img_dest);
});

/********************************************************************************* JS */
gulp.task('js', ['js-busting', 'plugin-js-busting'], function () {
    del(paths.js);
    del(paths.plugin_js);

    var manifest = JSON.parse(fs.readFileSync(paths.rev_manifest, 'utf8'));

    return gulp.src(paths.busting_src_files)
        .pipe(handlebars(manifest, handlebarOpts))
        .pipe(gulp.dest(paths.busting_dest));
});

/* JS busting */
gulp.task('js-busting', ['uglify-js', 'min-js'], function () {
    return gulp.src(paths.js)
        .pipe(rev())
        .pipe(gulp.dest(paths.js_dest))
        .pipe(rev.manifest(paths.rev_manifest, { merge: true }))
        .pipe(gulp.dest(''));
});

/* Uglify js */
gulp.task('uglify-js', ['clean-js'], function () {
    return gulp.src(paths.js_files)
        .pipe(babel({
            presets: ['es2015']
        }))
        .pipe(uglify())
        .pipe(concat(files.js))
        .pipe(gulp.dest(paths.js_dest));
});

gulp.task('min-js', ['clean-js'], function () {
    return gulp.src(paths.js_mins)
        .pipe(gulp.dest(paths.js_dest));
})

gulp.task('clean-js', function () {
    return del(paths.js_dest);
});

/* Plugin JS busting */
gulp.task('plugin-js-busting', ['uglify-plugin-js'], function () {
    return gulp.src(paths.plugin_js)
        .pipe(rev())
        .pipe(gulp.dest(paths.plugin_js_dest))
        .pipe(rev.manifest(paths.rev_manifest, { merge: true }))
        .pipe(gulp.dest(''));
});

/* Plugin JS */
gulp.task('uglify-plugin-js', ['clean-plugin-js'], function () {
    return gulp.src(paths.plugin_js_files)
        .pipe(uglify())
        .pipe(concat(files.plugin_js))
        .pipe(gulp.dest(paths.plugin_js_dest));
});

gulp.task('clean-plugin-js', function () {
    return del(paths.plugin_js_dest);
});

/***************************************************************************************** CSS */
gulp.task('css', ['css-busting'], function () {
    del(paths.css);

    var manifest = JSON.parse(fs.readFileSync(paths.rev_manifest, 'utf8'));

    return gulp.src(paths.busting_src_files)
        .pipe(handlebars(manifest, handlebarOpts))
        .pipe(gulp.dest(paths.busting_dest));
});

/* CSS busting */
gulp.task('css-busting', ['minify-css', 'min-css'], function () {
    return gulp.src(paths.css)
        .pipe(rev())
        .pipe(gulp.dest(paths.css_dest))
        .pipe(rev.manifest(paths.rev_manifest, { merge: true }))
        .pipe(gulp.dest(''));
});

/* Minify css */
gulp.task('minify-css', ['clean-css', 'sass'], function () {
    return gulp.src([paths.css_concat_files, paths.css_compiled_files])
        .pipe(minifyCss())
        .pipe(concat(files.css))
        .pipe(gulp.dest(paths.css_dest));
})

gulp.task('min-css', ['clean-css'], function () {
    return gulp.src(paths.css_mins_files)
        .pipe(minifyCss())
        .pipe(gulp.dest(paths.css_dest))
})

gulp.task('clean-css', function () {
    return del(paths.css_dest);
})

/* Compile sass to css */
gulp.task('sass', ['clean-css-compiled'], function () {
    return gulp.src(paths.sass_files)
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest(paths.css_compiled_dest))
})

gulp.task('clean-css-compiled', function () {
    return del(paths.css_compiled_files);
})
