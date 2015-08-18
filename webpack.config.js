module.exports = {
  entry: './charts.js',
  output: {
    filename: 'dist/bundle.js',
    publicPath: 'http://localhost:8090/'
  },
  module: {
    loaders: [
      {
        test: /\.jsx$/,
        loader: 'jsx-loader?insertPragma=React.DOM&harmony'
      }
    ]
  },
  externals: {
    'react': 'React'
  },
  resolve: {
    extensions: ['', '.js', '.jsx']
  }
};
