const rules = require('./webpack.rules');
const plugins = require('./webpack.plugins');

rules.push({
  test:  /\.css|\.scss|\.sass/gi,
  use: ['style-loader' ,  'css-loader', 'sass-loader'],
});

module.exports = {
  module: {
    rules,
  },
  plugins: plugins,
  resolve: {
    extensions: ['.js', '.ts', '.jsx', '.tsx', '.css'],
  },
};
