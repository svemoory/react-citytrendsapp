var path = require('path');
var webpack = require('webpack');

module.exports = {

  entry: [

    './src/index.js'
  ],

  output: {
    filename: 'dist/bundle.js',
  //  path: path.resolve(__dirname, 'site', 'dist'),
   // publicPath: '/site/dist/'
  },

  devtool: 'cheap-module-inline-source-map',



      module: {
    loaders: [
      { test: /\.css$/,  loader: 'style-loader!css-loader' },
      { test: /\.js[x]?$/,  exclude: /node_modules/, loader: 'babel-loader' },
 { test: /\.(png|jpg|jpeg|gif|woff)$/, loader: 'url-loader?limit=8192' }
    ]
  },

  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NamedModulesPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
  ],

  devServer: {
    host: 'localhost',
    port: 5000,
    historyApiFallback: true,
    hot: true
  }
  
};

