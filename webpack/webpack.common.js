// webpack.common.js
const path = require('path');  // 路径处理模块
const VueLoaderPlugin = require('vue-loader/lib/plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin') 
function resolve (dir) {
    return path.join(__dirname, '..', dir)
}
module.exports = {
    context: path.resolve(__dirname, '../'),
    output: {
        path: path.resolve( __dirname, "../dist"),
        publicPath: '/',
        filename: 'bundle.js'
    },
    target: 'web',
    resolve: {
        alias: {
            '@': resolve('src'),
            'vue$': 'vue/dist/vue.esm.js',
        },
        extensions: ['.js','.vue']
    },
    module: {
        rules: [
            {
                test: /\.css$/,
                oneOf: [
                  /* config.module.rule('css').oneOf('vue-modules') */
                  {
                    resourceQuery: /module/,
                    use: [
                      /* config.module.rule('css').oneOf('vue-modules').use('vue-style-loader') */
                      {
                        loader: 'vue-style-loader',
                        options: {
                          sourceMap: false,
                          shadowMode: false
                        }
                      },
                      /* config.module.rule('css').oneOf('vue-modules').use('css-loader') */
                      {
                        loader: 'css-loader',
                        options: {
                          sourceMap: false,
                          importLoaders: 2,
                          modules: {
                            localIdentName: '[name]_[local]_[hash:base64:5]'
                          }
                        }
                      },
                      /* config.module.rule('css').oneOf('vue-modules').use('postcss-loader') */
                      {
                        loader: 'postcss-loader',
                        options: {
                          sourceMap: false
                        }
                      }
                    ]
                  },
                  /* config.module.rule('css').oneOf('vue') */
                  {
                    resourceQuery: /\?vue/,
                    use: [
                      /* config.module.rule('css').oneOf('vue').use('vue-style-loader') */
                      {
                        loader: 'vue-style-loader',
                        options: {
                          sourceMap: false,
                          shadowMode: false
                        }
                      },
                      /* config.module.rule('css').oneOf('vue').use('css-loader') */
                      {
                        loader: 'css-loader',
                        options: {
                          sourceMap: false,
                          importLoaders: 2
                        }
                      },
                      /* config.module.rule('css').oneOf('vue').use('postcss-loader') */
                      {
                        loader: 'postcss-loader',
                        options: {
                          sourceMap: false
                        }
                      }
                    ]
                  },
                  /* config.module.rule('css').oneOf('normal-modules') */
                  {
                    test: /\.module\.\w+$/,
                    use: [
                      /* config.module.rule('css').oneOf('normal-modules').use('vue-style-loader') */
                      {
                        loader: 'vue-style-loader',
                        options: {
                          sourceMap: false,
                          shadowMode: false
                        }
                      },
                      /* config.module.rule('css').oneOf('normal-modules').use('css-loader') */
                      {
                        loader: 'css-loader',
                        options: {
                          sourceMap: false,
                          importLoaders: 2,
                          modules: {
                            localIdentName: '[name]_[local]_[hash:base64:5]'
                          }
                        }
                      },
                      /* config.module.rule('css').oneOf('normal-modules').use('postcss-loader') */
                      {
                        loader: 'postcss-loader',
                        options: {
                          sourceMap: false
                        }
                      }
                    ]
                  },
                  /* config.module.rule('css').oneOf('normal') */
                  {
                    use: [
                      /* config.module.rule('css').oneOf('normal').use('vue-style-loader') */
                      {
                        loader: 'vue-style-loader',
                        options: {
                          sourceMap: false,
                          shadowMode: false
                        }
                      },
                      /* config.module.rule('css').oneOf('normal').use('css-loader') */
                      {
                        loader: 'css-loader',
                        options: {
                          sourceMap: false,
                          importLoaders: 2
                        }
                      },
                      /* config.module.rule('css').oneOf('normal').use('postcss-loader') */
                      {
                        loader: 'postcss-loader',
                        options: {
                          sourceMap: false
                        }
                      }
                    ]
                  }
                ]
            },
            {
                test: /\.vue$/, 
                loader: 'vue-loader'
            },
            {            
                test: /\.js$/,               
                loader: "babel-loader",
                include: [resolve('src'), resolve('test')],
                exclude: /node_modules/
            },
            {
              test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
              use: [
                {
                  loader: 'url-loader',
                  options: {
                    limit: 4096,
                    fallback: {
                      loader: 'file-loader',
                      options: {
                        name: 'img/[name].[hash:8].[ext]'
                      }
                    }
                  }
                }
              ]
            },
            {
                test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/i,
                use: [
                  /* config.module.rule('fonts').use('url-loader') */
                  {
                    loader: 'url-loader',
                    options: {
                      limit: 4096,
                      fallback: {
                        loader: 'file-loader',
                        options: {
                          name: 'fonts/[name].[hash:8].[ext]'
                        }
                      }
                    }
                  }
                ]
            }
        ]
    },
    plugins: [
        new VueLoaderPlugin(),
        new MiniCssExtractPlugin({filename: 'static/css/[name].[chunkhash:8].css'})
    ]
}