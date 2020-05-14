const gulp = require("gulp");
const babel = require("gulp-babel");
const nodemon = require("gulp-nodemon");
const eslint = require("gulp-eslint");
const rename = require("gulp-rename");

gulp.task('js', () => {
    return gulp.src('./client/*.js')
    .pipe(babel({ presets: ['@babel/env'] }))
    .pipe(rename('bundle.js'))
    .pipe(gulp.dest('./hosted/'));
});

gulp.task('lint', () => {
    return gulp.src('./server/*.js')
    .pipe(eslint())
    .pipe(eslint.format())
    .pipe(eslint.failAfterError());
});

// gulp.task('build', () => {
//     gulp.start('js');
//     gulp.start('lint');
// });

// Gulp v4 version
gulp.task('build', gulp.series('js', 'lint'), function(done){
    done();
});

gulp.task('watch', () => {
    gulp.watch('./client/*.js', ['js']);
    nodemon({
        script: './server/app.js',
        ext: 'js',
        tasks: ['lint'],
    });
});