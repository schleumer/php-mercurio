var gulp = require('gulp')
  , browserify = require('browserify')
  , gutil = require('gulp-util')
  , sourcemaps = require('gulp-sourcemaps')
  , transform = require('vinyl-transform')
  , uglify = require('gulp-uglify')
  , minifyCss = require('gulp-minify-css')
  , rename = require('gulp-rename')
//, jade = require('gulp-jade')
  , watch = require('gulp-watch')
  , watchify = require('watchify')
//, del = require('del')
//, concat = require('gulp-concat')
  , less = require('gulp-less')
  , path = require('path')
//, gulpLiveScript = require('gulp-livescript')
//, merge = require('merge-stream')
//, streamqueue = require('streamqueue')
  , source = require('vinyl-source-stream')
  , fs = require('fs')
  , plumber = require('gulp-plumber')
  , ngannotate = require('browserify-ngannotate')
  , notify = require('gulp-notify')
  , babelify = require('babelify')
  , html = require('html-browserify')
//, changed = require('gulp-changed')
//, insert = require('gulp-insert')
  , replace = require('gulp-replace')
//, closureCompiler = require('gulp-closure-compiler')
  , R = require('ramda')
  , git = require('git-rev')
  , moment = require('moment')
  , requireGlobify = require('require-globify')
  , pack = require('./package.json')
  , $i18n = require('./helpers/i18nify')
  , frontendDependencies = pack['frontendDependencies'];

var gitHash = null;

git.short(function (str) {
  gitHash = str;
});

var getVersion = function() {
  return (moment().format("YYYY-MM-DD@HH:mm:ss")) + " / " + gitHash;
};

var dontFailPlease = function (error) {
  console.log(error.toString());
};

var joinPath = R.curry(function (root, part) {
  return path.join(root, part);
});

var pub = joinPath('./public/');

var langify = $i18n("./resources/assets/js/lang");

// -----------------------

var vendorBundle = browserify(R.merge(watchify.args, {
  entries: ['./resources/assets/js/vendor.js'],
  paths: ['./resources/assets/js/'],
  debug: false
}));

frontendDependencies.forEach(function (lib) {
  vendorBundle.require(lib);
});

// -----------------------

// -----------------------

gulp.task('copy-fonts', function () {
  return gulp.src([
    './node_modules/material-design-iconic-font/dist/fonts/**',
    './node_modules/bootstrap/dist/fonts/**'
  ]).pipe(gulp.dest(pub('fonts')));
});

gulp.task('copy-images', function () {
  return gulp.src('./resources/assets/images/**').pipe(gulp.dest(pub('images')));
});

gulp.task('browserify-vendor', function () {
  return vendorBundle.bundle()
    .pipe(source('vendor.js'))
    .pipe(replace(/\$vendor-version\$/g, getVersion))
    .pipe(gulp.dest(pub('js')));
});

// TODO: WHAT THE FUCKING FUCK
gulp.task('browserify-app', function () {
  var appBundleArgs = R.merge(watchify.args, {
    entries: ['./resources/assets/js/app.js'],
    paths: ['./resources/assets/js/'],
    debug: false,
    extensions: ['.html', '.js'],
    poll: true
  });
  var appBundle = watchify(browserify(appBundleArgs))
    .transform(babelify.configure({
      ignore: /(node_modules)/,
      // TODO: deixar o babel compativel com o ngannotate
      blacklist: ["strict"]
    }))
    .transform(html)
    .transform(ngannotate)
    .transform(langify("pt"))
    .transform(requireGlobify);

  frontendDependencies.forEach(function (lib) {
    appBundle.external(lib);
  });

  function bundle() {
    return appBundle
      .bundle()
      .on('error', dontFailPlease)
      .pipe(source('app.js'))
      .pipe(replace(/\$app-version\$/g, getVersion))
      .pipe(gulp.dest(pub('js')));
  }

  appBundle.on('update', function () {
    var updateStart = Date.now();

    console.log("watchify updated, recompiling");
    bundle()
      .on('end', function () {
        console.log('Complete!', (Date.now() - updateStart) + 'ms');
      });
  });

  return bundle();
});

gulp.task('dist-browserify-app', function () {
  var appBundleArgs = R.merge(watchify.args, {
    entries: ['./resources/assets/js/app.js'],
    paths: ['./resources/assets/js/'],
    debug: false,
    extensions: ['.html', '.js'],
    poll: true
  });

  var appBundle = browserify(appBundleArgs)
    .transform(babelify.configure({
      ignore: /(node_modules)/,
      // TODO: deixar o babel compativel com o ngannotate
      blacklist: ["strict"]
    }))
    .transform(html)
    .transform(ngannotate)
    .transform(langify("pt"))
    .transform(requireGlobify);

  frontendDependencies.forEach(function (lib) {
    appBundle.external(lib);
  });

  function bundle() {
    return appBundle
      .bundle()
      .on('error', dontFailPlease)
      .pipe(source('app.js'))
      .pipe(replace(/\$app-version\$/g, getVersion))
      .pipe(gulp.dest(pub('js')));
  }

  return bundle();
});

gulp.task('stylesheet', function () {
  return gulp.src(['./resources/assets/less/app.less'], {
    base: './resources/assets/less/'
  })
    //.on('error', notify.onError("Error compiling JavaScript! \n <%= error.message %>"))
    .pipe(plumber())
    .pipe(less({
      paths: [path.join(__dirname, 'node_modules')]
    }))
    .pipe(gulp.dest(pub('css')));
    //.pipe(notify({
    //  message: "LESS compiled!",
    //  onLast: true
    //}));
});

gulp.task('browserify-app-watch', function () {
  return watch(
    [
      './resources/assets/js/**/*.js',
      './resources/assets/js/**/*.html',
      './helpers/**/*.js'
    ], function () {
      return gulp.start(['browserify-app']);
    });
});

gulp.task('stylesheet-watch', function () {
  return watch(['./resources/assets/less/**/*.less'], function () {
    return gulp.start(['stylesheet']);
  });
});

gulp.task('minify-js', ['browserify-vendor', 'dist-browserify-app'], function() {
  return gulp.src([pub('js/app.js'), pub('js/vendor.js')])
    .pipe(uglify())
    .pipe(rename({
      suffix: '.min'
    }))
    .pipe(gulp.dest(pub('js')));
});

gulp.task('minify-css', ['stylesheet'], function() {
  return gulp.src([pub('css/app.css')])
    .pipe(minifyCss())
    .pipe(rename({
      suffix: '.min'
    }))
    .pipe(gulp.dest(pub('css')));
});

gulp.task('watch', [
  'browserify-vendor',
  'browserify-app',
  'copy-fonts',
  'copy-images',
  'stylesheet',
  'stylesheet-watch'
]);

gulp.task('dist', [
  'browserify-vendor',
  'dist-browserify-app',
  'copy-fonts',
  'copy-images',
  'stylesheet',
  'minify-js',
  'minify-css'
]);