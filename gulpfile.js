var gulp = require('gulp'), //載入 gulp
  connect = require('gulp-connect'), //載入 gulp-connect(小型 server)
  gulpUglify = require('gulp-uglify'),    // 載入 gulp-uglify(醜化套件)
  gulpSass = require('gulp-sass'),      // 載入 gulp-sass(將sass scss 轉譯成 css)
  gulpPlumber = require('gulp-plumber')  // 載入 gulp-plumber;
  less = require('gulp-less'); // 載入 gulp-less(將 less 轉譯成 css)

//建立 little server 的 task
/*
gulp.task('server', function() {
  connect.server({
      livereload: true //啟動 livereload
  });
});

//監測檔名為 Html 的, 若發生變更會執行 livereload

gulp.task('html', function () { 
  gulp.src('*.html') // 指定要處理的原始 html 檔案目錄
      .pipe(connect.reload());
});


//監測檔名為 js 的, 若發生變更會執行最小化

gulp.task('script',function(){
    gulp.src("src/js/*.js")   // 指定要處理的原始 src 檔案目錄
    .pipe(gulpUglify())      // 將 JavaScript 做最小化
    .pipe(gulp.dest('src/min'));   // 指定最小化後的 src 檔案目錄
});



gulp.task('styles-less', function () {
  gulp.src('src/less/*.less')
      .pipe(less())
      .pipe(gulp.dest('src/css'))
      .pipe(connect.reload());
});
*/

//監測檔名為 scss 的, 若發生變更會執行最小化
gulp.task('styles-scss', function () {
    gulp.src('scss/*.scss')                      // 指定要處理的 Scss 檔案目錄
        .pipe(gulpPlumber())                    // 使用 gulp-plumber 處理例外
        .pipe(gulpSass({                            // 編譯 Scss 並壓縮
            outputStyle: 'compressed'
        }))
        .pipe(gulp.dest('output'))                    // 指定編譯後的 css 檔案目錄
        .pipe(connect.reload());
});


//啟用監測
gulp.task('watch', function () {
    //gulp.watch('*.html', ['html']); // 指定要偵測的 html 檔案目錄
    //gulp.watch('src/*.js', ['script']); // 指定要偵測的 js 檔案目錄
    //gulp.watch('src/less/*.less', ['styles-less']); // 指定要偵測的 scss 檔案目錄
    gulp.watch('scss/*.scss', ['styles-scss']); // 指定要偵測的 scss 檔案目錄
});
 

 //第一個執行的 task, 後面的陣列是接著執行的 task
 gulp.task('default', ['styles-scss', 'watch']);
