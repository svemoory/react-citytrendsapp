var webpack = require('webpack');
var env = process.env.NODE_ENV;

var reactExternal = {
  root: 'React',
  commonjs2: 'react',
  commonjs: 'react',
  amd: 'react'
};

var config = {
  entry: './src/index',
  externals: {
    'react': reactExternal,
  },
      module: {
    loaders: [
      { test: /\.css$/, include: path.resolve(__dirname, 'src'),  loader: 'style-loader!css-loader' },
      { test: /\.js[x]?$/,  exclude: /node_modules/, loader: 'babel-loader' },
 { test: /\.(png|jpg|jpeg|gif|woff)$/, loader: 'url-loader?limit=8192' }
    ]
  },

  output: {
    filename: 'dist/ReactWidgetApp.min.js',
    library: 'ReactWidgetApp',
    libraryTarget: 'umd',
  },
  plugins: [
    {
      apply: function apply(compiler) {
        compiler.plugin("parser", function(parser, options) {
          parser.plugin('expression global', function expressionGlobalPlugin() {
            this.state.module.addVariable('global', "(function() { return this; }()) || Function('return this')()")
            return false;
          });
        });
      }
    },
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(env)
    })
  ]
}

if (env === 'production') {
  config.plugins.push(
    new webpack.optimize.UglifyJsPlugin({
      compressor: {
        pure_getters: true,
        unsafe: true,
        unsafe_comps: true,
        screw_ie8: true,
        warnings: false
      }
    })
  )
}

module.exports = config;