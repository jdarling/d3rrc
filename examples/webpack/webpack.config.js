module.exports = {
  entry: './js/app.jsx',
  output: {
    filename: 'dist/bundle.js',
    publicPath: 'http://localhost:8080/'
  },
  module: {
    loaders: [
      {
        test: /\.jsx$/,
        loader: 'jsx-loader?insertPragma=React.DOM&harmony'
      }
    ]
  },
  resolve: {
    extensions: ['', '.js', '.jsx']
  }
};
