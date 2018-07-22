const path = require('path');
var webpack = require('webpack');

module.exports = {
  mode: 'production',
  target: 'web',
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '_bundle.js',
    libraryTarget: 'var',
    library: 'freesewing_macro_title'
  },
  plugins: [
    new webpack.DefinePlugin({
      VERSION: JSON.stringify(require("./package.json").version)
    }),
    new webpack.IgnorePlugin(/^\.\.\/package.json$/)
  ],
  module: {
    rules:[
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env']
          }
        }
      },
      {
        test: /\.txt$/,
        exclude: /node_modules/,
        use: 'raw-loader'
      },
    ]
  }
};
