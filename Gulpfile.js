var fs = require('fs');
var gulp = require('gulp');
var sass = require('gulp-sass');
var sourcemaps = require('gulp-sourcemaps');
var autoprefixer = require('gulp-autoprefixer');
var sassdoc = require('sassdoc');
var plugins = require('gulp-load-plugins')();
var packageInfo = require('./package.json');

var config = {
	input: {
		test: [
			'src/sass-helpers.scss'
		],
		build: [
			"src/functions/_math.scss",
			"src/functions/units/_validate.scss",
			"src/functions/units/_convert.scss",
			"src/functions/_easing.scss",
			"src/functions/_zindex.scss",
			"src/functions/_matches.scss",
			"src/_settings.scss",
			"src/misc/_approx.scss",
			"src/misc/_assert.scss",
			"src/misc/_events.scss",
			"src/misc/_is.scss",
			"src/misc/_one-of.scss",
			"src/misc/_position.scss",
			"src/misc/_qualify.scss",
			"src/misc/_retina.scss",
			"src/misc/_scrollbars.scss",
			"src/misc/_share.scss",
			"src/testing/_debug.scss",
			"src/testing/_logger.scss",
			"src/responsive/_aspect-ratio.scss",
			"src/responsive/_spread.scss",
			"src/properties/_box-model.scss",
			"src/properties/_font-feature-settings.scss",
			"src/properties/_line.scss",
			"src/properties/_position.scss",
			"src/properties/_pseudo.scss",
			"src/properties/_shadow-long.scss",
			"src/properties/_shadow-material.scss",
			"src/properties/_size.scss",
			"src/properties/_stagger.scss",
			"src/utilities/_generate.scss"
		]
	},
	output: {
		sass: "./dist/sass",
		css: "./dist/css"
	}
};

var sassOptions = {
	errLogToConsole: true,
	outputStyle: 'expanded'
};

var autoprefixerOptions = {
	browsers: ['last 2 versions', '> 5%', 'Firefox ESR']
};

var sassdocOptions = {
	dest: './docs'
};

gulp.task('test', function () {
	return gulp
		.src(config.input.test)
		//.pipe(sourcemaps.init())
		.pipe(sass(sassOptions).on('error', sass.logError))
		//.pipe(sourcemaps.write())
		.pipe(autoprefixer(autoprefixerOptions))
		.pipe(gulp.dest(config.output.css))
		//.pipe(sassdoc(sassdocOptions))
		.resume();
});

gulp.task('build', function () {
	return gulp
		.src(config.input.build)
		.pipe(plugins.concat('sass-helpers.scss'))
		.pipe(plugins.header(fs.readFileSync('./banner.txt', 'utf8')))
		.pipe(plugins.header('@charset \'UTF-8\';\n\n'))
		.pipe(plugins.replace(/@version@/, packageInfo.version))
		.pipe(gulp.dest(config.output.sass));
});
