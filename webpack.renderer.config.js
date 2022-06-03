const rules = require('./webpack.rules');
const plugins = require('./webpack.plugins');

// rules.push({
//   test: /\.s[ac]ss$/i,
//   include: './src/**/*',
//   use: ['style-loader', 'css-loader', 'sass-loader']
// });

module.exports = {
  module: {
    rules
  },
  plugins: plugins,
  resolve: {
    extensions: ['.js', '.ts', '.jsx', '.tsx', '.css', 'scss', 'sass', 'png']
  },
  devServer: {
    static: {
      directory: 'index.html'
    },
    historyApiFallBack: true,
    hot: true,
    inline: true,
    port: 8080,
    allowedHosts: 'all',
    proxy: {
      '/api': 'http://localhost:3000',
      'changeOrigin': true,
    }
  }
};
