const path = require('path');

module.exports = {
    entry: './src/index.js',
    mode: 'production',
    module: {
        rules: [{
            test: /\.md/,
            loader: 'markdownit-loader'
        }]
    },
    output: {
        filename: 'main.js',
        path: path.resolve(__dirname, 'dist')
    }
};
