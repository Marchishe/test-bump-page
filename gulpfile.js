var htmlbeautify = require("gulp-html-beautify");
let gulp = require("gulp"),
  browserSync = require("browser-sync").create(),
  sass = require("gulp-sass")(require("sass")),
  cssmin = require("gulp-cssmin"),
  autoprefixer = require("gulp-autoprefixer"),
  imagemin = require("gulp-imagemin");
gulp.task("css_build", function (done) {
  return gulp
    .src("dev/scss/styles.scss")
    .pipe(sass())
    .pipe(cssmin())
    .pipe(
      autoprefixer({
        cascade: false,
        browsers: ["last 8 versions"],
      })
    )
    .pipe(gulp.dest("build/css"))
    .pipe(browserSync.stream());
  done();
});
gulp.task("html_build", function (done) {
  return gulp
    .src("dev/index.html")
    .pipe(htmlbeautify({ indentSize: 2 }))
    .pipe(gulp.dest("build/"))
    .pipe(browserSync.stream());
  done();
});
gulp.task("image_build", function (done) {
  return gulp
    .src("dev/images/*")
    .pipe(imagemin())
    .pipe(gulp.dest("build/images"))
    .pipe(browserSync.stream());
  done();
});
gulp.task("js_build", function (done) {
  return gulp
    .src("dev/scripts/*.js")
    .pipe(gulp.dest("build/scripts"))
    .pipe(browserSync.stream());
  done();
});
gulp.task("webServer", function (done) {
  browserSync.init({
    server: "build/",
  });
  gulp.watch("dev/scss/**/*.scss", gulp.series("css_build"));
  gulp.watch("dev/index.html", gulp.series("html_build"));
  gulp.watch("dev/images/*", gulp.series("image_build"));
  gulp.watch("dev/scripts/*.js", gulp.series("js_build"));
  done();
});

gulp.task(
  "default",
  gulp.series("css_build", "html_build", "image_build", "js_build", "webServer")
);
