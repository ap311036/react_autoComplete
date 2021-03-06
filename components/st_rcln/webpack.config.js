const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry: {
        preview: './preview.js'
    },
    output: {
        filename: ((env = 'develop') => {
            let assignFilename = {
                'develop': '[name].bundle.js',
                'release': '[name].bundle.js'
            };
            return assignFilename[env];
        })(process.env.NODE_ENV),
        path: path.resolve(__dirname, './dist'),
    },
    module: {
        rules: [
            {
                test: /\.css$|\.scss$/,
                use: [
                    {
                        loader: 'style-loader'
                    },
                    {
                        loader: 'css-loader',
                        options: {
                            modules: true,
                            localIdentName: '[local]'
                        }
                    },
                    {
                        loader: 'postcss-loader',
                        options: {
                            plugins: function () {
                                return [
                                    require('autoprefixer')
                                ];
                            }
                        }
                    },
                    {
                        loader: 'sass-loader'
                    }
                ]
            },
            {
                test: /\.js?$|\.jsx?$/,
                exclude: /(node_modules|bower_components)/,
                use: [
                    {
                        loader: 'babel-loader',
                        options: {
                            presets: ['env', 'react']
                        }
                    }
                ]
            },
            {
                test: /\.(ttf|otf|eot|svg|woff(2)?)(\?[a-z0-9]+)?$/,
                loader: 'file-loader?name=fonts/[name].[ext]'
            }
        ]
    },
    devServer: {
        contentBase: path.join(__dirname, './'),
        compress: false,
        port: 9000
    },
    devtool: process.env.NODE_ENV === 'develop' ? 'source-map' : '',
    plugins: [
        new HtmlWebpackPlugin({
            inject: true,
            template: './template.html',
            filename: './preview.html'
        }),
        new webpack.HotModuleReplacementPlugin()
    ]
};