/**
 * 压缩js,css,image, html文件
 * @type {*|Gulp}
 */
var gulp = require('gulp');
//var babel = require('gulp-babel');
//var uglify = require('gulp-uglify');
var uglify = require('gulp-uglify-es').default;
var minifyCSS = require('gulp-minify-css');
var imagemin = require('gulp-imagemin');
var htmlmin = require('gulp-htmlmin');
var gutil = require('gulp-util');
var usemin = require('gulp-usemin');
var livereload = require('gulp-livereload');
/*var rename = require("gulp-rename");*/

var options = {
    basic:'./src'
};

gulp.task('script', function() {
    return gulp.src('./src/**/*.js', options)
		/*.pipe(rename("*.min.js"))*/
		/*.pipe(babel({presets:['es2015']}))*/
        .pipe(uglify())
		/*.on('error', function (err) { gutil.log(gutil.colors.red('[Error]'), err.toString()); })*/
        .pipe(gulp.dest('dist'));
});

gulp.task('css', function(){
    gulp.src('./src/**/*.css', options)
        .pipe(minifyCSS())
        .pipe(gulp.dest('dist'));
});

//gulp.task('images', function(){
//    gulp.src('./src/**/*.*', options)
//        .pipe(imagemin({progressive:true}))
//        .pipe(gulp.dest('dist'))
//});

// 将html文件中没有优化过的js和css部分进行压缩优化
gulp.task('usemin',['jshint'], function(){
    return gulp.src('./src/**/*.html', options)
		.pipe(usemin({
			css: [minifycss(),rev()],
			scripts: [uglify().on('error', function(err) {gutil.log(gutil.colors.red('[Error]'), err.toString());this.emit('end');}),rev()]
		})) 
		.pipe(gulp.dest('dist'))
		.pipe(livereload());
});

gulp.task('html', function () {
    var options = {
        removeComments: true,//清除HTML注释
        collapseWhitespace: true,//压缩HTML
        collapseBooleanAttributes: true,//省略布尔属性的值 <input checked="true"/> ==> <input />
        removeEmptyAttributes: true,//删除所有空格作属性值 <input id="" /> ==> <input />
        removeScriptTypeAttributes: true,//删除<script>的type="text/javascript"
        removeStyleLinkTypeAttributes: true,//删除<style>和<link>的type="text/css"
        minifyJS: true,//压缩页面JS
        minifyCSS: true//压缩页面CSS
    };
    gulp.src('src/**/*.html', options)
        .pipe(htmlmin(options))
        .pipe(gulp.dest('dist'));
});
/*gulp.task('auto', function(){
    gulp.watch(['./!*.js', './!*.css', './!*.jpg'], ['script', 'css']);
});*/
gulp.task('default', ['script', 'css', 'html']);

