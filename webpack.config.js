const path = require('path');
module.exports = {
  devtool: '#inline-source-map',
  resolveLoader: {root: path.join(__dirname, "node_modules")},
  entry: './source.js',
  output: {
    path: path.join(__dirname, '/'),
    filename: 'index.js'
  },
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        exclude: /(node_modules|bower_components)/,
        loader: 'babel', // 'babel-loader' is also a legal name to reference
        query: {
          presets: ['react', 'es2015', 'stage-0']
        }
      }
    ]
  },
  resolve: {
    extensions: ['', '.js', '.jsx']
  }
};