const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry: './src/index.js',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'js/bundle.js'
    },
    devServer: {
        contentBase: './dist'
    },
    plugins: [
        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: './index.html'
        })
    ],
    module: {
        rules: [
            { test: /\.(png|jpg|gif|svg)$/, loader: 'file-loader', options: { name: '[name].[ext]?[hash]' } },
            {
                test: /\.js$/, //using regex to tell babel exactly what files to transcompile
                exclude: /node_modules/, // files to be ignored
                use: {
                    loader: 'babel-loader' // specify the loader
                }
            },
            {
                test: /\.css$/i,
                use: ['style-loader', 'css-loader']
            },
        ]
    }
}