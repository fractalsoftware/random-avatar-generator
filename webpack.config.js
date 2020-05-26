const path = require('path');

module.exports = [
  'source-map'
].map(devtool => ({
  mode: process.env.NODE_ENV === 'production' ? 'production' : 'development',
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'random-avatar-generator.js',
    library: 'randomAvatarGenerator',
    libraryTarget: 'var',
  },
  devtool,
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env'],
          }
        }
      }
    ]
  }
}));
