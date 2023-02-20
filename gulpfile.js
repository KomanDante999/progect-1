const { src, dest, series, watch } = require('gulp')
const concat = require('gulp-concat')
const htmlmin = require('gulp-htmlmin')
const autoprefixer = require('gulp-autoprefixer')
const cleanCss = require('gulp-clean-css')
const svgSprite = require('gulp-svg-sprite')
const image = require('gulp-image')
const uglify = require('gulp-uglify-es').default
const babel = require('gulp-babel')
const notify = require('gulp-notify')
const browserSync = require('browser-sync').create()


const styles = () => {
  return src('src/styles/**/*.css')
    .pipe(concat('main.css'))
    .pipe(autoprefixer({
      cascade: false
    }))
    .pipe(cleanCss({
      level: 2
    }))
    .pipe(dest('dist'))
    .pipe(browserSync.stream())
  }

  const htmlminify = () => {
    return src('src/**/*.html')
    .pipe(htmlmin({
      collapseWhitespace: true,
    }))
    .pipe(dest('dist'))
    .pipe(browserSync.stream())
}

const svgSprites = () => {
  return src('src/img/svg/**/*.svg')
  .pipe(svgSprite({
    mode: {
      stack: {
        sprite: '../sprite.svg'
      }
    }
  }))
  .pipe(dest('dist/images'))
}

const images = () => {
  return src([
    'src/img/**/*.jpg',
    'src/img/**/*.jpeg',
    'src/img/**/*.png',
    'src/img/*.svg',
  ])
  .pipe(image())
  .pipe(dest('dist/images'))
}

const scripts = () => {
  return src([
    'src/js/components/**/*.js',
    'src/js/main.js',
  ])
  .pipe(babel({
    presets: ['@babel/env']
  }))
  .pipe(concat('app.js'))
  .pipe(uglify({
    toplevel: true
  }).on('error', notify.onError()))
  .pipe(dest('dist'))
  .pipe(browserSync.stream())
}

const watchFailes = () => {
  browserSync.init({
    server: {
      baseDir: 'dist'
    }
  })
}

watch('src/**/*.html', htmlminify)
watch('src/styles/**/*.css', styles)
watch('src/img/svg/**/*.svg', svgSprites)
watch('src/js/**/*.js', scripts)

exports.styles = styles
exports.htmlminify = htmlminify
exports.scripts = scripts
exports.default = series(styles, scripts, htmlminify, images, svgSprites, watchFailes)
