const gulp = require("gulp");
const babel = require("gulp-babel");
const nodemon = require("gulp-nodemon");
const eslint = require("gulp-eslint");

gulp.task('js', () => {
    gulp.src('./client/*.js')
    .pipe(babel({ presets: ['env'] }))
    .pipe(gulp.dest('./hosted/'));
});

gulp.task('lint', () => {
    gulp.src('./server/*.js')
    .pipe(eslint())
    .pipe(eslint.format())
    .pipe(eslint.failAfterError());
});

gulp.task('build', () => {
    gulp.start('js');
    gulp.start('lint');
});

gulp.task('watch', () => {
    gulp.watch('./client/*.js', ['js']);
    nodemon({
        script: './server/app.js',
        ext: 'js',
        tasks: ['lint'],
    });
});