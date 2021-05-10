const gulp = require("gulp");
const plumber = require("gulp-plumber");
const sourcemap = require("gulp-sourcemaps");
const sass = require("gulp-sass");
const postcss = require("gulp-postcss");
const autoprefixer = require("autoprefixer");
const csso = require("postcss-csso");
const rename = require("gulp-rename");
const sync = require("browser-sync").create();
const imagemin = require("gulp-imagemin");
const webp = require("gulp-webp");
const svgstore = require("gulp-svgstore");
const concat = require("gulp-concat");
const terser = require("gulp-terser");
const del = require("del");
const htmlmin = require("gulp-htmlmin");

// Styles

const styles = () => {
  return gulp.src("source/sass/style.scss")
    .pipe(plumber())
    .pipe(sourcemap.init())
    .pipe(sass())
    .pipe(postcss([
      autoprefixer(),
      csso()
    ]))
    .pipe(rename("style.min.css"))
    .pipe(sourcemap.write("."))
    .pipe(gulp.dest("build/css"))
    .pipe(sync.stream());
}

exports.styles = styles;

// HTML

const html = () => {
  return gulp.src("source/**/*.html")
  .pipe(htmlmin({ collapseWhitespace: true }))
  .pipe(gulp.dest('build'));
}

exports.html = html;

// Image

const images = () => {
  return gulp.src("source/img/**/*.{jpg,png,svg}")
    .pipe(imagemin([
      imagemin.optipng({optimizationLevel: 3}),
      imagemin.mozjpeg({quality: 84, progressive: true}),
      imagemin.svgo()
    ]))
    .pipe(gulp.dest("build/img"));
}

exports.images = images;

// Webp

const createWebp = () => {
  return gulp.src("source/img/**/*.jpg")
  .pipe(webp({quality: 90}))
  .pipe(gulp.dest("build/img"));
  }

exports.createWebp = createWebp;

// Sprite SVG

const sprite = () => {
  return gulp.src("source/img/spritesvg/*.svg")
  .pipe(svgstore({
    inlineSvg: true
  }))
  .pipe(rename("sprite.svg"))
  .pipe(gulp.dest("build/img"));
  }

exports.sprite = sprite;

// JS concat && minify

const scripts = () => {
  return gulp.src("source/js/*.js")
  .pipe(concat("main.min.js"))
  .pipe(terser())
  .pipe(gulp.dest("build/js"))
  .pipe(sync.stream());
}

exports.scripts = scripts;

// Clean build

const clean = () => {
  return del("build");
};

exports.clean = clean;

// Copy files

const copy = (done) => {
  gulp.src([
    "source/fonts/*.{woff2,woff}",
    "source/*.ico",
    "source/*.webmanifest",
    "source/img/**/*.{jpg,png,svg}",
  ], {
    base: "source"
  })
  .pipe(gulp.dest("build"))
  done();
}

exports.copy = copy;

// Server

const server = (done) => {
  sync.init({
    server: {
      baseDir: "build"
    },
    cors: true,
    notify: false,
    ui: false,
  });
  done();
}

exports.server = server;

// Watcher

const watcher = () => {
  gulp.watch("source/sass/**/*.scss", gulp.series("styles"));
  gulp.watch("source/js/*.js", gulp.series("scripts"));
  gulp.watch("source/*.html").on("change", sync.reload);
}

exports.default = gulp.series(
  clean,
  copy,
  images,
  gulp.parallel(
    html,
    styles,
    scripts,
    sprite,
    createWebp
  ),
  gulp.series(
    server,
    watcher
  )
);

// Build

const build = gulp.series (
  clean,
  copy,
  images,
  gulp.parallel(
    html,
    styles,
    scripts,
    sprite,
    createWebp
  )
);

exports.build = build;
