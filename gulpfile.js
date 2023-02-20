const { src, dest, series, watch } = require('gulp')
const concat = require('gulp-concat')
const htmlmin = require('gulp-htmlmin')

const styles = () => {
  return src('src/styles/**/*.css')
    .pipe(concat('main.css'))
    .pipe(dest('dist'))
}

const htmlminify = () => {
  return src('src/**/*.html')
    .pipe(htmlmin({
      collapseWhitespace: true,
    }))
    .pipe(dest('dist'))
}

exports.styles = styles
exports.htmlminify = htmlminify
exports.default = series(styles, htmlminify)
