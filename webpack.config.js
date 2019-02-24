const path = require('path'),
  ExtractTextPlugin = require("extract-text-webpack-plugin");

module.exports = {
  mode: 'development',
  entry: {
    vendor: [
      './node_modules/es6-shim/es6-shim.min.js'
    ],
    app: './src/index.tsx',
    styles: [
      './node_modules/normalize.css/normalize.css'
    ]
  },
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, './dist')
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        loader: 'ts-loader',
        exclude: /node_modules/,
        options: {
          configFile: path.resolve(__dirname, 'tsconfig.json')
        }
      },
      {
        test: /\.css?$/,
        use: ExtractTextPlugin.extract({
          use: "css-loader"
        })
      },
    ]
  },
  plugins: [
    new ExtractTextPlugin({
      filename: './[name].css',
      allChunks: true,
    }),
  ],
  resolve: {
    extensions: [ '.tsx', '.ts', '.js' ]
  },
  devServer: {
    contentBase: './dist'
  }
};
