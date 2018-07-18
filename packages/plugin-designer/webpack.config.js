const path = require('path');

module.exports = {
  mode: 'production',
  target: 'web',
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, 'dist/browser'),
    filename: 'bundle.js',
    libraryTarget: 'var',
    library: 'freesewing_theme_designer'
  },
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
