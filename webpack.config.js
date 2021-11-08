const path = require('path');

module.exports = [
  'source-map'
].map(devtool => ({
  mode: process.env.NODE_ENV === 'production' ? 'production' : 'development',
  entry: './src/index.js',
  output: {
    globalObject: 'this',
    path: path.resolve(__dirname, 'dist'),
    filename: 'random-avatar-generator.js',
    library: {
      name: 'randomAvatarGenerator',
      type: 'umd',
    }
  },
  devtool: 'source-map',
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
