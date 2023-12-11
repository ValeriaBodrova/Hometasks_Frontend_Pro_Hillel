const gulp = require('gulp');
const cleanCSS = require('gulp-clean-css');
const concat = require('gulp-concat');

// Завдання для мінімізації та конкатенації CSS
gulp.task('minify-concat-css', function () {
  return gulp.src('src/css/*.css') // Шлях до ваших CSS файлів
    .pipe(concat('styles.min.css')) // Об'єднання файлів у styles.min.css
    .pipe(cleanCSS()) // Мінімізація CSS
    .pipe(gulp.dest('dist/css')); // Шлях до папки, куди зберегти результат
});

// Запуск завдання за замовчуванням
gulp.task('default', gulp.series('minify-concat-css'));
