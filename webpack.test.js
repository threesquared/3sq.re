module.exports = {
    devtool: 'inline-source-map',
    verbose: true,
    resolve: {
        extensions: ['', '.ts', '.js', '.scss', '.html'],
        modulesDirectories: ['node_modules', 'src']
    },
    module: {
        loaders: [
            {
                test: /\.ts$/,
                loader: 'awesome-typescript-loader',
                query: {
                    sourceMap: false,
                    inlineSourceMap: true
                }
            },
            {test: /\.json$/, loader: 'json-loader'},
            {test: /\.html$/, loader: 'html-loader'},
            {test: /\.scss$/, loaders: ['to-string-loader', 'css-loader', 'sass-loader']}
        ],
        postLoaders: [
            {
                test: /\.ts$/,
                loader: 'istanbul-instrumenter-loader',
                exclude: [
                    'node_modules',
                    /\.(e2e|spec)\.ts$/
                ]
            }
        ]
    }
};
