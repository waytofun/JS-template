var gulp = require('gulp');
var gulpUtil = require('gulp-util');
var sass = require('gulp-sass');
var sourcemaps = require('gulp-sourcemaps');
var autoprefixer = require('gulp-autoprefixer');
var connect = require('gulp-connect');
var open = require('gulp-open');

var src = {
	styles: 'app/styles/*.scss',
	scripts: 'app/**/*.js',
	views: 'app/**/*.html'
}
var styleOutput = 'app/styles';

var sassOptions = {
  errLogToConsole: true,
  outputStyle: 'expanded'
};

gulp.task('sass', function () {
  return gulp
    // Find all `.scss` files from the `stylesheets/` folder
    .src(src.styles)
    .pipe(sourcemaps.init())
    // Run Sass on those files
    .pipe(sass()).on('error',sass.logError)
    // Write the resulting CSS in the output folder
    .pipe(sourcemaps.write())
    .pipe(autoprefixer())
    .pipe(gulp.dest(styleOutput))
    .pipe(connect.reload())
});

gulp.task('watch', function() { 
    // Watch the src folder for change,
    // and run `sass` task when something happens
    gulp.watch(src.styles, ['sass']);
    gulp.watch(src.views, ['html']);
    gulp.watch(src.scripts, ['js']);
});


gulp.task('connect', function () {
  connect.server({
    root:'app/',
    livereload: true
  })
})

gulp.task('html', function () {
  gulp.src(src.views)
    .pipe(connect.reload());
});

gulp.task('js', function () {
  gulp.src(src.scripts)
    .pipe(connect.reload());
});

gulp.task('open', function(){
  gulp.src('app/index.html')
  .pipe(open({uri:'http://localhost:8080/'}))
})


gulp.task('default', ['sass', 'connect', 'watch', 'open']);
