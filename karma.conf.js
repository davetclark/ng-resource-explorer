module.exports = function(config) {
    config.set({
        basePath: '',
        frameworks: ['jasmine'],
        files: [
            'bower_components/angular/angular.js',
            'bower_components/angular-resource/angular-resource.js',
            'bower_components/angular-mocks/angular-mocks.js',
            'src/*.js',
            'test/*.js'
        ],
        exclude: [],
        // preprocessors: {
        //     'scripts/*.html': ['ng-html2js']
        // },
        // ngHtml2JsPreprocessor: {
        //     moduleName: 'templates'
        // },
        reporters: ['progress', 'coverage'],
        port: 9876,
        colors: true,
        logLevel: config.LOG_INFO,
        // autoWatch: true,
        browsers: ['PhantomJS'],
        singleRun: true
    });
};
