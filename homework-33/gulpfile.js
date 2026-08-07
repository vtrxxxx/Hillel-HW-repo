const { src, dest, task, watch } = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const browserSync = require('browser-sync').create();
const cssnano = require('cssnano');
const rename = require('gulp-rename');
const postcss = require('gulp-postcss');
const mqpacker = require('css-mqpacker');
const sortCSSmq = require('sort-css-media-queries');
const autoprefixer = require('autoprefixer');


const PATHS = { scssSource: './src/**/*.scss',
                htmlSource: './*.html',
                projectDest: './assets' };


const postCssPlugins = [
  cssnano({ preset: 'default' }),
  autoprefixer({
    overrideBrowserslist: ['last 5 versions'],
    cascade: true
  }),
  mqpacker({ sort: sortCSSmq })
]

function scssMinimalization() {
  const pluginsExtended = postCssPlugins.concat([cssnano({
      preset: 'default'
  })]);
  return src(PATHS.scssSource)
    .pipe(sass().on('error', sass.logError))
    .pipe(postcss(postCssPlugins))
    .pipe(rename({ suffix: '.min' }))
    .pipe(dest(PATHS.projectDest))
}

function parseHtml() {
  return src(PATHS.htmlSource)
    .pipe(dest(PATHS.projectDest));
}
function syncInit() {
  browserSync.init({
    server: {
      baseDir: PATHS.projectDest
    }
  });
}

async function sync() {
  browserSync.reload()
}

function watchFiles() {
  scssMinimalization()
  parseHtml()
  syncInit()
  watch(PATHS.scssSource, scssMinimalization)
  watch(PATHS.scssSource, sync)
  watch(PATHS.htmlSource, parseHtml)
  watch(PATHS.htmlSource, sync)
}
task('watch', watchFiles)
