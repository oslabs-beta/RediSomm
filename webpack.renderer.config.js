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
  }
};
