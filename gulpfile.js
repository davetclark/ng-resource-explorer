var gulp = require('gulp');
var gp = require('gulp-load-plugins')();
var KarmaServer = require('karma').Server;

var config = {
    bowerDir: './bower_components'
}

gulp.task('bower', function () {
    return gp.bower()
        .pipe(gulp.dest(config.bowerDir));
});

gulp.task('test', function (done) {
    new KarmaServer({
        configFile: __dirname + '/karma.conf.js',
        singleRun: true
    }, done).start();
});

gulp.task('coverage', function (done) {
    new KarmaServer({
        configFile: __dirname + '/karma.conf.js',
        singleRun: true,
        preprocessors: {
            'src/**/*.js': 'coverage'
        }
    }, done).start();
});

gulp.task('server', function() {
    var browserSync = require('browser-sync').create();
    browserSync.init({
        server: {
            baseDir: ['bower_components', 'src', 'test-e2e']
        }
    });
});
