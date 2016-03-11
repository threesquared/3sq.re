var Builder = require('systemjs-builder');

var builder = new Builder();
var config = {
    baseURL: '.',
    transpiler: 'typescript',
    typescriptOptions: {
        module: 'cjs',
    },
    map: {
        typescript: './node_modules/typescript/lib/typescript.js',
        angular2: './node_modules/angular2',
        rxjs: './node_modules/rxjs',
        'ng2-prism': 'node_modules/ng2-prism',
        'ng2-disqus': 'node_modules/ng2-disqus',
    },
    paths: {
        '*': '*.js',
    },
    meta: {
        'node_modules/angular2/*': { build: false },
        'node_modules/rxjs/*': { build: false },
    },
};

builder.config(config);

builder
.bundle('./app/main', './bundles/app.js', { minify: true, sourceMaps: true })
.then(function() {
    console.log('Build complete.');
})
.catch(function(err) {
    console.log('Error', err);
});
