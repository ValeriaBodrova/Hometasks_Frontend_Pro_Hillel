const gulp = require('gulp');
const cleanCSS = require('gulp-clean-css');
const concat = require('gulp-concat');
const uglify = require('gulp-uglify');

// Завдання для мінімізації та конкатенації CSS
gulp.task('minify-concat-css', function () {
  return gulp.src('Store_Site/src/*.css') // Шлях до ваших CSS файлів
    .pipe(concat('styles.min.css')) // Об'єднання файлів у styles.min.css
    .pipe(cleanCSS()) // Мінімізація CSS
    .pipe(gulp.dest('Store_Site/dist/css')); // Шлях до папки, куди зберегти результат
});

// Завдання для мінімізації та конкатенації JS
gulp.task('scripts', () => {
  return gulp.src('Store_Site/src/**/*.js')
    .pipe(concat('scripts.js'))
    .pipe(uglify())
    .pipe(gulp.dest('Store_Site/dist/js'));
});

// Запуск завдання за замовчуванням
gulp.task('default', gulp.parallel('minify-concat-css', 'scripts'));
