module.exports = function(config) {
    config.set({
        basePath: '',
        frameworks: ['jasmine', 'source-map-support'],
        files: ['./karma.entry.ts'],
        preprocessors: {
            './karma.entry.ts': ['webpack']
        },
        webpack: require('./webpack.test'),
        webpackServer: { noInfo: true },
        reporters: ['mocha', 'coverage'],
        coverageReporter: {
            dir: 'coverage',
            reporters: [
                {
                    type: 'json',
                    subdir: '.',
                    file: 'coverage.json'
                }
            ]
        },
        port: 9876,
        colors: true,
        logLevel: config.LOG_INFO,
        browsers: ['PhantomJS'],
        autoWatch: true,
        singleRun: true
    })
};
