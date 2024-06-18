const gulp = require("gulp");
const browserSync = require("browser-sync");
const sass = require("gulp-sass")(require("sass"));
const cleanCSS = require("gulp-clean-css");
const autoprefixer = require("gulp-autoprefixer");
const rename = require("gulp-rename");
const htmlmin = require("gulp-htmlmin");
const { watch } = require("gulp");

function serve() {
  browserSync.init({
    server: {
      baseDir: "..",
      index: "index.html",
    },
    port: 5001,
    open: false,
  });

  watch("../**/*").on("change", browserSync.reload);
}

gulp.task("styles", function () {
  return gulp
    .src("src/sass/**/*.+(scss|sass)")
    .pipe(sass({ outputStyle: "compressed" }).on("error", sass.logError))
    .pipe(rename({ suffix: ".min", prefix: "" }))
    .pipe(autoprefixer())
    .pipe(cleanCSS({ compatibility: "ie8" }))
    .pipe(gulp.dest("./public/css"))
    .pipe(browserSync.stream());
});

gulp.task("html", function () {
  return gulp
    .src("src/*.html")
    .pipe(htmlmin({ collapseWhitespace: true }))
    .pipe(gulp.dest("./public"));
});

gulp.task("scripts", function () {
  return gulp
    .src("src/js/**/*.js")
    .pipe(gulp.dest("./public/js"))
    .pipe(browserSync.stream());
});

gulp.task("fonts", function () {
  return gulp
    .src("src/fonts/**/*")
    .pipe(gulp.dest("./public/fonts"))
    .pipe(browserSync.stream());
});

gulp.task("icons", function () {
  return gulp
    .src("src/icons/**/*")
    .pipe(gulp.dest("./public/icons"))
    .pipe(browserSync.stream());
});

gulp.task("images", function () {
  return gulp
    .src("src/img/**/*")
    .pipe(gulp.dest("./public/img"))
    .pipe(browserSync.stream());
});

gulp.task("watch", function () {
  gulp.watch("src/sass/**/*.+(scss|sass|css)", gulp.parallel("styles"));
  gulp.watch("src/*.html", gulp.parallel("html"));
  gulp.watch("src/js/**/*.js", gulp.parallel("scripts"));
  gulp.watch("src/fonts/**/*", gulp.parallel("fonts"));
  gulp.watch("src/icons/**/*", gulp.parallel("icons"));
  gulp.watch("src/img/**/*", gulp.parallel("images"));
});

gulp.task("copy", function () {
  return gulp.src("public/**/*").pipe(gulp.dest("../public"));
});

gulp.task(
  "build",
  gulp.series(
    gulp.parallel("styles", "html", "scripts", "fonts", "icons", "images"),
    "copy"
  )
);

gulp.task("default", gulp.parallel("watch", serve));
