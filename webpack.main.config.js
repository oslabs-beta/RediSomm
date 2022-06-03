module.exports = {
  /**
   * This is the main entry point for your application, it's the first file
   * that runs in the main process.
   */
  entry: './src/index.ts',
  // Put your normal webpack config below here
  module: {
    rules: require('./webpack.rules')
  },
  resolve: {
    extensions: ['.js', '.ts', '.jsx', '.tsx', '.css', '.json', 'sass', 'scss']
  },
  devServer: {
    static: {
      directory: 'index.html'
    },
    port: 3000,
    allowedHosts: 'all',
    proxy: {
      '/api/**': {
        target: 'http://localhost:8080'
      }
    }
  }
};
