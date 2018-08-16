/**
 * @file Webpack configuration file
 * @author Mike Joyce [hello@mikejoyce.io]
 */

/**
 * Webpack
 * @type {Object}
 * @see {@link https://webpack.js.org/}
 */
const webpack = require('webpack');

/**
 * Path
 * @type {Object}
 * @see {@link https://nodejs.org/api/path.html#path_path}
 */
const path = require('path');

/**
 * Plugins
 * @type {Object}
 */
const plugins = {

  /**
   * Extract Text
   * @type {[Object}
   * @see {@link https://www.npmjs.com/package/extract-text-webpack-plugin}
   */
  extractText: require('extract-text-webpack-plugin'),

  /**
   * Clean Webpack
   * @type {Object}
   * @see {@link @see {@link https://www.npmjs.com/package/clean-webpack-plugin}}
   */
  cleanWebpack: require('clean-webpack-plugin'),

  /**
   * Uglify JS
   * @type {Object}
   * @see {@link https://www.npmjs.com/package/uglifyjs-webpack-plugin}
   */
  uglifyJs: require('uglifyjs-webpack-plugin'),

  /**
   * Optimize CSS
   * @type {Object}
   * @see {@link https://www.npmjs.com/package/optimize-css-assets-webpack-plugin}
   */
  optimizeCSS: require('optimize-css-assets-webpack-plugin'),

  /**
   * Imagemin
   * @type {Object}
   * @see {@link https://www.npmjs.com/package/imagemin-webpack-plugin}
   */
  imageMin: require('imagemin-webpack-plugin').default,

  /**
   * Autoprefixer
   * @type {Object}
   * @see {@link https://www.npmjs.com/package/autoprefixer}
   */
  autoprefixer: require('autoprefixer'),

  /**
   * Favicons
   * @type {Object}
   * @see {@link https://www.npmjs.com/package/favicons-webpack-plugin}
   */
  favicons: require('favicons-webpack-plugin'),

  /**
   * Copy Webpack
   * @type {Object}
   * @see {@link https://www.npmjs.com/package/copy-webpack-plugin}
   */
  copyWebpack: require('copy-webpack-plugin')

};

/**
 * Config
 * @type {Object}
 */
const config = {
  src: path.join(__dirname, '/src'),
  dist: path.join(__dirname, '/dist')
};

module.exports = {
  entry: [
    `${config.src}/js/index.js`
  ],
  output: {
    path: `${config.dist}`,
    filename: 'js/app.js',
  },
  resolve: {
    extensions: ['.js'],
    modules: [path.resolve(__dirname, 'src/js/modules'), 'node_modules']
  },
  module: {
    rules: [
      {
        test: /\.(woff(2)?|ttf|eot|svg)(\?v=\d+\.\d+\.\d+)?$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[name].[ext]',
              useRelativePath: true,
              publicPath: '../fonts'
            }
          }
        ]
      },
      {
        test: /\.(jpe?g|png|gif|svg)$/i,
        loader: 'file-loader',
        options: {
          name: '[name].[ext]',
          useRelativePath: true,
          publicPath: '../images'
        }
      },
      {
        test: /\.js$/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              presets: [ 'env' ]
            }
          }
        ]
      },
      {
        test: /\.scss$/,
        use: plugins.extractText.extract({
          fallback: 'style-loader',
          use: [
            {
              loader: 'css-loader'
            },
            {
              loader: 'postcss-loader',
              options: {
                plugins: () => [
                  plugins.autoprefixer
                ]
              }
            },
            {
              loader: 'resolve-url-loader',
              options: {
                debug: false
              }
            },
            {
              loader: 'sass-loader',
              options: {
                includePaths: [
                  'node_modules/',
                  'node_modules/motion-ui/src',
                  'node_modules/foundation-sites/scss',
                  'src/scss'
                ],
                sourceMap: true
              }
            }
          ]
        })
      }
    ]
  },
  optimization: {
    minimizer: [
      new plugins.uglifyJs({
        cache: true,
        parallel: true,
        sourceMap: true
      }),
      new plugins.optimizeCSS({}),
    ]
  },
  plugins: [
    new plugins.cleanWebpack([
      `${config.dist}/*`
    ]),
    new plugins.extractText(
      'css/app.css'
    ),
    new plugins.copyWebpack([
      {from: 'src/images', to:'images'},
      {from: 'src/music', to: 'music'},
      {from: 'src/sfx', to: 'sfx'}
    ]),
    new plugins.imageMin({
      test: 'images/**'
    })
    // new plugins.favicons({
    //   logo: `${config.src}/favicon/favicon.png`,
    //   prefix: 'favicons/',
    //   emitStats: false,
    //   statsFilename: 'iconstats-[hash].json',
    //   persistentCache: false,
    //   inject: false,
    //   background: '#fff',
    //   title: 'Retro Frogger',
    //   icons: {
    //     android: true,
    //     appleIcon: true,
    //     appleStartup: false,
    //     coast: false,
    //     favicons: true,
    //     firefox: true,
    //     opengraph: false,
    //     twitter: false,
    //     yandex: false,
    //     windows: true
    //   }
    // })
  ]
};
