const gulp = require("gulp");
const sass = require("gulp-sass");
const connect = require("gulp-connect");
const sourcemaps = require("gulp-sourcemaps");

gulp.task("html", done => {
    gulp.src("*.html")
        .pipe(gulp.dest("dist"))
        .pipe(connect.reload());
    done();
})
gulp.task("img", done => {
    gulp.src("img/*.{jpg,png}")
        .pipe(gulp.dest("dist/img"));
    done();
})
gulp.task("iconfont", done => {
    gulp.src("iconfont/*")
        .pipe(gulp.dest("dist/iconfont"))
        .pipe(connect.reload());
    done();
})
gulp.task("sass", done => {

    gulp.src("sass/*.scss")
        .pipe(sourcemaps.init())
        .pipe(sass({
            outputStyle: "compressed"
        }))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest("dist/css"))
        .pipe(connect.reload());

    done();
});
gulp.task("js", done => {
    gulp.src("js/*")
        .pipe(gulp.dest("dist/js"))
        .pipe(connect.reload());
    done();
})
gulp.task("server", done => {

    connect.server({
        root: "dist",
        livereload: true
    })

    done();

});

gulp.task("watch", done => {

    gulp.watch("*.html", gulp.series("html"));
    gulp.watch("sass/*.scss", gulp.series("sass"));
    gulp.watch("iconfont/*", gulp.series("iconfont"));
    gulp.watch("img/*.{jpg,png}", gulp.series("img"))
    gulp.watch("js/*", gulp.series("js"))
    done();
});

gulp.task("build", gulp.parallel("html", "sass", "iconfont", "img", "js"));

gulp.task("default", gulp.series("build", "server", "watch"));